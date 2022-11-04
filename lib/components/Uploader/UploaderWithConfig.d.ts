import React from 'react';
import { UploaderProps } from './Uploader';
export interface UploaderWithConfigProps extends Omit<UploaderProps, 'sanityClient'> {
}
declare const UploaderWithConfig: React.FC<UploaderWithConfigProps>;
export default UploaderWithConfig;
