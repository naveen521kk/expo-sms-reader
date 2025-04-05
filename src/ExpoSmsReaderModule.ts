import { NativeModule, requireNativeModule } from "expo";

export interface Sms {
  address: string;
  body: string;
  date: number;
  type: boolean;
}

declare class ExpoSmsReaderModule extends NativeModule {
  requestSmsPermissionsAsync(): Promise<boolean>;
  getSmsPermissionsAsync(): Promise<boolean>;
  readAllSmsAsync(): Promise<Sms[]>;
  readSmsAsync(limit: number, offset: number): Promise<Sms[]>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSmsReaderModule>("ExpoSmsReader");
