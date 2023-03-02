export interface ICrypto {
    compare(plaintext: string, cipherText: string): Promise<boolean>;
    decrypt(cipherText: string): Promise<string>;
    encrypt(plaintext: string): Promise<string>;
}