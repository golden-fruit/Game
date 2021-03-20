<template>
    <div class="message" id="log">
            <li v-for="(item,index) in message"
            :key="index"
            ><span id="hour">[{{item.hour}}<!--<span v-if="item.minute<10?true:false">0</span>-->{{item.minute}}]-</span><span id="name">({{item.content}}): </span>{{item.messages}}</li>
    </div>

</template>
<script>
import {message,} from '../scripts/public.js'
export default {
    data(){
        return{
            message:message,
        }
    },methods:{
         showmessage(){
            if (message.length>15){
                message.reverse().splice(15);
                message.reverse();
            }
            //scrollHeight 全容器高度，scrollTop 滚动条离顶部的距离
            this.$nextTick(() => {
                var log=document.getElementById('log')
                log.scrollTop=log.scrollHeight; // 滚动条处于底部
            }) 
        },
    },mounted(){
        this.showmessage()
    },updated(){
    },computed:{
        
    },watch:{
        message(){
            this.showmessage()
        }
    }
}
</script>

<style scoped>
*{margin: 0}
.message{
    margin-top:10px;
    margin-bottom: 15px;
    height:153px;
    border: 2px solid white;
    background: rgba(243, 169, 73, 0.3);
    line-height: 20px;
    overflow:auto;
}
#log li{
    margin: 2px;
    opacity: 0.8;
    list-style: none;
    text-align: left;
    background:  rgba(243, 169, 73, 0.6);
}
.message::-webkit-scrollbar {
    width: 5px;
}
    /* 滚动条滑块 */
.message::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#6d7f7a!important;
}
.message::-webkit-scrollbar-track {
        border-radius:10px;
}
#hour{
    color: rgb(231, 222, 222)
}
#name{
    color: #005AB5;
}
</style>3