import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { getAreaList, getNextAreaList } from '@/common/api/public';
const { Option } = Select;
/**
 * @param regionId,默认加载的地址,省或直辖市的areaCode,不传默认北京
 * @param callback,返回选择的地址LIST
 * 使用:<Region callback={(areaList) => setAreaInfo(areaList)} regionId={'110000000000'} />
 */
const Region = ({ regionId, callback }) => {
    const [currentId, setCurrentRegionId] = useState(regionId || "110000000000"); //默认为北京,"110000000000"
    const [province, setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [town, setTown] = useState([]);
    const [selectProvinceData, setSelectProvinceData] = useState({});
    const [selectCityData, setSelectCityData] = useState({});
    const [selectTownData, setSelectTownData] = useState({});

    //获取区县级列表
    function getNextTownList(cityId) {
        //获取区县级列表
        getNextAreaList({ parentCode: cityId }).then((response) => {
            // console.log(response);
            if (response.code === 200 && response.data && response.data.length > 0) {
                setTown(response.data);
                setSelectTownData(response.data[0]);
            }
        });
    }
    //获取市列表
    function getNextCityList(provinceId) {
        //获取市级列表
        getNextAreaList({ parentCode: provinceId }).then((result) => {
            // console.log(result);
            if (result.code === 200 && result.data && result.data.length > 0) {
                setCity(result.data);
                setSelectCityData(result.data[0]);
                getNextTownList(result.data[0].areaCode);
            }
        });
    }
    //获取省列表
    function getProvinceList() {
        //获取省级列表
        getAreaList().then((res) => {
            if (res.code === 200 && res.data && res.data.length > 0) {
                setProvince(res.data);
                for (let i = 0; i < res.data.length; i++) {
                    const item = res.data[i];
                    if (currentId === item.areaCode) {
                        setSelectProvinceData(item);
                        getNextCityList(currentId);
                        break;
                    }
                }
            }
        });
    }
    //省change
    function handleChangeProvince(id) {
        setCurrentRegionId(id);
        for (let i = 0; i < province.length; i++) {
            if (province[i].areaCode === id) {
                setSelectProvinceData(province[i]);
                getNextCityList(id);
                break;
            }
        }
    }
    //市change
    function handleChangeCity(id) {
        for (let i = 0; i < city.length; i++) {
            if (city[i].areaCode === id) {
                setSelectCityData(city[i]);
                getNextTownList(city[i].areaCode);
                break;
            }
        }
    }
    //区县change
    function handleChangeTown(id) {
        for (let i = 0; i < town.length; i++) {
            if (town[i].areaCode === id) {
                setSelectTownData(town[i]);
                break;
            }
        }
    }
    useEffect(() => {
        if (province.length === 0) {
            getProvinceList();
        }
        callback([selectProvinceData, selectCityData, selectTownData]);
    }, [selectTownData.areaCode]);

    return (
        <div>
            <Select value={selectProvinceData.areaCode} style={{ width: '32%' }} onSelect={handleChangeProvince}>
                {province.map(item => <Option value={item.areaCode} key={Math.random()}>{item.name}</Option>)}
            </Select>
            <Select value={selectCityData.areaCode} style={{ width: '32%', marginLeft: '2%' }} onSelect={handleChangeCity}>
                {city.map(item => <Option value={item.areaCode} key={Math.random()}>{item.name}</Option>)}
            </Select>
            <Select value={selectTownData.areaCode} style={{ width: '32%', marginLeft: '2%' }} onSelect={handleChangeTown}>
                {town.map(item => <Option value={item.areaCode} key={Math.random()}>{item.name}</Option>)}
            </Select>
        </div>
    );
};
export default Region;
