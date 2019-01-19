import Vue from 'vue';
import Router from 'vue-router';

//引入组件
import Login from "@/components/Login";
import Main from "@/components/Main";   //主要的背景页面
import Index from "@/components/Index";  //  首页
import AccountManage from "@/components/AccountManage";  //  账户管理
import BuildingManage from "@/components/BuildingManage";  //  建筑管理
import EquipmentManage from "@/components/EquipmentManage";  //  设备管理
import UserManage from "@/components/UserManage";  //  租户管理
import MoneyMethod from "@/components/MoneyMethod";  //  计费策略
import SelectTotal from "@/components/SelectTotal";  //  查询统计
import DataMsg from "@/components/DataMsg";  //  数据信息
import HelpInfo from "@/components/HelpInfo";  //  帮助信息
Vue.use(Router);

export default new Router({
  routes: [
    {path: '/',component: Login},        //登陆
    {path: '/Login',component: Login},    //登陆
    {path:"/Main",component:Main,children:[   //------------------------登陆之后的主界面
        {path:"/",component:Index},//默认显示首页
        {path:"/Index",component:Index},//默认显示首页
        {path:"/AccountManage",component:AccountManage},//账户管理
        {path:"/BuildingManage",component:BuildingManage},//建筑管理
        {path:"/EquipmentManage",component:EquipmentManage},//设备管理
        {path:"/UserManage",component:UserManage},//租户管理
        {path:"/MoneyMethod",component:MoneyMethod},//计费策略
        {path:"/SelectTotal",component:SelectTotal},//查询统计
        {path:"/DataMsg",component:DataMsg},//数据信息
        {path:"/HelpInfo",component:HelpInfo},//帮助信息

    ]},
  ]
})
