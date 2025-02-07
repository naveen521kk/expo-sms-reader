import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSmsReaderModuleEvents } from './ExpoSmsReader.types';

declare class ExpoSmsReaderModule extends NativeModule<ExpoSmsReaderModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSmsReaderModule>('ExpoSmsReader');
