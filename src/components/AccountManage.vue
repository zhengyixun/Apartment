<template>
    <div>
      <el-input placeholder="账户名称 / 手机号" v-model="Search_Name" style="width: 250px">
        <template slot="prepend"><el-button icon="el-icon-search" circle></el-button></template>
      </el-input>
      <el-dropdown trigger="click" class="drop">
      <span class="el-dropdown-link" style="cursor: pointer">
        权限等级<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>普通</el-dropdown-item>
          <el-dropdown-item>管理员</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary">查询</el-button>
      <span style="float: right;margin-right: 20px;cursor: pointer" @click="Account('add','','')">添加账户</span>
      <span style="float: right;font-family: iconfont;border: none;font-size: 25px;margin-right: 10px;color: #666;cursor: pointer"  @click="Account('add')">&#xe67c;</span>

      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;margin-top: 20px"
        max-height="700">
        <el-table-column
          prop="date"
          label="账户名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="address"
          label="权限等级">
        </el-table-column>
        <el-table-column
          prop="address"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="address"
          label="最后登录时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <span @click="Account(scope.$index,scope.row)" class="about_">&#xe637;</span>
            <span @click="Delete(scope.$index,scope.row)" class="about_" style="margin-left: 1px">&#xe6a0;</span>
          </template>
        </el-table-column>
      </el-table>
      <span style="display: block;margin-top: 10px">当前显示第 1 条到第30条数据，共 300 条数据</span>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChanges"
        @current-change="handleCurrentChanges"
        :current-page.sync="currentPages"
        :page-size="30"
        layout="prev, pager, next, jumper"
        :total="Totals"
        class="pageOrder">
      </el-pagination>

      <!--删除的时候需要输入密码确定-->
      <div class="DelMask" v-show="DelFlag">
        <div class="DelInfo">
          <div style="color: red">输入密码，已确认删除信息</div>
          <el-input v-model="InputPwd" placeholder="请输入密码"></el-input>
          <el-button class="Btn" @click="DelCalcel">取消</el-button>
          <el-button  class="Btn"  type="primary" @click="DelData">删除</el-button>
        </div>
      </div>
      <!--添加账号的弹出框  编辑的弹出框-->
      <div class="AccountMark" v-show="AccountFlag">
        <div class="AccountInfo">
          <div class="AccountHead">{{AccountTitle}}</div>
          <div class="AccountInfoSon">
            <span>手机号</span>
            <el-input placeholder="请输入手机号" class="elInput" v-model="Account_phone"></el-input>
          </div>
          <div class="AccountInfoSon">
            <span>昵称</span>
            <el-input placeholder="请输入昵称" class="elInput" v-model="Account_nickname"></el-input>
          </div>
          <div class="AccountInfoSon">
            <span>权限等级</span>
            <el-dropdown trigger="click" class="elDropDown" @command="handleCommandType">
              <span class="el-dropdown-link">
                {{AccountTypeName}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">普通</el-dropdown-item>
                <el-dropdown-item command="2">管理员</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="AccountInfoSon">
            <span>密码</span>
            <el-input placeholder="请输入密码" class="elInput" v-model="Account_pass"></el-input>
          </div>
          <div class="AccountInfoSon">
            <span>确认密码</span>
            <el-input placeholder="请再次确认密码" class="elInput" v-model="Account_pass1"></el-input>
          </div>
          <div class="AccountInfoSon AccountInfoBot">
           <el-button style="width: 30%" @click="AccountCancel">取消</el-button>
           <el-button style="width: 30%" type="primary" @click="MakeSure">确定</el-button>
          </div>

        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "AccountManage",
      data(){
          return{
            AccountTitle:"- 添加账户 -",
            AccountTypeName:"权限等级",  //账号类型
            Account_phone:"",//手机号
            Account_nickname:"",//昵称
            Account_pass:"",//密码
            Account_pass1:"",// 确认 密码
            AccountFlag:false,  //------------添加 编辑账号的弹出框
            DelFlag:false,  //删除的开关
            InputPwd:"",//删除的时候输入的密码
            Totals:300,        //分页的总条数
            currentPages:1,    //当前页码
            Search_Name:"",
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普弄'
            }]
          }
      },
      methods:{
        Delete(index,row){
          console.log("del" + row);
          //打开遮罩
          this.DelFlag = true;
        },
        handleCommandType(e){
          console.log(e)
          if(e === "1"){
            this.AccountTypeName = "普通"
          }else if(e=== "2"){
            this.AccountTypeName = "管理员"
          }else{
            console.log("errrrr")
          }
        },
        //输入密码，确认删除
        DelData(){
          if(this.InputPwd === ""){
            this.$alert('请输入密码', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }else{
            //验证密码
            this.DelFlag = false;
          }
        },
        //取消删除
        DelCalcel(){
          this.InputPwd = "";  //清空密码
          this.DelFlag = false;
        },
        //分页的方法
        handleSizeChanges(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChanges(val) {
          console.log(`当前页: ${val}`);
        },
        Account(e,index,row){
          if(e === "add"){
            this.AccountTitle = "- 添加账户 -"
          }else{
            this.AccountTitle = "- 编辑账户 -"
          }
          this.AccountFlag = true
        },
        //确认添加  或者  确认编辑
        MakeSure(){
          //检验 各项参数是不是空
          if(this.Account_phone === ""){
            this.$alert('请输入手机号', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(this.Account_nickname === ""){
            this.$alert('请输入昵称', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(this.Account_pass === ""){
            this.$alert('请输入密码', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(this.Account_pass1 === ""){
            this.$alert('请确认密码', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(this.Account_pass !==this.Account_pass1){
            this.$alert('两次密码不一致', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          if(this.AccountTypeName === "权限等级"){
            this.$alert('请选择权限等级', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return;
          }
          //检验通过之后，执行以下操作
          console.log("suc");
          this.AccountFlag = false;
        },
        //取消 添加或者编辑
        AccountCancel(){
          this.AccountFlag = false;
          this.Account_pass = "";
          this.Account_phone = "";
          this.Account_nickname = "";
          this.Account_pass1 = "";
          this.AccountTypeName = "权限等级";

        }
      }
    }
</script>

<style scoped>
  .drop{
    border:  1px solid #DCDFE6;border-radius: 5px;padding: 3px 10px;margin-left: 20px;
  }
  .about_{
    font-family: iconfont;font-size: 22px;cursor: pointer;
  }
  .pageOrder{
   width:475px;margin: 0 auto;
  }
  .DelMask,.AccountMark{
    position: fixed;top:0;left: 0;right: 0;bottom: 0;z-index: 100;
    background: rgba(0,0,0,0.5);
  }
  .DelInfo{
    width: 400px;height: 150px;padding: 20px;border: 1px solid #999;background: #fff;
    position: fixed;top:0;left: 0;right: 0;bottom: 0;margin: auto;
  }
  .Btn{
    margin-top: 30px;width: 187px;
  }
  .AccountInfo{
    position: fixed;width: 450px;height: 500px;border:1px solid #999;
    top:0;left: 0;right: 0;bottom: 0;margin: auto;background: #fff;
  }
  .AccountHead{
    width: 100%;display: block;height: 50px;background: #222B54;text-align: center;line-height: 50px;color: #fff;
    margin-bottom: 30px;
  }
  .AccountInfoSon{
    width: 100%;height: 50px;margin-bottom: 15px;
  }
  .AccountInfoSon > span{
    display: block;width: 100px;float: left;line-height: 44px;text-align: right;margin-right: 20px;
  }
  .AccountInfoSon > .elInput{
    width: 280px;float: left;
  }
  .elDropDown{
   padding: 9px 10px;cursor: pointer;
  }
  .AccountInfoBot{
    display: flex;justify-content: space-around;
  }
</style>
