<template>
  <div class="layout-default">
    <Header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  name: 'layout-default',
  components: {
    Header
  }
}
</script>

<style>
.footer {
  text-align: center;
}

.main-content {
  padding:  20px;
}
</style>
