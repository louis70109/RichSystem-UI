<template>
  <div>
    <h4>裝置註冊</h4>
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
  name: "DeviceSignUp",
  components: {},
  data: () => ({
    profile: { userId: "", displayName: "", pictureUrl: "", statusMessage: "" },
    user: {
      id: "",
      account: "",
      password: "",
      line: "",
      token: ""
    },
    device: [
      {
        id: null,
        token: ""
      }
    ],
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
              this.user = res.data.users;
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
          if (res.data.status && res.data.devices.user_id === 0) {
            this.device = res.data.devices;
            let _this = this;
            this.$liff
              .getProfile()
              .then(profile => {
                this.axios
                  .post(
                    `${this.backend_ip}/v1/devices/${_this.device.id}/${
                      _this.device.token
                    }`,
                    { user_id: _this.user.id }
                  )
                  .then(r => {
                    if (r.data.status) {
                      _this.$liff
                        .sendMessages([
                          {
                            type: "text",
                            text: `裝置編號 ${_this.device.id} 註冊成功`
                          }
                        ])
                        .then(() => {
                          _this.$liff.closeWindow();
                        })
                        .catch(error => {
                          alert("Error sending message: " + error);
                        });
                    } else alert("註冊失敗");
                  });
              })
              .catch(error => {
                alert("Error getting profile: " + error);
              });
          } else alert("裝置註冊失敗");
        });
    }
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
  }
};
</script>
<style lang="scss">
.btn-submit {
  display: block;
  margin: 0 auto;
}
</style>
