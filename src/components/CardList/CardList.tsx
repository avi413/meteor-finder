import React from 'react';
import './CardList.css';

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
interface Props {
    searchedMeteors: Meteor[];
    mass: string;
    year: string;
}

const CardList: React.FC<Props> = ({ searchedMeteors, mass, year }) => {

    const firsElement = searchedMeteors.length > 0 && searchedMeteors.find((element: Meteor) => element.mass === mass);


    return (
        <>
            {searchedMeteors.length === 0 &&
                mass.length > 0 &&
                <p>the mass was not found, jumping to first-year where there is a mass that fits the criteria</p>
            }
            <ul className='cards'>
                {year.length === 4 ?
                    searchedMeteors
                        .map((meteor: Meteor) => {
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
                    firsElement &&
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