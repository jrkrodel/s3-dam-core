import { SanityUpload, VendorUpload } from '../../types';
export declare type UploadEvent = {
    type: 'SELECT_FILE';
    file?: File;
} | {
    type: 'RETRY';
} | {
    type: 'RESET_UPLOAD';
} | {
    type: 'CANCEL_INPUT';
} | {
    type: 'VENDOR_ERROR';
    error?: Error;
} | {
    type: 'VENDOR_PROGRESS';
    data: number;
} | {
    type: 'VENDOR_DONE';
    data: VendorUpload;
} | {
    type: 'SANITY_DONE';
    data: SanityUpload;
};
declare const uploadMachine: any;
export default uploadMachine;
