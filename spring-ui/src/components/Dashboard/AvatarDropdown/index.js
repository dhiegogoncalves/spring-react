import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Avatar, Menu, Dropdown } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import './styles.less';

import { logout } from '../../../store/modules/auth/actions';

export default function AvatarDropdown({ className }) {
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const menuHeaderDropdown = (
		<Menu selectedKeys={[]} onClick={() => {}}>
			<Menu.Item key='settings'>
				<SettingOutlined />
				{t('menu.account.settings')}
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key='logout' onClick={() => dispatch(logout())}>
				<LogoutOutlined />
				{t('menu.account.logout')}
			</Menu.Item>
		</Menu>
	);
	return (
		<Dropdown overlay={menuHeaderDropdown}>
			<span className={`account ${className}`}>
				<Avatar
					size='small'
					className='avatar'
					src='https://api.adorable.io/avatars/126/abott@adorable.png'
					alt='avatar'
				/>
				<span>Teste</span>
			</span>
		</Dropdown>
	);
}

AvatarDropdown.propTypes = {
	className: PropTypes.string,
};
