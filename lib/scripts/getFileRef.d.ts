import { UploaderProps } from '../components/Uploader/Uploader';
export declare type GetFileRefProps = Pick<UploaderProps, 'storeOriginalFilename'> & {
    file: File;
};
/**
 * Creates unique file names for uploads if storeOriginalFilename is set to false
 */
export default function getFileRef({ storeOriginalFilename, file, }: GetFileRefProps): string;
