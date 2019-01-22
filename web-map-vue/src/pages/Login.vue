<template>
  <div class="login-page">
    <b-container>
		  <b-row>
		  	<b-col md="4" offset-md="4">
		  		<h4 class="text-center page-title">MEE ROUTE MAP</h4>
			  	<b-card header-tag="header">
	            <h6 slot="header" class="mb-0">Login</h6>
				  		<b-form @submit="submit" @reset="reset" novalidate>
					      <b-form-group id="exampleInputGroup1"
					                    label="Username"
					                    label-for="exampleInput1"
					                    description="">
					        <b-form-input id="exampleInput1"
					                      type="text"
					                      v-model="formData.username"
					                      required
					                      placeholder="Enter username"
					                      :state="checkUserName">
					        </b-form-input>
					      </b-form-group>
					      <b-form-group id="exampleInputGroup2"
					                    label="Password"
					                    label-for="exampleInput2">
					        <b-form-input id="exampleInput2"
					                      type="password"
					                      v-model="formData.password"
					                      required
					                      placeholder="Enter password">
					        </b-form-input>
					      </b-form-group>
					      <div class="text-right">
					      	<b-button type="submit" variant="primary">Login</b-button>
					      </div>
					    </b-form>
	        </b-card>
		  	</b-col>
		  </b-row>
		</b-container>
  </div>
</template>

<script>

export default {
  name: 'login-page',
  components: {
  },
  computed: {
  	checkUserName() {
  		if (this.formSubmitted) {
  			return this.formData.username ? true : false;
  		}
  		return null;
  	}
  },
  data() {
    return {
    	formSubmitted: false,
    	formData: {}
    }
  },
  methods: {
  	submit(event) {
  		event.preventDefault();
  		this.formSubmitted = true;
  	},
  	reset() {

  	}
  }
}
</script>

<style>
.login-page h4.page-title {
	margin-top: 40px;
}
</style>
