<template>
<div class="link">
  <headers></headers>
  <side></side>
  <div class="main-box">

    <div class="add" style="height:12%; margin-left:2%;">
      <button class="clickAdd" @click="clickAdd">新增</button>  
    </div>

    <!-- <div class="main-header">
      <div class="search-box">
        <div class="search-business">
          <select class="select-style" id="select" @change="selectChange">
            <option value="0">请选择渠道</option>
            <option value="1">渠道1</option>
            <option value="2">渠道2</option>
            <option value="3">渠道3</option>
          </select>
        </div>

        <div class="search">
          <button class="clickSearch" @click="clickSearch">搜索</button>
        </div>
      </div>

      <div class="add">
        <button class="clickAdd" @click="clickAdd">新增</button>  
      </div>
    </div> -->


    <div class="main">
      <div class="content">
        <div class="content-head">
          <!-- <div class="head-item">日期</div> -->
          <div class="head-item" style="width:10%;text-indent:2em;">渠道名</div>
          <div class="head-item" style="width:40%">商品名称</div>
          <div :class="{'head-item':true, 'width40': true, 'width50': flag}" >推广链接</div>
          <div class="head-item" style="width:10%;text-indent:-2em;" v-if="!flag">操作</div>
        </div>

        <div class="content-main" v-for="(item,index) in bsGoodsList" :key="index">
          <div class="content-item textContentItem" style="width:10%">{{ item.businessName }}</div>
          <div class="content-item textContentItem width40" >{{ item.goodsName }}</div>
          <div :class="{'content-item':true, 'fixedRow':true, 'width40':true, 'width50': flag, 'em10':flag}">{{ item.url }}</div>
          <div class="content-item operate" style="width:10%">
            <button class="delete" @click="clickDelect(item.id)" v-if="!flag">删除</button>
          </div>
        </div>

         <!-- 暂无数据 -->
        <div class="no-data" v-show="noDataFlag">
          <div class="img-box">
            <img src="@/assets/images/nodata.png" alt=""/>
            <div class="no-data-text">暂无数据,请新增渠道链接，如果没有渠道供您选择，请先去<span style="color:red">我的渠道</span>新增</div>
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
<!-- 点击新增出现的弹窗 -->
<van-dialog v-model="isShow" :close-on-click-overlay="overlayFalg" :show-cancel-button="cancelFalg" :show-confirm-button="cancelFalg"	 confirm-button-color="#FFFFFF" cancel-button-color="#FFFFFF">
  <div class="slotContent">
    <div class="title">新增</div>
    <div class="name-box">
      <div class="name">渠道名：</div>
      <div class="input-name">

        <select class="select-style" id="select">
          <option :value="item.businessId" v-for="(item, index) in businessAll" :key="index" ref="businessName">{{ item.businessName }}</option>
        </select>

      </div>
    </div>
    <div class="account-box">
      <div class="account">商品：</div>
      <div class="input-account">
        <!-- <input type="text" ref="inputName" placeholder="请输入商品名"> -->

        <select class="select-style" id="select2">
          <option :value ="item.goodsId" v-for="(item, index) in goodsAll" :key="index">{{ item.goodsName }}</option>
        </select>
      </div>
    </div>
    <div class="slot-footer">
      <button class="firm" @click="clickFirm">确定</button>
      <button class="cancel" @click="clickCancel">取消</button>
    </div>
  </div>
</van-dialog>

 <!-- 点击删除出现的弹窗 -->
<van-dialog style="height:200px;" v-model="delShow" :close-on-click-overlay="overlayFalg" :show-cancel-button="cancelFalg" :show-confirm-button="cancelFalg"	 confirm-button-color="#FFFFFF" cancel-button-color="#FFFFFF">
  <div class="slotContent2">
    <div class="title2">删除链接</div>
    <div class="account-box2">
        是否确认删除此链接
    </div>
    <div class="slot-footer">
      <button class="firm" @click="ClickDelFirm">确定</button>
      <button class="cancel" @click="ClickDelCancel">取消</button>
    </div>
  </div>
</van-dialog>



</div>
</template>

<script>
import headers from "../components/Head.vue"
import side from "../components/Side.vue"
import $ from "jquery"
import { bsGoodsCount ,getBsGoods, insertBsGoods, getBusinessAll, getGoods, deleteBsGoods } from "../api/index.js"
import { Dialog, Toast } from 'vant';

