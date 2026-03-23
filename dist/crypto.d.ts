import { CustomActionsBase } from "@wxn0brp/db-core/base/custom";
import { DbOpts } from "@wxn0brp/db-core/types/options";
import { VQuery } from "@wxn0brp/db-core/types/query";
import { ScryptOptions } from "crypto";
export interface EncryptedActionOptions extends DbOpts {
    encryptionKey: string;
    salt: string;
    keylen?: number;
    options?: ScryptOptions;
}
export declare class EncryptedAction extends CustomActionsBase {
    folder: string;
    options: EncryptedActionOptions;
    key: Buffer;
    constructor(folder: string, options: EncryptedActionOptions);
    private encrypt;
    private decrypt;
    private _read;
    private _write;
    getCollections(): Promise<string[]>;
    ensureCollection({ collection }: VQuery): Promise<boolean>;
    issetCollection({ collection }: VQuery): Promise<boolean>;
    removeCollection({ collection }: VQuery): Promise<boolean>;
}
