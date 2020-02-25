import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Layout, Row, Menu, Typography } from 'antd';

import { SettingOutlined } from '@ant-design/icons';

import './styles.less';

export default function SideMenu({ collapsed }) {
	return (
		<Layout.Sider
			className='sider'
			trigger={null}
			collapsible
			collapsed={collapsed}
		>
			<Row type='flex' justify='center' align='middle'>
				<Typography.Text className='logo'>CRUD</Typography.Text>
			</Row>
			<Menu
				theme='dark'
				mode='inline'
				defaultSelectedKeys={['']}
				defaultOpenKeys={['']}
			>
				<Menu.SubMenu
					key='sub1'
					title={
						<span>
							<SettingOutlined />
							<span>Configurações</span>
						</span>
					}
				>
					<Menu.Item key='1'>
						<Link to='/configuration/users'>Usuários</Link>
					</Menu.Item>
					<Menu.Item key='2'>
						<Link to='/configuration/groups'>Grupos</Link>
					</Menu.Item>
					<Menu.Item key='3'>
						<Link to='/configuration/departments'>Departamentos</Link>
					</Menu.Item>
				</Menu.SubMenu>
			</Menu>
		</Layout.Sider>
	);
}

SideMenu.propTypes = {
	collapsed: PropTypes.bool.isRequired,
};
