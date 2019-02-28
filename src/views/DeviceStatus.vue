<template>
  <el-table
    :data="devices"
    height="380"
    width="100"
  >
    <el-table-column
      fixed
      prop="id"
      label="編號"
      width="80"
    >
    </el-table-column>

    <el-table-column
      prop="did"
      label="裝置序號"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="token"
      label="授權碼"
      width="120"
    >
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="renderToken(scope.row.id, scope.row.token)"
        >點我</el-button>
      </template>
    </el-table-column>
    <el-table-column
      prop="online"
      label="狀態"
      width="60"
    >
      <template slot-scope="scope">
        <el-tag
          @click="publishOnline(scope.row)"
          :type="scope.row.online === 1? 'success' : 'info'"
          disable-transitions
        >{{scope.row.online ? "on" : "off"}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
let MQTT = require("mqtt");

export default {
  name: "DeviceStatus",
  data: () => ({
    profile: { userId: "", displayName: "", pictureUrl: "", statusMessage: "" },
    devices: [
      {
        id: null,
        name: "",
        did: "",
        token: "",
        user_id: null,
        device_type: "",
        device_data: "",
        device_config: "",
        group_id: null,
        manager_id: null,
        online: null,
        public: null,
        create_user: "",
        update_user: "",
        created_at: "",
        updated_at: ""
      }
    ],
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
              this.axios
                .get(`${this.backend_ip}/v1/users/${this.users.id}/devices`)
                .then(r => {
                  this.devices = r.data.devices;
                });
            });
        })
        .catch(error => {
          alert("Error getting profile: " + error);
        });
    }, 1500);
  },
  methods: {
    renderToken(id, token) {
      this.$liff
        .sendMessages([
          {
            type: "text",
            text: `裝置編號${id}授權碼為`
          },
          {
            type: "text",
            text: token
          }
        ])
        .then(() => {
          alert("授權碼已傳送");
        })
        .catch(err => {
          alert("Error sending message: " + error);
        });
    },
    publishOnline(row) {
      let status = row.online;
      if (status === 1) status = 0;
      else status = 1;
      this.axios
        .post(`${this.backend_ip}/v1/mqtt`, {
          id: row.id.toString(),
          token: row.token,
          online: status.toString()
        })
        .then(res => {});
    }
  }
};
</script>

<style lang="scss">
.table-rwd {
}
/*這是額外做顏色，沒有什麼意義*/
tr.tr-only-hide {
  color: #d20b2a;
}

@media (max-width: 736px) {
  .table-rwd {
    min-width: 100%;
  }
  /*針對tr去做隱藏*/
  tr.tr-only-hide {
    display: none !important;
  }
  /*讓tr變成區塊主要讓他有個區塊*/
  .table-rwd tr {
    display: block;
    border: 1px solid #ddd;
    margin-top: 5px;
  }
  .table-rwd td {
    text-align: left;
    font-size: 15px;
    overflow: hidden;
    width: 100%;
    display: block;
  }
  .table-rwd td:before {
    /*最重要的就是這串*/
    content: attr(data-th) " : ";
    /*最重要的就是這串*/
    display: inline-block;
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 10px;
    color: #d20b2a;
  }

  /*當RWD縮小的時候.table-bordered 會有兩條線，所以針對.table-bordered去做修正*/
  .table-rwd.table-bordered td,
  .table-rwd.table-bordered th,
  .table-rwd.table-bordered {
    border: 0;
  }
}
</style>
