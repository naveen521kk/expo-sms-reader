import { registerWebModule, NativeModule } from 'expo';

import { ExpoSmsReaderModuleEvents } from './ExpoSmsReader.types';

class ExpoSmsReaderModule extends NativeModule<ExpoSmsReaderModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoSmsReaderModule);
