import { human, user } from './public.js'
import { Person } from "./mankind/person"
import { pas } from './mankind/skills.js'
import { weapon } from './modes/trends.js'
import { weapons, armors } from './modes/equipments.js'
import { items } from './modes/items.js'

var rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var number = rand(1, 2)
var arm = []
if (number == 2) {
    arm.push(weapon[rand(0, 2)]);
    arm.push(weapon[rand(0, 2)])
} else {
    arm.push(weapon[rand(0, 2)])
}

//信、义、象、假、类、及忌讳（不以国、不以官、山川、隐疾、牲畜、器币）
var first = ['荀', '直', '刘', '韩', '戏', '商', '孙', '吴', '鲁', '高', '郑', '柳', '白', '黑', '卜', '孔', '赵', '姬', '姒', '姜',
    '嬴', '妫', '姞', '姚', '子', '田', '芈', '百里', '淳于', '东野', '东郭', '段干', '端木', '东方', '公孙', '高堂', '公良', '时',
    '季孙', '逢', '管', '仲孙', '叔孙', '孟孙', '王子', '魏', '无', '李', '张', '庞', '邹', '苏', '宰', '祭', '吕', '勾', '越', '王',
    '唐', '徐', '子姚', '明', '容', '辩', '车', '伍', '伯', '钟', '范']
var last = ['孺', '隆', '龙', '木', '顺子', '旦', '鱼', '国', '奚', '丘', '商', '政', '光', '荡', '起', '夫', '鞅', '阳', '不疑',
    '不信', '不礼', '归父', '丑父', '林父', '行父', '成父', '良夫', '知', '智', '恶', '虎', '驹', '恤', '克', '涓', '忌', '秦', '予',
    '足', '说', '黑肱', '践', '叔虞', '季友', '昌', '发', '杵臼', '同', '异', '喜', '怒', '无畏', '福', '言', '子姚', '兆', '思',
    '子婿', '伯灵', '仲灵', '叔灵', '季灵', '灵', '子鱼', '子路', '牙', '子期', '蠡']

var descrip1 = [`过去的经历`, ``, ``, ``, ``, ``, ``]

var descrip2 = [`成就，能力`]

var descrip3 = [`现在`]

var name = first[rand(0, 68)] + last[rand(0, 68)]
var npcdata = [name, user.level + rand(0, 20), human[0], ...arm, armors[rand(0, 2)][rand(4, 6)], pas[rand(0, 9)], pas[rand(10, 13)], pas[rand(14, 17)]]
var npc=new Person(...npcdata)

