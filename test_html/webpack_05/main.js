/**
	设置路由vue-router
	设置全局数据变量vuex
	设置iview
**/
import VueRouter from 'vue-router';
import Vue from 'vue';
import Vuex from 'vuex';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import App from './views/app.vue';


//使用路由插件
Vue.use(VueRouter);
//使用Vuex的配置
Vue.use(Vuex);
//使用iview
Vue.use(iView);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
//路由映射
const Routers = [{
	path:'/index',
	meta:{
		title:'首页'
	},
	component:(resolve) => require(['./views/index.vue'],resolve)
	//component:require('./views/index.vue') 非懒加载（非按需加载，非异步加载）
},{
	path:'*',
	redirect:'/index'
},{
	path:'/bopsel',
	meta:{
		title:'收支申报'
	},
	component:(resolve) =>require(['./views/bopsel.vue'],resolve)
},{
	path:'/dbasel',
	meta:{
		title:'涉外收入申报单',
	},
	component:(resolve) =>require(['./views/bopsel.vue'],resolve)
},{
	path:'/dbbsel',
	meta:{
		title:'境外汇款申请书',
	},
	component:(resolve) =>require(['./views/bopsel.vue'],resolve)
},{
	path:'/dbcsel',
	meta:{
		title:'对外付款承兑通知书',
	},
	component:(resolve) =>require(['./views/bopsel.vue'],resolve)
},{
	path:'/dbdsel',
	meta:{
		title:'境内收入申报单',
	},
	component:(resolve) =>require(['./views/bopsel.vue'],resolve)
},{
	path:'/dbesel',
	meta:{
		title:'境内汇款申请书',
	},
	component:(resolve) =>require(['./views/bopsel.vue'],resolve)
},{
	path:'/dbfsel',
	meta:{
		title:'境内付款承兑通知书',
	},
	component:(resolve) =>require(['./views/bopsel.vue'],resolve)
},{
	path:'/jshsel',
	meta:{
		title:'结售汇申报'
	},
	component:(resolve) =>require(['./views/jshsel.vue'],resolve)
}];

//路由配置
const RouterConfig = {
	//使用HTML5的History路由模式
	mode:'history',
	routes:Routers
};

//路由对象
const router = new VueRouter(RouterConfig);
//to即将要进入的目标的路由对象
//from当前导航即将要离开的路由对象
//next 调用该方法后，才能纪念如下一个钩子
router.beforeEach((to,from,next) => {
	if(window.localStorage.getItem('token')){
		window.document.title = to.meta.title;
		next();
	} else {
		next();
	}
});

router.afterEach((to,from,next) => {
	window.scrollTo(0,0);
});

const store = new Vuex.Store({
	//vuew的配置
	state:{
		count:0,
		list:[1,5,8,10,30,50]
	},
	//响应组件方法
	mutations:{
		increment(state){
			state.count++;
		},
		decrese(state){
			state.count--;
		}
	},
	getters:{
		filteredList:state => {
			return state.list.filter(item => item<10);
		},
		listCount:(state,getters) => {
			return getters.filteredList.length;
		}
	},
	//异步数据处理
	actions:{
		asyncIncrement(context){
			return new Promise(resolve => {
				setTimeout(() => {
					context.commit('increment');
					resolve();
				},1000)
			});
		}
	}
});


//创建Vue根实例
new Vue({
	el:'#app',
	router:router,
	store:store,
	render:h => h(App)
});