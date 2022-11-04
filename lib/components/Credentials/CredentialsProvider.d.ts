import React from 'react';
import { VendorConfiguration } from '../../types';
export declare type CredentialsStatus = 'loading' | 'missingCredentials' | 'success';
export declare const CredentialsContext: any;
interface CredentialsProviderProps {
    vendorConfig: VendorConfiguration;
}
declare const CredentialsProvider: React.FC<CredentialsProviderProps>;
export default CredentialsProvider;
