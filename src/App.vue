<template>
<nav class="navbar navbar-expand-md navbar-dark bg-danger">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><i class="fa-solid fa-utensils"></i> KO PAĒST?</a>

    <button class="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" :class="{active: $route.name === 'home'}">Home</router-link>
        </li>
        <li class="nav-item">
            <router-link v-if="Object.keys(this.$store.state.user).length === 0" to="/signup" class="nav-link" :class="{active: $route.name === 'signup'}">Sign Up</router-link>
        </li>
        <li class="nav-item">
            <router-link v-if="Object.keys(this.$store.state.user).length === 0" to="/login" class="nav-link" :class="{active: $route.name === 'login'}">Log In</router-link>
        </li>
        <li class="nav-item">
            <router-link v-if="Object.keys(this.$store.state.user).length !== 0" to="/profile" class="nav-link" :class="{active: $route.name === 'profile'}">Profile</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <router-view/>
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>

<script>
export default {
  beforeCreate () {
    this.$store.commit('initialiseUser')
  }
}
</script>
