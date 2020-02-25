import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Home from '../pages/Home';

import UserConfiguration from '../pages/Configuration/User';
import GroupsConfiguration from '../pages/Configuration/Group';
import DepartmentsConfiguration from '../pages/Configuration/Department';

export default function Routes() {
	return (
		<Switch>
			<Route path='/' exact component={Login} />
			<Route path='/home' component={Home} isPrivate />
			<Route
				path='/configuration/users'
				component={UserConfiguration}
				isPrivate
			/>
			<Route
				path='/configuration/groups'
				component={GroupsConfiguration}
				isPrivate
			/>
			<Route
				path='/configuration/departments'
				component={DepartmentsConfiguration}
				isPrivate
			/>
		</Switch>
	);
}
