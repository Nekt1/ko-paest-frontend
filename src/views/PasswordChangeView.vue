<template>
  <div class="container">
    <form @submit="passwordChange" class="my-4 mx-auto border border-1 border-danger p-4 rounded-3">
        <h2 class="mb-2 display-4 text-danger">Change your password</h2>
          <div class="mb-2">
              <label for="oldPassword" class="form-label">Old password</label>
              <input type="password" class="form-control" id="oldPassword" required v-model="old_password">
          </div>
          <div class="mb-2">
              <label for="newPassword" class="form-label">New password</label>
              <input type="password" class="form-control" id="newPassword" required v-model="new_password" minlength="8" placeholder="Minimum 8 characters">
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
      old_password: '',
      new_password: '',
      outputMessage: ''
    }
  },
  methods: {
    async passwordChange (e) {
      e.preventDefault()

      if (this.old_password === this.new_password) {
        this.outputMessage = 'Passwords cannot be the same'
        return
      }
      const change = await axios.post(`https://fathomless-meadow-35990.herokuapp.com/${this.$store.state.user.id}/changePassword`, {
        old_password: this.old_password,
        new_password: this.new_password
      })
        .then(function (response) {
          return response.data
        })
        .catch((error) => {
          return error
        })

      if ('code' in change) {
        this.outputMessage = change.response.data.message
      }

      if (change.successful) {
        alert('The password was changed succesfully.')
        this.$router.push('/')
      }
    }
  }
}
</script>
