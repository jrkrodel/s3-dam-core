import { StateFrom } from 'xstate';
import { DropzoneState } from 'react-dropzone';
import uploadMachine from './uploadMachine';
import { UploaderProps } from './Uploader';
export interface useUploadReturn {
    dropzone: DropzoneState;
    state: StateFrom<typeof uploadMachine>;
    cancelUpload: () => void;
    retry: () => void;
    confirm: () => void;
}
declare const useUpload: ({ accept, vendorConfig, sanityClient, storeOriginalFilename, onSuccess, documentType, }: UploaderProps) => useUploadReturn;
export default useUpload;
