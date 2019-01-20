<template>
    <div>
      <el-input placeholder="租户名 / 手机号 / 地址" style="width: 250px">
        <template slot="prepend"><el-button icon="el-icon-search" circle></el-button></template>
      </el-input>
      <el-button type="primary">查询</el-button>
      <span style="float: right;margin-right: 20px;cursor: pointer">添加租户</span>
      <span style="float: right;font-family: iconfont;border: none;font-size: 25px;margin-right: 10px;color: #666;cursor: pointer">&#xe67c;</span>
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
            <span class="about_">&#xe637;</span>
            <span class="about_" style="margin-left: 1px" @click="Del_User(scope.$index,scope.row)">&#xe6a0;</span>
          </template>
        </el-table-column>
      </el-table>
      <span style="display: block;margin-top: 10px">当前显示第 1 条到第30条数据，共 300 条数据</span>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange_user"
        @current-change="handleCurrentChange_user"
        :current-page.sync="currentPages"
        :page-size="30"
        layout="prev, pager, next, jumper"
        :total="Totals"
        class="pageOrder">
      </el-pagination>

      <!--删除的时候需要输入密码确定-->
      <div class="DelMask" v-show="Del_User_Flag">
        <div class="DelInfo">
          <div style="color: red">输入密码，已确认删除信息</div>
          <el-input  placeholder="请输入密码" v-model="User_Pwd"></el-input>
          <el-button class="Btn" @click="DelCancel_User">取消</el-button>
          <el-button  class="Btn"  type="primary" @click="MakeSure_User">删除</el-button>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "",
      data(){
          return{
            currentPages:1,
            Totals:300,
            tableData:[
              {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市'
              },
              {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市'
              },
              {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市'
              },
            ],
            Del_User_Flag:false,  //删除的开关
            User_Pwd:"",//删除的时候输入的密码
          }
      },
      methods:{
        //分页的方法
        handleSizeChange_user(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange_user(val) {
          console.log(`当前页: ${val}`);
        },
        //删除用户
        Del_User(){
          this.Del_User_Flag = true;
        },
        //取消删除
        DelCancel_User(){
          this.Del_User_Flag = false;
          this.User_Pwd = "";
        },
        //确认密码
        MakeSure_User(){
          if(this.User_Pwd === ""){
            this.$alert('请输入密码', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }else{
            console.log("密码确认成功");
            this.DelCancel_User();
          }

        },
      }
    }
</script>

<style scoped>
  .about_{
    font-family: iconfont;font-size: 22px;cursor: pointer;
  }
  .pageOrder{
    width:475px;margin: 0 auto;
  }
  .DelMask{
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
</style>
