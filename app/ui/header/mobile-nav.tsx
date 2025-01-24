'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '../../lib/types';

const MobileNav = ( { menuItems }: {menuItems: MenuItem[]} ) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [activeSubMenu, setActiveSubMenu] = useState<number>(0);

    const handleSubmneu = ( menuID: number ) => {

        if ( menuID !== activeSubMenu ) {
            setActiveSubMenu( menuID );
        } else {
            setActiveSubMenu( 0 );
        }

    }

    return(
        <div className="d-flex d-xl-none overflow-hidden">

            <button type="button" className="btn btn-link mobile-nav-trigger lh-1 p-0 text-white" id="mobile-nav-trigger" aria-label="Öppna navigeringsmenyn" onClick={() => setIsOpen(true)}>
                <span className="icon-ion-android-menu"></span>
            </button>

            <div className={`mobile-nav-container mw-100 position-fixed top-0 bg-white h-100 z-3 py-2 ${isOpen ? 'end-0' : ''}`} id="mobile-nav-container">
                <div className="d-flex">
                    <div className="mobile-logo ps-3 flex-grow-1">
                        <Link className="navbar-brand" href="/">
                            <Image
                                src="/logo.png"
                                width={150}
                                height={80}
                                alt="Borghamns Stenförädling AB"
                                className="mw-100"
                            />
                        </Link>
                    </div>
                    <div className="mobile-nav-close-wrap">
                        <button type="button" className="btn btn-link mobile-nav-trigger mobile-nav-close lh-1 p-0 text-primary" id="mobile-nav-close" aria-label="Stäng navigeringsmenyn" onClick={() => setIsOpen(false)}>
                            <span className="icon-ion-android-close"></span>
                        </button>
                    </div>
                </div>

                <div className="mobile-nav-wrap mt-2 py-3">
                    { menuItems && menuItems.length > 0 &&
                        <ul className="navbar-nav mobile-nav no-hero" itemType="http://www.schema.org/SiteNavigationElement">
                            { menuItems.map( ( navMenuItem: MenuItem ) => {

                                const hasSubItems: boolean = navMenuItem.sub_items && navMenuItem.sub_items.length > 0;

                                return(
                                    <li id={`mobile-menu-item-${navMenuItem.id}`} className={`menu-item mobile-menu-item-${navMenuItem.id} nav-item nav-depth-0 position-relative ${ hasSubItems ? 'menu-item-has-children dropdown' : ''}`} key={navMenuItem.id}>
                                        { hasSubItems ? (
                                            <>
                                                <Link href={navMenuItem.url} aria-haspopup="true" aria-expanded="false" className="nav-link px-3 border-top" id={`mobile-menu-item-dropdown-${navMenuItem.id}`}>
                                                    <span itemProp="name">
                                                        <span dangerouslySetInnerHTML={{__html: navMenuItem.title}}></span>
                                                    </span>
                                                </Link>
                                                <ul className={`dropdown-menu ${activeSubMenu === navMenuItem.id ? 'd-block' : ''}`} aria-labelledby={`mobile-menu-item-dropdown-${navMenuItem.id}`}>

                                                    { navMenuItem.sub_items.map( (subItem: MenuItem) => {
                                                        return(
                                                            <li id={`mobile-menu-item-${subItem.id}`} className={`menu-item mobile-menu-item-${subItem.id} nav-item nav-depth-1 position-relative`} key={subItem.id}>
                                                                <a itemProp="url" href={subItem.url} className="dropdown-item">
                                                                    <span itemProp="name" dangerouslySetInnerHTML={{__html: subItem.title}}></span>
                                                                </a>
                                                            </li>
                                                        );
                                                    })}

                                                </ul>
                                                <span className={`submenu-trigger position-absolute icon-ion-chevron-${activeSubMenu === navMenuItem.id ? 'up' : 'down'}`} onClick={() => handleSubmneu( navMenuItem.id )}></span>
                                            </>
                                        ) : (
                                            <Link itemProp="url" href={navMenuItem.url} className="nav-link px-3 border-top">
                                                <span itemProp="name" dangerouslySetInnerHTML={{__html: navMenuItem.title}}></span>
                                            </Link>
                                        )}
                                    </li>
                                );
                            } )}
                        </ul>
                    }
                </div>

            </div>

        </div>
    )
}

export default MobileNav;