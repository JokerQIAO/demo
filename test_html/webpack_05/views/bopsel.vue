<template>
	<div>
		<s-bopquery @search="search" :show_objtyp="this.$route.query.show_objtyp" :query_objtyp="this.$route.query.query_objtyp"></s-bopquery>
		<Table :columns="columns1" highlight-row @on-current-change="getRow" stripe :data="data1" border height="410"  ref="selection"></Table>
		<Page :current="pageNum" :total="total" :page-size="pageSize" show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize" style="margin-top:20px;" />
		<br>
		<Row>
		<Col span="2"><Button type="primary" @click="handleSelectAll(true)">全选</Button></Col>
		<Col span="2"><Button type="primary" @click="handleSelectAll(false)">取消全选</Button></Col>
		<Col span="2"><Button type="primary" @click="add" :disabled="this.$route.query.show_objtyp">新建</Button></Col>
		<Col span="2"><Button type="primary">修改</Button></Col>
		<Col span="2"><Button type="primary">删除</Button></Col>
		<Col span="2"><Button type="primary">查看明细</Button></Col>
		<Col span="2"><Button type="primary">打印</Button></Col>
		<Col span="2"><Button type="primary">导出</Button></Col>
		<Col span="2"><Button type="primary">数据校验</Button></Col>
		<Col span="2"></Col>
		<Col span="2"></Col>
		<Col span="2"></Col>
	</Row>
	</div>
