import React, { Fragment, useEffect, useState, useCallback } from 'react';

function useWinSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    });
    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        });
    }, []);
    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);
    return size;
}

export default function Module5() {
    const size = useWinSize();
    return <Fragment>
        <h4>自定义hooks</h4>
        <div>window size width: {size.width}</div>
        <div>window size height: {size.height}</div>
    </Fragment>;
}
