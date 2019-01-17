import React from 'react';
import OutcomeAreaExtension from './OutcomeAreas';
import CsvExtension from './Csv';
import CardExtension from './Cards';
import ManageUsers from './ManageUsers';

const adminPages = [
	{ title: 'Update Chart Data', tabText: 'Data', icon: 'file-upload', path: '/data-upload', component: <CsvExtension /> },
	{ title: 'Edit Outcome Areas and Indicators', tabText: 'Indicators', icon: 'chart-area', path: '/indicators', component: <OutcomeAreaExtension /> },
	{ title: 'Manage What You Can Do Cards', tabText: 'Action Cards', icon: 'th-large', path: '/action-cards',  component: <CardExtension /> },
	{ title: 'Manage Users and User Settings', tabText: 'User Settings', icon: 'user-cog', path: 'user-settings', component: <ManageUsers /> },
]

export default adminPages;