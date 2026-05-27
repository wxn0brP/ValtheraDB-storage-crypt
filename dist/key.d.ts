export interface KeyStoreOptions {
    folder: string;
    keyFile?: string;
    saltFile?: string;
}
export declare class KeyStore {
    private folder;
    private keyFile;
    private saltFile;
    private masterKey?;
    constructor(options: KeyStoreOptions);
    init(password: string): void;
    unlock(password: string): Buffer;
    lock(): void;
    exists(): boolean;
    getKey(): Buffer;
    _deriveKey(password: string, salt: Buffer): Buffer;
    _encryptMasterKey(masterKey: Buffer, kek: Buffer): Buffer;
    _decryptMasterKey(payload: Buffer, kek: Buffer): Buffer;
}
