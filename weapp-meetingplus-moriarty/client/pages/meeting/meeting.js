// pages/meeting/meeting.js
var app = getApp();
var Util  = require('../../utils/util.js');
var API = require('../../utils/api.js');
var Tootips = require('../../utils/tootips.js');
var page;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['我发布的', '我相关的'],
    currentNavbar: 0,
    myOrderedList:{},
    myOrderedListShow:false,
    myRelatedList:{},
    myRelatedListShow:false
  },
  /**
   * 
   */
  handleInput:function(e){
    console.log(e);
  },
  /**
   * 切换 navbar
   */
  swichNav(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
    this.refresh();
  },
  getMyOrder:(resolve,reject)=>{
    var uid = app.globalData.userInfo.id;
    Util.request('get',API.BASE_URL+API.SEARCH_ORDERBYME,{uid:uid},function(data){
      var exchangedData = page.dataFormatExchange(data.data);
      //每次setData都要根据myOrderList和myRelatedList两个对象是否为空来控制相应显示
      page.setData({ myOrderList: exchangedData, myOrderListShow: !Util.isEmpty(exchangedData) });
      resolve();
    },()=>{reject()})
  },
  getMyRelated:(resolve,reject)=>{
    var uid = app.globalData.userInfo.id;
    Util.request('get', API.BASE_URL + API.SEARCH_RELATEDTOME,{uid:uid},function(data){
      var exchangedData = page.dataFormatExchange(data.data);
      //每次setData都要根据myOrderList和myRelatedList两个对象是否为空来控制相应显示
      page.setData({ myRelatedList: exchangedData, myRelatedListShow: !Util.isEmpty(exchangedData) });
      resolve();
    },()=>{reject()})
  },
  dataFormatExchange: (data) => {
    data.sort((a,b)=>{
      return new Date(b.begin_time)-new Date(a.begin_time);
    })
    var tmp = {};
    data.forEach(function (o, i) {
      var day = o.begin_time.split(' ')[0];
      if(o.status > -1){
        o.date1 = day.split('-')[2];
        o.date2 = Util.getDaily(day);
      }
      o.begin = o.begin_time.split(' ')[1];
      o.end = o.end_time.split(' ')[1];
      o.roomName = app.getRoomName(o.room_id);
      if (tmp[day] == undefined) {
        tmp[day] = [];
      }
      tmp[day].push(o);
    })
    return tmp;
  },
  refresh:function(){
    wx.showLoading({ title: Tootips.LOADING});
    var idx = this.data.currentNavbar;
    new Promise((resolve,reject)=>{
      switch(idx){
        case 0:
          this.getMyOrder(resolve,reject);
          break;
        case 1:
          this.getMyRelated(resolve,reject);
          break;
      }
    }).then(()=>{
      wx.hideLoading();
    },()=>{
      wx.hideLoading();
      Util.toast(Tootips.LOAD_FAILED,'none');
    })
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
    this.refresh();
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
    var idx = this.data.currentNavbar;
    new Promise((resolve, reject) => {
      switch (idx) {
        case 0:
          this.getMyOrder(resolve, reject);
          break;
        case 1: 
          this.getMyRelated(resolve,reject);
          break;
      }
    }).then(() => {
      wx.stopPullDownRefresh();
    }, () => {
      wx.stopPullDownRefresh();
      Util.toast(Tootips.UPDATE_FAILED, 'none');
    });
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