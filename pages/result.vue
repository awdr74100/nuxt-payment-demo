<template>
  <h1
    class="text-center mt-4 text-success"
    v-if="route.query.Status === 'SUCCESS'"
  >
    交易成功
  </h1>
  <h1 class="text-center mt-4 text-danger" v-else>交易失敗</h1>

  <div class="w-50 mx-auto mt-4">
    <form action="#" v-if="route.query.Status === 'SUCCESS'">
      <div class="mb-3">
        <label class="form-label" for="MerchantID">商店編號</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.MerchantID"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="Amt">訂單總額</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.Amt"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="MerchantOrderNo">訂單編號</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.MerchantOrderNo"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="EscrowBank">銀行名稱</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.EscrowBank"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="ItemDesc">訂單標題</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.ItemDesc"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="PaymentType">交易方式</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.PaymentType"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="PayTime">交易時間</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.PayTime"
          disabled
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="PayBankCode">銀行代號</label>
        <input
          type="text"
          class="form-control"
          :value="route.query.PayBankCode"
          disabled
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
