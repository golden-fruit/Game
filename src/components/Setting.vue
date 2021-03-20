<template>
    <div name="selection" class="set">
        <div class="row">
                <span @click="isloads()">存档</span>
                    <div v-if="isload">
                        <h3 @click="issaves">储存数据</h3>
                            <div v-show="issave" >
                                <label for="first"><p name="name">存档命名</p></label>
                                <input type="text" id="first" v-model="name" @keyup="color()" ref="input"><br>
                                <label for="times"><p name="time">存档地点</p></label>
                                <input type="text" id="times" v-model="time" @keyup="color()" ref="inputs"><br>
                                <a v-if="btnshow" @click="add()" class="isit">确认</a>
                                <a v-if="!btnshow" class="isits">确认</a>
                            </div>

                        <h3 @click="isdelets">读取存档</h3>
                            <ol v-show="isdelet">
                                <li v-for="(save,index) in gameset.SavaDatas"
                                :key="index"
                                @click="choose(index)"
                                :class="{active:number==index && number!==''}"
                                ><b>{{save.name}}</b>{{save.descrip}}—{{save.time}}</li>
                                    
                                    <div v-show="currents" class="chose"><a @click="load()">读取</a><a @click="delet()">删除</a></div>
                            </ol>
                         <h3 @click="gamerestar()">重新开始</h3>
                    </div>

                <span @click="playlist">音乐设置 </span>
                    <div v-if="isplay" class="music">
                        <h3 @click="all()">全部音乐</h3>
                        <h3 @click="isfights()">战斗音乐</h3>
                        <h3 @click="isgenels()">剧情音乐</h3>
                        <section v-if="hide">
                            <audio :src="currentmusic" @ended="nextsong()" controls='' ref="music" autoplay></audio>
                            <!--<embed :src="currentmusic" autostart="true" @ended="nextsong()" loop="true" height="80px" width="200px" hidden="false" /> -->
                        </section>
                        <div v-if="close">
                            <a @click="stop()">{{ button}}</a> 音量:<a @click="getvolume()"> ＜ </a><a @click="addvolume()">＞</a><br>
                            <a v-show="isBGM" @click="stopnow()">关闭BGM</a> <a v-show="!isBGM" @click="stopnow()">开启BGM</a>
                            <a @click="nextsong()">下一首</a><a @click="plays()">设为当前</a>
                        </div>
                        <a @click="change()">{{title}}</a>
                        <ul v-for="(item,index) in showmusics" :key="index">
                            <li @click="playcurrent(index)"
                                :class="{ active : index==current1}">{{index}}.歌名:{{item.name}}</li>
                        </ul>
                    </div>
               
                <span @click="pxx()">画面设置</span>
                    <div v-if="px">
                        <h3>屏幕设置:</h3>
                        <button @click="screen()">{{ screens }}</button>
                        <h3>画面设置:</h3>
                        <form>
                            <select>
                                <option>1900x1400px</option>
                                <option>1500x900px</option>
                            </select>
                        </form>
                    </div>
                <span @click="games()">关于游戏</span>
                    <div v-if="game">
                        <h3>游戏相关</h3>
                        <h3><router-link to="/aboutus">制作人员</router-link></h3>
                    </div>
        </div> 
    </div>
</template>

