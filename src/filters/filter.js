import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
import { round2 } from '@/utils/util'

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr && moment(dataStr).isValid()) {
    return moment(dataStr).format(pattern)
  } else {
    return ''
  }
})

Vue.filter('inter', function (dataStr) {
  if (dataStr === '' || dataStr == null) {
    return dataStr
  } else {
    return dataStr.substr(0, 4) + '-' + dataStr.substr(4, 2) + '-' + dataStr.substr(6, 2)
  }
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if (dataStr && moment(dataStr).isValid()) {
    return moment(dataStr).format(pattern)
  } else {
    return ''
  }
})

Vue.filter('price', function (dataStr) {
  return round2(dataStr)
})

Vue.filter('percent', function (dataStr) {
  if (!isNaN(dataStr)) {
    return Number(dataStr) * 100 + '%'
  }
})

Vue.filter('listAnd', function (dataArr) {
  return dataArr.join('、')
})

/**
 * @param 值
 * @param 列表
 * @param 对比字段
 * @param 返还字段
 */
Vue.filter('inlist', function ([dataStr, list, key = 'value', value = 'label']) {
  const item = list.filter(el => el[key] === dataStr)
  if (item.length === 1) {
    return item[0][value]
  } else {
    return ''
  }
})
