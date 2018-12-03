<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-menu-item :key="index" v-for="(item, index) in menus">
        <router-link :to="item.path">
          <a-icon :type="item.icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
const menus = [
  {
    name: 'Map View',
    path: '/map-view',
    icon: 'calendar'
  },
  {
    name: 'User',
    path: '/user',
    icon: 'user'
  },
  {
    name: 'Customer Points',
    path: '/customer-points',
    icon: 'dashboard'
  },
  {
    name: 'Driver',
    path: '/driver',
    icon: 'car'
  }
];

export default {
  name: 'sider',
  components: {},
  data() {
    return {
      menus
    }
  }
}
</script>

<style>
a.router-link-active, li.router-link-active a {
  font-weight: bold
}
</style>
