<template>
  <div class="request-detail-page">
    <p>{{ $route.params.id }}</p>
    <map-request></map-request>
  </div>
</template>

<script>
import MapRequest from '../components/MapRequest.vue';

export default {
  name: 'request-detail-page',
  components: {
    MapRequest
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>
