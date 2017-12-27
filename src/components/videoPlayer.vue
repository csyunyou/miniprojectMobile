<template>
  <div class="videoPlayer">
    <video id="video-player" class="video-js vjs-big-play-centered">
      <source src="http://live.hkstv.hk.lxdns.com/live/hks/playlist.m3u8" type="application/x-mpegURL">
    </video>
    <div class="videoInfo">
      <div class="title">
        <span v-if="$route.query.type==='vod'">视屏:</span>
        <span v-else-if="$route.query.type==='live'">直播:</span>
        <span>{{videoInfo.title}}</span>
      </div>
      <div class="date">
        <span>时间:</span>
        <span>{{videoInfo.date}}</span>
      </div>
      <div class="speaker">
        <span>主讲人:</span>
        <span>{{videoInfo.speaker}}</span>
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
export default {
  data() {
    return {
      videoOpts: {
        // height:"100px",
        // width: 1000,
        fluid: true,
        aspectRatio: "4:3",
        controls: true,
        preload: "auto",
        poster: "http://ppt.downhot.com/d/file/p/2014/08/12/9d92575b4962a981bd9af247ef142449.jpg"

      },
      videoPlayer: null,
      videoInfo: {},
    }
  },
  mounted() {
    this.videoPlayer = videojs('video-player', this.videoOpts)
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
<style type="text/css" scoped>
.videoInfo {
  margin-top: 10px;
  text-align: center;
  position: relative;
}

.title,
.date,
.speaker {
  display: inline-block;
  margin-right: 20px;
}

</style>
