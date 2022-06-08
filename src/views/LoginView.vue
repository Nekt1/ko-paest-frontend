<template>
    <div class="container">
        <form @submit="onSubmit" class="mx-auto my-4 p-4 border border-danger rounded-3">
                <h2 class="mb-2 display-4 text-danger">Log In</h2>
                <div class="mb-2">
                    <label for="emailInput" class="form-label">Email address</label>
                    <input type="email" v-model="email" class="form-control" id="emailInput" aria-describedby="emailHelp">
                </div>
                <div class="mb-2">
                    <label for="passwordInput" class="form-label">Password</label>
                    <input type="password" v-model="password" class="form-control" id="passwordInput">
                </div>
                <router-link to="resetPassword" class="link-danger">Forgot your password?</router-link>
                <div class="d-flex justify-content-between align-items-center mt-2">
                  <button type="submit" class="btn btn-outline-danger">Enter</button>
                  <p v-if="this.errorMessage" class="lead text-danger m-0">{{ this.errorMessage }}</p>
                </div>
        </form>
        <p class="lead text-center">Not registered? <router-link to="/signup" class="link-danger">Create an account</router-link></p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      userData: {},
      errorMessage: ''
    }
  },
  methods: {
    async onSubmit (e) {
      e.preventDefault()
      this.errorMessage = ''

      const login = await axios.post('https://fathomless-meadow-35990.herokuapp.com/signin', {
        email: this.email,
        password: this.password
      })
        .then(function (response) {
          return response.data
        })
        .catch((error) => {
          return error
        })

      if ('message' in login) {
        this.errorMessage = JSON.parse(login.request.response).message
      } else {
        this.$store.commit('setUser', login)
        this.$router.push({ path: '/profile' })
      }
    }
  }
}
</script>
