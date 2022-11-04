import { SanityUpload } from '../types';
import { GetFileRefProps } from './getFileRef';
export default function getBasicFileMetadata(props: GetFileRefProps): Pick<SanityUpload, 'fileSize' | 'contentType' | 'fileName'>;
