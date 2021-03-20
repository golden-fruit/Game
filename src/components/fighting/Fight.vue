<template>
<div>
  <div v-if="isover">
        <fightover></fightover>
        <div @click="fightover()" id="fightover">战斗结束</div>
  </div>
  <span v-if="isups" id="ups">击杀满{{user.killnum}}人，获得了{{kil[num].name}}</span>
  <div id="fight" ref="fight" v-show="!isover">
    <div>
      <h2>战斗</h2>
    </div>
    <div id="msg">
      <div class="message" id="logs">
        <li v-for="(item,index) in messages" :key="index">
          <span id="hour">[{{item.hour}}{{item.minute}}]-</span>
          <span id="name">({{item.content}}):</span>
          {{item.fightmessage}}
        </li>
      </div>
    </div>
    <div id="timeend">
      <span @click="timeover()" :class="atkname[0]==user.name?color:color2" id="end">--回合结束--</span>
      <span :class="user.ep<3?color2:color">--当前精力:{{ user.ep}}--</span>
    </div>
    <div id="bottom">
      <div id="ways">
        <div @click="attack()" :class="atkname[0]==user.name?((user.equipments.weapon?user.ep<user.equipments.weapon.effect.cost:user.ep<3)?color2:color):color2">攻击</div>
        <div @click="skill=!skill,item=''" :class="atkname[0]==user.name?(user.ep<3?color2:color):color2">技能</div>
        <div @click="defence()" :class="atkname[0]==user.name?(user.ep<2?color2:color):color2">防御</div>
        <div @click="item=!item,skill=''" :class="atkname[0]==user.name?color:color2">物品</div>
        <div @click="runaway()" :class="atkname[0]==user.name?(user.ep<2?color2:color):color2">逃跑</div>
        
      </div>
      <div id="list" v-show="skill||item">
          <div v-show="skill">
           <div id="skills">
            <li
              v-for="(skill,index) in showskill"
              :key="index"
              @click="choose(index)"
              :class="{get:skillnum==index&&skillnum!==''}">
              {{ skill.name }}--效果:
              <span
                v-show="skill.type=='战斗技'"
              >伤害{{skill.effect.dmg}} 耗费{{skill.effect.cost}}</span>
              <span v-show="skill.type=='医术'">恢复{{skill.effect.hp}}健康 耗费草药*1</span>
            </li>
           </div>
           <div @click="showfight()" class="buttons"  :class="color">战斗</div>
           <div @click="useskill()" class="buttons" :class="atkname[0]==user.name?(user.ep<3?color2:color):color2">使用技</div>
           <div @click="showres()" class="buttons" :class="color">医术</div>
          </div>
          <div v-show="item">
            <div id="consums">
             <li
              v-for="(item,index) in consums"
              :key="index"
              @click="getnum(index)"
              :class="{get:itemnum==index&&itemnum!==''}">{{item.name}}--效果:恢复{{item.effect.hp}}健康
             </li>
            </div>
            <div @click="showherb()" class="buttons" :class="color">药材</div>
            <div @click="useitems()" class="buttons" :class="atkname[0]==user.name?color:color2">使用药</div>
             <div @click="showfood()" class="buttons"  :class="color">食物</div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>
