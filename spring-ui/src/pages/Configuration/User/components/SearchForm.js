import React, { useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import {
	getDepartments,
	getGroups,
} from '../../../../store/modules/configuration/actions';

export default function SearchForm({ onSubmit, onClean }) {
	const [form] = Form.useForm();

	const { t } = useTranslation();

	const dispatch = useDispatch();

	const departments = useSelector(state => state.configuration.departments);
	const groups = useSelector(state => state.configuration.groups);

	const onFinish = async fields => {
		fields.deleted = false;
		onSubmit(
			Object.entries(fields)
				.map(([key, val]) => (val !== undefined ? `${key}=${val}&` : ''))
				.join('')
		);
	};

	useEffect(() => {
		dispatch(getDepartments());
		dispatch(getGroups());
	}, [dispatch]);

	const filterOptionSelect = (input, option) =>
		option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

	return (
		<>
			<Form name='search_form' form={form} onFinish={onFinish}>
				<Row gutter={24}>
					<Col xs={24} sm={24} md={12} lg={12}>
						<Form.Item label={t('user.name.field')} name='name'>
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={12} lg={12}>
						<Form.Item label={t('user.email.field')} name='email'>
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={12} lg={12}>
						<Form.Item label={t('user.username.field')} name='username'>
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={12} lg={12}>
						<Form.Item label={t('user.department.field')} name='department.id'>
							<Select
								placeholder={t('placeholder.select-department')}
								filterOption={filterOptionSelect}
								optionFilterProp='children'
							>
								{departments.map(value => (
									<Select.Option key={value.id}>{value.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={12} lg={12}>
						<Form.Item label={t('user.group.field')} name='groups.id'>
							<Select
								placeholder={t('placeholder.select-group')}
								filterOption={filterOptionSelect}
								optionFilterProp='children'
							>
								{groups.map(value => (
									<Select.Option key={value.id}>{value.name}</Select.Option>
								))}
							</Select>
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col
						span={24}
						style={{
							textAlign: 'right',
						}}
					>
						<Button
							onClick={() => {
								form.resetFields();
								onClean();
							}}
						>
							{t('form.clear.button')}
						</Button>
						<Button
							type='primary'
							htmlType='submit'
							style={{
								marginLeft: 8,
							}}
						>
							{t('form.search.button')}
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
}
