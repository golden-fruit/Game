<template>
<div style="backgroundColor:pink;" id="us">
    <div>
        <h1>云梦游戏组</h1>
    </div>
    <div id="row">
         <div><h3>佘涛  佘陶俊</h3>佘玉  佘诗丽>佘丽君 佘佳</div> 
         <div><h3>孙哲</h3> </div> 
         <div><h3>佘涛  佘陶俊</h3> </div> 
         <div><h3>佘涛  佘陶俊</h3> </div> 
         <div><h3>佘涛  佘陶俊</h3></div> 
         <div><h3>佘涛  佘陶俊</h3></div>
         <div><h3>佘涛  佘陶俊</h3> </div> 
         <div><h3>佘涛  佘陶俊</h3> </div>
         <div><h3>佘涛  佘陶俊</h3> </div>
         <div><h3>佘涛  佘陶俊</h3> </div>
         <div><h3>佘涛  佘陶俊</h3> </div>
           
    </div>
</div>  
</template>


<script type='text/javascript'>
import Menus from '../components/Menus.vue'
import Middle from '../components/Middle.vue'

export default {
    components:{
        Menus,
    },
    name: 'about',
    data() {
        return{

        }

    },
    methods: {

    },
    mounted:function(){          //挂载后  初始化一次
      
    }
}
</script>
<style scoped>
#us div{
    margin: 0 auto;
    text-align: center;
    border: black 2px solid;}
#row{
    display: flex;
    flex-direction: row;
}
#row div{
    height: 600px;
    width: 100px;
    margin: 0 15px;
    background-color: rgb(233, 180, 110);
}
</style>