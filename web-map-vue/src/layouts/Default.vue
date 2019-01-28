<template>
  <div class="layout-default">
    <Header />
    <main class="main-content">
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

.layout-default .main-content {
  margin-top: 15px;
}
</style>
