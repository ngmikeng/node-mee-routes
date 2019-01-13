<template>
<div class="login-page-component">
  <a-row>
    <a-col :md="{ span: 8, offset: 8 }">
      <h1 class="title">Node Mee Route</h1>
      <a-card title="Login" :bordered="true">
        <a-form :autoFormCreate="(form)=>{this.form = form}" @submit="handleSubmit" class='login-form'>
          <a-form-item
            fieldDecoratorId="username"
            :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input username!' }]}"
          >
            <a-input
              placeholder='Username'
            >
              <a-icon slot="prefix" type='user' style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item
            fieldDecoratorId="password"
            :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input password!' }]}"
          >
            <a-input
              type='password'
              placeholder='Password'>
              <a-icon slot="prefix" type='lock' style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type='primary' htmlType="submit" class='login-form-button'>
              Log in
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</div>
</template>

<script>
import { apiService, setUserInfo } from '../services';

export default {
  name: 'login-page',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          apiService({
            path: '/auth/login',
            method: 'post',
            data: {
              username: values.username,
              password: values.password
            }
          }).then((result) => {
            setUserInfo(result.data);
            const data = values;
            this.$router.push({ path: '/driver', query: {u: data.username} });
          }).catch((err) => {
            alert(err.message);
          });

        }
      });
    }
  }
}
</script>

<style>
.login-page-component {
}
.login-page-component h1.title {
  margin-top: 80px;
  text-align: center;
  text-transform: uppercase;
}
</style>
