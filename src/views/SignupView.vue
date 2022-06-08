<template>
    <div class="container">
        <form @submit="registerUser" class="my-4 mx-auto border border-1 border-danger p-4 rounded-3">
            <h2 class="mb-2 display-4 text-danger">Sign Up</h2>
            <div class="mb-2">
                <label for="exampleInputName" class="form-label">Name</label>
                <input type="text" class="form-control" id="exampleInputName" required v-model="name">
            </div>
            <div class="mb-2">
                <label for="exampleInputSurname" class="form-label">Surname</label>
                <input type="text" class="form-control" id="exampleInputLastName" required v-model="surname">
            </div>
            <div class="mb-2">
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp" required v-model="email">
            </div>
            <div class="mb-4">
              <label for="registrationPasswordInput" class="form-label">Password</label>
              <input type="password" class="form-control" id="registrationPasswordInput" required v-model="password" minlength="8" placeholder="Minimum 8 characters">
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <button type="submit" class="btn btn-outline-danger">Submit</button>
              <p v-if="this.outputMessage" class="lead text-danger m-0 ms-2 text-center">{{ this.outputMessage }}</p>
            </div>
        </form>
        <p class="lead text-center">Already have an account? <router-link to="login" class="link-danger">Log in</router-link></p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: '',
      name: '',
      surname: '',
      outputMessage: ''
    }
  },
  methods: {
    async registerUser (e) {
      e.preventDefault()
      this.outputMessage = ''

      const registration = await axios.post('https://fathomless-meadow-35990.herokuapp.com/signup', {
        name: this.name,
        surname: this.surname,
        email: this.email,
        password: this.password
      })
        .then(function (response) {
          return response.data
        })
        .catch((error) => {
          return error
        })

      if ('code' in registration) {
        this.outputMessage = JSON.parse(registration.request.response).message
      }
      if (registration.successful) {
        this.outputMessage = 'The registration was successful. You can now log in from the login page.'
      }
    }
  }
}
</script>
