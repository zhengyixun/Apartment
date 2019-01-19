<template>
    <div>
      <el-input placeholder="账户名称 / 手机号" v-model="Search_Name" style="width: 250px">
        <template slot="prepend"><el-button icon="el-icon-search" circle></el-button></template>
      </el-input>
      <el-dropdown trigger="click" class="drop">
      <span class="el-dropdown-link" style="cursor: pointer">
        房源类型<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>品牌公寓</el-dropdown-item>
          <el-dropdown-item>个人房源</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary">查询</el-button>
      <span style="float: right;margin-right: 20px;cursor: pointer">品牌公寓</span>
      <span style="float: right;font-family: iconfont;border: none;font-size: 25px;margin-right: 10px;color: #666;cursor: pointer"  >&#xe67c;</span>
      <span style="float: right;margin-right: 20px;cursor: pointer">个人房源</span>
      <span style="float: right;font-family: iconfont;border: none;font-size: 25px;margin-right: 10px;color: #666;cursor: pointer"  >&#xe67c;</span>

      <!--表格-->
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
            <span  class="about_" style="margin-left: 1px" @click="Delete(scope.$index,scope.row)">&#xe6a0;</span>
          </template>
        </el-table-column>
      </el-table>
      <span style="display: block;margin-top: 10px">当前显示第 1 条到第30条数据，共 300 条数据</span>

      <!--分页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
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
          <el-button class="Btn" @click="DelCancel">取消</el-button>
          <el-button  class="Btn"  type="primary" @click="DelData">删除</el-button>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "BuildingManage",
      data(){
          return{
            Search_Name:"",
            tableData:[
              {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市'
              },{
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市'
              },{
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市'
              }
            ],
            Totals:300,        //分页的总条数
            currentPages:1,    //当前页码
            DelFlag:false,    //----------删除的开关
            InputPwd:"",  //密码
          }
      },
      methods:{
          //删除
        Delete(index,row){
          console.log("del" + row);
          //打开遮罩
          this.DelFlag = true;
        },
        //取消删除
        DelCancel(){
          this.InputPwd = "";  //清空密码
          this.DelFlag = false;
        },
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
        //分页的方法
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
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
</style>
