<template>
  <header id="app-header">
		<b-navbar toggleable type="light" variant="light">
        <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
        <b-navbar-brand>Mee Route</b-navbar-brand>
        <b-collapse is-nav id="nav_text_collapse">
            <b-navbar-nav>
                <b-nav-text>Map View</b-nav-text>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
  </header>
</template>

<script>

export default {
  name: 'app-header',
  components: {
  }
}
</script>

<style>
#app-header {
  
}
</style>
