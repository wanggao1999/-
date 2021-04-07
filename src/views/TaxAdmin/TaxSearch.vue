<!--发票查询-->
<template>
  <div>
    <el-card id="card">
      <!-- card_header -->
      <div slot="header" class="clearfix card_header">
        <div class="invoiceCode">
          <el-input v-model="dataparams.invoiceCode" placeholder="发票代码"></el-input>
        </div>
        <div class="invoiceNumber">
          <el-input v-model="dataparams.invoiceNumber" placeholder="发票号码"></el-input>
        </div>
        <div class="invoiceType">
          <el-select v-model="dataparams.invoicetype" placeholder="发票状态" style="width: 110px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
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
          ></el-date-picker>
        </div>
        <div class="btnS">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <div class="moreMenu">
            <el-dropdown>
              <el-button type="primary">
                录入
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="manualFalg">手工录入</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span @click="synFalg">同步录入</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-button icon="el-icon-circle-check" type="primary" @click="BatchInspection">批量查验</el-button>
        </div>
      </div>
      <!-- card_body -->
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          :border="true"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="55"></el-table-column>
          <el-table-column align="center" label="发票代码" width="120" prop="invoiceCode"></el-table-column>
          <el-table-column align="center" prop="invoiceNo" label="发票号码" width="120"></el-table-column>
          <el-table-column align="center" prop="invoiceType" label="发票种类" width="120"></el-table-column>
          <el-table-column align="center" label="发票状态" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-tag v-if="row.invoiceStatus===0">正常</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="invoiceDate" label="发票日期"></el-table-column>
          <el-table-column align="center" prop="buyerName" label="销方名称"></el-table-column>
          <el-table-column align="center" prop="totalAmount" label="价税合计"></el-table-column>
          <el-table-column align="center" label="查验状态" show-overflow-tooltip>
            <template slot-scope="{row}">
              <el-tag v-if="row.legalizeState===0">未查验</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300px">
            <template slot-scope="{row}">
              <el-button size="mini" type="primary" icon="el-icon-more" @click="handlDetail(row)">详情</el-button>
              <el-button size="mini" icon="el-icon-edit" @click="handlEdit(row)">编辑</el-button>
              <el-button size="mini" icon="el-icon-edit" type="warning" @click="handChang(row)">查验</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <!-- 手工录入 -->
    <el-dialog title="手工录入" :visible.sync="manualDialogVisible" width="25%">
      <span slot="footer" class="dialog-footer">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司税号">
            <el-input disabled type="text" v-model="ruleForm.dutyParagraph" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发票代码" prop="code">
            <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="发票号码" prop="number">
            <el-input v-model.number="ruleForm.number"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="manualDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="manualDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 同步录入 -->
    <el-dialog title="同步录入" :visible.sync="synDialogVisible" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-form
          :model="synruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司税号">
            <el-input disabled type="text" v-model="synruleForm.dutyParagraph" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="录入时间" prop="datatime">
            <el-date-picker
              v-model="synruleForm.datatime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <el-button @click="synDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="synDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="修改录入" :visible.sync="EditVisible" width="25%">
      <span slot="footer" class="dialog-footer">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司税号">
            <el-input disabled type="text" v-model="ruleForm.dutyParagraph" autocomplete="off"></el-input>
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
    <AddTax :DetailVisible="DetailVisible" @AddChang="AddChang"/>
  </div>
</template>

<script>
import AddTax from '../../components/dialogs/AddTax'
export default {
  components:{
    AddTax
  },
  data() {
    var validatenumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入发票号码"));
      } else {
        if (typeof value !== "number" || value/10000000<1) {
          callback(new Error("发票号码码为8位数字"));
        }
        callback();
      }
    };
    var validatetime = (rule, value, callback) => {
      console.log(value);
      if (value.length <= 0 || value === "") {
        callback(new Error("请选择时间"));
      } else {
        callback();
      }
    };
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
          invoiceCode: "1234567",
          invoiceNo: 5678901,
          invoiceType: "专票",
          invoiceStatus: 0,
          invoiceDate: "2020-02-03",
          buyerName: "123",
          totalAmount: 0,
          legalizeState: 0,
        },
        {
          invoiceCode: "1234567",
          invoiceNo: 5678901,
          invoiceType: "专票",
          invoiceStatus: 0,
          invoiceDate: "2020-02-03",
          buyerName: "123",
          totalAmount: 0,
          legalizeState: 0,
        },
        {
          invoiceCode: "1234567",
          invoiceNo: 5678901,
          invoiceType: "专票",
          invoiceStatus: 0,
          invoiceDate: "2020-02-03",
          buyerName: "123",
          totalAmount: 0,
          legalizeState: 0,
        },
      ],

      ruleForm: {
        dutyParagraph: "1212561641",
        invoiceCode: "",
        invoiceNo: "",
      },
      synruleForm: {
        dutyParagraph: "1232132131321",
        datatime: "",
      },
      rules: {
        invoiceCode: [
          { required: true, message: "请输入发票代码", trigger: "blur" },
        ],
        invoiceNo: [
          { required: true, validator: validatenumber, trigger: "blur" },
        ],
        datatime: [{ required: true, message: "请选择时间", trigger: "blur" }],
      },
      multipleSelection: [],
      manualDialogVisible: false, //手工录入弹窗
      synDialogVisible: false, //同步录入弹窗
      EditVisible: false, //编辑
      DetailVisible:false,//详情
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
    // 手工录入
    manualFalg() {
      this.manualDialogVisible = true;
      let timer = setTimeout(() => {
        this.$refs["ruleForm"].resetFields();
      }, 1);
    },
    // 同步录入
    synFalg() {
      this.synDialogVisible = true;
      let timer = setTimeout(() => {
        this.$refs["ruleForm"].resetFields();
      }, 1);
    },
    // 选择
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    },
    // 详情
    handlDetail(row) {
     this.DetailVisible = true
    },
    AddChang(val){
      this.DetailVisible = val
    },
    //编辑
    handlEdit(row) {
      this.EditVisible = true
         let timer = setTimeout(()=>{
           this.$refs['ruleForm'].resetFields();
           clearTimeout(timer)
           this.ruleForm = { ...row };
           this.ruleForm.dutyParagraph = '13213213213'
       },1)
    },
    //查验
    handChang(row) {},
    //批量查验
    BatchInspection() {
      if (this.multipleSelection.length <= 0) {
        return this.$message({
          type: "error",
          message: "请选择需要查验的发票！",
        });
      } else {
        this.$router.push({ path: "/TaxAdmin/BatchInspection" });
      }
    },
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

.el-date-editor {
  float: left !important;
  width: 100%;
}
</style>
