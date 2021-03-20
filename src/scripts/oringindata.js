import {Attack,act,pas,res} from './mankind/skills.js'
import{armors,weapons} from './modes/equipments.js'
var Package0=[
    {type:'特殊物品',name:'随侯珠',description:`“径盈寸，纯白而夜光，可以烛室”“随侯之珠，卞和之璧，得之者富，失之者贫”“皆至宝也，故随和并称。”`},
    {type:'竹简',name:'《孙子兵法》', description:`兵者，国之大事,死生之地,存亡之道,不可不察！`},
    {type:'竹简',name:'《吕氏春秋》',description:`吕不韦及其门客所编，囊括百家。史记春秋、士农工商、寓言时事、无所不包。可惜秦王不喜！`},
]
var honors=['士伍','上造','公士','鸟簪','不更','大夫','官大夫','公大夫','公乘','五大夫','左庶长',
'右庶长','左更','中更','右更','少上造','大良造','驷车庶长','大庶长','关内侯','彻侯'
]
var box0=[ 
armors[0][Math.floor(Math.random()*2)],weapons[Math.floor(Math.random()*2)][Math.floor(Math.random()*4)],
{type:'消耗品',name:'草药',effect:{hp:10},description:'随处可见的草药，有一定的毒副作用！',pastype:'药材'},
{type:'消耗品',name:'草药',effect:{hp:10},description:'随处可见的草药，有一定的毒副作用！',pastype:'药材'},
{type:'消耗品',name:'草药',effect:{hp:10},description:'随处可见的草药，有一定的毒副作用！',pastype:'药材'},
{type:'消耗品',name:'汤药',effect:{hp:30},description:'服用方便，疗效好，降低了药物的毒副作用',pastype:'药材'},
{type:'消耗品',name:'干粮',effect:{hp:20},description:'“汝欲远行，当备干粮”',pastype:'食物'},
]
var storage0=[{type:'特殊物品',name:'验',description:'“验”:“南郡、安陆县、云梦乡、夕阳里人，名黑夫，家中第二子，是士伍，高七尺五寸。”'},
{type:'特殊物品',name:'传',description:'“传”:“今有：云梦乡、夕阳里士伍，名黑夫，往县城服更役，沿途不可阻拦。”'},]
var headwears=[
    {name:'头巾',effect:{def:2,atk:0},iseffect:''},
    {name:'黑色头巾',effect:{def:3,atk:1},description:'减少少许被攻击的可能',iseffect:''},
    {name:'褐色头巾',effect:{def:4,atk:2},description:'减少少许被攻击的可能',iseffect:''},
    {name:'蓝色头巾',effect:{def:5,atk:3},description:'减少少许被攻击的可能',iseffect:''},

    {name:'木簪',effect:{def:8,atk:4},description:'身份的证明',iseffect:''},
    {name:'骨簪',effect:{def:10,atk:5},description:'身份的证明',iseffect:''},
    {name:'铜簪',effect:{def:12,atk:6},description:'身份的证明',iseffect:''},
    {name:'玉簪',effect:{def:14,atk:7},description:'身份的证明',iseffect:''},
    {name:'弁',effect:{def:17,atk:9},description:'圆形小帽，骑兵战士所着',iseffect:''},

    {name:'发髻',effect:{def:20,atk:11},description:'底层军吏，身份的证明',iseffect:''},
    {name:'木冠',effect:{def:23,atk:13},description:'下级军吏',iseffect:''},
    {name:'长冠',effect:{def:26,atk:15},description:'中下级军官',iseffect:''},
    {name:'双版长冠',effect:{def:29,atk:17},description:'中上级军官',iseffect:''},
    {name:'深紫色鹖冠',effect:{def:34,atk:20},description:'秦代将军独有',iseffect:''},
    
    {name:'玉冠',effect:{def:38,atk:23},description:'加爵当进冠',iseffect:''},
    {name:'武冠',effect:{def:42,atk:26},description:'位高权重，入宫参政，不可免冠',iseffect:''},
    {name:'法冠',effect:{def:46,atk:29},description:'官员头戴冠，身穿宽袍大袖，腰配书刀，手执笏板，耳簪白笔。',iseffect:''},
    {name:'袍服',effect:{def:50,atk:32},description:'位高权重，入宫参政，不可免冠',iseffect:''},
    {name:'佩绶',effect:{def:54,atk:35},description:'秦始皇常戴通天冠，废周代六冕之制，只着“玄衣裳”，百官戴法冠和武冠，穿袍服，佩绶。',iseffect:''},

    {name:'通天冠',effect:{def:55,atk:40},description:'秦始皇常戴通天冠。',iseffect:''},
    {name:'玄衣裳',effect:{def:60,atk:50},description:'秦始皇常着玄衣袍。',iseffect:''},
]
var ground0=[{type:'石头',name:'地面',description:'质地坚硬，良好地材'}]
var position0={x:1100,y:2700}
var user0={
    killnum:9,
    money:100,
    exp:0,
    proportyLimit:{maxhp:100,maxep:10,restore:6,maxleveln:20,},
    name:'黑夫',
    level:0,
    hp:50,
    ep:6,
    atk:10,
    def:10,
    yan:storage0[0],
    zhuan:storage0[1],
    skills:{
        attack:Attack,
        passives:[pas[1]],
        actives:[act[0],res[0],res[1]]
    },
    equipments : {
        headwear:headwears,
        weapon: null,
        armor: null
    }
}
var human=[`商鞅（约公元前395年－公元前338年），姬姓，公孙氏，名鞅，卫国人。
战国时期政治家、改革家、思想家，法家代表人物，卫国国君后代。商鞅辅佐秦孝公，
积极实行变法，使秦国成为富裕强大的国家，史称“商鞅变法”。政治上，改革了秦国户籍、
军功爵位、土地制度、行政区划、税收、度量衡以及民风民俗，并制定了严酷的法律；
经济上，主张重农抑商、奖励耕战；军事上，统率秦军收复了河西之地，赐予商于十五邑，
号为商君，史称为商鞅。公元前338年，秦孝公逝世后，商鞅被公子虔指为谋反，战败死于彤地，尸身车裂，全家被杀。`,
]

var gameset0={restar:false,SavaDatas:[{descrip:'自动存储',name:'存档0:',time:`时间:2020-2-10-下午`,number:0}]}
var musics=[{name:`武林雄音`,type:'fight',src:'../static/0.mp3'},{name:`信长之望`,type:'fight',src:`../static/1.mp3`},
{name:`高雅`,type:'gentel',src:`../static/2.mp3`},{name:`望月之城`,type:'gentel',src:`../static/3.mp3`},
{name:`临安初雨`,type:'fight',src:`../static/4.mp3`},{name:`渐渐吸引`,type:'fight',src:`../static/5.mp3`},
{name:`恨爱交加`,type:'gentel',src:`../static/6.mp3`},{name:`百鬼夜行`,type:'fight',src:`../static/7.mp3`},
{name:`永远同在`,type:'fight',src:`../static/8.mp3`},{name:`女儿情`,type:'gentel',src:`../static/9.mp3`},
{name:`喵喵之歌`,type:'gentel',src:`../static/10.mp3`},{name:`天使之王`,type:'fight',src:`../static/11.mp3`},
{name:`背水一战`,type:'fight',src:`../static/12.mp3`},
]
export {user0,Package0,position0,ground0,gameset0,headwears,honors,musics,human,box0,storage0}