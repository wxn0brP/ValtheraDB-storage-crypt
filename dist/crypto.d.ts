import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { DbOpts } from "@wxn0brp/db-core/types/options";
import { ScryptOptions } from "crypto";
export interface EncryptedActionOptionsInternal {
    encryptionKey: string;
    salt: string;
    keylen?: number;
    options?: ScryptOptions;
}
export type EncryptedActionOptions = EncryptedActionOptionsInternal & Omit<DbOpts, "dbAction">;
export declare class EncryptedAction extends CustomActionsBase {
    folder: string;
    options: EncryptedActionOptions;
    key: Buffer;
    _inited: boolean;
    constructor(folder: string, options: EncryptedActionOptions);
    init(): Promise<void>;
    _encrypt(data: Buffer, collection: string): Buffer;
    _decrypt(payload: Buffer, collection: string): Buffer;
    _read(collection: string): Promise<any[]>;
    _write(collection: string, data: any[]): Promise<void>;
    getCollections(): Promise<string[]>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    removeCollection(collection: string): Promise<boolean>;
}
