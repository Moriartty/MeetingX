// contactsPackage/pages/addgroup/addgroup.js
const app = getApp();
const Util = require('../../../utils/util.js');
const Tootips = require('../../../utils/tootips.js');
const API = require('../../../utils/api.js');
var page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canAddPerson:true,
    checkedList:[],
    groupName:''
  },
  _handleAddPerson:function(){
    var ids = page.data.checkedList.map((o)=>{
      return o.id;
    })
    wx.navigateTo({
      url: '../selectperson/selectperson?checkedList='+ids.join(','),
    })
  },
  _handleAddGroup:function(){
    if(page.data.groupName==''){
      Util.toast(Tootips.GROUPNAME_IS_EMPTY,'none');
    }
    var pids = page.data.checkedList.map((o)=>{
      return o.id;
    })
    var params = {
      name : page.data.groupName,
      pid : pids.join(','),
      uid : app.globalData.userInfo.id
    }
    wx.showLoading({
      title: Tootips.WAITTING,
    })
    Util.request('get', API.BASE_URL + API.CONTACT_ADDGROUP,params,function(data){
      console.log('addgroup',data);
      wx.hideLoading();
      wx.navigateBack({
        delta: 1
      })
    },()=>{
      wx.hideLoading();
    })
    //console.log(pids);
  },
  _handleInput:function(e){
    var groupName = e.detail.value;
    page.setData({groupName})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
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
    //setTimeout(function(){console.log('bbb',page.data.checkedList)},0);
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