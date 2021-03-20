<template>
  <div style=" overflow: hidden;">
    <span id="date">秦王政{{nian}}年{{yue}}月{{ri}}日 {{season}} 金:{{jin}} 钱:{{qian}}</span>
    <span v-if="isup" id="up">爵位提升，获得了{{user.equipments.headwear[user.level].name}}</span>
    <transition name='bounce'>
    <div v-if="mm==0">
      <hometown></hometown>
    </div>
    <div v-if="mm==1">
      <country></country>
    </div>
    <div v-if="mm==2">
      <nan></nan>
    </div>
    </transition>
  <transition name="slide-fade">
    <div v-if="mm==100">
      <Fight></Fight>
    </div>
  </transition>

    <div v-if="mm==400">
        死亡如潮水般袭来，你想起家乡殷切的双亲。想起战场上的敌我双方，他们会赢吗？战斗至死，大概是战士最后的荣耀了！
    </div>

    <div v-show="typeof mm!='number'" id="walk" ref="scroll">
       <div class="province" id="hometowns">
       云梦乡
      </div>
       <div class="province" id="countrys">
        安陆县
      </div>
      <div class="province" id="nans">
        南郡
      </div>
      <div id="person" ref="person"></div>
      <div id="div"></div>
      <div ref="mapbox" class="map"></div>
      <!--<div ref="mapbox" class="map" style="backgroundImage:URL(img/11.jpg);"></div>-->
    </div>
  </div>
</template>

