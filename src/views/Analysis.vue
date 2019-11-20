<template>
<div class="analysis">
  <headers></headers>
  <side></side>
  <div class="main-box">
    <div class="search">
      <el-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="change"
        default-value="2019-7-01">
      </el-date-picker>

      <!-- <el-date-picker
        v-model="value"
        type="date"
        @change="change"
        :picker-options="pickerOptions1"
        :placeholder="nowTime">
      </el-date-picker> -->


      <div class="search-business">
        <select class="select-style" id="select" @change="selectChange">
          <option value="0">请选择渠道</option>
          <option :value="item.businessId" v-for="(item, index) in businessAll" :key="index" >{{ item.businessName }}</option>
        </select>
      </div>

      <div class="search">
        <button class="clickSearch" @click="clickSearch">搜索</button>
      </div>
      

    </div>
    <div class="main">
      <div class="content">
        <div class="content-head">
          <div class="head-item">日期</div>
          <div class="head-item">渠道名</div>
          <div class="head-item">推广商品</div>
          <div class="head-item">下单数</div>
          <div class="head-item" v-if="orderInfoRuler">操作</div>
        </div>

        <div class="content-main" v-for="(item,index) in manageLogList" :key="index">
          <div class="content-item textContentItem">{{ item.date}}</div>
          <div class="content-item textContentItem">{{ item.businessName }}</div>
          <div class="content-item textContentItem orange">{{ item.goodsName }}</div>
          <div class="content-item">{{ item.count }}</div>
          <div class="content-item" v-if="orderInfoRuler"><a class="orange" href="" @click.prevent="clickGoodsInfo(item)">订单详情</a></div>
        </div>

        <!-- 暂无数据 -->
        <div class="no-data" v-show="flag">
          <div class="img-box">
            <img src="@/assets/images/nodata.png" alt=""/>
            <div class="no-data-text">暂无数据,请选择时间</div>
          </div>
        </div>
       

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5]"
            :page-size="5"
            layout="total, prev, pager, next, jumper"
            :total="num">
          </el-pagination>
        </div>

      </div>
    </div>
    
  </div>
  
</div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { getManageLog,getBusinessAll } from "../api/index.js"
import headers from "../components/Head.vue"
import side from "../components/Side.vue"
import $ from "jquery"
import { constants } from 'crypto';

