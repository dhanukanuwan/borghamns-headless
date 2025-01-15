import { MenuItem } from "./types";
import parse, { HTMLReactParserOptions, Element, domToReact, DOMNode } from "html-react-parser";
import Link from 'next/link';
import Image from 'next/image'

export const getDataFromAPI = async ( endpoint: string, args: any) => {

    let linkParams = '';

    if( args ) {
        linkParams = '/?';

        for (const [key, value] of Object.entries( args )) {
            linkParams = `${linkParams}${key}=${value}&`;
        }
    }

    try {
        const response = await fetch( `${process.env.WORDPRESS_API_URL}${endpoint}${linkParams}`);
        const apiResponse = await response.json();

        return apiResponse;
        
    } catch (error) {
        return error;
    }

}

export const getMainNavMenu = async () => {

    const navMenuItems = await getDataFromAPI(
        'nextheadless/v1/getmainnav',
        { menu_location: 'primary_navigation' }
    );

    let organizedMenuItems = [];

    if ( navMenuItems && navMenuItems.success ) {

        navMenuItems.menu_items.forEach( ( menuItem: any ) => {

            const newItem:  MenuItem = {
                id: menuItem.ID,
                menu_order: menuItem.menu_order,
                title: menuItem.title,
                url: menuItem.url.replace( process.env.WORDPRESS_CMS_URL , '/'),
                sub_items: []
            };

            const parentMenuItem: number = parseInt( menuItem.menu_item_parent, 10 );

            // Check if menu item is a child item.
            if (  parentMenuItem !== 0 ) {

                // Get parent menu item index.
                let newParentItemIndex = organizedMenuItems.findIndex( (item) => item.id === parentMenuItem );

                if ( newParentItemIndex !== -1 ) {
                    
                    let parentSubItems = organizedMenuItems[ newParentItemIndex ].sub_items;

                    if ( parentSubItems ) {
                        // Add new sub menu item to the parent sub menu items.
                        parentSubItems.push( newItem );
                        organizedMenuItems[ newParentItemIndex ].sub_items = parentSubItems;
                    }

                }

            } else {

                organizedMenuItems = [ ...organizedMenuItems, newItem ];

            }

        });

    }

    return organizedMenuItems;

}
  
export function parseHtml(html: string) {

    //const content = html.replace(/\n{2,}/g, '<br />');

    const options: HTMLReactParserOptions = {
        replace(domNode) {
            if ( domNode instanceof Element && domNode.attribs && domNode.name ) {
                
                const isInternalLink = domNode.name === "a";
                const isImage = domNode.name === "img";
                const isTable = domNode.name === "table";
                const childElements = (domNode as Element).children;

                if ( isInternalLink ) {
                    const updatedLink = domNode.attribs.href.replace( process.env.WORDPRESS_CMS_URL, '/');

                    return(
                        <Link href={updatedLink} className={domNode.attribs.class}>
                            {domToReact(childElements as DOMNode[], options)}
                        </Link>
                    );
                }

                if ( isImage ) {
                    
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

                if ( isTable ) {
                    return(
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover">
                                {domToReact(childElements as DOMNode[], options)}
                            </table>
                        </div>
                    );
                }

            }
        },
    };
  
    return parse(html, options);
}