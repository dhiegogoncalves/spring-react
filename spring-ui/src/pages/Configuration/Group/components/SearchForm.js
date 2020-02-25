import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

export default function SearchForm({ onSubmit, onClean }) {
	const [form] = Form.useForm();

	const { t } = useTranslation();

	const onFinish = async fields => {
		fields.deleted = false;
		onSubmit(
			Object.entries(fields)
				.map(([key, val]) => (val !== undefined ? `${key}=${val.trim()}&` : ''))
				.join('')
		);
	};

	return (
		<Form name='search_form' form={form} onFinish={onFinish}>
			<Row gutter={24}>
				<Col xs={24} sm={24} md={12} lg={12}>
					<Form.Item label={t('group.name.field')} name='name'>
						<Input />
					</Form.Item>
				</Col>

				<Col xs={24} sm={24} md={12} lg={12}>
					<Form.Item label={t('group.nickname.field')} name='nickname'>
						<Input />
					</Form.Item>
				</Col>

				<Col xs={24} sm={24} md={12} lg={12}>
					<Form.Item label={t('group.description.field')} name='description'>
						<Input />
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
	);
}
