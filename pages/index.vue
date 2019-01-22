<template>
  <div class="container">
    <b-form v-if="!$store.state.authUser" @submit.prevent="login">
      <p v-if="form.error" class="error">
        {{ form.error }}
      </p>
      <b-form-group id="exampleInputGroup1"
                    label="Email address:"
                    label-for="exampleInput1"
                    description="이메일 입력">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.username"
                      required
                      placeholder="Endter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Your Password:"
                    label-for="exampleInput2"
                    description="비밀번호 입력">
        <b-form-input id="exampleInput2"
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <div v-else>
      Hello {{ $store.state.authUser.username }}!
      <pre>I am the secret content, I am shown only when the use is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">
        Logout
      </button>
    </div>
    <p>
      <NuxtLink to="/secret">
        Super secret page
      </NuxtLink>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        error: null,
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          username: this.form.username,
          password: this.form.password
        })
        this.form.username = ''
        this.form.password = ''
        this.form.error = null
      } catch (e) {
        this.form.error = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.form.error = e.message
      }
    }
  }
}
</script>

<style>
.container {
  padding: 100px;
}
.error {
  color: red;
}
</style>
