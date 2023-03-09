// import CryptoJS from 'crypto-js';

// export const useCrypto = () => {
//   const config = useRuntimeConfig();

//   const aesEncrypt = (plain: string) => {
//     const key = CryptoJS.enc.Utf8.parse(config.NEWEBPAY_HASH_KEY);
//     const iv = CryptoJS.enc.Utf8.parse(config.NEWEBPAY_HASH_IV);

//     return CryptoJS.AES.encrypt(plain, key, {
//       iv,
//       mode: CryptoJS.mode.CBC, // default
//       padding: CryptoJS.pad.Pkcs7, // default
//     }).toString(CryptoJS.format.Hex);
//   };

//   const shaEncrypt = (plain: string) => {
//     return CryptoJS.SHA256(plain).toString(CryptoJS.enc.Hex);
//   };

//   return { aesEncrypt, shaEncrypt };
// };
import { createCipheriv, createDecipheriv, createHash } from 'node:crypto';

export const aesEncrypt = (val: string) => {
  const config = useRuntimeConfig();

  const cipher = createCipheriv(
    'aes-256-cbc',
    config.NEWEBPAY_HASH_KEY,
    config.NEWEBPAY_HASH_IV,
  );

  return cipher.update(val, 'utf-8', 'hex') + cipher.final('hex');
};

export const aesDecrypt = (val: string) => {
  const config = useRuntimeConfig();

  const decipher = createDecipheriv(
    'aes-256-cbc',
    config.NEWEBPAY_HASH_KEY,
    config.NEWEBPAY_HASH_IV,
  );

  return decipher.update(val, 'hex', 'utf-8') + decipher.final('utf-8');
};

export const shaEncrypt = (val: string) => {
  return createHash('sha256').update(val).digest('hex');
};
