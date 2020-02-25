import React from 'react';
import { Descriptions } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

export default function Details({ data }) {
	const { t } = useTranslation();

	return (
		<Descriptions
			size='small'
			column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
		>
			<Descriptions.Item label={t('title.created-by')}>
				{data.createdBy ? data.createdBy.name : ''}
			</Descriptions.Item>
			<Descriptions.Item label={t('title.date-created')}>
				{data.dateCreated
					? moment.utc(data.dateCreated).format('DD/MM/YYYY - HH:mm:ss')
					: ''}
			</Descriptions.Item>
			<Descriptions.Item label={t('title.modified-by')}>
				{data.modifiedBy ? data.modifiedBy.name : ''}
			</Descriptions.Item>
			<Descriptions.Item label={t('title.date-modified')}>
				{data.dateModified
					? moment.utc(data.dateModified).format('DD/MM/YYYY - HH:mm:ss')
					: ''}
			</Descriptions.Item>
		</Descriptions>
	);
}
