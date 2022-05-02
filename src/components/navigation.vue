<template>
<div>
  <nav class="navbar is-dark">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">Emarket</router-link>
      <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu"
         @click="showMobileMenu = !showMobileMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" id="navbar-menu"
         :class="{'is-active': showMobileMenu}">
      <div class="navbar-start">
        <div class="navbar-item">
          <form method="GET" action="/search">
            <div class="field has-addons">
              <div class="control">
                <input type="text" class="input" placeholder="What are you looking for?" name="query">
              </div>
              <div class="control">
                <button class="button is-success">
                  <span class="icon"><i class="fas fa-search"></i></span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="navbar-end">
        <router-link to="/summer" class="navbar-item">Summer</router-link>
        <router-link to="/winter" class="navbar-item">Winter</router-link>

        <div class="navbar-item">
          <div class="buttons">
            <template v-if="!$store.state.isAuthenticated"><router-link to="/log-in" class="button is-light">Log in</router-link></template>

            <template v-else><router-link to="/my-account" class="button is-light">My Account</router-link></template>

            <router-link to="cart" class="button is-success">
                <span class="icon">
                  <i class="fas fa-shopping-cart"></i>
                </span>
              <span>Cart {{total}}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: "navigation",
  props: ['total'],
  data(){
    return {
      showMobileMenu: false,
    }
  }
}
</script>

<style scoped>

</style>