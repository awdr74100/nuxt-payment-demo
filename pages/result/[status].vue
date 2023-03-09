<template>
  <h1 v-if="route.params.status === 'success'">交易成功</h1>
  <h1 v-else>交易失敗</h1>

  <form action="#">
    <div class="mb-3">
      <label for="id" class="form-label">編號</label>
      <input type="text" class="form-control" id="id" disabled />
    </div>
  </form>
</template>

<script setup lang="ts">
const route = useRoute();

route.params.status;
</script>
