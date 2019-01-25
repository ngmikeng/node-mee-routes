<template>
  <div class="login-page">
    <b-container>
		  <b-row>
		  	<b-col md="4" offset-md="4">
		  		<h4 class="text-center page-title">MEE ROUTE MAP</h4>
			  	<b-card header-tag="header">
	            <h6 slot="header" class="mb-0">Login</h6>
				  		<b-form @submit="submit" @reset="reset" novalidate>
					      <b-form-group label="Username"
					                    label-for="username"
					                    description="">
					        <b-form-input name="username"
					                      type="text"
					                      v-model="formData.username"
					                      v-validate="'required'"
					                      required
					                      placeholder="Enter username"
					                      :class="{'is-invalid': errors.has('username')}">
					        </b-form-input>
					        <span class="text-danger">{{ errors.first('username') }}</span>
					      </b-form-group>
					      <b-form-group label="Password"
					                    label-for="password">
					        <b-form-input name="password"
					                      type="password"
					                      v-model="formData.password"
					                      v-validate="'required'"
					                      required
					                      placeholder="Enter password"
					                      :class="{'is-invalid': errors.has('password')}">
					        </b-form-input>
					        <span class="text-danger">{{ errors.first('password') }}</span>
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
import { apiService, setUserInfo } from '../services';

export default {
  name: 'login-page',
  components: {
  },
  computed: {
  	checkUserName() {
  		if (this.formSubmitted) {
  			return this.formData.username ? null : false;
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
  		this.$validator.validateAll().then((result) => {
        if (result) {
      		apiService({
            path: '/auth/login',
            method: 'post',
            data: this.formData
          }).then((result) => {
            setUserInfo(result.data);
            this.$router.push({ path: '/' });
          }).catch((err) => {
            alert(err.message);
          });
        }
      });
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
