import parse, { HTMLReactParserOptions, Element, domToReact, DOMNode } from "html-react-parser";
import Link from 'next/link';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import Accordion from 'react-bootstrap/Accordion';
import AccordionItem from 'react-bootstrap/AccordionItem';
import AccordionHeader from 'react-bootstrap/AccordionHeader';
import AccordionBody from 'react-bootstrap/AccordionBody';

// Parse and modify img elements from WordPress page content.
const parseImage = (domNode: Element ) => {

    const imageHeight: number = parseInt( domNode.attribs.height, 10 ) || 100;
    const imageWidth: number = parseInt( domNode.attribs.width, 10 ) || 1024;
    const imageSrc: string = domNode.attribs.src ? domNode.attribs.src : domNode.attribs['data-src'];
    const imageSizes: string = domNode.attribs.sizes ? domNode.attribs.sizes : 'auto, (max-width: 540px) 100vw, 540px';
    const imageAlt: string = domNode.attribs.alt ? domNode.attribs.alt : '';
    const imageClasses: string = domNode.attribs.class ? domNode.attribs.class : '';

    return(
        <Image
            src={imageSrc ? imageSrc : null}
            height={imageHeight}
            width={imageWidth}
            sizes={imageSizes}
            alt={imageAlt}
            className={imageClasses}
        />
    );

}

// Parse and update page links from WordPress page content.
const parseLink = (domNode: Element,  options: HTMLReactParserOptions) => {

    const childElements = (domNode as Element).children; 

    const updatedLink = domNode.attribs.href.replace( process.env.WORDPRESS_CMS_URL, '/');

    return(
        <Link href={updatedLink} className={domNode.attribs.class}>
            {domToReact(childElements as DOMNode[], options )}
        </Link>
    );

}

// Parse and add neccesory classes to tables from WordPress page content.
const parseTable = (domNode: Element,  options: HTMLReactParserOptions) => {
    
    const childElements = (domNode as Element).children;

    return(
        <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
                {domToReact(childElements as DOMNode[], options)}
            </table>
        </div>
    );
}

// Make the carousel work.
const parseCarousel = (domNode: Element,  options: HTMLReactParserOptions) => {

    const childElements = (domNode as Element).children;
    let carouselElements = [];

    childElements.forEach( ( childElement: Element ) => {
        if ( childElement.attribs.class && childElement.attribs.class.includes( 'carousel-inner' ) ) {
            carouselElements = (childElement as Element).children;
        }
    } );

    if ( carouselElements.length === 0 ) return;

    return (
        <div className="bg-white">
            <Carousel controls={false} >

                { carouselElements.map( ( carouselElement: Element, index: number ) => {

                    const carouselElementInner = (carouselElement as Element).children;

                    return(
                        <CarouselItem className="testimonial-item carousel-item p-4 p-xl-5 bg-white" key={index}>
                            {domToReact(carouselElementInner as DOMNode[], options)}
                        </CarouselItem>
                    );
                })}
            </Carousel>
        </div>
    )

}

const parseAccordionButton = (domNode: Element,  options: HTMLReactParserOptions) => {

    const childElements = (domNode as Element).children;

    return(
        <>
            {domToReact(childElements as DOMNode[], options)}
        </>
    )

}

// Make the accodions work.
const parseAccordion = (domNode: Element,  options: HTMLReactParserOptions) => {

    const childElements = (domNode as Element).children;

    return(
        <Accordion defaultActiveKey="0">
            { childElements.map( ( childElement: Element, index: number ) => {

                const accordionChildElemets = (childElement as Element).children;

                return(
                    <AccordionItem eventKey={`${index}`} className={childElement.attribs.class} key={index}>
                         { accordionChildElemets.map( ( accordionChildElemet: Element, index: number ) => {

                            const innerElements = (accordionChildElemet as Element).children;
                            const elementClass = accordionChildElemet.attribs.class;

                            return (
                                <div key={index}>
                                    { elementClass === 'accordion-header' &&
                                        <AccordionHeader as="div">
                                            {domToReact(innerElements as DOMNode[], options)}
                                        </AccordionHeader>
                                    }

                                    { elementClass.includes( 'accordion-collapse' ) &&
                                        <AccordionBody>
                                             {domToReact(innerElements as DOMNode[], options)}
                                        </AccordionBody>
                                    }
                                </div>
                            );
                         })}
                    </AccordionItem>
                );
            })}
        </Accordion>
    )

}

export function parseHtml(html: string) {

    const options: HTMLReactParserOptions = {
        replace(domNode) {
            if ( domNode instanceof Element && domNode.attribs && domNode.name ) {
                
                const isInternalLink: boolean = domNode.name === "a";
                const isImage: boolean = domNode.name === "img";
                const isTable: boolean = domNode.name === "table";
                const isCarousel: boolean =  domNode.name === "div" && domNode.attribs.id === 'carousel_testimonial';
                const isAccordionButton: boolean = domNode.name === "button" && domNode.attribs.class.includes( 'accordion-button' );
                const isAccordion: boolean = domNode.name === "div" && domNode.attribs.class === 'accordion';

                // Replace CMS url to frontend url.
                if ( isInternalLink ) return parseLink( domNode, options );

                // Update images.
                if ( isImage ) return parseImage( domNode );
                // Update tables.
                if ( isTable ) return parseTable( domNode, options );
                // Inject Bootstrap components for the carousel.
                if ( isCarousel ) return parseCarousel( domNode, options );
                // Remove accordion btn element to avoid nesting.
                if ( isAccordionButton ) return parseAccordionButton( domNode, options );
                // Inject Bootstrap components from the accordion.
                if ( isAccordion ) return parseAccordion( domNode, options ); 

            }
        },
    };
  
    return parse(html, options);
}