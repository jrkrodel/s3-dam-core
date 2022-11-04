import type { SanityDocument } from '@sanity/client';
import React from 'react';
declare const FileReferences: React.FC<{
    fileId: string;
    references?: SanityDocument[];
    isLoaded: boolean;
}>;
export default FileReferences;
