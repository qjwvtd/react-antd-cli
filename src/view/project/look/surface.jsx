import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Input, Select, Button, Icon, Table, Pagination } from 'antd';
import lookStore from '@/common/store/project/lookStore';
import SurfaceDetail from './surfaceModal/surfaceDetail.jsx';

const { Option } = Select;

//查询,重置,新增
const SurfaceTop = observer(({ id }) => {
    const [surfaceName, setSurfaceName] = useState(null);
    const [surfaceStatus, setSurfaceStatus] = useState(null);
    //查询
    function query() {
        lookStore.setSurfaceSearchContent(surfaceName, surfaceStatus);
        lookStore.initSurfaceList(id);
    }
    //重置
    function reSet() {
        setSurfaceName(null);
        setSurfaceStatus(null);
        lookStore.setSurfaceSearchContent(null, null);
    }
    useEffect(() => {
        query();
    }, [surfaceName, surfaceStatus]);
    return <Fragment>
        <Col span={8}>
            <span>作业面名称:</span>
            <Input
                type="text"
                placeholder="作业面名称"
                value={surfaceName}
                onChange={(e) => setSurfaceName(e.target.value)}
                style={{ width: 'calc(100% - 90px)' }}
            />
        </Col>
        <Col span={6} offset={2}>
            <span>状态:</span>
            <Select value={surfaceStatus} style={{ width: '120px' }} onSelect={(val) => setSurfaceStatus(val)}>
                <Option value={null}>全部</Option>
                <Option value={0}>启用</Option>
                <Option value={1}>禁用</Option>
            </Select>
        </Col>
        <Col span={7} className="ui-btns-rows text-right" offset={1}>
            <Button type="primary" onClick={() => query()}><Icon type="search" />查询</Button>
            <Button onClick={() => reSet()}><Icon type="undo" />重置</Button>
        </Col>
    </Fragment>;
});
//作业面列表
const SurfaceTable = observer(({ id }) => {
    const [detailVisible, setDetailVisible] = useState(false);//详情modal开关
    const [surfaceId, setSurfaceId] = useState(null);
    //查看作业面详情
    function lookSurface(surface) {
        setDetailVisible(true);
        setSurfaceId(surface.id);
    }
    const columns = [
        { title: '作业面ID', dataIndex: 'id' },
        { title: '作业面名称', dataIndex: 'name' },
        { title: '创建时间', dataIndex: 'createTime' },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text, record) => {
                const flag = record.status === 0;
                const _color = flag ? 'green' : 'red';
                return <span style={{ color: _color }}>{flag ? '已启用' : '已禁用'}</span>;
            }
        },
        {
            title: '操作',
            dataIndex: '',
            render: (text, record) => {
                return <span>
                    <Button type="link" onClick={() => lookSurface(record)}>查看</Button>
                </span>;
            }
        }
    ];
    useEffect(() => {
        lookStore.setSurfaceSearchContent(null, null);
        lookStore.initSurfaceList(id);
    }, []);
    return <Fragment>
        <Table columns={columns} dataSource={lookStore.surface} pagination={false} rowKey="id" />
        <SurfaceDetail visible={detailVisible} setVisible={setDetailVisible} id={surfaceId} />
    </Fragment>;
});
const SurfaceInfo = observer(({ id }) => {
    function onHandlePaginationChange(page, size) {
        lookStore.setSurfacePagination(page, size);
        lookStore.initSurfaceList(id);
    }
    return (
        <Fragment>
            <div className="ui-content-container">
                <Row className="ui-search-row">
                    <SurfaceTop id={id} />
                </Row>
                <Row className="ui-table-row" style={{ minHeight: '480px', maxHeight: '600px' }}>
                    <SurfaceTable id={id} />
                </Row>
                <Row style={{ paddingTop: '16px', paddingRight: '16px', textAlign: 'right' }}>
                    <Pagination
                        defaultPageSize={lookStore.surfacePagination.size}
                        defaultCurrent={lookStore.surfacePagination.page}
                        onShowSizeChange={(p, s) => onHandlePaginationChange(p, s)}
                        onChange={(p, s) => onHandlePaginationChange(p, s)}
                        total={lookStore.surfacePagination.total}
                    />
                </Row>
            </div>
        </Fragment>
    );
});
export default SurfaceInfo;