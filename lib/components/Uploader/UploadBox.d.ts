import React from 'react';
import { useUploadReturn } from './useUpload';
import { VendorConfiguration } from '../../types';
interface UploadBox extends useUploadReturn {
    onUploadClick: () => void;
    vendorConfig: VendorConfiguration;
}
declare const UploadBox: React.FC<UploadBox>;
export default UploadBox;
