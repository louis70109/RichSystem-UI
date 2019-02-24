<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  beforeCreate() {
    this.$liff.init(function(data) {});
  }
};
</script>

<style lang="scss">
.liff-input {
  display: block;
  margin: 10px auto;
  padding: 10px;
}
</style>
