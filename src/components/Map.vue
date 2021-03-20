<template>
  <div style="backgroundImage:URL(img/0.jpg)">
    <div v-show="mm==61">
      秦国郡县图
      <button @click="mm=''">后退</button>
    </div>
    <div v-show="mm==51">
      齐国详图
      <button @click="mm=''">后退</button>
    </div>
    <div v-show="mm==41">
      楚国详图
      <button @click="mm=''">后退</button>
    </div>
    <div v-show="mm==31">
      燕国详图
      <button @click="mm=''">后退</button>
    </div>
    <div v-show="mm==21">
      颖川郡县图
      <button @click="mm=''">后退</button>
    </div>
    <div v-show="mm==11">
      邯郸郡县图
      <button @click="mm=''">后退</button>
    </div>
    <div v-show="mm==1">
      魏国详图
      <button @click="mm=''">后退</button>
    </div>
    <div v-show="typeof mm!='number'" id="map" ref="mapbox"></div>
  </div>
</template>

<script>
import { echarts } from "../scripts/map/allmap.js";
const option = {
  title: {
    text: "战国全图",
    link: "http://www.360doc.com/content/19/0520/22/259476_837124040.shtml",
    subtext: "战国七雄",
    sublink:
      "https://baike.baidu.com/item/%E6%88%98%E5%9B%BD%E4%B8%83%E9%9B%84/29293?fr=aladdin"
  },
  series: [
    {
      name: "战国全图",
      type: "map",
      map: "战国",
      label: {
        show: true,
        color: "black",
        fontSize: 15,
        fontWeight: 500
      },
      itemStyle: {
        //地图板块颜色和边框
        areaColor: " rgba(243, 169, 73, 0)",
        borderColor: "black",
        borderWidth: 1.1
      },
      roam: true,
      zoom: 1.2, //缩放地图
      emphasis: {
        //滑过的颜色
        label: {
          color: "#fff",
          fontSize: 25
        },
        itemStyle: {
          //areaColor:"#83b5e7"
        }
      },
      data: [
        { name: "秦国", value: "61", occupy: true },
        { name: "齐国", value: "51", occupy: false },
        { name: "楚国", value: "41", occupy: false },
        { name: "燕国", value: "31", occupy: false },
        { name: "颍川(韩)", value: "21", occupy: true },
        { name: "邯郸(赵)", value: "11", occupy: true },
        { name: "魏国", value: "1", occupy: false }
      ]
    }
  ],
  visualMap: [
    {
      type: "piecewise",
      show: true,
      splitNumber: 7,
      pieces: [
        { min: 70 },
        { min: 60, max: 69 },
        { min: 50, max: 59 },
        { min: 40, max: 49 },
        { min: 30, max: 39 },
        { min: 20, max: 29 },
        { min: 10, max: 19 },
        { min: 1, max: 9 }
      ],
      // align:'left',
      // orient:'horizontal'
      // left right 控制位置
      showLabel: false, //文字显示
      textStyle: { color: "rgba(0,0,0,0.7)" },
      inRange: {
        color: [
          "lightskyblue",
          "#FF6666",
          "#8C3C99",
          "#80C21D",
          "yellow",
          "#f97a06",
          "orangered"
        ]
        //[ '#00FFFF', 'yellow', 'orangered',]
      },
      itemWidth: 0,
      itemHeight: 0
    }
  ],
  tooltip: {
    show: true,
    trigger: `item`
  }
};
export default {
  name: "maps",
  components: {},
  data() {
    return {
      mychart: "",
      mm: "",
      run: "",
      runy: ""
    }
  },
  methods: {
    Configure() {
      var _this = this;
      window.onresize = _this.mychart.resize; //窗口大小改变时触发的事件
      this.mychart.on("click", function(params) {
        if (params.data.occupy == true) {
          _this.mm = params.value;
        } else {
          return alert("不可查看敌国地图");
        }
      });
    },
  },
  mounted() {
    this.mychart = echarts.init(this.$refs.mapbox);
    this.mychart.setOption(option);
    this.Configure();
  }
};
</script>>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>