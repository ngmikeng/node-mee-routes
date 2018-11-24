<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      mode="inline"
      :style="{ height: '100%', borderRight: 0 }"
    >
      <a-menu-item key="1">
        <router-link to="/map-view" exact>
          <a-icon type="calendar" />
          <span>Map View</span>
        </router-link>
      </a-menu-item>
		  <a-menu-item key="2">
        <router-link to="/user">
          <a-icon type="user" />
          <span>User</span>
        </router-link>
	    </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>

export default {
  name: 'sider',
  components: {}
}
</script>

<style>
a.router-link-active, li.router-link-active a {
  font-weight: bold
}
</style>
