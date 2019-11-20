<template>
<div class="home">
  <headers></headers>
  <side></side>
  <div class="main-box">
    <div class="main-header">
      <div class="search-box">
        <div class="search-business">
          <select class="select-style" id="select" @change="selectChange">
            <option value="">请选择渠道商</option>
            <option :value="item.businessId" v-for="(item,index) in allBusinessNameList" :key="index">{{ item.businessName }}</option>
          </select>
        </div>

        <div class="search">
          <button class="clickSearch" @click="clickSearch">搜索</button>
        </div>
      </div>

      <div class="add">
        <button class="clickAdd" @click="clickAdd">新增</button>  
      </div>
    </div>

    <div class="main">
      <div class="content">
        <div class="content-head">
          <div class="head-item">日期</div>
          <div class="head-item">渠道名</div>
          <div class="head-item">操作</div>
        </div>

        <div class="content-main" v-for="(item,index) in businessList" :key="index">
          <div class="content-item">{{ item.createTime | moment("YYYY-MM-DD HH:mm:ss") }}</div>
          <div class="content-item textContentItem">{{ item.businessName }}</div>
          <div class="content-item operate">
            <button class="edit" @click="clickEdit(item)">编辑</button>
            <button class="delete" @click="clickDelete(item)">删除</button>
          </div>
        </div>

        <!-- 暂无数据 -->
        <div class="no-data" v-show="flag">
          <div class="img-box">
            <img src="@/assets/images/nodata.png" alt=""/>
            <div class="no-data-text">暂无数据,请新增渠道</div>
          </div>
        </div>

        <!-- 分页 hide-on-single-page单页时不显示 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5]"
            :page-size="5"
            layout="total,prev, pager, next, jumper"
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
      <div class="input-name"><input type="text" ref="inputName" placeholder="请输入渠道名"></div>
    </div>

    <div class="slot-footer">
      <button class="firm" @click="clickFirm">确定</button>
      <button class="cancel" @click="clickCancel">取消</button>
    </div>
  </div>
</van-dialog>

  <!-- 点击编辑出现的弹窗 -->
<van-dialog  v-model="show" :close-on-click-overlay="overlayFalg" :show-cancel-button="cancelFalg" :show-confirm-button="cancelFalg"	 confirm-button-color="#FFFFFF" cancel-button-color="#FFFFFF">
  <div class="slotContent">
    <div class="title">编辑</div>
    <div class="name-box">
      <div class="name">渠道名：</div>
      <div class="input-name"><input type="text" ref="editName" :value="item.businessName"></div>
    </div>
    <div class="slot-footer">
      <button class="firm" @click="ClickEditFirm">确定</button>
      <button class="cancel" @click="ClickEditCancel">取消</button>
    </div>
  </div>
</van-dialog>

 <!-- 点击删除出现的弹窗 -->
<van-dialog style="height:200px;" v-model="delShow" :close-on-click-overlay="overlayFalg" :show-cancel-button="cancelFalg" :show-confirm-button="cancelFalg"	 confirm-button-color="#FFFFFF" cancel-button-color="#FFFFFF">
  <div class="slotContent2">
    <div class="title2">删除渠道</div>
    <div class="account-box2">
        是否确认删除此渠道
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
import { Dialog, Toast } from 'vant';
import { getBusiness, insertBusiness, changeBusiness, removeBusiness, businessCount, selectByBusinessSearch, selectByBusinessSearchs } from "../api/index.js"
import { getBsByBusiness,insertBs,changeBs, removeBs, bsCount } from "../api/index.js"
import headers from "../components/Head.vue"
import side from "../components/Side.vue"
// import { formatDate } from "../tool/format.js"
import axios from "axios"
import $ from "jquery"

