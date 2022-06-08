import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'

const store = createStore({
  state: {
    user: {}
  },
  mutations: {
    initialiseUser (state) {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user'))
        state.user = user
      }
    },
    setUser (state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(state.user))
    }
  }
}
)

createApp(App).use(router).use(store).mount('#app')
