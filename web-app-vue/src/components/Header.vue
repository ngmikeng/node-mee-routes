<template>
  <a-layout-header class="header">
    <div class="logo">Mee Routes</div>
    <div class="right-nav">
      <span>Identifier</span>
    </div>
  </a-layout-header>
</template>

<script>

export default {
  name: 'layout-header',
  components: {}
}
</script>

<style>
.header {
  font-weight: bold;
  color: #fff;
}
.header .logo {
  display: inline-block;
  float: left;
}
.header .right-nav {
  display: inline-block;
  float: right;
}
</style>
