<template>
    <div>
        <ul v-for="(item,index )in items" :key="index">
            <li>{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items:'',
        }
    }
}
</script>>

<style scoped>

</style>