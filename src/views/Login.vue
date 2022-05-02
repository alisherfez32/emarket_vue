<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <h1 class="title">Sign up</h1>
                <form @submit.prevent="submitForm">
                    <div class="field">
                        <label for="">Username</label>
                        <div class="control">
                            <input type="text" class="input" v-model="username" placeholder="Username">
                        </div>
                    </div>
                    <div class="field">
                        <label for="">Password</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password" placeholder="Password" />
                        </div>
                    </div>
                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" :key="error">{{error}}</p>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Log In</button>
                        </div>
                    </div>
                    <hr>
                    Or <router-link to="/sign-up">Click gere</router-link> to Sign up!
                </form>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios"
import {toast} from 'bulma-toast'
    export default {
        name: "SignUp",
        data(){
            return {
                username: "",
                password: "",
                errors: []
            }
        },
        mounted() {
            document.title = 'Log In | Selin'
        },
        methods: {
            async submitForm() {
                this.errors = []
                axios.defaults.headers.common['Authorization'] = ""

                localStorage.removeItem("token")

                const formData = {
                    username: this.username,
                    password: this.password
                }
                await axios.post('/api/v1/token/login', formData).then(resp => {
                    const token = resp.data.auth_token

                    this.$store.commit('setToken', token)

                    axios.defaults.headers.common['Authorization'] = "Token" + token
                    
                    localStorage.setItem("token", token)

                    const toPath = this.$route.query.to || '/cart'

                    this.$router.push(toPath)
                })
                .catch(err => {
                    if (err.respponse) {
                        for (const property in err.respponse.data) {
                            this.errors.push(`${property}: ${err.response.data[property]}`)
                        }
                    } else {
                        this.errors.push('Somethin went wrong. Please try again')

                        console.log("Error", JSON.stringify(err))
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>