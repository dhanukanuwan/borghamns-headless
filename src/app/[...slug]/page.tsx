import React from 'react';
import { getDataFromAPI } from '../lib/api-functions';
import { parseHtml } from '../lib/content-parser';
import SiteHeader from '../ui/header/header';

export async function generateStaticParams() {
	
	const allPages = await getDataFromAPI(
		'nextheadless/v1/getmainnav',
		{ menu_location: 'primary_navigation' }
	);

	const allPageUrls = allPages.menu_items.map((page: any) => {

		const slugString = page.url.replace( process.env.WORDPRESS_CMS_URL , '').slice(0, -1);
		const slugArray = slugString.split('/');

		return {
			slug: slugArray
		}
	});

	allPageUrls.push( { slug: ['offert']});
	allPageUrls.push( { slug: ['stensorter', 'bestall-prover']});

	return allPageUrls;
}

export default async function Page( {params }) {

	const {slug} = await params;

	const pageData = await getDataFromAPI(
		'wp/v2/pages',
		{ slug: slug }
	);

	const pageContent = parseHtml(pageData[0].content.rendered);

	return (
		<div className="min-vh-100 d-flex flex-column">
			<SiteHeader pageSlug={slug} />
			<main>
				<div className="page-content-wrap">
					{pageContent}
				</div>
			</main>
		</div>
		
	);
}
