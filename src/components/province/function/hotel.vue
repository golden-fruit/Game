<template>
<div ref="hotel">
    <div  class="hotel" v-show="!isrest" ref="hotels"  style="background: url('img/郡县/建筑主题/客舍.jpg')  no-repeat ;background-size:cover;">
        <div class="title">
            <h1 id="arcname">客舍</h1>
        </div>
        <div id="img"></div>

        <div id="button" v-show="isyan&&yan&&(!food&&!hotel)">
            <div @click="hotelrest()">住宿</div>
            <div @click="listen()">探听</div>
            <div @click="foodlist()">食物</div>
        </div>
        <div v-show="food" id="food">
            <div id="foodshop">
                <li v-for="(item,index) in foods" 
                    :key="index"
                    @click="get(index)"
                    :class="{active:current==index&&current!==''}">{{item.name}}  价格:{{item.money}} 效果:回复{{item.effect.hp}}，可以饱腹</li>
            </div>
            <span @click="buy()">购买</span>   <span @click="food=false">返回</span>
        </div>

        <div v-show="hotel" id="rest">
            <div id="qus">休息几天？{{ day }}天</div>
            <div id="button1">
                <div @click="day--" id="prev">＜</div> <div @click="day++" id="next">></div>
                <span @click="rest()" >歇息</span> <span @click="hotel=false">返回</span>
            </div>
        </div>
        <div id="text" @click="detail()" v-if="!close&&yan">
            <li v-for="(item,index) in messages" :key="index">{{item}}<span ref="san" v-show="show">▲</span></li>
        </div>
        <div id="text"  v-if="!yan">
            <li>自商君立下法度以来，无有验传不可留宿。<span ref="san" v-show="show">▲</span></li>
        </div>
    </div>
</div>
</template>
<script>
import {date,user,honors,Package,hoteltxt} from '../../../scripts/public.js'
import {items} from '../../../scripts/modes/items.js'
export default {
    data(){
        return{
            user:user,
            date:date,
            items:items,
            d:0,
            isrest:false,
            show:true,
            messages:[`舍人:"这位${honors[user.level]}，从何而来，所为何事？可有验传？"`],
            message:[`自商君立下法度以来，无有验传不可留宿。`,`将杨木板制成的“验”，以及柳木条削成的“传”小心取出。`,user.yan.description,user.zhuan.description,`“原来是去县里服役的士伍，随我进来吧。”`],
            hoteltxt:hoteltxt,
            t:0,
            islisten:false,
            isyan:false,
            yan:false,
            food:false,
            current:'',
            close:false,
            foods:[],
            hotel:false,
            day:0,
        }
    },methods:{
        rest(){
            this.isrest=true
            if(this.d!=0){
            user.hp+=10
            user.money-=10
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
                this.isrest=false
                 this.$refs.hotel.className='hotel'
                 this.messages=[];
                return this.messages.push(`快走，快走！没钱住什么客舍！`)
            }
        },listen(){
            this.islisten=true
            var t=0
            this.messages=[];
            this.messages.push(`客舍中还有几个士伍在吃食聊天，他们几人从天气聊到收成，聊着聊着，话题慢慢偏转。`)
            var txt=document.getElementById('text')
            txt.addEventListener('click',()=>{
             this.messages=[];
            if(this.hoteltxt[t]==undefined){
                this.messages.push(`几人逐渐寂默，不再说话！`);
                this.close=true;
                this.close=false; return this.islisten=false }
            this.messages.push(this.hoteltxt[t]);t++
            })
        },detail(){
            if(this.islisten==true){return}
            this.t+=1
            this.messages=[]
           if(this.food==true){
               //this.messages.push()
           }
            if(this.message[this.t]==null){ 
                this.isyan=true;
                this.$refs.hotels.style=`background:url('img/郡县/建筑主题/2.jpg')  no-repeat ;background-size:cover;`;
                return this.messages.push(this.message[0])}
            this.messages.push(this.message[this.t])
        },shiny(){
             setTimeout(() => {
                this.show=false
            }, 700);
            setTimeout(() => {
                this.show=true
                this.shiny()
            }, 1400);
        },check(){
            var yan1='',yan2='';
             for(let item of Package){
                if(item.name=='验'){
                    yan1=true
                }else if(item.name=='传'){
                    yan2=true
                }this.yan=yan1&&yan2
            }
        },foodlist(){
            this.food=true;
            this.close=true;
            this.close=false;
            this.messages=[];
            this.messages.push(`客舍中的食物,都是舍人自己做的，如果舍中不再有食物，不妨过几天再来。`)
        },hotelrest(){
            this.hotel=true
            this.messages=[];
            this.messages.push(`每天十钱，价格公道，童叟无欺！`)
        },get(index){
            this.current=index;
        },buy(){
            var item=this.foods[this.current]
            if(user.money<item.money){return console.logs(`余钱不足以购买${item.name}`)}
           user.money-=item.money
           console.logs(`花费${item.money}钱，购买了${item.name}`)
           Package.push(item)
           var foods=this.foods
           for(let i in foods){
               if(foods[i]==item){
                   foods.splice(i,1)
                   break;
               }
           }this.displayfood()
        },displayfood(){
            this.foods.push(...items.con)
        }
    },mounted(){
        this.shiny();
        this.check();
        this.displayfood()
    },updated(){
    },watch:{
        day(){
            if(this.day<0){
                this.day=0
            }else if(this.day>Math.floor(user.money/10)){
                console.logs(`不能再添加天数了，你的钱不够！`)
                this.day-=1
            }
        }
    }
}
</script>

<style scoped>
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
#food span:hover{
 background: rgb(180, 174, 166 ,0.6);
}
#arcname{
    color:white
}
#food{
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