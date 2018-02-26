<template>
  <div class="login-form">
    <mt-field label="账号" placeholder="请输入账号" v-model="account"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" v-model="password"></mt-field>
    <span>{{account}}</span>
    <span>{{password}}</span>
    <span>{{status}}</span>
    <span>{{tmpUrl}}</span>
    <span>{{cookie}}</span>
    <span>{{name}}</span>
    <p v-show="loginMsg" class="loginMsg">{{loginMsg}}</p>
    <mt-button type="primary" size="large" @click="login">登录</mt-button>
    <mt-button type="primary" size="large" @click="isLogin">是否登录</mt-button>
    <mt-button type="danger" size="large" @click="testCookie">cookie</mt-button>
    <mt-button type="default" size="large" @click="testRoute">route</mt-button>
  </div>
</template>
<script type="text/javascript">
import $ from 'jquery'
export default {
  data() {
    return {
      account: "",
      password: "",
      loginMsg: "",
      status: "fail",
      cookie: "",
      name: ""
    }
  },
  computed: {
    tmpUrl() {
      return this.$store.state.tmpUrl
    }
  },
  methods: {
    login() {
      let vm = this
      console.log('login')

      // vm.$router.push('/')
      this.$axios.post('public/login', {
        account: this.account,
        password: this.password
      }).then(function({ data }) {
        console.log(vm.tmpUrl)
        if (data.code === 1) {
          vm.status = "success"
          vm.$store.commit('SET_STATUS', 'onLine')
          vm.$store.commit('SET_USERINFO', data.data)
          vm.$router.go(-1)
          // window.location.href=vm.tmpUrl
          // vm.$router.push('/')
        } else {
          vm.loginMsg = data.str
        }
      })
    },
    isLogin() {
/*      $.ajax({
        url: 'http://hyh.bojiatouzi.com/public/islogin',
        type: 'POST',
      })
      .done(function() {
      })*/
      
      this.$axios.post('/public/islogin').then(function({ data }) {
        if (data.code === 0) {
        }
      })

    },
    testCookie() {
      this.$axios.post('http://192.168.1.101:3000/users/cookie').then(({ data }) => {

      })
    },
    testRoute() {
      this.$axios.post('http://192.168.1.101:3000/users/').then(({ data }) => {
        this.name = data.name
      })
    }
  },
  mounted() {
    let vm = this
    this.$axios.post('/public/islogin').then(function({ data }) {
      if (data.code === 0) {
        vm.cookie = "yes"
      } else {
        vm.cookie = "no"
      }
    })
  }
}

</script>
<style type="text/css" scoped lang="scss">
@import "../index.scss";
.login-form {
  font-size: 32px;
  .loginMsg {
    font-size: px2rem(23px);
    color: red;
  }
}

</style>
