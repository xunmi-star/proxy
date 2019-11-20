<template>
<div class="head">
  <div class="left">后台管理系统</div>
  <div class="right" @click="clickUser">
    <div class="user">{{ userName }}<i class="el-icon-caret-bottom icon-style" v-show="iconFlag"></i><i class="el-icon-caret-top icon-style" v-show="!iconFlag"></i></div>
    <i class="el-icon-caret-top icon-style2" v-show="!iconFlag"></i>
    <div class="loginOut" v-show="!iconFlag">
      <button @click="changePassword">修改密码</button>
      <div class="loginout-text">
        <a href="">退出登录</a>
      </div>
    </div>
  </div>

<!-- 点击修改密码出现的弹窗 -->
<van-dialog style="width:6rem;height:4.5rem;" v-model="show" :close-on-click-overlay="overlayFalg" :show-cancel-button="cancelFalg" :show-confirm-button="cancelFalg"	 confirm-button-color="#FFFFFF" cancel-button-color="#FFFFFF">
  <div class="slotContent">
    <div class="title">修改密码</div>
    <div class="name-box">
      <div class="name">旧密码：</div>
      <div class="input-name"><input type="text" ref="oldPassWord" placeholder="请输入旧密码" value=""></div>
    </div>
    <div class="account-box">
      <div class="account">新密码：</div>
      <div class="input-account"><input type="text" class="disabled" ref="newPassWord" placeholder="请输入新密码" value=""></div>
    </div>
    <div class="account-box" style="margin-bottom:0.5rem;">
      <div class="account">新密码：</div>
      <div class="input-account"><input type="text" class="disabled" ref="confirmPassWord" placeholder="请确认新密码" value=""></div>
    </div>
    <div class="slot-footer">
      <button class="firm" @click="ClickEditFirm">确定</button>
      <button class="cancel" @click="ClickEditCancel">取消</button>
    </div>
  </div>
</van-dialog>

</div>
</template>

<script>
import { Dialog, Toast } from 'vant';
import { changePassword } from "../api/index.js"

export default {
  name: 'home',
  components: {
    
  },
  data(){
      return{
        iconFlag: true,
        userName:"",
        show: false,            //修改密码
        overlayFalg:true,      //点击遮罩层使其关闭
        cancelFalg:false,       //使默认的取消按钮不显示
        confirmFalg:false,      //使默认的确定按钮不显示
      }
  },
  created(){
    // console.log("store用户数据",this.$store.state.userData)
    if( this.$store.state.userData.length < 1 ){
      // console.log("token为空，请重新登录")
      // this.$router.push("login")
    }else{
      // console.log("token长度",this.$store.state.userData.token.length)
    }
    this.userName = this.$store.state.userData.data.realName
    console.log("登录用户信息",this.$store.state.userData)
  },
  mounted(){
   
  },
  methods:{
    clickUser(){
      this.iconFlag = !this.iconFlag
    },

    //修改密码-弹窗
    changePassword(item){
      this.item = item
      this.show = !this.show
    },
    //修改密码-确定按钮
    ClickEditFirm(){
      let token = this.$store.state.userData.token
      let sysId = this.$store.state.userData.data.sysId
      let oldPassWord = this.$refs.oldPassWord.value
      let newPassWord = this.$refs.newPassWord.value
      let confirmPassWord = this.$refs.confirmPassWord.value
      let data = { "sysId": sysId, "oldPassword": oldPassWord, "password": confirmPassWord,}
      let headers = {"token":token}

      if(oldPassWord.length == 0){
        Toast("旧密码不能为空")
      }else if(newPassWord.length == 0){
        Toast("新密码不能为空")
      }
      else if(confirmPassWord.length == 0){
        Toast("确认新密码不能为空")
      }
       else if(newPassWord != confirmPassWord){
        Toast("请确保两次输入的新密码相同")
      }else{
        changePassword(data, headers)
        .then( res=> {
          // console.log(res)
          if( res.data.code == 200 ){
            // console.log(res.data.msg)
            alert("密码修改成功")
            this.$router.push("login")
          }else{
            console.log(res.data.msg)
          }
        })
        .catch( error=> {
          console.log(error)
        })
  
      }

      this.show = !this.show
    },
    //修改密码-取消按钮
     ClickEditCancel(){
      this.show = !this.show
    },
  }
}
</script>

<style lang="scss" scoped>
.head{
  width: 100%;
  height: 9vh;
  background: #1F2F3E;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left{
  height: 100%;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-left: 0.31rem;;
}
.right{
  height: 100%;
  width: 1.5rem;
  text-align: right;
  line-height: 0.8rem;
  margin-right: 0.32rem;
  font-size: 18px;
  color: #F18721;
}
.icon-style{
  margin-left: 0.24rem;
}
.icon-style2{
  display: inline-block;
  position: absolute;
  top: 58px;
  right: 69px;
  color: #FFFFFF;
}
.white{
  color: #FFFFFF;
}
.loginOut{
  position:absolute;
  border: none;
  font-size: 16px;
  color: #1F2F3E;
  background:rgba(255,255,255,1);
  box-shadow:0px 3px 5px 0px rgba(145, 145, 145, 0.35);
  right:0.58rem;
  top: 0.7rem;
  width: 0.86rem;
  height: 1.31rem;
  text-align: center;

  button{
    border: none;
    height: 0.52rem;
    background: #FFFFFF;
    border-bottom: 1px solid #1F2F3E;
  }
}
.loginout-text{
  height: 0.5rem;
  width: 0.65rem;
  border-bottom: 1px solid #1F2F3E;
  margin: -0.25rem auto;
  display: flex;
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


a:link{
  color: #1F2F3E
}
a:visited{
  color: #1F2F3E
}
</style>
