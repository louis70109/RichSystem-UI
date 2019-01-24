<script>
import SideBar from "../../components/sidebar.vue";
export default {
  name: "login",
  components: {
    SideBar
  },
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      btnStatus: false
    };
  },
  methods: {
    submitForm() {
      this.btnStatus = true;
      this.$axios
        .post("http://louis70109.asuscomm.com:3000/users/login", {
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
