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
class Armor extends Equipments{
    constructor(name,def,description){
        super(name,description)
        this.effect={def,cost:1}
        this.type='甲具'
    } 
}
class  Weapon extends Equipments{
    constructor(name,atk,description){
        super(name,description)
        this.effect={atk}
        this.type='武器'
    }
}
class Swords extends Weapon{
    constructor(name,atk,description){
        super(name,atk,description)
        this.weapontype='剑'
    }
}


class Cloth extends Armor{
    constructor(name,def,quality,description){
        super(name,def,description)
        this.effect={def,cost:1}
        this.armortype='布衣'
        this.quality= quality
        this.add=0.5
    } 
}
class Leather extends Armor{
    constructor(name,def,quality,description){
        super(name,def,description)
        this.effect={def,cost:2}
        this.armortype='羽甲'
        this.quality= quality
        this.add=0.8
    } 
}
class Cover extends Armor{
    constructor(name,def,quality,description){
        super(name,def,description)
        this.effect={def,cost:3}
        this.armortype='覆甲'
        this.quality= quality
        this.add=1
    } 
}

class Light extends Swords{
    constructor(name,atk,quality,description){
        super(name,atk,description)
        this.effect={atk,cost:1}
        this.swordtype='轻剑'
        this.quality= quality
        this.dmg=1.2
    }
}
class Middle extends Swords{
    constructor(name,atk,quality,description,def){
        super(name,atk,description)
        this.effect={atk,cost:2}
        this.swordtype='中剑'
        this.quality= quality
        this.def=def
        this.dmg=1.4
    }
}
class Weight extends Swords{
    constructor(name,atk,quality,description,def){
        super(name,atk,description)
        this.effect={atk,cost:3}
        this.swordtype='重剑'
        this.quality= quality
        this.def=def
        this.dmg=1.6
    }
}

var lig0=new Light('木短剑',3,'破损','白虹贯日，彗星袭月')
var lig1=new Light('木匕剑·兄',5,'特殊','少年喜好武器，其叔父斩桃枝，以之成匕首两把，分为兄妹匕首。')
var lig2=new Light('普通短剑',5,'普通','比一般的剑要短，更灵敏')
var lig3=new Light('普通匕首',5,'普通','听说徐夫人之匕，锋利无比')
var lig4=new Light('匕首',6,'精良','制作精良的短剑，出剑迅如雷霆')
var lig5=new Light('短剑',8,'精良','制作精良的短匕，可出奇制胜')
var lig6=new Light(`太刀·国纲`,20,'名匠造就',`世代传承的太刀，迅捷无比，听说最初的使用者用它一口气连砍十三刀`)
var lig7=new Light('铁剑（真）',15,'名匠造就',`—看上去，只是一把铁剑……但曾经使用他的人，持此剑杀一十三人，此剑锐利如初！`)
var lig8=new Light('工布',20,'名匠造就',`楚王命欧冶子所铸。“欲知工布，釽从文起，至脊而止，如珠不可衽，文若流水不绝。”`)
var lig9=new Light('胜邪',30,'名匠造就',`欧冶子铸剑之时即认为剑中透着恶气，每铸一寸，便更恶一分，故名“胜邪”`)

var lig10=new Light('鱼肠',20,'传世名武',`“逆理不顺，不可服也，臣以杀君，子以杀父。”“夫专诸之刺王僚也,彗星袭月。”`)
var lig11=new Light('宵练',28,'传世名武',`下品宵练,方昼则见影而不见光，方夜见光而不见形。其触物也，然而过，随过随合，觉疾而不血刃焉。`)
var lig12=new Light('承影',30,'传世名武',`中品承影，将旦昧爽之交，日夕昏明之际，北面而察之，淡淡焉若有物存，莫识其状。其所触也，窃窃然有声，经物而物不疾也。`)
var lig13=new Light('含光',33,'传世名武',`卫孔周其祖得殷帝之宝剑，一童子服之，却三军之众！来丹闻之，上门求剑。
孔周曰:“吾有三剑，皆不能杀人，且言其状。上品含光，视之不可见，运之不知有。其所触也，泯然无际，经物而物不觉。`)

