<template>
  <div style="overflow-x:hidden;">
        <div>
            <div class="title">
                <h2 id="title">技能</h2>
            </div>
            <div class="list" style=" background-image: URL(img/0.jpg);">
                <ul v-for="(item,index) in showskills"
                    :key="index"
                    @click="chose(index)"
                    :class="{active: index==current && current!==''}">
                    <a class="logo" v-if="item.type=='竹简'?(item.record?true:false):false"></a>
                    <li>
                        <span><b>名称:</b>{{ item.name }} </span>
                        <span><b>类型:</b>{{ item.type }} </span>
                        <span v-if="item.type=='战斗技'?true:false"><span><b>耗费:</b>精力*{{ item.effect.cost }} </span> <span> <b>效果:</b> 伤害倍率{{ item.effect.dmg }}</span></span>
                        <span v-if="item.type=='阅历'?true:false"><span><b>阅历类型:</b>{{ item.pastype }} </span> <span> <b>效果:</b> 攻击+{{ item.effect.atk }} 防御+{{ item.effect.def }} <span v-if="item.iseffect">已激活</span><span v-if="!item.iseffect">未激活</span></span></span>
                        <span v-if="item.type=='医术'?true:false"><span><b>耗费:</b>药材*1 </span> <span> <b>效果:</b> 恢复{{ item.effect.hp }}健康</span></span>
                        <span v-if="item.type=='竹简'?true:false"><b>效果:</b>内容浩瀚博大，智慧的火花、先人的思想、超越时空的交流……</span>
                    </li>
                </ul>
            </div>
            <div class="button">
                —
                <button @click="useskill()">使用</button>
                <button @click="showdetail()">查看</button>
                <button @click="showbooks()">竹简</button>
                —
                <button @click="showall()">所有技能</button>
                <button @click="activeskill()">主动技能</button>
                <button @click="fightskill()">战斗技能</button>
                <button @click='passiveskill()'>被动技能</button>
                —
            </div>
        
        </div>

  </div>
</template>

<script type='text/javascript'>
import {user,Package,atkname} from '../scripts/public.js'
export default {
    name:'skill',
    data(){
        return{
           current:'',
           showskills:[],
           atkname:atkname,
           Package:Package,
        }
    },
    methods:{
        showdetail(){
            if(this.current==this.showskills.length){return this.current==''}
            if(this.current===''){return}
            console.logs( this.showskills[this.current].description ) 
        },
        chose(index){
            this.current=index;
        },
        activeskill(){
            this.showskills=[];
            this.showskills.push(...user.skills.actives)
            if(this.current==this.showskills.length){return this.current==''}
        },
        passiveskill(){
            this.showskills=[];
            this.showskills.push(...user.skills.passives)
            if(this.current==this.showskills.length){return this.current==''}
        },
        showbooks(){
            this.showskills=[];
            for(let item of this.Package){
                if(item.type=='竹简'){
                    this.showskills.push(item)
                }
           }
        },
        fightskill(){
            if(this.current==this.showskills.length){return this.current==''}
            this.showskills=[];
            for(let item of user.skills.actives){0
                if(item.type=='战斗技'){
                     this.showskills.push(item)
                }
            }
            var skills=this.showskills
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
        useskill(){
            if (atkname[0] != user.name) {
                return console.logs(`敌人的回合！`);
            }
            if(this.current==this.showskills.length){return this.current==''}
            if(this.current===''){return}
            var skill=this.showskills[this.current]
            if(skill.type=='竹简'){
                if(skill.record==null){return console.logs(`简册所记载文字，已被人刻意划掉！...像是要写入新的内容...`)}
                var sitem=skill.record
                var passives=user.skills.passives
                var actives=user.skills.actives
                if(sitem.type=='阅历'){
                     for(let i in passives){
                        if(passives[i].name==sitem.name){
                            passives[i]=sitem
                            return console.logs(`${user.name}再次品读${skill.name},${sitem.name}已习得`)
                        }else if(i==passives.length-1){
                            passives.push(sitem)
                            console.logs(`${user.name}仔细研读${skill.name},已习得${sitem.name}`)
                            break 
                        }
                    }
                }else if(sitem.type=='战斗技'||sitem.type=='医术'){
                    for(let i in actives){
                        if(actives[i].name==sitem.name){
                            actives[i]=sitem
                            return console.logs(`${user.name}再次品读${skill.name},${sitem.name}已习得`)
                        }else if(i==actives.length-1){
                            actives.push(sitem)
                            console.logs(`${user.name}仔细研读${skill.name},已习得${sitem.name}`)
                            break 
                        }
                    }
                }delete skill.record
                for(let item of Package){
                    if(item.name==skill.name){delete item.record;break}
                }this.showbooks()
            }else if( skill.type=='医术'&& skill.effect.hp){
                for(let i in Package){
                    if(Package[i].name=='草药'||Package[i].pastype=='药材'){
                        user.hp+=(skill.effect.hp+Package[i].effect.hp);
                        if(user.hp>user.proportyLimit.maxhp){
                            user.hp=user.proportyLimit.maxhp
                        }
                        Package.splice(i,1);
                        return console.logs(`使用了${skill.name}技能 消耗${Package[i].name}*1 +${skill.effect.hp}健康`);
                    }else if(i==Package.length-1){
                         console.logs(`巧医难为无材之作，背包中缺乏药材！`)
                    }
                }
            }else{return console.logs(`此技能/物品，不可使用`)}
        },
        showall(){
            this.showskills=[];
            var skills=user.skills.actives
            for(var i=0; i<skills.length;i++){
                for(let j=i;j<skills.length-1;j++){
                    if(skills[i].effect.cost>skills[i+1].effect.cost){
                        var temp=skills[i]
                        skills[i]=skills[i+1]
                        skills[i+1]=temp
                    }
                }
            }
            this.showskills.push(...user.skills.passives,...skills)
        }  
    },
    mounted(){
        this.showall()
    },

}
</script>


<style scoped>
.logo{
    position: absolute;
    top:1px;
    left: 0px;
    width: 36px;
    height: 24px;
    font-size: 20px;
    font-weight: bold;
    background:url('../../public/img/图标/竹简.jpg');
    }
span{width: 150px;
    text-align: left;
    margin-left: 4px;
    border: 2px solid balck;}
.title{
    margin-top: 10px;
    text-align: left;
    border-top: black solid 2px;
    border-bottom:  black solid 2px;
    background-color:rgba(248, 198, 136, 0.884);
}
#title{
    margin: 0;
    margin-left: 40px;
    
}
.list{
    width:100%;
    height:280px;
    overflow: scroll;
    overflow-x: hidden;
    border-bottom:  black solid 2px;
    border-top: black solid 2px;
}
.list ul{
    position: relative;
    left: 10%;
}
ul.active{
    width: 550px;
    background-color: #1dd3d3;
    
}
li{ cursor: pointer;
    text-align: left;}
.list::-webkit-scrollbar {
    width: 5px;
}
.list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#6d7f7a!important;;
        /* -webkit-box-shadow: inset 0 0 6px rgba(29, 211, 211, 1); */
}
.list::-webkit-scrollbar-thumb:window-inactive {
    background:#6d7f7a!important;
}
.button{
    margin-top:10px;
    text-align: left;
    margin-left:32%;
}
a,button:hover{
    cursor: pointer;
    background-color: blanchedalmond;
}
</style>