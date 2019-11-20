<template>
<div class="analysis">
  <headers></headers>
  <side></side>
  <div class="main-box">
    <div class="search">

      <el-time-picker
        v-model="value1"
        @change="change1"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }"
        placeholder="任意时间点">
      </el-time-picker>

      <span style="margin:0.1rem">—</span>

      <el-time-picker
        v-model="value2"
        @change="change2"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59'
        }"
        placeholder="任意时间点">
      </el-time-picker>

      <div class="search-business">
        <select class="select-style" id="select" @change="selectChange">
          <option value="0">订单状态</option>
          <option value="1">未处理</option>
          <option value="2">已确认</option>
          <option value="3">废单</option>
          <option value="4">配送中</option>
          <option value="5">签收</option>
          <option value="6">拒收</option>
          <option value="7">短信确认</option>
        </select>
      </div>

      <div class="search">
        <button class="clickSearch" @click="clickSearch">搜索</button>
      </div>

    </div>

    <div class="main">
      <div class="content">
        <div class="content-head">
          <div class="head-item">下单时间</div>
          <div class="head-item">商品名称</div>
          <div class="head-item">数量</div>
          <div class="head-item">金额</div>
          <div class="head-item">收货人姓名</div>
          <div class="head-item">收货人电话</div>
          <div class="head-item">颜色/尺寸</div>
          <div class="head-item">收货地址</div>
          <div class="head-item">订单状态</div>
        </div>

        <div class="content-main" v-for="(item,index) in orderList" :key="index">
          <div class="content-item textContentItem">{{item.time}}</div>
          <div class="content-item textContentItem">{{item.goodsName}}</div>
          <div class="content-item textContentItem">{{item.orderNum}}</div>
          <div class="content-item">{{item.price}}</div>
          <div class="content-item">{{item.consignee}}</div>
          <div class="content-item textContentItem">{{item.phone}}</div>
          <div class="content-item textContentItem" :title="[item.colour , item.size]">{{item.colour}}<span>/{{item.size}}</span></div>
          <div class="content-item textContentItem" :title="item.address">{{item.address}}</div>
          <div class="content-item textContentItem">{{item.nameStatus}}</div>
        </div>

        <!-- 暂无数据 -->
        <div class="no-data" v-show="flag">
          <div class="img-box">
            <img src="@/assets/images/nodata.png" alt=""/>
            <div class="no-data-text">暂无数据</div>
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
import { queryOderDetails } from "../api/index.js"
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
      value: "",          // 日期时间选择器
      manageLogList:"",   //渠道列表
      num:0,              //总条数
      nowTime: "",         //初始化时间
      changeDate: "",      //选中时间
      flag: true,         //无数据的标志
      businessAll: "",    //所有渠道名
      changeStatus: "0",       //搜索id
      timeList: [],       //时间数组
      value1: new Date(2019, 9, 10, 0, 0, 0),  //开始时间默认值
      value2: new Date(2019, 9, 10, 23, 59, 59),  //结束时间默认值
      startTime: "",
      endTime: "",
      goodsInfoItem: "",       //保存从渠道分析传过来的item信息
      orderList: "",          //订单列表
      orderStatusList: [],    //状态码列表
      bid: false,
    };
  },
  created(){
    var tempTime2 = new Date()
    this.nowTime = this.$moment(tempTime2).format("YYYY-MM-DD")
  },
  mounted(){
    //从渠道分析传过来的数据
    // console.log(typeof(this.$route.query.InfoItem))
    if(typeof(this.$route.query.InfoItem) == "object"){
      this.$store.commit("goodsInfoByAnalysis",this.$route.query.InfoItem)
    }
    console.log("需要的数据",this.$store.state.goodsInfoItem)
    //订单详情列表初始化
    this.startTime = this.$store.state.goodsInfoItem.date + " " + "00:00:00"
    this.endTime = this.$store.state.goodsInfoItem.date + " " + "23:59:59"

    let token = this.$store.state.userData.token
    let businessId = this.$store.state.goodsInfoItem.businessId
    let date = this.$store.state.goodsInfoItem.date
    let goodsId = this.$store.state.goodsInfoItem.goodsId
    let bid = this.changeStatus
    let headers = {"token":token}
    let data = { "goodsId":goodsId ,"businessId":businessId, "bid":this.bid, "pageNum":"1" ,"pageSize":"5", "startTime":this.startTime, "endTime":this.endTime } 
    queryOderDetails(data,headers)
    .then( res=>  {
      console.log("success",res)
      if( res.data.code == "200" ){
        this.orderList = res.data.data
        this.num = res.data.page.total
        if( res.data.page.total > 0 ){
          this.flag = false
        }else{
          this.flag = true
        }
      }else{
        Toast(res.data.msg)
      }
    })
    .catch( error =>{
      console.log("error",error)
    })
  },

  methods:{
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(temp) {
      //页码改变
      this.pageValue = temp
      let token = this.$store.state.userData.token
      let businessId = this.$store.state.goodsInfoItem.businessId
      let goodsId = this.$store.state.goodsInfoItem.goodsId
      let date = this.$store.state.goodsInfoItem.date
      let bid = this.changeStatus
      let headers = {"token":token}
      let data = { "goodsId":goodsId, "businessId":businessId, "startTime":this.startTime, "endTime":this.endTime, "bid":this.bid, "pageNum":temp ,"pageSize":"5","orderStatus":this.changeStatus} 
      queryOderDetails(data,headers)
      .then( res=>  {
        console.log("success",res)
        if( res.data.code == "200" ){
          this.orderList = res.data.data
          this.num = res.data.page.total
          if( res.data.page.total > 0 ){
            this.flag = false
          }else{
            this.flag = true
          }
        }else{
          Toast(res.data.msg)
        }
      })
      .catch( error =>{
        console.log("error",error)
      })

    },

    //选中时间
    change1(val){
      this.startTime = this.$store.state.goodsInfoItem.date + " " + this.$moment(val).format("HH:mm:ss")
      console.log("开始时间",this.startTime)
    },
    change2(val){
      this.endTime = this.$store.state.goodsInfoItem.date + " " + this.$moment(val).format("HH:mm:ss")
      console.log("结束时间",this.endTime)
    },

    //订单状态变化
    selectChange(){
      var changeVal = $("#select option:selected").val()
      this.changeStatus = parseInt(changeVal)
      console.log("当前订单状态码:",typeof(this.changeStatus))
    },

    //点击搜索
    clickSearch(){
      this.bid = true

      let token = this.$store.state.userData.token
      let businessId = this.$store.state.goodsInfoItem.businessId
      let goodsId = this.$store.state.goodsInfoItem.goodsId
      let date = this.$store.state.goodsInfoItem.date
      let bid = this.changeStatus
      let headers = {"token":token}
      let data = { "goodsId":goodsId, "businessId":businessId, "bid":this.bid, "pageNum":1 ,"pageSize":"5", "startTime":this.startTime, "endTime":this.endTime, "orderStatus":this.changeStatus} 
      queryOderDetails(data,headers)
      .then( res=>  {
        console.log("success",res)
        if( res.data.code == "200" ){
          this.orderList = res.data.data
          this.num = res.data.page.total
          if( res.data.page.total > 0 ){
            this.flag = false
          }else{
            this.flag = true
          }
        }else{
          Toast(res.data.msg)
        }
      })
      .catch( error =>{
        console.log("error",error)
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
  h2{
    margin-right: 0.2rem;
  }
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
  width: 1.2rem;
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
