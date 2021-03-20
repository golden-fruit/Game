<template>
<div ref="hotel">
    <div  class="hotel" ref="hotels" v-show="!isbed"  style="background: url(img/郡县/主题背景/乡村/2.jpg)  no-repeat ;background-size:cover;">
        <div class="title">
            <h1 id="arcname">{{user.name}}家</h1>
        </div>
        <div id="img"></div>
        <div id="button" v-show="!isrest&&!ismodes">
            <div @click="isrest=true,close=false">休息</div>
            <div @click="talk()">对话</div>
            <div @click="mode()">物品</div>
        </div>
        <div v-show="isrest" id="rest">
            <div id="qus">休息几天？{{ day }}天</div>
            <div id="button1">
                <div @click="day--" id="prev">＜</div> <div @click="day++" id="next">＞</div>
                <span @click="rest()" >歇息</span> <span @click="isrest=false">返回</span>
            </div>
        </div>
        <div v-show="ismodes" id="modes">
            <div id="foodshop">
                <li v-for="(item,index) in box" 
                    :key="index"
                    @click="get(index)"
                    :class="{active:modesnum==index&&modesnum!==''}">名称:{{item.name}}  描述:{{item.description}}</li>
            </div>
            <span @click="pick()">拾取</span>   <span @click="ismodes=false">返回</span>
        </div>
        <div id="text"  v-show="!close">
            <li v-for="(item,index) in messages" :key="index">{{item}}<span ref="san" v-show="show">▲</span></li>
        </div>
         <div id="txt"  v-show="close">
            <li v-for="(item,index) in message" :key="index">{{item}}<span ref="san" v-show="show">▲</span></li>
        </div>
    </div>
</div>
</template>

<script>
import {date,user,Package,hometxt,box} from '../../../scripts/public.js'
import {items} from '../../../scripts/modes/items.js'
export default {
    data(){
        return{
            user:user,
            date:date,
            Package:Package,
            hometxt:hometxt,
            messages:[`吾儿速去，不可拖延，盼望早归，沿途平安！`],
            message:[],
            isrest:false,
            close:false,
            day:0,
            ismodes:false,
            show:'',
            modesnum:'',
            isbed:'',
            d:0,
            box:box,

        }
    },methods:{
        rest(){
            this.isbed=true
            if(this.d!=0){
            user.hp+=10
            var item=date[0]
            this.date.splice(0,1)
            item+=1
            this.date.push(item)
            }
            this.$refs.hotel.className='night'
            if(this.d<this.day){
                setTimeout(() => {this.$refs.hotel.className='day'}, 1000);
                setTimeout(() => {
                    this.d++;this.rest()   
                }, 3000);
            }else{
                this.d=0
                this.isbed=false
                 this.$refs.hotel.className='hotel'
                 this.messages=[];
                return this.messages.push(`吾儿莫要贪懒磨蹭，早日出发，俊法不可触，莫要失期犯法！天佑吾儿，早日完成更役！`)
            }
        },
        shiny(){
             setTimeout(() => {
                this.show=false
            }, 700);
            setTimeout(() => {
                this.show=true
                this.shiny()
            }, 1400);
        },
        get(index){
            this.modesnum=index;
        },
        pick(){
            var item=box[this.modesnum]
            Package.push(item)
            console.logs(`拾取了${item.name}`)
            box.splice(this.modesnum,1)
        },
        mode(){
            this.close=false
             this.ismodes=true;
             this.messages=[];
             this.messages.push(`家里还有些老旧武器，是你父亲当年用的！此去服役沿途凶险难测，我备了些干粮衣裳，你一并带上吧！！`)
        },
        talk(){
            this.close=true;
            this.message=[`今日，里正来了，言及傅籍……`];
            var t=0;
            var txt=document.getElementById('txt')
            txt.addEventListener('click',()=>{
                this.message=[];
            if(this.hometxt[t]==undefined){
                this.messages=[];
                this.messages.push(`一路保重！`);
                this.close=true;
                return this.close=false; }
            this.message.push(this.hometxt[t]);t++
            })
        }
    },mounted(){
        this.shiny()
    },watch:{
    }
}
</script>

