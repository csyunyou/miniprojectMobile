<template>
	<div class="index">
		
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			
		}
	},
	mounted(){
		this.$axios.get('http://localhost:8080/image/test.json')
			.then(({data})=>{

			})
	}
}
</script>
<style type="text/css" scoped lang="scss">
	
</style>