<script>
import Msg from './msg.js'
import {load,SaveData,LoadData,year,month,day,hour, gameset,musics,message,} from '../scripts/public.js'
export default {
  name: 'set',
  data(){
      return{
            current:false,
            isplay:false,
            isload:false,
            isdelet:false,
            issave:false,
            px:false,
            game:false,
            btnshow:false,
            gameset:gameset,
            musics:musics,
            currentmusic:require('../static/斗蛐蛐.wav'),
            current:0,
            currents:0,
            current1:'',
            number:'',
            name:'',
            time:'',
            select:'',
            close:false,
            title:'设置',
            showmusics:[],
            fight:[0,1,4,5,7,8,11,12],
            gentel:[2,3,6,9,10],
            isfight:false,
            isgenel:false,
            volume:7,
            hide:false,
            button:'开启试音',
            fullscreen: false,
            screens :'全屏',
            isshow:false,
            isBGM:true,
        }
    }, 
    methods:{
        screen(){
            let element = document.documentElement;
            if (this.fullscreen) {
                document.exitFullscreen();
                this.screens ='全屏'
            }else {
                element.requestFullscreen();
               
                this.screens ='窗口'
            }
            this.fullscreen = !this.fullscreen;
        },
        addvolume(){ //BGM部分开始
            this.volume++;
            var x=this.volume/10
            if(this.hide){
                this.$refs.music.volume=x }
            Msg.$emit('volume',x)
        },
        getvolume(){
            this.volume--;
            var x=this.volume/10
            if(this.hide){
                this.$refs.music.volume=x}
            Msg.$emit('volume',x)
        },
        stopnow(){
            if( this.isBGM){
                Msg.$emit('now','a')
                this.isBGM=!this.isBGM
            }else{
                Msg.$emit('now',200)
                this.isBGM=!this.isBGM
            } 
        },
        stop(){
            if(this.hide==true){
                this.hide=false
                this.button='开启试音'
            }else{
                this.hide=true
                this.button='关闭试音'
            }
        },
        plays(){
            var now=this.current;
            Msg.$emit('now',now)
        },
        isfights(){
            this.showmusics=[]
            for(let item of this.musics){
                if (item.type=='fight'){
                    this.showmusics.push(item)
                }
            }this.isfight=true
            this.isgenel=false
        },
        isgenels(){
            this.showmusics=[]
            for(let item of this.musics){
                if (item.type=='gentel'){
                    this.showmusics.push(item)
                }
            }this.isgenel=true
            this.isfight=false
        },
        all(){
            if(this.isshow){
                this.showmusics=[]
                for(let item of musics){
                    this.showmusics.push(item)
                }this.isshow=!this.isshow
            }else{
                 this.showmusics=[];
                 this.isshow=!this.isshow
            }
        },
        change(){
            if( this.title!='关闭')
            {
                this.title='关闭'}
            else{
                this.title='设置'
            }
            this.close=!this.close;
        },
        nextsong(){
            if(this.current==musics.length-1){this.current=-1}
            this.current++;
            if(this.isBGM){
                 var now=100;
            Msg.$emit('now',now)
            }
            if(this.hide){
                console.logs('播放第'+this.current+'首音乐')
                this.currentmusic=require('../static/'+this.current+'.mp3')
            }
        },
        playcurrent(index){
            if(this.isfight){
                this.current=this.fight[index]
                this.current1=index
            }else if( this.isgenel){
                this.current=this.gentel[index]
                this.current1=index
            }else{
                this.current=index;
                this.current1=index
            }
            console.logs('第'+ this.current+'首音乐已就绪')
            this.close=true;
            //this.currentmusic=require(musics[this.current].src)
            this.currentmusic= require('../static/'+ this.current+'.mp3')     //BGM部分结束
        },
        gamerestar(){   //存档部分开始
            gameset.restar=true;
            localStorage.setItem('gameset',JSON.stringify(gameset)) 
            location.reload();
        },
        add(){
            if( gameset.SavaDatas.length==0){
                gameset.SavaDatas=[];
                var position=0
            }else{
                var last=gameset.SavaDatas.length-1;
                var position=gameset.SavaDatas[last].number+1
            }
            var item={descrip:`${year}-${month+1}-${day}-${hour}`,name:this.name,time:this.time,number:position};
            gameset.SavaDatas.push(item);
            console.logs(`存档位置:${position}`)
            SaveData(load,item.number);
            this.name='';
            this.time='';
            this.issave=false
        },
        load(){
            if(this.number==gameset.SavaDatas.length){return this.number==''}
            if(this.number===''){return}
            var number=gameset.SavaDatas[this.number].number
            console.logs(`读取存档:${number}`)
            localStorage.setItem('position',JSON.stringify(number)) 
            location.reload()
        },
        delet(){
            if(this.number==gameset.SavaDatas.length){return this.number==''}
            if(this.number===''){return}
            if(this.number==0){
                var message=confirm("警告！将删除自动存档，请至少保留一个存档！")}
            if(message==false){ return console.logs('明智之举')}
            var positon=gameset.SavaDatas[this.number].number
            var key='Data'+positon
            localStorage.removeItem(key)
            gameset.SavaDatas.splice(this.number,1)
             console.logs(`删除存档${positon}`) 
        },
        color(){
            if(this.name.length>=1 && this.time.length>=1){
                this.btnshow=true;
            }else{this.btnshow=false}
        },
        playlist(){
            this.isplay=!this.isplay
        },
        isloads(){
            this.isload=!this.isload
        },
        issaves(){
            this.issave=!this.issave
        },
        isdelets(){
            this.isdelet=!this.isdelet
        },
        choose(index){
             if(this.number===index){return this.currents=!this.currents;}
            this.number=index
            this.currents=true;
        },
        pxx(){
            this.px=!this.px
        },
        games(){
            this.game=!this.game
        },
    },
    mounted:function(){
        this.all()
        this.volume=eval('('+localStorage.getItem('bgm')+')')*10;
    },
    updated:function(){
        
        localStorage.setItem('gameset',JSON.stringify(gameset)) 
    },computed:{
        //currentmusic:function(){
            //return require( this.musics[this.current].src)
        //}
    
    },watch:{
        time(){
            this.color()
        },name(){
            this.color()
        }
    }

}

</script>
<style scoped>
section{margin: 0;height: 60px}
*{margin:0;}
h4{display: inline;
text-align: left}
.music li{
    text-align: left;
    margin-left: 120px;
}
.set #first,#times{
    background-color: antiquewhite
}
input:hover{
     background-color:rgb(196, 193, 193);
}
.set{background-color:bisque;}
.row{
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    text-align: center;
    width: 400px;
    margin-top: 100px;
}
.row span{
    margin: 0 auto;
    width: 200px;
    height: 40px;
    font-size:24px;
    font-weight: bold;
    line-height: 40px;
    margin-top: 28px;
    background-image:url(../../public/img/0.jpg);
}
span:hover{
    color:white;
    opacity:0.8;
    cursor: pointer;
}
audio{margin: 0}
.set ol{
    text-align: left;
    margin-left: 65px;
    cursor: pointer;
}
.set ol .active{
    width: 300px;
    background-color: #1dd3d3;
}
.music ul .active{
    width: 140px;
    background-color: #1dd3d3;
}
.music ul li:hover{
    width: 140px;
    background-color: #1dd3d3;
}
.music ul{list-style: none;}
 a{
    margin-left: 10px;
    width: 50px;
    background-color:rgb(241, 214, 137)
}
.set h3,a:hover{
    cursor: pointer;
    font-weight: bold;
    opacity:0.8;
}
.chose{
    margin-right: 80px;
    text-align: right;
}
.isit{ 
    text-align: right;
    position: relative;
    left: 80px;
}
.isits{ 
    text-align: right;
    position: relative;
    left: 80px;
    background:gray}
form,p{display: inline;}
h3:hover{
    margin: 0 auto;
    width: 200px;
    background-color: rgb(180, 174, 166);
    opacity:0.8;
    color:white ;
}
</style>