<script type='text/javascript'>
import fightover from "./FightOver.vue";
import Msg from "../msg.js";
import {
  human,
  user,
  isfight,
  first,
  last,
  SaveData,
  LoadData,
  load,
  date,
  Package,
  messages,
  atkname,
  position,
} from "../../scripts/public";
import { Person } from "../../scripts/mankind/person";
import {kil,arms} from "../../scripts/mankind/skills.js";
import { weapon } from "../../scripts/modes/trends.js";
import { weapons, armors } from "../../scripts/modes/equipments.js";
import { items } from "../../scripts/modes/items.js";
export default {
  components: {
    fightover,
  },
  name: "fight",
  data() {
    return {
      user: user,
      Package: Package,
      isfight: isfight,
      enemy: {},
      skill: true,
      item: "",
      skillnum: "",
      itemnum: "",
      consums: [],
      atkname: atkname,
      messages: messages,
      position:position,
      times:0,
      color:'color',
      color2:'color2',
      isdef:false,
      adddef:0,
      isover:false,
      isups:false,
      kil:kil,
      num:0,
      showskill:[],
    };
  },
  methods: {
    rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    showmessage() {
      if (messages.length > 15) {
        messages.reverse().splice(15);
        messages.reverse();
      }
      this.$nextTick(() => {
        var log = document.getElementById("logs");
        log.scrollTop = log.scrollHeight;
      });
    },
    runaway() {
      if (atkname[0] != user.name) {
        return console.logs(`敌人的回合！`);
      }
      if(user.ep<2){return console.logg(`精力不足`)}
      user.ep -= 2
      var p=user.level+1 / (this.enemy.level + user.level);
      if (Math.random() < p) {
        console.logs(`逃跑成功`)
        Msg.$emit("mm", "a"), this.isfight.splice(0, 1);
      } else {
        console.logs(`逃跑失败！`);
        if(user.ep<2){return}
        atkname[0]=this.enemy.name
        console.logg(`无胆小贼！哪里逃，吃我一剑！`);
        setTimeout(()=>{
          this.enemy.ep+=3
          this.enemy.skills.attack.effects(this.enemy,user) 
          atkname[0]=user.name
        },400)
      }
    },
    fightover() {
      user.money += this.enemy.money;
      user.exp+=this.enemy.level;
      console.logs(`获取 ${this.enemy.money}钱、${this.enemy.level}军功`);
      for (let i = 9; i >= 0; i--) {
        if (LoadData(i) != null) {
          SaveData(load, i);
          console.logs(`自动存储-存档${i}`);
          break;
        } else if (LoadData(0) == null) {
          SaveData(load, 0);
          console.logs(`自动存储-存档${i}`);
          break;
        }
      }atkname[0]=user.name
       Msg.$emit("mm", "a")
    },
    newenemy() {
      var rand = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      var arm = [];
      var num1=Math.floor((2800-position.y)/130)
      if(position.x>1450){num1+=rand(0,20)}else if(position.x<750){num1+=rand(0,5)}
      var level =parseInt(user.level)+num1;
      var chance = level / level + user.level+10;
      var turn=function(num){
        var news=Math.floor((level/20)*num)
        if(news>num){return num}else{
          return news
        }
      }
      var weap0=turn(13)
      var weap1=turn(16)
      var armo=turn(6)
      var bok=turn(7)
      if (Math.random() < chance) {
        //遇到随机非生成装备的几率
        if (Math.random() <chance) {
            arm.push(weapons[0][rand(0, weap0)]);
            arm.push(weapons[1][rand(0, weap1)]);
        } else {
          if(Math.random() <chance&&level>16){
            arm.push(weapons[2][rand(0, 2)]);
          }else{
            if(rand(0,1)==0){
              arm.push(weapons[0][rand(0,weap0)])
            }else{
              arm.push(weapons[1][rand(0,weap1)])
            }
          }
        }
      } else {
        if(Math.random() <chance){
          if (number == 2) {
            arm.push(weapon[rand(0, 2)]);
            arm.push(weapon[rand(0, 2)]);
          } else {
            arm.push(weapon[rand(0, 2)]);
          }
        }else{
          arm=[];
        }
        
      }
      var name = first[rand(0, 68)] + last[rand(0, 68)];
      var money = rand(10, 30) * level;
      var armor = armors[rand(0, 2)][rand(0, armo)];
      var books=items.bok
      var skill=[]
      if(level>2){
        if(Math.random()<chance){
          skill.push(books[rand(0, bok)])   //一阶段，主动技能
        }else{
          skill=[]
        }
      } if(level>5){
        if(Math.random()<chance){
          skill.push(kil[rand(0, turn(3))])     //二阶段，被动技能
          skill.push(arms[rand(0, turn(3))])
        }else{
          skill.push(books[rand(8,armo+8)])
        }
      } if(level>10){
        if(Math.random()<chance){
          skill.push(arms[rand(0, turn(3))])     //三阶段，回血
          skill.push(books[rand(15, turn(4)+15)])
        }else{
          skill.push(books[rand(0, bok)])
        }
      }if(level>15){
         if(Math.random()<chance){
            skill.push(kil[rand(0, turn(3))]) 
           skill.push(books[rand(15, turn(4)+15)])  //四阶段，回血
         }else{
            skill.push(books[rand(8,armo+8)])
         }
      }
      var enemydata = [
        name,
        level,
        money,
        human[0],
        ...arm,
        armor,
        ...skill
      ];
      var enemy = new Person(...enemydata);
      this.enemy = enemy;
      messages.splice(0)
      atkname.splice(0,1)
      atkname.push(`敌情`)
      enemy.ph=rand(0,turn(7))
      enemy.effect(enemy);
      enemy.equipment();
      localStorage.setItem(`enemy`, JSON.stringify(enemy));
    },
    choose(index) {
      this.skillnum = index;
    },
    attack() {
      if (atkname[0] != user.name) {
        return console.logs(`敌人的回合！`);
      }
       var skill = user.skills.attack;
      if(user.equipments.weapon){
        var wu=user.equipments.weapon
        if(user.ep-wu.effect.cost-1<0){
          return console.logg(`精力不足`);
        }
        user.ep -=(wu.effect.cost+1);
        var enemy = this.enemy;
        var dmg = Math.floor(
          (user.atk * wu.dmg * 100) / (100 + enemy.def)
        );
        enemy.hp -= dmg;
        console.logg(
          `使用${user.equipments.weapon.name} 耗费${wu.effect.cost+1}精力 造成 ${dmg}伤害`
        );
      }else{
        if (user.ep - skill.effect.cost < 0) {
          return console.logg(`精力不足`);
        }
        user.ep -= skill.effect.cost;
        var enemy = this.enemy;
        var dmg = Math.floor(
          (user.atk * skill.effect.dmg * 100) / (100 + enemy.def)
        );
        enemy.hp -= dmg;
        console.logg(
          `使用拳头 耗费${skill.effect.cost}精力 造成 ${dmg}伤害`
        );
      }
    },
    defence(){
      if (atkname[0] != user.name) {
        return console.logs(`敌人的回合！`);
      }
      var armor=user.equipments.armor
      if(armor){
        if(user.armor.effect.cost<0){return console.logg(`精力不足`)}
        user.ep-=armor.effect.cost
        this.adddef=Math.floor(user.def*armor.add)
        console.logg(`耗费${armor.effect.cost}精力 防御大量上升`)
      }else{
        if(user.ep-2<0){return console.logg(`精力不足`)}
        user.ep-=2
        this.adddef=Math.floor(user.def*0.3)
        console.logg(`耗费2精力 防御少量上升`)
      }
      user.def+= this.adddef
      this.isdef=true
      this.timeover()
    },
    useskill() {
      if (atkname[0] != user.name) {
        return console.logs(`敌人的回合！`);
      }
      var skills = this.showskill;
      var skill = skills[this.skillnum];
      var enemy = this.enemy;
      if (skill.type == "战斗技") {
        if (user.ep - skill.effect.cost < 0) {
          return console.logg(`精力不足`);
        }
        user.ep -= skill.effect.cost;
        var dmg = Math.floor(
          (user.atk * skill.effect.dmg * 100) / (100 + enemy.def)
        );
        enemy.hp -= dmg;
        console.logg(
          `使用${skill.name} 耗费${skill.effect.cost}精力 造成 ${dmg}伤害`
        );
      } else if (skill.type == "医术") {
        for (let i in Package) {
          if (Package[i].pastype == "药材") {
            user.hp += (skill.effect.hp+Package[i].effect.hp);
            if (user.hp > user.proportyLimit.maxhp) {
              user.hp = user.proportyLimit.maxhp;
            }
            Package.splice(i, 1);
            return console.logs(
              `${user.name} 使用${skill.name}技能 消耗草药*1`
            );
            console.logg(`${user.name} 健康+${skill.effect.hp}`);
          } else if (i == Package.length - 1) {
            console.logg(`${user.name} 背包中已无药材！`);
          }
        }
      }
    },
    getnum(index) {
      this.itemnum = index;
    },
    showconsums() {
      this.consums = [];
      for (let i in this.Package) {
        if (this.Package[i].type == "消耗品") {
          this.consums.push(this.Package[i]);
        }
      }var skills=this.consums
      for(var i=0; i<skills.length;i++){
        for(let j=i;j<skills.length-1;j++){
          if(skills[i].effect.hp>skills[i+1].effect.hp){
            var temp=skills[i]
            skills[i]=skills[i+1]
            skills[i+1]=temp
          }
        }
      }
    },
    showherb(){
      var herb=this.Package
      this.consums=[];
      for(let item of herb){
        if(item.pastype=='药材'){
          this.consums.push(item)
        }
      }
    },
    showfood(){
       var food=this.Package
       this.consums=[];
       for(let item of food){
        if(item.pastype=='食物'){
          this.consums.push(item)
        }
      }
    },
    useitems() {
      if (atkname[0] != user.name) {
        return console.logs(`敌人的回合！`);
      }
      var useItem = this.consums[this.itemnum];
      for (let i in this.Package) {
        if (this.Package[i] == useItem) {
          this.Package.splice(i, 1);
          this.showconsums();
          console.logg(`使用了:${useItem.name} 健康 +${useItem.effect.hp}`);
          user.hp += useItem.effect.hp;
          break;
        }
      }
    },
    timeover() {
        if (atkname[0] != user.name) {
        return console.logs(`敌人的回合！`);
      }
       console.logg(`${atkname[0]}回合结束 ——`)
       this.$set(atkname,0,this.enemy.name)
    },
    enemytime() {
        var enemy=this.enemy
        if(this.times!=0){
            enemy.ep+=enemy.restore
            if(enemy.ep>enemy.maxep){enemy.ep=enemy.maxep}
            console.logg(`回复${enemy.restore}精力`)
        }this.times+=1

        setTimeout(()=>{
            for(let item of enemy.skills.actives){
              if(enemy.hp<50 && item.type=='医术' && item.effect.cost<enemy.ep){
                item.effects(enemy,user)
              }else if(item.effect.cost<=enemy.ep&&item.type!='医术'){
                item.effects(enemy,user)
              }
            }
        },1000)
        setTimeout(()=>{
          if(enemy.skills.actives[0]&&enemy.ep<=4&&enemy.skills.actives[0].effect.cost<=enemy.maxep){
            this.enemyover()
          }else{
            
            if(enemy.equipments.weapon[0]){
              var cost=enemy.equipments.weapon[0].effect.cost
              while(enemy.ep>=(cost+1)){
                enemy.skills.attack.effects(enemy,user)
              }this.enemyover()
            }else{
              while(enemy.ep>=3){
                enemy.skills.attack.effects(enemy,user)
              }this.enemyover()
            }
         
          }
        
        },2000)
    },
    enemyover(){
      if(this.isdef==true){
         user.def-=this.adddef
         this.isdef=false
      }setTimeout(()=>{
        console.logg(`${atkname[0]}回合结束 ——`)
        this.$set(atkname,0,user.name)
      },1000)
    },
    fistattack() {
      var enemy = this.enemy;
      var name;
        if (user.ep >= enemy.ep) {
          name = user.name;
        } else {
          name = enemy.name;
        }
      this.$set(atkname, 0, name);
      console.logg(`战斗开始，${this.atkname[0]}先攻`);
    },
    showskills(){
      this.showskill=[]
      this.showskill.push(...user.skills.actives)
    },
    showfight(){
      this.showskill=[]
      var fight=user.skills.actives.filter((skill)=>{
        return skill.type=='战斗技'
      })
      this.showskill.push(...fight)
      var skills=this.showskill
      for(var i=0; i<skills.length;i++){
        for(let j=i;j<skills.length-1;j++){
          if(skills[i].effect.cost>skills[i+1].effect.cost){
            var temp=skills[i]
            skills[i]=skills[i+1]
            skills[i+1]=temp
          }
        }
      }
    },
    showres(){
      this.showskill=[]
       var res=user.skills.actives.filter((skill)=>{
        return skill.type=='医术'
      })
      this.showskill.push(...res)
      var skills=this.showskill
      for(var i=0; i<skills.length;i++){
        for(let j=i;j<skills.length-1;j++){
          if(skills[i].effect.hp>skills[i+1].effect.hp){
            var temp=skills[i]
            skills[i]=skills[i+1]
            skills[i+1]=temp
          }
        }
      }
    }
  },
  mounted: function() {
    this.showskills()
    this.newenemy();
    this.showconsums();
    this.showmessage();
    setTimeout(()=>{this.fistattack()},800)
  },
  updated() {
    localStorage.setItem(`enemy`, JSON.stringify(this.enemy));
  },
  watch: {
    atkname() {
      if (atkname[0] == user.name) {
        setTimeout(()=>{ 
            console.logg(`${atkname[0]}回合开始 ——`)
            if(this.times!=0){
              var res=user.proportyLimit.restore
                console.logg(`回复${res}精力`)
                user.ep += res;
            }
       },500);
      } else if(atkname[0] == this.enemy.name){
        setTimeout(()=>{ console.logg(`${atkname[0]}回合开始 ——`);
        this.enemytime()},2000) 
      }
    },
    'enemy.hp':{
        handler(){
            if(this.enemy.hp<0){
                this.enemy.hp=0;
                console.logg(`已击杀敌人`)
                user.killnum+=1
                switch(user.killnum){
                  case 10:
                    if(Math.random()<0.5){
                      setTimeout(()=>{this.isups=false},3000)
                      user.skills.passives.push(kil[0])
                      this.num=0
                      this.isups=true
                    }
                    break;
                  case 20:
                    if(Math.random()<0.6){
                      setTimeout(()=>{this.isups=false},3000)
                      user.skills.passives.push(kil[1])
                      this.num=1
                      this.isups=true
                    }
                    break;
                  case 30:
                    if(Math.random()<0.7){
                      setTimeout(()=>{this.isups=false},3000)
                      user.skills.passives.push(kil[2])
                      this.num=2
                      this.isups=true
                    }
                    break;
                  case 40:
                    if(Math.random()<0.8){
                      setTimeout(()=>{this.isups=false},3000)
                      user.skills.passives.push(kil[3])
                      this.num=3
                      this.isups=true
                    }
                    break;
                }
                setTimeout(()=>{
                  this.isover=true
                  this.isfight.splice(0, 1)},2000)
            }
        },
    },
    'user.ep':{
      handler(){
        if(user.ep<2){
          this.timeover()
        }
      }
    }
  }
};
</script>
<style scoped>
#fight{
  height: 560px;
}
#ups{
  position: absolute;
  top: 260px;
  left:650px;
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  width: 260px;
  background:url(../../../public/img/0.jpg);
  /* background: rgb(241, 214, 137); */
  z-index: 3;
}
#timeend{
  border: 2px solid black;
  height: 60px;
  line-height: 60px;
  width: 500px;
  margin: 0 auto;
  border-radius: 10px;
  text-align: left;
}
#timeend span{
  height: 40px;
  color: white;
  line-height: 40px;
  border-radius: 5px;
  border: 2px solid black;
}
#fightover{
  background:rgb(241, 214, 137);
  width: 100px;
  margin: 0 auto;
}
#fightover:hover{
  color: aliceblue;
}
.color{
    background: #005ab5;
}
.color2{
    background:gray;
}
.get {
  background-color: pink;
  /* width: 550px;; */
}
#bottom{
  position: relative;
  margin: 10px auto;
  width: 550px;
  height: 130px
}
#list {
  position: absolute;
  text-align: left;
  margin: 0 auto;
  left: 200px;
  top: 0;
}
#list li{
  margin-left: 10px;
}
#skills,#consums{
  overflow: scroll;
  overflow-x: hidden;
  height: 100px;
  width: 340px;
  border:black 2px solid;
  border-radius: 5px;
}
.buttons{
  margin-top: 5px;
  text-align: center;
  color: aliceblue;
  display:inline-block ;
  width: 40px;
  height: 20px;
  line-height: 20px;
  border: 2px solid black;
  border-radius: 5px;
}
#ways{
  position: absolute;
  display: inline-block;
  border-radius: 8px;
  border: 2px solid black;
  width: 190px;
  left:0
}
#ways div {
  color: aliceblue;
  height: 30px;
  line-height: 30px;
  width: 50px;
  border-radius: 5px;
  margin: 10px 10px;
  display: inline-block;
}
#ways div:hover {
  background: pink;
 
}
#end:hover {
  background: pink;
}
.buttons:hover{
    background-color: pink; 
}
#msg{
    margin: 0 auto;
    width: 500px;
}
.message {
  margin-bottom: 15px;
  height: 200px;
  border: 2px solid white;
  background: rgba(243, 169, 73, 0.3);
  line-height: 20px;
  overflow: auto;
}
#logs li {
  margin: 2px;
  opacity: 0.8;
  list-style: none;
  text-align: left;
  background: rgba(243, 169, 73, 0.6);
}
.message::-webkit-scrollbar {
  width: 5px;
}
/* 滚动条滑块 */
.message::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #6d7f7a !important;
}
.message::-webkit-scrollbar-track {
  border-radius: 10px;
}
#skills::-webkit-scrollbar {
  width: 5px;
}
/* 滚动条滑块 */
#skills::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #6d7f7a !important;
}
#skills::-webkit-scrollbar-track {
  border-radius: 10px;
}
#consums::-webkit-scrollbar {
  width: 5px;
}
/* 滚动条滑块 */
#consums::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #6d7f7a !important;
}
#consums::-webkit-scrollbar-track {
  border-radius: 10px;
}
#hour {
  color: rgb(231, 222, 222);
}
#name {
  color: #005ab5;
}
</style>