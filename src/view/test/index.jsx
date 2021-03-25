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
    // document.getElementById('arcxsbd').style.background = "#333";
    // document.getElementById('arcxsbd').style.color = "#ccc";
    //https://www.xyyuedu.com/kepushuji/renleijianshi_congdongwudaoshangdi/281015.html
    return <Fragment>
        <div style={{ width: '100%', height: '100%' }}>
            <iframe
                src="https://www.xyyuedu.com/kepushuji/renleijianshi_congdongwudaoshangdi/281015.html"
                frameBorder="0"
                width="100%"
                height="100%"
            >
            </iframe>
        </div>
    </Fragment>;
}
