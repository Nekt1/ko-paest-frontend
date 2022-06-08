<template>
        <div class="d-flex flex-column flex-sm-row justify-content-between my-2 mt-4" id="profile-page">
            <div class="d-flex flex-column border-1 shadow-sm p-2 me-2 mb-3">
                <img src="../assets/profile-picture.png" alt="" class="d-block img-fluid ">
                <ul class="list-group list-group-flush my-2">
                    <li class="list-group-item">Hey, {{ this.$store.state.user.name }} {{ this.$store.state.user.surname }}!</li>
                    <li class="list-group-item"><span class="fw-bold">E-mail:</span> {{ this.$store.state.user.email }}</li>
                </ul>
                <div class="d-flex flex-column">
                    <button class="btn btn-outline-danger mb-2 d-inline-block" type="button" @click="exitProfile">Exit profile</button>
                    <button class="btn btn-outline-danger mb-2 d-inline-block disabled" type="button">Change profile picture (Temporarily unavailable)</button>
                    <router-link to="changePassword" class="link-danger btn btn-outline-danger d-inline-block">Change password</router-link>
                </div>
            </div>
            <div class="d-flex flex-column border-1 flex-fill shadow-sm px-3">
                <p class="display-4 text-danger">Your saved recipes</p>
                  <div v-for="recipe of this.recipes" class="card mb-2" :key="recipe.num">
                    <div class="card mb-2">
                        <div class="row">
                            <div class="col-4">
                                <img :src="recipe.image_url" alt="" class="img-fluid me-2">
                            </div>
                            <div class="col-8 d-flex flex-column justify-content-evenly align-items-center">
                                <p class="lead my-0">{{ recipe.title }}</p>
                                <div class="d-flex">
                                  <button type="button" class="btn btn-danger d-inline-block me-2" data-bs-toggle="modal" data-bs-target="#profileRecipeModal" @click="getInstructions(recipe.remote_id, recipe.title, recipe.image_url)">Details</button>
                                  <button type="button" class="btn btn-danger d-inline-block" @click="removeRecipe(recipe.remote_id)">Remove recipe</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="profileRecipeModal" tabindex="-1" aria-labelledby="profileRecipeModal" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div id="pdf-content">
              <div class="modal-header">
                  <h5 class="modal-title fst-italic fs-4" id="exampleModalLabel">{{ this.selectedRecipeTitle }}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" v-if="this.selectedRecipe">
                  <p><i class="fa-solid fa-carrot"></i><span class="fw-bold"> Required ingredients:</span> {{combineIngredients(this.selectedRecipe.steps)}}.</p>
                  <p><i class="fa-solid fa-kitchen-set"></i><span class="fw-bold"> Required equipment:</span> {{combineEquipment(this.selectedRecipe.steps)}}.</p>
                  <div v-for="step of this.selectedRecipe.steps" :key="step.id">
                      <p class="d-flex align-items-center"><span class="display-5 me-3 fst-italic">{{ step.number }}</span>{{ step.step }}</p>
                  </div>
              </div>
              <div v-else class="modal-body">Sorry, we couldn't display your recipe instructions. Maybe you could try another one?</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="generatePDF()">Download as PDF</button>
            </div>
          </div>
        </div>
        </div>

</template>

<script>
import axios from 'axios'
import html2pdf from 'html2pdf.js'

export default {
  data () {
    return {
      recipes: '',
      selectedRecipe: '',
      selectedRecipeTitle: '',
      apiKey: '5f297dfffa5544a0b4f15ea398cfb4a7'
    }
  },
  async beforeCreate () {
    const recipes = await axios.get(`https://fathomless-meadow-35990.herokuapp.com/${this.$store.state.user.id}/getRecipes`)
      .then(function (response) {
        return response.data
      })
    this.recipes = recipes
  },
  methods: {
    exitProfile () {
      this.$store.commit('setUser', {})
      this.$router.push({ path: '/' })
    },
    getInstructions (id, title) {
      axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${this.apiKey}`).then(response => {
        this.selectedRecipe = response.data
        this.selectedRecipe = this.selectedRecipe[0]
        this.selectedRecipeTitle = title
      })
    },
    generatePDF () {
      const element = document.getElementById('pdf-content')
      const opt = {
        filename: `${this.selectedRecipeTitle}-recipe`
      }
      html2pdf().set(opt).from(element).save()
    },
    combineIngredients (array) {
      if (array == null) return
      const requiredIngredients = []
      array.forEach(step => {
        step.ingredients.forEach(ingredient => {
          if (!requiredIngredients.includes(ingredient.name)) {
            requiredIngredients.push(ingredient.name)
          }
        })
      })
      return requiredIngredients.join(', ')
    },
    combineEquipment (array) {
      if (array == null) return
      const requiredEquipment = []
      array.forEach(step => {
        step.equipment.forEach(equipm => {
          if (!requiredEquipment.includes(equipm.name)) {
            requiredEquipment.push(equipm.name)
          }
        })
      })
      return requiredEquipment.join(', ')
    },
    removeRecipe (id) {
      const index = this.recipes.findIndex(recipe => recipe.remote_id === id)
      this.recipes.splice(index, 1)
      axios.post('https://fathomless-meadow-35990.herokuapp.com/deleteRecipe', {
        recipe_id: id,
        user_id: this.$store.state.user.id
      })
        .then(function (response) {
          // console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
