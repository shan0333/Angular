export const API_URLS = {
    ITEM_MASTER: '/spaceage/item-master',
    CUSTOMER: `/spaceage/customer`,
    PROJECT: `/spaceage/project`,
    PACKAGING_TYPE: `/spaceage/packagingtype`,
    COUNTRY: `/spaceage/country`,
    GET_BOMBY_ID: (id: any) => `/spaceage/bombyid/${id}`,
    UPLOAD_FILE: `/spaceage/upload`,
    BARCODE_ID: (id: any, value: any) => `/spaceage/gunscanner/${id}/${value}`,
}