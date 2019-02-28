<script>
import Vue from "vue";
import LineLogin from "../../components/linelogin.vue";

export default {
  name: "login",
  components: {
    LineLogin
  },
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      btnStatus: false,
      backend_ip: "https://iotser.iots.tw"
    };
  },
  methods: {
    submitForm() {
      this.btnStatus = true;
      this.$store.dispatch("loginUser", {
        account: this.user.account,
        password: this.$md5(this.user.password)
      });
      this.btnStatus = false;
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
