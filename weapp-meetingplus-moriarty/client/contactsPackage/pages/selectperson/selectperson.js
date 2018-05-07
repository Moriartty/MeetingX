// contactsPackage/pages/seleceperson/selectperson.js
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
    displayFlag:2,
    contactsList: {},
    peopleList: [],
    checkedList:[],
    addAttendance:false
  },
  getContacts: function (res, rej) {
    wx.showLoading({
      title: Tootips.LOADING,
    })
    var uid = app.globalData.userInfo.id;
    //如果全局变量里存了相关数据就不进行网络请求了，太慢了
    //console.log('commonList', app.globalData.commonList);
    if (app.globalData.commonList.length > 0) {
      var promise1 = new Promise((resolve,reject)=>{
        var tmp = [];
        tmp.push({ type: 'person', val: app.globalData.contactsList });
        tmp.push({ type: 'common', val: app.globalData.commonList });
        resolve(tmp);
      }).then((data)=>{
        page.handleRawData(data);
      }, () => {
        Util.toast(Tootips.LOAD_FAILED, 'none');
      })
    }
    else{
      console.log('aaa');
      var promise1 = new Promise((resolve, reject) => {
        Util.request('get', API.BASE_URL + API.CONTACT_GETPERSON, {}, function (data) {
          resolve({ type: 'person', val: data.data });
        }, function (err) {
          reject();
        })
      })
      var promise2 = new Promise((resolve, reject) => {
        Util.request('get', API.BASE_URL + API.CONTACT_GETCOMMONPERSON, { uid }, function (data) {
          resolve({ type: 'common', val: data.data });
        }, function () {
          reject();
        })
      })
      Promise.all([promise1, promise2]).then((data)=>{
        if (Util.isEmpty(app.globalData.contactsList)) {
          data.forEach(function (o) {
            if (o.type == 'person')
              app.globalData.contactsList = o.val.slice(0);
            if (o.type == 'common') {
              app.globalData.commonList = o.val.slice(0);
            }
          })
        }
        page.handleRawData(data);
      }, () => {
        Util.toast(Tootips.LOAD_FAILED, 'none');
      })
    }
  },
  /**
   * 处理原始contactsList数据
   */
  handleRawData:function(data){
    //console.log(data);
    var contactsTempList = {};
    data.forEach(function (o, i) {
      if (o.type == 'common') {
        var tmp = o.val.map((item, idx) => {
          return app.getPersonInfo(item.id);
        });
        console.log(tmp);
        if (contactsTempList['常用联系人'] == undefined)
          contactsTempList['常用联系人'] = [];
        contactsTempList['常用联系人'] = tmp;
      }
      else {
        o.val.forEach((item, idx) => {
          var firstChar = item.py[0].toUpperCase();
          if (contactsTempList[firstChar] == undefined)
            contactsTempList[firstChar] = [];
          contactsTempList[firstChar].push(item);
        })
      }
    })
    page.refreshRawData(page.data.checkedList, Util.filter_array(page.sortContactsList(contactsTempList)),app.globalData.contactsList);
    wx.hideLoading();
  },
  sortContactsList: function (data) {
    var alphabat = ['☆', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var tempList = alphabat.map((o, i) => {
      if (i == 0)
        return { type: "常用联系人", val: data['常用联系人'] }
      else {
        if (data[o] != undefined)
          return { type: o, val: data[o] };
      }
    })
    return tempList;
  },
  //这块会有一个bug,勾选分类列表的人员，然后搜索该人员，在普通列表中会没有勾选
  checkboxChange: function (e) {
    var val = e.detail;
    console.log(val);
    //这里要去重，因为存在常用联系人这一项都是重复的,这里用es6的去重方法
    var set = new Set(val);
    var newArr = Array.from(set);
    page.setData({checkedList:newArr});
  },
  _cancel:function(){
    wx.navigateBack({
      //数字表示返回的层级
      delta: 1
    })
  },
  _confirm:function(){
    console.log(page.data.checkedList);
    if(page.data.addAttendance){
      console.log('addAttendance');
    }
    else{
      var result = [];
      var tmpContactsList = app.globalData.contactsList;
      page.data.checkedList.forEach(function (o) {
        var id = parseInt(o);
        tmpContactsList.forEach((val) => {
          if (val.id == id) {
            result.push(val);
          }
        })
      })
      const wxCurrPage = getCurrentPages();//获取当前页面的页面栈
      const wxPrevPage = wxCurrPage[wxCurrPage.length - 2];//获取上级页面的page对象
      if (wxPrevPage) {
        //修改上级页面的数据
        wxPrevPage.setData({
          checkedList: result,
        })
      }
      wx.navigateBack({
        delta: 1
      })
    }
  },
  refreshRawData:function(checkedList,contactsList,peopleList){
    var promise1 = new Promise((resolve,reject)=>{
      checkedList.forEach((o)=>{
        var id = parseInt(o);
        contactsList.forEach((val)=>{
          val.val.forEach((item)=>{
            if(item.id == id)
              item.checked = true;
          })
        })
      })
      resolve({'type':'contactsList','val':contactsList});
    });
    var promise2 = new Promise((resolve,reject)=>{
      checkedList.forEach((o)=>{
        var id = parseInt(o);
        peopleList.forEach((val)=>{
          if(val.id == id){
            val.checked = true;
          }
        })
      })
      resolve({'type':'peopleList','val':peopleList});
    });
    Promise.all([promise1,promise2]).then((data)=>{
      var nextData = {
        'contactsList':[],
        'peopleList':[]
      };
      data.forEach((o)=>{
        if(o.type == 'contactsList')
          nextData.contactsList = o.val;
        else
          nextData.peopleList = o.val;
      })
      page.setData(nextData);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
    //this.setData({ 'displayFlag': options.displayFlag })
    //console.log(options);
    console.log(Util.isEmpty(options));
    if(!Util.isEmpty(options)){
      console.log(options);
      if(options.checkedList&&options.checkedList != "")
        this.setData({ checkedList: options.checkedList.split(',') });
      if(options.addAttendance&&options.addAttendance)
        this.setData({addAttendance:options.addAttendance});
    }
     // var tmpCheckedList = options.checkedList.split(',');
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
    page.getContacts();
    // new Promise((resolve, reject) => {
    //   page.getContacts(resolve, reject);
    // }).then(() => {
    //   page.getGroups();
    // })
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