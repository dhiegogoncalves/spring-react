import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Checkbox, Card, Row, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './styles.less';

import SelectLanguage from '../../components/SelectLanguage';
import { loginRequest } from '../../store/modules/auth/actions';

export default function LoginForm() {
	const dispatch = useDispatch();
	const { t } = useTranslation();
	const loading = useSelector(state => state.auth.loading);

	const onFinish = values => {
		const { username, password } = values;
		dispatch(loginRequest(username, password));
	};

	return (
		<>
			<Row className='language' type='flex' justify='end'>
				<SelectLanguage />
			</Row>
			<Row className='card-top' type='flex' justify='center' align='middle'>
				<Card className='card'>
					<Row type='flex' justify='center'>
						<Typography.Text className='title'>CRUD</Typography.Text>
					</Row>

					<Form name='login_form' onFinish={onFinish}>
						<Form.Item
							name='username'
							rules={[
								{
									required: true,
									message: t('required-field.validation'),
								},
							]}
						>
							<Input
								prefix={<UserOutlined className='form-input-placeholder' />}
								placeholder={t('login.username.field')}
							/>
						</Form.Item>
						<Form.Item
							name='password'
							rules={[
								{
									required: true,
									message: t('required-field.validation'),
								},
							]}
						>
							<Input
								prefix={<LockOutlined className='form-input-placeholder' />}
								type='password'
								placeholder={t('login.password.field')}
							/>
						</Form.Item>
						<Form.Item name='remember' valuePropName='checked'>
							<Checkbox>{t('login.remember-me.check')}</Checkbox>
							<a className='form-forgot' href='#'>
								{t('login.forgot-password.link')}
							</a>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
								className='form-button'
								loading={loading}
							>
								{t('login.submit.button')}
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</Row>
		</>
	);
}
