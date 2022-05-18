<template>
<nav class="navbar navbar-expand-md navbar-dark bg-danger">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><i class="fa-solid fa-candy-cane"></i> KO PAĒST?</a>
    <button class="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link text-white">Home</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/signup" class="nav-link ">Sign Up</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/login" class="nav-link">Log In</router-link>
        </li>
        <li class="nav-item">
            <router-link to="/profile" class="nav-link">Profile</router-link>
        </li>
        <!-- <li class="nav-item">
            <a class="nav-link text-white" href="#">Log In</a>
        </li> -->
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
