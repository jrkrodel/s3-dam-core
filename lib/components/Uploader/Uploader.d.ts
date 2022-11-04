import React from 'react';
import { SanityClient } from '@sanity/client';
import { MediaFile, SanityUpload, VendorConfiguration } from '../../types';
export interface UploaderProps {
    vendorConfig: VendorConfiguration;
    sanityClient: SanityClient;
    onSuccess: (document: SanityUpload) => void;
    /**
     * MIME file type
     */
    accept?: 'audio/*' | 'video/*' | 'application/pdf' | string | string[];
    /**
     * Whether or not we should use the file's name when uploading
     */
    storeOriginalFilename?: boolean;
    /**
     * Opens the media browser / library
     */
    openBrowser?: () => void;
    /**
     * File already uploaded in this instance
     */
    chosenFile?: MediaFile;
    /**
     * Used to clear the field via the remove button
     */
    removeFile?: () => void;
    documentType: string;
}
declare const Uploader: React.FC<UploaderProps>;
export default Uploader;