<script>
import Msg from './msg.js'
import { echarts } from "../scripts/map/allmap.js";
import hometown from "./province/hometown.vue";
import country from "./province/country.vue";
import nan from "./province/city-nan.vue";
import Fight from "./fighting/Fight.vue"
import { user,position,isfight,SaveData,LoadData,load,date} from '../scripts/public';
import { positon0 } from '../scripts/oringindata';
const option = {
  title: {
    text: "大地图",
    subtext: "战国"
  },
  series: [
    {
      name: "大地图",
      type: "map",
      map: "战国",
      itemStyle: {
        areaColor: " rgba(243, 169, 73, 0)",
        borderColor: "black",
        borderWidth: 2
      },
      roam: false,
      zoom: 1.24,
      emphasis: {
        label: {
          show: false,
          color: "#fff",
          fontSize: 25
        },
        itemStyle: {
          areaColor: " rgba(243, 169, 73, 0)"
        }
      },
      data: [
        { name: "齐国", value: "51", occupy: false },
        { name: "楚国", value: "41", occupy: false },
        { name: "燕国", value: "31", occupy: false },
        { name: "魏国", value: "1", occupy: false },

        { name: "南郡", value: "1" },
        { name: "巴郡", value: "2" },
        { name: "蜀郡", value: "3" },
        { name: "京畿", value: "4" },
        { name: "黔中郡", value: "5" },
        { name: "汉中郡", value: "6" },
        { name: "南阳郡", value: "7" }
      ]
    }
  ], 
  visualMap: [
    {
      type: "piecewise",
      show: true,
      splitNumber: 3,
      pieces: [
        { min: 70 },
        { min: 60, max: 69 },
        { min: 50, max: 59 },
        { min: 40, max: 49 },
        { min: 30, max: 39 },
        { min: 20, max: 29 },
        { min: 10, max: 19 },
        { min: 1, max: 9 }
      ], showLabel: false,
      inRange: {
        color: [
          "lightskyblue",
          "#FF6666",
          "#8C3C99",
          "#80C21D",
          "yellow",
          "#f97a06",
          "orangered"
        ]
      }, itemWidth: 0,
      itemHeight: 0
    }
  ],
}
export default {
  name: "maps",
  components: {
    hometown,
    country,
    nan,
    Fight,
  },
  data() {
    return {
      user:user,
      position:position,
      date:date,
      mychart: "",
      mm: "a",
      run: 110,
      runy: 190,
      jun: [],
      sp: [],
      x: "",
      y: "",
      endmove:true,
      person:'',
      isfight:isfight,
      nian:'',
      yue:'',
      ri:'',
      season:'',
      wall:[],
      d:0,
      jin:'',
      qian:'',
      exp:[2,6,12,20,30,42,56,72,90,110,132,156,182,210,240,272,306,342,380,420],
      isup:'',
    };
  },
  methods: {
    Configure() {
      var _this = this;
      window.onresize = _this.mychart.resize; //窗口大小改变时触发的事件
      this.mychart.on("click", function(params) {
        if (params.value) {
          _this.mm = params.value;
          console.log(_this.mm);
        }
      });
    },
    keydown() {
      var person = this.$refs.person;
      person.innerHTML = '<img src="img/人物/111.jpg" width="60" height="50">';
      var that = this;
      var scroll = this.$refs.scroll;
      document.onkeydown = function(e) {
        person.innerHTML = '<img src="img/人物/111.gif" width="60" height="50">';
        var e = e || event;
        if (e.keyCode == 68) {
          that.run++;
          var dist = that.run * 10;
          person.style.left = `${dist}px`;
          scroll.scrollLeft = dist - 400;
        }
        if (e.keyCode == 65) {
          that.run--;
          var dist = that.run * 10;
          if (dist <= 0) {
            dist = 0;
            that.run = 0;
          }
          person.style.left = `${dist}px`;
          scroll.scrollLeft = dist - 400;
        }
        if (e.keyCode == 87) {
          that.runy--;
          var dis = that.runy * 10;
          if (dis <= 0) {
            (dis = 0), (that.runy = 0);
          }
          person.style.top = `${dis}px`;
          scroll.scrollTop = dis - 300;
        }
        if (e.keyCode == 83) {
          that.runy++;
          var dis = that.runy * 10;
          person.style.top = `${dis}px`;
          scroll.scrollTop = dis - 300;
        }
        that.hittest();
      };
      document.onkeyup = function() {
        person.innerHTML = '<img src="img/人物/111.jpg" width="60" height="50">';
      };
    },
    positions() {
      var person = this.$refs.person;
      person.innerHTML = '<img src="img/人物/111.jpg" width="60" height="50">';
      var scroll = this.$refs.scroll;
      person.style.left=this.position.x+'px';
      person.style.top=this.position.y+'px';
      var nx = Math.floor(person.offsetLeft);
      var ny = Math.floor(person.offsetTop);
      scroll.scrollLeft = nx - 400;
      scroll.scrollTop = ny- 300;
    },
    collision(person, item) {
      if (
        person.offsetLeft <= item.offsetLeft + item.offsetWidth &&
        person.offsetLeft + person.offsetWidth >= item.offsetLeft &&
        person.offsetTop <= item.offsetTop + item.offsetHeight &&
        person.offsetTop + person.offsetHeight >= item.offsetTop
      ) {
        return true;
      }
    },
    hittest() {
      var person = this.$refs.person;
      for (let item of this.jun) {
        if (this.collision(person, item)) {
          if(item.innerHTML=='南郡'){
            console.logs(`到达南郡`);
            this.mm = 2;
          }break;
        } else {
          this.mm = "a";
        }
      }
    },
    drawTable(edge, n) {
      var size = edge / n;
      function StringBuffer() {
        this.strings = [];
      }
      StringBuffer.prototype.append = function(str) {
        this.strings.push(str);
      };
      StringBuffer.prototype.toString = function() {
        return this.strings.join(``);
      };
      var sb = new StringBuffer();
      sb.append(`<table border='1' height='${edge}' width='${edge}' bgcolor='red'>`);
      for (let i = 0; i < n; i++) {
        sb.append("<tr>");
        for (let j = 0; j < n; j++) {
          sb.append(`<td width='${size}' height='${size}' id='${j}.${i}'`);
          sb.append(` bgColor='yellow'>${j},${i}</td>`);
        }
        sb.append(`</tr>`);
      }
      sb.append(`</table>`);
      document.getElementById(`div`).innerHTML = sb.toString();

      var sp = this.sp;
      for (let i = 0; i < n; i++) {
        sp[i] = new Array();
        for (let j = 0; j < n; j++) {
          sp[i][j] = document.getElementById(`${i}.${j}`);
        }
      }
        this.wall=[
          sp[7][21],sp[7][22],sp[7][23],sp[7][24],sp[8][25],sp[8][26],sp[8][27],
          sp[9][28],sp[9][29],sp[10][30],sp[10][31],sp[10][32],sp[11][33],sp[12][34],
          sp[13][34],sp[13][35],sp[14][36],sp[15][37],sp[16][37],sp[17][36],sp[18][36],
          sp[19][36],sp[20][35],sp[21][35],sp[22][35],sp[23][34],sp[22][33],sp[22][32],
          sp[22][31],sp[23][30],sp[23][29],sp[23][28],sp[22][27],sp[22][26],sp[23][25],
          sp[24][25],sp[25][24],sp[26][23],sp[26][22],sp[26][21],sp[27][21],sp[28][20],
          sp[29][19],sp[29][18],sp[29][17],sp[29][16],sp[28][16],sp[27][16],sp[29][15],
          sp[29][14],sp[30][13],sp[31][12],sp[32][11],sp[33][11],sp[33][10],
          sp[34][9],sp[34][8],sp[34][7],sp[35][7],sp[35][6],sp[35][5],sp[35][4],sp[34][3],
          sp[33][3],sp[33][2],sp[32][2],sp[31][2],sp[30][2],sp[29][2],sp[28][2],sp[27][2],
          sp[26][2],sp[25][1],sp[24][1],sp[23][1],sp[22][1],sp[21][2],sp[20][3],sp[21][4],
          sp[22][4],sp[23][4],sp[24][5],sp[24][6],sp[23][7],sp[23][8],sp[23][9],
          sp[22][10],sp[21][10],sp[20][10],sp[19][10],sp[18][11],sp[17][11],sp[16][11],
          sp[15][11],sp[14][11],sp[13][11],sp[12][11],sp[11][11],sp[10][11],sp[9][12],
          sp[8][12],sp[7][13],sp[6][13],sp[5][13],sp[4][14],sp[3][15],sp[2][16],sp[2][17],
          sp[2][18],sp[2][19],sp[3][20],sp[4][20],sp[5][21],sp[6][21],
        ]
        var items=this.wall
         for(let item of items){
          //item.innerHTML = '<img src="img/环境/2.jpg" width="68" height="70" style="background-size:cover">'
        }
        this.setposition(hometowns,1100,2750)
        this.setposition(countrys,1200,2200)
        this.setposition(nans,1260,1680)
    },
    getMousePos() {
      var scroll = this.$refs.scroll;
      scroll.addEventListener("click", e => {
        var scrollX = scroll.scrollLeft;
        var scrollY = scroll.scrollTop;
        this.x = Math.floor(e.clientX + scrollX - 352);
        this.y = Math.floor(e.clientY + scrollY - 14);
        // console.log(this.x,this.y)
        if(this.endmove==false){return console.logs(`移动中`)}
        this.move()
      });
    },
    move() {
      this.endmove=false
      var speed=2
      var person = this.$refs.person;
      person.innerHTML = '<img src="img/人物/111.jpg" width="60" height="50">';
      var scroll = this.$refs.scroll;
      var x = this.x;
      var y = this.y;
      var nx = Math.floor(person.offsetLeft);
      var ny = Math.floor(person.offsetTop);
      if (nx != x || ny != y) {
        if (nx < x && ny < y) {
          nx ++
          ny ++
        } else if (nx == x && ny < y) {
          ny ++
        } else if (ny == y && nx < x) {
          nx ++
        } else if (nx < x && ny > y) {
          nx ++
          ny --
        } else if (nx == x && ny > y) {
          ny --
        } else if (ny == y && nx < x) {
          nx ++
        } else if (nx > x && ny > y) {
          nx --
          ny --
        } else if (nx == x && ny > y) {
          ny --
        } else if (ny == y && nx > x) {
          nx --
        } else if (nx > x && ny < y) {
          nx --
          ny ++
        } else if (nx == x && ny < y) {
          ny ++
        } else if (ny == y && nx > x) {
          nx --
        }
        if(Math.random()<1/200){
        this.mm=100
          this.isfight.push(1)
          return this.endmove=true
        }
        person.innerHTML = '<img src="img/人物/111.gif" width="60" height="50">';
        var items=this.wall
        for(let item of items){
          if(this.collision(person,item)){
          this.borderwall(person,item)
          }
        }
        if(this.endmove==true){
          person.innerHTML = '<img src="img/人物/111.jpg" width="60" height="50">';
          return console.logs(`世界无限而有极！`);
        }
        var jun=this.jun
        for(let i=0;i<jun.length;i++){
          if(this.collision(person,jun[i])){
            this.borderwall(person,jun[i])
             this.mm=i
            person.innerHTML = '<img src="img/人物/111.jpg" width="60" height="50">';
            return console.logs(`到达${jun[i].innerHTML}`)
          }
        }
        this.d++
        if(this.d==30){
          var item=date[0]
          date.splice(0,1)
          item+=1
          date.push(item)
          this.d=0
        }
        setTimeout(() => {
          this.move();
        }, 20/speed);
      } else {
        console.logs(`到达目的地`);
        this.endmove=true
        person.innerHTML = '<img src="img/人物/111.jpg" width="60" height="50">';
      }
      person.style.left = nx+ "px";
      person.style.top = ny+ "px";
      scroll.scrollLeft = nx - 400;
      scroll.scrollTop = ny - 300;
      this.position.x=nx;
      this.position.y=ny;
      this.run=parseInt(person.style.left)/10
      this.runy=parseInt(person.style.top)/10  
    },
    borderwall(person,item){
      var scroll = this.$refs.scroll;
      var nx = Math.floor(person.offsetLeft);
      var ny = Math.floor(person.offsetTop);
      var ix=item.offsetLeft;
      var iy=item.offsetTop;
      var width=item.offsetWidth
      var height=item.offsetHeight
      var pw=person.offsetWidth
      var ph=person.offsetHeight
        console.log(`碰撞${item.innerHTML}`)
        if(ix+width<=nx){
         nx+=5
        }else if(iy+height<=ny){
         ny+=5
        }else if(ix>=nx+pw){
         nx-=5
        }else if(iy>=ny+ph){
         ny-=5
        } else{
          nx+=nx-ix
        }
      this.position.x=nx;
      this.position.y=ny;
      person.style.left = nx+ "px";
      person.style.top = ny+ "px";
      scroll.scrollLeft = nx - 300;
      scroll.scrollTop = ny - 300;
      this.endmove=true
    },
    childnum(){
      var _this=this
      Msg.$on("mm",function(m){
            _this.mm=m;
        })
    },
    dates(){
      var date=this.date[0]
      var time=['十','一','二','三','四','五','六','七','八','九',]
      var times=['一','二','三','四','五','六','七','八','九','十',]
      var year=Math.floor(date/360)
      var yf=Math.floor(year/10)
      var ys=year-yf*10
      this.nian=time[yf]+time[ys]
      var month=Math.floor((date-year*360)/30)
      if(date-year*360-month*30==0){
        month-=1
      }
      var mf=Math.floor(month/10)
      var ms=month-mf*10
      if(month<10){
        this.yue=times[ms]
      }else{ this.yue=times[9]+times[ms]}
      var day=date-year*360-month*30
      var df=Math.floor(day/10)
      var ds=day-df*10
      if(day<10){
        this.ri=time[ds]
      }else if(day==10){
        this.ri=time[0]
      }else if(day==20){
        this.ri= time[df]+time[0]
      }
      else{
        if(df==1){
           this.ri=time[0]+time[ds]
        }else if(df==2){
           this.ri=time[df]+time[0]+time[ds]
        }else{this.ri=time[df]+time[ds]}
      }
      if(month<3){
        this.season='春'
      }else if(2<month<5){
        this.season='夏'
      }else if(4<month<8){
        this.season='秋'
      }else{
        this.season='冬'
      }
    },
    displaymoney(){
      var m=user.money
      this.jin=Math.floor(m/100)
      if(m-this.jin*100==0&&m!=0){
          this.jin-=1
      }
      this.qian=m-this.jin*100
    },
    setposition(p,x,y){
      p.style.left=x+'px';
      p.style.top=y+'px';
      this.jun.push(p)
    },
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.mapbox);
    this.mychart.setOption(option);
    this.drawTable(3600, 50);
    this.getMousePos();
    this.positions();
    this.childnum();
    this.keydown();
    this.dates();
  },
  updated() {
    this.positions();
  },
  watch:{
    date(){
      this.dates()
    },
    'user.money':{
      handler(){
         this.displaymoney()
      },immediate:true,
    },
    'user.hp':{
      handler(){
        if(user.hp>100){
          user.hp=100
        }else if(user.hp<=0){
          user.hp=0
          console.logs(`在这战火纷飞的时代，个人的死亡如同草芥一般，丝毫无人在意！`)
          console.logg(`在这战火纷飞的时代，个人的死亡如同草芥一般，丝毫无人在意！`)
          this.mm=400
        }
      },immediate:true,
    },
    'user.ep':{
      handler(){
        var max=user.proportyLimit.maxep
        if (user.ep > max) {
          user.ep = max;
        }
      },immediate:true,
    },
    'user.exp':{
      handler(){
        var exps=this.exp
        if(exps>=420){
          return user.level=20
        }
        for(let i in exps){
          if(exps[i]>user.exp){
            parseInt(i)
            user.level=i
            setTimeout(()=>{
              this.isup=false
            },2000)
            return this.isup=true
          }
        }
      },immediate:false,
    }
  },
};
</script>>

