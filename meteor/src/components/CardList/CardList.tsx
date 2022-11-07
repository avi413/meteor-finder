import React from 'react';
import './CardList.css';

interface Props {
    searchedMeteors?: any;
    mass: number ;
    setFilter: React.Dispatch<React.SetStateAction<boolean>>;
    filter: boolean;
}

const CardList: React.FC<Props> = ({ searchedMeteors, mass, filter }) => {
    const data = JSON.parse(localStorage.getItem('meteor-data') || '{}');
    const firsElement = data.find((element: any) => element.mass == mass);
    const filteredSearchedMeteors = searchedMeteors
        .filter(
            (item: any) =>
                filter && mass ? item.mass == mass : item.mass > 0
        )

    return (
        <>
            {filteredSearchedMeteors.length === 0 && <p>the mass was not found, jumping to first-year where there is a mass that fits the criteria</p>}
            <ul className='cards'>
                {filteredSearchedMeteors.length > 0 ?
                    filteredSearchedMeteors
                        .map((meteor: any) => {
                            return (
                                <li className='card' key={meteor.id}>
                                    <div className='card__info'>
                                        <h3 className='card__title'>{`Meteor name: ${meteor.name}`}</h3>
                                        <h4 className='card__title'>{`Meteor mass: ${meteor.mass}`}</h4>
                                        <span className='card__date'>{`Meteor recclass: ${meteor.recclass}`}</span>
                                    </div>
                                </li>
                            );
                        })
                    :
                    filter && firsElement &&
                    <li className='card' key={firsElement.id}>
                        <div className='card__info'>
                            <h3 className='card__title'>{`Meteor year lend: ${firsElement.year.split('-')[0]}`}</h3>
                            <h3 className='card__title'>{`Meteor name: ${firsElement.name}`}</h3>
                            <h4 className='card__title'>{`Meteor mass: ${firsElement.mass}`}</h4>
                            <span className='card__date'>{`Meteor recclass: ${firsElement.recclass}`}</span>
                        </div>
                    </li>
                }
            </ul>
        </>
    )
}

export default CardList