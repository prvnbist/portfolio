import React, {useState} from 'react'

const Options = ({options, selected}) => {
    const [isDropDownVisible, setIsDropDownVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    return <div className="dropdown">
        <div className="select" onClick={e => setIsDropDownVisible(!isDropDownVisible)}>
            <span>{selectedOption}</span>
            <i>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </i>
        </div>
        {isDropDownVisible && <ul className="options">
            {options.map((option, index) => (
                <li
                    key={index}
                    onClick={() => {
                        setSelectedOption(option);
                        setIsDropDownVisible(!isDropDownVisible);
                        selected(option);
                }}>{option}</li>
            ))
}
        </ul>}
    </div>;
}

export default Options;