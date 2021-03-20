import {enemylevel } from "../public";

class Equipments{
    constructor(name,description,quality,type,atk=0,def=0,cost){
        this.name=name
        this.type=type
        this.quality=quality
        this.effect={atk,def,cost}
        this.description=description
        this.protype=`装备`;
    }
}
class zero extends Equipments{
    constructor(name,atk,description){
        super(name,atk,description)
        this.quality='名匠造就'
    }
}
class one extends Equipments{
    constructor(name,atk,description){
        super(name,atk,description)
        this.quality='当世佳作'
    }
}
class two extends Equipments{
    constructor(name,atk,description){
        super(name,atk,description)
        this.quality='当世名武'
    }
}
var rand=function(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
}
var quality,number
if(enemylevel[0]>18){
    quality=two
}else if(enemylevel[0]>15){
    quality=one
}else if(enemylevel[0]>12){
    quality=zero
}else{quality=Equipments}
class  Weapon extends quality{
    constructor(name,atk,description){
        super(name,description)
        this.effect={atk}
        this.type='武器'
    }
}
class Armor extends Equipments{
    constructor(name,def,description){
        super(name,description)
        this.effect={def,cost:1}
        this.type='甲具'
    } 
}

class Swords extends Weapon{
    constructor(name,atk,description){
        super(name,atk,description)
        this.weapontype='剑'
    }
}

class Light extends Swords{
    constructor(name,atk,description,quality){
        super(name,atk,description)
        this.effect={atk,cost:1}
        this.swordtype='轻剑'
        this.dmg=1.2
        this.quality=quality
      
    }
}
class Middle extends Swords{
    constructor(name,atk,description,quality){
        super(name,atk,description)
        this.effect={atk,cost:2}
        this.swordtype='中剑'
        this.dmg=1.4
        this.quality=quality
       
    }
}
class Weight extends Swords{
    constructor(name,atk,description,quality){
        super(name,atk,description)
        this.effect={atk,cost:3}
        this.swordtype='重剑'
        this.dmg=1.6
        this.quality=quality
      
    }
}
var name=[`破损`,`普通`,`精良`,`优秀`]
if(enemylevel[0]<=2){number=0}
else if(enemylevel[0]<=7){ number=1}
else if(enemylevel[0]<=10){number=2}
else if(enemylevel[0]<=13){number=3}

var enemy={name:name[number]}

var lige=new Light('短剑',5,'白虹贯日，彗星袭月')
var mide=new Middle('轻剑',10,'紫电青霜，迅如光影。')
var weie=new Weight('重剑',15,'重剑无锋，大巧不工')
var weapon=[lige,mide,weie]
for(let item of weapon){
    if(item.quality=='当世名武'){
        if(item.swordtype=='轻剑'){
            item.effect.atk=rand(15,20)
            item.name=`军制·短剑`
        }else if(item.swordtype=='中剑'){
            item.effect.atk=rand(20,30)
            item.name=`军制·长剑`
        }else {
            item.effect.atk=rand(30,40)
            item.name=`军制·重剑`
        }
    }else if(item.quality=='当世佳作'){
        if(item.swordtype=='轻剑'){
            item.effect.atk=rand(10,15)
            item.name=`军制·短剑`
        }else if(item.swordtype=='中剑'){
            item.effect.atk=rand(15,20)
            item.name=`军制·长剑`
        }else {
            item.effect.atk=rand(20,30)
            item.name=`军制·重剑`
        }
    }else if(item.quality=='名匠造就'){
            if(item.swordtype=='轻剑'){
            item.effect.atk=rand(5,10)
            item.name=`军制·短剑`
        }else if(item.swordtype=='中剑'){
            item.effect.atk=rand(10,15)
            item.name=`军制·长剑`
        }else {
            item.effect.atk=rand(15,20)
            item.name=`军制·重剑`
        }
    }else{  
        if(item.swordtype=='轻剑'){
            if(number==0){
                item.effect.atk=rand(1,3)
            }else if(number==1){
                item.effect.atk=rand(2,5)
            }else if (number==2){
                item.effect.atk=rand(3,7)
            }else if (number==3){
                item.effect.atk=rand(4,10)
            }
            item.name=`${enemy.name}的短剑`
            item.description=`${enemy.name}的随身佩剑`
            item.quality=enemy.name
        }else if(item.swordtype=='中剑'){
            if(number==0){
                item.effect.atk=rand(4,6)
            }else if(number==1){
                item.effect.atk=rand(5,8)
            }else if (number==2){
                item.effect.atk=rand(6,10)
            }else if (number==3){
                item.effect.atk=rand(7,13)
            }
            item.effect.atk=rand(5,10)
            item.name=`${enemy.name}的长剑`
            item.description=`${enemy.name}的随身佩剑`
            item.quality=enemy.name
        }else {
            if(number==0){
                item.effect.atk=rand(7,9)
            }else if(number==1){
                item.effect.atk=rand(8,11)
            }else if (number==2){
                item.effect.atk=rand(9,13)
            }else if (number==3){
                item.effect.atk=rand(10,18)
            }
            item.name=`${enemy.name}的重剑`
            item.description=`${enemy.name}的随身佩剑`
            item.quality=enemy.name
        }
    }
}
export {weapon,Swords,Armor}

