import CryptoJS from 'crypto-js';

export const useCrypto = () => {
  const config = useRuntimeConfig();

  const aesEncrypt = (plain: string) => {
    const key = CryptoJS.enc.Utf8.parse(config.NEWEBPAY_HASH_KEY);
    const iv = CryptoJS.enc.Utf8.parse(config.NEWEBPAY_HASH_IV);

    return CryptoJS.AES.encrypt(plain, key, {
      iv,
      mode: CryptoJS.mode.CBC, // default
      padding: CryptoJS.pad.Pkcs7, // default
    }).toString(CryptoJS.format.Hex);
  };

  const shaEncrypt = (plain: string) => {
    return CryptoJS.SHA256(plain).toString(CryptoJS.enc.Hex);
  };

  return { aesEncrypt, shaEncrypt };
};
