const app = getApp();
const Util = require('../../utils/util');
const API = require('../../utils/api');
const Tootips = require('../../utils/tootips.js');
Page({
  data:{
    userInfo: {}
  },
  //刚渲染完login页面
  onLoad:()=>{
    //获取site列表，目前没作用
    // Util.request('get', API.BASE_URL +API.LOGIN_SITE,{},function(data){
    //   console.log(data);
    // })
  },
  
  //获取表单值
  login:(e)=>{
    // new Promise((resolve,reject)=>{
    //   e.detail.value.userName === "" ? (function(){
    //     Util.toast(Tootips.USERNAME_IS_NULL,'none');
    //     reject();
    //   })(): e.detail.value.passWord === "" ? (function(){
    //       Util.toast(Tootips.PASSWORD_IS_NULL, 'none');
    //       reject();
    //   })():resolve()
    // }).then(()=>{
    //   wx.showLoading({ title: Tootips.LOGINING});
    //   let param = {
    //     uid: e.detail.value.userName,
    //     pwd: e.detail.value.passWord
    //   }
    //   Util.request('get', API.BASE_URL + API.LOGIN, param, (obj) => {
    //     wx.hideLoading();
    //     //直接调用，切换页面会出现卡顿
    //     wx.switchTab({ url: '../home/home' })
    //     app.globalData.userInfo = obj.data.user;
    //     app.globalData.roomList = obj.data.room;
    //     app.globalData.deviceList = obj.data.device;
    //     app.globalData.floorList = obj.data.floor;
    //     app.globalData.historyList = obj.data.history;
    //     app.globalData.supportList = obj.data.support;
    //     app.globalData.typeList = obj.data.type;
    //     console.log(app.globalData);
    //   })
    // },()=>{
    //   console.log('reject')
    // })
    wx.showLoading({ title: Tootips.LOGINING });
    new Promise((resolve,reject)=>{
      setTimeout(function(){resolve()},2000);
    }).then(()=>{
      wx.hideLoading();
      wx.switchTab({ url: '../home/home' });
    })
  }
  
})