import React from 'react'

const Loading = (props) => {
    return (
        <div className="loading__container" style={{width: `${props.width}%`, height: props.height}}>
            <ul className="loading">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}

export default Loading;