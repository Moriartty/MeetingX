const Util = require('../../utils/util.js');
const API = require('../../utils/api.js');
const Tootips = require('../../utils/tootips.js');
const app = getApp();
var page;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    selectedDate:'',
    parentList:{}
  },

  handleCalendarClick:function(e){
    this.setData({ selectedDate: Util.completeDate(e.detail)})
    this.getParentList();
  },
  getParentList:function(){
    wx.showLoading({ title: Tootips.LOADING })
    var ids = app.globalData.roomList.map(function(o,i){
      return o.id;
    })
    new Promise(function(resolve,reject){
      Util.request('get', API.BASE_URL + API.ROOM_ALLRESERVED, { ids: ids.join(',') }, function (data) {
        var results = [];
        data.data.forEach(function(o,i){
          var result = {};
          result.roomId = o.roomId;
          result.orderList = [];
          o.orderList.forEach(function(val,idx){
            if(val.day == page.data.selectedDate){
              result.orderList.push(val);
            }
          })
          results.push(result);
        })
        resolve(results);
      })
    })
    .then((results) => {
      var parentList = {};
      var roomList = [];
      app.globalData.roomList.forEach(function (o, i) {
        results.forEach(function (item, idx) {
          if (o.id == item.roomId)
            roomList.push(Object.assign({}, o, item));
        })
      })
      app.globalData.floorList.forEach(function (o, i) {
        var tmp = {};
        tmp.floorId = o.id;
        tmp.floorName = o.name;
        tmp.value = [];
        roomList.forEach(function (item, idx) {
          if (item.floor_id == o.id)
            tmp.value.push(item);
        })
        parentList[o.id] = tmp;
      })
      wx.hideLoading();
      this.setData({ parentList: parentList });
    }, (err) => {
      wx.hideLoading();
      Util.toast(Tootips.LOAD_FAILED)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
    //初始化将时间设为今天
    this.setData({selectedDate:Util.getNowFormatDate()})
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
    this.getParentList();
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
    wx.stopPullDownRefresh();
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