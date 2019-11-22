import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
const logo = require('@/static/images/logo.png');
/**
*Logo
*@param link,路由路径,如:'/','/login',也可以不传
*/
export default function Logo(props) {
    const { link } = props;
    let logoNode = null;
    if (link) {
        logoNode = <Link className="head-logo" to={link}>
            <img src={logo} style={{ width: 'auto', height: '30px' }} />
            <span>运营后台</span>
        </Link>;
    } else {
        logoNode = <a className="head-logo">
            <img src={logo} style={{ width: 'auto', height: '30px' }} />
            <span>运营后台</span>
        </a>;
    }
    return logoNode;
}