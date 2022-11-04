import { UploaderProps } from '../components/Uploader/Uploader';
export declare function parseExtension(extension: string): any;
/**
 * Converts user input on `accept` (.mp4, audio/*, etc.) into MIME types we can then use in Browser & in useUpload to filter/accept only those files matching the desired extensions.
 * This is especially handy for extensions where their MIME type doesn't include their extension, such as .m4a -> audio/mp4.
 */
export default function parseAccept(accept: UploaderProps['accept']): UploaderProps['accept'];
