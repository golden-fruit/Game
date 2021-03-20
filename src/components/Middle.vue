<template>
    <div class="middle" id="ui">
        <component :is="currentview"></component>
        <div v-if="kk==1">
            <Package></Package>
        </div>
        <div v-else-if="kk==2">
            <Equipments></Equipments>
        </div>
        <div v-else-if="kk==3">
            <Skill></Skill>
        </div>
        <div v-else-if="kk==4">4

        </div>
        <div v-else-if="kk==5">
            <Map></Map>
        </div>
        <div v-else-if="kk==6" >
            <Setting></Setting>
        </div> 
        <div v-show="typeof kk!='number'">
           <Main></Main>
        </div>
    </div>
</template>
<script type="text/javascript">
import Msg from './msg.js'
import Setting from './Setting.vue'
import Equipments from './Equipments.vue'
import Package from './Package.vue'
import Skill from './Skill.vue'
import Main from './Main.vue'
import Map from './Map.vue'
export default {
    name:'middle',
    components:{
        Setting,
        Equipments,
        Package,
        Skill,
        Main,
        Map,
    },
    data(){
        return{
            kk:'a',
            currentview:'',
        }
    },methods:{
        scrollbottom(){
            setInterval(function(){
            var div = document.getElementById('ui');
            div.scrollTop = div.scrollHeight;
            console.log(div.scrollHeight)
            },1000)
        },
    },
    mounted(){
        var _this=this
        Msg.$on("val",function(m){
            _this.kk=m;
        })
    },
    computed(){
        var arr=[`Main`,`Package`,`Equipments`,`Skill`,'',`Map`,`Setting`]
         currentview:()=>{
             return arr[this.kk]
         }
    }//对动态组件的尝试，
    
}
</script>
<style scoped>
.middle div{ width:100%;  height:100%;  overflow-x:hidden; }
.middle div::-webkit-scrollbar {
    width: 10px;
}
    /* 滚动条滑块 */
.middle div::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#6d7f7a!important;;
}
.middle div::-webkit-scrollbar-thumb:window-inactive {
    background:#6d7f7a!important;
}
.middle img{
    width: 100%;
    height:100%;
}
.middle div{ 
    height:100%;
    width: 100%;
}
</style>