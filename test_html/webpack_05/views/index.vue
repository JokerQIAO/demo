<template>
	<Table :columns="columns1" :data="data1"></Table>
</template>
<script>
	export default {
		data(){
			return {
				columns1:[{
					title:'业务类型',
					key:'type'
				},{
					title:'待确认',
					key:'sta1'
				},{
					title:'已确认待发送',
					key:'sta2'
				},{
					title:'已生成等待反馈',
					key:'sta3'
				},{
					title:'反馈错误',
					key:'staerr'
				}],
				data1:[{
					type:'收支申报',
					sta1:'10',
					sta2:'0',
					sta3:'0',
					staerr:'0'
				},{
					type:'结售汇',
					sta1:'10',
					sta2:'0',
					sta3:'0',
					staerr:'0'
				}]
			}
		}
	}
</script>
<style scoped>
	div {
		color:red;
		font-size:24px;
	}
</style>