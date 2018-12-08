<template>
  <div class="default-layout">
    <a-layout>
      <Header />
      <a-layout>
        <Sider />
        <a-layout-content class="main-content">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">Mee Routes </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Sider from '../components/Sider.vue';

export default {
  name: 'default-layout',
  components: {
    Header,
    Sider
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