export default {
  name: 'home',
  components: {
    headers,
    side,
  },
  data(){
      return{
        //分页，显示的页码
        currentPage: 1,
        //商品链接的总数
        num:0,
        // 弹窗会用到 
        isShow: false,          //新增
        delShow: false,         //删除
        cancelFalg:false,       //使默认的取消按钮不显示
        confirmFalg:false,      //使默认的确定按钮不显示
        overlayFalg:true,      //点击遮罩层使其关闭
        //渠道列表
        bsGoodsList:"",
        //下拉菜单
        value: 0,
        option: [
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 }
        ],
        //所有渠道名
        businessAll: "",
        //所以商品名
        goodsAll: "",
        //是否隐藏删除操作
        flag: false,
        //点击删除传过来的渠道信息
        delId:"",
        //无数据的标志
        noDataFlag:true,
      }
  },
  created(){
    //隐藏删除操作
    if(this.$store.state.userData.data.sysId != 1){
      this.flag = true;
    }
  },
  mounted(){
    let token = this.$store.state.userData.token
    let data = {"pageNum":"1","pageSize":"5"}
    let headers = {"token":token}
    //总页数接口
    bsGoodsCount({},headers)
    .then( res => {
      if( res.data.code == 200 ){
        //  console.log("商品总量",res)
        this.num = res.data.data
        if(res.data.data != 0){
          this.noDataFlag = false
        }else{
          this.noDataFlag = true
        }
      }
    })
    .catch( error => {
      console.log("失败的回调",error)
    })

    // 渠道列表接口-初始化
    getBsGoods(data,headers)
    .then( res => {
      console.log("初始化的商品列表数据",res)
      if( res.data.code == 200 ){
        this.bsGoodsList = res.data.data
        
        if(res.data.data.length > 0){
            this.noDataFlag = false
        }else{
          this.noDataFlag = true
        }
      }
    })
    .catch( error => {
      console.log("失败的回调",error)
    })

    //获取所有渠道名
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

    //获取所有商品名
    getGoods({},headers)
    .then( res => {
      if( res.data.code == 200 ){
        //  console.log("所有商品名",res)
        this.goodsAll = res.data.data
      }
    })
    .catch( error => {
      console.log("失败的回调",error)
    })
  },
  methods:{
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      let token = this.$store.state.userData.token
      let data = {"pageNum": val, "pageSize":"5"}
      let headers = {"token":token}
      getBsGoods(data,headers)
      .then( res => {
        // console.log("第" + val +"页数据",res)
        if( res.data.code == 200 ){
          this.bsGoodsList = res.data.data
          if(res.data.data.length > 0){
            this.noDataFlag = false
          }else{
            this.noDataFlag = true
          }
        }
      })
      .catch( error => {
        console.log("失败的回调",error)
      })
    },

    //新增-弹窗
    clickAdd(){
      // console.log("点击添加按钮")
      this.isShow = !this.isShow
    },
    //新增-确定按钮
    clickFirm(){
      var businessId = $("#select option:selected").val()
      var goodsId = $("#select2 option:selected").val()
      if( businessId.length == 0 ){
        Toast("无效的操作，渠道名不能为空")
      }
      else if( goodsId.length == 0 ){
        Toast("无效的操作，商品不能为空")
      }else{
        let token = this.$store.state.userData.token
        let data = {"businessId":businessId, "goodsId":goodsId}
        let headers = {"token":token} 
        // 增加渠道的商品链接
        insertBsGoods(data,headers)
        .then( res => {
          if( res.data.code == 200 ){
            this.$router.go(0)
            Toast("新增成功",res)
          }
        })
        .catch( error => {
          console.log("失败的回调",error)
        })
      } 
      this.isShow = !this.isShow
    },
    //新增-取消按钮
     clickCancel(){
      this.isShow = !this.isShow
    },

      //删除-弹窗
    clickDelect(id){
      console.log("点击删除按钮",id)
      this.delId = id
      this.delShow = !this.delShow
    },
    //删除-确定按钮
    ClickDelFirm(){
    let token = this.$store.state.userData.token
    let data = {"id":this.delId}
    let headers = {"token":token}
    deleteBsGoods(data,headers)
    .then( res => {
      if( res.data.code == 200 ){
        Toast("删除成功",res) 
        this.$router.go(0)
      }
    })
    .catch( error => {
      console.log("失败的回调",error)
    })

      this.delShow = !this.delShow
    },
    //删除-取消按钮
     ClickDelCancel(){
      this.delShow = !this.delShow
    },

     //渠道id变化
    selectChange(){
      var changeVal = $("#select option:selected").val()
      console.log("当前渠道id",changeVal) 
    },
    //点击搜索
    clickSearch(){
      console.log("点击搜索")
    }

  }
}
</script>

<style lang="scss" scoped>
.link{
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
    }
  }
}

.head-item{
  width:25%;
  height: 100%;
  font-size: 18px;
  color: #191919;
  line-height: 0.57rem;
}
 .content-item{
  height: 0.97rem;
  width: 25%;
  line-height: 0.97rem;
}

