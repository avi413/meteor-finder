import React, { useEffect, useState } from 'react';
import { getMeteors } from '../../utils/MeteorDataset';
import InputField from '../InputField/InputField';
import SuggestionsList from '../SuggestionsList/SuggestionsList';
import CardList from '../CardList/CardList';

import './App.css';

const App: React.FC = () => {
  const [years, setYears] = useState<string>('');
  const [mass, setMass] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [showYear, setShowYear] = useState(true);
  const [searchedMeteors, setSearchedMeteors] = useState<any[]>([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const localMeteorList: string | null = localStorage.getItem('meteor-data');
    const set = new Set();
    !localMeteorList &&
      getMeteors()
        .then((data) => {
          //remove data withut year
          const filteredData = data.filter((item: any) =>
            item.year
          )
          //save initial data on local storage to reduce the number of network calls
          localStorage.setItem('meteor-data', JSON.stringify(filteredData));
          //save separate set for unique year for autocomplete
          filteredData.forEach((item: any) => {
            set.add(item.year.split('-')[0])
          });
          localStorage.setItem('meteor-years', JSON.stringify(Array.from(set)));
        })
        .catch((e) => {
          console.log(e);
        });
  }, []);

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    setFilter(true);
  }

  const hendleMassChange = (e: any) => {
    e.target.value.length > 0 ? setMass(e.target.value) : setMass('');
    setFilter(false);
  }

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    handleSuggestionsListClick(year);
    setShowYear(false);
  }

  const hendleYearChange = (e: any) => {
    setYear(e.target.value);
    setFilter(false);
    setMass('');
    e.target.value.length > 0 ? setShowYear(true) : setShowYear(false);
    let year: string = e.target.value;
    const data = JSON.parse(localStorage.getItem('meteor-years') || '{}');
    setYears(filterStartsWith(year, data));
  }

  const filterStartsWith = (term: string, data: any) => {
    term.length > 0 ? setShowYear(true) : setShowYear(false);
    return data.filter((item: any) =>
      item.startsWith(term) ? item : ''
    );
  }

  const handleSuggestionsListClick = (year: string) => {
    setShowYear(!showYear);
    setYear(year);
    const data = JSON.parse(localStorage.getItem('meteor-data') || '{}');
    const filteredData = data.filter((item: any) =>
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
            hendleChange={hendleYearChange}
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
            show={showYear}
          />
        </div>
        <InputField
          hendleChange={hendleMassChange}
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
        setFilter={setFilter || ''}
        filter={filter}
      />
    </div>
  );
};

export default App;
