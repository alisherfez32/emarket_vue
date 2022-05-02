import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  mutations: {
    initializeStore(state){
      let carts = localStorage.getItem('cart')
      let cartData = JSON.parse(carts)
      if (cartData){
        state.cart = cartData
      } else{
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
      
      let token = localStorage.getItem('token')
      if (token) {
        state.token = token
        state.isAuthenticated = true
      } else {
        state.token = ""
        state.isAuthenticated = false
      }
    },
    addToCart(state, payload){
      const exists = state.cart.items.filter(i => i.product.id === payload.product.id)

      if(exists.length){
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(payload.quantity)
      } else {
        state.cart.items.push(payload)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
      state.cart = { items: [] };
      
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setIsLoading(state, status){
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
