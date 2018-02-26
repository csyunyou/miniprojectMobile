<template>
  <div class="videoPlayer-wrapper">
    <div class="header">
      <div class="item" @click="logout">
        <img src="../assets/exit.png" height="50" width="50">
        <span>退出</span>
      </div>
      <div class="item">
        <img src="../assets/money.png" height="50" width="50">
        <span>{{award}}</span>
      </div>
      <div class="item" @click="signIn">
        <img src="../assets/signin.png" height="50" width="50">
        <span>签到</span>
      </div>
      <div style="clear: both;"></div>
    </div>
    <video id="video-player" class="video-js vjs-big-play-centered">
      <!-- <source src="http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8" type="application/x-mpegURL"> -->
      <!-- <source src="http://192.168.1.101:8010/hls/room.m3u8" type="application/x-mpegURL"> -->
      <!-- <source src="http://hyh.bojiatouzi.com/Uploads/video/test.mp4" type="video/mp4"> -->
      <!-- <source src="http://hyh.bojiatouzi.com/uploads/video/?user_id=3&vid=54" type="video/mp4"> -->
      <!-- <source src="http://dlhls.cdn.zhanqi.tv/zqlive/22578_yKdJM.m3u8" type="application/x-mpegURL"> -->
    </video>
    <div class="videoInfo">
      <div class="left-panel">
        <div class="row">
          <div v-if="videoInfo.type==='2'">视屏</div>
          <div v-else-if="videoInfo.type==='1'">直播</div>
          <div>{{videoInfo.title}}</div>
          <div>12:00-14:00</div>
        </div>
        <div class="row">
          <div class="speaker">
            <span>主讲人:</span>
            <span>{{videoInfo.speaker}}</span>
          </div>
          <div class="host">
            <span>主讲人:</span>
            <span>黄文达</span>
          </div>
        </div>
        <div class="row">
          <div class="place">
            <span>来自:</span>
            <span>火星</span>
          </div>
        </div>
      </div>
      <div class="right-panel">
        12额度
      </div>
    </div>
    <div class="recommendation">
      <div class="live-broadcast">
        <div class="title">
          <h4>今日直播类：</h4>
        </div>
        <ul>
          <li v-for="item in 3">
            <span>JS高程</span>
            <span>18/02/12</span>
            <span>云游</span>
          </li>
        </ul>
      </div>
      <div class="live-broadcast">
        <div class="title">
          <h4>今日视屏类：</h4>
        </div>
        <ul>
          <li v-for="item in 3">
            <span>JS高程</span>
            <span>18/02/12</span>
            <span>云游</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div>{{ $route.params.id }}</div> -->
  </div>
