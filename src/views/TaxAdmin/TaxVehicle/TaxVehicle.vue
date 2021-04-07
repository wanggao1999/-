<!--机动车销售统一发票-->
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
            v-model="dataparams.invoiceNo"
            placeholder="发票号码"
          ></el-input>
        </div>
        <div class="invoiceType">
          <el-select
            v-model="dataparams.invoiceType"
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
            v-model="dataparams.invoiceDate"
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
          <!-- <div class="moreMenu">
            <el-dropdown>
              <el-button type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span  @click="manualFalg">手工录入</span> </el-dropdown-item>
                <el-dropdown-item><span @click="synFalg">同步录入</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div> -->
          <el-button icon="el-icon-circle-check" type="primary" @click="BatchInspection">批量查验</el-button>
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
          <el-table-column align="center" label="发票代码" width="120" prop="invoiceCode">
          </el-table-column>
          <el-table-column  align="center" prop="invoiceNo" label="发票号码" width="120">
          </el-table-column>
          <el-table-column  align="center" prop="invoiceType" label="发票种类" width="120">
          </el-table-column>
          <el-table-column  align="center" label="发票状态" show-overflow-tooltip>
            <template slot-scope="{row}">
                <el-tag v-if="row.invoiceStatus===0">正常</el-tag>
                <el-tag v-else-if="1">失控</el-tag>
                <el-tag v-else-if="2">作废</el-tag>
                <el-tag v-else-if="3">红冲</el-tag>
                <el-tag v-else>异常</el-tag>
            </template>
          </el-table-column>
           <el-table-column align="center" prop="invoiceDate" label="发票日期" >
          </el-table-column>
          <el-table-column align="center" prop="buyerName" label="购方名称" >
          </el-table-column>
          <el-table-column align="center" prop="totalAmount" label="价税合计">
          </el-table-column>
          <el-table-column align="center"  label="认证状态" show-overflow-tooltip>
            <template slot-scope="{row}">
                <el-tag v-if="row.legalizeState===0">未认证</el-tag>
                <el-tag v-else>已认证</el-tag>
            </template>
          </el-table-column>
          <el-table-column  align="center" label="操作" width="300px" >
            <template slot-scope="{row}">
             <el-button size="mini" type="primary" icon="el-icon-more" @click="handlDetail(row)">详情</el-button>
             <el-button size="mini" type="success" icon="el-icon-edit"  @click="handlEdit(row)">编辑</el-button>
             <el-button size="mini" icon="el-icon-edit" type="warning" @click="handChang(row)">查验</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </el-card>
    <!-- 编辑 -->
    <el-dialog
      title="修改录入"
      :visible.sync="EditVisible"
      width="25%"
      >
      <span slot="footer" class="dialog-footer">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="公司税号" >
            <el-input disabled type="text" v-model="ruleForm.curTaxno" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发票代码" prop="invoiceCode">
            <el-input type="text" v-model="ruleForm.invoiceCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发票号码" prop="invoiceNo">
            <el-input v-model.number.trim="ruleForm.invoiceNo"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="EditVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 详情 -->
    <VehicleTax :DetailVisible="DetailVisible" @changedVisible="changedVisible"/>
    
  </div>
</template>

