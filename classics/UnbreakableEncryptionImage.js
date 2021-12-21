import fs from 'fs';
import path from 'path';

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

function toImageSrc(name, base64String) {
  return `data:image/${name};base64,${base64String}`;
}

const imagePath = './image.png';

fs.readFile(imagePath, (err, data) => {
  if (err) {
    console.error('Error loading image', err);
  }

  // convert image to base64 string
  const ext = path.extname(imagePath);
  const name = path.basename(imagePath, ext);
  const base64Image = data.toString('base64');

  const [dummyKey, encryptedImage] = encrypt(base64Image);
  const decryptedImage = decrypt([dummyKey, encryptedImage]);

  console.log(`Original image: '${toImageSrc(name, base64Image)}'`);
  console.log(`Random secret:   '${toImageSrc(name, dummyKey)}'`);
  console.log(`Encrypted image: '${toImageSrc(name, encryptedImage)}'`);
  console.log(`Decrypted image: '${toImageSrc(name, decryptedImage)}'`);
});

