// pages/conferenceDetails/conferenceDetails.js
const app = getApp();
const Util = require('../../utils/util.js');
const Tootips = require('../../utils/tootips.js');
const API = require('../../utils/api.js');
var page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetails:{},
    canAddPerson:false
  },
  canAddPerson:function(time,id){
    //如果当前时间小于会议开始时间，并且用户是该场会议的发起人，则可以有添加与会人的权限
    return (new Date().getTime() < new Date(time).getTime())?(app.globalData.userInfo.id==id?true:false):false;
  },
  getOrderDetails:function(id){
    wx.showLoading({title: Tootips.LOADING,});
    Promise.all([page.getOrderDetail(id),page.getOrderAttendance(id)])
    .then((data)=>{
      wx.hideLoading();
      var tmp = {};
      tmp = Object.assign({},data[0],data[1]);
      var startTime = tmp.details.day+' '+tmp.details.begin;
      var userId = tmp.details.user_id;
      page.setData(
        {
          orderDetails:tmp,
          canAddPerson:page.canAddPerson(startTime,userId)
        }
      );
    })
  },
  getOrderDetail:function(id){
    var promise = new Promise((resolve,reject)=>{
      Util.request('get', API.BASE_URL + API.ORDER_DETAIL, { id }, function (data) {
        //console.log(data);
        resolve({'details':data.data});
      }) 
    })
    return promise;
  },
  getOrderAttendance:function(id){
    var promise = new Promise((resolve,reject)=>{
      Util.request('get', API.BASE_URL + API.ORDER_ATTENDANCE, { id }, 
      function (data) {
        resolve({ 'attendances': data.data })
      })
    })
    return promise;
  },
  _handleAddPerson:function(){
    wx.navigateTo({
      url: '../../contactsPackage/pages/selectperson/selectperson?addAttendance='+true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
    this.getOrderDetails(parseInt(options.meetingId));
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})