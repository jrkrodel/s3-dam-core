import React from 'react';
import { SanityUpload, VendorConfiguration } from '../../types';
interface FileDetailsProps {
    onSelect?: (file: SanityUpload) => void;
    persistFileSave: (file: SanityUpload) => void;
    persistFileDeletion: (file: SanityUpload) => void;
    closeDialog: () => void;
    vendorConfig: VendorConfiguration;
    file: SanityUpload;
}
declare const FileDetails: React.FC<FileDetailsProps>;
export default FileDetails;
