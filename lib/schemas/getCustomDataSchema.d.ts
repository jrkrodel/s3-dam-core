import { SchemaType } from '@sanity/types';
import { VendorConfiguration } from '../types';
declare type CustomField = string | SchemaType;
interface SchemaConfigOptions {
    title?: string;
    customFields?: CustomField[];
}
export declare const getCustomDataFieldKey: (vendorConfig: VendorConfiguration) => string;
export declare const getCustomDataTypeKey: (vendorConfig: VendorConfiguration) => string;
declare const getCustomDataSchema: (vendorConfig: VendorConfiguration, schemaConfig?: SchemaConfigOptions) => {
    name: string;
    title: string;
    options: {
        collapsible: boolean;
        collapsed: boolean;
    };
    type: string;
    fields: any[];
};
export default getCustomDataSchema;
