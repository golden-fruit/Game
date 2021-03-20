<template >
    <div style="overflow-x:hidden;" id="bags">
        <div>
            <div id="title">
                <h2 id="got">包裹</h2>
            </div>
            <div id="list" style="background-image: URL(img/0.jpg);">
                <ul v-for="(item,index) in showpackage" :key="index"
                    @click="choose(index)"
                    :class="{active: index == current && current!==''}">
                    <a class="logo" v-if="user.equipments.weapon?(user.equipments.weapon.name==item.name?index==0||index==1:false):false">⚔</a>
                    <a class="logo" v-if="user.equipments.armor?(user.equipments.armor.name==item.name?index==0||index==1:false):false">🛡</a>
                    <li title="战利品"> <b>{{item.type}}</b> : {{ item.name }} 
                        <span v-if="item.type=='消耗品'?true:false"><b>效果:</b> 恢复{{ item.effect.hp }}健康 </span>
                        <span v-if="item.protype=='装备'?true:false"><b>品质:</b> {{ item.quality }} </span>
                         <span v-if="item.type=='竹简'?true:false"> <span v-if="item.record">记载前人的智慧</span><span v-if="!item.record">已被人观看过</span> </span>

                    </li>
                </ul>
            </div>
        </div>

        <div id="bagbutton">
             —
            <button @click="useitem()">使用</button>
            <button @click="showdetail()">查看</button>
            —
            <button @click="showitem()">所有物品</button>
            <button @click="showsumable()">消耗品</button>
            <button @click="showweapons()">装备</button>
            <button @click="showbooks()">竹简</button>
            <button @click="showspecials()">特殊</button>
           —
            <button @click="abandon()">丢弃</button>
             —
        </div>

        <div>
            <h4>附近地面</h4>
            <div class="ground" style="overflow:-Scroll;overflow:hidden;">
                <ul v-for="(item,index) in groundshow"  
                    :key="index"
                    @click="getnumber(index)"
                    :class="{active: index == discard && discard!==''}">
                    <li> {{item.type}}·{{ item.name }}</li>
                </ul>
            </div>
        </div>
        
    </div>
