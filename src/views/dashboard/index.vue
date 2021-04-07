<template>
    <div>
      <el-row :gutter="24">
        <el-col :span="16">
          <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div id="main">
            </div>
          </el-card>


          <el-card class="box-card">
            <div id="main1">
            </div>
          </el-card>
          </div>
        </el-col>
        <!-- 日历 -->
        <el-col :span="8">
          <div class="grid-content bg-purple">
          <el-card class="box-card_calendar">
            <div slot="header" style="text-align: center;">
              <span>报税日历</span>
            </div>
            <el-calendar v-model="datatime">
            </el-calendar>
          </el-card>
          </div>
        </el-col>
      </el-row>
    
      </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    data() {
      return {
        datatime:new Date()
      };
    },
    mounted() {
      var chartDom = document.getElementById('main');
       var chartDom1 = document.getElementById('main1');
      var myChart = echarts.init(chartDom);
      var myChart1= echarts.init(chartDom1);
      var option;
      option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
        }
    }]
    };

    option && myChart.setOption(option);
    option && myChart1.setOption(option);
    },
    methods: {

    },
};
</script>

<style lang="scss" scoped>
.el-card{
  width: 500px;
  height: 300px;
  float: left;
  
margin-left: 10px;
  #main{
    padding:0 20px 0 20px; 
    width: 450px;
    height: 300px;
  }
  #main1{
    padding:0 20px 0 20px; 
    width: 450px;
    height: 300px;
  }
}
.box-card_calendar{
  width: 100%;
  height: 615px;
}
</style>
