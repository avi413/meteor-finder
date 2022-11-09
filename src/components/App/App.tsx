import React, { useEffect, useState } from 'react';
import { getMeteors } from '../../utils/MeteorDataset';
import InputField from '../InputField/InputField';
import SuggestionsList from '../SuggestionsList/SuggestionsList';
import CardList from '../CardList/CardList';

import './App.css';

interface Geolocation {
  type: "string";
  coordinates: [number, number];
}
interface Meteor {
  name: string;
  id: string;
  nametype: string;
  recclass: string;
  mass: string;
  fall: string;
  year: string;
  reclat: string;
  reclong: string;
  geolocation: Geolocation;
}

const App: React.FC = () => {
  //Data for years aoutocomplete list 
  const [years, setYears] = useState<string[]>(['']);
  //All meteors data
  const [searchedMeteors, setSearchedMeteors] = useState<Meteor[]>([]);
  //mass input
  const [mass, setMass] = useState<string>('');
  //year input
  const [year, setYear] = useState<string>('');
  //flag show list years or not
  const [isShowList, setIsShowList] = useState(false);


  useEffect(() => {
    const yearsSet = new Set<string>();
    getMeteors()
      .then((data) => {
        //remove data withut year
        const filteredData: [Meteor] = data.filter((item: Meteor) =>
          item.year
        )
        filteredData.forEach((item: any) => {
          yearsSet.add(item.year.split('-')[0])
        });

        setSearchedMeteors(filteredData);

        let yearsArray = Array.from(yearsSet);
        setYears(yearsArray)

      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    return searchedMeteors
    .filter(
        (item: Meteor) =>
            // if no filter return all meteors
            mass.length > 0 ? item.mass === mass : item
    )
  }

  const handleMassChange = (e: any) => {
    e.target.value.length > 0 ? setMass(e.target.value) : setMass('');
  }

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    handleSuggestionsListClick(year);
    setIsShowList(false);
  }

  const handleYearChange = (e: any) => {
    setYear(e.target.value);
    setMass('');
    e.target.value.length > 0 ? setIsShowList(true) : setIsShowList(false);
    let year: string = e.target.value;
    setYears(filterStartsWith(year, years));
  }

  const filterStartsWith = (term: string, data: string[]) => {
    term.length > 0 ? setIsShowList(true) : setIsShowList(false);
    return data.filter((item: string) =>
      item.startsWith(term) ? item : ''
    );
  }

  const handleSuggestionsListClick = (year: string) => {
    setIsShowList(!isShowList);
    setYear(year);
    const filteredData = searchedMeteors.filter((item: Meteor) =>
      item.year.includes(year)
    );
    setSearchedMeteors(filteredData)
  }

  return (
    <div className='App'>
      <h1>Meteor fall finder</h1>
      <div className='inputs-container'>
        <div className='search'>
          <InputField
            hendleChange={handleYearChange}
            placeholder='Enter year...'
            buttonTitle='search'
            handleSubmit={handleSearchSubmit}
            value={year || ''}
            setValue={setYear}
          />
          <SuggestionsList
            years={years}
            onClick={handleSuggestionsListClick}
            className={'suggestions'}
            setYear={setYear || ''}
            show={isShowList}
          />
        </div>
        <InputField
          hendleChange={handleMassChange}
          placeholder='Enter mass...'
          buttonTitle='filter'
          handleSubmit={handleFilterSubmit}
          value={mass}
          setValue={setMass}
        />
      </div>
      <CardList
        searchedMeteors={searchedMeteors}
        mass={mass}
        year={year}
      />
    </div>
  );
};

export default App;
