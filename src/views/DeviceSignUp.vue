<template>
  <div>
    <form @submit.prevent="submitForm">
      <input
        id="input_phone"
        class="liff-input"
        type="text"
        v-model="profile.did"
        placeholder="裝置序號"
        required
      >
      <input class="liff-input" type="text" v-model="profile.token" placeholder="授權碼" required>
      <button class="btn btn-primary btn-submit" type="submit">送出</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "DeviceSignUp",
  components: {},
  data: () => ({
    profile: {
      userId: "",
      displayName: "",
      pictureUrl: "",
      statusMessage: "",
      did: "",
      token: "",
      status: 0
    }
  }),
  mounted() {
    document.getElementById("input_phone").focus();
  },
  methods: {
    submitForm() {
      this.axios
        .get(`https://a00ec5b4.ngrok.io/v1/devices/${this.profile.did}`)
        .then(res => {
          if (res.data.length === 0) {
            let _this = this;
            this.$liff
              .getProfile()
              .then(profile => {
                profile.did = _this.profile.did;
                profile.token = _this.profile.token;
                profile.status = _this.profile.status;
                _this.profile = profile;
                this.axios
                  .post("https://a00ec5b4.ngrok.io/v1/devices", {
                    did: _this.profile.did,
                    token: _this.profile.token,
                    user_id: _this.profile.userId,
                    status: _this.profile.status
                  })
                  .then(res => {
                    this.sendMsgToUser(
                      `${_this.profile.displayName}的裝置註冊成功！`
                    );
                  });
              })
              .catch(error => {
                alert("Error getting profile: " + error);
              });
          } else {
            alert("裝置已存在");
          }
        })
        .catch(err => {
          alert("Error getting axios: " + error);
        });
    },
    sendMsgToUser(msg) {
      this.$liff
        .sendMessages([
          {
            type: "text",
            text: msg
          }
        ])
        .then(() => {
          this.$liff.closeWindow();
        })
        .catch(error => {
          alert("Error sending message: " + error);
        });
    },
    openWindow() {
      this.$liff.openWindow({
        url: "https://developers.line.me/en/docs/liff/overview/"
      });
    },
    closeWindow() {
      this.$liff.closeWindow();
    },
    sendMessage() {
      this.$liff
        .sendMessages([
          {
            type: "text",
            text: "You/'ve successfully sent a message! Hooray!"
          },
          {
            type: "sticker",
            packageId: "2",
            stickerId: "144"
          }
        ])
        .then(() => {
          window.alert("Message sent");
        })
        .catch(error => {
          window.alert("Error sending message: " + error);
        });
    },
    getProfile() {
      let _this = this;
      this.$liff
        .getProfile()
        .then(profile => {
          _this.profile = profile;
        })
        .catch(error => {
          alert("Error getting profile: " + error);
        });
    }
  }
};
</script>
<style lang="scss">
.btn-submit {
  display: block;
  margin: 0 auto;
}
</style>
