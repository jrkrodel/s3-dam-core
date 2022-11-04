import React from 'react';
import { SanityUpload, VendorConfiguration } from '../../types';
import { UploaderProps } from '../Uploader/Uploader';
interface BrowserProps {
    onSelect?: (file: SanityUpload) => void;
    accept?: UploaderProps['accept'];
    vendorConfig: VendorConfiguration;
}
declare const Browser: React.FC<BrowserProps>;
export default Browser;
