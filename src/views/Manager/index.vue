<script>
export default {
  name: "manager",
  data() {
    return {
      user: this.$store.getters.getUser,
      ip: this.$store.getters.getIP
    };
  },
  mounted() {
    if (this.user.level > 2) {
      this.axios
        .get(`${this.backend_ip}/v1/devices`)
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
    } else this.$router.push("/");
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
