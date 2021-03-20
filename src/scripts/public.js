import { user0, Package0, ground0,position0, gameset0, headwears, honors, musics, human,box0,storage0 } from './oringindata.js'
import { LoadData, SaveData } from './loadsave.js'
var date0=[360*20+5*30]
var Data = {
    user: user0,
    Package: Package0,
    ground: ground0,
    position:position0,
    date:date0,
    box:box0,
    storage:storage0,  
}
var time = new Date()
var year = time.getFullYear();
var month = time.getMonth();
var day = time.getDate();
var hour = time.getHours();
var minute = time.getMinutes()
var isfight=[]
var message = []
var messages = []
var atkname=[user0.name]
console.logs = function (messages) {
    if (typeof messages == 'object') {
        message.push(JSON && JSON.stringify ? JSON.stringify(messages) : messages)
    } else {
        message.push({ hour: `${hour}:`, minute:minute>10?minute:`0${minute}`, content:user0.name , messages });
    }
}
console.logg = function (fightmessage) {
    if (typeof fightmessage == 'object') {
        messages.push(JSON && JSON.stringify ? JSON.stringify(fightmessage) : fightmessage)
    } else {
        messages.push({ hour: `${hour}:`, minute:minute>10?minute:`0${minute}`, content: atkname[0], fightmessage });
    }
}
if (typeof localStorage.gameset == 'undefined') {
    localStorage.setItem('gameset', JSON.stringify(gameset0))
}
var gameset = eval('(' + localStorage.getItem('gameset') + ')')
var number = eval('(' + localStorage.getItem('position') + ')')
if(localStorage.bgm==null){
    localStorage.setItem('bgm',JSON.stringify(0.2))
}
if (number != null) {
    var load = LoadData(number)
    localStorage.removeItem('position')
    console.logs(`手动加载-存档${number}`)
} else if (gameset.restar == true) {
    SaveData(Data, 0);
    console.logs('重新初始化')
    var load = LoadData(0);
    gameset.restar = false
    localStorage.setItem('gameset', JSON.stringify(gameset))
    console.logs(`重新游戏-初始化加载-`)
}
else {
    for (let i = 9; i >= 0; i--) {
        if (LoadData(i) != null) {
            var load = LoadData(i);
            console.logs(`自动加载-存档${i}`)
            break;
        } else if (LoadData(0) == null) {
            SaveData(Data, 0);
            console.logs('初始化数据')
            var load = LoadData(0);
            console.logs(`初始加载-存档0`)
            break;
        }
    }
}
var user = load.user
var Package = load.Package
var ground = load.ground
var position =load.position
var date=load.date
var box=load.box
var storage=load.storage
var first = ['荀', '直', '刘', '韩', '戏', '商', '孙', '吴', '鲁', '高', '郑', '柳', '白', '黑', '卜', '孔', '赵', '姬', '姒', '姜',
    '嬴', '妫', '姞', '姚', '子', '田', '芈', '百里', '淳于', '东野', '东郭', '段干', '端木', '东方', '公孙', '高堂', '公良', '时',
    '季孙', '逢', '管', '仲孙', '叔孙', '孟孙', '王子', '魏', '无', '李', '张', '庞', '邹', '苏', '宰', '祭', '吕', '勾', '越', '王',
    '唐', '徐', '子姚', '明', '容', '辩', '车', '伍', '伯', '钟', '范'
]
var last = ['孺', '隆', '龙', '木', '顺子', '旦', '鱼', '国', '奚', '丘', '商', '政', '光', '荡', '起', '夫', '鞅', '阳', '不疑',
    '不信', '不礼', '归父', '丑父', '林父', '行父', '成父', '良夫', '知', '智', '恶', '虎', '驹', '恤', '克', '涓', '忌', '秦', '予',
    '足', '说', '黑肱', '践', '叔虞', '季友', '昌', '发', '杵臼', '同', '异', '喜', '怒', '无畏', '福', '言', '子姚', '兆', '思',
    '子婿', '伯灵', '仲灵', '叔灵', '季灵', '灵', '子鱼', '子路', '牙', '子期', '蠡','子游'
]
var hoteltxt=[`从日常生活转向近来发生的“天下大事”上。`,`“汝等可听到传言了？”`,
`“我听关中来的人说，上个月，有个燕国刺客，竟敢在咸阳宫殿里行刺大王！”`,
    `“那燕人极其狡诈，竟借献地图为名，暗藏利刃，欲刺杀大王……”`, `“噫！”,“大王受上天庇护，绝不会有事。”`,
    `只有黑夫对荆轲心生惋惜，不由轻轻吟唱起来:“风萧萧兮易水寒，壮士一去兮不复还……”`,`众人皆诧异莫名，黑夫连忙闭口，笑着搪塞道:`,
    `“我想大王遇刺，必发兵伐燕，大军将行，不由想起这歌谣，二三子勿怪。”`,`“倒是雄壮异常，令人动容。”黑夫却陷入了沉思。`,
    `三年前（公元前230年），韩国被现在的南郡太守腾攻灭；`,`一年前（公元前228年），赵都邯郸也被秦军占领，衷还参加了那场战役。`,
    ` 如今，荆轲刺秦王也已发生，这就意味着，燕国很快就要完蛋了!`,`黑夫知道:作为报复，秦王嬴政派大军伐燕，明年，燕都破，太子丹被杀，燕王退保辽东。`,
    `与此同时，秦军还在猛攻大梁城，魏国也很快会灭亡。`,`如此一来，秦国已经横扫北方，秦王嬴政的剑，即将指向南方的楚国!`,`“也就是说，再过两年，秦楚战争便会全面爆发。”`
]
var hometxt=[`里正登门，告知更卒服役的情况：你年满17，按秦律，应“傅籍”，登记户口名册，并承担服役的义务。`,
`就是去县城当一个月的“更卒”，帮公家修城站岗，或是接受军事训练，不会上战场的。`,
`此去县城，沿途重重关卡，况且按我大秦律例。无故不得离乡。你去亭长处报备一下才可上路。`,
`亭长应当就在云梦亭办公，速去吧，不可拖延误了时期，若失期轻则仗责三十，重则斩首示众。`]
setInterval(() => {
    var t = new Date()
    year = t.getFullYear();
    month = t.getMonth();
    day = t.getDate();
    hour = t.getHours();
    minute = t.getMinutes()
}, 60000)
var enemylevel=[0]
var rand=function(min,max){
    return Math.floor(Math.random()*(max-min+1))+min
}
var count=function(position,user){
    var num1=Math.floor((2840-position.y)/130)
    if(position.x>1450){num1+=rand(0,20)}else if(position.x<750){num1+=rand(0,5)}
    enemylevel=[]
    return  enemylevel.push(parseInt(user.level)+num1)
}

setInterval(()=>{count(position,user);},10000)


export { user, Package,position, ground, gameset, load,
      SaveData, LoadData, headwears, first,last,honors,
      musics,isfight, message, human, messages, year, 
      month,date, day, hour, minute ,hoteltxt,atkname,
      enemylevel,hometxt,box,storage}