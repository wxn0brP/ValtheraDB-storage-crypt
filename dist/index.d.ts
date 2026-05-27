import { EncryptedAction, EncryptedActionOptions } from "./crypto.js";
export * from "./crypto.js";
export * from "./key.js";
export declare const DYNAMIC: {
    crypt: (folder: string, options: EncryptedActionOptions) => Promise<EncryptedAction>;
};
