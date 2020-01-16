import React, { Fragment, useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Input, Upload, Button, Icon, Modal, message } from 'antd';
import { AMap } from '@/common/utils/map.js';
import { putSurface } from '@/common/api/surface';
import editStore from '@/common/store/project/editStore';
import { getSurfaceDetail } from '@/common/api/surface';
import { getToken } from '@/common/utils';
import { uploadPointsFileUrl } from '@/common/api/surface';
import { RedText } from '@/view/component';

const addressMaker = require('@/assets/images/maker.png');
const stationMaker = require('@/assets/images/station.png');

const { TextArea } = Input;

const ModifySurfaceModal = observer(({ visible, setVisible, id }) => {
    const mapref = useRef();
    const [surfaceName, setSurfaceName] = useState('');//作业面名称
    const [altitudeHigh, setAltitudeHigh] = useState(0);//最高海拔
    const [altitudeLow, setAltitudeLow] = useState(0);//最低海拔
    const [desc, setDesc] = useState('');//介绍
    const [mapLng, setMapLng] = useState(null);
    const [mapLat, setMapLat] = useState(null);
    const [polygons, setPolygons] = useState(null);//作业面电子围栏,高德坐标
    const [polygonsGPS, setPolygonsGPS] = useState(null);//作业面电子围栏,GPS
    const [baseStation, setBaseStation] = useState(null);//基站位置,高德坐标
    const [baseStationGPS, setBaseStationGPS] = useState(null);//基站位置,GPS
    //绘制作业面围栏
    function drawSurfacePolygons(map, list) {
        const arr = [];
        for (let i = 0; i < list.length; i++) {
            arr.push(new AMap.LngLat(list[i][0], list[i][1]));
        }
        const polygon = new AMap.Polygon({
            path: arr,
            fillColor: '#fff', // 多边形填充颜色
            fillOpacity: 0, //完全透明
            borderWeight: 2, // 线条宽度，默认为 1
            strokeColor: '#1089ff' // 线条颜色
        });
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
    function initMap() {
        const map = new AMap.Map('playMap', {
            center: [mapLng, mapLat], //中心点坐标
            resizeEnable: true, //是否监控地图容器尺寸变化
            zoom: 20, //级别
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
            setMapLng(lng);
            setMapLat(lat);
            map.setCenter(new AMap.LngLat(lng, lat));
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
        const option = {
            altitudeHigh: altitudeHigh,
            altitudeLow: altitudeLow,
            bslocations: JSON.stringify(baseStationGPS),
            centerPoint: "[" + mapLng + "," + mapLat + "]",
            introduce: desc,
            name: surfaceName,
            id: id,
            polygons: JSON.stringify(polygonsGPS),
            projectId: editStore.base.id
        };
        putSurface(option).then((res) => {
            if (res.code === 200) {
                message.success('作业面修改成功!');
                setVisible(false);
                //刷新作业面
                editStore.initSurfaceList(editStore.base.id);
            }
        });
    }
    //初始华数据,获取作业面详情
    function initData() {
        getSurfaceDetail(id).then((res) => {
            if (res.code === 200) {
                console.log(res.data);
                setSurfaceName(res.data.name);
                setAltitudeHigh(res.data.altitudeHigh);
                setAltitudeLow(res.data.altitudeLow);
                setDesc(res.data.introduce);
                setMapLng(res.data.centerPoint[0]);
                setMapLat(res.data.centerPoint[1]);
                setPolygons(res.data.gdPolygons);
                setBaseStation(res.data.gdBSLocations);
                setPolygonsGPS(res.data.polygons);
                setBaseStationGPS(res.data.bslocations);
            }
        });
    }
    useEffect(() => {
        if (visible) {
            initData();
        }
    }, [visible]);
    useEffect(() => {
        if (mapLng && mapLat) {
            initMap();
        }
    }, [polygons, baseStation, mapLng, mapLat]);
    const modifySurfaceNode = <Fragment>
        <Modal
            title="修改作业面"
            width={'1140px'}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            footer={
                <Row>
                    <Col span={4} offset={10}><Button type="primary" onClick={() => saveSurface()}>保存</Button></Col>
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
                            <Input style={{ width: '80px' }} value={altitudeLow} onChange={(e) => setAltitudeLow(e.target.value)} />米至
                            <Input style={{ width: '80px' }} value={altitudeHigh} onChange={(e) => setAltitudeHigh(e.target.value)} />米
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
                        <div id="playMap" ref={mapref} style={{ width: '100%', height: '100%' }}></div>
                    </Row>
                </Col>
            </Row>
        </Modal>
    </Fragment >;
    return visible && modifySurfaceNode;
});
export default ModifySurfaceModal;