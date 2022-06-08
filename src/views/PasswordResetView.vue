<template>
    <div class="container">
    <form @submit="passwordReset" class="my-4 mx-auto border border-1 border-danger p-4 rounded-3">
        <h2 class="mb-2 display-4 text-danger">Reset your password</h2>
          <div class="mb-2">
              <label for="email" class="form-label">Enter your email</label>
              <input type="email" class="form-control" id="email" required v-model="email">
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <button type="submit" class="btn btn-outline-danger d-inline-block">Submit</button>
            <p v-if="this.outputMessage" class="lead text-danger m-0 ms-2 text-center">{{ this.outputMessage }}</p>
          </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      outputMessage: ''
    }
  },
  methods: {
    async passwordReset (e) {
      e.preventDefault()
      const reset = await axios.post('https://fathomless-meadow-35990.herokuapp.com/sendNewPassword', {
        email: this.email
      })
        .then(function (response) {
          return response.data
        })
        .catch((error) => {
          return error
        })

      if ('code' in reset) {
        this.outputMessage = reset.response.data.message
      }

      if (reset.successful) {
        alert('The password was sent to your e-mail succesfully.')
        this.$router.push('/')
      }
    }
  }
}
</script>
