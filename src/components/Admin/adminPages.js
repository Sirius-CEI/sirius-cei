import React from 'react';
import OutcomeAreaExtension from './OutcomeAreaExtension/OutcomeAreaExtension';
import CsvExtension from './CsvExtension/CsvExtension';
import CardExtension from './CardExtension/CardExtension';
import EditPasswordExtension from './EditPasswordExtension/EditPasswordExtension';

const adminPages = [
	{ title: 'Edit Outcome Areas and Indicators', tabText: 'Indicators', icon: 'chart-area', component: <OutcomeAreaExtension /> },
	{ title: 'Update Chart Data', tabText: 'Data', icon: 'file-upload', component: <CsvExtension /> },
	{ title: 'Manage What You Can Do Cards', tabText: 'Action Cards', icon: 'th-large', component: <CardExtension /> },
	{ title: 'Manage Users and User Settings', tabText: 'User Settings', icon: 'user-cog', component: <EditPasswordExtension /> },
]

export default adminPages;