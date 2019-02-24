<template>
  <div id="linelogin">
    <el-button
      @click="oAuth2"
      type="success"
      round
    >Line</el-button>
  </div>
</template>

<script>
export default {
  name: "linelogin",
  methods: {
    oAuth2() {
      let URL = "https://access.line.me/oauth2/v2.1/authorize?";
      URL += "response_type=code";
      URL += `&client_id=1645350256`;
      URL += `&redirect_uri=https://iotser.iots.tw/v1/auth/line`;
      URL += "&scope=openid%20profile%20email";
      URL += "&state=93873836f8a54ee8b4d5998a2823f515";
      window.location.href = URL;
    }
  }
};
</script>

<style lang="scss">
</style>
