<template>
	<router-view></router-view>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			
		}
	},
	mounted(){
      let vm=this
      this.$axios.post('/public/islogin').then(function({ data }) {
        if (data.code === 0) {
          vm.$store.commit('SET_STATUS', 'onLine')
          vm.$store.commit('SET_USERINFO', data.data)
        }
      })
	}
}
</script>
<style type="text/css" scoped lang="scss">

</style>