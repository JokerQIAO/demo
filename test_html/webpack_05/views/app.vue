<template>
  <div class="layout">
    <Layout>
      <Header>
        <template>
          <Breadcrumb style="float:left">
            <BreadcrumbItem>ZY</BreadcrumbItem>
            <BreadcrumbItem>洛阳银行国际业务部</BreadcrumbItem>
            <BreadcrumbItem style="color:red">上次登录时间</BreadcrumbItem>
          </Breadcrumb>
		  <Breadcrumb style="float:right">
            <BreadcrumbItem>主页</BreadcrumbItem>
            <BreadcrumbItem>账户</BreadcrumbItem>
            <BreadcrumbItem style="color:red">退出系统</BreadcrumbItem>
          </Breadcrumb>
</template>
      </Header>
      <Layout>
        <Sider
          hide-trigger
          :style="{background: '#fff'}"
        >
          <Menu
            width="auto"
            active-name=""
            :open-names="[]"
            @on-open-change="changeMenu" 
            @on-select = "selectMenu"
            :accordion="true"
          >
            <Submenu name="index">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                首页
              </template>
		</Submenu>
		<Submenu name="bopsel">
			<template slot="title">
  <Icon type="ios-filing"></Icon>
  收支申报
</template>
			<MenuItem name="dbasel">涉外收入申报单</MenuItem>
			<MenuItem name="dbbsel">境外汇款申请书</MenuItem>
			<MenuItem name="dbcsel">对外付款承兑通知书</MenuItem>
			<MenuItem name="dbdsel">境内收入申报单</MenuItem>
			<MenuItem name="dbesel">境内汇款申请书</MenuItem>
			<MenuItem name="dbfsel">境内付款承兑通知书</MenuItem>
			<MenuItem name="dbusel">单位基本情况表</MenuItem>
		</Submenu>
		<Submenu name="jshsel">
			<template slot="title">
  <Icon type="ios-cog"></Icon>
  结售汇申报
</template>
			<MenuItem name="dbjsel">结汇申请书</MenuItem>
			<MenuItem name="dbwsel">购汇申请书</MenuItem>
		</Submenu>
	</Menu>
					</Sider>
					<Layout :style="{padding: '0 24px 24px'}">
					<Content :style="{padding: '16px',margin:'16px', minHeight: '280px', background: '#fff'}">
						<router-view></router-view>
					</Content>
					</Layout>
				</Layout>
				<Footer>aa</Footer>
			</Layout>
		</div>	
</template>
<script>

export default {
  methods: {
    handleIButton: function (e) {
      console.log("aaa");
    },
    changeMenu: function (e) {
      console.log(e);
      if (e == "index") {
        this.$router.push("/index");
      } else if (e == "bopsel") {
        this.$router.push("/bopsel");
     } else if (e == "jshsel") {
        this.$router.push("/jshsel");
      }
    },
    selectMenu:function(e){
        if(e == 'dbasel'){
           // console.log("dba");
            this.$router.push({path:'/dbasel',query:{show_objtyp:true,query_objtyp:'dba'}});
        } else if(e == 'dbbsel'){
          //console.log("dbb");
            this.$router.push({path:'/dbbsel',query:{show_objtyp:true,query_objtyp:'dbb'}});
        } else if(e == 'dbcsel'){
        //  console.log("dbc");
            this.$router.push({path:'/dbcsel',query:{show_objtyp:true,query_objtyp:'dbc'}});
        } else if(e == 'dbdsel'){
         // console.log("dbd");
            this.$router.push({path:'/dbdsel',query:{show_objtyp:true,query_objtyp:'dbd'}});
        } else if(e == 'dbesel'){
         // console.log("dbe");
            this.$router.push({path:'/dbesel',query:{show_objtyp:true,query_objtyp:'dbe'}});
        } else if(e == 'dbfsel'){
         // console.log("dbf");
            this.$router.push({path:'/dbfsel',query:{show_objtyp:true,query_objtyp:'dbf'}});
        }
    }
  }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 100px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-layout-header {
  height : 48px;
  line-height:48px;
}
</style>