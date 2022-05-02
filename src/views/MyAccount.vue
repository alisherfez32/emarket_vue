<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column">
                <h1 class="title">My Accout</h1>
            </div>

            <div class="column is-12">
                <button @click="Logout" class="button is-danger">Log out</button>
            </div>

            <hr>
            <div class="column is-12">
                <h2 class="subtitle">My Orders</h2>
                
                <OrderSummery 
                v-for="order in orders"
                :key="order.id"
                :order="order"
                />

            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

import OrderSummery from '../components/OrderSummery.vue'
    export default {
        name: "MyAccount",
        components: {OrderSummery},
        data(){
            return{
                orders: []
            }
        },
        mounted() {
            document.title = "MyAccount | Selin"

            this.getMyOrders()
        },
        methods: {
            Logout() {
                axios.defaults.headers.common['Authorization'] = ""

                localStorage.removeItem("token")
                localStorage.removeItem("username")
                localStorage.removeItem("userid")

                this.$store.commit('removeToken')

                this.$router.push('/')
            },

        async getMyOrders() {
            this.$store.commit('setIsLoading', true)

            await axios
                .get('/api/v1/orders/')
                .then(response => {
                    this.orders = response.data
                })
                .catch(error => {
                    console.log(error)
                })
                
            this.$store.commit('setIsLoading', false)
        }
        }
    }
</script>

<style lang="scss" scoped>

</style>