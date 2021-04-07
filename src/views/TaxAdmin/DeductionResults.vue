<!--抵扣认证-->
<template>
  <div>
    <el-card id="card">
        <!-- card_header -->
      <div slot="header" class="clearfix card_header">
        <div class="invoiceCode">
          <el-input
            v-model="dataparams.invoiceCode"
            placeholder="发票代码"
          ></el-input>
        </div>
        <div class="invoiceNumber">
          <el-input
            v-model="dataparams.invoiceNumber"
            placeholder="发票号码"
          ></el-input>
        </div>
        <div class="invoiceType">
          <el-select
            v-model="dataparams.invoicetype"
            placeholder="发票状态"
            style="width: 110px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="invoiceTime">
          <el-date-picker
            v-model="dataparams.invoicetypeTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            align="right"
          >
          </el-date-picker>
        </div>
        <div class="btnS">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button icon="el-icon-star-on" type="success" @click="BatchCertification">批量认证</el-button>
        </div>
      </div>
      <!-- card_body -->
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :border=true
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="55"> </el-table-column>
          <el-table-column align="center" label="发票代码" width="120" prop="code">
          </el-table-column>
          <el-table-column  align="center" prop="number" label="发票号码" width="120">
          </el-table-column>
          <el-table-column  align="center" prop="kind" label="发票种类" width="120">
          </el-table-column>
          <el-table-column  align="center" label="发票状态" show-overflow-tooltip>
            <template slot-scope="{row}">
                <el-tag v-if="row.type===0">正常</el-tag>
            </template>
          </el-table-column>
           <el-table-column align="center" prop="datatime" label="发票日期" >
          </el-table-column>
          <el-table-column align="center" prop="name" label="销方名称" >
          </el-table-column>
          <el-table-column align="center" prop="count" label="价税合计">
          </el-table-column>
          <el-table-column  align="center" label="操作" width="300px" >
            <template slot-scope="{row}">
             <el-button size="mini" type="primary" icon="el-icon-more" @click="handlDetail(row)">详情</el-button>
             <el-button size="mini" icon="el-icon-star-off" type="danger" @click="handChang(row)">抵扣</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
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
      dataparams: {
        invoiceCode: "",
        invoiceNumber: "",
        invoicetype: "",
        invoicetypeTime: "",
      },
      options: [
        {
          value: "选项1",
          label: "正常",
        },
        {
          value: "选项2",
          label: "作废",
        },
        {
          value: "选项3",
          label: "红冲",
        },
      ],
      tableData: [
        {
          code:'1234567',
          number: "5678901",
          kind:'专票',
          type: 0,
          datatime:'2020-02-03',
          name:'123',
          count:0,
          status:0,
        },
        {
          code:'a1',
          number: "5",
          kind:'专票',
          type: 0,
          datatime:'2020-02-03',
          name:'123',
          count:0,
          status:0,
        },
        {
          code:'12',
          number: "5115",
          kind:'专票',
          type: 0,
          datatime:'2020-02-03',
          name:'123',
          count:0,
          status:0,
        },
      ],
      multipleSelection:[]
    };
  },
  
  methods: {
      //全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //批量认证
    BatchCertification(){
      if(this.multipleSelection.length<=0){
        return this.$message({
          type:'error',
          message:'请选择需要认证的发票！'
        })
      }else{
        this.$router.push({path:'/TaxAdmin/BatchCertification'})
      }
    },
    // 选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 详情
    handlDetail(row){
        console.log(row)
    },
    //抵扣
    handChang(row){
         console.log(row)
    }
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  margin: 15px;
  .card_header {
    padding: 25px 20px;
    display: flex;
    .invoiceCode {
      margin-left: 10px;
    }
    .invoiceNumber {
      margin-left: 10px;
    }
    .invoiceType {
      margin-left: 10px;
    }
    .invoiceTime {
      margin-left: 10px;
    }
    .btnS {
      display: flex;
      margin-left: 10px;
      .moreMenu {
        margin: 0 10px 0 10px;
      }
    }
  }
}
</style>
