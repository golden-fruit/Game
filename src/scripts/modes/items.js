import {act,pas,res} from '../mankind/skills.js'
class Items{
    constructor(name,description,type,money){
        this.name=name;
        this.type=type;
        this.money=money
        this.description=description;
        this.protype='物品'
    }
}
class Books extends Items{
    constructor(name,record,description){
        super(name,description)
        this.type='竹简'
        this.record=record
    }
}
class Consumes extends Items{
    constructor(name,hp,money,description,pastype){
        super(name,description,money)
        this.type='消耗品'
        this.money=money
        this.effect={hp}
        this.pastype=pastype
    }
}
class Special extends Items{
    constructor(name,description){
        super(name,description)
        this.type='特殊'
    }
}

var con0=new Consumes('草药',10,60,`随处可见的草药，有一定的毒副作用！`,`药材`,)
var con1=new Consumes('药材',15,80,`巫医可以辨识之，方士亦可，善岐黄之术者可以用之救人。`,`药材`)
var con2=new Consumes('汤药',30,100,`服用方便，疗效好，降低了药物的毒副作用。`,`药材`)
var con3=new Consumes(`药酒`,50,200,`通血脉、行药势，酒为百药之长。`,`药材`)

var con4=new Consumes(`鱼腥草`,10,40,`食之可果腹!`,`食物`)
var con5=new Consumes(`干粮`,20,80,`“汝欲远行，当备干粮”`,`食物`)
var con6=new Consumes(`酒`,50,150,`“天宫里的千年果，比不上把酒狂歌。”“喝彩痛饮心如火，千杯美酒不嫌多。”`,`食物`)
var con7=new Consumes(`咸鱼`,30,100,`用粗盐腌制的鱼，风味独特，可以下酒。`,`食物`)
var con8=new Consumes(`肉干`,40,120,`不知是什么肉腌制的肉干，但是美味无比！`,`食物`)

var rand=function(num1,num2,p){
    if(Math.random()>p){
        return num1
        }else{return num2}
}

var bok0=new Books('《战国策》',act[rand(0,1,0.4)],`以六种记录纵横家的文本修改整合而来，书所记录的多是东周后期时诸国混战，纵横家为其所辅之国的政治主张和外交策略。`)
var bok1=new Books('《六韬》',act[2],`欲知兵法，必读太公六韬，六韬乃兵法权谋之道始祖。`)
var bok2=new Books('《庄子》',act[rand(3,4,0.2)],`庄子的内心世界：奇幻，巧妙，多彩的世界和意境。其文笔汪洋恣肆，浪漫潇洒，
瑰丽诡谲，意出尘外，乃先秦诸子文章的典范之作。庄子之语看似夸言万里，想象漫无边际，然皆有根基，重于史料议理。
鲁迅先生说：“其文则汪洋辟阖，仪态万方，晚周诸子之作，莫能先也。”被誉为“钳揵九流，括囊百氏”`)
var bok3=new Books('《韩非子》',act[5],`《韩非子》是法家学派的代表著作，共二十卷。
韩非（约公元前280～233年），战国时期韩国人，为韩国公子，与李斯同学于荀子，喜好刑名法术之学，为法家学派代表人物。`)
var bok4=new Books(`《孟子》`,act[6],`人恒过，然后能改；困于心，衡于虑，而后作；征于色，发于声，而后喻。入则无法家拂士，出则无敌国外患者，国恒亡。
然后知生于忧患，而死于安乐也。`)
var bok5=new Books(`《史记·刺客列传》`,act[7],`太史公记载的关于历史上四大刺客的故事。`)
var bok6=new Books('《列子·汤问篇》',act[rand(8,9,0.2)],`列子，名御寇，先庄子，庄子称之。先秦天下十豪之一，道学者。`)
var bok7=new Books('《越绝书》',act[10],`以春秋末年至战国初期吴越争霸的历史事实为主干，
上溯夏禹，下迄两汉，旁及诸侯列国，对这一历史时期吴越地区的民族政治、经济、军事、天文、地理、历法、语言等多有所涉及，被誉为“地方志鼻祖”。`)

