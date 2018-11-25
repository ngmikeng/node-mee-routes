<template>
  <div id="app">
    <a-layout>
      <Header />
      <a-layout>
        <Sider />
        <a-layout-content class="main-content">
          <!-- <MainContent /> -->
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
      <a-layout-footer class="footer">Mee Routes </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sider from './components/Sider.vue';

export default {
  name: 'app',
  components: {
    Header,
    Sider
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.footer {
  text-align: center;
}

.main-content {
  padding:  20px;
}
</style>
