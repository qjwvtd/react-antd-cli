import React from 'react';
import { getGirlDataApi } from '@/common/api/public';

export default function useGirl() {
    const [list, setList] = React.useState([]);
    const initGirl = function () {
        getGirlDataApi().then((res) => {
            if (res.status === 100) {
                console.log(res.data);
                setList(res.data);
            }
        });
    };
    return { list, initGirl };
}
