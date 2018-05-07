const app = getApp();
const Util = require("../../utils/util.js");
const API = require("../../utils/api.js");
const Tootips = require("../../utils/tootips.js");
var page;
Page({
  /*
  *orderList数据格式
  *{2018-04-29:Array;2018-04-30:Array}
  *Array:{
    begin:...,
    date1:...,
    date2:...,
    day:...,
    end:...,
    id:...,
    rid:...,
    roomName:...,
    subject:...,
    status:...
  }
  */

  /**
   * 页面的初始数据
   */
  data: {
    orderList :{},
    messageList:{},
    orderListShow:false,
    messageListShow:false,
    navbar: ['待进行会议', '与会人消息'],
    currentNavbar: 0,
  },
  getMyMeeting:function(resolve,reject){
    var uid = app.globalData.userInfo.id;
    Util.request('get', API.BASE_URL + API.ORDER_LIST, { 'uid': uid }, function (data) {
      var exchangedData = page.dataFormatExchange(data.data);
      //每次setData都要根据orderList和messageList两个对象是否为空来控制相应显示
      page.setData(
        { 
          orderList: exchangedData, 
          orderListShow: !Util.isEmpty(exchangedData)
        }
      );
      resolve();
    },function(){
      reject();
    })
  },
  getMyMessage:function(resolve,reject){
    var uid = app.globalData.userInfo.id;
    Util.request('get', API.BASE_URL + API.MSG_LIST,{uid:uid},function(data){
      //console.log('message',data);
      var messageList = {};
      data.data.forEach(function(o,i){
        if(messageList[o.type] == undefined)
          messageList[o.type] = [];
        messageList[o.type].push(o);
      })
      //console.log(messageList);
      page.setData(
        {
          messageList:messageList,
          messageListShow: !Util.isEmpty(messageList)
        }
      )
      resolve();
    })
  },
  //切换选项卡
  swichNav: function (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    //更新数据
    this.refresh();
  },
  //数据按timelist组件的规定格式化
  //主要是给timelist组件格式化数据
  dataFormatExchange: (data) => {
    data.sort(function (o1, o2) {
      if (o1.day == o2.day)
        return o1.begin > o2.begin;
      return o1.day > o2.day;
    })
    var tmp = {};
    data.forEach(function (o, i) {
      o.date1 = o.day.split('-')[2];
      o.date2 = Util.getDaily(o.day);
      o.roomName = app.getRoomName(o.rid);
      if (tmp[o.day] == undefined) {
        tmp[o.day] = [];
      }
      tmp[o.day].push(o);
    })
    return tmp;
  },
  refresh:function(){
    var idx = this.data.currentNavbar;
    wx.showLoading({ title: Tootips.LOADING });
    new Promise((resolve, reject) => {
      switch(idx){
        case 0:
          page.getMyMeeting(resolve, reject);
          break;
        case 1:
          page.getMyMessage(resolve,reject);
          break;
        default:console.log(Tootips.MORIARTY);
      }
    }).then(() => {
      wx.hideLoading();
    }, () => {
      wx.hideLoading();
      Util.toast(Tootips.LOAD_FAILED, 'none');
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
    //this.refresh();
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
    console.log('homepage','show')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('homepage','hide')
    
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
    new Promise((resolve,reject)=>{
      switch(idx){
        case 0:
          this.getMyMeeting(resolve, reject);
          break;
        case 1:break;
      }
    }).then(()=>{
      wx.stopPullDownRefresh();
    },()=>{
      wx.stopPullDownRefresh();
      Util.toast(Tootips.UPDATE_FAILED,'none');
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
    
  },
  
})