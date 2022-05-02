<template>
        <tr>
            <td><router-link :to="item.product.get_absolute_url">{{item.product.name}}</router-link></td>
            <td>${{item.product.price}}</td>
            <td>
            <a @click="decrementQuantity(item)"><strong>-</strong></a>
                {{item.quantity}}
            <a @click="incrementQuantity(item)"><strong>+</strong></a>
            </td>
            <td>${{ totalItem }}</td>
            <td><button class="delete" 
            @click="removeFromCart(item)"></button></td>
        </tr>
</template>

<script>
    export default {
        name: "CartItem",
        props: ['item'],
        data(){
            return {
                totalItem: ''
            }
        },
        mounted(){
            console.log("ITEM", this.item.product)
            this.totalItem = this.getItemTotal(this.item).toFixed(2)
        },
        methods: {
            getItemTotal(item){
                return item.quantity * item.product.price
            },
            decrementQuantity(item){
                
                
                if(item.quantity === 0){
                    return this.$emit("removeFromCart", item)
                }
                
                item.quantity -= 1
                this.updateCart()
            },
            incrementQuantity(item){
                item.quantity += 1
                
                this.updateCart()
            },
            updateCart(){
                localStorage.setItem('cart', JSON.stringify(this.$store.state.cart))
            },
            removeFromCart(item){
                this.$emit("removeFromCart", item)

                this.updateCart()
            }

        }

    }
</script>

<style lang="scss" scoped>

</style>