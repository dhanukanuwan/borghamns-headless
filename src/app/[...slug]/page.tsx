import React from 'react';
import { getDataFromAPI } from '../lib/api-functions';
import { parseHtml } from '../lib/content-parser';
import SiteHeader from '../ui/header/header';
import ContactForm from '../ui/contact-form';

export async function generateStaticParams() {
	
	const allPages = await getDataFromAPI(
		'nextheadless/v1/getmainnav',
		{ menu_location: 'primary_navigation' }
	);

	const allPageUrls = allPages.menu_items.map((page: { [key: string]: string}) => {

		const slugString: string = page.url.replace( process.env.WORDPRESS_CMS_URL , '').slice(0, -1);
		const slugArray: string[] = slugString.split('/');

		return {
			slug: slugArray
		}
	});

	allPageUrls.push( { slug: ['offert']});
	allPageUrls.push( { slug: ['stensorter', 'bestall-prover']});

	return allPageUrls;
}

export default async function Page( {params}: { params: Promise<{ slug: string[] }>}) {

	const {slug} = await params;

	const pageData = await getDataFromAPI(
		'wp/v2/pages',
		{ slug: slug }
	);

	const PageContent = (): React.ReactNode => {
		return parseHtml(pageData[0].content.rendered);
	}

	return (
		<div className="min-vh-100 d-flex flex-column">
			<SiteHeader pageSlug={slug} />
			<main>
				<div className="page-content-wrap">
					<PageContent />

					<ContactForm />
				</div>
			</main>
		</div>
		
	);
}
