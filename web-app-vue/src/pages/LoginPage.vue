<template>
<div class="login-page-component">
  <h1>Node Mee Route</h1>
  <a-form :autoFormCreate="(form)=>{this.form = form}" @submit="handleSubmit" class='login-form'>
    <a-form-item
      fieldDecoratorId="userName"
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
</div>
</template>

<script>

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
          const data = values;
          this.$router.push({ path: '/driver', query: {id: data.username} });
        }
      });
    }
  }
}
</script>

<style>
.login-page-component {
}
</style>
