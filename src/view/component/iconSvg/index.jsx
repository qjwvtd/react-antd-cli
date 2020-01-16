import React from 'react';

const iconSvg = (props) => (
    <i className='anticon'>
        <svg width='20px' height='20px' fill="currentColor">
            <path d={props.path}></path>
        </svg>
    </i>
);
export default iconSvg;