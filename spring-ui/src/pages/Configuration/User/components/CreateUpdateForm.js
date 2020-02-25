import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Form,
	Input,
	Modal,
	Button,
	message,
	Select,
	Row,
	Col,
	Checkbox,
	Divider,
	Switch,
} from 'antd';
import { useTranslation } from 'react-i18next';

import { api } from '../../../../services/api';
import {
	getDepartments,
	getGroups,
} from '../../../../store/modules/configuration/actions';

export default function CreateUpdateForm({
	data,
	onOk: handleReturn,
	onCancel,
	modalVisible,
}) {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const departments = useSelector(state => state.configuration.departments);
	const groups = useSelector(state => state.configuration.groups);

	const [changePassword, setChangePassword] = useState(false);

	const [form] = Form.useForm();
	const { t } = useTranslation();

	const onFinish = async fields => {
		let success = false;
		setLoading(true);

		fields.department = !fields.department ? null : { id: fields.department };
		fields.groups = !fields.groups
			? null
			: fields.groups.map(value => ({ id: value }));

		if (!fields.id) {
			success = await handleCreate(fields);
		} else {
			success = await handleUpdate(fields);
		}

		setLoading(false);

		if (success) {
			handleReturn(success);
		}
	};

	const handleCreate = async fields => {
		try {
			await api.post('users', fields);
			message.success(t('user.successfully-created.message'));
			return true;
		} catch (error) {
			message.error(t('error.message'));
			return false;
		}
	};

	const handleUpdate = async fields => {
		try {
			await api.put('users', fields);
			message.success(t('user.successfully-updated.message'));
			return true;
		} catch (error) {
			message.error(t('error.message'));
			return false;
		}
	};

	useEffect(() => {
		dispatch(getDepartments());
		dispatch(getGroups());

		!data && setChangePassword(true);
	}, [data, dispatch]);

	const filterOptionSelect = (input, option) =>
		option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

	return (
		<>
			<Form id='user_form' form={form} initialValues={data} onFinish={onFinish}>
				<Modal
					destroyOnClose
					title={
						data === null
							? t('user.modal-new.title')
							: t('user.modal-update.title')
					}
					visible={modalVisible}
					width={800}
					maskClosable={false}
					closable={false}
					footer={[
						<Button
							key='back'
							type='default'
							danger
							disabled={loading}
							onClick={() => {
								form.resetFields();
								onCancel();
							}}
						>
							{t('modal.cancel.button')}
						</Button>,
						<Button
							form='user_form'
							key='submit'
							type='primary'
							htmlType='submit'
							loading={loading}
						>
							{data === null
								? t('modal.save.button')
								: t('modal.update.button')}
						</Button>,
					]}
				>
					<Form.Item name='id' hidden>
						<Input />
					</Form.Item>

					<Row gutter={24}>
						<Col xs={24} sm={24} md={24} lg={24}>
							<Form.Item
								label={t('user.name.field')}
								name='name'
								rules={[
									{
										required: true,
										message: t('required-field.validation'),
										whitespace: true,
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								label={t('user.email.field')}
								name='email'
								rules={[
									{
										type: 'email',
										message: t('user.invalid-email-format.validation'),
									},
									{ required: true, message: t('required-field.validation') },
								]}
							>
								<Input />
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								label={t('user.username.field')}
								name='username'
								rules={[
									{
										required: true,
										message: t('required-field.validation'),
										whitespace: true,
									},
									{
										validator: async (rule, value) => {
											if (value.trim().length >= 4) {
												const response = await api.get(
													`users/username-exists/${value}`
												);

												if (
													response.data === false ||
													data.username === value
												) {
													return Promise.resolve();
												} else {
													return Promise.reject(
														t('user.username-already-use.validation')
													);
												}
											} else {
												return Promise.reject(
													t(
														'user.username-must-contain-least-4-characters.validation'
													)
												);
											}
										},
									},
								]}
								hasFeedback
							>
								<Input />
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item
								label={t('user.language.field')}
								name='language'
								rules={[
									{
										required: true,
										message: t('required-field.validation'),
									},
								]}
							>
								<Select
									placeholder={t('placeholder.select-language')}
									filterOption={filterOptionSelect}
								>
									<Select.Option value='es-PY'>
										{t('spanish.language')}
									</Select.Option>
									<Select.Option value='pt-BR'>
										{t('portuguese.language')}
									</Select.Option>
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} sm={24} md={12} lg={12}>
							<Form.Item label={t('user.department.field')} name='department'>
								<Select
									placeholder={t('placeholder.select-department')}
									filterOption={filterOptionSelect}
									defaultValue=''
								>
									<Select.Option key=''>
										{t('placeholder.select-department')}
									</Select.Option>
									{departments.map(value => (
										<Select.Option key={value.id}>{value.name}</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item label={t('user.groups.field')} name='groups'>
						<Select
							placeholder={t('placeholder.select-groups')}
							mode='multiple'
							filterOption={filterOptionSelect}
						>
							{groups.map(value => (
								<Select.Option key={value.id}>{value.name}</Select.Option>
							))}
						</Select>
					</Form.Item>

					{data && (
						<>
							<Col xs={24} sm={24} md={24} lg={24}>
								<Form.Item label={t('user.change-password.title')}>
									{
										<Switch
											size='small'
											checked={changePassword}
											onChange={() => setChangePassword(!changePassword)}
										/>
									}
								</Form.Item>
							</Col>
						</>
					)}

					{changePassword && (
						<>
							<Row gutter={24}>
								<Col xs={24} sm={24} md={12} lg={12}>
									<Form.Item
										label={t('user.password.field')}
										name='password'
										rules={[
											{
												required: true,
												message: t('required-field.validation'),
												whitespace: true,
											},
										]}
										hasFeedback
									>
										<Input type='password' />
									</Form.Item>
								</Col>

								<Col xs={24} sm={24} md={12} lg={12}>
									<Form.Item
										label={t('user.confirm-password.field')}
										name='confirmPassword'
										dependencies={['password']}
										rules={[
											{
												required: true,
												message: t('required-field.validation'),
												whitespace: true,
											},
											({ getFieldValue }) => ({
												validator(rule, value) {
													if (!value || getFieldValue('password') === value) {
														return Promise.resolve();
													}
													return Promise.reject(
														t('user.two-passwords-not-match.validation')
													);
												},
											}),
										]}
										hasFeedback
									>
										<Input type='password' />
									</Form.Item>
								</Col>
							</Row>
						</>
					)}

					<Row gutter={24}>
						<Divider>{t('user.access-authorization.title')}</Divider>

						<Col xs={12} sm={12} md={12} lg={12}>
							<Form.Item name='administrator' valuePropName='checked'>
								<Checkbox defaultValue={false}>
									{t('user.administrator.field')}
								</Checkbox>
							</Form.Item>
						</Col>
					</Row>
				</Modal>
			</Form>
		</>
	);
}
