<template>
<div>
  <div style="background:url(img/郡县/主题背景/0.jpg) no-repeat ;background-size:cover;" id="city" v-show="typeof cc!='number'">
    <div id="names">咸阳</div>
    <div id="cityfunction">
      <div id="selection" class="function" @click="cc=0" style=" background:url(img/郡县/主题背景/郡城/南郡0.jpg);background-size:cover;">
        <span>王宫</span>
      </div>
      <div id="selection"  class="function" @click="cc=1" style=" background:url(img/郡县/主题背景/3.jpg);background-size:cover;">
        <span>商会</span>
      </div>
      <div id="selection"  class="function" @click="cc=2" style=" background:url(img/郡县/主题背景/郡城/3.jpg);background-size:cover;">
        <span>作坊</span>
      </div>
      <div id="selection"  class="function" @click="cc=3" style=" background:url(img/郡县/主题背景/郡城/1.jpg);background-size:cover;">
        <span>侯馆</span>
      </div>
      <div id="selection"  class="function" @click="cc=4" style=" background:url(img/郡县/主题背景/1.jpg);background-size:cover;">
        <span>闾里</span>
      </div>
       <div id="selection" class="function" @click="back()" style=" background:url(img/郡县/主题背景/郡城/2.jpg);background-size:cover;">
        <span>京畿关卡</span>
      </div>
    </div>
  </div>

  <div  v-if="cc==0">
      王宫
      <div class="function" @click="cc='a'">离开</div>
  </div>
  <div v-else-if="cc==1">
      商会
       <div class="function" @click="cc='a'">离开</div>
  </div>
  <div v-else-if="cc==2">
      作坊
       <div class="function" @click="cc='a'">离开</div>
  </div>
  <div v-else-if="cc==3">
      <hotel></hotel>
      <div class="function" @click="cc='a'">离开</div>
  </div>
  <div v-else-if="cc==4">
      闾里
       <div class="function" @click="cc='a'">离开</div>
  </div>
</div>
</template>

<script>
import hotel from './function/hotel.vue'
import Msg from '../msg.js'
export default {
  components:{
    hotel
  },
    data(){
        return {
            cc:'',
        }
    },methods:{
        back(){
            Msg.$emit('mm','a')
        },
        southcity(){
            
        },
        agency(){
        },
        hospital(){
            
        },
        hotel(){
            
        },
        town(){
           
        }
    }
};
</script>

<style>
#city{
    width:810px;
    height: 585px;
}
#names {
  float: left;
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
#selection {
  display: inline-block;
  height: 120px;
  width: 100px;
  margin: 20px 10px;
  margin-bottom: 0;
  bottom: 0;
  border: 2px solid black;
  opacity: 0.7;
}
#selection span {
  position: relative;
  top: 100px;
  color:black;
  /* border: 2px solid black; */
}
#selection:hover {
  height: 140px;
  width: 120px;
  margin: 0;
  transition:all 0.3s  ;
  opacity:1;
}
#selection:hover span {
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