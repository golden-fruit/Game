<template>
  <div class="left"  style="overflow: hidden;background-image: URL(img/0.jpg);">
        <div id="photo">
            <img src="img/人物/韩非子1.jpg">
            {{ user.name }}
        </div>
        <div id="money"><span>金:{{jin}}</span><span>钱:{{qian}}</span> <span id="exp">军功: {{user.exp}}</span></div>
        <div class="message">
            <div class="row">
            <span>姓名 : {{ user.name }}</span> <span>爵位: {{ honors[user.level] }}({{ user.level }})</span>
            </div>
             <div class="row">
            <span>健康 : {{ user.hp }}</span> <span>精力: {{ user.ep }}</span>
            </div>
            <div class="row">
            <span>攻击 : {{ user.atk }}</span> <span>甲御: {{ user.def }}</span>
            </div>
        </div>

        <h4 @click="hide()">{{ title }} </h4>
        <div class="mode" v-if="current">
                <h4 @click="shows()">被动技能 :</h4>
                <div  v-if="hides">
                <li @click="showCont()"
                    v-for="(item,index) in user.skills.passives" 
                    :key="index"> {{ index+1 }}.{{ item.name }}(+{{item.effect.atk}}攻击 +{{item.effect.def}}甲御)
                    <p v-if="show"> {{item.description}} </p>
                </li>
                </div>
                <h4 @click="shows1()">主动技能 :</h4>
                <div  v-if="hides1">
                <li  @click="showCont1()"
                    v-for="(item,index) in user.skills.actives" 
                    :key="index"> {{ index+1 }}.{{ item.name }} 
                    <p v-if="show1">{{item.description}}</p>
                </li>
                </div>
        </div>

        <h4 @click="hide1()">{{ title1 }} </h4>
        <div class="mode" v-if="current1">
            <h4>头部 :</h4><li>——{{ headwears[user.level].name }}(+{{headwears[user.level].effect.atk}}攻击 +{{headwears[user.level].effect.def}}甲御)</li>
            <h4>躯干 :</h4><li>——{{ showarmor }}<span v-if="armor">( +{{showdef}}防御)</span></li>
            <h4>武器 :</h4><li>——{{ showweapon }}<span v-if="weapon">(+{{showatk}}攻击)</span></li>
        </div>

  </div>
</template>

<script type='text/javascript'>
import {user,headwears,honors} from '../scripts/public.js'
import {sword,} from '../scripts/modes/equipments.js'
export default {
    name:'left',
    data(){
        return{
            passives:'',
            current:true,
            current1:true,
            armor:true,
            weapon:true,
            show:false,
            show1:false,
            hides:true,
            hides1:true,
            title:'技能>>',
            title1:'装备>>',
            showarmor:'',
            user:user,
            headwears:headwears,
            honors:honors,
            showweapon:'',
            iseffect:'',
            showatk:0,
            showdef:0,
            jin:'',
            qian:'',
        }
    },
    methods:{
            shows(){
                this.hides=!this.hides
            },
            shows1(){
                this.hides1=!this.hides1
            },
            showCont(){
                this.show = !this.show;
            },
            showCont1(){
                this.show1 = !this.show1;
            },
            hide(){
                if(this.current!=1){
                    this.current=1;
                    this.title='技能>>';
                }else{
                    this.current=false;
                    this.title='技能<<';
                }
            },
            hide1(){
                if(this.current1!=1){
                    this.current1=1;
                    this.title1='装备>>';
                }else{
                    this.current1=false;
                    this.title1='装备<<';
                }
            },
            isEquipt(){
                if( this.user.equipments.weapon==null){
                    this.showweapon="未装备";
                    this.weapon=false
                }else{
                    this.showweapon=this.user.equipments.weapon.name;
                    this.weapon=true;
                    this.showatk=this.user.equipments.weapon.effect.atk 
                }
                if( this.user.equipments.armor==null){
                    this.showarmor="未装备";
                    this.armor=false
                }else{
                    this.showarmor=this.user.equipments.armor.name;
                    this.armor=true;
                    this.showdef=this.user.equipments.armor.effect.def
                }
            },
            iseffects(){
                for(let item of user.skills.passives){
                    if(item.pastype=='杀人技'){
                        if(user.equipments.weapon&&user.equipments.weapon.weapontype=='剑'){
                            if(item.iseffect==false){
                                user.atk+=item.effect.atk
                                user.def+=item.effect.def
                                item.iseffect=true
                            }
                        }else{
                            if(item.iseffect==true){
                                user.atk-=item.effect.atk
                                user.def-=item.effect.def
                                item.iseffect=false
                            }
                        }
                    }
                    if(item.pastype!='杀人技'&&item.iseffect==false){
                    user.atk+=item.effect.atk
                    user.def+=item.effect.def
                    item.iseffect=true
                    }
                }
            }, 
            islevelup(){
                var item=user.equipments.headwear[user.level]
                if( item.iseffect==false){
                    user.def+=headwears[user.level].effect.def
                    user.atk+=headwears[user.level].effect.atk
                    item.iseffect=true
                }
            },
            displaymoney(){
                var m=user.money
                this.jin=Math.floor(m/100)
                if(m-this.jin*100==0&&m!=0){
                    this.jin-=1
                }
                this.qian=m-this.jin*100
            }
        }, 
    mounted(){ 
    },watch:{
        'user.money':{
            handler(){
                this.displaymoney()
            },immediate:true,
        },
        'user.level':{
            handler(){
                this.islevelup();
            },immediate:true
        },
        'user.skills.passives':{
            handler(){
                this.iseffects();
            },immediate:true
        },
        'user.equipments.weapon':{
            handler(){
                this.isEquipt();
                this.iseffects()
            },immediate:true
        },
        'user.equipments.armor':{
            handler(){
                this.isEquipt();
            },immediate:true
        }
    }
}
</script>
<style scoped>
*{margin: 0;
 padding: 0;}
 #photo{
     margin-bottom: 20px;
 }
 #money{
    position: absolute ;
    text-align: left;
    left: 20px;
    top:150px;
}
#money span{
    float: left;
    width: 45px;
    /* border: 2px solid rgb(216, 156, 156); */
}
#money #exp{
    margin-left: 35px;
    width: 100px;
}
img{
    width: 246px;
    height: 110px;
    margin: 0 auto;
}
.row{
  display: flex;
  justify-content: space-around;
}
.message span{
    width: 125px;
    text-align: left;
    margin-left: 4px;
}
.mode li{
    list-style:none;
    text-align: left;
     margin-left: 10px;
     width:240px;
     cursor: pointer;
}
.mode{
    margin-left: 10px;
    width: 240px;
    height: 145x;
    overflow-x: hidden;
    overflow-y: scroll;
}
 /* for Chrome */
.mode::-webkit-scrollbar {
    display: none;
}
h4{
    margin-left: 4px;
    font-weight:550;
    text-align: left;
    cursor: pointer;
}
p{margin: 0;
 padding: 0;
    margin-left: 10px;}
</style>