<template>
  <div id="app">
    <!-- <p>share page</p> -->
    <div class="registerForm">
      <!-- <mt-cell title="标题文字"></mt-cell> -->
      <p class="inviter item">来自<span>{{inviterInfo.nickname}}</span>的邀请</p>
      <mt-field label="手机号" placeholder="请输入手机号" v-model="phone" class="item" :state="formState[0]"></mt-field>
      <mt-field label="用户名" placeholder="请输入用户名" v-model="nickname" class="item" :state="formState[1]"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" class="item" :state="formState[2]">(6位以上)</mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" v-model="checkCode" class="item" :state="formState[3]">
        <mt-button type="primary" class="checkcode-btn" @click="getCheckcode" :disabled="isChecking">{{checkCodeMsg}}</mt-button>
      </mt-field>
      <p v-show="registerMsg" class="registerMsg">{{registerMsg}}</p>
      <mt-button type="primary" class="registerBtn item" @click="register" size="normal">立即注册</mt-button>
    </div>
    <p class="title">今朝讲坛是什么</p>
    <div class="description">一个丰富自己知识面的平台，提供直播.视屏在线学习的服务，增加自己的知识面，为未来写下伏笔</div>
  </div>
</template>
<script type="text/javascript">
import Vue from 'vue'
export default {
  data() {

    return {
      phone: null,
      nickname: null,
      password: null,
      checkCode: null,
      inviterInfo: null,
      errorMsg: null,
      formState: [],
      isChecking: false,
      checkCodeMsg: '获取',
      registerMsg:null
    }
  },
  created() {
    // this.$axios('/')
  },
  computed: {
    errorState() {
      return !!this.errorMsg
    }
  },
  mounted() {

    let items = window.location.href.split('?')[1].split('&'),
      inviteCode = items[0].split('=')[1],
      inviterId = items[1].split('=')[1]
    this.$axios.post('public/getUserInfoById', {
      user_id: inviterId
    }).then(({ data }) => {
      this.inviterInfo = data.data
    })
    /*        console.log(this.$route.params)
            console.log(window.location.host)*/
  },
  methods: {
    validate() {
      this.formState = []
      if (!this.phone)
        Vue.set(this.formState, 0, "error")
      if (!this.nickname)
        Vue.set(this.formState, 1, "error")
      if (!this.checkCode)
        Vue.set(this.formState, 3, "error")
      if (!this.password || this.password.length < 6)
        Vue.set(this.formState, 2, "error")
      console.log(this.formState)
    },
    register() {
      let errorMsg = this.validate()
      /*      if (errorMsg) {
              this.errorMsg = errorMsg
              this.formState[2]="error"
            } else {

            }*/
    },
    getCheckcode() {
      if (!this.phone) {
        this.registerMsg = "手机号不能为空"
        return
      }
      let vm = this,
        start = 60
      this.$axios.post('/public/sendCheckcode', {
        mobile: this.phone,
        templatecode: 'tp_code1'
      }).then(function({ data }) {
        if (data.code === 1) {
          vm.isChecking = true

          function count() {
            start--
            vm.checkCodeMsg = `${start}`
            if (start > 0)
              setTimeout(count, 1000)
            else {
              vm.checkCodeMsg = '获取'
              vm.isChecking = false
            }
          }
          count()
        } else {
          vm.registerMsg = data.str
        }
      })
    },
  }
}

</script>
<style scoped lang="scss" style="css/text">
@function px2rem($px) {
  $rem: 75px;
  @return ($px/$rem)+rem;
}

#app {
  width: px2rem(750px);
  height: px2rem(1206px); // background-color: red;
  background: url(./assets/background.jpg);
  background-size: 100% 100%;
  position: relative;
  .registerForm {
    text-align: center;
    width: 5.8rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 18%;
    .inviter {
      text-align: center;
      span {
        color: #ffeda0;
        font-weight: bold;
      }
    }
    .checkcode-btn {
      /*       float:right;
      margin-right: 10px; */
    }
    .item {
      margin-bottom: 0.13rem; // background-color: transparent;
    }
    .registerBtn {
      display: inline-block; // margin: 0 auto;
      /*       height: auto;
      margin-top: 0.4rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%); */
    }
  }
  .title {
    position: absolute;
    top: px2rem(685px);
    left: 50%;
    transform: translateX(-55%);
    color: #756bb1;
    font-weight: bold;
  }
  .registerMsg {
    font-size: px2rem(23px);
  }
  .description {
    position: absolute;
    top: px2rem(750px);
    margin: 0 px2rem(100px);
    font-size: px2rem(23px);
  }
}

</style>
