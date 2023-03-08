// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/scss/main.scss'],
  runtimeConfig: {
    NEWEBPAY_MERCHANT_ID: 'ID',
    NEWEBPAY_HASH_KEY: 'KEY',
    NEWEBPAY_HASH_IV: 'IV',
  },
});