var bok8=new Books('《吕氏春秋》',pas[1],`吕不韦及其门客所编，囊括百家。史记春秋、士农工商、寓言时事、无所不包！`)
var bok9=new Books('《商君书》',pas[rand(0,2,0.4)],`四境之内，丈夫女子皆有名于上，生者著，死者削。——商君书·境内篇`)
var bok10=new Books('《一鸣惊人》',pas[3],`楚庄王莅政三年，无令发，无政为也。右司马御座，而与王隐
曰‘有鸟止南方之阜（土山），三年不翅，不飞不鸣，嘿然无声，此为何名？’
王曰：‘三年不翅，将以长羽翼；不飞不鸣，将以观民则。虽无飞，飞必冲天；虽无鸣，鸣必惊人。’`)
var bok11=new Books(`《安贫乐道》`,pas[4],`吾乐甚多：天生万物，唯人为贵；而吾得为人，是一乐也。男女之别，男尊女卑，故以男为贵；吾既得为男矣，是二乐也。人生有不见日月、不免襁褓者，吾既已行年九十矣，是三乐也。`)
var bok12=new Books('《左传》',pas[5],`春秋末年鲁国左丘明为《春秋》注解的一部史书，与《公羊传》、《谷梁传》合称“春秋三传”。`)
// var bok3=new Books('《晏子春秋》',,`记载春秋时期（公元前770年～公元前476年）齐国政治家晏婴言行的一部历史典籍，用史料和民间传说汇编而成
// ——“ 圣人非所与熙也，寡人反取病焉。”`)
var bok13=new Books('《孙子兵法》',pas[rand(6,7,0.3)],`第一，始计，知己知彼。
第二，作战，兵贵神速。
第三，谋攻，不战而屈人之兵，善之善者也。
第四，形，先为不可胜，以待敌之可胜。
第五，势，出奇制胜。
第六，虚实，避实击虚。
第七，军争，以迂为直。`)
var bok14=new Books('《列子·天瑞篇》',pas[rand(8,9,0.2)],`列子，名御寇，先庄子，庄子称之。先秦天下十豪之一，道学者。`)

var bok15=new Books(`五十二病方`,res[0],`记载有常见的疾病及其病方和各种草药，其病方凡五十二种。善识草药者，可依方下药。`)
var bok16=new Books(`《黄帝内经·灵枢》`,res[1],` 诸阳之会，皆在于面。徐而疾则实，疾而徐则虚。——《素问·针解篇》`)
var bok17=new Books(`《黄帝内经·素问》`,res[2],`“余闻上古之人，春秋皆度百岁，而动作不衰；今时之人，年半百而动作皆衰者，时世异耶？人将失之耶？”——《黄帝内经·素问》`)
var bok18=new Books(`《黄帝八十一难经》`,res[3],`秦越人（扁鹊）所著。《难经》之“难”字，有“问难”或“疑难”之义。全书共八十一难，采用问答方式，一一解答。`)
var bok19=new Books(`《扁鹊医书》`,res[4],`扁鹊本是黄帝时人,后春秋时有善医术者，人尽称之，故冠以扁鹊之称号。着有《内经》和《外经》，发明了四诊法（即望、闻、问、切）。`)



var spc0=new Special('随侯珠',`“径盈寸，纯白而夜光，可以烛室”
“随侯之珠，卞和之璧，得之者富，失之者贫”
“皆至宝也，故随和并称。”`)
var spc1=new Special('和氏璧',`秦李斯《谏逐客书》言:“今陛下致昆山之玉，有随、和之宝。”`)
var spc2=new Special('验',`“验”：“南郡、安陆县、云梦乡、夕阳里人，名黑夫，家中第二子，是士伍，高七尺五寸。”`)
var spc3=new Special('传',`“传”：“今有：云梦乡、夕阳里士伍，名黑夫，往县城服更役，沿途不可阻拦。”`)
var spc4=new Special('',``)
var spc5=new Special('',``)

var con=[con0,con1,con2,con3,con4,con5,con6,con7,con8,] 
var bok=[bok0,bok1,bok2,bok3,bok4,bok5,bok6,bok7,bok8,bok9,bok10,bok11,bok12,bok13,bok14,bok15,bok16,bok17,bok18,bok19,] 
var spc=[spc0,spc1,spc2,spc3,spc4,spc5]

var items={con,bok,spc}

export {items}