var mid0=new Middle('木剑',4,'破损','紫电青霜，迅如光影。')
var mid1=new Middle('木剑·重光板',10,'特殊','原来不过是垫在地上的一块木板，痴迷剑术的少年，将它从泥土中抽出，削成刀剑模样。剑柄尾上刻着“重光版”')
var mid2=new Middle('残破铜剑',5,'破损',`残损的铜剑，上面锈迹斑斑，此剑无柄用之伤人伤己。慎之！`)
var mid3=new Middle('残剑',6,'破损',`折断了一半的铁剑，上面遍布锈迹，不知何人所用……`)
var mid4=new Middle('旧铜剑',10,'普通',`普普通通的铜剑，就像你一样平平无奇`)
var mid5=new Middle('旧铁剑',12,'普通',`一般的铁剑，虽然已有些年头，但锋利不减`)
var mid6=new Middle('青铜剑',9,'精良',`制作精良的铜剑，吹毛断发，古朴厚重`)
var mid7=new Middle('铁剑',11,'精良',`制作精良的铁剑，寒光照人，十分锋利`)
var mid8=new Middle('铭文青铜剑·青罡',14,'优秀',`当世名匠利用铜锡和陨铁，造就的青铜宝剑。
此剑，吹毛断发、削铁如泥、攻防兼备。可谓千金不换。上刻有铸剑师的鸟篆铭文 ‘青罡’`,5)
var mid9=new Middle('白虹剑',15,'优秀',`名匠耗费精力打造的宝剑，寒光照人，锋利无比，因为剑出如虹，得名白虹`)
var mid10=new Middle('紫电',20,'名匠造就',`当世名匠历经十载打磨而出的宝剑。剑出迅如雷霆，光耀人眼。——上刻铭文 ‘紫电’`)
var mid11=new Middle('青霜',22,'名匠造就',`当世名匠历经十载打磨而出的宝剑。寒光绽绽，出鞘时，满室生寒，以为霜雪。——上刻铭文 ‘青霜’`)
var mid12=new Middle(`铁剑(封)`,20,'名匠造就',`看上去，只是一把铁剑……`)

var mid13=new Middle(`纯均`,30,`传世名武`,`王曰:“客有直之者，有市之乡二，骏马千疋，千户之都二，可乎？”
薛烛对曰：“不可。今赤堇之山已合，若耶溪深而不测。群神不下，欧冶子即死。虽复倾城量金，珠玉竭河，犹不能得此一物，
有市之乡二、骏马千疋、千户之都二，何足言哉！”
———越绝外传记·宝剑第十三 纯均`)
var mid14=new Middle(`泰阿`,33,'传世名武',`楚王命欧冶子所铸。“欲知泰阿，观其釽，巍巍翼翼，如流水之波。”
楚王引泰阿之剑，登城而麾之。三军破败，士卒迷惑，流血千里，猛兽欧瞻，江水折扬，晋郑之头毕白。
———越绝书·外传记 宝剑第十三 泰阿`,10)
var mid15=new Middle(`龙渊`,34,'传世名武',`欧冶子、干将所铸。“欲知龙渊，观其状，如登高山，临深渊。”
———越绝书·外传记 宝剑第十三 龙渊`,12)
var mid16=new Middle(`湛卢`,35,`传世名武`,`湛卢之剑，去之如水，行秦过楚，楚王卧而寤，得吴王湛卢之剑，将首魁漂而存焉。
秦王闻而求之，不得，兴师击楚，曰：‘与我湛卢之剑，还师去汝。’楚王不与。`,20)

