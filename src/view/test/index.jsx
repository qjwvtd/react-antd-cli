import React, { Fragment } from 'react';

export default function Test() {
    function removeWithoutCopy(arr, item) {
        arr = arr.filter(function (num) {
            return num !== item;
        });
        return arr;
    }
    console.log(removeWithoutCopy([1, 2, 2, 3, 4, 2, 2], 2));
    React.useEffect(() => {
        function add() {
            return new Promise((resolve) => {
                let count = Math.floor(Math.random() * 100);
                setTimeout(() => {
                    if (count % 2 === 0) {
                        resolve('偶数');
                    } else {
                        resolve('奇数');
                    }
                }, 2000);
            });
        }
        async function runFn() {
            const text = await add();
            console.log(text);//输出奇数/偶数
        }
        runFn();
    }, []);
    // document.body.style.background = "#666";
    // document.getElementById('arcxsbd').style.color = "#ccc";
    return <Fragment>
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
                src="http://www.purepen.com/sgyy/001.htm"
                frameBorder="0"
                width="100%"
                height="100%"
                id="frame"
            >
            </iframe>
        </div>
    </Fragment>;
}
