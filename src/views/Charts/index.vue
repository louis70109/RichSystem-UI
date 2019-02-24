<script>
import Vue from "vue";
import VueGridLayout from "vue-grid-layout";
import SideBar from "../../components/sidebar.vue";
let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;
let MQTT = require("mqtt");

export default {
  name: "charts",
  components: {
    GridLayout,
    GridItem,
    SideBar
  },
  data() {
    return {
      layout: [
        {
          x: 0,
          y: 0,
          w: 2,
          h: 4,
          i: "0",
          wPx: "200px",
          hPx: "200px",
          title: "line"
        }
      ],
      chartData: {
        "0": {
          columns: ["日期", "访问用户", "下单用户", "下单率"],
          rows: [{ 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 }]
        }
      },
      gaugeData: {
        // "1": {
        //   columns: ["type", "a", "b", "value"],
        //   rows: [{ type: "速度", value: 10, a: 1, b: 2 }]
        // }
      },
      loading: true,
      styleMask: { visibility: "visible" },
      mask: {
        editMask: false,
        deleteMask: false
      },
      mqtt_topic: {}
    };
  },
  methods: {
    user_logout() {
      this.$localStorage.remove("user_id");
      this.$localStorage.remove("user_token");
      this.$router.push("/login");
    },
    topic_modal(chart) {
      let _this = this;
      this.$prompt("請輸入 topic", "提示", {
        confirmButtonText: "送出",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          _this.addChart(chart, value);
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    chart_mqtt(self, topic, c_type, last_idx) {
      let client = MQTT.connect("mqtt://iotser.iots.tw:8083");
      let _this = this;
      client.unsubscribe(topic, err => {
        console.log("Error unSub: %s", err);
      });
      client.on("connect", function() {
        client.subscribe(topic, function(err) {
          if (!err) {
            client.publish(topic, "0");
          }
        });
      });

      client.on("message", function(t, message) {
        // message is Buffer
        // if (t.split("/")[0] === "gague") {
        if (message === "ok") client.publish(t, "0");
        let m = Number(message.toString());
        _this.gaugeData[self[last_idx].i] = {
          columns: ["type", "a", "b", "value"],
          rows: [{ type: "速度", value: m, a: 1, b: 2 }]
        };
        let h = self[last_idx].hPx.split("px")[0];
        let w = self[last_idx].wPx.split("px")[0];

        // 同size改變不會變動，此部份先+1變個寬度再變回去
        _this.resizedEvent(
          Number(self[last_idx].i),
          self[last_idx].h,
          self[last_idx].w,
          h + 1,
          w + 1
        );
        _this.resizedEvent(
          Number(self[last_idx].i),
          self[last_idx].h,
          self[last_idx].w,
          h,
          w
        );
        // }
        // client.end()
      });
    },
    IntToPx(original, rate) {
      return `${original * (rate + 10)}px`;
    },
    editChart() {},
    addChart(c, topic) {
      let self = this.layout;

      if (self.length > 0) {
        self.push({
          x: 0,
          y: 0,
          w: 2,
          h: 6,
          i: String(Number(self[self.length - 1].i) + 1),
          wPx: `200px`,
          hPx: `200px`,
          title: c
        });
      } else {
        self.push({
          x: 0,
          y: 0,
          w: 2,
          h: 6,
          i: String(self.length),
          wPx: `200px`,
          hPx: `200px`,
          title: c
        });
      }
      let last = Object.keys(this.layout).length - 1;
      switch (c) {
        case "pie":
          this.newChartData(self, last);
          break;
        case "gauge":
          this.gaugeData[self[last].i] = {
            columns: ["type", "a", "b", "value"],
            rows: [{ type: "速度", value: 0, a: 1, b: 2 }]
          };
          this.$message({
            type: "success",
            message: "你訂閱的value: " + topic
          });
          this.chart_mqtt(self, topic, c, last);

          break;
        case "scatter":
          this.newChartData(self, last);
          break;
        case "line":
          this.newChartData(self, last);
          break;
        case "histogram":
          this.newChartData(self, last);
          break;
      }
    },
    newChartData(self, last) {
      let date = Vue.moment().format("YYYY/MM/DD");

      let d = Vue.moment().format("hh:mm:ss");
      console.log(d);
      this.chartData[self[last].i] = {
        columns: ["日期", "生理數據"],
        rows: [{ 日期: d, 生理數據: 0 }]
      };
    },
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      this.layout[i].wPx = `${newWPx}px`;
      this.layout[i].hPx = `${newHPx}px`;
    },
    itemClose(index) {
      let self = this.layout;
      let len = self.length;
      for (let idx = 0; idx <= len; idx++)
        if (index === this.layout[idx].i) {
          this.layout.splice(idx, 1);
          break;
        }
    },
    changeMask() {
      this.mask["deleteMask"] = this.mask["deleteMask"] ? false : true;
    }
  },
  beforeDestroy() {
    /*
    charts -> this.layout
    chart_attach -> gague, chart (type判斷)
    */
    const layout = JSON.stringify(this.layout);
    const gague = JSON.stringify(this.gaugeData);
    const chart = JSON.stringify(this.chartData);
    let client = MQTT.connect("mqtt://iotser.iots.tw:8083");
    client.end();
    let id = this.$localStorage.get("id");
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