var wei0=new Weight('重剑',25,'重剑无锋，大巧不工',)
var wei1=new Weight('干将莫邪',30,'传世名武',`干将作剑，采五山之铁精，六合之金英，候天伺地，阴阳同光，百神临观，
天气下降而金铁之金不销沦流……于是干将妻乃断发剪爪，投于炉中，使童女童男三百人鼓槖装炭，金铁乃濡，遂以成剑。阳曰干将，阴曰莫耶`,20)
var wei2=new Weight('巨阙',40,'传世名武',`“巨阙初成之时，吾坐于露坛之上，宫人有四驾白鹿而过者，
车奔鹿惊，吾引剑而指之，四驾上飞扬，不知其绝也。穿铜釜，绝铁石，胥中决如粢米，故曰巨阙。”`,20)
var wei3=new Weight('无光哑剑',10,'特殊',`少年在叔父得床底发现了他收藏得一把重剑，皮革的剑鞘上满是灰尘，吃力得抽出剑来看，暗哑无光。十年生死两茫茫……纵使相逢应不识，尘满面，鬓如霜！`,100)

var lig=[lig0,lig1,lig2,lig3,lig4,lig5,lig6,lig7,lig8,lig9,lig10,lig11,lig12,lig13,]
var mid=[mid0,mid1,mid2,mid3,mid4,mid5,mid6,mid7,mid8,mid9,mid10,mid11,mid12,mid13,mid14,mid15,mid16,]
var wei=[wei0,wei1,wei2,wei3]
var weapons=[lig,mid,wei]

var clo0=new Cloth('粗布衣',6,'普通','一般的粗布衣')
var clo1=new Cloth('麻布衣',8,'普通','百姓多用麻织物')
var clo2=new Cloth('娟布衣',10,`精良`,'丝织物主要为王公大臣所用')
var clo3=new Cloth('绨布衣',12,`精良`,'王公贵族所用布衣')
var clo4=new Cloth('素罗布衣',14,`精良`,`千里桑麻,素罗绞纱!`)
var clo5=new Cloth('方孔纱衣',18,`精良`,'历久不变，色彩如新，王公贵族所用')
var clo6=new Cloth('袍服',24,`优秀`,'位高权重之人，入宫参政时，所着官服。')

var lea0=new Leather('布甲',8,'普通','先商甲胄，仅覆盖胸腹部位。')
var lea1=new Leather('皮甲',11,'普通','先商甲胄，仅覆盖胸腹部位。')
var lea2=new Leather('硬藤甲',14,`精良`,'战国铠甲，可有效抵挡箭、矛。')
var lea3=new Leather('牛皮甲',17,`精良`,'战国铠甲，可有效抵挡箭、矛。')
var lea4=new Leather('革甲',21,`精良`,'以皮革制成的甲衣')
var lea5=new Leather('牛筋甲',25,`优秀`,'甲片以牛筋穿组')
var lea6=new Leather('玄甲',27,`优秀`,'临阵时，中下级将官所穿的皮甲，防御与灵活并重。')

var cov0=new Cover('练甲',10,`普通`,`西周练甲，以缣帛夹厚棉制作，辅以青铜甲衣。`)
var cov1=new Cover('铁甲',14,`普通`,`战国铠甲，以铁为原料，质地坚硬。`)
var cov2=new Cover('钢甲',18,`精良`,`战国铠甲，以钢为材，防御上佳。`)
var cov3=new Cover('士卒铠',24,`优秀`,`秦国士兵所着，甲衣腹背前后覆盖，以甲穿组`)
var cov4=new Cover('将军铠',30,'名匠造就',`秦国将领所着，全身共有甲片一百六十片，以牛筋穿组。`)
var cov5=new Cover('铜铠甲具',34,'名匠造就',`包括:饕餮纹青铜胄、青铜面具、甲衣、腰带、衣、裳。`)
var cov6=new Cover('流传具备·传世甲胄',38,'名匠造就',`世代传承的甲胄，保养完好。`)

var clo=[clo0,clo1,clo2,clo3,clo4,clo5,clo6]
var lea=[lea0,lea1,lea2,lea3,lea4,lea5,lea6]
var cov=[cov0,cov1,cov2,cov3,cov4,cov5,cov6]
var armors=[clo,lea,cov]
export{armors,weapons}