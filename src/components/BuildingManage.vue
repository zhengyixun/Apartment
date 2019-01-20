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
      <span style="float: right;margin-right: 20px;cursor: pointer" @click="Add_OwnHouse('add','','')">个人房源</span>
      <span style="float: right;font-family: iconfont;border: none;font-size: 25px;margin-right: 10px;color: #666;cursor: pointer" @click="Add_OwnHouse('add','','')">&#xe67c;</span>

      <!--表格-->
      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        style="width: 100%;margin-top: 20px"
        max-height="700">
        <el-table-column
          prop="date"
          label="建筑名称">
        </el-table-column>
        <el-table-column
          prop="build_type"
          label="建筑类型">
        </el-table-column>
        <el-table-column
          prop="address"
          label="面积">
        </el-table-column>
        <el-table-column
          label="设备">
          <template slot-scope="scope">
            <span class="about_">&#xe64c;</span>
          </template>
        </el-table-column>
        <el-table-column
          label="楼层/房间">
          <template slot-scope="scope">
            <span class="about_">&#xe63a;</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="address"
          label="最后修改时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <span class="about_" @click="Add_OwnHouse('edit',scope.$index,scope.row)">&#xe637;</span>
            <span  class="about_" style="margin-left: 1px" @click="Deletes(scope.$index,scope.row)">&#xe6a0;</span>
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
      <!--添加或编辑-----------个人房源-->
      <div class="OwnHouseMark" v-show="AddOwnHouse_Flag">
        <div class="OwnHouse">
          <div class="OwnHouseTitle">{{OwnHouseTitle}}</div>
          <div class="OwnHouseSon">
            <span>建筑名称</span>
            <el-input placeholder="请输入建筑名称" class="elInput" v-model="Building_Name"></el-input>
          </div>
          <div class="OwnHouseSon_Room">
            <span>房间</span>
            <div class="OwnHouseSon_Room_Info">
              <span v-for="(item,index) in OwnHouseSon_Room_Info_data" :key="index">{{item}}<s @click="Del_Room_Name(item)" style="font-family: iconfont">&#xe6a0;</s></span>
              <span @click="Add_House">+</span>
            </div>
          </div>
          <div class="OwnHouseSon">
            <span>建筑面积</span>
            <el-input placeholder="请输入建筑面积" class="elInput"  v-model="Building_Area"></el-input>
          </div>
          <div class="OwnHouseSon OwnHouseSonOtherInfo">
            <span>描述信息</span>
            <el-input placeholder="请输入描述信息"  type="textarea" :autosize="{ minRows: 5, maxRows: 6}" class="elInput"  v-model="Building_Info" ></el-input>
          </div>
          <div class="OwnHouseSon OwnHouseSonBot">
            <el-button style="width: 30%" @click="OwnHouse_Cancel">取消</el-button>
            <el-button style="width: 30%" type="primary" @click="OwnHouse_MakeSure">确定</el-button>
          </div>
        </div>
      </div>
      <!--添加房间名称的弹出框-->
      <div class="AddOwnHouse_Room" v-show="AddOwnHouse_Room_Flag">
        <div class="OwnHouseTitle">{{OwnHouseTitle}}</div>
        <span>房间名称</span>
        <el-input placeholder="请输入房间名称"  class="elInput" style="width: 320px" v-model="AddOwnHouse_Room_Name"></el-input>
        <div class="OwnHouseSon OwnHouseSonBot" style="padding-top: 15px">
          <el-button style="width: 30%;height: 40px;" @click="AddOwnHouse_Room_Cancel">取消</el-button>
          <el-button style="width: 30%;height: 40px;" type="primary" @click="AddOwnHouse_Room_MakeSure">确定</el-button>
        </div>
      </div>
      <!--添加或编辑-----------品牌公寓-->


    </div>
</template>