export default {
  name: 'home',
  components: {
    headers,
    side,
  },
  data(){
      return{
        currentPage: 1,         // 分页-第一页
        num: 0,                 //总页数
        // 弹窗会用到 
        isShow: false,          //新增
        show: false,            //编辑
        delShow: false,         //删除
        cancelFalg:false,       //使默认的取消按钮不显示
        confirmFalg:false,      //使默认的确定按钮不显示
        overlayFalg:true,      //点击遮罩层使其关闭
        businessList:"",      //渠道列表
        item:"",              //点击编辑传过来的渠道信息
        delItem:"",           //点击删除传过来的渠道信息
        flag: true,         //无数据的标志

        allBusinessNameList: "",  //所有渠道名列表
        selectBusinessId: "0"      //点击搜索时传的渠道id
      }
  },
  mounted(){
    let token = this.$store.state.userData.token
    let data = {"pageNum":"1","pageSize":"5"}
    let headers = {"token":token}
    //渠道总量接口
    bsCount({},headers)
    .then( res => {
      if( res.data.code == 200 ){
        this.num = res.data.data
        if( res.data.data > 0){
            this.flag = false
          }else{
            this.flag = true
          }
      }
    })
    .catch( error => {
      console.log("失败的回调",error)
    })
    //渠道列表接口
    getBsByBusiness(data,headers)
    .then( res => {
      // console.log("代理渠道列表",res)
      if( res.data.code == 200 ){
        this.businessList = res.data.data
      }
    })
    .catch( error => {
      console.log("失败的回调",error)
    })

    // 获取所有渠道名
    selectByBusinessSearch({"createId": parseInt(this.$store.state.userData.data.sysId)},headers)
    .then( res =>{
      console.log("成功的回调",res)
      if(res.data.code == "200"){
        // console.log("success",res)
        this.allBusinessNameList = res.data.data
      }else{
        Toast(res.data.msg)
      }
    })
    .catch( error =>{
      console.log("error",error)
    })

  },
  methods:{
    //每页多少条
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    //当前第几页
    handleCurrentChange(val) {
      let token = this.$store.state.userData.token
      let data = {"pageNum": val, "pageSize":"5"}
      let headers = {"token":token}
      getBsByBusiness(data,headers)
      .then( res => {
        // console.log("第" + val +"页数据",res)
        if( res.data.code == 200 ){
          this.businessList = res.data.data
          if( res.data.data.length > 0){
            this.flag = false
          }else{
            this.flag = true
          }
        }
      })
      .catch( error => {
        console.log("失败的回调",error)
      })
    },

    //新增-弹窗
    clickAdd(){
      this.isShow = !this.isShow
    },
    //新增-确定按钮
    clickFirm(){
      if( this.$refs.inputName.value.length == 0 ){
        Toast("无效的操作，渠道名不能为空")
      }
     else{
        let token = this.$store.state.userData.token
        let data = {"businessName":this.$refs.inputName.value}
        let headers = {"token":token} 
        // 新增渠道接口
        insertBs({"businessName":this.$refs.inputName.value},headers)
        .then( res => {
          // console.log("新增渠道商",res)
          if( res.data.code == 200 ){
            // console.log("新增成功",res)
            Toast("新增成功")
            this.$router.go(0)
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


    //编辑-弹窗
    clickEdit(item){
      this.item = item
      this.show = !this.show
    },
    //编辑-确定按钮
    ClickEditFirm(){
      if( this.$refs.editName.value.length == 0 ){
        Toast("无效的操作，渠道名不能为空")
      }else{
        // 编辑渠道接口
        let token = this.$store.state.userData.token
        var businessId = this.item.businessId
        var businessName = this.$refs.editName.value
        let data = { "businessId":businessId, "businessName":businessName }
        let headers = {"token":token} 
        changeBs(data,headers)
        .then( res => {
          console.log("编辑渠道商",res)
          if( res.data.code == 200 ){
            Toast("编辑成功")
            this.$router.go(0)
            this.show = !this.show
          }
        })
        .catch( error => {
          console.log("失败的回调",error)
          this.show = !this.show
        })
      }
    },
    //编辑-取消按钮
     ClickEditCancel(){
      this.show = !this.show
    },



   //删除-弹窗
    clickDelete(item){
      console.log("点击删除按钮",item)
      this.delItem = item
      this.delShow = !this.delShow
    },
    //删除-确定按钮
    ClickDelFirm(){
      // 删除渠道接口
      let token = this.$store.state.userData.token
      var businessId = this.delItem.businessId
      let data = {"businessId":businessId}
      let headers = {"token":token} 
      removeBs(data,headers)
     .then( res => {
        // console.log("删除渠道商",res)
        if( res.data.code == 200 ){
          Toast("删除成功")
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
      this.selectBusinessId = changeVal
      console.log("当前渠道id",changeVal) 
    },
    //点击搜索
    clickSearch(){
      console.log("点击搜索")
      let token = this.$store.state.userData.token
      let data = {"businessId": parseInt(this.selectBusinessId), "sysId":parseInt(this.$store.state.userData.data.sysId)}
      let headers = {"token":token} 
      if(this.selectBusinessId != 0){
        selectByBusinessSearchs(data, headers)
        .then( res =>{
          console.log("success",res)
          if( res.data.code == "200" ){
            this.businessList = res.data.data
          }else{
            Toast(res.data.msg)
          }
          
        } )
        .catch( error => {
          console.log("error",error)
        } )
      }else{
        Toast("请选择渠道商")
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.home{
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
      .head-item{
        width:33%;
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
       width: 32%;
       line-height: 0.97rem;
     }
    }
  }
}
.operate{
  display: flex;
  height: 0.97rem;
  flex-wrap: wrap;
  justify-content: space-between;
  .edit{
    margin-left: 30%;
    color: #F18721;
    border: none;
    background: #FFFFFF;
  }
  .delete{
    margin-right: 25%;
    border: none;
    background: #FFFFFF;
  }
}
.block{
  margin: 0.8rem auto;
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
        text-indent: 2em;
        border: none;
        // background:rgba(255,255,255,1);
        border:1px solid rgba(229,229,229,1);
        border-radius:0.15rem;
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

.disabled{
  background: rgb(235, 235, 228);
}

.van-dialog{
  width: 6rem;
  height: 2.8rem;
}

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
