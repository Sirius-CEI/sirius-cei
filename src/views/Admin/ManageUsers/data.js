import React from 'react';
import UserList from './UserList';
import UserSettings from './UserSettings';

const manageUsers = [
	{ title: 'Manage Users', subTitle: 'Add, delete, activate, and deactivate users', icon: 'users', component: <UserList /> },
	{ title: 'My Account', subTitle: 'Edit username and password', icon: 'user-circle', component: <UserSettings /> },
]

export default manageUsers;