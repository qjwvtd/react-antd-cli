import React from 'react';
import { Link } from 'react-router-dom';
const logoWhite = require('@/assets/images/logo-white.svg');
const logoBlack = require('@/assets/images/logo-black.svg');
const logoYellow = require('@/assets/images/logo_yellow.svg');
/**
*Logo加,智安汇
*@param link,路由路径,如:'/','/login',也可以不传
*@param type,logo颜色,0是黑色,1是白色,2是黄色,如:1,默认2
*@param size,logo大小,如:32,默认32
*,使用方式: <Logo link="/" type={1}  size={40} />
*/
export default function Logo(props) {
    const { link, type, size } = props;
    let logoIcon = null;
    let logoSize = null;
    if (type === 0) {
        logoIcon = logoBlack;
    } else if (type === 1) {
        logoIcon = logoWhite;
    } else {
        logoIcon = logoYellow;
    }
    if (size) {
        logoSize = size;
    } else {
        logoSize = 32;
    }
    // const logoIcon = type === 1 ? logoWhite : logoBlack;
    const logoStyle = { width: logoSize + 'px', height: logoSize + 'px', verticalAlign: 'middle' };
    const textStyle = { paddingLeft: '16px', color: type === 1 ? '#fff' : '#666', fontSize: '1.4em', verticalAlign: 'middle', fontWeight: '600' };
    let logoNode = null;
    if (link) {
        logoNode = <Link to={link}>
            <img src={logoIcon} style={logoStyle} />
            <span style={textStyle}>智安汇运营管理系统</span>
        </Link>;
    } else {
        logoNode = <span>
            <img src={logoIcon} style={logoStyle} />
            <span style={textStyle}>智安汇运营管理系统</span>
        </span>;
    }
    return logoNode;
}