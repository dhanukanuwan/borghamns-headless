import { Fragment } from "react";
import parse, { HTMLReactParserOptions, Element, domToReact, DOMNode } from "html-react-parser";
import Link from 'next/link';
import Image from 'next/image';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import CarouselCaption from 'react-bootstrap/CarouselCaption'

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

// Parse and add neccesory classes to tables from WordPress page content.
const parseCarousel = (domNode: Element,  options: HTMLReactParserOptions) => {

    const childElements = (domNode as Element).children;

    console.log( childElements );

    return (
        <Carousel controls={false}>

<CarouselItem className="testimonial-item carousel-item p-4 p-xl-5 bg-white">
                <div className="row">
                    <div className="col-auto col-lg">
                        <p>Det är alltid extra trevligt att lägga/sätta kalksten när det kommer från Borghamns Stenförädling. Den stenen är snäppet bättre bearbetad än andra jag lagt.. Sen är det trevlig, hjälpsam och proffsig personal här !!</p>
                        <div className="mt-3 d-flex align-items-center">
                            <div className="flex-grow-1">
                                <h3 className="liten mb-2 h4">Krister Larsson</h3>
                            </div>
                            <div>
                                <span className="h2 liten text-primary">,,</span>
                            </div>
                        </div>
                    </div>
                </div>
                </CarouselItem>

                <CarouselItem className="testimonial-item carousel-item p-4 p-xl-5 bg-white">
                <div className="row">
                    <div className="col-auto col-lg">
                        <p>Fick fantastisk hjälp av Helena och Borghamns stenförädling att få fram matchande kulör på kompletteringsplattor till vårt snart 100 år gamla trapphusgolv. Snacka om bra service!</p>
                        <div className="mt-3 d-flex align-items-center">
                            <div className="flex-grow-1">
                                <h3 className="liten mb-2 h4">Johan Wellton</h3>
                            </div>
                            <div>
                                <span className="h2 liten text-primary">,,</span>
                            </div>
                        </div>
                    </div>
                </div>
                </CarouselItem>

                <CarouselItem className="testimonial-item carousel-item p-4 p-xl-5 bg-white">
                <div className="row">
                    <div className="col-auto col-lg">
                        <p>Det är alltid extra trevligt att lägga/sätta kalksten när det kommer från Borghamns Stenförädling. Den stenen är snäppet bättre bearbetad än andra jag lagt.. Sen är det trevlig, hjälpsam och proffsig personal här !!</p>
                        <div className="mt-3 d-flex align-items-center">
                            <div className="flex-grow-1">
                                <h3 className="liten mb-2 h4">Krister Larsson</h3>
                            </div>
                            <div>
                                <span className="h2 liten text-primary">,,</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CarouselItem>

           
        {/* <CarouselItem>
          <img src="https://next-cms.local/wp-content/uploads/2024/04/0_0H9A5091-1024x648.jpg" />
          <CarouselCaption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem>
        <img src="https://next-cms.local/wp-content/uploads/2024/04/0_0H9A5091-1024x648.jpg" />
          <CarouselCaption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </CarouselCaption>
        </CarouselItem>
        <CarouselItem>
        <img src="https://next-cms.local/wp-content/uploads/2024/04/0_0H9A5091-1024x648.jpg" />
          <CarouselCaption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </CarouselCaption>
        </CarouselItem> */}
      </Carousel>
    )

}

export function parseHtml(html: string) {

    const options: HTMLReactParserOptions = {
        replace(domNode) {
            if ( domNode instanceof Element && domNode.attribs && domNode.name ) {
                
                const isInternalLink = domNode.name === "a";
                const isImage = domNode.name === "img";
                const isTable = domNode.name === "table";
                const isCarousel =  domNode.name === "div" && domNode.attribs.id === 'carousel_testimonial';

                // Replace CMS url to frontend url.
                if ( isInternalLink ) return parseLink( domNode, options );

                // Update images.
                if ( isImage ) return parseImage( domNode );
                // Update tables.
                if ( isTable ) return parseTable( domNode, options );

                if ( isCarousel ) return parseCarousel( domNode, options );

            }
        },
    };
  
    return parse(html, options);
}