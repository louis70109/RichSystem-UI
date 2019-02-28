<script>
import Logout from "../../components/logout.vue";
import { mapGetters } from "vuex";
export default {
  name: "devices",
  components: {
    Logout
  },
  data() {
    return {
      deviceData: [],
      form: {
        name: "",
        did: "",
        token: ""
      },
      dialogDevice: false,
      dialogData: false,
      formLabelWidth: "120px",
      mqttTopicKey: "",
      backend_ip: "https://iotser.iots.tw",
      user: this.$store.getters.getUser,
      chartData: {
        columns: [],
        rows: []
      }
    };
  },
  mounted() {
    let id = this.$localStorage.get("user_id");
    this.axios
      .get(`${this.backend_ip}/v1/users/${id}/devices`)
      .then(res => {
        let d = this.deviceData;
        let r = res.data;
        if (r.status === true) {
          r.devices.forEach(el => {
            d.push({
              id: el.id,
              name: el.name,
              did: el.did,
              device_type: el.device_type.toUpperCase(),
              device_config: el.device_config,
              device_data: el.device_data,
              online: el.online,
              token: el.token,
              updated_at: el.updated_at
            });
          });
        } else {
          console.log("尚無裝置");
        }
      })
      .catch(err => {
        console.log("資料沒抓到", err);
      });
  },
  methods: {
    deviceChartData(device_data) {
      this.chartData.columns = ["date"];
      this.chartData.rows = [];
      let device = JSON.parse(device_data);
      let device_map = { date: "1" };

      Object.keys(device).map((obj, idx) => {
        if (typeof device[obj] === "number") {
          this.chartData.columns.push(obj);
          console.log(device_map["date"]);
          device_map[obj] = device[obj];
        }
      });
      this.chartData.rows.push(device_map);
    },
    createDevice() {
      this.axios
        .get(`${this.backend_ip}/v1/devices/${this.form.did}`, {
          headers: { "Domain-Token": "1vv1233b67jnn5a06dd7ggga15" }
        })
        .then(res => {
          let r = res.data;
          if (r.status === true && r.devices.user_id === 0) {
            this.axios
              .post(
                `${this.backend_ip}/v1/devices/${r.devices.id}/${
                  this.form.token
                }`,
                {
                  user_id: this.user.id,
                  name: this.form.name,
                  created_user: this.user.id
                }
              )
              .then(resp => {
                if (resp.data.status === true) window.location.reload();
              });
          } else {
            alert("此裝置已被註冊");
          }
        })
        .catch(err => alert(`出現錯誤 ${err}`));
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
