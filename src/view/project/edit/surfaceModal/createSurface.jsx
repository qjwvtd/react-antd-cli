import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Input, Upload, Button, Icon, Modal, message } from 'antd';
import { AMap } from '@/common/utils/map.js';
import { getToken } from '@/common/utils';
import { addSurface, uploadPointsFileUrl } from '@/common/api/surface';
import editStore from '@/common/store/project/editStore';
import { RedText } from '@/view/component';

const addressMaker = require('@/assets/images/maker.png');
const stationMaker = require('@/assets/images/station.png');

const { TextArea } = Input;
const CreateSurfaceModal = observer(({ visible, setVisible }) => {
    const [surfaceName, setSurfaceName] = useState(null);//作业面名称
    const [altitudeHigh, setAltitudeHigh] = useState(0);//最高海拔
    const [altitudeLow, setAltitudeLow] = useState(0);//最低海拔
    const [desc, setDesc] = useState('');//介绍
    const [mapLng, setMapLng] = useState(null);//经度
    const [mapLat, setMapLat] = useState(null);//纬度
    const [polygons, setPolygons] = useState(null);//作业面电子围栏,高德坐标
    const [polygonsGPS, setPolygonsGPS] = useState(null);//作业面电子围栏,GPS
    const [baseStation, setBaseStation] = useState(null);//基站位置,高德坐标
    const [baseStationGPS, setBaseStationGPS] = useState(null);//基站位置,GPS
    //绘制作业面围栏
    function drawSurfacePolygons(map, list) {
        console.log(list);
        const arr = [];
        for (let i = 0; i < list.length; i++) {
            arr.push(new AMap.LngLat(list[i][0], list[i][1]));
        }
        console.log(arr);
        const polygon = new AMap.Polygon({
            path: arr,
            fillColor: '#fff', // 多边形填充颜色
            fillOpacity: 0, //完全透明
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: '#1089ff' // 线条颜色
        });
        console.log(polygon);
        map.add(polygon);
    }
    //绘制基站位置
    function drawSurfaceBaseStation(map, list) {
        for (let i = 0; i < list.length; i++) {
            const marker = new AMap.Marker({
                position: list[i],
                icon: new AMap.Icon({
                    size: new AMap.Size(30, 36), //图标大小
                    image: stationMaker,
                    imageSize: new AMap.Size(28, 28)
                }),
                offset: new AMap.Pixel(-14, -31),
                zIndex: 101
            });
            marker.setMap(map);
        }
    }
    //加载地图
    function initMap(point) {
        const map = new AMap.Map('playMap', {
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 20, //显示范围
            center: point, //中心点坐标
            showLabel: false//不显示地图文字标记
        });
        setMapLng(map.getCenter().lng);
        setMapLat(map.getCenter().lat);
        //创建可拖拽的maker
        const marker = new AMap.Marker({
            position: map.getCenter(),
            icon: new AMap.Icon({
                size: new AMap.Size(36, 42), //图标大小
                image: addressMaker,
                imageSize: new AMap.Size(32, 32)
            }),
            offset: new AMap.Pixel(-14, -31),
            // 设置拖拽
            draggable: true,
            cursor: 'move',
            raiseOnDrag: false,
            zIndex: 101
        });
        marker.setMap(map);
        //拖拽时获取经纬度
        AMap.event.addListener(marker, 'dragend', function () {
            const lng = marker.getPosition().lng;
            const lat = marker.getPosition().lat;
            console.log(lng, lat);
            setMapLng(lng);
            setMapLat(lat);
            map.setCenter(new AMap.LngLat(lng, lat));
            const geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            geocoder.getAddress([lng, lat], function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    const address = result.regeocode.formattedAddress;
                    console.log(address);
                }
            });
        });
        if (polygons) {
            drawSurfacePolygons(map, polygons);
        }
        if (baseStation) {
            drawSurfaceBaseStation(map, baseStation);
        }
    }

    //上传中、完成、失败处理,电子围栏
    function handleUploadPolygons(info) {
        if (info.file.status === 'done') {
            message.success('电子围栏上传成功!');
            setPolygons(info.file.response.data.gdStr);
            setPolygonsGPS(info.file.response.data.gpsStr);
        }
    }
    //上传中、完成、失败处理,基站
    function handleUploadBaseStation(info) {
        if (!polygons) { message.error('请先上传电子围栏'); return; }
        if (info.file.status === 'done') {
            message.success('基站上传成功!');
            setBaseStation(info.file.response.data.gdStr);
            setBaseStationGPS(info.file.response.data.gpsStr);
        }
    }
    //保存作业面
    function saveSurface() {
        if (!surfaceName) { message.error('作业面名称不能为空'); return; }
        if (!polygons) { message.error('作业面围栏不能为空'); return; }
        if (!baseStation) { message.error('作业面基站不能为空'); return; }
        if (!mapLng || !mapLat) { message.error('作业面中心点不能为空'); return; }
        const option = {
            altitudeHigh: altitudeHigh,
            altitudeLow: altitudeLow,
            bslocations: JSON.stringify(baseStationGPS),
            centerPoint: "[" + mapLng + "," + mapLat + "]",
            introduce: desc,
            name: surfaceName,
            polygons: JSON.stringify(polygonsGPS),
            projectId: editStore.base.id
        };
        addSurface(option).then((res) => {
            console.log(res);
            if (res.code === 200) {
                message.success('作业面创建成功!');
                setVisible(false);
                //刷新作业面
                editStore.initSurfaceList(editStore.base.id);
            }
        });
    }
    useEffect(() => {
        setTimeout(() => {
            visible && initMap(null);
        }, 200);
    }, [visible]);
    useEffect(() => {
        if (mapLng && mapLat) {
            initMap([mapLng, mapLat]);
        }
    }, [mapLng, mapLat, polygons, baseStation]);
    const isSuccess = surfaceName && polygonsGPS && baseStationGPS && mapLng && mapLat;
    const createSurfaceNode = <Fragment>
        <Modal
            title="创建作业面"
            width={'1140px'}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={
                <Row>
                    <Col span={4} offset={10}><Button type="primary" onClick={() => saveSurface()} disabled={!isSuccess}>保存</Button></Col>
                </Row>
            }
        >
            <Row>
                <Col span={10} className="ui-setSurface-container">
                    <Row>
                        <Col span={6}><RedText />作业面名称:</Col>
                        <Col span={18}>
                            <Input type="text" placeholder="作业面名称" value={surfaceName} onChange={(e) => setSurfaceName(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>作业面海拔:</Col>
                        <Col span={18}>
                            <Input type="number" style={{ width: '80px' }} value={altitudeLow} onChange={(e) => setAltitudeLow(e.target.value)} />米至
                            <Input type="number" style={{ width: '80px' }} value={altitudeHigh} onChange={(e) => setAltitudeHigh(e.target.value)} />米
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}><RedText />作业面中心点:</Col>
                        <Col span={18}>
                            <Input style={{ width: '120px', marginRight: '8px' }} placeholder="经度" value={mapLng} readOnly />
                            <Input style={{ width: '120px', marginLeft: '8px' }} placeholder="纬度" value={mapLat} readOnly />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}><RedText />电子围栏:</Col>
                        <Col span={18}>
                            <span>
                                <Upload
                                    name="file"
                                    accept="text/*,.txt"
                                    headers={{ Authorization: 'Bearer ' + getToken() }}
                                    action={uploadPointsFileUrl(1)}
                                    onChange={handleUploadPolygons}
                                >
                                    <Button><Icon type="upload" />上传</Button>
                                </Upload>
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}><RedText />基站定位:</Col>
                        <Col span={18}>
                            <span>
                                <Upload
                                    name="file"
                                    accept="text/*,.txt"
                                    headers={{ Authorization: 'Bearer ' + getToken() }}
                                    action={uploadPointsFileUrl(2)}
                                    onChange={handleUploadBaseStation}
                                >
                                    <Button disabled={!polygons}><Icon type="upload" />上传</Button>
                                </Upload>
                            </span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}>作业面介绍:</Col>
                        <Col span={18}>
                            <TextArea rows={4} defaultValue="作业面介绍" value={desc} onChange={(e) => setDesc(e.target.value)} />
                        </Col>
                    </Row>
                </Col>
                <Col span={13} offset={1}>
                    <Row style={{ width: '100%', height: '480px' }}>
                        <div id="playMap" style={{ width: '100%', height: '100%' }}></div>
                    </Row>
                </Col>
            </Row>
        </Modal>
    </Fragment >;
    return visible && createSurfaceNode;
});
export default CreateSurfaceModal;