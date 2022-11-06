import React, { useRef } from 'react'
import './InputField.css';

interface Props {
    hendleChange: (event: React.InputHTMLAttributes<HTMLInputElement>) => void;
    placeholder: string;
    buttonTitle: string;
    value: any;
    setValue: React.Dispatch<React.SetStateAction<number | undefined>>;
    handleSubmit: (e: any) => void;
}

const InputField: React.FC<Props> = ({ handleSubmit, hendleChange, placeholder, buttonTitle, value, setValue }) => {
    const inputYearRef = useRef<HTMLInputElement>(null);

    return (
        <form className='input'>
            <input
                ref={inputYearRef}
                onChange={hendleChange}
                className='input__box'
                placeholder={placeholder}
                type='number'
                value={value}

            />
            <button
                className='input__submit'
                type='submit'
                onClick={handleSubmit}
            >
                {buttonTitle}
            </button>
        </form>
    );
}

export default InputField