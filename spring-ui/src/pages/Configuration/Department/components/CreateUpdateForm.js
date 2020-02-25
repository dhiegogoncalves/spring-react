import React, { useState } from 'react';
import { Form, Input, Modal, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';

import { api } from '../../../../services/api';

export default function CreateUpdateForm({
	data,
	onOk: handleReturn,
	onCancel,
	modalVisible,
}) {
	const [loading, setLoading] = useState(false);

	const [form] = Form.useForm();
	const { t } = useTranslation();

	const onFinish = async fields => {
		let success = false;
		setLoading(true);

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
			await api.post('departments', fields);
			message.success(t('department.successfully-created.message'));
			return true;
		} catch (error) {
			message.error(t('error.message'));
			return false;
		}
	};

	const handleUpdate = async fields => {
		try {
			await api.put('departments', fields);
			message.success(t('department.successfully-updated.message'));
			return true;
		} catch (error) {
			message.error(t('error.message'));
			return false;
		}
	};

	return (
		<>
			<Form id='role_form' form={form} initialValues={data} onFinish={onFinish}>
				<Modal
					destroyOnClose
					title={
						data === null
							? t('department.modal-new.title')
							: t('department.modal-update.title')
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
							form='role_form'
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

					<Form.Item
						label={t('department.name.field')}
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

					<Form.Item
						label={t('department.nickname.field')}
						name='nickname'
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

					<Form.Item
						label={t('department.description.field')}
						name='description'
					>
						<Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
					</Form.Item>
				</Modal>
			</Form>
		</>
	);
}
