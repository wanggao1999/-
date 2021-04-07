<template>
 <el-dialog id="dialog" :visible.sync="DetailVisible" width="80%" :before-close="AddVisible">
      <el-row class="Detail-header">
        <el-col :span="8">
          <img style="width:65px;height:65px;font-size: 12px;" src="@/assets/code.png" alt />
          <div style="color: #9e520a;">机器编码:</div>
        </el-col>
        <el-col class="DetailTitle" :span="8">
          <div>增值税电子发票</div>
          <div></div>
          <div></div>
        </el-col>
        <el-col class="tax-datail" :span="8">
          <div>发 票 代 码：</div>
          <div>发 票 号 码：</div>
          <div>开 票 日 期：</div>
          <div>校 验 码：</div>
        </el-col>
      </el-row>
      <el-row class="invoice-body">
        <!-- 购买方 -->
        <el-row class="Dateil_Buyer">
          <el-col :span="2" class="cf">
            <div>购</div>
            <div>买</div>
            <div>方</div>
          </el-col>
          <el-col :span="10">
            <div>
            <span>名 <span class="ma-l-1"></span> 称 <span class="ma-l-1">：</span></span>
            <div></div>
            </div>
            <div>
            <span>纳 税 人 识 别 号 <span class="ma-l-2">：</span></span>
            <div>

            </div>
            </div>
            <div>
            <span>地址 、电话<span class="ma-l-3"> ：</span></span>
            <div></div>
            </div>
            <div>
            <span>开 户 行 及 账 号 <span class="ma-l-4">：</span></span>
            <div></div>
            </div>
          </el-col>
          <el-col :span="2" class="cf">
            <div>密</div>
            <div>码</div>
            <div>区</div>
          </el-col>
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 合计 -->
        <el-row class="count">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="4" class="cf">合计</el-col>
            <el-col :span="10">0</el-col>
            <el-col :span="2">0.00</el-col>
            <el-col :span="3">0</el-col>
            <el-col :span="2">0.00</el-col>
            <el-col :span="3">0</el-col>
          </div></el-col>
        </el-row>
        <!-- 价税合计 -->
        <el-row class="count">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="4" class="cf">价税合计</el-col>
            <el-col :span="10" style="border-right:none;">零</el-col>
            <el-col :span="10">(小写)0.00</el-col>
          </div></el-col>
        </el-row>
         <!-- 销售方 -->
        <el-row class="Dateil_Buyer">
          <el-col :span="2"  class="cf">
            <div>销</div>
            <div>售</div>
            <div>方</div>
          </el-col>
          <el-col :span="10">
            <div>
            <span>名 <span class="ma-l-1"></span> 称 <span class="ma-l-1">：</span></span>
            <div></div>
            </div>
            <div>
            <span>纳 税 人 识 别 号 <span class="ma-l-2">：</span></span>
            <div>

            </div>
            </div>
            <div>
            <span>地址 、电话<span class="ma-l-3"> ：</span></span>
            <div></div>
            </div>
            <div>
            <span>开 户 行 及 账 号 <span class="ma-l-4">：</span></span>
            <div></div>
            </div>
          </el-col>
          <el-col :span="2"  class="cf">
            <div>备</div>
            <div>注</div>
          </el-col>
          <el-col :span="10"></el-col>
        </el-row>
        <!-- foother -->
        <el-row class="foother">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
            <el-col class="hl" :span="6">收款人：
              <div></div>
            </el-col>
            <el-col class="hl" :span="6">复核：
              <div></div>
            </el-col>
            <el-col class="hl" :span="6">开票人：
              <div></div>
            </el-col>
            <el-col class="hr" :span="6">推送邮箱
              <div></div>
            </el-col >
            </div></el-col>
        </el-row>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddVisible">取 消</el-button>
        <el-button type="primary" @click="AddVisible">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props:{
    DetailVisible:{
      type:Boolean,
      default:false
    }
  },
  methods: {
    AddVisible(){
      this.$emit('AddChang',false)
    }
  },
}
</script>
<style lang="scss" scoped>
// 详情弹窗
.el-dialog {
  .cf{
    color:#9e520a;
  }
  .Detail-header {
    padding-bottom: 10px;
    .DetailTitle > div:nth-child(1) {
      color: #9e520a;
      text-align: center;
      font-size: 25px;
    }
    .DetailTitle > div:nth-child(2) {
      margin-top: 20px;
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
          margin-left: 25px;
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
</style>