export type MenuItem = {
    id: number;
    menu_order: number;
    sub_items: any;
    title: string;
    url: string;
}

export type DynamicObjectType = {
    [key: string]: string | number | string[]
}

export type CacheTagsType = {
    [key: string]: string | string[]
}