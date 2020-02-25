import React from 'react';
import PropTypes from 'prop-types';

import './styles.less';

export default function AuthLayout({ children }) {
	return <div className='container'>{children}</div>;
}

AuthLayout.propTypes = {
	children: PropTypes.element.isRequired,
};
