import React from 'react';
import './globals.scss'
import { lora } from './fonts';

interface SEOMetadata {
	title: string;
	description: string;
}

export const metadata: SEOMetadata = {
  title: 'Borghamns Stenförädling AB',
  description: 'Svensk natursten från våra egna brott',
}

export default function RootLayout({ children }) {

	return (
		<html lang="en">
			<body className={lora.variable}>
				{children}
			</body>
		</html>
	)
}
