import React from 'react';
import './globals.scss'
import { lora } from './fonts';
import SiteFooter from './ui/footer';
import SiteAccessibility from './ui/accessibility';

interface SEOMetadata {
	title: string;
	description: string;
}

export const metadata: SEOMetadata = {
  title: 'Borghamns Stenförädling AB',
  description: 'Svensk natursten från våra egna brott',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

	return (
		<html lang="sv-SE">
			<body className={lora.variable}>
				{children}
				<SiteFooter />
				<SiteAccessibility />
			</body>
		</html>
	)
}
