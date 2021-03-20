<template>
<div class="father">
    <transition name="show">
  <div v-if="!fight" class="right" style="background:url(img/其他/1.jpg)"></div>
  </transition>
   <transition name="show">
  <div class="right" style="overflow: hidden;background:URL(img/01.jpg); " v-if="fight">
        <div id="img">
            <img :src="phs"/><br>
            {{enemy.name}}
        </div>
        <div class="message">
            <div class="row">
            <span>姓名 : {{ enemy.name }}</span> <span>爵位: {{ enemy.honor }}({{ enemy.level }})</span>
            </div>
            <div class="row">
            <span>健康 : {{ enemy.hp }}</span> <span>精力: {{ enemy.ep }}</span>
            </div>
            <div class="row">
            <span>攻击 : {{ enemy.atk }}</span> <span>甲御: {{ enemy.def }}</span>
            </div>
        </div>

          <h4 @click="hides()" v-show="ishide">技能>></h4><h4 @click="hides()" v-show="!ishide">技能&lt;&lt;</h4>
        <div class="modes" v-if="isshow">
                <h4>被动技能 :</h4>
                <div  v-if="hides">
                <li v-for="(item,index) in enemy.skills.passives" 
                    :key="index"
                    @click="showskill()"> {{ index+1 }}.{{ item.name }}(+{{item.effect.atk}}攻击 +{{item.effect.def}}甲御)
                    <p v-if="show"> {{item.description}} </p>
                </li>
                </div>
        </div>

        <h4 @click="hide()" v-show="isopen">装备>></h4><h4 @click="hide()" v-show="!isopen">装备&lt;&lt;</h4>
        <div class="mode" v-show="isshow1">
            <h4>头部 :</h4><li>——{{ enemy.headwear.name }}(+{{enemy.headwear.effect.atk}}攻击 +{{enemy.headwear.effect.def}}甲御)</li>
            <h4>躯干 :</h4><li>——{{ enemy.equipments.armor.armortype }}·{{ enemy.equipments.armor.name }}<span>(+{{enemy.equipments.armor.effect.def}}防御)</span></li>
            <h4>武器 :</h4><li v-for="(item,index) in enemy.equipments.weapon" :key="index">——{{item.quality}}·{{ item.name }}<span>(+{{item.effect.atk}}攻击)</span></li>
        </div>

        <h4>{{ enemy.name }}:</h4>
        <div class="descript">
            {{enemy.description}}
        </div>
  </div>
  </transition>
</div>
</template>

<script type='text/javascript'>
import { user,isfight} from '../scripts/public';
export default {
    name:'right',
    data(){
        return{
            user:user,
            enemy:{},
            isshow:false,
            isshow1:true,
            armor:'',
            weapon:'',
            showarmor:'',
            showweapon:'', 
            isopen:true,
            ishide:false,
            show:false,
            fight:false,
            isfight:isfight,
        }
    },
    methods:{
             hide(){
                this.isshow1=!this.isshow1
                this.isopen=!this.isopen
            },
            hides(){
                this.isshow=!this.isshow
                this.ishide=!this.ishide
            },
            showskill(){
                this.show=!this.show
            }, 
            equipment(){
                for(let item of this.pack){
                    if(item.type=='甲具'){
                        this.def+=item.effect.def
                        this.equipments.armor=item
                    }else if(item.type=='武器'){
                        this.atk+=item.effect.atk
                        this.equipments.weapon.push(item)
                    }
                }console.logg(`武器甲具已装备`)
            },
            effect(user){
                for(let item of this.pack){
                    if(item.type=='阅历'){
                        this.skills.passives.push(item)
                    }else if(item.type=='战斗技'||item.type=='医术'){
                        this.skills.actives.push(item)
                    }
                }
                if(this.skills.passives.length!=0){
                    for(let skill of this.skills.passives){
                    skill.effects(user)
                    }
                } for(let i in headwears){
                    if(i<=user.level){
                        user.def+=headwears[i].effect.def
                        user.atk+=headwears[i].effect.atk
                    }
                }
            },
            showph(){
                var num=this.enemy.ph
                this.phs=require('../../public/img/人物/npc/'+num+'.jpg')
            }
        },
    mounted(){ 
    },
    updated(){
     },
  watch:{
        isfight(newVal){
                   if (isfight[0]){
                    console.logs(`遇到敌人`)
                    this.enemy=eval('('+localStorage.getItem(`enemy`)+')')
                    setInterval(()=>{
                        this.enemy=eval('('+localStorage.getItem(`enemy`)+')')
                    },1000)
                     this.fight=true
                     this.showph()
                    }else{
                        this.fight=false
                    }
        },
    },computed:{
    }
}
</script>
<style scoped>
*{
    margin: 0;
}
.father{
    position: relative;
}
.right{
    position: absolute;
    height:720px;
    width:300px;
}
.right .img{
    text-align: center;
}
.right img{
    width: 150px;
    height: 140px;
    margin: 0 auto;
}
.right .row{
  display: flex;
  justify-content: space-around;
}
.right .message span{
    width: 150px;
    text-align: left;
    margin-left: 5px;
}
.right .modes{
    margin-left: 5px;
    width: 250px;
    height: 90px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.right .modes li{
    list-style:none;
    text-align: left;
    margin-left: 10px;    
    width:240px;
    cursor: pointer;
}
.right .modes::-webkit-scrollbar{
    width: 4px;
}
    /* 滚动条滑块 */
.modes::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background:#6d7f7a!important;
}
.modes::-webkit-scrollbar-track {
    border-radius:10px;
}
.mode{
    margin-left: 5px;
    width: 250px;
    overflow: hidden;
}
.mode li{
    list-style:none;
    text-align: left;
    margin-left: 10px;    
    width:240px;
    cursor: pointer;
}
h4{
    margin-left: 4px;
    font-weight:550;
    text-align: left;
    cursor: pointer;
}
.descript{
    margin-left: 5px;
    width: 250px;
    height: 290px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.descript::-webkit-scrollbar{
    width: 4px;
}
    /* 滚动条滑块 */
.descript::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background:#6d7f7a!important;
}
.descript::-webkit-scrollbar-track {
    border-radius:10px;
}
@keyframes pull-up {
    0% {
        opacity: 0;
        top: 120px;
    }
    100% {
        opacity: 1;
        top: 0;
    }
}
@keyframes pull-down {
    0% {
        opacity: 1;
        top: 0;
    }
    100% {
        opacity: 0;
        top: -120px;
    }
}
.show-enter-active {
    animation:pull-up 1.5s;
}
.show-leave-active {
    animation: pull-down 1.5s;
}
.show-enter, .show-leave-to {
    opacity: 0.1;
}
</style>