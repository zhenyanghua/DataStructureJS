/**
 * Return Buffer of specified size filled with random bytes
 * @param length
 * @return {*}
 */
function getRandomBytes(length) {
  const keyStringArray = [];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    keyStringArray.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }
  return Buffer.from(keyStringArray.join(''));
}

/**
 * Encrypt the string
 * @param original string
 */
function encrypt(original) {
  const originalBytes = Buffer.from(original);
  const dummyKey = getRandomBytes(originalBytes.length);
  const encryptedKey = Buffer.alloc(originalBytes.length);
  let i = 0;
  while(i < originalBytes.length) {
    const originalByte = originalBytes.readUInt8(i);
    const dummyByte = dummyKey.readUInt8(i);
    encryptedKey.writeUInt8(originalByte ^ dummyByte, i);
    i++
  }
  return [dummyKey, encryptedKey];
}

/**
 * Decrypt to the original String
 * @param keyPair [secret, encryptedKey]
 */
function decrypt([dummyKey, encryptedKey]) {
  const originalBytes = Buffer.alloc(encryptedKey.length);
  let i = 0;
  while(i < encryptedKey.length) {
    const encryptedByte = encryptedKey.readUInt8(i);
    const dummyByte = dummyKey.readUInt8(i);
    originalBytes.writeUInt8(encryptedByte ^ dummyByte, i);
    i++;
  }
  return originalBytes.toString('utf8');
}

const original = 'Hello ☃!'
const [dummyKey, encryptedKey] = encrypt(original);
const decryptedKey = decrypt([dummyKey, encryptedKey]);

console.log(`Original words:  '${original}'`);
console.log(`Random secret:   '${dummyKey.toString('utf8')}'`);
console.log(`Encrypted words: '${encryptedKey.toString('utf8')}'`);
console.log(`Decrypted words: '${decryptedKey}'`);
