export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

const num = Number
//  加法
num.prototype.add = function (arg) {
  var r1, r2, m, n
  try { r1 = this.toString().split('.')[1].length } catch (e) { r1 = 0 }
  try { r2 = arg.toString().split('.')[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  n = (r1 >= r2) ? r1 : r2
  //  return ((this*m+arg*m)/m).toFixed(n)
  return round2(((this * m + arg * m) / m), n)
}
//  减法
num.prototype.sub = function (arg) {
  return this.add(-arg)
}
//  乘法
num.prototype.mul = function (arg) {
  var m = 0
  var s1 = this.toString()
  var s2 = arg.toString()
  // eslint-disable-next-line
  try { m += s1.split('.')[1].length } catch (e) { }
  // eslint-disable-next-line
  try { m += s2.split('.')[1].length } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}
//  除法
num.prototype.div = function (arg) {
  var t1 = 0
  var t2 = 0
  var r1, r2
  // eslint-disable-next-line
  try { t1 = this.toString().split('.')[1].length } catch (e) { }
  // eslint-disable-next-line
  try { t2 = arg.toString().split('.')[1].length } catch (e) { }
  r1 = Number(this.toString().replace('.', ''))
  r2 = Number(arg.toString().replace('.', ''))
  return (r1 / r2) * Math.pow(10, t2 - t1)
}
export default num

//  中文数字大写
export function DX (n) {
  if (n === 0) return '零'
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) {
    return ''
  }
  var unit = '仟佰拾亿仟佰拾萬仟佰拾圆角分'
  var str = ''
  n += '00'
  var p = n.indexOf('.')
  if (p >= 0) {
    n = n.substring(0, p) + n.substr(p + 1, 2)
  }
  unit = unit.substr(unit.length - n.length)
  for (var i = 0; i < n.length; i++) {
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i)
  }
  return str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(萬|亿|圆)/g, '$1').replace(/(亿)萬|壹(拾)/g, '$1$2').replace(/^圆零?|零分/g, '').replace(/圆$/g, '圆整')
}

//  保留并精确到2位小数
export function round2 (number, fractionDigits) {
  var result = Math.round(number * Math.pow(10, fractionDigits || 2)) / Math.pow(10, fractionDigits || 2)
  if (/^(-)?\d+(\.\d{2})$/.test(result)) {
    return result
  } else if (/^(-)?\d+(\.\d{1})$/.test(result)) {
    return result + '0'
  } else if (/^(-)?\d+$/.test(result)) {
    return result + '.00'
  } else {
    return result
  }
}

export function round6 (number, fractionDigits) {
  var result = Math.round(number * Math.pow(10, fractionDigits || 6)) / Math.pow(10, fractionDigits || 6)
  if (/^(\\-)?\d+(\.\d{6})$/.test(result)) return result
  else if (/^(\\-)?\d+(\.\d{5})$/.test(result)) return result + '0'
  else if (/^(\\-)?\d+(\.\d{4})$/.test(result)) return result + '00'
  else if (/^(\\-)?\d+(\.\d{3})$/.test(result)) return result + '000'
  else if (/^(\\-)?\d+(\.\d{2})$/.test(result)) return result + '0000'
  else if (/^(\\-)?\d+(\.\d{1})$/.test(result)) return result + '00000'
  else if (/^(\\-)?\d+$/.test(result)) return result + '.000000'
  else return result
}

export function listToTree (arr = []) {
  const parents = arr.filter(value => value.pid === undefined || value.pid === null || value.pid === 0 || value.pid === '0')
  const children = arr.filter(value => value.pid !== undefined && value.pid !== null && value.pid !== 0 && value.pid !== '0')
  const translator = (parents, children) => {
    parents.forEach((parent) => {
      children.forEach((current, index) => {
        if (current.pid === parent.id) {
          const temp = JSON.parse(JSON.stringify(children))
          temp.splice(index, 1)
          translator([current], temp);
          (typeof parent.children !== 'undefined') ? parent.children.push(current) : parent.children = [current]
        }
      }
      )
    })
  }
  translator(parents, children)
  return parents
}

export function treeToArray(list, newArr = []) {
  list.forEach((item) => {
    const { childPermissions } = item
    if (childPermissions) {
      delete item.children
      if (childPermissions.length) {
        newArr.push(item)
        return treeToArray(childPermissions, newArr)
      }
    }
    newArr.push(item)
  })
  return newArr
}

/**
* 获取对应名称的cookie
* @param name cookie的名称
* @returns {null} 不存在时，返回null
*/
export function getCookie (name) {
  var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  var arr = document.cookie.match(reg)
  // eslint-disable-next-line
  console.log(arr)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}
