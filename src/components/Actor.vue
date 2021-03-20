<template>
  <div>
    <div id="person" ref="person"></div>
  </div>
</template>

<script type="application/javascript">
export default {
  data() {
    return {
      human: "",
      run: 0,
      runy: 0
    };
  },
  methods: {
    $(id) {
      return document.getElementById("id");
    },
    rand(max, min) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    person() {
      this.person = this.$(person);
      this.house = this.$(house);
      //this.$refs.person.innerHTML='none'
      person.innerHTML = `黑夫`;

      //this.run=30;
      //person.style.left=`${this.run}px`
    },
    keydown() {
      this.person = this.$(person);
      var that = this;
      document.onkeydown = function(e) {
        var e = e || event;

        if (e.keyCode == 68) {
          that.run++;
          var dist = that.run * 10;
          if (dist >= 800) {
            dist = 790;
            that.run = 79;
          }
          person.style.left = `${dist}px`;
          person.style.groundColor = "red";
        }
        if (e.keyCode == 65) {
          that.run--;
          var dist = that.run * 10;
          if (dist <= 0) {
            dist = 0;
            that.run = 0;
          }
          person.style.left = `${dist}px`;
        }

        if (e.keyCode == 87) {
          that.runy--;
          var dis = that.runy * 10;
          if (dis <= 0) {
            (dis = 0), (that.runy = 0);
          }
          person.style.top = `${dis}px`;
        }
        if (e.keyCode == 83) {
          that.runy++;
          var dis = that.runy * 10;
          if (dis >+ 550) {
            (dis = 550), (that.runy = 55);
          }
          person.style.top = `${dis}px`;
        }
      };
    },
    move() {}
  },
  mounted() {
    this.person();
    this.keydown();
  }
};
</script>>

<style scoped>
#person {
  font-size: 5px;
  position: relative;
  left: 10px;
  width: 10px;
  height: 30px;
  background: lemonchiffon;
}
</style>