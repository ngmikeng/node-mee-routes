<template>
  <div id="map-request">
  </div>
</template>

<script>

export default {
  name: 'map-request',
  components: {
  },
  mounted() {
    this.initMap();
  },
  data() {
    return {
      map: null
    }
  },
  methods: {
    initMap() {
      const center = {lat:  10.762622, lng: 106.660172};
      const location = {};
      this.map = new window.google.maps.Map(document.getElementById('map-request'), {zoom: 15, center: center});
      this.marker = new window.google.maps.Marker({
        position: center,
        map: this.map,
        draggable: true
      });
      this.map.addListener('click', (event) => {
        location.lat = event.latLng.lat();
        location.lng = event.latLng.lng();
        this.marker.setPosition(location);
      });
      this.marker.addListener('dragend', (event) => {
        location.lat = event.latLng.lat();
        location.lng = event.latLng.lng();
      });
    }
  }
}
</script>

<style>
#map-request {
  width: 100%;
  height: 100%;
  min-height: 500px; 
}
</style>
