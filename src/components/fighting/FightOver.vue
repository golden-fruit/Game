<template >
<div style="overflow:-Scroll;overflow-x:hidden;">
    <h1>战斗结束</h1>
    <div id="overlist" style="height:300px">
        <div id="title">
            <h2 id="got">战利品:</h2>
            <h2 id="moneys">钱:+{{ enemy.money }}</h2>
            <h2 id="exp">军功:+{{ enemy.level }}</h2>
        </div>
        <div id="list" style="height:250px">
        <ul v-for="(item,index) in spoils" :key="index"
            @click="choose(index)"
            :class="{active: index == current && current!==''}">
            <li title="战利品"> {{item.type}} : {{ item.name }}</li>
        </ul>
        </div>
    </div>

    <div id="button">
        <div @click="showdetail">察看</div>
        <div @click="add()">拾取</div>
        <div @click="addAll()">全部拾取</div>
    </div>
</div>
</template>
<script>
import {Package,user} from "../../scripts/public"
export default {
    name:"FightOver",
    data(){
        return{
            current:'',
            enemy:{},
            spoils:[],
            Package:Package,
            user:user,
        }
    },
    methods:{
        choose(index){
           this.current= index;
        },
        add(){
            if(this.current==this.spoils.length){
                this.current=''
           }
            if(this.current===''){return}
            var addItem=this.spoils[this.current]
            this.Package.push(addItem);
            console.logs('你拾取了:'+addItem.name)
            this.spoils.splice(this.current,1);
            
        },
        addAll(){
            this.Package.push(...this.spoils)
            for( let item of this.spoils){
                console.logs('你获得了:'+item.name)
            }
            this.spoils.splice(0, this.spoils.length);
        },
        showdetail(){
            if(this.current==this.spoils.length){
                this.current=''
           }
            if(this.current===''){return}
            console.logs(this.spoils[this.current].description)
        },
        setspoils(){
            var eqiupments=this.enemy.pack.filter((item)=>{
                return item.protype==`装备`;
            })
            var modes=this.enemy.pack.filter((item)=>{
                return item.protype=='物品';
            })
            var chance=(this.enemy.level-user.level)/20+0.3
            if(Math.random()<chance-0.3){
                this.spoils.push(...modes)
            }if(Math.random()<chance){
                 this.spoils.push(...eqiupments)
            }
        }
    },
    mounted:function(){
        this.enemy=eval('('+localStorage.getItem(`enemy`)+')');
        this.setspoils()
    },
    updated:function(){
    }
}    
</script>
<style scoped>
#overlist{
    border-top: black solid 2px; 
    border-bottom:  black solid 2px; 
    margin:20px auto;
}
#title{
    border-bottom:  black solid 2px; 
    display: flex;
    justify-content: space-between;
}
#got{position: relative;left: 5%;margin:0; }
#moneys{position: relative;right:0;margin:0;}
#exp{position: relative;right: 15%;margin:0;}
#overlist ul{
    position: relative;
    text-align: left;
    left: 10%;
}
ul.active{
    background-color: #1dd3d3;
}
li{ cursor: pointer;}
#button{
    width: 500px;
    margin: 0 auto;
    margin-top: 40px;
}
#button div{
    margin: 10px auto;
    background:rgb(241, 214, 137);
    width: 100px;
}
#button div:hover{
   color: aliceblue;
}
p,h3{margin: 0;position: relative;left: 5%;cursor: pointer;}

#list{ width:100%;  height:100%;  overflow-x:hidden; }
#list::-webkit-scrollbar {
    width: 5px;
}
    /* 滚动条滑块 */
#list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#6d7f7a!important;;
        /* -webkit-box-shadow: inset 0 0 6px rgba(29, 211, 211, 1); */
}
#list::-webkit-scrollbar-thumb:window-inactive {
    background:#6d7f7a!important;
}

</style>