</template>
<script>
import {user,Package, ground,atkname} from '../scripts/public.js'
export default {
    name: 'packshow',
    data(){
        return{
            current:'',
            discard:'',
            user:user,
            Package:Package,
            showpackage:[],
            ground:ground,
            isbag:true,
            groundshow:[],
            atkname:atkname,
        }
    },
    methods:{
        choose(index){
            this.current= index;
            this.discard='';
            this.isbag=true
           
        },
        getnumber(index){
            this.discard=index;
            this.current='';
            this.isbag=false
        },
        useitem(){
            if (atkname[0] != user.name) {
                return console.logs(`敌人的回合！`);
            }
            if(this.current==this.showpackage.length){this.current=''}
            if(this.current===''){return}
            var useItem=this.showpackage[this.current];
             if(useItem.type=='竹简'){
                if(useItem.record==null){return console.logs(`简册所记载文字，已经残缺不全！`)}
                var sitem=useItem.record
                var passives=user.skills.passives
                var actives=user.skills.actives
                for(let i in passives){
                     if(passives[i].name==sitem.name){
                         passives.splice(i,1)
                     }
                }for(let i in actives){
                    if(actives[i].name==sitem.name){
                        actives.splice(i,1)
                    }
                }
                if(sitem.type=='阅历'){
                    user.skills.passives.push(sitem)
                    console.logs(useItem.description)
                    console.logs(`${user.name}仔细研读${useItem.name},已习得${sitem.name}`)
                    
                }else if(sitem.type=='战斗技'||sitem.type=='医术'){
                    user.skills.actives.push(sitem)
                    console.logs(useItem.description)
                    console.logs(`${user.name}仔细研读${useItem.name},已习得${sitem.name}`)
                     
                }delete useItem.record
                for(let item of Package){
                    if(item.name==useItem.name){delete item.record;break}
                }
            }else if(useItem.type=='消耗品'){
                 for(let i in this.Package){
                    if(this.Package[i]==useItem){
                        this.Package.splice(i,1);     
                        console.logs(`使用了:${useItem.name}`);
                        break;
                    }
                }
                this.user.hp+=useItem.effect.hp;
                console.logs(`+${useItem.effect.hp}健康`)
                if(this.user.hp>this.user.proportyLimit.maxhp){
                    this.user.hp=this.user.proportyLimit.maxhp
                }
                this.showpackage.splice(this.current,1);
            }
            else{console.logs('非消耗品，不可使用！')}
        },
        showitem(){
            this.showpackage=[];
            this.showpackage.push(...this.Package)
        },
        showsumable(){
            this.showpackage=[];
            for(let i in this.Package){
               if(this.Package[i].type=='消耗品'){
                this.showpackage.push(this.Package[i])
               }
           }
            var skills=this.showpackage
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
        showweapons(){
            this.showpackage=[];
            for(let i in this.Package){
                if(this.Package[i].protype=='装备'){
                this.showpackage.push(this.Package[i])
               }
           }
        },
        showbooks(){
            this.showpackage=[];
            for(let i in this.Package){
                if(this.Package[i].type=='竹简'){
                this.showpackage.push(this.Package[i])
               }
           }
        },
        showspecials(){
            this.showpackage=[];
            for(let i in this.Package){
                if(this.Package[i].type=='特殊物品'){
                this.showpackage.push(this.Package[i])
               }
           }
        },
        abandon(){
            if(this.current==this.showpackage.length){
                this.current=''}
            if(this.current===''){return}
            
            var abandonItem=this.showpackage[this.current];
            for(let i in this.Package){
                if(abandonItem.type=='特殊物品'||abandonItem.type=='竹简'){return console.logs("特殊物品不可丢弃！！")} 
                else{
                    if(this.Package[i]==abandonItem){
                    this.Package.splice(i,1);      //删除实际物品
                    console.logs(`丢弃了:${abandonItem.name}`)
                    break;
                    }
                }
            }
            this.ground.push(abandonItem);       //物品丢弃
            this.showground()
            this.showpackage.splice(this.current,1);   //删除视觉物品 。
        },
        showground(){
            this.groundshow=[],
            this.groundshow.push(...this.ground);
            this.groundshow.reverse();
        },
        showdetail(){
            if(this.current===''){return}
            if(this.isbag){
                console.logs( this.showpackage[this.current].description ) 
            }else{
                console.log(this,groundshow,discard)
                console.logs( this.groundshow[this.discard].description )
            }
               
        }
    },
    mounted:function(){
        this.showground();
        this.showitem();
    },
}    
</script>
<style scoped>
.logo{
    position: absolute;
    top:-4px;
    left: 12px;
    width: 20px;
    font-size: 20px;
    font-weight: bold;
    background-color: coral;
    border: black 2px solid
    }
h4{margin: 0;
    margin-top:20px;
    margin-bottom: 5px;
    margin-left: 40px;
    text-align: left;
}
#title{
    text-align: left;
    margin-top: 10px;
    border-top:black solid 2px; 
    border-bottom:black solid 2px; 
    /*background-color:bisque*/
    background-color:rgba(248, 198, 136, 0.884)
}
#got{margin: 0;
    margin-left: 40px;}
#list{
    border-top:  black solid 2px;
    border-bottom:black solid 2px; 
    width:100%;overflow-x:hidden;
    height:280px;}
#list ul{
    position: relative;
    left: 10%;
}
#bags ul.active{
    background-color: #1dd3d3;
    width: 550px
}
#list li{ cursor: pointer;
    text-align: left;}

a,button:hover{
    background-color: blanchedalmond;
    cursor: pointer;
}
#bagbutton{
    margin-top: 10px;
  position: relative;
    left: 10%;
}

#list::-webkit-scrollbar {
    width: 5px;
}
    /* 滚动条滑块 */
#list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background:#6d7f7a!important;;
    /* -webkit-box-shadow: inset 0 0 6px rgba(29, 211, 211, 1); */
}
#list::-webkit-scrollbar-thumb:window-inactive {
    background:#6d7f7a!important;
}
.ground{
    border-top: black 2px solid;
    border-bottom: black 2px solid;
    margin: 0;
    margin-left:30px;
    line-height: 2px;
    width:100%;
    height: 80px;
}
.ground ul{
    width: 150px;
    text-align: left;
    }
</style>