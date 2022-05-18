<template>
  <div class="home container mt-4">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <form class="border border-danger rounded-2 px-3 pb-5 pt-3">
        <!-- <h1 class="display-3 fst-italic text-danger text-center">KO PAĒST?</h1> -->
        <img class="d-block img-fluid mx-auto" src="../assets/ko-paest-logo.jpg">
        <div class="row">
            <div class="mb-3 col">
                <label for="searchMode" class="form-label fw-bold">Choose your search mode:</label>
                <select v-model="searchMode" class="form-select" aria-label="Select the search mode" title="Choose the mode to search the recipes" id="searchMode" @change="this.apiInput = ''">
                    <option value="ingredients">Search by ingredients</option>
                    <option value="nutrients">Search by calories</option>
                    <option value="name">Search by recipe name</option>
                </select>
            </div>
        </div>

        <div v-if="searchMode === 'ingredients' || searchMode === 'name'" class="mb-3">
            <label for="apiInput" class="form-label fw-bold"><span v-if="searchMode === 'ingredients'">Enter your products:</span><span v-if="searchMode === 'name'">Enter the name of recipe:</span></label>
            <div class="input-group">
                <input type="text" class="form-control" id="apiInput" v-model="apiInput" v-bind:placeholder="placeholder">
                <button class="btn btn-outline-secondary" type="button" id="button-addon" @click="this.apiInput=''">X</button>
            </div>
        </div>

        <div v-if="searchMode === 'nutrients'" class="mb-3">
            <label for="caloriesInput" class="form-label fw-bold">Enter the amount of calories:</label>
            <div class="d-flex">
            <div class="input-group">
              <span class="input-group-text rounded-0">Min</span>
              <input type="number" class="form-control rounded-0" id="nutrientsMin" v-model="nutrientsMin">
              <button class="btn btn-outline-secondary" type="button" id="button-addon" @click="this.nutrientsMin=''">X</button>
            </div>
            <div class="input-group">
              <span class="input-group-text rounded-0">Max</span>
              <input type="number" class="form-control rounded-0" id="nutrientsMax" v-model="nutrientsMax">
              <button class="btn btn-outline-secondary" type="button" id="button-addon" @click="this.nutrientsMax=''">X</button>
            </div>
            </div>
        </div>

        <div class="mb-3 col">
                <label for="searchAmount" class="form-label fw-bold">Choose the amount of recipes to search:</label>
                <select class="form-select" v-model="searchAmount" aria-label="Select the amount" title="Choose how many recipes to search" id="searchAmount">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
        </div>

        <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-danger" @click="sendInput"><i class="fa-solid fa-magnifying-glass"></i> Search</button>
            <button type="submit" class="btn btn-danger ms-2" @click="getRandomRecipes"><i class="fa-solid fa-dice"></i> Surprise me!</button>
        </div>
    </form>

    <div v-if="isFetched && this.recipes.length > 1" class="mt-5 px-4">
        <div class="d-flex row">
          <div v-for="recipe of recipes" :key="recipe.id" class="card text-center px-0 col-md-4 mb-2">
            <div class="row g-0">
            <div class="d-flex align-items-center col-6 col-md-12">
                <img v-bind:src="recipe.image" alt="recipe-picture" class="card-img-top">
            </div>
            <div class="col-6 col-md-12 card-body p-0">
              <p class="card-title px-2 my-2">{{recipe.title}}</p>
              <p class="card-text my-2" v-if="searchMode === 'nutrients'">Calories: {{recipe.calories}}</p>
              <button class="btn btn-outline-danger mt-2 mb-3" @click="getInstructions(recipe.id, recipe.title)" data-bs-toggle="modal" data-bs-target="#exampleModal">Instructions</button>
            </div>
            </div>
          </div>
        </div>
    </div>

    <div v-if="isFetched && this.recipes.length === 1" class="mt-5">
        <p class="display-5 text-center fw-bold">Sorry, no recipes were found. Could you try searching for something else?</p>
    </div>

  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        <button type="button" class="btn btn-primary">Save to profile</button>
        <button type="button" class="btn btn-danger" @click="generatePDF()">Download as PDF</button>
      </div>
    </div>
  </div>

  </div>

</template>

<script>
import axios from 'axios'
import html2pdf from 'html2pdf.js'
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld
  },
  computed: {
    placeholder () {
      if (this.searchMode === 'ingredients') {
        return 'Separate producs with a comma'
      } else if (this.searchMode === 'name') {
        return 'Enter the name of your recipe'
      } return ''
    }
  },
  data () {
    return {
      apiInput: '',
      apiKey: '5f297dfffa5544a0b4f15ea398cfb4a7',
      info: null,
      isFetched: false,
      searchAmount: 10,
      recipes: [],
      selectedRecipe: '',
      selectedRecipeTitle: '',
      searchMode: 'ingredients',
      nutrientsMin: 0,
      nutrientsMax: 0
    }
  },
  methods: {
    sendInput: function () {
      if (this.searchMode === 'ingredients') {
        const input = this.apiInput.split(', ')
        const ingredients = input.join(',+')
        axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${this.searchAmount}&apiKey=${this.apiKey}`).then(response => {
          this.info = response.data
          this.recipes = this.info
          this.isFetched = true
          if (this.recipes.length === 0) this.recipes.push('Sorry, no recipes found.')
        })
      } else if (this.searchMode === 'nutrients') {
        axios.get(`https://api.spoonacular.com/recipes/findByNutrients?minCalories=${this.nutrientsMin}&maxCalories=${this.nutrientsMax}&number=${this.searchAmount}&apiKey=${this.apiKey}`).then(response => {
          this.recipes = response.data
          this.isFetched = true
          if (this.recipes.length === 0) this.recipes.push('Sorry, no recipes found.')
        })
      } else if (this.searchMode === 'name') {
        axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${this.apiInput}&number=${this.searchAmount}&apiKey=${this.apiKey}`).then(response => {
          this.recipes = response.data.results
          this.isFetched = true
          if (this.recipes.length === 0) this.recipes.push('Sorry, no recipes found.')
        })
      }
    },
    getInstructions (id, title) {
      axios.get(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${this.apiKey}`).then(response => {
        this.selectedRecipe = response.data
        this.selectedRecipeTitle = title
        this.selectedRecipe = this.selectedRecipe[0]
      })
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
    getRandomRecipes () {
      this.searchMode = 'ingredients'
      this.apiInput = ''
      axios.get(`https://api.spoonacular.com/recipes/random?number=${this.searchAmount}&apiKey=${this.apiKey}`).then(response => {
        this.recipes = response.data.recipes
        this.isFetched = true
      })
    },
    generatePDF () {
      const element = document.getElementById('pdf-content')
      const opt = {
        filename: `${this.selectedRecipeTitle}-recipe`
      }
      html2pdf().set(opt).from(element).save()
    }
  }
}
</script>
