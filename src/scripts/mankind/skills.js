class Skills{
    constructor(name,description){
        this.name=name;
        this.type='';
        this.effect={};
        this.description=description;
        this.protype=`技能`;
        this.pastype='近道';
    }
    effects(user,target){
        if(this.type=='战斗技'){
            user.ep-=this.effect.cost ;
            var dmg=Math.floor(user.atk*this.effect.dmg*10/(10+target.def))
            console.logg(`使用${this.name} 耗费${this.effect.cost}精力 造成${dmg}伤害`)
            return target.hp-=dmg
        }else if(this.type=='阅历'&&this.iseffect==false){
            user.atk+=this.effect.atk
            user.def+=this.effect.def
            this.iseffect=true
            return console.logg(`阅历·${this.pastype}·${this.name}:攻击+${this.effect.atk} 防御+${this.effect.def}`)
        }else if(this.type=='医术'){
            user.hp+=this.effect.hp
            console.logg(`健康+${this.effect.hp}`)
        }
    }
}
class Actives extends Skills{
    constructor(name,dmg,cost,description){
        super(name,description)
        this.effect={dmg,cost}
        this.type='战斗技'
    }
}
class Passives extends Skills{
    constructor(name,atk,def,description,){
        super(name,description)
        this.effect={atk,def}
        this.type='阅历'
        this.iseffect=false
    }
}
class Restors extends Skills{
    constructor(name,hp,description,cost=3){
        super(name,description)
        this.type='医术'
        this.effect={hp,cost}
    }
}

class Kill extends Passives{
    constructor(name,atk,def,description,){
        super(name,atk,def,description,)
        this.pastype='杀人技'
    }
    limit(user){
        if(user.equipments.weapon.weapontype!=='剑'){
            this.iseffect=true
        }else{this.iseffect=false}
    }
}
class army extends Passives{
    constructor(name,atk,def,description,){
        super(name,atk,def,description,)
        this.pastype='军技'
    }
  
}

var Attack=new Actives('攻击',1,3,'中正平和的一击')
Attack.effects=function(user,target){
    var weapon=user.equipments.weapon
    if(weapon[0]){
        user.ep-=(weapon[0].effect.cost+1);
        var dmg=Math.floor(user.atk*weapon[0].dmg*10/(10+target.def))
        console.logg(`使用${weapon[0].name} 耗费${weapon[0].effect.cost+1}精力 造成${dmg}伤害`)
        return target.hp-=dmg
    }else{
        user.ep-=this.effect.cost ;
        var dmg=Math.floor(user.atk*this.effect.dmg*10/(10+target.def))
        console.logg(`使用拳头 耗费${this.effect.cost}精力 造成${dmg}伤害`)
        return target.hp-=dmg
    }
}
var rand=function(min,max){
    return Math.floor(Math.random()*(max-min+1))+min
}
var act0=new Actives('白虹贯日',2,3,`聂政之刺韩傀也,白虹贯日。`)
var act1=new Actives('彗星袭月',2,2,`夫专诸之刺王僚也，彗星袭月`)
act1.limit=function(user){
    if(user.equipments.weapon.swordtype=='短剑'){
        this.effect.dmg=3.5
    }else{this.effects.dmg=3}
}
var act2=new Actives('强折张缺',3,3,`4、太强必折，太张必缺。
——《六韬·武韬·三疑第十七》`)
var act3=new Actives(`崖山秋水`,4,4,`井蛙不可以语于海者，拘于虚也；夏虫不可以语于冰者，笃于时也；曲士不可以语于道者，束于教也。
《庄子·秋水》`)
var act4=new Actives('逍遥无极',6,6,`若夫乘天地之正，而御六气之辩，以游无穷者，彼且恶乎待哉？故曰：至人无己，神人无功，圣人无名。
——《庄子·逍遥游》`)
var act5=new Actives(`自相矛盾`,rand(2,5),rand(4,8),`“吾盾之坚，物莫能陷也。吾矛之利，于物莫不陷也。”`)
var act6=new Actives(`天降大任`,rand(0,10),rand(0,10),`先苦其心志，劳其筋骨，饿其体肤，空乏其身，乱其所为，所以动心忍性，增益其所不能。`)
var act7=new Actives('苍鹰击殿',6,8,`若士必怒,伏尸二人,血溅五步,天下缟素,今日是矣！`)
var act8=new Actives(`蛟分承影`,rand(6,12),10,`卫孔周其祖得殷帝之宝剑，一童子服之，却三军之众。三剑其一名承影，相传出炉时，“蛟分承影，雁落忘归”，故名承影。
——《列子·汤问篇》`)
var act9=new Actives(`无察含光`,rand(0,10),5,`孔周曰：‘吾有三剑，惟子所择。一曰含光，视不可见，运之不知其所触，泯然无际，经物而物不觉。’”
——《列子·汤问篇》`)
var act10=new Actives(`王取纯钧`,20,10,`观其纹，烂如列星之行；观其光，浑浑如水之溢于塘；观其断，岩岩如琐石；观其才，焕焕如冰释。`)

