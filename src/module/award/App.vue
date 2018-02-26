<template>
  <div id="app">
    <div class="header">
      <img src="./assests/water.jpg">
      <div class="content">
        <div>五水共治 你我共同 参与</div>
        <div>今朝讲坛 湖州政府 宣传</div>
      </div>
    </div>
    <div class="body">
      <div class="form">
        <div class="title item">今朝讲坛</div>
        <mt-field  label="手机号" placeholder="请输入手机号" v-model="phone" class="item"></mt-field>
        <mt-button type="primary" class="registerBtn item" @click="register" size="normal">领取</mt-button>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      phone: ""
    }
  }
}

</script>
<style type="text/css" scoped lang="scss">
@import './award.scss';
#app {
  .header {
    img {
      height: px2rem(250px);
      width: px2rem(500px);
      margin: 0 auto;
      display: block;
    }
    .content {
      text-align: center;
    }
  }
  .body {
    width: px2rem(750px);
    height: px2rem(700px);
    position: relative;
    background: url(./assests/background.jpg);
    background-size: cover;
    .form {
      text-align: center;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: px2rem(325px); 
      .item {
        margin-bottom:30px; // background-color: transparent;
      }
      .title{
      	font-size:40px;
      }
    }
  }
}

</style>