</template>
<script type="text/javascript">
// import videojs from 'video.js'
const videojs = window.videojs;
require('videojs-flash')
require('videojs-contrib-hls/dist/videojs-contrib-hls')
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      videoOpts: {
        // height:100,
        // width: 1000,
        fluid: true,
        // aspectRatio: "4:3",
        controls: true,
        preload: "auto",
        poster: "http://ppt.downhot.com/d/file/p/2014/08/12/9d92575b4962a981bd9af247ef142449.jpg"

      },
      award: "",
      videoPlayer: null,
      videoInfo: {},
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    logout() {
      let vm = this
      this.$axios.post('public/logout').then(function(data) {
        vm.$store.commit('SET_USERINFO', {})
        vm.$store.commit('SET_STATUS', "offLine")
      })
    },
    signIn() {
      // MessageBox('Notice', 'You clicked the button');
      this.$axios.post('/user/signIn', {
        user_id: this.userInfo.userid
      }).then(function({ data }) {
        if (data.code === 0) {
          MessageBox('签到失败',data.str)
/*          vm.$alert(data.str, '签到失败', {
            type: 'error',
            center: true
          })*/
        } else {
          MessageBox('签到成功',`恭喜您，获得${data.data.discount}折优惠券,有效期至${data.data.expiredate}`)
/*          vm.$alert(`恭喜您，获得${data.data.discount}折优惠券,有效期至${data.data.expiredate}`, '签到成功', {
            type: 'success',
            center: true
          })*/
        }
      })
    }
  },
  mounted() {
    let vm = this
    this.$axios.post('user/getWallet', {
      user_id: this.userInfo.userid
    }).then(({ data }) => {
      this.award = data.data.award
    })
    this.videoPlayer = videojs('video-player', this.videoOpts)
    this.videoPlayer.on('ready', e => {
      this.$axios.post('public/getVideoInfoById', {
        id: this.$route.query.id
      }).then(({ data }) => {
        this.videoInfo = data.data
        if (this.videoInfo.type === '2') {
          this.$axios.post('user/haveVideoAccess', {
            user_id: this.userInfo.userid,
            // vid: this.selectedVideo.id
            vid: this.$route.query.id
          }).then(function({ data }) {
            if (data.data.is_allow === 1) {
              console.log('playVideo')
              vm.videoPlayer.src({ type: 'video/mp4', src: `http://hyh.bojiatouzi.com/uploads/video/?user_id=${vm.userInfo.userid}&vid=${vm.$route.query.id}` })
            } else {
              console.log('not allowed')
              const display = vm.videoPlayer.getChild('errorDisplay');
              display.el().classList.remove('vjs-hidden')
              let div = document.createElement('div')
              div.classList.add('payTip')
              vm.$axios.post('user/getAllValidCoupon', {
                user_id: vm.userInfo.userid
              }).then(function({ data }) {
                vm.validCoupons = data.data
                let optsStr = `
                  <option value="null">不使用</option>
                `
                vm.validCoupons.forEach(function(coupon) {
                  optsStr += `<option value=${coupon.id}>${coupon.discount}折,有效期至${coupon.expiredate}</option>`
                })
                div.innerHTML =
                  `
                <div class='title'>此视屏需要${vm.videoInfo.price}额度哦！</div>
                <div class="couponSelector">
                <label>可以使用：</label>
                <select name="coupons" id="coupon-selector">
                ${optsStr}
                </select>
                </div>
              `
                let footer = document.createElement('div'),
                  confirmBtn = document.createElement('button')
                confirmBtn.innerHTML = '确定'
                confirmBtn.addEventListener('click', e => {

                  let selectElem = document.getElementById('coupon-selector')

                  let coupon = {
                    user_id: vm.userInfo.userid,
                    vid: vm.videoInfo.id,
                  }
                  if (selectElem.options[selectElem.selectedIndex].value !== "null")
                    coupon['coupo_id'] = selectElem.options[selectElem.selectedIndex].value
                  console.log(coupon)
                  vm.$axios.post('user/buyVideo', coupon).then(function({ data }) {
                    if (data.code === 1) {
                      location.reload()
                      // display.contentEl().innerHTML = "<div class='payTip'>购买视屏成功，请刷新页面观看视屏</div>"
                    } else
                      display.contentEl().innerHTML = "<div class='payTip'>购买视屏失败!</div>"
                  })

                })
                footer.appendChild(confirmBtn)
                div.appendChild(footer)
                display.contentEl().appendChild(div)

              })
            }

          })
        } else {
          this.videoPlayer.src({ type: 'rtmp/flv', src: "rtmp://localhost:1935/live1/room" })
        }
      })
    })
    // this.videoPlayer.play()
    /*    if (this.$route.query.type === "vod") {
          this.videoInfo = {
            title: "如何高效地学习",
            date: "2016-03-01",
            speaker: "旋律",
            link: "http://192.168.155.1:3001/video/testmp4.mp4",
            id: 4
          }
          this.videoPlayer.src({ type: 'video/mp4', src: this.videoInfo.link })
        } else {
          console.log('live')
          this.videoInfo = {
            title: "和平与战争",
            date: "2016-10-11",
            speaker: "云游",
            place: "杭州西湖区",
            link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
            link: "http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8",
            id: 1
          }
          this.videoPlayer.src({ type: 'rtmp/flv', src: this.videoInfo.link })
          this.videoPlayer.src({ type: 'application/x-mpegUR', src: this.videoInfo.link })
        }*/
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    this.videoPlayer.dispose()
  }
}

</script>
<style type="text/css" scoped lang="scss">
@import "../index.scss";
.videoPlayer-wrapper {
  #video-player {
    // height: 20px;
  }
  .header {
    margin: px2rem(20px);
    .item {
      // display: inline-block;
      float: right;
      img,
      span {
        vertical-align: middle;
      }
      span {
        text-decoration: underline;
      }
    }
    .item:nth-child(n+2) {
      margin-right: px2rem(20px);
    }
  }
  .videoInfo {
    display: flex;
    margin-top: 10px; // text-align: center;
    border: 1px solid black;
    .left-panel {
      margin-left: 25px;
      flex: auto;
      border-right: 1px solid black;
      .row div {
        display: inline-block;
      }
    }
    .right-panel {
      flex: auto;
      text-align: center;
      line-height: 137px; // vertical-align: middle;
    }
  }
}

</style>
