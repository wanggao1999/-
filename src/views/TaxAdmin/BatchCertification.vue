<!--发票认证-->
<template>
  <div>
   <el-card id="card">
     <div slot="header">
       <el-button icon="el-icon-back" type="primary" @click="()=>{$router.go(-1)}">返回</el-button>
     </div>
     <el-table
          :data="tableData"
          :border=true
          style="width: 100%"
        >
          <el-table-column align="center" label="发票代码"  prop="code">
          </el-table-column>
          <el-table-column  align="center" prop="number" label="发票号码" >
          </el-table-column>
        <el-table-column align="center" prop="datatime" label="发票日期" >
          </el-table-column>
          <el-table-column  align="center" label="发票状态" show-overflow-tooltip>
            <template slot-scope="{row}">
                <el-tag type="danger" v-if="row.type===1">失败</el-tag>
                <el-tag type="success" v-else>成功</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="描述" >
          </el-table-column>
          <el-table-column align="center"  label="操作">
            <template>
              <div>
                <el-button size="mini" type="primary" icon="el-icon-more">详情</el-button>
              </div>
            </template>
          </el-table-column>
     </el-table>
   </el-card>
  </div>
</template>
<script>
export default {
  mounted(){
   document.getElementById('card').style.width = document.documentElement.offsetWidth-200+ 'px'
 },
  data() {
    return {
      tableData: [
        {
          code:'1234567',
          number: "5678901",
          type: 0,
          datatime:'2020-02-03',
          name:'123',
        },
        {
          code:'1234567',
          number: "5678901",
          type: 0,
          datatime:'2020-02-03',
          name:'123',
        },
        {
          code:'1234567',
          number: "5678901",
          type: 0,
          datatime:'2020-02-03',
          name:'123',
        },
      ],
    }
  },
}
</script>