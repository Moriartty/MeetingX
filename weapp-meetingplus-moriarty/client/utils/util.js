const Tootips = require('../utils/tootips.js');
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//去除数组中的空值
const filter_array = (array)=>{
  return array.filter(item => item);
} 

const Request = (method,url,data,callback,failcb) => {
  wx.request({
    url:url,
    method:method,
    header: {
      'content-type': method == "post" ? "application/x-www-form-urlencoded":"application/json"
    },
    data:data,
    success:(ret)=>{
      if(ret.statusCode==200)
        callback(ret.data);
      else
        console.log('error1');
    },
    fail:(err)=>{
      console.log(err);
      failcb();
    },
    complete:()=>{

    }
  })
}
const toast = (title,icon,duration)=>{
  wx.showToast({
    title: title,
    duration:duration||1000,
    icon:icon
  })
}
//将时间格式补全为同一的YYYY-MM-DD
const completeDate = (date)=>{
  if(date){
    var tmp = date.split('-');
    if(tmp[1]>=1&&tmp[1]<=9)
      tmp[1] = "0"+tmp[1]
    if(tmp[2]>=0&&tmp[2]<=9)
      tmp[2] = "0"+tmp[2];
    return tmp.join('-');
  }
  return false;
}
const getNowFormatDate = ()=>{
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
} 

//获取某个日期是星期几
const getDaily = (time)=>{
  //传入格式 “YYYY-MM-DD“
  var tmp = time.split('-');
  var date = new Date(tmp[0],tmp[1]-1,tmp[2]);
  return new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")[date.getDay()];
}

//获取选择的月份的当月情况
const getSelectedMonth = (sd)=>{
  var results = [];
  //这里月份是从1开始计算的
  var d1 = new Date(sd[0],sd[1]-1,sd[2]);
  var next = [];
  //如果是最后一个月
  if(sd[1]==12){
    next[0] = sd[0]+1;
    next[1] = 1;
  }
  else{
    next[0] = sd[0];
    next[1] = sd[1]+1;
  }
  next[2] = 1;
  var d2 = new Date(next[0],next[1]-1,next[2]);
  var index = 0;
  for (var i = d1.getTime(); i < d2.getTime(); i += 24 * 60 * 60 * 1000) {
    ++index;
    var d3 = new Date(i);
    var day = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六")[d3.getDay()];
    var result = {
      date:index,
      day:day
    };
    results.push(result);
  }
  return results;
}
const isEmpty = (data)=>{
  if(typeof(data)=='object'&&data!=null){
    //先确定属于object,在判断是对象还是数组
    if(Array.isArray(data)){
      if (data == undefined || data == null || data.length == 0)
        return true;
      return false;
    }else{
      for (var i in data) {
        return false;
      }
      return true;
    }
  }
  // console.log(typeof(data));
  // switch(typeof(data)){
  //   case 'object':
  //     for(var i in data){
  //       return false;
  //     }
  //     return true;
  //   case 'array':
  //     if(data==undefined||data==null||data.length==0)
  //       return true;
  //     return false;
  //   default : break;
  // }
}

module.exports = {
  formatTime: formatTime,
  request:Request,
  toast:toast,
  completeDate:completeDate,
  getDaily:getDaily,
  getNowFormatDate: getNowFormatDate,
  getSelectedMonth: getSelectedMonth,
  isEmpty:isEmpty,
  filter_array: filter_array
}
