import React from 'react';
import './SuggestionsList.css';
interface Props {
    years: string[];
    className: string;
    show: boolean;
    onClick: (year: string) => void;
    setYear: React.Dispatch<React.SetStateAction<string>>;
}

const SuggestionsList: React.FC<Props> = ({ onClick, years, className, show, setYear }) => {
    return (
        <>
            {show &&
                <div className={`${className}`}>
                    <ul className='suggestion-list'>
                        {years &&
                            years.map((data: any) => (
                                <li
                                    className='suggestions__item'
                                    key={data}
                                    onClick={() => { onClick(data); setYear(data) }}
                                >
                                    {data}
                                </li>
                            ))}
                    </ul>
                </div>}
        </>
    )
}

export default SuggestionsList