<template>
<div class="analysis">
  <headers></headers>
  <side></side>
  <div class="main-box">

    <div class="main">
      <div class="content">
        <div class="content-head">
          <div class="head-item" style="width:25%">商品名称</div>
          <div class="head-item" style="width:50%">首页推荐</div>
          <div class="head-item" style="width:10%">操作</div>
        </div>

        <div class="content-main">
          <div class="content-item textContentItem" style="width:25%">{{goodsList[0].goodsName}}</div>
          <div class="content-item textContentItem" style="width:50%">
                <select class="select-style" id="select" @change="selectChange">
                    <option value="">{{goodsList[0].left_goods?goodsList[0].left_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsName"
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>

                </select>

                <select class="select-style" id="select2" @change="selectChange2">
                    <option value="">{{goodsList[0].right_goods?goodsList[0].right_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsName"
                    :rightNum="item.right_num"
                    :rightPrice="item.right_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>
                </select>

      
          </div>
          <div class="content-item textContentItem" style="width:10%">
              <button class="set-goods" @click="setgoods(goodsList[0].goodsId)">提交</button>
          </div>
        </div>

        <div class="content-main" v-if="dataNum > 1">
          <div class="content-item textContentItem" style="width:25%">{{goodsList[1].goodsName}}</div>
          <div class="content-item textContentItem" style="width:50%">
                <select class="select-style" id="select-tow" @change="selectChangeTow">
                    <option value="">{{goodsList[1].left_goods?goodsList[1].left_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsId" 
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>

                </select>

                <select class="select-style" id="select-tow2" @change="selectChangeTow2">
                    <option value="">{{goodsList[1].right_goods?goodsList[1].right_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsName"
                    :rightNum="item.right_num"
                    :rightPrice="item.right_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>
                </select>
          </div>
          <div class="content-item textContentItem" style="width:10%">
              <button class="set-goods" @click="setgoods(goodsList[1].goodsId)">提交</button>
          </div>
        </div>

        <div class="content-main" v-if="dataNum > 2">
          <div class="content-item textContentItem" style="width:25%">{{goodsList[2].goodsName}}</div>
          <div class="content-item textContentItem" style="width:50%">
                <select class="select-style" id="select-three" @change="selectChangeThree">
                    <option value="">{{goodsList[2].left_goods?goodsList[2].left_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsId" 
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>

                </select>

                <select class="select-style" id="select-three2" @change="selectChangeThree2">
                    <option value="">{{goodsList[2].right_goods?goodsList[2].right_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsName"
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>
                </select>
          </div>
          <div class="content-item textContentItem" style="width:10%">
              <button class="set-goods" @click="setgoods(goodsList[2].goodsId)">提交</button>
          </div>
        </div>

        <div class="content-main" v-if="dataNum > 3">
          <div class="content-item textContentItem" style="width:25%">{{goodsList[3].goodsName}}</div>
          <div class="content-item textContentItem" style="width:50%">
                <select class="select-style" id="select-four" @change="selectChangeFour">
                    <option value="">{{goodsList[3].left_goods?goodsList[3].left_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsId"
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price" 
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>

                </select>

                <select class="select-style" id="select-four2" @change="selectChangeFour2">
                    <option value="">{{goodsList[3].right_goods?goodsList[3].right_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsName"
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>
                </select>
          </div>
          <div class="content-item textContentItem" style="width:10%">
              <button class="set-goods" @click="setgoods(goodsList[3].goodsId)">提交</button>
          </div>
        </div>

        <div class="content-main" v-if="dataNum > 4">
          <div class="content-item textContentItem" style="width:25%">{{goodsList[4].goodsName}}</div>
          <div class="content-item textContentItem" style="width:50%">
                <select class="select-style" id="select-five" @change="selectChangeFive">
                    <option value="">{{goodsList[4].left_goods?goodsList[4].left_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsId" 
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>

                </select>

                <select class="select-style" id="select-five2" @change="selectChangeFive2">
                    <option value="">{{goodsList[4].right_goods?goodsList[4].right_goods:"请选择推荐商品"}}</option>
                    <option 
                    :goodsId="item.goodsId"
                    :goodsName="item.goodsName"
                    :goodsUrl="item.url"
                    :goodsLog="item.logo"
                    :value="item.goodsName"
                    :leftNum="item.left_num"
                    :leftPrice="item.left_price"
                    v-for="(item,index) in goodsListAll" :key="index"
                    >{{item.goodsName}}</option>
                </select>
          </div>
          <div class="content-item textContentItem" style="width:10%">
              <button class="set-goods" @click="setgoods(goodsList[4].goodsId)">提交</button>
          </div>
        </div>

        <!-- 暂无数据 -->
        <div class="no-data" v-show="!flag">
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

        <!-- 点击提交出现的弹窗 -->
        <van-dialog style="height:200px;" v-model="show" :close-on-click-overlay="overlayFalg" :show-cancel-button="cancelFalg" :show-confirm-button="cancelFalg"	 confirm-button-color="#FFFFFF" cancel-button-color="#FFFFFF">
            <div class="slotContent">
                <div class="title2">提示</div>
                <div class="account-box2">
                    是否确认提交
                </div>
                <div class="slot-footer">
                <button class="firm" @click="ClickDelFirm">确定</button>
                <button class="cance" @click="ClickDelCancel">取消</button>
                </div>
            </div>
        </van-dialog>

      </div>
    </div>
    
  </div>
  
</div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import {goodsSys,goodsSys2,goodsSet } from "../api/index.js"
import headers from "../components/Head.vue"
import side from "../components/Side.vue"
import $ from "jquery"

export default {
  components: {
    headers,
    side,
  },
 data() {
    return {
      currentPage: 1,     // 默认选中的页码
      manageLogList:"",   //渠道列表
      num:0,              //总条数
      flag: true,         //无数据的标志
      show: false,            //提交
      cancelFalg:false,       //使默认的取消按钮不显示
      confirmFalg:false,      //使默认的确定按钮不显示
      overlayFalg:true,      //点击遮罩层使其关闭
      goodsList: "",          //商品列表-分页
      goodsListAll: "",          //商品列表-全部
      goodsLeftSetData:"",
      goodsRightSetData:"",
      homeId:"0",             //商品推荐的首页商品ID
      dataNum:"5",
    };
  },
  mounted(){
    let token = this.$store.state.userData.token
    var headers = {"token":token}
    goodsSys({},headers)
    .then( res => {
      if(res.data.code == 200){
        this.goodsListAll = res.data.massge
        this.num = res.data.massge.length
      }else{
        console.log(res.data.msg)
      }
      
    }  
    )
    .catch( error => {
      console.log("总数据请求出错")
    }
    )

    goodsSys2({"pageNum":"1","pageSize":"5"},headers)
    .then(res =>{
      if(res.data.code == 200){
        this.goodsList = res.data.massge.list
        this.dataNum = res.data.massge.list.length
      }else{
        console.log(res.data.msg)
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
    handleCurrentChange(temp) {       //页码改变
      let token = this.$store.state.userData.token
      let headers = {"token":token}
      let data = {"pageNum":temp,"pageSize":"5"} 
      goodsSys2(data,headers)
      .then( res=>  {
        if( res.data.code == "200" ){
          this.dataNum = res.data.massge.list.length
          this.goodsList = res.data.massge.list
        }else{
          Toast(res.data.msg)
        }
      })
      .catch( error =>{
        console.log("error",error)
      })

    },
    //选中商品id变化
    selectChange(){
      var lefttData = {
        data:{
          "leftId": $("#select option:selected").attr("goodsId"),
        "goodsName": $("#select option:selected").attr("goodsName"),
        "goodsUrl": $("#select option:selected").attr("goodsUrl"),
        "goodsLog": $("#select option:selected").attr("goodsLog"),
        "leftPrice": $("#select option:selected").attr("leftPrice"),
        "leftNum": $("#select option:selected").attr("leftNum"),
        }
      }
      this.goodsLeftSetData = lefttData
      console.log("左边",this.goodsLeftSetData)
    },
    selectChange2(){
      var rightData = {
        data:{
          "rightId": $("#select2 option:selected").attr("goodsId"),
        "goodsName": $("#select2 option:selected").attr("goodsName"),
        "goodsUrl": $("#select2 option:selected").attr("goodsUrl"),
        "goodsLog": $("#select2 option:selected").attr("goodsLog"),
        "rightPrice": $("#select2 option:selected").attr("rightPrice"),
        "rightNum": $("#select2 option:selected").attr("rightNum"),
        }
      }
      this.goodsRightSetData = rightData
      console.log("el-notification-fade-enter右边",this.goodsRightSetData)
    },
    selectChangeTow(){
      var lefttData = {
        data:{
          "leftId": $("#select-tow option:selected").attr("goodsId"),
        "goodsName": $("#select-tow option:selected").attr("goodsName"),
        "goodsUrl": $("#select-tow option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-tow option:selected").attr("goodsLog"),
        "leftPrice": $("#select-tow option:selected").attr("leftPrice"),
        "leftNum": $("#select-tow option:selected").attr("leftNum"),
        }
      }
      this.goodsLeftSetData = lefttData
      //console.log(this.goodsLeftSetData)
    },
    selectChangeTow2(){
      var rightData = {
        data:{
          "rightId": $("#select-tow2 option:selected").attr("goodsId"),
        "goodsName": $("#select-tow2 option:selected").attr("goodsName"),
        "goodsUrl": $("#select-tow2 option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-tow2 option:selected").attr("goodsLog"),
        "rightPrice": $("#select-tow2 option:selected").attr("rightPrice"),
        "rightNum": $("##select-tow2 option:selected").attr("rightNum"),
        }
      }
      this.goodsRightSetData = rightData
      console.log(this.goodsRightSetData)
    },
    selectChangeThree(){
      var lefttData = {
        data:{
          "leftId": $("#select-three option:selected").attr("goodsId"),
        "goodsName": $("#select-three option:selected").attr("goodsName"),
        "goodsUrl": $("#select-three option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-three option:selected").attr("goodsLog"),
        "leftPrice": $("#select-three option:selected").attr("leftPrice"),
        "leftNum": $("#select-three option:selected").attr("leftNum"),
        }
      }
      this.goodsLeftSetData = lefttData
      //console.log(this.goodsLeftSetData)
    },
    selectChangeThree2(){
      var rightData = {
        data:{
          "rightId": $("#select-three2 option:selected").attr("goodsId"),
        "goodsName": $("#select-three2 option:selected").attr("goodsName"),
        "goodsUrl": $("#select-three2 option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-three2 option:selected").attr("goodsLog"),
        "rightPrice": $("#select-three2 option:selected").attr("rightPrice"),
        "rightNum": $("#select-three2 option:selected").attr("rightNum"),
        }
      }
      this.goodsRightSetData = rightData
      //console.log(this.goodsRightSetData)
    },
    selectChangeFour(){
      var lefttData = {
        data:{
          "leftId": $("#select-four option:selected").attr("goodsId"),
        "goodsName": $("#select-four option:selected").attr("goodsName"),
        "goodsUrl": $("#select-four option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-four option:selected").attr("goodsLog"),
        "leftPrice": $("#select-four option:selected").attr("leftPrice"),
        "leftNum": $("#select-four option:selected").attr("leftNum"),
        }
      }
      this.goodsLeftSetData = lefttData
      //console.log(this.goodsLeftSetData)
    },
    selectChangeFour2(){
      var rightData = {
        data:{
          "rightId": $("#select-four2 option:selected").attr("goodsId"),
        "goodsName": $("#select-four2 option:selected").attr("goodsName"),
        "goodsUrl": $("#select-four2 option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-four2 option:selected").attr("goodsLog"),
        "rightPrice": $("#select-four2 option:selected").attr("rightPrice"),
        "rightNum": $("#select-four2 option:selected").attr("rightNum"),
        }
      }
      this.goodsRightSetData = rightData
      //console.log(this.goodsRightSetData)
    },
    selectChangeFive(){
      var lefttData = {
        data:{
          "leftId": $("#select-five option:selected").attr("goodsId"),
        "goodsName": $("#select-five option:selected").attr("goodsName"),
        "goodsUrl": $("#select-five option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-five option:selected").attr("goodsLog"),
        "leftPrice": $("#select-five option:selected").attr("leftPrice"),
        "leftNum": $("#select-five option:selected").attr("leftNum"),
        }
      }
      this.goodsLeftSetData = lefttData
      //console.log(this.goodsLeftSetData)
    },
    selectChangeFive2(){
      var rightData = {
        data:{
          "rightId": $("#select-five2 option:selected").attr("goodsId"),
        "goodsName": $("#select-five2 option:selected").attr("goodsName"),
        "goodsUrl": $("#select-five2 option:selected").attr("goodsUrl"),
        "goodsLog": $("#select-five2 option:selected").attr("goodsLog"),
        "rightPrice": $("#select-five2 option:selected").attr("rightPrice"),
        "rightNum": $("#select-five2 option:selected").attr("rightNum"),
        }
      }
      this.goodsRightSetData = rightData
      //console.log(this.goodsRightSetData.data.goodsName)
    },



    //提交-弹窗
    setgoods(homeId){
      this.show = !this.show
      this.homeId = homeId
    },
    //提交-确定按钮
    ClickDelFirm(){
        Toast("提交-确定");
        let token = this.$store.state.userData.token
        let headers = {"token":token}
        var data = {
          "goodsId":this.homeId,
          "left_id":this.goodsLeftSetData.data.leftId,
          "left_goods":this.goodsLeftSetData.data.goodsName,
          "left_log":this.goodsLeftSetData.data.goodsLog,
          "left_url":this.goodsLeftSetData.data.goodsUrl,
          "left_price":this.goodsLeftSetData.data.leftPrice,
          "left_num":this.goodsLeftSetData.data.leftNum,
          

          "right_id":this.goodsRightSetData.data.rightId,
          "right_goods":this.goodsRightSetData.data.goodsName,
          "right_log":this.goodsRightSetData.data.goodsLog,
          "right_url":this.goodsRightSetData.data.goodsUrl,
          "right_price":this.goodsRightSetData.data.rightPrice,
          "right_num":this.goodsRightSetData.data.rightNum,
        }
        console.log("提交信息",data)

        goodsSet(data,headers)
        .then(res =>{
          Toast("提交成功")
        }
          
        )
        .catch(error =>{
          Toast("提交请求失败")
        })

        this.show = !this.show
    },
    //编辑-取消按钮
     ClickDelCancel(){
      this.show = !this.show
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
  height: 98%;
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
  margin-top: 0.3rem;

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
        height: 100%;
        font-size: 18px;
        color: #191919;
        line-height: 0.57rem;
      }
    }
    .content-main{
      height: 0.8rem;
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
       height: 0.8rem;
      
       line-height: 0.8rem;
     }
    }
  }
}
.set-goods{
    border: none;
    background: white;
    color: #F18721;
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
  width: 50%;
  height: 100%;
  border: none;
  text-indent: 1em;
  border:1px solid rgba(229,229,229,1);
  border-radius:0.05rem;
  font-size: 16px;
}

.block{
  margin: 0.5rem auto;
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

//弹窗样式
.van-dialog{
  width: 6rem;
  height: 3.8rem;
}
.slotContent{
  height: 2.5rem;
  margin-bottom: 0.74rem;

  .title2{
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

  .account-box2{
    width: 100%;
    height: 0.6rem;
    line-height: 0.60rem;
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
    .cance{
      height: 100%;
      width: 1.44rem;
      color: #FFFFFF;
      background: #7D7D7D;
      border: none;
      border-radius: 0.15rem;
    }
  }
}
</style>
