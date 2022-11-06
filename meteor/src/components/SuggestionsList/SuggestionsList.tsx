import React from 'react';
import './SuggestionsList.css';
interface Props {
    years: any;
    className: string;
    show: any;
    onClick: (year: number) => void;
    setYear: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SuggestionsList: React.FC<Props> = ({ onClick, years, show, className, setYear }) => {
    return (
        show && <div className={`${className}`}>
            <ul className='suggestion-list'>
                {years && years.length > 0 &&
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
        </div>
    )
}

export default SuggestionsList