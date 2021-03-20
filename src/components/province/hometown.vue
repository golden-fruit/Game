<template>
<div>
  <transition name="fade">
  <div style="background:url(img/郡县/主题背景/乡村/3.jpg) no-repeat ;background-size:cover;" id="city" v-show="typeof cc!='number'">
    <div id="names">云梦乡</div>
    <div id="cityfunction">
     
      <div id="selections" @click="cc=0" style=" background:url(img/郡县/主题背景/乡村/0.jpg);background-size:cover;">
        <span>云梦乡亭</span>
      </div>
      <div id="selections"  @click="cc=1" style=" background:url(img/郡县/主题背景/乡村/1.jpg);background-size:cover;">
        <span>夕阳里</span>
      </div>
      <div id="selections"  @click="cc=2" style=" background:url(img/郡县/主题背景/郡城/3.jpg);background-size:cover;">
        <span>邻里</span>
      </div>
       <div id="selections" @click="back()" style=" background:url(img/郡县/主题背景/郡城/2.jpg);background-size:cover;">
        <span>乡亭关卡</span>
      </div>
    </div>
  </div>
   </transition>
  <transition name="fade">
  <div  v-if="cc==0&&cc!==''">
      乡亭
      <yan></yan>
      <div class="function" @click="cc='a'">离开</div>
  </div>
  <div v-else-if="cc==1">
      夕阳里
      <town></town>
       <div class="function" @click="cc='a'">离开</div>
  </div>
  <div v-else-if="cc==2">
      邻里
      <local></local>
       <div class="function" @click="cc='a'">离开</div>
  </div>
  </transition>
</div>
</template>

<script>
import  town from './function/town.vue'
import  yan from './function/yan.vue'
import  local from './function/local.vue'
import Msg from '../msg.js'
import { Package } from '../../scripts/public'
export default {
  components:{
    town,
    yan,
    local
  },
    data(){
        return {
            cc:'',
        }
    },methods:{
        back(){
            for(let i in Package){
                if(Package[i].name=='验'){
                   return Msg.$emit('mm','a')
                }else if(i==Package.length-1){
                    console.logs(`无能证明身份外出的'验','传'，不可无故离乡！`)
                }
            } 
        },
    }
};
</script>

<style>
.fade-enter-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-leave-active {
    transition: all .3s ease;
}
.fade-enter, .fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
}
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */
#city{
    width:810px;
    height: 585px;
}
#names {
  float: left;
  left: 200px;
  margin: 0 auto;
  font-size: 25px;
  border: 2px solid white;
}
#cityfunction {
  position: relative;
   float: left;
  width: 810px;
  margin:0 auto;
  height: 160px;
  top: 380px;
  background:rgb(228, 193, 140, 0.3);
  border: 2px black solid;
}
#selections {
  display: inline-block;
  height: 120px;
  width: 100px;
  margin: 20px 20px;
  margin-bottom: 0;
  bottom: 0;
  border: 2px solid black;
  opacity: 0.7;
}
#selections span {
  position: relative;
  top: 100px;
  color:black;
  /* border: 2px solid black; */
}
#selections:hover {
  height: 140px;
  width: 120px;
  margin: 0 ;
  transition:all 0.3s  ;
  opacity:1;
}
#selections:hover span {
  color: #fff;
}
.function{
  background:rgb(241, 214, 137);
}
.function:hover{
  color: #fff;
  background:rgba(73, 73, 73, 0.8) ;
}
</style>