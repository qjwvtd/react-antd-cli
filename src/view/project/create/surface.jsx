import React, { Fragment, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Input, Select, Button, Icon, Table, Pagination, message } from 'antd';
import createStore from '@/common/store/project/createStore';
import CreateSurfaceModal from './surfaceModal/createSurface.jsx';
import SurfaceDetail from './surfaceModal/surfaceDetail.jsx';
import ModifySurfaceModal from './surfaceModal/surfaceModify.jsx';
import { switchSurfaceStatus } from '@/common/api/surface';

const { Option } = Select;

//查询,重置,新增
const SurfaceTop = observer(() => {
    const [visible, setVisible] = useState(false);
    const [surfaceName, setSurfaceName] = useState('');
    const [surfaceStatus, setSurfaceStatus] = useState(null);
    //查询
    function query() { }
    //重置
    function reSet() {
        setSurfaceName('');
        setSurfaceStatus(null);
    }
    useEffect(() => {
        const option = {
            name: surfaceName,
            status: surfaceStatus
        };
        createStore.initSurfaceList(option);
    }, [surfaceName, surfaceStatus]);
    return <Fragment>
        <Col span={8}>
            <span>作业面名称:</span>
            <Input
                type="text"
                placeholder="项目名称"
                value={surfaceName}
                onChange={(e) => setSurfaceName(e.target.value)}
                style={{ width: 'calc(100% - 100px)' }}
            />
        </Col>
        <Col span={6} offset={1}>
            <span>状态:</span>
            <Select value={surfaceStatus} style={{ width: 80 }} onSelect={(val) => setSurfaceStatus(val)}>
                <Option value={null}>全部</Option>
                <Option value={0}>启用</Option>
                <Option value={1}>禁用</Option>
            </Select>
        </Col>
        <Col span={8} className="ui-btns-rows text-right">
            <Button type="primary" onClick={() => query()}><Icon type="search" />查询</Button>
            <Button onClick={() => reSet()}><Icon type="undo" />重置</Button>
            <Button type="primary" onClick={() => setVisible(true)}><Icon type="plus-circle" />新增</Button>
        </Col>
        <CreateSurfaceModal visible={visible} setVisible={setVisible} />
    </Fragment>;
});
//作业面列表
const SurfaceTable = observer(() => {
    const [detailVisible, setDetailVisible] = useState(false);//详情modal开关
    const [modifyVisible, setModifyVisible] = useState(false);//修改modal开关
    const [surfaceId, setSurfaceId] = useState(null);
    //查看作业面详情
    function lookSurface(surface) {
        setDetailVisible(true);
        setSurfaceId(surface.id);
    }
    //修改作业面
    function modifySurface(surface) {
        setModifyVisible(true);
        setSurfaceId(surface.id);
    }
    //作业面启用和禁用
    function changeSurfaceStatus(record) {
        const reState = record.status === 0 ? 1 : 0;
        const tips = record.status === 0 ? '已禁用' : '已启用';
        const sendData = { id: record.id, status: reState };
        switchSurfaceStatus(sendData).then((res) => {
            if (res.code === 200) {
                message.success('作业面[' + record.name + ']' + tips);
                const option = {
                    name: null,
                    status: null
                };
                createStore.initSurfaceList(option);
            }
        });
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
                const flag = record.status === 0;
                const _text_ = flag ? '禁用' : '启用';
                return <span>
                    <Button type="link" onClick={() => lookSurface(record)}>查看</Button>
                    <Button type="link" disabled={!flag} onClick={() => modifySurface(record)}>修改</Button>
                    <Button type="link" onClick={() => changeSurfaceStatus(record)}>{_text_}</Button>
                </span>;
            }
        }
    ];
    useEffect(() => {
        if (createStore.base && createStore.base.id) {
            const option = {
                name: null,
                status: null
            };
            createStore.initSurfaceList(option);
        }
    }, []);//
    return <Fragment>
        <Table columns={columns} dataSource={createStore.surface} pagination={false} rowKey="id" />
        <SurfaceDetail visible={detailVisible} setVisible={setDetailVisible} id={surfaceId} />
        <ModifySurfaceModal visible={modifyVisible} setVisible={setModifyVisible} id={surfaceId} />
    </Fragment>;
});
const SurfaceView = observer(() => {
    function onHandlePaginationChange(page, size) {
        createStore.setSurfacePagination(page, size);
        const option = {
            name: null,
            status: null
        };
        createStore.initSurfaceList(option);
    }
    return (
        <Fragment>
            <div className="ui-content-container">
                <Row className="ui-search-row">
                    <SurfaceTop />
                </Row>
                <Row className="ui-table-row" style={{ minHeight: '480px', maxHeight: '600px' }}>
                    <SurfaceTable />
                </Row>
                <Row style={{ paddingTop: '16px', paddingRight: '16px', textAlign: 'right' }}>
                    <Pagination
                        defaultPageSize={createStore.surfacePagination.size}
                        defaultCurrent={createStore.surfacePagination.page}
                        onShowSizeChange={(p, s) => onHandlePaginationChange(p, s)}
                        onChange={(p, s) => onHandlePaginationChange(p, s)}
                        total={createStore.surfacePagination.total}
                    />
                </Row>
            </div>
        </Fragment>
    );
});
export default SurfaceView;