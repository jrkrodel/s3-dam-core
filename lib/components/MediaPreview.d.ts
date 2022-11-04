import React from 'react';
import { MediaFile } from '../types';
export interface MediaPreview {
    file: MediaFile;
    context: 'browser' | 'input' | 'detailsDialog';
}
declare const MediaPreview: React.FC<MediaPreview>;
export default MediaPreview;
