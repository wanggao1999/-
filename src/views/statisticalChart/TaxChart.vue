<!--进项统计-->
<template>
  <div class="Tax_statistics">
    <el-card id="card">
      <div slot="header">
        <el-date-picker
          :picker-options="PickerOptions"
          v-model="month"
          type="month"
          placeholder="选择月">
        </el-date-picker>
        <el-button icon="icon-search" type="primary">查询</el-button>
      </div>

    </el-card>

  </div>
</template>
<script>
export default {
  data() {
    return {
      month:'',
      PickerOptions:{
        disabledDate (time){
         return time>new Date()
 　　　　}
      },
    }
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
.Tax_statistics{
  .el-card{
    .el-card__header{
          padding: 25px 20px !important;
    }
    .el-button{
      margin-left: 25px;
    }
  }
}
</style>