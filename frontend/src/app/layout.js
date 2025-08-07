import React from 'react';
import '@mantine/core/styles.css';

import {
	ColorSchemeScript,
	MantineProvider,
	mantineHtmlProps,
} from '@mantine/core';

export const metadata = {
	title: 'Jobtracker- Admin Management App',
	description:
		'Jobtracker is designed to create and manage job postings, track applicants.',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en' {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body>
				<MantineProvider>{children}</MantineProvider>
			</body>
		</html>
	);
}
