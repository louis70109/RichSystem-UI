<template>
  <div>

    <el-form
      ref="device"
      :model="device"
      label-width="80px"
    >
      <el-form-item label="編號">
        <el-input v-model="device.id"></el-input>
      </el-form-item>
      <el-form-item label="授權碼">
        <el-input v-model="device.token"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
        >送出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "DeviceAccess",
  data: () => ({
    device: {
      id: "",
      token: ""
    },
    profile: { userId: "", displayName: "", pictureUrl: "", statusMessage: "" },
    users: {
      id: "",
      account: "",
      password: "",
      line: "",
      token: ""
    },
    backend_ip: "https://iotser.iots.tw"
  }),
  mounted() {
    setInterval(() => {
      this.$liff
        .getProfile()
        .then(profile => {
          this.profile = profile;
          this.axios
            .get(
              `${this.backend_ip}/v1/line/${this.profile.userId}?name=${
                this.profile.displayName
              }`,
              { headers: { "Domain-Token": "1vv1233b67jnn5a06dd7ggga15" } }
            )
            .then(res => {
              this.users = res.data.users;
            });
        })
        .catch(error => {
          alert("Error getting profile: " + error);
        });
    }, 2000);
  },
  methods: {
    submitForm() {
      this.axios
        .get(`${this.backend_ip}/v1/devices/find/${this.device.id}`, {
          headers: { "Domain-Token": "1vv1233b67jnn5a06dd7ggga15" }
        })
        .then(res => {
          let r = res.data;
          if (
            r.status &&
            r.devices.user_id !== 0 &&
            r.devices.token === this.device.token
          ) {
            this.axios
              .post(
                `${this.backend_ip}/v1/devices/${this.device.id}/${
                  this.device.token
                }`,
                { user_id: this.users.id }
              )
              .then(r => {
                if (r.data.status) {
                  this.$liff
                    .sendMessages([
                      {
                        type: "text",
                        text: `裝置編號${r.data.devices.id}授權成功`
                      }
                    ])
                    .then(() => {
                      this.$liff.closeWindow();
                    })
                    .catch(err => {
                      alert("授權失敗");
                    });
                } else alert("授權失敗");
              });
          } else {
            alert("裝置尚未註冊");
          }
        })
        .catch(err => {
          alert("裝置授權失敗");
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
        .then(function() {
          window.alert("Message sent");
        })
        .catch(function(error) {
          window.alert("Error sending message: " + error);
        });
    },
    getProfile() {
      let _this = this;
      this.$liff
        .getProfile()
        .then(function(profile) {
          _this.profile = profile;
        })
        .catch(function(error) {
          alert("Error getting profile: " + error);
        });
    }
  }
};
</script>