.operate{
  height: 0.97rem;
  .delete{
    border: none;
    background: #FFFFFF;
  }
}
.block{
  margin: 0.8rem auto;
}
.fixedRow{
  word-break:keep-all;      
  white-space:nowrap;     
  overflow:hidden;           
  text-overflow:ellipsis;   
}


.slotContent{
  height: 2.5rem;
  margin-bottom: 0.74rem;

  .title{
    height: 0.52rem;
    width: 6rem;
    color: #010101;
    background: #FFDBB9;
    line-height: 0.52rem;
  }
  .name-box{
    display: flex;
    width: 100%;
    height: 0.51rem;
    line-height: 0.50rem;
    margin: auto;
    margin: 0.38rem auto;
    .name{
      width: 0.65rem;
      font-size: 16px;
      margin: 0 0.3rem 0 0.54rem;
    }
    .input-name{
      width: 67%;
      input{
        width: 100%;
        text-indent: 2em;
        border: none;
        // background:rgba(255,255,255,1);
        border:1px solid rgba(229,229,229,1);
        border-radius:0.15rem;
      }
      select{
        width: 100%;
        height: 100%;
        border: none;
        text-indent: 1em;
        border:1px solid rgba(229,229,229,1);
        border-radius:0.15rem;
        font-size: 16px;
      }
    }
  }

  .account-box{
    display: flex;
    width: 100%;
    height: 0.51rem;
    line-height: 0.50rem;
    margin: auto;
    margin: 0.38rem auto;
    .account{
      width: 0.65rem;
      font-size: 16px;
      margin: 0 0.3rem 0 0.54rem;
    }
    .input-account{
      width: 67%;
      input{
        width: 100%;
        text-indent: 1em;
        border: none;
        // background:rgba(255,255,255,1);
        border:1px solid rgba(229,229,229,1);
        border-radius:0.15rem;
      }
      select{
        width: 100%;
        height: 100%;
        border: none;
        text-indent: 1em;
        border:1px solid rgba(229,229,229,1);
        border-radius:0.15rem;
        font-size: 16px;
      }
    }
  }
  .slot-footer{
    width: 100%;
    height: 0.53rem;
    font-size:16px;
    .firm{
      height: 100%;
      width: 1.44rem;
      color: #FFFFFF;
      background: #F18721;
      border: none;
      margin-right: 0.96rem;
      border-radius: 0.15rem;
    }
    .cancel{
      height: 100%;
      width: 1.44rem;
      color: #FFFFFF;
      background: #7D7D7D;
      border: none;
      border-radius: 0.15rem;
    }
  }
}

.slotContent2{
  height: 1.5rem;
  margin-bottom: 0.74rem;

  .title2{
    height: 0.52rem;
    width: 6rem;
    color: #010101;
    background: #FFDBB9;
    line-height: 0.52rem;
  }
  .account-box2{
    height:0.6rem;
    width:100%;
    line-height: 0.6rem;
  }
  .slot-footer{
    width: 100%;
    height: 0.53rem;
    font-size:16px;
    .firm{
      height: 100%;
      width: 1.44rem;
      color: #FFFFFF;
      background: #F18721;
      border: none;
      margin-right: 0.96rem;
      border-radius: 0.15rem;
    }
    .cancel{
      height: 100%;
      width: 1.44rem;
      color: #FFFFFF;
      background: #7D7D7D;
      border: none;
      border-radius: 0.15rem;
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

.width40{
  width: 40%;
}
.width50{
  width: 50%;
}
.em10{
  text-indent: 10em;
}

.disabled{
  background: rgb(235, 235, 228);
}
.van-dialog{
  width: 6rem;
  height: 3.8rem;
}
//固定一行显示
.textContentItem{     
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.main-header{
  display: flex;
  flex-wrap: wrap;
  height: 12%;
  width: 96%;
  margin: auto;
}
.search-box{
  height: 100%;
  width: calc(100% - 1.41rem);
  display: flex;
  align-items: center;
}
.search-business{
  width: 2rem;
  height: 0.56rem;
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
.search{
  height: 0.56rem;
  margin-left: 2%;
  display: flex;
  align-items: center;
  .clickSearch{
    border: none;
    height: 100%;
    width: 1.41rem;
    font-size:18px;
    border-radius: 0.15rem;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    background: #F18721;
    margin-left: 0.2rem;
  }
}
.add{
  height: 100%;
  display: flex;
  align-items: center;
  .clickAdd{
    border: none;
    height: 0.56rem;
    width: 1.41rem;
    border-radius: 0.15rem;
    font-size:18px;
    font-family:PingFang-SC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    background: #F18721;
  }
}
</style>
