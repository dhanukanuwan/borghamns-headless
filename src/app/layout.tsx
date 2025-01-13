import React from 'react';
import './globals.scss'
import { lora } from './fonts';
import SiteHeader from './ui/header/header';

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
				<div className="min-vh-100 d-flex flex-column">
					<SiteHeader />
					<main>
						{children}
					</main>
				</div>
			</body>
		</html>
	)
}
