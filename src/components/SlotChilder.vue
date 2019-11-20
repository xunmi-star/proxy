<template>
 <div class="slot-chlider">
    <div class="header">
      <slot name="header"></slot>
    </div>
     <div class="main">
      <slot></slot>
    </div>
     <div class="footer">
        <div class="box1">111111111111111</div>
        <slot name="footer"></slot>
        <div class="box2">22222222222222222</div>
    </div>
  </div> 
</template>

<script>
export default {
  data(){
      return{

      }
  }
}
</script>

<style lang="scss" scoped>

</style>
