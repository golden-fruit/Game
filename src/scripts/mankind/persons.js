import {NormalAttack} from 'skills.js'

class Person{
    name=name;level=0;
    money=100;
    hp=100;ep=6;
    atk=10;def=10;
    constructor(){
        maxhp=100;
        maxep=10;
        epRestore=6
    }
    equipments = {
        headwear:null,
        weapon: null,
        armor: null
    }
    pack = {
        capacity: 20,
        packages: []
    }
    skills = {
        attack:NormalAttack,
        passiveSkills : [],
        activeSkills : [],
    }
    
    equip(equipment){
        var equipType
        if(equipment instanceof Weapon){
            equipType='weapon'
        }
        else if(equipment instanceof Amor){
            equipType='armor'
        }
        else{
            return console.log(`装备-位置错误`)  
        }
        this.equipments[equipType] = equipment;
        equipment.equipEffectFor(this);
    }
    unequip(equipType){
        if(equipType=='weapon'){
            this.equipments[equipType]=null
        }
        else if(equipType=='armor'){
            this.equipments[equipType]=null
        }
        else{
            return console.log(`装备-位置错误`)  
        }
    }
    attack(skill,target){
        return skill.effect(this,target)
    }
    useItem(consumable,target){
        return consumabel.use(this,target)
    }

    isdie(){
        if(this.hp<=0){
            this.hp=0;
            
            this.fakedie()
        }
    }
    static fakedie(){
        this.atk.stage=0;//effect 攻击状态
        this.move.stage=0;//行走状态
        this.packages.stage=0;
        if(this.dietimes>=3){
            this.death()
        }
        fakedie.stage=1;
    }
    static death(){
        this.atk.stage=0; 
        this.move.stage=0;
        this.packages.stage=1;
        this.ground.stage=1;
        death.stage=1
    }
    
}

class human extends person{
    
}

export {Person}