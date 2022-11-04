import React from 'react';
import { SanityUpload } from '../../types';
interface FilePreviewProps {
    onSelect?: (file: SanityUpload) => void;
    onEdit?: (file: SanityUpload) => void;
    file: SanityUpload;
}
declare const FilePreview: React.FC<FilePreviewProps>;
export default FilePreview;
