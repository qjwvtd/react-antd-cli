import React from 'react';
import { Link } from 'react-router-dom';
const logoWhite = require('@/static/images/logo-white.svg');
const logoBlack = require('@/static/images/logo-black.svg');

/**
*Logo加,智安汇
*@param link,路由路径,如:'/','/login',也可以不传
*@param type,logo颜色,0是黑色,1是白色,如:1,默认0
*,使用方式: <Logo link="/" type={1} />
*/
export default function Logo(props) {
    const { link, type } = props;
    const logoIcon = type === 1 ? logoWhite : logoBlack;
    const logoStyle = { width: '36px', height: '36px', verticalAlign: 'middle' };
    const textStyle = { paddingLeft: '10px', color: type === 1 ? '#fff' : '#666', fontSize: '1.7em', verticalAlign: 'middle', fontWeight: '600' };
    let logoNode = null;
    if (link) {
        logoNode = <Link to={link}>
            <img src={logoIcon} style={logoStyle} />
            <span style={textStyle}>智安汇</span>
        </Link>;
    } else {
        logoNode = <span>
            <img src={logoIcon} style={logoStyle} />
            <span style={textStyle}>智安汇</span>
        </span>;
    }
    return logoNode;
}