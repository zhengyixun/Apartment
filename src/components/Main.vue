<template>
  <div class="hello">
    <el-container>
      <el-header class="header">
        <div class="logo">LOGO</div>
        <span>智能公寓管理平台</span>
        <el-dropdown class="dropdown" @command="handleCommand">
          <span class="el-dropdown-link">
            Admin <i class="el-icon-arrow-down el-icon--left"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="UpdatePass">修改密码</el-dropdown-item>
            <el-dropdown-item command="LoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container class="container">
        <el-aside width="120px" class="aside">
          <span  v-for="(item,index) in AasideData" :key="index" :class="{ 'active':index===current}" @click="Jump(item.key,index)">{{item.name}}</span>
        </el-aside>
        <el-main class="main">
          <router-view class="routers"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      current: 0,
      AasideData:[
        {name:"首页",key:"Index"},
        {name:"账户管理",key:"AccountManage"},
        {name:"建筑管理",key:"BuildingManage"},
        {name:"设备管理",key:"EquipmentManage"},
        {name:"租户管理",key:"UserManage"},
        {name:"计费策略",key:"MoneyMethod"},
        {name:"查询统计",key:"SelectTotal"},
        {name:"数据信息",key:"DataMsg"},
        {name:"帮助信息",key:"HelpInfo"},
      ],
    }
  },
  methods:{
    //退出登录
    handleCommand(e){
      if(e === "LoginOut"){
        this.$router.push("/Login")
      }else if(e === "UpdatePass"){
        console.log(e)
      }
    },
    //跳转
    Jump(e,index){
      this.current = index;
      this.$router.push("/" + e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header,.aside{
  background: #363F6C;color: #fff;margin: 0;padding: 0;
}
.main{
  background: #fafafa;
}
  .container{
   height: 1200px;
  }
  .aside > span{
    display: block;width: 100%;height: 65px;text-align: center;line-height: 65px;cursor: pointer;
    color: #ADB0C3;
  }
  .active{
    color: #fff!important;background: #222B54;
  }
  .header > span:nth-of-type(1){
    float: left;display: block;height: 60px;width: auto;color: #fff;line-height: 60px;padding-left: 20px;
  }
  .logo{
    height: 60px;line-height: 60px;width: 120px;text-align: center;font-size: 22px;float: left;
  }
  .dropdown{
    width: 80px;float: right;line-height: 60px;color: #fff;cursor: pointer;margin-right: 30px;
  }

</style>
