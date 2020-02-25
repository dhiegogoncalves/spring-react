import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ConfigProvider, Layout } from 'antd';

import './styles.less';

import portugueseLocale from 'antd/es/locale/pt_BR';
import spanishLocale from 'antd/es/locale/es_ES';

import SideMenu from '../../../components/Dashboard/SideMenu';
import Header from '../../../components/Dashboard/Header';

export default function Dashboard({ children }) {
	const language = useSelector(state => state.auth.language);

	const [collapsed, setCollapsed] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState(
		language === 'pt' ? portugueseLocale : spanishLocale
	);

	const toggle = () => {
		setCollapsed(!collapsed);
	};

	useEffect(() => {
		if (language === 'pt') {
			setCurrentLanguage(portugueseLocale);
		} else {
			setCurrentLanguage(spanishLocale);
		}
	}, [language]);

	return (
		<ConfigProvider locale={currentLanguage}>
			<Layout className='container'>
				<SideMenu collapsed={collapsed} />
				<Layout>
					<Header collapsed={collapsed} toggle={toggle} />
					{children}
				</Layout>
			</Layout>
		</ConfigProvider>
	);
}

Dashboard.propTypes = {
	children: PropTypes.element.isRequired,
};
