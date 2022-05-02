<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome to EMarket</p>
        <p class="subtitle">The best store online</p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Products</h2>
      </div>
      <Content :product="product" v-for="product in latestProducts" :key="product.id"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

import Content from '@/components/content'
export default {
  name: 'Home',
  components: {
    Content
  },
  data(){
    return{
      latestProducts: []
    }
  },
  mounted(){
    this.getLatestProducts()

    document.title = ' Home | Marketplace'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true)
      await axios
          .get('/api/v1/latest-products/')
          .then(response => {
            console.log("Data from Backend", response)
            this.latestProducts = response.data
          })
          .catch(err => {
            console.log("Error from get", err)
          })

      this.$store.commit("setIsLoading", false)
    }
  }
}
</script>

<style scoped>
</style>