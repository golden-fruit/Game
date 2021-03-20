<template>
    <div class="message" id="logs">
            <li v-for="(item,index) in messages"
            :key="index"
            >
            <span id="hour">[{{item.hour}}]-</span><span id="name">({{item.content}}): </span>{{item.fightmessage}}
            
            </li>
    </div>

</template>
<script>
import {messages,} from '../../scripts/public.js'
export default {
    data(){
        return{
            messages:messages,
        }
    },methods:{
         showmessage(){
            //scrollHeight 全容器高度，scrollTop 滚动条离顶部的距离
            this.$nextTick(() => {
                var log=document.getElementById('logs')
                log.scrollTop=log.scrollHeight; // 滚动条处于底部
            }) 
        },
    },mounted(){
        this.showmessage()
    },updated(){
    },computed:{
        
    },watch:{
        messages(){
            this.showmessage()
        }
    }
}
</script>

<style scoped>
.message{
    margin-bottom: 15px;
    height:153px;
    border: 2px solid white;
    background: rgba(243, 169, 73, 0.3);
    line-height: 20px;
    overflow:auto;
}
#logs li{
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