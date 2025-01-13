import Image from 'next/image';
import SmallNav from './small-nav';
import MainNav from './main-nav';

const SiteHeader = () => {
    return (
        <section className="hero position-relative">
            <div className="hero-bg mw-100 d-flex">
                <Image
                    src="https://borghamns-stenforadling.se/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2024/09/home-hero.jpg.webp"
                    width={400}
                    height={400}
                    className="w-100 h-auto object-fit-cover"
                    alt="Hem"
                />
            </div>
            <div className="hero-content position-absolute top-0 left-0 w-100 h-100 d-flex flex-column">
                <SmallNav />
                <MainNav />
                
                <div className="hero-images-wrap d-flex flex-grow-1 align-items-center">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-12 col-lg-8 text-center">
                                <h1 className="text-white liten h2">Välkommen till oss på Borghamns Stenförädling AB</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default SiteHeader;