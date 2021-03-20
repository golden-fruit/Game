
<template>
<div class="office" style="background: url(img/郡县/主题背景/乡村/3.jpg)  no-repeat ;background-size:cover;">
        <div id="word">
            <li v-for="(item,index) in message" :key="index">{{item}}<span ref="san" v-show="show">▲</span></li>
        </div>
        <div id="img"></div>
</div>      
</template>

<script>
import {date,user,Package,storage} from '../../../scripts/public.js'
export default {
    data() {
        return{
            Package:Package,
            message:[],
            txt:[`来者何人？所为何来？`,
            `小人${user.name},因年满17,需往县中服役，故而来此求见云梦乡亭长。`,
            `爹爹不在，他走时已经嘱咐过了。`,
            `这是你的'验','传'，收好了，没有它们，你连乡里都出不去`,
            `得到了‘验传’，待在乡下一十七载的${user.name}手中紧紧握着'验','传'木片。只觉得天下大可去得！`,
            `一时胸中汹涌澎拜，不由脱口而出：`,`一枕黄梁梦南柯，细数平生匆匆过。一日忽见花结果，明悟此生我是我。`],
            show:'',
            storage:storage,
        }

    },
    methods: {
           shiny(){
             setTimeout(() => {
                this.show=false
            }, 700);
            setTimeout(() => {
                this.show=true
                this.shiny()
            }, 1400);
        },
        talk(){
            this.message=[`只见庭院中一年轻女子在侍弄花草……`];
            var t=0;
            var txt=document.getElementById('word')
            txt.addEventListener('click',()=>{
                this.message=[];
            if(this.txt[t]==undefined){
                Package.push(...this.storage)
                console.logs(`已获得了'验','传'。已可以离乡，速往安陆县！`)
                this.storage.splice(0);
                this.message=[];
                this.message.push(`一路保重！`);
                return }
            this.message.push(this.txt[t]);t++
            })
        },
        check(){
       for(let i in Package){
                if(Package[i].name=='验'){
                    return this.message=[`你还来此做什么？我们已经无话可说，一路走好！`]
                }else if(i==Package.length-1){
                    this.talk()
                    console.logs(`交谈`)
                }
            }
        }
    },
    mounted:function(){          //挂载后  初始化一次
       this.shiny()
       this.check()
    }
}
</script>
<style scoped>
.office{
     height: 540px; 
     margin: 0 auto
}
#word{
    color: aliceblue;
    background:rgb(26, 25, 25,0.6) ; 
    margin: 0 auto;
    position: absolute;
    left: 630px;
    top:400px;
    text-align: left;
    height: 60px;
    width: 275px;
}
#word li{
    list-style: none;
}
#word span{
    display: inline;
}
.office #img{
    position: relative;
    float: right ;
    top: 140px;
    height: 350px;
    width: 300px;
    /* border: 2px solid black; */
    background: url('../../../../public/img/人物/女性/12.png') no-repeat ;
    background-size:cover;
}
</style>
