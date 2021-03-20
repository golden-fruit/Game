<template> 
<section>
        <router-view/>
        <audio id="audio" :src="currentmusic"  @ended="nextsong()" ref="song" controls autoplay="autoplay" hidden='true'></audio>
</section>
    
</template>

<script>
import Msg from './components/msg.js'
import {musics,} from './scripts/public.js'
export default {
    name: 'appshow',
  data(){
      return{
            musics:musics,
            currentmusic:require('./static/0.mp3'),
            current:0,
        }
    }, 
    methods:{
        nextsong(){
            if(this.current==musics.length-1){this.current=-1}
            this.current++;
            console.logs('自动播放第'+this.current+'首音乐—'+musics[this.current].name)
            this.currentmusic=require('./static/'+this.current+'.mp3')
        },
        playcurrent(){
            if(this.current==musics.length){this.current=0}
            this.currentmusic= require('./static/'+this.current+'.mp3')
            console.logs('播放第'+this.current+'首音乐—'+musics[this.current].name)
            this.$refs.song.play()
        },
    }, mounted:function(){
        var _this=this
        Msg.$on("now",function(now){
            if(typeof now!=='number'){
               _this.$refs.song.pause()
               return console.logs('关闭BGM')
            }else if(now==200){
                _this.$refs.song.play()
                 return console.logs('BGM开启')
            }
            else if(now==100){
                return _this.nextsong()
            }else{
                _this.current=now;
                _this.playcurrent();
            }
        })
        Msg.$on('volume',function(x){
             _this.$refs.song.volume=x;
             localStorage.setItem('bgm',JSON.stringify(x))
             console.logs( `音量:${x*100}%`)
        })
       this.$refs.song.volume=eval('('+localStorage.getItem('bgm')+')')
    },updated:function(){
        
    }
}
</script>



<style>
</style>
