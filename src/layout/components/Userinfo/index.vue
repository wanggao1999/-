<template>
  <div>
      <el-card>
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div class="info">
          <el-form label-position="left" ref="form" :model="form" label-width="120px">
            <el-form-item label="公司名称">
              <el-input :value="form.compName"></el-input>
            </el-form-item>
            <el-form-item label="公司税号">
              <el-input :value="form.curTaxno"></el-input>
            </el-form-item>
            <el-form-item label="公司类型">
              <el-input :value="form.companyType"></el-input>
            </el-form-item>
            <el-form-item label="公司信用等级">
              <el-input :value="form.compLevel"></el-input>
            </el-form-item>
            <el-form-item label="纳税人资格">
              <el-input :value="form.taxpayerType"></el-input>
            </el-form-item>
            <el-form-item label="档案同步时间">
              <el-input :value="form.syncTime"></el-input>
            </el-form-item>
            <el-form-item label="申报状态" >
                <el-input :value="form.indexInfo==='0'?'已申报':'未申报'" />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
          compName: 'xxxx有限公司',
          curTaxno: '2155165198168',
          companyType: '生产企业',
          compLevel:'A',
          taxpayerType: '增值税一般纳税人',
          syncTime: '2020-12-05',
          indexInfo:'0'
        }
      }
    },
   methods:{
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>
<style lang="scss" scoped>
.info{
  width:40%;
  height: 100%;
}
</style>