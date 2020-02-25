import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

import './styles.less';

import i18n from '../../locales/i18n';
import { languageChange } from '../../store/modules/auth/actions';

export default function SelectLanguage({ className }) {
	const dispatch = useDispatch();
	const language = useSelector(state => state.auth.language);

	const menu = (
		<Menu className='menu' selectedKeys={language}>
			<Menu.Item
				key='es'
				onClick={() => {
					dispatch(languageChange('es'));
					i18n.changeLanguage('es');
				}}
			>
				<strong>{'PY'}</strong>
				{' - Español'}
			</Menu.Item>
			<Menu.Item
				key='pt'
				onClick={() => {
					dispatch(languageChange('pt'));
					i18n.changeLanguage('pt');
				}}
			>
				<strong>{'BR'}</strong>
				{' - Português'}
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown
			className={`dropDown ${className}`}
			overlay={menu}
			placement='bottomRight'
		>
			<a href='#/'>
				<GlobalOutlined />
			</a>
		</Dropdown>
	);
}

SelectLanguage.propTypes = {
	className: PropTypes.string,
};
