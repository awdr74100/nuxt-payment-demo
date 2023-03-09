<template>
  <h1 class="text-center mt-4">確認訂單</h1>

  <div class="w-50 mx-auto mt-4" v-if="data?.order">
    <form action="https://ccore.newebpay.com/MPG/mpg_gateway" method="post">
      <div class="mb-3">
        <label for="id" class="form-label">編號</label>
        <input
          type="text"
          class="form-control"
          id="id"
          :value="data.order.id"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">信箱</label>
        <input
          type="email"
          class="form-control"
          id="email"
          :value="data.order.email"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="title" class="form-label">標題</label>
        <input
          type="text"
          class="form-control"
          id="title"
          :value="data.order.title"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label">總額</label>
        <input
          type="number"
          class="form-control"
          id="amount"
          :value="data.order.amount"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="createdAt" class="form-label">建立時間</label>
        <input
          type="text"
          class="form-control"
          id="createdAt"
          :value="new Date(data.order.createdAt * 1000).toLocaleString()"
          disabled
        />
      </div>
      <div class="mb-3">
        <label for="updatedAt" class="form-label">更新時間</label>
        <input
          type="text"
          class="form-control"
          id="updatedAt"
          :value="new Date(data.order.updatedAt * 1000).toLocaleString()"
          disabled
        />
      </div>
      <input type="hidden" name="MerchantID" :value="data.payment.MerchantID" />
      <input type="hidden" name="TradeInfo" :value="data.payment.TradeInfo" />
      <input type="hidden" name="TradeSha" :value="data.payment.TradeSha" />
      <input type="hidden" name="Version" :value="data.payment.Version" />
      <div class="text-end">
        <button type="submit" class="btn btn-primary">結帳</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data } = await useFetch(`/api/orders/${route.params.id}`, {
  pick: ['order', 'payment'],
});
</script>
