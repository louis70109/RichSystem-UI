<template>
  <div class="table-responsive">
    <table class="table table-striped table-bordered table-rwd">
      <thead>
        <tr class="tr-only-hide">
          <th scope="col">#</th>
          <th scope="col">裝置編號</th>
          <th scope="col">狀態</th>
          <th scope="col">密鑰</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d, index) in devices" :key="index">
          <td data-th="#">{{d.id}}</td>
          <td data-th="裝置編號">{{d.did}}</td>
          <td data-th="裝置狀態">{{d.status ? "ON" : "OFF"}}</td>
          <td data-th="授權密鑰">
            <button class="btn-sm btn-primary" @click="rederToken(d.token)">授權</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "DeviceStatus",
  data: () => ({
    devices: [],
    profile: { userId: "", displayName: "", pictureUrl: "", statusMessage: "" }
  }),
  mounted() {
    setInterval(() => {
      this.axios.get("https://a00ec5b4.ngrok.io/v1/devices").then(res => {
        this.devices = res.data;
      });
    }, 1000);
  },
  methods: {
    rederToken(token) {
      let _this = this;
      this.$liff
        .getProfile()
        .then(profile => {
          this.profile = profile;
          this.$liff
            .sendMessages([
              {
                type: "text",
                text: `授權鑰匙為`
              },
              {
                type: "text",
                text: token
              }
            ])
            .then(() => {
              this.$liff.closeWindow();
            })
            .catch(err => {
              alert("Error sending message: " + error);
            });
        })
        .catch(error => {
          alert("Error getting profile: " + error);
        });
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
