import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import './styles.less';

import AvatarDropdown from '../AvatarDropdown';
import SelectLanguage from '../../SelectLanguage';

export default function Header({ collapsed, toggle }) {
	return (
		<Layout.Header className='header'>
			{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: toggle,
			})}
			<div className='right'>
				<AvatarDropdown className='action' />
				<SelectLanguage className='action language' />
			</div>
		</Layout.Header>
	);
}

Header.propTypes = {
	collapsed: PropTypes.bool.isRequired,
	toggle: PropTypes.func.isRequired,
};