export default {
  components: {
    headers,
    side,
  },
 data() {
    return {
      currentPage: 1,     // 默认选中的页码
      num:0,              //渠道分析的总数
      value: "",          // 日期时间选择器
      manageLogList:"",   //渠道列表
      num:0,              //总条数
      nowTime: "",         //初始化时间
      changeDate: "",      //选中时间
      flag: true,         //无数据的标志
      businessAll: "",    //所有渠道名
      changeId: "0",       //搜索id
      timeList: [],       //时间数组
      orderInfoRuler: parseInt(this.$store.state.userData.data.orderInfoRulere),  //有无订单详情权限的标志
    };
  },
  created(){
    var tempTime2 = new Date()
    this.nowTime = this.$moment(tempTime2).format("YYYY-MM-DD")
  },
  mounted(){
   //获取所有渠道名
    let token = this.$store.state.userData.token
    let headers = {"token":token}
    getBusinessAll({},headers)
    .then( res => {
      if( res.data.code == 200 ){
        // console.log("所有渠道名",res)
        this.businessAll = res.data.data
      }
    })
    .catch( error => {
      console.log("失败的回调",error)
    })

    //初始化渠道分析列表
    let tempTime = ["2019-08-08","2019-08-19"]
    let data = {"date":[this.nowTime], "pageNum":1 ,"pageSize":"5",businessId:this.changeId};
    getManageLog(data,headers)
    .then( res =>{
      if( res.data.code == 200 ){
        this.manageLogList = res.data.data
        console.log("渠道分析列表",this.manageLogList)
        if( res.data.data.length > 0){
          this.flag = false
        }else{
          this.flag = true
        }
      }
    })
    .catch(error =>{
      console.log(error)
    }) 

    //渠道分析接口-总数据
    getManageLog({"date":[this.nowTime] ,businessId:this.changeId},headers)
    .then( res =>{
      if( res.data.code == 200 ){
        // console.log("渠道分析总数据",res)
        this.num = res.data.data.length
      }
    })
    .catch(error =>{
      console.log(error)
    }) 

  },
  methods:{
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(temp) {
      //页码改变
      let token = this.$store.state.userData.token
      let data = {"date":this.timeList,"pageNum":temp ,"pageSize":"5",businessId:this.changeId}
      let headers = {"token":token} 
      //渠道分析接口-选择时间
      getManageLog(data,headers)
      .then( res =>{
        if( res.data.code == 200 ){
          // console.log("渠道分析列表",res)
          this.manageLogList = res.data.data
        }
      })
      .catch(error =>{
        console.log(error)
      }) 

      //渠道分析接口-总数据
      getManageLog({"date":this.timeList, businessId:this.changeId},headers)
      .then( res =>{
        if( res.data.code == 200 ){
          // console.log("渠道分析总数据",res)
          this.num = res.data.data.length
          if( res.data.data.length > 0){
            this.flag = false
          }else{
            this.flag = true
          }
        }
      })
      .catch(error =>{
        console.log(error)
      }) 

    },

    //选中时间
    change(val){
      this.nowTime = this.$moment(val).format("YYYY-MM-DD")
      this.changeDate = val
      var timeList = []
      var tempStartTime = this.$moment(val[0]).format("MM-DD").split("-")
      var tempEndTime = this.$moment(val[1]).format("MM-DD").split("-")
      var startYear = this.$moment(val[0]).format("YYYY")     //开始年
      var endYear = this.$moment(val[1]).format("YYYY")     //开始年
      var startMonth = Number(tempStartTime[0])     //开始月
      var endMonth = Number(tempEndTime[0])         //结束月
      var starDay = Number(tempStartTime[1])        //开始日
      var endDay = Number(tempEndTime[1])           //结束日
      var startMonthNum = mGetDate(startYear,startMonth)  //开始月份的天数
      //隔月数
      var numMonth = endMonth - startMonth

      if( startMonth == endMonth ){                 //不跨月份
        let numDay = endDay - starDay
        for(let i=0; i <= numDay; i++){
          let tempStartMonth = startMonth < 10 ? "0" + startMonth : startMonth
          let a = starDay + i
          let tempStartDay = a < 10 ? "0" + a : a
          timeList.push( startYear + "-" + tempStartMonth + "-" + tempStartDay)
        }
        this.timeList = timeList
      }else if( startMonth < endMonth ){           //跨月份
        let numDay = endDay + startMonthNum - starDay
        for(let i=0; i <= numDay; i++){
          let tempStartMonth = startMonth < 10 ? "0" + startMonth : startMonth
          let tempEndMonth = endMonth < 10 ? "0" + endMonth : endMonth
          if(starDay + i <= startMonthNum){
            let a = starDay + i
            let tempStartDay = a < 10 ? "0" + a : a
            timeList.push( startYear + "-" + tempStartMonth + "-" + tempStartDay)
          }else{
            let a = starDay + i - startMonthNum
            let tempStartDay = a < 10 ? "0" + a : a
            timeList.push( startYear + "-" + tempEndMonth + "-" + tempStartDay)
          }
        }
        this.timeList = timeList
      }

      //获取当前月份的天数函数
      function  mGetDate(year, month){
          var d = new Date(year, month, 0);
          return d.getDate();
      }
      
    },

    //渠道id变化
    selectChange(){
      var changeVal = $("#select option:selected").val()
      // console.log("当前渠道id",changeVal)
      this.changeId = changeVal
    },

    //点击搜索
    clickSearch(){
      let token = this.$store.state.userData.token
      let data = {"date":this.timeList, "pageNum":"1" ,"pageSize":"5", businessId:this.changeId}
      let headers = {"token":token} 
      //渠道分析接口-分页
      getManageLog(data,headers)
      .then( res =>{
        if( res.data.code == 200 ){
          console.log("点击搜索后的列表",res)
          this.manageLogList = res.data.data
          if( res.data.data.length > 0){
            this.flag = false
          }else{
            this.flag = true
            Toast("暂无订单信息")
          }
        }
      })
      .catch(error =>{
        console.log(error)
      }) 


      //渠道分析接口-总数据
      getManageLog({"date":this.timeList, businessId:this.changeId},headers)
      .then( res =>{
        if( res.data.code == 200 ){
          // console.log("搜索渠道总数据",res)
          this.num = res.data.data.length
          if( res.data.data.length > 0){
            this.flag = false
          }else{
            this.flag = true
          }
        }
      })
      .catch(error =>{
        console.log(error)
      }) 

    },
    //传给订单详情的item
    clickGoodsInfo(item){
      // console.log("订单详情",item)
      this.$router.push({
        name:"orderInfo",
        query:{
          InfoItem: item
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.analysis{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.main-box{
  height: 91%;
  width: calc(100% - 1.85rem);
  background: #F1F1F1;
}
.search{
  height: 12%;
  margin-left: 2%;
  display: flex;
  align-items: center;
  .clickSearch{
    border: none;
    height: 0.38rem;
    width: 0.8rem;
    font-size:18px;
    border-radius: 5px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    background: #F18721;
    margin-left: 0.2rem;
  }
}
.main{
  height: 88%;
  width: 100%;

  .content{
    width: 96%;
    height: 96%;
    margin: auto;
    background: #FFFFFF;
    box-shadow:3px 0px 9px 0px rgba(172,200,219,0.46);
    .content-head{
      width: 100%;
      height: 0.57rem;
      background: #FFDBB9;
      display: flex;
      justify-content: space-between;
      .head-item{
        width:25%;
        height: 100%;
        font-size: 18px;
        color: #191919;
        line-height: 0.57rem;
      }
    }
    .content-main{
      height: 0.97rem;
      width: 97%;
      margin: auto;
      font-family:PingFang-SC-Regular;
      font-weight:400;
      font-size: 18px;
      display: flex;
      border-bottom: 1px solid #DCDCDC;
      justify-content: space-between;
      font-size: 16px;
     .content-item{
       height: 0.97rem;
       width: 24%;
       line-height: 0.97rem;
     }
    }
  }
}
//无数据
.no-data{
  width:100%;
  height:70%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .img-box{
    margin: auto;


    img{
      width:191px;
      height:191px;
      margin: auto;
    }
  }
  .no-data-text{
    width: 100%;
    margin-top:56px;
    color: #000000;
    text-indent: -47px;
    font-size: 16px;
  }
}

.search-business{
  width: 2rem;
  height: 0.4rem;
  margin-left: 0.2rem;
}
.select-style{
  width: 100%;
  height: 100%;
  border: none;
  text-indent: 1em;
  border:1px solid rgba(229,229,229,1);
  border-radius:0.05rem;
  font-size: 16px;
}

.block{
  margin: 0.8rem auto;
}
.orange{
  color: #F18721;
}

//固定一行显示
.textContentItem{     
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
