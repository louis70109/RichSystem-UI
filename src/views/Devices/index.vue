<script>
import axios from "axios"
import vueJsonEditor from 'vue-json-editor'


export default {
  name: 'devices',
  components: {
    vueJsonEditor
  },
  data() {
    return{
      host: "http://54.255.183.109:3333/DEV_Send",
      /*
      COMMAND:
      0x86 防盜器狀態讀取
      0x50 增加使用者
      0x51 刪除使用者
      0x52 讀回使用者
      0x53 增加使用者開門時控
      0x5A 使用者遠端開門
      0x5F 取得暫存UID
      0x60 讀取紀錄
      0x61 刪除紀錄
      0xC0 設定裝置日期時間
      0xC1 遠端控制
      0xC2 開門方式時間
      0xC3 自動開門參數
      0xC4 開位偵測功能
      */
      options: [
        {value: "0x06", data: "1"}, 
        {value: "0x50", data: "3,5,80,2,222222.111111,2018-08-09-11-41-00.2020-08-09-11-41-00"}, 
        {value: "0x51", data: "1,4,12345678"}, 
        {value: "0x86", data: ""},
        {value: "0x52", data: "4"}, 
        {value: "0x53", data: "3,5,12345678.87654321,2019-08-09-15-46-00.2021-08-09-15-46-00"}, 
        {value: "0x5A", data: "3,12345678.87654321"}, 
        {value: "0x5F", data: ""},
        {value: "0x60", data: ""}, 
        {value: "0x61", data: ""}, 
        {value: "0xC0", data: "2018-08-08-08-08-08"}, 
        {value: "0xC1", data: "2018-08-08-08-08-08"}, 
        {value: "0xC2", data: "1,60"}, 
        {value: "0xC3", data: "0,00:00-08:00,08:00-16:00,16:00-24:00"}, 
        {value: "0xC4", data: "1,30,1,60"}
      ],
      request: {
        'COMMUNICATION': {
          'TYPE': 'NDT',
          'DEVICE_ID': 'BMDIOT-000173-HHBBZ'
        },
        'DEVICE_TYPE': 'MCS',
        'COMMAND': "",
        'DATA': "",
        'TOKEN': 'fffeb7d4f3476b11123f05555fd07a65'
      },
      response: "",
      res_command: "",
      res_data: "",
    }
  },
  computed: {
    stuffInpput:{
      get(){ return this.res_command },
      set(val){
        this.res_command = val
        this.res_data = this.findValue(val)
        this.response = ""
      }
    },
    axiosShow(){
      if(this.res_command != "") return true
      else return false
    }
  },
  methods: {
    api_judge(CMD) {
        switch (CMD){
          case '0x06': 
            this.api_post("0x06", this.res_data)
            break
          case '0x86':
            this.api_post("0x86", this.res_data)
          break
          case '0x50':
            this.api_post("0x50", this.res_data)
            break
          case '0x51': 
            this.api_post("0x51", this.res_data)
            break
          case '0x52': 
            this.api_post("0x52", this.res_data)
            break
          case '0x53': 
            this.api_post("0x53", this.res_data)
            break
          case '0x5A': 
            this.api_post("0x5A", this.res_data)
            break
          case '0x5F': 
            this.api_post("0x5F", this.res_data)
            break
          case '0x60': 
            this.api_post("0x60", this.res_data)
            break
          case '0x61': 
            this.api_post("0x61", this.res_data)
            break
          case '0xC0': 
            this.api_post("0xC0", this.res_data)
            break
          case '0xC1': 
            this.api_post("0xC1", this.res_data)
            break
          case '0xC2': 
            this.api_post("0xC2", this.res_data)
            break
          case '0xC3': 
            this.api_post("0xC3", this.res_data)
            break
          case '0xC4': 
            this.api_post("0xC4", this.res_data)
            break
        }  
    },
    api_post(req_cmd, req_data){
      this.request.COMMAND = req_cmd
      if(req_data == null || req_data == undefined)
        this.request.DATA = ""
      else this.request.DATA = req_data
      
      axios.post(this.host, this.request).then((res) => {
        if(res.data.RESULT == "1"){
          this.response = res.data
        }
      });
    },
    findValue(req){
      let val = this.options
      for(let i = 0 ;i < val.length; i++)
        if(val[i].value == req){
          this.req_data = val[i].data
          return val[i].data
        }
    }
  }
}
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>