var pas0=new Passives('训练有素',2,2,`卷载:“休耕，战召，士伍也！”`)
var pas1=new Passives('唇枪舌剑',4,2,`吕不韦及其门客所编，囊括百家。史记春秋、士农工商、寓言时事、无所不包。可惜秦王不喜！`)
var pas2=new Passives('兵官之吏',3,5,`爵位至公士，可得人兵官之吏。`)
var pas3=new Passives('一鸣惊人',4,6,`王曰：‘三年不翅，将以长羽翼；不飞不鸣，将以观民则。虽无飞，飞必冲天；虽无鸣，鸣必惊人。’`)
var pas4=new Passives('安贫乐道',2,10,`孔子问荣启期之乐，对曰:“贫者士之常也，死者人之终也，处常得终，当何忧哉？”`)
var pas5=new Passives('一鼓作气',6,8,`“夫战，勇气也。一鼓作气，再而衰，三而竭。彼竭我盈，故克之。”
——《曹刿论战》`)
var pas6=new Passives('君命不受',12,4,`孙子兵法第八、第九:变，君命有所不受。——《孙子兵法·计篇》`)
var pas7=new Passives('用之必胜',14,6,`孙子曰:兵者，国之大事，死生之地，存亡之道，不可不察也。
——《孙子兵法·计篇》`)
var pas8=new Passives(`盗取天地`,0,20,`吾闻天有时，地有利，吾盗天地之时利,此所谓:盗取天地
——《列子·天瑞篇》`)
var pas9=new Passives(`列子学射`,20,5,`学射三载，知不知。退而习之三载，知其然，知其所以然。
——《列子·说符篇》`)

var kil0=new Kill('剑精通',5,5,`常年累月的出剑劈砍，终于对剑有所了解！`)
var kil1=new Kill('剑术大师',10,5,`在生与死的边缘，不断的出剑斩杀敌人，当他从战场活下来时，他已经是剑的一部分了。`)
var kil2=new Kill('武器大师',7,8,`刀枪剑戟，斧钺钩叉。上至铁器，下至棍棒，掌中所执即为刀兵。对各种武器都了如指掌。`)
var kil3=new Kill(`刻舟求剑`,2,15,`舟已行矣，而剑不行，求剑若此，不亦惑乎！
——《吕氏春秋·察今》`)
var arm0=new army('军技·招架精通',0,10,'未虑胜，先虑败。日出而操，日落而息。军训出操，苦练招架，战场保命全赖此技。')
var arm1=new army('军技·武器精通',5,5,`使用任何武器的威力增加。`)
var arm2=new army('龙韬·立将',5,5,`士未坐勿坐，士未食勿食，寒暑必同。
——《六韬·龙韬·立将》`)
var arm3=new army('龙韬·将威',10,2,`杀一人而三军震者，杀之；赏一人而万人说者，赏之。
——《六韬·龙韬·将威》`)

var res0=new Restors('粗浅岐黄',15,'看过几本医书，不过是对书行药')
var res1=new Restors('岐黄之术',20,`“黄帝常与岐伯、雷公等臣子坐而论道，医道赖之成，故有岐黄之术传世！”`)
var res2=new Restors('药理调和',40,`面青目赤，面赤目白，面青目黑，面黑目白，面赤目青，皆死也。——《黄帝内经·素问》`)
var res3=new Restors('医道圣手',60,`“身负青囊走南北，悬壶济世传佳话，时人击节赞！”`)
var res4=new Restors('扁鹊',100,`生死人，肉白骨，妙手回春！`)

var act=[act0,act1,act2,act3,act4,act5,act6,act7,act8,act9,act10]
var pas=[pas0,pas1,pas2,pas3,pas4,pas5,pas6,pas7,pas8,pas9,]
var kil=[kil0,kil1,kil2,kil3,]
var arms=[arm0,arm1,arm2,arm3]
var res=[res0,res1,res2,res3,res4]


export {Attack,act,pas,res,kil,arms}