<!--风险预警-->
<template>
  <div>
   <el-card id="card">
     <el-table
          :data="tableData"
          :border=true
          style="width: 100%"
        >
          <el-table-column align="center" label="发票代码"  prop="code">
          </el-table-column>
          <el-table-column  align="center" prop="number" label="发票号码" >
          </el-table-column>
          <el-table-column  align="center" prop="kind" label="发票种类">
          </el-table-column>
          <el-table-column  align="center" label="发票状态" show-overflow-tooltip>
            <template slot-scope="{row}">
                <el-tag type="danger" v-if="row.type===1">失控</el-tag>
            </template>
          </el-table-column>
           <el-table-column align="center" prop="datatime" label="发票日期" >
          </el-table-column>
          <el-table-column align="center" prop="name" label="销方名称" >
          </el-table-column>
          <el-table-column align="center" prop="count" label="价税合计">
          </el-table-column>
     </el-table>
   </el-card>
  </div>
</template>
<script>
export default {
  
  data() {
    return {
      tableData: [
        {
          code:'1234567',
          number: "5678901",
          kind:'专票',
          type: 1,
          datatime:'2020-02-03',
          name:'123',
          count:0,
        },
      ],
    }
  },
  mounted(){
    
   document.getElementById('card').style.width = document.documentElement.offsetWidth - 200 + 'px'
  }
}
</script>