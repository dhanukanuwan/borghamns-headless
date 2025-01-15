import Image from 'next/image';
import Link from 'next/link';
import { getMainNavMenu } from '@/app/lib/api-functions';
import { MenuItem } from '@/app/lib/types';

const MainNav = async () => {

    const navMenuItems = await getMainNavMenu();

    return(
        <nav className="navbar navbar-expand-xl">
			<div className="container">
				<Link className="navbar-brand" href="/">
                    <Image
                        src="/logo-white.png"
                        width={170}
                        height={47}
                        alt="Borghamns Stenförädling AB"
                        className="mw-100"
                    />
				</Link>

				<div className="collapse navbar-collapse">

                    { navMenuItems && navMenuItems.length > 0 &&
                        <ul id="menu-new-menu" className="navbar-nav ms-auto me-auto mb-2 mb-lg-0" itemType="http://www.schema.org/SiteNavigationElement">
                            { navMenuItems.map( ( navMenuItem: MenuItem ) => {

                                const hasSubItems: boolean = navMenuItem.sub_items && navMenuItem.sub_items.length > 0;

                                return(
                                    <li id={`menu-item-${navMenuItem.id}`} className={`menu-item menu-item-${navMenuItem.id} nav-item nav-depth-0 ${ hasSubItems ? 'menu-item-has-children dropdown' : ''}`} key={navMenuItem.id}>
                                        { hasSubItems ? (
                                            <>
                                                <Link href={navMenuItem.url} aria-haspopup="true" aria-expanded="false" className="nav-link text-white" id={`menu-item-dropdown-${navMenuItem.id}`}>
                                                    <span itemProp="name">
                                                        <span dangerouslySetInnerHTML={{__html: navMenuItem.title}}></span>
                                                        <span className="icon-ion-chevron-down ms-1"></span>
                                                    </span>
                                                </Link>
                                                <ul className="dropdown-menu" aria-labelledby={`menu-item-dropdown-${navMenuItem.id}`}>

                                                    { navMenuItem.sub_items.map( (subItem: MenuItem) => {
                                                        return(
                                                            <li id={`menu-item-${subItem.id}`} className={`menu-item menu-item-${subItem.id} nav-item nav-depth-1`} key={subItem.id}>
                                                                <a itemProp="url" href={subItem.url} className="dropdown-item">
                                                                    <span itemProp="name" dangerouslySetInnerHTML={{__html: subItem.title}}></span>
                                                                </a>
                                                            </li>
                                                        );
                                                    })}

                                                </ul>
                                            </>
                                        ) : (
                                            <Link itemProp="url" href={navMenuItem.url} className="nav-link text-white">
                                                <span itemProp="name" dangerouslySetInnerHTML={{__html: navMenuItem.title}}></span>
                                            </Link>
                                        )}
                                    </li>
                                );
                            } )}
                        </ul>
                    }

					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="btn btn-primary rounded-0" aria-current="page" href="/offert">
								<div className="d-flex">
									<span className="pe-2">Begär offert</span>
									<div className="d-flex align-items-center">
										<span className="line-right bg-white d-inline-block" style={{marginRight: "-14px"}}></span>
										<span className="icon-ion-ios-arrow-right"></span>
									</div>
								</div>
							</Link>
						</li>
					</ul>

				</div>

			
			</div>
		</nav>
    );

}

export default MainNav;