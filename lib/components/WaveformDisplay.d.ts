import React from 'react';
import { ColorHueKey } from '@sanity/color';
declare const WaveformDisplay: React.FC<{
    waveformData?: number[];
    colorHue?: ColorHueKey;
    style?: React.CSSProperties;
}>;
export default WaveformDisplay;
