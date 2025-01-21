import Image from 'next/image';
import Link from 'next/link';

const SiteFooter = () => {
    return(
        <footer className="pt-5 bg-dark-text mt-auto">
            <div className="footer-top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-4">
                            <div className="d-flex flex-column">
                                <h3 className="text-white h5 liten mb-3">Borghamns Stenförädling AB</h3>
                                <span className="text-white text-size-medium mb-1">Stenvägen 6, 592 93 Borghamn</span>
                                <span className="text-white text-size-medium mb-1">Tel: <a href="tel:+4614320174" className="text-white">+46 (0)143 - 201 74</a></span>
                                <a href="mailto:info@borghamns-stenforadling.se" className="text-white text-size-medium">info@borghamns-stenforadling.se</a>
                            </div>
                            <div className="d-flex mt-5">
                                <div>
                                    <Image
                                        src="/ce-white.png"
                                        width={30}
                                        height={21}
                                        alt="Certifierat att CE-märka"
                                    />
                                </div>
                                <div className="flex-grow-1 ps-2 pe-lg-5">
                                    <p className="text-white" style={{fontSize: '10px'}}>
                                        Borghamns Stenförädling är certifierat att CE-märka sin produktion. CE-märkning är obligatoriskt för naturstensprodukter från och med 1 juli 2013 och utgör en viktig del av kvalitetskedjan.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-xl-8">
                            <div className="row">
                                <div className="col-12 col-lg-4">
                                    <span className="fw-bold text-white text-uppercase" style={{letterSpacing: '1px'}}>Tjänster</span>
                                    <nav>
                                        <ul className="list-unstyled mt-3">
                                            <li className="mb-2">
                                                <Link href="/offert" className="text-white text-decoration-none text-decoration-hover text-size-medium">Begär Offert</Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link href="/stensorter/bestall-prover" className="text-white text-decoration-none text-decoration-hover text-size-medium">Beställ Prover</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <span className="fw-bold text-white text-uppercase" style={{letterSpacing: '1px'}}>Om Oss</span>
                                    <nav>
                                        <ul className="list-unstyled mt-3">
                                            <li className="mb-2">
                                                <Link href="/alla-dokument/#villkor-frsljning" className="text-white text-decoration-none text-decoration-hover text-size-medium">Villkor</Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link href="/alla-dokument/#sktselanvisningar" className="text-white text-decoration-none text-decoration-hover text-size-medium">Skötselanvisning</Link>
                                            </li>
                                            <li className="mb-2">
                                                <Link href="/alla-dokument/#inspirationsbroschyr" className="text-white text-decoration-none text-decoration-hover text-size-medium">Inspirationsbroschyr</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <Image
                                        src="/footer-4.png"
                                        width={270}
                                        height={99}
                                        alt="Borghamns Kalksten"
                                        className="mw-100"
                                    />

                                    <nav>
                                        <ul className="mt-4 list-unstyled list-inline social-icons d-flex justify-content-center">
                                            <li className="me-3">
                                                <a href="https://www.facebook.com/borghamns.stenforadling" target="_blank" rel="nofollow noopener" className="bg-white rounded-circle text-dark-text text-decoration-none d-flex justify-content-center align-items-center" aria-label="Länk till företagets Facebook-sida">
                                                    <span className="icon-ion-social-facebook"></span>
                                                </a>
                                            </li>
                                            <li className="me-3">
                                                <a href="https://www.linkedin.com/company/borghamns-stenf%C3%B6r%C3%A4dling-ab/" target="_blank" rel="nofollow noopener" className="bg-white rounded-circle text-dark-text text-decoration-none d-flex justify-content-center align-items-center" aria-label="Länk till företagets Linkedin-sida">
                                                    <span className="icon-ion-social-linkedin"></span>
                                                </a>
                                            </li>
                                            <li >
                                                <a href="https://www.youtube.com/@borghamnsstenforadlingab1709" target="_blank" rel="nofollow noopener" className="bg-white rounded-circle text-dark-text text-decoration-none d-flex justify-content-center align-items-center" aria-label="Länk till företagets Youtube-kanal">
                                                    <span className="icon-ion-social-youtube"></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyrights py-3 text-center">
                <hr className="text-white" />
                <span className="text-white text-size-small">Copyright © 2025 Borghamns Stenförädling AB. All Rights Reserved.</span>
            </div>
        </footer>
    );
}

export default SiteFooter;