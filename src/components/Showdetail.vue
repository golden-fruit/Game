<template>
  <div class="right" style="overflow: hidden;background-image: URL(img/1.jpg); " v-show="typeof enemy=='object'">
        <div id="img">
            <img src="img/商鞅0.jpg"><br>
            头像
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
</template>

<script type='text/javascript'>
import {enemy} from '../scripts/enemy.js'
export default {
    name:'right',
    data(){
        return{
            enemy:enemy,
            isshow:false,
            isshow1:true,
            armor:'',
            weapon:'',
            showarmor:'',
            showweapon:'', 
            isopen:true,
            ishide:false,
            show:false,
        }
    },
    methods:{
             hide(){
                this.isshow1=!this.isshow1
                this.isopen=!this.isopen
            },hides(){
                this.isshow=!this.isshow
                this.ishide=!this.ishide
            },
            showskill(){
                this.show=!this.show
            }
        },
    mounted(){
    }
}
</script>

<style scoped>
*{margin: 0;
 padding: 0;}

</style>