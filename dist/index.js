import { EncryptedAction } from "./crypto.js";
export * from "./crypto.js";
export * from "./key.js";
export const DYNAMIC = {
    crypt: async (folder, options) => {
        return new EncryptedAction(folder, options);
    }
};