<script>
import VehicleTax from '../../../components/dialogs/VehicleTax'
export default {
  components:{
    VehicleTax
  },
  data() {
    var validatenumber = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入发票号码'));
        } else {
          if (typeof value !== 'number' || (value/10000000<1)) {
           callback(new Error('发票号码码为8位数字'));
          }
          callback();
        }
      };
      var validatetime = (rule, value, callback) => {
        if (value.length<=0||value === '') {
          callback(new Error('请选择时间'));
        } else {
          callback();
        }
      };
    return {
      dataparams: {
        invoiceCode: "",
        invoiceNo: "",
        invoiceType: "",
        invoiceDate: "",
      },
      options: [// 可选项
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
      tableData: [ // 表格数据
        {
          invoiceCode:'1234567',
          invoiceNo: 5678901,
          invoiceType:'专票',
          invoiceStatus: 0,
          invoiceDate:'2020-02-03',
          buyerName:'123',
          totalAmount:0,
          legalizeState:0,
        },
        {
          invoiceCode:'1234567',
          invoiceNo: 5678901,
          invoiceType:'专票',
          invoiceStatus: 0,
          invoiceDate:'2020-02-03',
          buyerName:'123',
          totalAmount:0,
          legalizeState:0,
        },
        {
          invoiceCode:'1234567',
          invoiceNo: 5678901,
          invoiceType:'专票',
          invoiceStatus: 0,
          invoiceDate:'2020-02-03',
          buyerName:'123',
          totalAmount:0,
          legalizeState:1,
        },
      ],
       
      ruleForm:{ // 表单数据
        curTaxno:'1212561641',
        invoiceCode:'',
        invoiceNo:''
      },
      synruleForm:{
        dutyParagraph:'1232132131321',
        datatime:''
      },
      rules:{ // 表单规则
        invoiceCode:[
          { required: true, message: '请输入发票代码', trigger: 'blur' },
        ],
        invoiceNo:[
          {required: true, validator: validatenumber,  trigger: 'blur' },
        ],
        datatime:[
          { required: true, message: '请选择时间', trigger: 'blur' },
        ]
      },
      multipleSelection:[],
      EditVisible:false, //编辑
      DetailVisible:false //详情
    };
  },
  mounted(){
   document.getElementById('card').style.width = document.documentElement.offsetWidth-200+ 'px'
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
    
    // 选择
    handleSelectionChange(val) {
      console.log(val )
      this.multipleSelection = val;
    },
    // 详情
    handlDetail(row){
        this.DetailVisible = true
    },
    changedVisible(val){
      this.DetailVisible = val
    },
    //编辑
    handlEdit(row){
       this.EditVisible = true
         let timer = setTimeout(()=>{
           this.$refs['ruleForm'].resetFields();
           clearTimeout(timer)
           this.ruleForm={...row}
           this.ruleForm.curTaxno = '13213213213'
       },1)
    },
    //查验
    handChang(row){
         console.log(row)
    },
    //批量查验
    BatchInspection(){
      if(this.multipleSelection.length<=0){
        return this.$message({
          type:'error',
          message:'请选择需要查验的发票！'
        })
      }else{
        this.$router.push({path:'/TaxAdmin/BatchInspection'})
      }
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
// 详情弹窗
.el-dialog {
  .Detail-header {
    .DetailTitle > div:nth-child(1) {
      color: #9e520a;
      text-align: center;
      font-size: 25px;
    }
    .DetailTitle > div:nth-child(2) {
      margin-top: 35px;
      width: 100%;
      height: 1px;
      background-color: #9e520a;
    }
    .DetailTitle > div:nth-child(3) {
      margin-top: 5px;
      width: 100%;
      height: 1px;
      background-color: #9e520a;
    }
  }
  .tax-datail {
    margin-top: 15px;
    > div {
      padding-left: 150px;
    }
  }
  .invoice-body {
    .Dateil_Buyer{
      height: 150px;
      border: 1px solid #9e520a;
      .ma-l-1{
        padding: 0 15px 0 30px;
      }
      .ma-l-2{
        padding: 0 13px 0 5px;
      }
      .ma-l-3{
        padding: 0 12px 0 35px;
      }
      .ma-l-4{
        padding: 0 13px 0 5px;
      }
      >.el-col:nth-child(1){
        padding-top: 40px;
        padding-bottom:51px ;
        text-align: center;
        border-right:1px solid #9e520a ;
      }
      >.el-col:nth-child(2){
        border-right:1px solid #9e520a ;
        padding-bottom:8px ;
        >div{
          padding-left: 10px;
          line-height: 35px;
        }
        >div:nth-child(1)>div span{
          padding:0 20px 0 20px;
        }
        >div>span{
          white-space: nowrap;
          display: inline-block;
          width: 30%;
        }
       
        >div>div{
          display: inline-block;
          width: 60%;
          padding: 0 3px 0 3px;
          border-bottom: 1px dashed rgb(51, 51, 255);
          margin-left: 10px;
        }
         >div:nth-child(1)>div{
          display: inline-block;
          width: 60%;
          border-bottom: 1px dashed red ;
        }
      }
      >.el-col:nth-child(3){
        height: 150px;
        text-align: center;
         padding-top: 40px;
        border-right:1px solid #9e520a ;
      }
    }
    .count:nth-child(3){
      border-bottom: none;
    }
    .count{
      border: 1px solid #9e520a;
      border-top: none;
      >.el-col{
        height: 39px;
        line-height: 39px;
        >.grid-content>div{
          text-align: center;
          border-right: 1px solid #9e520a;
        }
        >.grid-content>div:nth-last-child(1){
           border-right: none;
        }
      }
    }
    .foother{
      height: 41px;
      .hl{
        color: #9e520a;
        >div{
          width: 90%;
          padding: 10px 0 0 0;
          border-bottom: 1px dashed rgb(51, 51, 255);
        }
      }
      .hr{
         color: #606266;
         >div{
           width: 90%;
          padding: 10px 0 0 0;
           border-bottom: 1px dashed rgb(51, 51, 255);
         }
      }
    }
  }
}
.el-date-editor{
      float: left !important;
      width: 100%;
  }
</style>
