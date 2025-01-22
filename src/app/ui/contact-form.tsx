'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { getDataFromAPI } from '../lib/api-functions';

interface FormDataType {
    id: string;
    val: string;
}

interface FormInputdata {
    [key: string]: string;
}

type FormStatus = "default" | "sending" | "error" | "success";

const ContactForm = () => {

    const defaultFormData: FormInputdata = {
        gcf_first_name: '',
        gcf_last_name: '',
        gcf_user_email: '',
        gcf_telephone_number: '',
        gcf_subject: '',
        gcf_message: ''
    }

    const [userFormData, setUserFormData] = useState<FormInputdata>( defaultFormData );
    const [formStatus, setFormStatus] = useState<FormStatus>( 'default' );

    const handleInputChange = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string ) => {

        if ( ! id ) return;

        const updatedData = {...userFormData, [id]: event.target.value };

        setUserFormData( updatedData );

    }

    const handleFormSubmit = async ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        (event.target as HTMLElement).classList.add('was-validated');

        const isValidated: boolean = (event.target as HTMLFormElement).checkValidity();

        if ( ! isValidated ) return;

        setFormStatus( 'sending' );

        const formData: FormDataType[] = [
            { id: 'gcf_first_name', val: userFormData.gcf_first_name },
            { id: 'gcf_last_name', val: userFormData.gcf_last_name },
            { id: 'gcf_user_email', val: userFormData.gcf_user_email },
            { id: 'gcf_telephone_number', val: userFormData.gcf_telephone_number },
            { id: 'gcf_subject', val: userFormData.gcf_subject },
            { id: 'gcf_message', val: userFormData.gcf_message }
        ];

        const response = await getDataFromAPI(
            'borghamns/v1/submitcontactform',
            { form_data: JSON.stringify( formData ) },
            'POST'
        );

        if ( response.success ) {
            setFormStatus( 'success' );
            (event.target as HTMLElement).classList.remove('was-validated');
            
            setUserFormData( defaultFormData );

        } else {
            setFormStatus( 'error' );
        }

    }

    return(
        <section className="py-5 py-xl-6 wp-block-borghamns-general-content-section">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-7">
                        <div className="d-flex align-items-center">
                            <span className="line-right bg-primary d-inline-block"></span>
                            <span className="ms-2 text-dark-text">Kontakta oss</span>
                        </div>
                        <h2 className="mt-2 mb-3 liten">Hur kan vi hjälpa dig?</h2>
                        <p>Välkommen att kontakta oss via formuläret nedan.</p>

                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-5">
                        <div className="mt-2 w-100 d-inline-block">
                            <hr />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="d-flex mb-4">
                            <div className="me-2">
                                <span className="icon-ion-home" style={{fontSize: '1.5rem'}}></span>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column">
                                <span className="h6 mb-1 liten">Vår Adress</span>
                                <span>Stenvägen 6, 592 93 Borghamn</span>
                            </div>
                        </div>
                        <div className="d-flex mb-4">
                            <div className="me-2">
                                <span className=" icon-ion-email" style={{fontSize: '1.5rem'}}></span>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column">
                                <span className="h6 mb-1 liten">E-post</span>
                                <a href="mailto:info@borghamns-stenforadling.se" className="text-dark-text">info@borghamns-stenforadling.se</a>
                            </div>
                        </div>
                        <div className="d-flex mb-4">
                            <div className="me-2">
                                <span className="icon-ion-android-call" style={{fontSize: '1.5rem'}}></span>
                            </div>
                            <div className="flex-grow-1 d-flex flex-column">
                                <span className="h6 mb-1 liten">Telefon</span>
                                <a href="tel:+4614320174" className="text-dark-text">+46 (0)143 - 201 74</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-8">
                        <form className="needs-validation" id="gen-contact-form" noValidate={true} onSubmit={( event ) => handleFormSubmit( event )} >
                            
                            <div className="row mb-3">
                                <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                                    <label htmlFor="gcf_first_name" className="visually-hidden">Förnamn</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="gcf_first_name"
                                        className="form-control bg-white rounded-0" 
                                        value={userFormData.gcf_first_name}
                                        onChange={(event) => handleInputChange( event, 'gcf_first_name' )}
                                        placeholder="Förnamn"
                                        aria-label="Förnamn"
                                        aria-describedby="firstNameHelpBlock"
                                        required={true}
                                    />
                                    <div id="firstNameHelpBlock" className="invalid-feedback">Detta fält får inte vara tomt.</div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="gcf_last_name" className="visually-hidden">Efternamn</label>
                                    <input
                                        type="text" 
                                        name="last_name" 
                                        id="gcf_last_name" 
                                        className="form-control bg-white rounded-0" 
                                        placeholder="Efternamn" 
                                        aria-label="Efternamn"
                                        value={userFormData.gcf_last_name}
                                        onChange={(event) => handleInputChange( event, 'gcf_last_name' )}
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12 col-lg-6 mb-3 mb-lg-0">
                                    <label htmlFor="gcf_user_email" className="visually-hidden">E-post</label>
                                    <input
                                        type="email" 
                                        name="user_email" 
                                        id="gcf_user_email" 
                                        className="form-control bg-white rounded-0" 
                                        placeholder="E-post" 
                                        aria-label="E-post" 
                                        aria-describedby="emailHelpBlock" 
                                        required={true}
                                        value={userFormData.gcf_user_email}
                                        onChange={(event) => handleInputChange( event, 'gcf_user_email' )}
                                    />
                                    <div id="emailHelpBlock" className="invalid-feedback">Vänligen ange en giltig e-postadress</div>
                                </div>
                                <div className="col-12 col-lg-6">
                                    <label htmlFor="gcf_telephone_number" className="visually-hidden">Telefonnummer</label>
                                    <input
                                        type="tel" 
                                        name="telephone_number" 
                                        id="gcf_telephone_number" 
                                        className="form-control bg-white rounded-0" 
                                        placeholder="Telefonnummer" 
                                        aria-label="Telefonnummer" 
                                        aria-describedby="telephoneHelpBlock" 
                                        required={true}
                                        value={userFormData.gcf_telephone_number}
                                        onChange={(event) => handleInputChange( event, 'gcf_telephone_number' )}
                                    />
                                    <div id="telephoneHelpBlock" className="invalid-feedback">Detta fält får inte vara tomt.</div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-12">
                                    <label htmlFor="gcf_subject" className="visually-hidden">Ämne</label>
                                    <input
                                        type="text" 
                                        name="subject" 
                                        id="gcf_subject" 
                                        className="form-control bg-white rounded-0" 
                                        placeholder="Ämne" 
                                        aria-label="Ämne" 
                                        aria-describedby="subjectHelpBlock" 
                                        required={true}
                                        value={userFormData.gcf_subject}
                                        onChange={(event) => handleInputChange( event, 'gcf_subject' )}
                                    />
                                    <div id="subjectHelpBlock" className="invalid-feedback">Detta fält får inte vara tomt.</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12">
                                    <label htmlFor="gcf_message" className="visually-hidden">Meddelande</label>
                                    <textarea
                                        className="form-control bg-white rounded-0" 
                                        name="message" 
                                        id="gcf_message" 
                                        rows={6} 
                                        placeholder="Skriv ditt meddelande här" 
                                        aria-label="Meddelande" 
                                        aria-describedby="messageHelpBlock" 
                                        required={true}
                                        value={userFormData.gcf_message}
                                        onChange={(event) => handleInputChange( event, 'gcf_message' )}
                                    ></textarea>
                                    <div id="messageHelpBlock" className="invalid-feedback">Detta fält får inte vara tomt.</div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mt-3">
                                    <button type="submit" className="btn btn-primary rounded-0" aria-label="Skicka meddelande">
                                        <div className="d-flex">
                                            <span className="pe-2">Skicka meddelande</span>
                                            { formStatus === 'sending' ? (
                                                <div id="submit-icon-loading" >
                                                    <span className="icon-ion-android-refresh animate-spin"></span>
                                                </div>
                                            ) : (
                                                <div className="d-flex align-items-center" id="submit-icon-send">
                                                    <span className="line-right bg-white d-inline-block" style={{marginRight: '-14px'}}></span>
                                                    <span className="icon-ion-ios-arrow-right"></span>
                                                </div>
                                            )}
                                            
                                            
                                        </div>
                                    </button>
                                </div>
                                
                                { formStatus === 'success' &&
                                    <div className="col-12 mt-3" id="success-alert">
                                        <div className="alert alert-success" role="alert">
                                            Tack för att du kontaktar oss. Vi återkommer till dig så snart som möjligt.
                                        </div>
                                    </div>
                                }
                                
                                { formStatus === 'error' &&
                                    <div className="col-12 mt-3" id="error-alert">
                                        <div className="alert alert-danger" role="alert">
                                        Något gick fel. Försök igen senare.
                                        </div>
                                    </div>
                                }
                                
                            </div>

                        </form>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default ContactForm;