<template>
    <div class="main" >
        <div class="top" style="overflow:-Scroll;overflow-x:hidden;overflow-y: hidden">
            <div class="left">
                <Left></Left>
            </div>
            <div class="middle" style="overflow: hidden; ">
                <Middle></Middle>
            </div>
            <div class="right">
                <Right></Right>
            </div>
        </div>

        <div class="bottom">
            <div class="left-t">
                <Message></Message>
            </div>
            <div class="middle-t" style="overflow: hidden; ">
               <Menus></Menus>
            </div>
            <div class="right-t">
                战斗消息框:
               <FightMessage></FightMessage>
            </div>
           
        </div>

    </div>
</template>


<script type='text/javascript'>
import Menus from '../components/Menus.vue'
import Middle from '../components/Middle.vue'
import Left from '../components/Left.vue'
import Right from '../components/Right.vue'
import Message from '../components/Message.vue'
import FightMessage from '../components/fighting/FightMessage.vue'
export default {
    components:{
        Menus,
        Middle,
        Left,
        Right,
        Message,
        FightMessage,
    },
    name: 'walkerPage',
    data() {
        return{
        }

    },
    methods: {
    },
    mounted:function(){          //挂载后  初始化一次
        document.body.style='margin:0';                    //初始化页面属性
        document.body.style="height:100%";
        document.body.style="overflow:hidden;";
        document.body.style="overflow-x:hidden;overflow-y:hidden";
        document.body.style="background-color:antiquewhite;";
    }
}
</script>
<style scoped>
.container::-webkit-scrollbar {display:none}
*{
    padding:0;
    margin: 0;
}
*{  
    -webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
    -webkit-user-select:none; /*webkit浏览器*/   
    -khtml-user-select:none; /*早期浏览器*/   
    -moz-user-select:none;/*火狐*/   
    -ms-user-select:none; /*IE10*/   
    user-select:none;   
} 
input{  
	-webkit-user-select:auto; /*webkit浏览器*/     
}
textarea{
	-webkit-user-select:auto; /*webkit浏览器*/
}
.main{
    width: 1500px;
    height: 780px;
    margin: 0 auto;
}
.top{
    border: red 2px solid;
    margin: 0;
    height: 75%;
    text-align: center;
    display: flex;
    justify-content: space-between;
}
.top img{
    height: 50%;
    width: 50%
}
.left{
    border: black 2px solid;
    height: 100%;
    width: 250px;
}
.middle{
    margin:0 auto;
    height: 100%;
    width: 54%;
    border-top: black 2px solid;
    border-bottom: black 2px solid;
}
.right{
    border: black 2px solid;
    height: 100%;
    width: 260px;
}
.bottom{
    border: red 2px solid;
    display: flex;
    justify-content: space-between;
}
.left-t{
    margin-top: 20px;
    border-top: black 2px solid;
    border-bottom: black 2px solid;
    height: 185px;
    width: 300px;
}
.middle-t{
    width: 50%;
    margin: 0 auto;
    padding: 10px;
    border: #30DDEB 2px solid;
}
.right-t{
    margin-top: 10px;
    border-top: black 2px solid;
    border-bottom: black 2px solid;
    width: 300px;
}

</style>