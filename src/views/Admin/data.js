import React from 'react';
import OutcomeAreaExtension from './OutcomeAreas/index';
import CsvExtension from './Csv/CsvExtension';
import CardExtension from './Cards';
import ManageUsers from './ManageUsers/index';

const adminPages = [
	{ title: 'Edit Outcome Areas and Indicators', tabText: 'Indicators', icon: 'chart-area', path: '/indicators', component: <OutcomeAreaExtension /> },
	{ title: 'Manage Users and User Settings', tabText: 'User Settings', icon: 'user-cog', path: 'user-settings', component: <ManageUsers /> },
	{ title: 'Update Chart Data', tabText: 'Data', icon: 'file-upload', path: '/data-upload', component: <CsvExtension /> },
	{ title: 'Manage What You Can Do Cards', tabText: 'Action Cards', icon: 'th-large', path: '/action-cards',  component: <CardExtension /> },
]

export default adminPages;