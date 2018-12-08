<template>
    <div class="map-view-component">
        <h1 class="header">Map View</h1>
        <p>Map View Component</p>
        <div class="g-margin-bot-10">
          <a-button type="primary" @click="testRedirect">Go</a-button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'map-view',
  components: {
  },
  mounted() {
  },
  data() {
    return {

    };
  },
  methods: {
    testRedirect() {
      this.$router.push({ path: 'login', query: { id: '1' }});
    }
  }
}
</script>

<style>
.map-view-component {
}
</style>
