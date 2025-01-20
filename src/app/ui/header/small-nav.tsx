'use client'

import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SmallNav = () => {
    
    const router = useRouter()

    const [isSreachFormOpen, setIsSearchFormClose] = useState<boolean>( false );
    const [searchQ, setSearchQ] = useState<string>('');

    const handleSearchInput = ( event: ChangeEvent<HTMLInputElement>) => {
        setSearchQ( event.target.value );
    }

    const handleSubmit = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();

        if ( searchQ ) return router.push(`/search-results/?search_q=${searchQ}`);
        if ( ! searchQ ) return router.push('/');

    }

    return(
        <div className="small-nav-wrap">
            <nav className="navbar navbar-expand-xl pb-0">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mb-0 ms-auto">

                            <li className="nav-item dropdown d-flex align-items-center">
                                <Link href="/" className="nav-link text-white text-size-medium d-flex">
                                    <span className="d-flex align-items-center">
                                        <Image
                                            src="/flags/sv.png"
                                            width={20}
                                            height={14}
                                            alt="Svenska"
                                        />
                                        <span className="ms-2">Svenska</span>
                                    </span>
                                </Link>
                            </li>

                            

                            <li className="nav-item">
                                <div className="d-flex align-items-center">
                                    <div id="search-wrap" className={`search-wrap ${isSreachFormOpen ? 'd-flex' : 'd-none'}`}>
                                        <form onSubmit={ ( event ) => handleSubmit( event ) }>
                                            <div className="input-group">
                                                <input type="text" name="s" id="search_q" className="form-control rounded-start-pill text-size-medium bg-white border-0" value={searchQ} onChange={(e) => handleSearchInput( e )} style={{height: '45px'}} placeholder="Sök här..." aria-label="Sök här..." />
                                                <button type="submit" className="btn p-0 bg-white rounded-end-pill pe-2" aria-label="Skicka sökfråga">
                                                    <span className="icon-ion-android-search" style={{fontSize: '1.5rem'}}></span>
                                                </button>
                                            </div>
                                            
                                        </form>
                                        <button id="search-close" type="button" className="btn p-0 text-white" aria-label="Stäng sökformuläret" onClick={ () => setIsSearchFormClose( false ) }>
                                            <span className="icon-ion-android-close" style={{fontSize: '1.5rem'}}></span>
                                        </button>
                                    </div>
                                    <button id="search-trigger" type="button" className={`btn p-0 text-white ${isSreachFormOpen ? 'd-none' : ''}`} aria-label="Öppna sökformuläret" onClick={ () => setIsSearchFormClose( true ) }>
                                        <span className="icon-ion-android-search" style={{fontSize: '1.5rem'}}></span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default SmallNav;