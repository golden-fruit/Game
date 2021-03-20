<template>
    <div style="overflow-x:hidden;" id="weapon">
        <div>
            <div class="title">
                <h2 id="title">装备</h2>
            </div>
            <div class="list" style="background-image: URL(img/0.jpg);">
                <ul v-for="(item,index) in showequip"
                    :key="index"
                    @click="chose(index)"
                    :class="{active: index==current && current!==''}">
                    <a class="logo" v-if="user.equipments.weapon?(user.equipments.weapon.name==item.name?index==0||index==1:false):false">⚔</a>
                    <a class="logo" v-if="user.equipments.armor?(user.equipments.armor.name==item.name?index==0||index==1:false):false">🛡</a>
                    <li><span><b>名称:</b>{{item.name}} </span>
                        <span><b>类型:</b>{{ item.type}} </span>
                        <span> 
                        <span v-if="item.type=='武器'?true:false"><b>武器类型:</b>{{ item.weapontype}}-{{item.swordtype}}  <b>锋锐度:</b>{{item.dmg}} <b>属性:</b>攻击:+{{item.effect.atk}}<b>🗡</b> 精力恢复:-{{ item.effect.cost }}</span>
                        <span v-if="item.type=='甲具'?true:false"><b>甲具类型:</b>{{ item.armortype}}  <b>防御性:</b>{{item.add}} <b>属性:</b>防御:+{{item.effect.def}}<b>👘</b> 精力上限:-{{ item.effect.cost }}</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="button">
                 —
                <button @click="equipted()">装备</button>
                <button @click="unequipt()">卸载</button>
                <button @click="showdetail()">查看</button>
                —
                <button @click='showitem()'>所有</button>
                <button @click="equip()">武器</button>
                <button @click='armor()'>甲具</button>
                —
            </div>
        </div>
    </div>
</template>

<script type='text/javascript'>
import {Package,user, isfight,atkname} from '../scripts/public.js'
export default {
    name:'equipments',
    data(){
        return{
           current:'',
           showequip:[],
           user:user,
           stage:'',
           isfight:isfight,
           atkname:atkname,
        }
    },
    methods:{
        showdetail(){
            if(this.current===''){return}
            console.logs( this.showequip[this.current].description ) 
        },
        chose(index){
            this.current=index;
        },
        equipted(){           //重新添加item到数组的头部
            if (atkname[0] != user.name) {
                return console.logs(`敌人的回合！`);
            }
            if(this.current===''){return}
            if(this.current==this.showequip.length){return current==''}
            if(isfight[0]==1){user.ep-=2;console.logs(`${user.name}临阵换装，消耗了 2精力`)}

            var item=this.showequip[this.current];
            if(user.equipments.armor==null && item.type=='甲具'){
                for(let i in Package){
                    if(Package[i]==item){
                        Package.splice(i,1);
                        Package.splice(0,0,item);
                        break
                    }
                }
                user.def+=item.effect.def
                user.proportyLimit.maxep-=item.effect.cost
                user.equipments.armor=item
                this.showequip.splice(this.current,1)
                this.showequip.splice(0,0,item)
                this.current=0
                console.logs(`装备-${item.name}防御:+${item.effect.def}`)
            }else if (user.equipments.weapon==null && (item.type=='传世名武'||item.type=='武器')){
                for(let i in Package){
                    if(Package[i]==item){
                        Package.splice(i,1);
                        Package.splice(0,0,item);
                        break
                    }
                }
                user.atk+=item.effect.atk;
                user.proportyLimit.restore-=item.effect.cost
                user.equipments.weapon=item;
                this.showequip.splice(this.current,1)
                this.showequip.splice(0,0,item)
                this.current=0
                console.logs(`装备-${item.name}攻击:+${item.effect.atk}`)
            }else{return console.logs(`请先卸载`)}
            
        },
        unequipt(){
            if (atkname[0] != user.name) {
                return console.logs(`敌人的回合！`);
            }
            if(this.current===''){return}
            if(this.current==this.showequip.length){this.current==''}
            var item=this.showequip[this.current];
            if(user.equipments.armor!=null && item.type=='甲具'){
                if(user.equipments.armor.name=item.name){
                    user.def-=item.effect.def
                    user.proportyLimit.maxep+=item.effect.cost
                    user.equipments.armor=null
                    console.logs(`卸载——${item.name}`)
                }
            }else if(user.equipments.weapon!=null && (item.type=='传世名武'||item.type=='武器')){
                if(user.equipments.weapon.name=item.name){
                    user.atk-=item.effect.atk;
                    user.proportyLimit.restore+=item.effect.cost
                    user.equipments.weapon=null
                    console.logs(`卸载——${item.name}`)
                }
            }else{return console.logs(`未装备${item.name}`)}
        },
        showitem(){
            this.showequip=[];
            for( let item of Package){
                if(item.protype=='装备'){
                    this.showequip.push(item)
                }
            }
        },
        equip(){
            this.showequip=[];
            for(let item of Package){
                if(item.type=='武器'){
                    this.showequip.push(item);
                }
            }
        },
        armor(){
            this.showequip=[];
            for(let item of Package){
                if(item.type=='甲具'){
                    this.showequip.push(item);
                }
            }
        },
    },
    mounted(){
        this.showitem();
    },watch:{
    }
}
</script>
<style scoped>
.logo{
    position: absolute;
    top:-4px;
    left: 15px;
    width: 20px;
    font-size: 20px;
    font-weight: bold;
    background-color: coral;
    border: black 2px solid
    }
#weapon .list span{width:0px;
    text-align: left;
    margin-left: 4px;}
#weapon .title{
    border-bottom:  black solid 2px;
    border-top: black solid 2px;
    margin-top: 10px;
    text-align: left;
    background-color:rgba(248, 198, 136, 0.884);
}
#title{
    margin: 0;
    margin-left: 40px;
}
#weapon .list{
    width:100%;
    height:280px;
    border-bottom:  black solid 2px;
    border-top: black solid 2px;
    overflow-x:hidden; }
#weapon .list ul{
    position: relative;
    left: 10%;
}
#weapon ul.active{
    background-color: #1dd3d3;
    width: 600px;
}
#weapon li{ cursor: pointer;
    text-align: left;}
.list::-webkit-scrollbar {
    width: 5px;
}
    /* 滚动条滑块 */
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
    background-color: blanchedalmond;
    cursor: pointer;
}
</style>