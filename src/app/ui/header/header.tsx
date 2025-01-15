import Image from 'next/image';
import SmallNav from './small-nav';
import MainNav from './main-nav';
import { getDataFromAPI } from '@/app/lib/api-functions';

const SiteHeader = async ( {pageSlug}) => {

    const heroData = await getDataFromAPI(
        'nextheadless/v1/getpagehero',
        { slug: pageSlug.join('/') }
    );

    return (
        <section className="hero position-relative">

            { heroData.hero_data &&
                <>
                    { heroData.hero_data.hero_image && ! heroData.hero_data.hero_video &&
                        <div className="hero-bg mw-100 d-flex">
                            <Image
                                src={heroData.hero_data.hero_image.large}
                                width={400}
                                height={400}
                                className="w-100 h-auto object-fit-cover"
                                alt={heroData.hero_data.page_title}
                            />
                        </div>
                    }

                    { heroData.hero_data.hero_video &&
                        <div className="hero-bg mw-100 d-flex">
                            <video  className="w-100 object-fit-cover" autoPlay={true} loop={true} muted>
                                <source src={heroData.hero_data.hero_video.url} type="video/mp4" />
                            </video>
                        </div>
                    }
                    
                </>
                
            }
            <div className="hero-content position-absolute top-0 left-0 w-100 h-100 d-flex flex-column">
                <SmallNav />
                <MainNav />
                
                <div className="hero-images-wrap d-flex flex-grow-1 align-items-center">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 col-lg-8 text-center">
                                {heroData.hero_data &&
                                    <h1 className="text-white liten h2" dangerouslySetInnerHTML={{__html: heroData.hero_data.page_title}}></h1>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SiteHeader;