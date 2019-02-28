<template>
  <span id="logout">
    <el-button
      @click="user_logout"
      type="warning"
      round
    >登出</el-button>
  </span>
</template>

<script>
export default {
  name: "logout",
  methods: {
    user_logout() {
      this.$localStorage.remove("user_id");
      this.$localStorage.remove("user_token");
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss">
.logout {
  display: inline-block;
}
</style>