<script>
    export default {
        name: "BuildingManage",
      data(){
          return{
            OwnHouseTitle:"-添加个人房源-",
            Building_Name:"",  //建筑名称
            Building_Area:"",  //建筑面积
            Building_Info:"",  //建筑--描述信息
            OwnHouseSon_Room_Info_data:["主卧","次卧","次卧","次卧次卧","次卧"],
            AddOwnHouse_Flag:false,    // 添加个人房源--的开关
            AddOwnHouse_Room_Flag:false,   //--------添加房间名称的 开关
            AddOwnHouse_Room_Name:"",   //--------添加房间名称的 名字
            Search_Name:"",
            tableData:[
              {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市',
                build_type:"个人房源",
              },{
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市',
                build_type:"个人房源",
              },{
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市',
                build_type:"品牌公寓",
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
        Deletes(index,row){
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
        //添加个人房源
        Add_OwnHouse(type,index,row){
          if(type === "add"){   //--------------添加个人房源
            this.AddOwnHouse_Flag  = true; //打开遮罩
            this.OwnHouseTitle = "-添加个人房源-";

          }else if(type === "edit"){
            this.AddOwnHouse_Flag  = true; //打开遮罩
            this.OwnHouseTitle = "-编辑个人房源-";
            console.log(row)
          }else{
            console.log("eooro")
          }
        },
        // ----------------------取消添加个人房源
        OwnHouse_Cancel(){
          this.AddOwnHouse_Flag  = false; //关闭遮罩
          this.Building_Name="";  //建筑名称
          this.Building_Area="";  //建筑面积
          this.Building_Info="";  //描述信息
          this.OwnHouseSon_Room_Info_data = [];   //房间名称
        },
        //--------------确认添加个人房源
        OwnHouse_MakeSure(){
          //验证---是否为空
          if(this.Building_Name === ""){
            this.$alert('请输入房间名称', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          if(this.OwnHouseSon_Room_Info_data === []){
            this.$alert('请输入房间名称', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          if(this.Building_Area === ""){
            this.$alert('请输入建筑面积', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          //这里代表验证通过之后
          console.log("验证通过")
          this.AddOwnHouse_Flag  = false; //关闭遮罩
        },
        //添加房间
        Add_House(){
          this.AddOwnHouse_Room_Flag = true;  //打开添加房间名称的 添加框
        },
        //添加房间名称  取消
        AddOwnHouse_Room_Cancel(){
          this.AddOwnHouse_Room_Flag = false;
          this.AddOwnHouse_Room_Name = ""; //清空名称
        },
        //添加房间名称  确定
        AddOwnHouse_Room_MakeSure(){
          if(this.AddOwnHouse_Room_Name === ""){
            this.$alert('请输入房间名称', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }else{
            //确认添加
            this.AddOwnHouse_Room_Flag = false;
            this.OwnHouseSon_Room_Info_data.push(this.AddOwnHouse_Room_Name);  //添加到数组中
            this.AddOwnHouse_Room_Name = ""; //清空名称
          }
        },
        //删除房间名称
        Del_Room_Name(e){

          let that = this;
          this.OwnHouseSon_Room_Info_data.forEach(function(item,index){
            if(item === e){
              that.OwnHouseSon_Room_Info_data.splice(index,1);   //删除成功-----从视觉中删除
              return
            }
          })
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
  .OwnHouseMark{
    position: fixed;top:0;left: 0;right: 0;bottom: 0;z-index: 100;
    background: rgba(0,0,0,0.5);
  }
  .OwnHouse{
    position: fixed;width: 450px;height: 550px;border:1px solid #999;
    top:0;left: 0;right: 0;bottom: 0;margin: auto;background: #fff;
  }
  .OwnHouse > .OwnHouseTitle,.AddOwnHouse_Room > .OwnHouseTitle{
    width: 100%;display: block;height: 50px;background: #222B54;text-align: center;line-height: 50px;color: #fff;
    margin-bottom: 30px;
  }
  .elInput{
    width: 280px;float: left;
  }
  .OwnHouseSon_Room_Info{
    width: 280px;float: left;
  }
  .OwnHouseSon_Room_Info > span{
    min-width: 50px;text-align: center;;border: 1px solid #ccc;box-sizing: border-box;cursor: pointer;
    display: block;float: left;border-radius: 3px;margin-right: 5px;margin-bottom: 10px;padding: 2px 5px;
  }
  .OwnHouseSon{
    width: 100%;height: 50px;margin-bottom: 15px;
  }
  .OwnHouseSonOtherInfo{
    width: 100%;height: 130px;margin-bottom: 15px;
  }
  .OwnHouseSon_Room{
    width: 100%;height: auto;margin-bottom: 15px;overflow: hidden;
  }
  .OwnHouseSon > span,.OwnHouseSon_Room > span,.AddOwnHouse_Room > span{
    display: block;width: 100px;float: left;line-height: 44px;text-align: right;margin-right: 20px;
  }
  .OwnHouseSon_Room > span{
    height: 44px;
  }
  .OwnHouseSonBot{
    display: flex;justify-content: space-around;
  }
  .AddOwnHouse_Room{
    position: fixed;z-index: 1000;width: 500px;height: 200px;
    top:0;left: 0;right: 0;bottom: 0;margin: auto;background: #fff;border-bottom: 1px solid #ccc;
  }
</style>
