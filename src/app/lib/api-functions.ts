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

            const newItem = {
                id: menuItem.ID,
                menu_order: menuItem.menu_order,
                title: menuItem.title,
                url: menuItem.url.replace( process.env.WORDPRESS_CMS_URL , '/'),
                sub_items: []
            };

            const parentMenuItem = parseInt( menuItem.menu_item_parent, 10 );

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