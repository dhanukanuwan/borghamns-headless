import React from 'react';
import SiteHeader from "../ui/header/header";
import { getDataFromAPI } from '../lib/api-functions';
import Link from 'next/link';

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

    const { search_q } = await searchParams;

    const searchResults = await getDataFromAPI(
        'wp/v2/search',
        { search: search_q, per_page: 20 }
    );

	return (
		<div className="min-vh-100 d-flex flex-column">
			<SiteHeader pageSlug={['search-results']} searchQuery={ search_q } />
			<main>
				<div className="page-content-wrap">
					<section className="py-5 py-lg-6">
                        <div className="container">

                            { searchResults && searchResults.length > 0 ? (
                                <div className="row">
                                    { searchResults.map( (searchResult: any, index: number) => {

                                        const postUrl = searchResult.url.replace( process.env.WORDPRESS_CMS_URL , '');

                                        return(
                                            <div className="col-12 col-12 my-3 pb-4 border-bottom" key={index}>
                                                <article>
                                                    <header>
                                                        <h2 className="entry-title mb-3">
                                                            <Link href={postUrl}>
                                                                <span dangerouslySetInnerHTML={{__html: `${searchResult.title}`}}></span>
                                                            </Link>
                                                        </h2>
                                                    </header>
                                                    <div className="entry-summary mt-3" dangerouslySetInnerHTML={{__html: `${searchResult.excerpt}`}}></div>
                                                    <div className="mt-4 mt-lg-5">
                                                        <Link className="btn btn-primary rounded-0" href={postUrl}>
                                                            <div className="d-flex">
                                                                <span className="pe-2">Visa mer</span>
                                                                <div className="d-flex align-items-center">
                                                                    <span className="line-right bg-white d-inline-block" style={{marginRight: '-14px'}}></span>
                                                                    <span className="icon-ion-ios-arrow-right"></span>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </article>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Inga resultat hittades</h3>
                                    </div>
                                </div>
                            )}

                        </div>
                    </section>
				</div>
			</main>
		</div>
		
	);
}