</template>
<script>
	import sBopquery from './bopquery.vue';
	import $ from '../libs/util.js';

	export default {
	components:{
		sBopquery
	},
		data(){
			return {
				isSelect:false,
				columns1:[ {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },{
						title:'申报类型',
						key:'objtyp',
						width:124,
						render:(h,params) =>{
							return h('span',{},this.handleObjtyp(params.row.objtyp))
						}
					},{
						title:'申报号码',
						key:'rptno',
						width:186
					},{
						title:'检核状态',
						key:'sndflg',
						width:90,
						render:(h,params) => {
							return h('span',{},this.handleSndflg(params.row.sndflg))
						}
					},{
						title:'基础信息',
						key:'bassta',
						render:(h,params) => {
							return h('span',{},this.handleBassta(params.row.bassta))
						}
					},{
						title:'申报信息',
						key:'dclsta',
						render:(h,params) => {
							return h('span',{},this.handleDclsta(params.row.dclsta))
						}
					},{
						title:'管理信息',
						key:'vrfsta',
						render:(h,params) => {
							return h('span',{},this.handleDclsta(params.row.vrfsta))
						}
					},{
						title:'机构名称',
						key:'bchname'
					},{
						title:'业务日期',
						key:'reldat',
						render:(h,params) => {
							return h('span',{},this.handleReldat(params.row.reldat))
						}
					},{
						title:'数据来源',
						key:'datsrc',
						render:(h,params) => {
							return h('span',{},this.handleDatsrc(params.row.datsrc))
						}
					}],
				data1:[],
				total:0,
				pageNum:1,
				pageSize:10,
				params:{}
			}
		},
		methods:{
			getRow(currentRow,oldCurrentRow){
				console.log('currentRow' + currentRow.rptno);
			//	console.log('oldCurrentRow' + oldCurrentRow);
			},
			add(){
				console.log('我可是新建啊！');
			},
			search(data){
				//objtyp, sndflg,beg_time,end_time,bassta,dclsta,vrfsta,rptno,extinf,decnum
				this.params.objtyp = data[0];
				this.params.sndflg = data[1];
				this.params.beg_time = data[2];
				this.params.end_time = data[3];
				this.params.bassta = data[4];
				this.params.dclsta = data[5];
				this.params.vrfsta = data[6];
				this.params.rptno = data[7];
				this.params.extinf = data[8];
				this.params.decnum = data[8];
			//	console.log('search' + this.params.objtyp);
				this.params.pageNum = 1;//查询默认清除之前页数
				this.params.pageSize = this.pageSize;
				this.getData(this.params);
			},
			//切页调用
			changePageSize:function(e){
				this.pageSize = e;
				this.params.pageNum = this.pageNum;
				this.params.pageSize = this.pageSize;
				this.getData(this.params);
			},
			changePage:function(e){
				this.pageNum = e;
				this.params.pageNum = this.pageNum;
				this.params.pageSize = this.pageSize;
				this.getData(this.params);
			},
			rowClassName(){
				return "aa";
			},
			handleSelectAll(state){
					this.$refs.selection.selectAll(state);
			},
			handleDclsta(dclsta){
				if(dclsta == 'W'){
					return "待发送";
				} else if(dclsta == 'G'){
					return "丢弃";
				} else if(dclsta == 'N') {
					return "无";
				} else if(dclsta == 'X') {
					return "已生成等待反馈";
				} else if(dclsta == 'F'){
					return "反馈成功";
				} else if(dclsta == 'E'){
					return "反馈失败";
				}
			},
			handleDatsrc(datsrc){
				if(datsrc == 'W'){
					return "手工";
				} else if(datsrc == 'V'){
					return "其他系统导入";
				}
			},
			handleReldat(reldat){
				var date = new Date(reldat);
				var year = date.getFullYear();
				var month = (date.getMonth() + 1) < 10?'0'+ (date.getMonth() + 1):(date.getMonth() + 1);
				var day = date.getDate() < 10?'0'+date.getDate():date.getDate();
				return year+'-'+ month + '-' + day;
			},
			handleBassta(bassta){
				if(bassta == 'W'){
					return "待发送";
				} else if(bassta == 'X'){
					return "已生成等待反馈";
				} else if(bassta == 'N'){
					return "无";
				} else if(bassta == 'E'){
					return "反馈错误";
				} else if(bassta == 'F'){
					return "反馈成功";
				} else if(bassta == 'G'){
					return "丢弃";
				} else {

				}
			},
			handleSndflg(sndflg){
				if(sndflg == 'W'){
					return "待确认";
				} else if(sndflg == 'C'){
					return "已确认";
				} else if(sndflg == 'G'){
					return "丢弃";
				} else {
					return "";
				}
			},
			handleObjtyp(objtyp){
				if(objtyp == 'dba'){
					return "涉外收入申报单";
				} else if(objtyp == 'dbb'){
					return "境外汇款申请书";
				} else if(objtyp == 'dbc'){
					return "对外付款承兑通知书";
				} else if(objtyp == 'dbd'){
					return "境内收入申报单";
				} else if(objtyp == 'dbe'){
					return "境内汇款申请书";
				} else if(objtyp == 'dbf'){
					return "境内付款承兑通知书";
				} else if(objtyp == 'dbu'){
					return "单位基本情况表";
				} else if(objtyp == 'dbj'){
					return "结汇申请书";
				} else if(objtyp == 'dbw'){
					return "购汇申请书";
				} else if(objtyp == 'fea'){
					return "账户开关户";
				} else if(objtyp == 'feb'){
					//return "账户收支余";
					return "涉外收入申报单";
				} else {
					return "";
				}
			},
			paramsInit(){
				this.params.objtyp ='';
				this.params.sndflg = '';
				this.params.beg_time = null;
				this.params.end_time = null;
				this.params.bassta = '';
				this.params.dclsta = '';
				this.params.vrfsta = '';
				this.params.rptno = '';
				this.params.extinf = '';
				this.params.decnum = '';
				this.params.pageNum = this.pageNum;
				this.params.pageSize = this.pageSize;
			},
			getData(params){
				//Get请求,传递pageNum和pageSize,获取总数和当前页数据
				var that = this;
				$.ajax({
					url:'/bopsel/getAll',
					method:'GET',
					params:that.params
				}).then(res => {
					that.data1 = res.dat;
					that.total = res.count;
				}).catch(err => {
					console.log(err);
				});
				//POST请求
				/*
				$.ajax({
					url:'http://123.53.156.172:8090/dba/test',
					method:'POST',
					data:{}
				}).then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				});*/
			}
		},mounted(){
			this.paramsInit();
			this.getData(this.params);
		}
	}
</script>
<style>
	/*调整table cell间隔和行高*/
	 .ivu-table-row td {
		height: 30px;
	} 
	.ivu-table-overflowX {
		/**
			设置table是否有滚动条
			overflow-x:hidden;
			overflow-y: scroll;
		 **/
		overflow-x: scroll;
		overflow-y: scroll;
	}
	button { 
		width:80px;
	}
</style>