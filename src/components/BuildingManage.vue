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
      <span style="float: right;margin-right: 20px;cursor: pointer" @click="Add_FamousHouse('add','','')">品牌公寓</span>
      <span style="float: right;font-family: iconfont;border: none;font-size: 25px;margin-right: 10px;color: #666;cursor: pointer" @click="Add_FamousHouse('add','','')">&#xe67c;</span>
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
      <div class="FamousHouseMark" v-show="FamousHouse_Flag">
        <div class="FamousHouse">
          <div class="FamousHouseTitle">{{FamousHouseTitle}}</div>
          <div class="FamousHouseSon">
            <span>建筑名称</span>
            <el-input placeholder="请输入建筑名称" class="elInput" v-model="FamousHouse_Name"></el-input>
          </div>
          <div class="FamousHouseSon_Floor">
            <div class="FamousHouseSon_Floor_Son" v-for="(item,index) in FamousHouse_House_Data" :key="index">
              <div class="FamousHouseSon_Floor_Son_Info">
                <span>楼层</span>
                <span>{{item.build_floor}}层</span>
                <s style="font-family: iconfont;cursor: pointer" @click="FamousHouseSon_Floor_Del(item)">&#xe6a0;</s>
              </div>
              <div class="FamousHouseSon_Floor_Son_Info">
                <span>房间号</span>
                <span>{{item.build_room_min}}</span>
                <span>--</span>
                <span>{{item.build_room_max}}</span>
              </div>
            </div>
            <!--添加楼层号，房间号-->
            <span class="Add_Famous_House" @click="FamousHouse_Floor_Flag = true">+</span>
          </div>
          <div class="FamousHouseSon">
            <span>建筑面积</span>
            <el-input placeholder="请输入建筑面积" class="elInput" v-model="FamousHouse_Area"></el-input>
          </div>
          <div class="OwnHouseSon OwnHouseSonOtherInfo">
            <span>描述信息</span>
            <el-input placeholder="请输入描述信息"  type="textarea" :autosize="{ minRows: 5, maxRows: 6}" class="elInput"  v-model="FamousHouse_Desc"></el-input>
          </div>
          <div class="OwnHouseSon OwnHouseSonBot" style="padding-top: 15px">
            <el-button style="width: 30%;height: 40px;" @click="FamousHouse_Cancel">取消</el-button>
            <el-button style="width: 30%;height: 40px;" type="primary"  @click="FamousHouse_MakeSure">确定</el-button>
          </div>
        </div>
      </div>
      <!--添加品牌公寓 楼层和房间号的弹出框-->
      <div class="Add_FamousHouse_Floor" v-show="FamousHouse_Floor_Flag">
        <div class="FamousHouseTitle">{{FamousHouseTitle}}</div>
        <div class="Add_FamousHouse_Floor_Son">
          <span>楼层号</span>
          <el-input class="elInput" placeholder="请输入楼层号" style="width: 380px" v-model="FamousHouse_Floor_Num"></el-input>
        </div>
        <div class="Add_FamousHouse_Floor_Son">
          <span>最小房间号</span>
          <el-input class="elInput" placeholder="最小房间号"  style="width: 380px" v-model="FamousHouse_Floor_Room_Min"></el-input>
        </div>
        <div class="Add_FamousHouse_Floor_Son">
          <span>最大房间号</span>
          <el-input class="elInput" placeholder="最大房间号"  style="width: 380px" v-model="FamousHouse_Floor_Room_Max"></el-input>
        </div>
        <div class="OwnHouseSon OwnHouseSonBot">
          <el-button style="width: 30%;height: 40px;" @click="FamousHouse_Floor_Cancel">取消</el-button>
          <el-button style="width: 30%;height: 40px;" type="primary" @click="FamousHouse_Floor_MakeSure">确定</el-button>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "BuildingManage",
      data(){
          return{
            OwnHouseTitle:"-添加个人房源-",
            FamousHouseTitle:"-添加品牌公寓-",
            FamousHouse_House_Data:[        //-------------------------品牌公寓 的 楼层号 与房间号
              {build_floor:"1",build_room_min:"1",build_room_max:"12"},
              {build_floor:"2",build_room_min:"1",build_room_max:"10"},
            ],
            FamousHouse_Flag:false, //添加品牌公寓的开关
            FamousHouse_Area:"", //品牌公寓的面积
            FamousHouse_Name:"", //品牌公寓的名称
            FamousHouse_Desc:"", //品牌公寓的描述信息
            FamousHouse_Floor_Flag:false, //添加品牌公寓的开关 ---------------楼层
            FamousHouse_Floor_Num:"",//品牌公寓----楼层号
            FamousHouse_Floor_Room_Min:"",//品牌公寓----最小房间号
            FamousHouse_Floor_Room_Max:"",//品牌公寓----最小房间号
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
            if(row.build_type === "个人房源"){
              this.AddOwnHouse_Flag  = true; //打开遮罩
              this.OwnHouseTitle = "-编辑个人房源-";
            }else if(row.build_type === "品牌公寓"){
              this.FamousHouse_Flag  = true; //打开遮罩
              this.FamousHouseTitle = "-编辑品牌公寓-";

            }


            console.log(row)
          }else{
            console.log("eooro")
          }
        },
        //添加品牌公寓
        Add_FamousHouse(type,index,row){
          if(type === "add"){   //--------------添加品牌公寓
            this.FamousHouse_Flag  = true; //打开遮罩
            this.FamousHouseTitle = "-添加品牌公寓-";

          }else if(type === "edit"){
            this.FamousHouse_Flag  = true; //打开遮罩
            this.FamousHouseTitle = "-编辑品牌公寓-";
            console.log(row)
          }else{
            console.log("error")
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
          console.log("验证通过");
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
        //添加品牌公寓，，，添加楼层    取消
        FamousHouse_Floor_Cancel(){
          this.FamousHouse_Floor_Flag = false;   //关闭遮罩
          //清空数据
          this.FamousHouse_Floor_Num=""; //品牌公寓----楼层号
          this.FamousHouse_Floor_Room_Min="";//品牌公寓----最小房间号
          this.FamousHouse_Floor_Room_Max="";//品牌公寓----最小房间号
        },
        //添加品牌公寓，，，添加楼层    确定
        FamousHouse_Floor_MakeSure(){
          if(this.FamousHouse_Floor_Num===""||this.FamousHouse_Floor_Room_Min===""||this.FamousHouse_Floor_Room_Max === ""){
            this.$alert('请完善楼层信息', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
          }else{
            console.log("验证通过---楼层");
            this.FamousHouse_House_Data.push({  //--视觉增加一列
              build_floor:this.FamousHouse_Floor_Num,build_room_min:this.FamousHouse_Floor_Room_Min,build_room_max:this.FamousHouse_Floor_Room_Max
            });
            this.FamousHouse_Floor_Cancel(); //执行取消方法，
          }
        },
        //品牌公寓  取消
        FamousHouse_Cancel(){
          this.FamousHouse_Flag=false; //添加品牌公寓的开关
          this.FamousHouse_Area=""; //品牌公寓的面积
          this.FamousHouse_House_Data = [];
          this.FamousHouse_Name=""; //品牌公寓的名称
          this.FamousHouse_Desc=""; //品牌公寓的描述信息
        },
        //品牌公寓  确定
        FamousHouse_MakeSure(){
          if(this.FamousHouse_Name === ""){
            this.$alert('请输入建筑名称', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          if(this.FamousHouse_House_Data === []){
            this.$alert('请输入楼层信息', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          if(this.FamousHouse_Area === ""){
            this.$alert('请输入建筑面积', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          //验证通过
          console.log('yes');
          //ajax方法，插入数据库
          this.FamousHouse_Cancel();
        },
        //删除楼层信息
        FamousHouseSon_Floor_Del(e){
          let that = this;
          this.FamousHouse_House_Data.forEach(function (item,index) {
            if(item.build_floor === e.build_floor && item.build_room_min === e.build_room_min && item.build_room_max === e.build_room_max){
              that.FamousHouse_House_Data.splice(index,1);
            }
          })
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
  .OwnHouseMark,.FamousHouseMark{
    position: fixed;top:0;left: 0;right: 0;bottom: 0;z-index: 100;
    background: rgba(0,0,0,0.5);
  }
  .OwnHouse,.FamousHouse{
    position: fixed;width: 450px;height: 550px;border:1px solid #999;
    top:0;left: 0;right: 0;bottom: 0;margin: auto;background: #fff;overflow-y: scroll;
  }

  .FamousHouse::-webkit-scrollbar,.OwnHouse::-webkit-scrollbar {/*滚动条整体样式*/
    width: 0px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .FamousHouse::-webkit-scrollbar-thumb,.OwnHouse::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
  }
  .FamousHouse::-webkit-scrollbar-track, .OwnHouse::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 10px;
    background: #EDEDED;
  }
  .OwnHouse > .OwnHouseTitle,.AddOwnHouse_Room > .OwnHouseTitle,.FamousHouseTitle{
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
  .OwnHouseSon,.FamousHouseSon{
    width: 100%;height: 50px;margin-bottom: 15px;
  }
  .FamousHouseSon_Floor{
    width: 100%;height: auto;margin-bottom: 15px;
  }
  .FamousHouseSon_Floor_Son_Info{
    width: 100%;height: 35px;overflow: hidden;margin-bottom: 10px;line-height: 35px;
  }
  .FamousHouseSon_Floor_Son_Info > span{
    display: block;float: left;
  }
  .FamousHouseSon_Floor_Son_Info > span:nth-of-type(1){
    width: 100px;float: left;text-align: right;margin-right: 20px;
  }
  .FamousHouseSon_Floor_Son_Info > span:nth-of-type(2),.Add_Famous_House,.FamousHouseSon_Floor_Son_Info > span:nth-of-type(4){
    width: 50px;box-sizing: border-box;text-align: center;border: 1px solid #ccc;border-radius: 3px;
  }
  .FamousHouseSon_Floor_Son_Info > span:nth-of-type(3){
    width: 30px;text-align: center;
  }
  .Add_Famous_House{
    display: block;margin-left: 120px;cursor: pointer;
  }
  .OwnHouseSonOtherInfo{
    width: 100%;height: 130px;margin-bottom: 15px;
  }
  .OwnHouseSon_Room{
    width: 100%;height: auto;margin-bottom: 15px;overflow: hidden;
  }
  .Add_FamousHouse_Floor_Son{
    width: 100%;height: 50px;margin-bottom: 15px;
  }
  .OwnHouseSon > span,.OwnHouseSon_Room > span,.AddOwnHouse_Room > span,.FamousHouseSon > span,.Add_FamousHouse_Floor_Son > span{
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
  .Add_FamousHouse_Floor{
    width: 550px;height: 350px;background: #fff;border: 1px solid #ccc;box-sizing: border-box;z-index: 1000;
    position: fixed;top:0;left: 0;right: 0;bottom: 0;margin: auto;
  }
</style>
