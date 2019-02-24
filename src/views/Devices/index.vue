<script>
export default {
  name: "devices",
  data() {
    return {
      deviceData: [],
      form: {
        did: "",
        token: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      mqttTopicKey: "",
      backend_ip: "https://iotser.iots.tw"
    };
  },
  created() {
    let id = this.$localStorage.get("user_id");
    this.axios
      .get(`${this.backend_ip}/v1/users/${id}/devices`)
      .then(res => {
        let r = res.data;
        let d = this.deviceData;
        if (r.status === true) {
          r.devices.forEach(el => {
            d.push({
              name: el.name,
              did: el.did,
              token: el.token,
              updated_at: el.updated_at
            });
          });
        } else {
          console.log("資料沒抓到");
        }
      })
      .catch(err => {
        console.log("資料沒抓到", err);
      });
  },
  methods: {
    generateKey() {
      //axios
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
