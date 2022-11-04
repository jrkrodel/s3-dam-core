import { SchemaType } from '@sanity/types';
import { VendorConfiguration } from '../types';
declare type CustomField = string | SchemaType;
interface SchemaConfigOptions {
    title?: string;
    customFields?: CustomField[];
}
declare const getStoredFileSchema: (vendorConfig: VendorConfiguration, schemaConfig?: SchemaConfigOptions) => {
    name: string;
    title: string;
    type: string;
    fieldsets: {
        name: string;
        title: string;
        options: {
            collapsible: boolean;
            collapsed: boolean;
        };
    }[];
    fields: ({
        name: string;
        title: string;
        description: string;
        type: string;
        fieldset?: undefined;
        of?: undefined;
        options?: undefined;
    } | {
        name: string;
        title: string;
        type: string;
        description?: undefined;
        fieldset?: undefined;
        of?: undefined;
        options?: undefined;
    } | {
        name: string;
        title: string;
        type: string;
        fieldset: string;
        description?: undefined;
        of?: undefined;
        options?: undefined;
    } | {
        name: string;
        title: string;
        description: string;
        fieldset: string;
        type: string;
        of: {
            type: string;
        }[];
        options?: undefined;
    } | {
        name: string;
        title: string;
        options: {
            collapsible: boolean;
            collapsed: boolean;
        };
        type: string;
        description?: undefined;
        fieldset?: undefined;
        of?: undefined;
    })[];
    preview: {
        select: {
            title: string;
            fileName: string;
            description: string;
            assetURL: string;
            media: string;
        };
        prepare: ({ media, assetURL, fileName, title, description }: any) => {
            title: any;
            subtitle: any;
            media: any;
        };
    };
};
export default getStoredFileSchema;
