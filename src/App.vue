<template>
  <div id="wrapper">
    <Navigation :total="cartTotalLength"/>
    <div class="is-loading-bar has-text-centered"
    :class="{ 'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div>
    <section class="section">
      <router-view/>
    </section>
  <footer class="footer">
    <p class="has-text-centered">Copyright©️ 2022</p>
  </footer>
  </div>
</template>
<script>
import Navigation from "./components/navigation";
import axios from "axios"
export default {
  components: {Navigation},
  data(){
    return {
      cart: {
        items: []
      }
    }
  },
  beforeCreate() {
    this.$store.commit("initializeStore")

    const token = this.$store.state.token

    if(token) {
      axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
    console.log("LOGIN", this.$store.state['isAuthenticated', 'token'])
  },
  computed: {
    cartTotalLength(){
      let total = 0
      for(let i=0; i<this.cart.items.length; i++){
        total += this.cart.items[i].quantity
      }
      return total
    }
  }
}
</script>
<style lang="scss">
@import '../node_modules/bulma';

.lds-dual-ring{
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;

  --webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}
</style>
