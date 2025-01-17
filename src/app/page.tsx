import React from 'react';
import SiteHeader from './ui/header/header';
import { getDataFromAPI } from './lib/api-functions';
import { parseHtml } from './lib/content-parser';

export default async function Page() {

	const pageData = await getDataFromAPI(
		'wp/v2/pages',
		{ slug: 'hem' }
	);

	const pageContent = parseHtml(pageData[0].content.rendered);

  return (
    <div className="min-vh-100 d-flex flex-column">
		<SiteHeader pageSlug={[]} />
		<main>
			<div className="page-content-wrap">
				{pageContent}
			</div>
		</main>
	</div>
  );
}