<style scoped>
#up{
  position: absolute;
  top: 260px;
  left:650px;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  width: 260px;
  background:url(../../public/img/0.jpg);
  /* background: rgb(241, 214, 137); */
  z-index: 3;
}
#date{
  float: left;
  position: absolute;
  top:10px;
  left: 350px;
  height: 30px;
  line-height: 30px;
  width: 300px;
  border: black solid 2px;
  background:url(../../public/img/0.jpg);
  z-index: 3;
}
#walk {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%
}
.map {
  position: absolute;
  float: center;
  width: 3600px;
  height: 3000px;
  z-index: 1;
}
.province {
  position: absolute;
  float: center;
  height: 80px;
  width: 100px;
  line-height:120px;
  border: 2px black solid;
  color: red;
  font-weight:bold;
  z-index: 2;
}
#hometowns{
  height: 50px;
  width: 80px;
 background-image: url("../../public/img/郡县/建筑图标/00.jpg");
}
#countrys{
  height: 80px;
  width: 80px;
 background-image: url("../../public/img/郡县/建筑图标/1.jpg");
}
#nans{
 background-image: url("../../public/img/郡县/建筑图标/2.jpg");
}
#person {
  position: absolute;
  width: 60px;
  height: 50px;
  z-index: 2;
}
#div {
  position: absolute;
  /*display: none;*/
  float: left;
  z-index: 0;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.slide-fade-enter-active {
   transition: all .3s ease;
}
.slide-fade-leave-active {
   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);

}
.slide-fade-enter, .slide-fade-leave-to{
  transform: translateX(10px);
  opacity: 0;
}
</style>