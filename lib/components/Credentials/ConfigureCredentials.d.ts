import React from 'react';
import { VendorConfiguration } from '../../types';
declare const ConfigureCredentials: React.FC<{
    onCredentialsSaved?: (success: boolean) => void;
    vendorConfig: VendorConfiguration;
}>;
export default ConfigureCredentials;
