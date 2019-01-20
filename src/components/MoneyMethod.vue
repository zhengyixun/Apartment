<template>
    <div style="padding-top: 50px;padding-left: 50px">
      <div class="MoneyMethod" v-for="(item,index) in MoneyMethodData" :key="index">
        <div class="MoneyMethodSon">
          <s style="font-family: iconfont;display: block;width: 100%;text-align: right;font-size: 25px;cursor: pointer"  @click="AlertMark('edit',item)">&#xe637;</s>
          <h1>{{item.price}}<s>元/度</s></h1>
          <span>描述</span>
          <p>{{item.desc}}</p>
        </div>
        <span>{{item.name}}</span>
      </div>
      <div class="MoneyMethod">
        <div class="MoneyMethodSon MoneyMethodSon1" @click="AlertMark('add','')">+</div>
        <span>计费策略</span>
      </div>
      <!-- 添加或者编辑的弹出框 -->
      <div class="MoneryMethod_Mark" v-show="MoneryMethod_Flag">
        <div class="MoneryMethod_Alert">
          <div class="MoneryMethod_Title">-{{MoneryMethod_Title}}计费策略-</div>
          <div class="MoneryMethod_Son">
            <span>策略名称</span>
            <el-input placeholder="请输入计费策略"  class="elInput" v-model="MoneryMethod_Name"></el-input>
          </div>
          <div class="MoneryMethod_Son">
            <span>价格</span>
            <el-input placeholder="请输入计费价格"  class="elInput" v-model="MoneryMethod_Price"></el-input>
          </div>
          <div class="MoneryMethod_Son">
            <span>描述</span>
            <el-input placeholder="请输入描述信息"  type="textarea" :autosize="{ minRows: 5, maxRows: 6}" class="elInput"  v-model="MoneryMethod_Desc"></el-input>
          </div>
          <div class="MoneryMethod_Son MoneryMethod_Son_Bot">
            <el-button style="width: 30%;height: 40px;" @click="MoneryMethod_Cancel">取消</el-button>
            <el-button style="width: 30%;height: 40px;" type="primary" @click="MoneryMethod_MakeSure">确定</el-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "",
      data(){
          return{
            MoneryMethod_Title:"添加",
            MoneryMethod_Flag:false,  //遮罩的开关
            MoneryMethod_Name:"", //计费策略名称
            MoneryMethod_Price:"", //计费策略 价格
            MoneryMethod_Desc:"", //计费策略 描述信息
            MoneyMethodData:[
              {name:"商业用电",price:"1.2",desc:"商业用电范围，包括商场用电，演唱会用电等"},
              {name:"居民用电",price:"0.58",desc:"商业用电范围，包括商场用电，演唱会用电等"},
              {name:"其他用电",price:"0.9",desc:"商业用电范围，包括商场用电，演唱会用电等"},
              {name:"特殊用电",price:"1.85",desc:"商业用电范围，包括商场用电，演唱会用电等"},
            ]
          }
      },
      methods:{
          //取消操作
        MoneryMethod_Cancel(){
          this.MoneryMethod_Flag=false;//遮罩的开关
          this.MoneryMethod_Name=""; //计费策略名称
          this.MoneryMethod_Price=""; //计费策略 价格
          this.MoneryMethod_Desc="";//计费策略 描述信息
        },
        //确定
        MoneryMethod_MakeSure(){
          if(this.MoneryMethod_Name === ""){
            this.$alert('请输入计费策略名称', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          if(this.MoneryMethod_Price === ""){
            this.$alert('请输入计费策略价格', '提示信息', {
              confirmButtonText: '确定',
              callback: action => {}
            });
            return
          }
          //验证通过之后
          console.log("计费策略验证通过");
          this.MoneryMethod_Cancel();
        },
        //显示遮罩
        AlertMark(type,e){
          if(type === "add"){
            this.MoneryMethod_Title = "添加"
          }else{
            this.MoneryMethod_Title = "编辑";
            this.MoneryMethod_Name=e.name; //计费策略名称
            this.MoneryMethod_Price=e.price; //计费策略 价格
            this.MoneryMethod_Desc=e.desc;//计费策略 描述信息
          }
          this.MoneryMethod_Flag = true
        }
      }
    }
</script>

<style scoped>
  .MoneyMethod{
    width: 220px;height: 260px;background: #363E6B;float: left;margin-right: 30px;margin-bottom: 30px;
  }
  .MoneyMethod > span{
    display: block;width: 100%;text-align: center;line-height: 50px;color: #fff;font-size: 22px;
  }
  .MoneyMethodSon1{
    line-height: 160px;font-size: 40px;color:#8447DF ;text-align: center;cursor: pointer;
  }
  .MoneyMethodSon{
    width: 170px;padding: 20px;background: #fff;margin: 5px auto;height: 160px;
  }
  .MoneyMethodSon > h1{
    display: block;text-align: center;font-size: 40px;color:#8447DF ;line-height: 50px;height: 50px;margin-bottom: 15px;
  }
  .MoneyMethodSon > h1 > s{
    color: #ccc;font-size: 14px!important;font-weight: 400;
  }
  .MoneyMethodSon > span{
    line-height: 20px;display: block;width: 100%;height: 20px;font-size: 13px;
  }
  .MoneyMethodSon > p{
    line-height: 17px;font-size: 13px;
  }
  .MoneryMethod_Mark{
    position: fixed;top:0;left: 0;right: 0;bottom: 0;z-index: 100;
    background: rgba(0,0,0,0.5);
  }
  .MoneryMethod_Alert{
    position: fixed;width: 450px;height: 420px;border:1px solid #999;
    top:0;left: 0;right: 0;bottom: 0;margin: auto;background: #fff;
  }
  .MoneryMethod_Title{
    width: 100%;display: block;height: 50px;background: #222B54;text-align: center;line-height: 50px;color: #fff;
    margin-bottom: 30px;
  }
  .MoneryMethod_Son{
    width: 100%;height: 50px;margin-bottom: 15px;
  }
  .MoneryMethod_Son > span{
    display: block;width: 100px;float: left;line-height: 44px;text-align: right;margin-right: 20px;
  }
  .elInput{
    width: 280px;float: left;
  }
  .MoneryMethod_Son_Bot{
    padding-top: 30px;
    display: flex;justify-content: space-around;
  }
</style>
