<template>
<div class="login">
  <div class="main-box">
    <div class="main">
      <div class="left"><h1 class="title">后台登录页</h1></div>
      <div class="right">
        <div class="login-title"><h3>用户登录</h3></div>

        <div class="login-info-box">
          <div class="account ">
            <span class="iconfont icon-user icon-style"></span>
            <input type="text" class="input-style" ref="account" placeholder="请输入您的账号">
          </div>

          <div class="password ">
            <span class="iconfont icon-mm icon-style" style="font-size:24px;"></span>
            <input type="password" class="input-style" ref="password" placeholder="请输入您的密码">
          </div>

          <div class="imgCode">
            <input type="text" ref="imgCode" maxlength="4" placeholder="请输入验证码" @keyup.enter="clickLogin"> 

            <Verify type="1" class="img" :code-length="4"></Verify>

          </div>

        </div>

        <div class="sub">
          <button class="submit" @click="clickLogin">立即登录</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import vueImgVerify from "../components/vue-img-verify.vue"
import Verify from '../components/Verify'
import axios from "axios"
import { Toast } from 'vant';
import { userLogin } from "../api/index.js"

export default {
  components:{
    vueImgVerify,
    Verify
  },
  data(){
    return{

    }
  },
  mounted(){
    // console.log("store信息",this.$store.state.userData)
  },
  methods:{
    // 点击登录
    clickLogin(){
      var account = this.$refs.account.value
      var password = this.$refs.password.value
      var imgCode = this.$refs.imgCode.value
      var data = { loginName:account, password:password } 
      if( account.length == 0 ){
        Toast("账号不能为空")
      }else if( password.length == 0){
        Toast("密码不能为空")
      }
      else if( imgCode.length == 0 || imgCode.toLowerCase() != this.$store.state.imgCode.toLowerCase() ){
        Toast("验证码错误")
      }
      else{
         //登录接口
        userLogin(data)
        .then( res => {
          if( res.data.code == 200 ){
            let userData = res.data
            // 把用户信息存到store
            this.$store.commit("userForLogin",userData)
            // 页面跳转
            if(this.$store.state.userData.data.sysId == 1){
              this.$router.push("home")
            }else{
              this.$router.push("businessSys")
            }
          }else{
            Toast("登录失败，账号或密码错误")
          }
        })
        .catch( error => {
          console.log("失败的回调",error)
        })

      }

      
    },
    //多重验证码
    alert(text) {

    },
    successCallback(){
    },
    errorCallback() {
    },
    isIOS() {
      let u = window.navigator.userAgent;
      return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
  }
}
</script>

<style lang="scss" scoped>
.login{
  height:100%;
  width: 100%;
  display: flex;
  align-items: center;
  background: url("~@/assets/images/back.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.main-box{
  position: relative;
  height: 4.5rem;
  width: 7.5rem;
  left: 25%;
}
.main{
  position: absolute;
  width:100%;
  height: 100%;
  display: flex;
}
.left{
  width: 35%;
  height: 100%;
  background: #F18721;
  overflow: hidden;
  display: flex;
  align-items: center;

  .title{
    width: 100%;
    color: #FFFFFF;
    text-align: center;
  }
}
.right{
  width: 65%;
  height: 100%;
  background: #FFFFFF;
  overflow: hidden;
  .login-title{
    margin-top: 0.4rem;
    margin-bottom: 0.2rem;
    font-size: 18px;
    color: #333333;
  }
  .login-info-box{
    width: 100%;
    .account{
      height: 0.56rem;
      width: 78%;
      margin: auto;
      border-bottom: 1px solid #CFCFCF;
    }

    .password{
      height: 0.56rem;
      width: 78%;
      margin: 0.2rem auto;
      border-bottom: 1px solid #CFCFCF;
    }

    .imgCode{
      height: 0.385rem;
      width: 78%;
      margin: 0.3rem auto;
      display: flex;
      input{
        border: none;
        background: #FFEEDD;
        color: #C9C4BF;
        height: 0.40rem;
        width: 1.27rem;
        border: 1px solid #CFCFCF;
        border-radius: 7px;
        font-size: 16px;
        text-indent: 1em;
      }
      .img{
        margin: 0 0.2rem;
        display: flex;
      }
      button{
        border: none;
        background: #FFFFFF;
        color: #F5AC76;
      }
    }
  }
  .sub{
     width: 100%;
     margin: auto;
     margin-top: 0.45rem;

    .submit{
      width: 78%;
      height: 0.5rem;
      border: none;
      background: #F18721;
      color: #FFFFFF;
      font-size: 16px;
      border-radius: 3px;
    }
  }
}
.input-style{
  border: none;
  width: 90%;
  height: 100%;
  font-size: 18px;
}
.icon-style{
  color: #B3B3B3;
  font-size: 20px;
  margin-right: 0.1rem;
}

a{
  text-decoration: underline;
}
a:link{
  color: #F5AC76
}
a:visited{
  color: #F5AC76
}
</style>
