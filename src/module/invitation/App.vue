<template>
	<div id="app">
		<!-- <p>share page</p> -->
		<p>{{width}}</p>
		<p>{{height}}</p>
		<p>{{wi}}</p>
		<p>{{he}}</p>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight,
			wi:window.innerWidth,
			he:window.innerHeight
		}
	}
}
</script>
<style type="text/css" scoped>
#app{
	width:10rem;
	height: 16.08rem;
	background-color: red;
	background-image: url(./assets/final.jpg);
	background-size: 10rem 16.08rem;
}
</style>