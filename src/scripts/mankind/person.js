import {honors,headwears,} from '../public.js'
import {Attack,} from './skills.js'
class Person{
    constructor(name,level,money,description,...items){
        this.name=name;
        this.money=money
        this.level=level;
        this.honor=honors[level];
        this.description=description
        this.headwear=headwears[level];
        this.pack=[...items]
        this.protype=`人物`
    }
    hp=100;
    maxep=this.rand(8,12)
    restore=this.rand(5,7)
    ep=this.rand(4,8);
    atk=this.rand(5,15);
    def=this.rand(5,15);
    ph=this.rand(0,7)
    equipments={weapon:[],armor:null};
    skills={attack:Attack,passives:[],actives:[]};
    rand(min,max){
        return Math.floor(Math.random()*(max-min+1))+min
    }
    equipment(){
        for(let item of this.pack){
            if(item.type=='甲具'){
                this.def+=item.effect.def
                this.maxep-=item.effect.cost
                this.equipments.armor=item
                console.logg( this.name+'精力上限:'+this.maxep)
            }else if(item.type=='武器'){
                this.atk+=item.effect.atk
                this.restore-=item.effect.cost
                this.equipments.weapon.push(item)
                console.logg( this.name+'精力恢复:'+this.restore+'/回合')
            }
        }setTimeout(()=>{console.logg(`${this.name} 武器甲具已装备`)},400) 
    }
    effect(user){
        for(let item of this.pack){
            if(item.type=='竹简'){
                var sitem=item.record
                if(sitem.type=='阅历'){
                    this.skills.passives.push(sitem)
                }else if(sitem.type=='战斗技'||sitem.type=='医术'){
                    this.skills.actives.push(sitem)
                }
            }
        }
        
            if(this.skills.passives.length!=0){
                console.logg(`${this.name} 被动技能:`)
                for(let skill of this.skills.passives){
                   skill.effects(user)
                }
            } for(let i in headwears){
                if(i<=user.level){
                    user.def+=headwears[i].effect.def
                    user.atk+=headwears[i].effect.atk
                }
            }
    }
}

export {Person}