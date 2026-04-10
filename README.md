# @wxn0brp/db-storage-crypt

A storage adapter for `@wxn0brp/db-core` (ValtheraDB) that provides transparent at-rest encryption for your data.

This library ensures that all data persisted to disk is encrypted using modern, authenticated encryption (`aes-256-gcm`). Each database collection is stored as a separate encrypted file.

## Features

- **Strong Encryption:** Uses `aes-256-gcm` for authenticated encryption.
- **Secure Key Management:** Includes a `KeyStore` utility to manage your master encryption key with a password, deriving a secure key using Scrypt.
- **Data Integrity:** Employs HMAC and Additional Authenticated Data (AAD) to ensure the integrity and authenticity of each collection.
- **Seamless Integration:** Designed to work as a custom action handler within `@wxn0brp/db-core`.

## Installation

```bash
npm install @wxn0brp/db-storage-crypt
```

You also need to have `@wxn0brp/db-core` installed.

## Usage

The library is composed of two main parts: the `KeyStore` for managing your encryption key and `EncryptedAction` for handling the encrypted data storage.

### 1. Initialize the KeyStore

The `KeyStore` securely manages your master key by encrypting it with a password.

```typescript
import { KeyStore } from "@wxn0brp/db-storage-crypt";

// Choose a secure location for your keystore
const secureFolder = `./secure`;
const keyStore = new KeyStore({ folder: secureFolder });

const password = "your-very-strong-password";

// If the keystore doesn't exist, initialize it
if (!keyStore.exists()) {
    console.log("Keystore not found. Initializing a new one...");
    keyStore.init(password);
    console.log("Keystore initialized successfully.");
}

// Unlock the keystore to get the master key
const masterKey = keyStore.unlock(password);
console.log("Keystore unlocked.");

// Remember to lock the keystore when you're done
// keyStore.lock();
```

### 2. Configure the Encrypted Storage

Use the master key from the `KeyStore` to initialize `EncryptedAction`. This class will handle all file I/O, encrypting and decrypting data as it's written to and read from the disk.

```typescript
import { EncryptedAction } from "@wxn0brp/db-storage-crypt";

// Use the unlocked master key
const encryptionKey = masterKey.toString("hex");

// A unique salt for your database instance. Store this securely.
const salt = "a-very-unique-salt-for-your-db";

const encryptedDb = new EncryptedAction("./db-data", {
    encryptionKey,
    salt,
});
```

### 3. Integrate with ValtheraDB

Finally, pass the `EncryptedAction` instance to the `ValtheraDB` constructor. `@wxn0brp/db-core` will use it to automatically handle data persistence.

```typescript
import { ValtheraDB } from "@wxn0brp/db-core";

// Assuming you have the 'encryptedDb' instance from the previous step
const db = new ValtheraDB({
    // ... other db-core options
    customActions: encryptedDb,
});

// Now, all database operations are transparently encrypted
await db.insert("users", { id: 1, name: "Alice" });

const users = await db.select("users");
console.log(users); // -> [{ id: 1, name: 'Alice' }]

// The underlying file `./db-data/users.edb` will contain encrypted data.
```

## License

MIT License

## Contributing

Contributions are welcome!
