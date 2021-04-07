<template>
 <el-dialog id="dialog" :visible.sync="DetailVisible" width="80%" style="margin-top:-10vh;"  :before-close="closeClice">
   <div style="height:650px;overflow-y: auto;">
      <el-row class="Detail-header">
        <el-col :span="8">
          <img style="width:65px;height:65px;margin-left:30px;" src="@/assets/code.png" alt />
          <div style="color: #9e520a;padding-top:10px;">开票日期: <span class="cfw" >2020-03-15</span></div>
        </el-col>
        <el-col class="DetailTitle" :span="8">
          <div>机动车销售统一发票</div>
          <div></div>
          <div></div>
        </el-col>
        <el-col class="tax-datail" style="color:#9e520a;" :span="8">
          <div>发 票 代 码：<span class="cfw" >123132131321321</span></div>
          <div>发 票 号 码：<span class="cfw" >1313213121321</span></div>
        </el-col>
      </el-row>
      <el-row class="invoice-body">
        <!-- 购买方 -->
        <el-row class="Dateil_Buyer">
          <el-col :span="3" class="cf">
            <div>机打代码</div>
            <div>机打号码</div>
            <div>机器编码</div>
          </el-col>
          <el-col :span="9">
            <!-- 机打代码 -->
            <div>
              <div></div>
            </div>
            <!-- 机打号码 -->
            <div>
              <div></div>
            </div>
            <!-- 机器编码 -->
            <div>
              <div></div>
            </div>
          </el-col>
          <!-- 税控码 -->
          <el-col :span="2" class="cf">
            <div>税</div>
            <div>控</div>
            <div>码</div>
          </el-col>
          <el-col :span="10"></el-col>
        </el-row>
        <!-- 购货单位 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">购货单位(人)</el-col>
            <el-col :span="10"><span class="cfw">代用名</span></el-col>
            <el-col :span="6" class="cf">身份证号码、组织机构代码</el-col>
            <el-col :span="5">0.00</el-col>
          </div></el-col>
        </el-row>
        <!-- 车辆类型 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">车辆类型</el-col>
            <el-col :span="5" class="cfw">轿车</el-col>
            <el-col :span="3"  class="cf">厂牌型号</el-col>
            <el-col :span="5" class="cfw">轿车</el-col>
            <el-col :span="3"  class="cf">产地</el-col>
            <el-col :span="5" class="cfw">重庆</el-col>
          </div></el-col>
        </el-row>
        <!-- 合格证书 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">合格证书</el-col>
            <el-col :span="5" class="cfw">轿车</el-col>
            <el-col :span="3"  class="cf">进口证明书号</el-col>
            <el-col :span="5" class="cfw">--</el-col>
            <el-col :span="3"  class="cf">商检单号</el-col>
            <el-col :span="5" class="cfw">--</el-col>
          </div></el-col>
        </el-row>
        <!-- 发动机号码 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">发动机号码</el-col>
            <el-col :span="10"><span class="cfw">6666666666</span></el-col>
            <el-col :span="6" class="cf">车辆识别代码/车架号码</el-col>
            <el-col :span="5" class="cfw">0054448848</el-col>
          </div></el-col>
        </el-row>
        <!-- 税价合计 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">税价合计</el-col>
            <el-col :span="12" class="borderNone"><span class="cfw">伍万零贰佰元整</span></el-col>
            <el-col :span="4" class="cf borderNone">小写</el-col>
            <el-col :span="5" class="cfw">￥ 50200</el-col>
          </div></el-col>
        </el-row>
        <!-- 销货单位名称 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">销货单位名称</el-col>
            <el-col :span="10"><span class="cfw">xxx汽车销售有限公司</span></el-col>
            <el-col :span="6" class="cf">电话</el-col>
            <el-col :span="5" class="cfw">0123-123456</el-col>
          </div></el-col>
        </el-row>
        <!-- 纳税人识别号 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">纳税人识别号</el-col>
            <el-col :span="10"><span class="cfw">502515552555252652</span></el-col>
            <el-col :span="6" class="cf">账号</el-col>
            <el-col :span="5" class="cfw">330503225555555</el-col>
          </div></el-col>
        </el-row>
        <!-- 地址 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf">地 址</el-col>
            <el-col :span="10"><span class="cfw">阿萨德撒大大大</span></el-col>
            <el-col :span="6" class="cf">开户银行</el-col>
            <el-col :span="5" class="cfw">中国建设银行</el-col>
          </div></el-col>
        </el-row>
        <!-- 增值税税率 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf"><div class="zzs">增值税税率或征收率</div></el-col>
            <el-col :span="3"><span class="cfw">10%</span></el-col>
            <el-col :span="3" class="cf">增值税税额</el-col>
            <el-col :span="5" class="cfw">￥ 6315.22</el-col>
            <el-col :span="4" class="cf">主管税务机关及代码</el-col>
            <el-col  :span="6" class="cfw"><span style="white-space: nowrap;">按时间段林洁啊来得及萨克</span></el-col>
          </div></el-col>
        </el-row>
         <!-- 不含税价 -->
        <el-row class="carType">
          <el-col :span="24"><div class="grid-content bg-purple-dark">
            <el-col :span="3" class="cf"><div class="zzs">不含税价</div></el-col>
            <el-col :span="3"><span class="cfw">￥ 36582.00</span></el-col>
            <el-col :span="3" class="cf">完税凭证号码</el-col>
            <el-col :span="3" class="cfw">12313123</el-col>
            <el-col :span="3" class="cf">吨位</el-col>
            <el-col  :span="3" class="cfw"><span>10</span></el-col>
            <el-col :span="3" class="cf">限乘人数</el-col>
            <el-col  :span="3" class="cfw"><span >5</span></el-col>
          </div></el-col>
        </el-row>
        <!-- foother -->
        <el-row class="foother">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">
            <el-col class="hl" :span="8">销货单位盖章：
            </el-col>
            <el-col class="hl" :span="8">开票人：
              <div></div>
            </el-col>
            <el-col class="hr" :span="8">备注 ：
              <div></div>
            </el-col >
            </div></el-col>
        </el-row>
        </el-row>
      </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="()=>{this.$emit('changedVisible',false)}">取 消</el-button>
        <el-button type="primary" @click="()=>{this.$emit('changedVisible',false)}">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  props:{
    DetailVisible:{
      type:Boolean,
      default:false
    },
  },
   methods:{
      closeClice(){
         this.$emit('changedVisible',false)
      }
    },
}
</script>
<style lang="scss" scoped>
// 详情弹窗
.el-dialog__headerbtn{
  display: none;
}
.el-dialog {
  
  .cfw{
    color:#BFBFC1;font-weight: bold;
  }
  .cf{
    color:#9e520a;
  }
  .borderNone{
    border-right: none !important;
  }
  
  .Detail-header {
    .DetailTitle > div:nth-child(1) {
      color: #9e520a;
      text-align: center;
      font-size: 25px;
    }
    .DetailTitle > div:nth-child(2) {
      margin-top: 20px;
      margin-left: 10px;
      width: 100%;
      height: 1px;
      background-color: #9e520a;
    }
    .DetailTitle > div:nth-child(3) {
      margin-top: 5px;
      margin-left: 10px;
      width: 100%;
      height: 1px;
      background-color: #9e520a;
    }
  }
  .tax-datail {
    margin-top: 15px;
    > div {
      padding-left: 100px;
    }
  }
  .invoice-body {
    .Dateil_Buyer{
      height: 150px;
      border: 1px solid #9e520a;
      >.el-col:nth-child(1){
        height: 148px;
        text-align: center;
        border-right:1px solid #9e520a ;
        >div{
          height: 50px;
          line-height: 50px;
        }
      }
      >.el-col:nth-child(2){
        border-right:1px solid #9e520a ;
        height: 148px;
        >div{
          height: 50px;
          line-height: 50px;
           white-space: nowrap;
        }
        >div>div{
          display: inline-block;
          width: 80%;
          padding: 0 3px 0 3px;
          border-bottom: 1px dashed rgb(51, 51, 255);
          margin-left: 25px;
        }
         >div:nth-child(1)>div{
          display: inline-block;
          width: 80%;
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
    .carType:nth-of-type(10){
      .zzs{
        height: 50px;
        width: 80px;
        line-height: 25px;
        margin: 0 auto;
      }
    }
    .carType{
      border: 1px solid #9e520a;
      border-top: none;
      >.el-col{
        
        >.grid-content>div{
          height: 50px;
          line-height: 50px;
          text-align: center;
          border-right: 1px solid #9e520a;
        }
        >.grid-content>div:nth-last-child(1){
           border-right: none;
        }
      }
    }
    .foother{
      padding-top: 15px;
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