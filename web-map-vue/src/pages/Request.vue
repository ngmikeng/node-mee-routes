<template>
  <div class="request-page">
    <b-container fluid>
      <b-row>
        <b-col md="3">
          <nav>
            <b-list-group>
              <b-list-group-item v-for="request in listRequests">
                <h6><b>{{ request.name }}</b></h6>
                <p><small>{{ request.pickupAddress }}</small></p>
              </b-list-group-item>
            </b-list-group>
          </nav>
        </b-col>
        <b-col md="9">
          <map-request></map-request>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MapRequest from '../components/MapRequest.vue';

export default {
  name: 'request-page',
  components: {
    MapRequest
  },
  data() {
    return {
      listRequests: [
        { id: 1, name: 'John Doe', pickupAddress: '2662 Cesar Avenue' },
        { id: 2, name: 'Pete Son', pickupAddress: '1234 Longo Avenue' },
        { id: 3, name: 'Andy Day', pickupAddress: '2662 Delan Avenue' },
      ]
    }
  }
}
</script>

<style>

</style>