<style scoped>
*{margin: 0;}
#rest{
    position: relative;
    color: aliceblue;
    width: 400px;
    height: 100px;
    top: 50px;
    margin: 10px auto;
    border: rgb(180, 174, 166 ,0.8) 2px solid;
    font-size: 20px;
}
#button1, #qus{
     height: 40px;
     width: 300px;
     margin: 10px auto;
}
#button1 span{
    position: relative;
    margin: 0 auto;
    top:3px;
    text-align: center;
    width: 30px;
    height: 20px;
    line-height: 20px;
    margin-left:10px;
}
#rest span:hover{
    background: rgb(180, 174, 166 ,0.6);
}
#next{position:relative; float:left;left:50px ;width:30px; text-align:center; line-height:30px; font-size:25px;}
#next:hover{ background: rgb(180, 174, 166 ,0.6);}
#prev{position:relative; float:left;left:50px ;width:30px; text-align:center; line-height:30px; font-size:25px;}
#prev:hover{ background: rgb(180, 174, 166 ,0.6);}
#modes span:hover{
 background: rgb(180, 174, 166 ,0.6);
}
#arcname{
    color:white
}
#modes{
    color: aliceblue;
}
#foodshop{
    position: relative;
    overflow:scroll;
    overflow-x: hidden;
    margin: 10px auto;
    margin-top: 50px;
    left:150px;
    width: 400px;
    height: 100px;
    border: 2px solid white;
    list-style: none;
    text-align: left;
    background: rgb(180, 174, 166 ,0.8);
}
#foodshop span{
    background: rgb(241, 214, 137);
}
#foodshop span:hover{
    color: aliceblue;
}
#foodshop::-webkit-scrollbar {
    width: 5px;
}
    /* 滚动条滑块 */
#foodshop::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#6d7f7a!important;
}
#foodshop::-webkit-scrollbar-track {
        border-radius:10px;
}
#foodshop li{
    margin-left: 50px;
}
#foodshop .active{
    width: 300px;
    background-color: #1dd3d3;
}
#foodshop li:hover{
    width: 300px;
    background-color: #1dd3d3;
}
.hotel #img{
    position: relative;
    float: right ;
    top: 140px;
    height: 350px;
    width: 300px;
    /* border: 2px solid black; */
    background: url('../../../../public/img/人物/女性/7.png') no-repeat ;
    background-size:cover;
}
.hotel{
     height: 540px; 
     margin: 0 auto
}
.night{
    height: 520px;
    transition:all 2s linear;
}
.night:hover{
    background:rgb(26, 25, 25,1) ; 
}
.day{
    height: 520px;
     transition:all 1.1s linear;
}
.day:hover{
     background:rgba(236, 233, 233, 1); 
}
#text{
    color: aliceblue;
     background:rgb(26, 25, 25,0.6) ; 
    margin: 0 auto;
    position: absolute;
    left: 630px;
    top:400px;
    text-align: left;
    height: 60px;
    width: 250px;
}
#text li{
    list-style: none;
}
#text span{
    display: inline;
}
#txt{
    color: aliceblue;
     background:rgb(26, 25, 25,0.6) ; 
    margin: 0 auto;
    position: absolute;
    left: 630px;
    top:400px;
    text-align: left;
    height: 60px;
    width: 250px;
}
#txt li{
    list-style: none;
}
#txt span{
    display: inline;
}
#button{
    margin: 10px auto;
    margin-top: 100px;
    text-align: center;
}
#button div{
    font-size: 25px;
    margin: 30px auto;
    width: 100px;
    border: white 2px solid;
    background: rgb(241, 214, 137);
}
#button div:hover{
    color: aliceblue;
    background:rgb(180, 174, 166 ,0.8) ;
}
</style>