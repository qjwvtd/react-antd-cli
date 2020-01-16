import React from 'react';
import { Modal, Icon } from 'antd';

export default function Confirm(options, okFn, cancalFn) {
    const opt = { ...options };
    delete options.onOk;
    delete options.onCancel;
    Modal.confirm({
        ...opt,
        icon: <Icon type="exclamation" />,
        onOk: () => {
            okFn();
        },
        onCancel: () => {
            cancalFn ? cancalFn() : null;
        }
    });
}
