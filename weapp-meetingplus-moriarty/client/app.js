//app.js
App({
  onLaunch: function () {
    this.globalData.userInfo = {
      id: 1295,
      username: "陈冰",
      // id: 1185,
      // username: "杨建峰",
      phone: "13888888888",
      email: "bing-chen@tcl.com",
      department: "R&D&TECH&INNO-SMD-AUTO TEAM HZ-TCT",
      role: 1
    };
    this.globalData.typeList = [
      { "id": 1, "name": "小型会议室1", "min": 1, "max": 5 },
      { "id": 2, "name": "小型会议室2", "min": 6, "max": 10 },
      { "id": 3, "name": "小型会议室3", "min": 11, "max": 15 },
      { "id": 4, "name": "中型会议室1", "min": 16, "max": 20 },
      { "id": 5, "name": "中型会议室2", "min": 21, "max": 25 },
      { "id": 6, "name": "中型会议室3", "min": 26, "max": 30 },
      { "id": 7, "name": "大型会议室", "min": 30, "max": 0 }
    ];
    this.globalData.supportList = [
      { "id": 1, "name": "矿泉水" },
      { "id": 3, "name": "水果" },
      { "id": 6, "name": "咖啡" },
      { "id": 7, "name": "绿茶" }
    ];
    this.globalData.deviceList = [
      { "id": 1, "name": "电视" },
      { "id": 2, "name": "移动支架" },
      { "id": 4, "name": "投影仪" }
    ];
    this.globalData.roomList = [
      { "id": 2, "name": "0502(5楼)", "nick_name": "0502", "area": "24", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 1, "max_seat": 10, "devices": { "main": "", "others": "" } },
      { "id": 3, "name": "0503(5楼)", "nick_name": "0503", "area": "19", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 1, "max_seat": 10, "devices": { "main": "电视(1)", "others": "" } },
      { "id": 4, "name": "0504(5楼)", "nick_name": "0504", "area": "10", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 1, "max_seat": 6, "devices": { "main": "", "others": "" } },
      { "id": 8, "name": "0505(5楼)", "nick_name": "0505", "area": "16", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 1, "max_seat": 10, "devices": { "main": "", "others": "" } },
      { "id": 9, "name": "0602(6楼)", "nick_name": "0602", "area": "17.5", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 2, "max_seat": 6, "devices": { "main": "电视(1)", "others": "" } },
      { "id": 10, "name": "0603(6楼)", "nick_name": "0603", "area": "24", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 2, "max_seat": 10, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 11, "name": "0604(6楼)", "nick_name": "0604", "area": "23", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 2, "max_seat": 10, "devices": { "main": "", "others": "" } },
      { "id": 13, "name": "1101(11楼)", "nick_name": "1101", "area": "30", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 3, "max_seat": 10, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 14, "name": "1102(11楼)", "nick_name": "1102", "area": "11", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 3, "max_seat": 5, "devices": { "main": "", "others": "" } },
      { "id": 15, "name": "1103(11楼)", "nick_name": "1103", "area": "24", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 3, "max_seat": 8, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 16, "name": "1104(11楼)", "nick_name": "1104", "area": "21", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 3, "max_seat": 10, "devices": { "main": "", "others": "" } },
      { "id": 19, "name": "1202(12楼)", "nick_name": "1202", "area": "21.6", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 4, "max_seat": 10, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 20, "name": "1203(12楼)", "nick_name": "1203", "area": "21.6", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 4, "max_seat": 10, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 21, "name": "1204(12楼)", "nick_name": "1204", "area": "21", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 4, "max_seat": 10, "devices": { "main": "电视(1)", "others": "" } },
      { "id": 22, "name": "1205(12楼)", "nick_name": "1205", "area": "14", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 4, "max_seat": 5, "devices": { "main": "", "others": "" } },
      { "id": 23, "name": "1206(12楼)", "nick_name": "1206", "area": "16.5", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 4, "max_seat": 16, "devices": { "main": "", "others": "" } },
      { "id": 25, "name": "1301(13楼)", "nick_name": "1301", "area": "23.8", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 5, "max_seat": 10, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 26, "name": "1302(13楼)", "nick_name": "1302", "area": "22.18", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 5, "max_seat": 10, "devices": { "main": "", "others": "" } },
      { "id": 27, "name": "1303(13楼)", "nick_name": "1303", "area": "22.18", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 5, "max_seat": 8, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 30, "name": "1401(14楼)", "nick_name": "1401", "area": "33", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 6, "max_seat": 10, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 32, "name": "1403(14楼)", "nick_name": "1403", "area": "24", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 6, "max_seat": 8, "devices": { "main": "", "others": "" } },
      { "id": 33, "name": "1404(14楼)", "nick_name": "1404", "area": "22", "desc": "主要用作日常部门小型会议、洽谈需求", "floor_id": 6, "max_seat": 10, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 12, "name": "创意室(6楼)", "nick_name": "6楼创意室", "area": "30", "desc": "主要用作日常部门激发创意沟通区域、小型会议、洽谈需求兼容", "floor_id": 2, "max_seat": 10, "devices": { "main": "电视(1),移动支架(1)", "others": "" } },
      { "id": 1, "name": "培训室(0501)", "nick_name": "5楼培训室(0501)", "area": "59.07", "desc": "主要用作日常部门小型培训、亦可兼做日常会议室使用", "floor_id": 1, "max_seat": 24, "devices": { "main": "投影仪(1)", "others": "" } },
      { "id": 17, "name": "培训室(11楼)", "nick_name": "11楼培训室", "area": "136", "desc": "主要用作中心或部门中型培训使用", "floor_id": 3, "max_seat": 84, "devices": { "main": "投影仪(1)", "others": "" } }
    ];
    this.globalData.floorList = [
      { "id": 1, "name": "5楼" },
      { "id": 2, "name": "6楼" },
      { "id": 3, "name": "11楼" },
      { "id": 4, "name": "12楼" },
      { "id": 5, "name": "13楼" },
      { "id": 6, "name": "14楼" }
    ];
    this.globalData.historyList = [
      { "id": 10106, "user_id": 1295, "subject": "test", "period": 30, "device": "", "attendance": { "person": [], "group": [], "temp": [] }, "room_id": 30, "submit_date": "2018-01-08 10:29:02" },
      { "id": 10107, "user_id": 1295, "subject": "test1", "period": 30, "device": "", "attendance": { "person": [{ "id": 1185, "name": "杨建峰" }], "group": [], "temp": [] }, "room_id": 30, "submit_date": "2018-01-18 11:26:52" },
      { "id": 10208, "user_id": 1295, "subject": "dasda", "period": 30, "device": "", "attendance": { "person": [{ "id": 1185, "name": "杨建峰" }], "group": [], "temp": [] }, "room_id": 30, "submit_date": "2018-01-20 09:50:43" },
      { "id": 10788, "user_id": 1295, "subject": "test2", "period": 30, "device": "", "attendance": { "person": [], "group": [], "temp": [] }, "room_id": 30, "submit_date": "2018-04-27 09:50:45" },
      { "id": 10790, "user_id": 1295, "subject": "test3", "period": 30, "device": "", "attendance": { "person": [], "group": [], "temp": [] }, "room_id": 30, "submit_date": "2018-04-27 10:37:43" },
      { "id": 10791, "user_id": 1295, "subject": "test4", "period": 30, "device": "", "attendance": { "person": [], "group": [], "temp": [] }, "room_id": 30, "submit_date": "2018-04-27 10:37:58" }
    ];
    //console.log(this.globalData.userInfo.id);
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    var that = this;
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success: function (res) {
            that.globalData.wxUserInfo = res.userInfo;
            //typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })  
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wxUserInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    wxUserInfo:null,
    userInfo:{},
    userList:[],
    roomList:[],
    deviceList:[],
    floorList:[],
    historyList:[],
    supportList:[],
    typeList:[],
    contactsList:[],
    commonList:[]
  },
  getRoomName:(id)=>{
    var result;
    if(getApp().globalData.roomList.length>0){
      getApp().globalData.roomList.forEach(function(o){
        if(o.id == id)
          result = o.name;
      })
    }
    return result;
  },
  getPersonInfo:(id)=>{
    var result;
    var tempList = getApp().globalData.contactsList;
    if(tempList.length>0){
      for (var i in tempList){
        if(tempList[i].id == id){
          result = tempList[i];
          break;
        }
      }
    }
    return result;
  }
})