<template>
<div class="side">
  <div class="main-box">
    <router-link to="/proxy/home" tag="div" class="main" active-class="active" v-if="!flag">
      <div class="icon"><span class="iconfont icon-xinlingshoudaohangicon-" style="font-size:20px"></span></div>
      <div class="content"><button class="button">代理管理</button></div>
    </router-link>
    <router-link to="/proxy/businessSys" tag="div" class="main" active-class="active">
      <div class="icon"><span class="iconfont icon-liebiao" style="font-size:20px"></span></div>
      <div class="content"><button class="button">渠道管理</button></div>
    </router-link>
    <router-link to="/proxy/goodsLink" tag="div" class="main" active-class="active">
      <div class="icon"><span class="iconfont icon-shangpin" style="font-size:20px"></span></div>
      <div class="content"><button class="button">商品链接</button></div>
    </router-link>
    <router-link to="/proxy/analysis" tag="div" class="main" active-class="active">
      <div class="icon"><span class="iconfont icon-qudao" style="font-size:20px"></span></div>
      <div class="content"><button class="button">渠道分析</button></div>
    </router-link>
    <router-link to="/proxy/goodsSys" tag="div" class="main" active-class="active">
      <div class="icon"><span class="iconfont icon-qudao" style="font-size:20px"></span></div>
      <div class="content"><button class="button">商品推荐</button></div>
    </router-link>

  </div>

</div>
</template>

<script>

export default {
components: {

},
data(){
    return{
      flag: false,
    }
},
created(){
  //超级管理员判定
  if(this.$store.state.userData.data.sysId != 1){
    this.flag = true;
  }
},
}
</script>

<style lang="scss" scoped>
.side{
  height: 91vh;
  width: 1.85rem;
  min-width: 1.85rem;
  top: 0;
  background: #1F2F3E;
  overflow: hidden;
}
.main-box{
  width: 1.85rem;
  height: 100%;
}
.main{
  width: 100%;
  height: 0.85rem;
  color: #AAAAAA;
  display: flex;
  font-size: 16px;
  .icon{
    height: 100%;
    line-height: 0.85rem;
    margin-left: 0.35rem;
    margin-right: 0.21rem;
  }
  .content{
    height: 100%;
    line-height: 0.85rem;
  }
}

.button{
  border: none;
  background: #1F2F3E;
}

.active{
  background: #49545F;
  color: #F18721;
  .button{
    background: #49545F;
  }
}
.active::before{
  content: "";
  width: 1px;
  height:0.83rem;
  background: #FFFFFF;
  border: 1px solid #FFFFFF;
}
a{
  text-decoration: none;
}
a:link{
  color: #AAAAAA
}
a:visited{
  color: #AAAAAA
}
</style>
