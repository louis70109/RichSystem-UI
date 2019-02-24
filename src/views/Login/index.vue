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
      this.axios
        .post(`${this.backend_ip}/v1/users/login`, {
          account: this.user.account,
          password: this.user.password
        })
        .then(res => {
          if (res.data.status === true) {
            let d = res.data;
            this.btnStatus = false;
            this.$localStorage.set("user_id", d.id);
            this.$localStorage.set("user_token", d.token);
            this.$router.push("Charts");
          } else {
            alert("帳號或密碼輸入錯誤");
            this.btnStatus = false;
          }
        })
        .catch(err => {
          alert("帳號或密碼輸入錯誤");
          this.btnStatus = false;
        });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
