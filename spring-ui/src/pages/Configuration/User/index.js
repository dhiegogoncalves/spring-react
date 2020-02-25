import React, { useState, useEffect } from 'react';
import {
	Layout,
	Typography,
	Card,
	Button,
	Divider,
	Spin,
	Table,
	message,
	Tooltip,
	Popconfirm,
	Collapse,
} from 'antd';
import {
	DeleteOutlined,
	EditOutlined,
	SearchOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { api } from '../../../services/api';
import CreateUpdateForm from './components/CreateUpdateForm';
import SearchForm from './components/SearchForm';
import Details from './components/Details';

import {
	getDataSource,
	setSearchFields,
} from '../../../store/modules/configuration/actions';

export default function User() {
	const [spinLoading, setSpinLoading] = useState(false);
	const [createModalVisible, handleModalVisible] = useState(false);
	const [modalData, setModalData] = useState();
	const [pageUrl] = useState('users');

	const dispatch = useDispatch();

	const tableLoading = useSelector(state => state.configuration.tableLoading);
	const dataSource = useSelector(state => state.configuration.dataSource);
	const pagination = useSelector(state => state.configuration.pagination);
	const filters = useSelector(state => state.configuration.filters);

	const { t } = useTranslation();

	const columns = [
		{
			title: t('user.name.field'),
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: t('user.email.field'),
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: t('user.username.field'),
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: t('user.department.field'),
			dataIndex: 'department',
			key: 'department',
			render: data => data && data.name,
		},
		{
			title: t('table.column.action.title'),
			dataIndex: '',
			key: 'action',
			width: '10%',
			render: data => (
				<>
					<Tooltip placement='bottom' title={t('table.edit.action')}>
						<a
							onClick={async () => {
								setSpinLoading(true);
								getModalData(data.key);
							}}
						>
							<EditOutlined style={{ fontSize: 18 }} />
						</a>
					</Tooltip>
					<Divider type='vertical' />
					<Tooltip placement='bottom' title={t('table.delete.action')}>
						<Popconfirm
							title={t('table.confirmation.action.message')}
							onConfirm={async () => {
								await deleteData(data.key);
								handleTableChange();
							}}
						>
							<a>
								<DeleteOutlined style={{ fontSize: 18 }} />
							</a>
						</Popconfirm>
					</Tooltip>
				</>
			),
		},
	];

	async function getModalData(id) {
		const response = await api.get(`users/${id}`);
		let data = response.data;
		if (data.department) data.department = data.department.id;
		if (data.groups) data.groups = data.groups.map(value => value.id);
		setModalData(data);
		setSpinLoading(false);
		handleModalVisible(true);
	}

	async function deleteData(id) {
		try {
			await api.delete(`users/${id}`);
			message.success(t('user.successfully-deleted.message'));
		} catch (error) {
			message.error(t('error.message'));
		}
	}

	const handleTableChange = async pagination => {
		dispatch(getDataSource(pageUrl, pagination, filters));
	};

	useEffect(() => {
		dispatch(getDataSource(pageUrl, undefined, filters));
	}, [dispatch, pageUrl, filters]);

	return (
		<>
			<Layout.Content
				style={{
					marginTop: '5px',
					padding: '10px 20px',
					background: '#fff',
					maxHeight: 60,
				}}
			>
				<Typography.Title level={3}>{t('user.title')}</Typography.Title>
			</Layout.Content>

			<Spin spinning={spinLoading} size='large' tip={t('loading.message')}>
				<Collapse defaultActiveKey={[]} style={{ margin: 20 }}>
					<Collapse.Panel
						header={
							<Typography.Text strong={true}>
								<SearchOutlined /> {t('form.search.title')}
							</Typography.Text>
						}
						key='1'
					>
						<SearchForm
							onSubmit={async filters => {
								dispatch(setSearchFields(filters));
							}}
							onClean={async () => {
								dispatch(setSearchFields(''));
							}}
						/>
					</Collapse.Panel>
				</Collapse>

				<Card
					size='small'
					extra={
						<Button
							type='primary'
							htmlType='button'
							onClick={() => {
								setModalData(null);
								handleModalVisible(true);
							}}
						>
							{t('modal.button.new')}
						</Button>
					}
					style={{ margin: 20, padding: 0 }}
					bordered={false}
				>
					<Table
						size='small'
						bordered={false}
						columns={columns}
						dataSource={dataSource}
						loading={tableLoading}
						onChange={handleTableChange}
						pagination={pagination}
						expandable={{
							expandedRowRender: data => <Details data={data} />,
						}}
					/>
				</Card>
			</Spin>
			{modalData !== undefined ? (
				<CreateUpdateForm
					data={modalData}
					onOk={async () => {
						handleModalVisible(false);
						handleTableChange();
						setModalData();
					}}
					onCancel={() => {
						setModalData();
						handleModalVisible(false);
						handleTableChange();
					}}
					modalVisible={createModalVisible}
				/>
			) : null}
		</>
	);
}
