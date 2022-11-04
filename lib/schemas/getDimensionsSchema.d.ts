import { VendorConfiguration } from '../types';
declare const getDimensionsSchema: (vendorConfig: VendorConfiguration) => {
    name: string;
    title: string;
    type: string;
    fields: {
        name: string;
        type: string;
    }[];
};
export default getDimensionsSchema;
