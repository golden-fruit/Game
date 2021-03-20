<template>
<div>
    <button @click="toggle()"><h3>{{ title }}</h3></button>
    <div class="mains">
        <div class="menu" style="white-space:pre" ref="menus"> 
            <ul>
                <li @click="menu1()">包裹</li>
                <li @click="menu2()">装备</li>
                <li @click="menu3()">技能</li>
            </ul>
            <ul>
                <li @click="menu4()">验传</li>
                <li @click="menu5()">地图</li>
                <li @click="menu6()">设置</li>
            </ul>
        </div>
    </div>
</div>
</template>


<script>
import Msg from './msg.js'
export default {
    name: 'menus',
    data(){
        return{
            current:'',
            title:'菜单>>',
        }
    },
    methods: {
        toggle(){
            if(this.current!==1){
                this.$refs.menus.style.display='none';
                Msg.$emit("val","A");
                this.current=1;
                this.title='菜单<<';
            }else{ 
                this.$refs.menus.style.display='block';
                Msg.$emit("val","A");
                this.current=0; 
                this.title='菜单>>';
            }
        }, 
        menu1(){
            if(this.current!=1){
                Msg.$emit("val",1);
                this.current=1;
            }else{
                Msg.$emit("val","a");
                this.current=0;
            }
        },
        menu2(){
            if(this.current!=2){
                Msg.$emit("val",2);
                this.current=2;
            }else{
                Msg.$emit("val","b");
                this.current=0;
            }
        },
        menu3(){
            if(this.current!=3){
                Msg.$emit("val",3);
                this.current=3;
            }else{
                Msg.$emit("val","c");
                this.current=0;
            }
        },
        menu4(){
            if(this.current!=4){
                Msg.$emit("val",4);
                this.current=4;
            }else{
                Msg.$emit("val","d");
                this.current=0;
            }
        },
        menu5(){
            if(this.current!=5){
                Msg.$emit("val",5);
                this.current=5;
            }else{
                Msg.$emit("val","e");
                this.current=0;
            }
        },
        menu6(){
            if(this.current!=6){
                Msg.$emit("val",6);
                this.current=6;
            }else{
                Msg.$emit("val","f");
                this.current=0;
            }
        }
    },
}
</script>
<style scoped>
    *{
        padding:0;
        margin: 0;
    }
    h3{
        margin:0
    }
    .mains{
        display: flex;
        /*padding-left: 160px;*/
        text-align: center;
    }
    button{
        position: relative;
        left: 100px;
        background-color:rgb(238, 182, 113);
    }
    button:hover{
        color:#FCFCFC;
    }
    .menu{
        margin: 0 auto;
		font-size: 20px;
		font-weight: bold;
        border: black 2px solid;
        width: 430px;
	}
	.mains li{
        height: 30px;
        line-height: 30px;
        width: 50px;
        margin-top: 20px;
        margin-bottom: 10px;
		text-decoration: none;
		list-style: none;
	    float: left;
		border: 3px solid white;
        background-image:url(../../public/img/0.jpg);
        padding-left: 10px;
        padding-right: 10px;
        margin-left: 50px;
        
	}
    .mains li:hover{
        cursor: pointer;
        color: #FCFCFC
    }
	</style>