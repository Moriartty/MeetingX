// pages/contact/contact.js
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
    displayFlag:1,
    navbar: ['联系人', '群组'],
    currentNavbar: 1,
    contactsList:{},
    peopleList:[],
    groupsList:[],
    checkedList:[]
  },
  /**
   * 切换 navbar
   */
  swichNav:function(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    });
    //this.refresh();
  },
  getContacts:function(res,rej){
    wx.showLoading({
      title: Tootips.LOADING,
    })
    var uid = app.globalData.userInfo.id;
    var contactsTempList = {};
    var promise1 = new Promise((resolve,reject)=>{
      Util.request('get', API.BASE_URL + API.CONTACT_GETPERSON,{},function(data){
        resolve({type:'person',val:data.data});
      },function(err){
        reject();
      })
    })
    var promise2 = new Promise((resolve,reject)=>{
      Util.request('get', API.BASE_URL + API.CONTACT_GETCOMMONPERSON,{uid},function(data){
        resolve({type:'common',val:data.data});
      },function(){
        reject();
      })
    })
    Promise.all([promise1,promise2]).then((data)=>{
      if (Util.isEmpty(app.globalData.contactsList)){
        data.forEach(function (o) {
          if (o.type == 'person')
            app.globalData.contactsList = o.val.slice(0);
          if (o.type == 'common') {
            app.globalData.commonList = o.val.slice(0);
          }
        })
      }
      data.forEach(function(o,i){
        if(o.type == 'common'){
          var tmp = o.val.map((item,idx)=>{
            return app.getPersonInfo(item.id);
          });
          if (contactsTempList['常用联系人']==undefined)
            contactsTempList['常用联系人'] = [];
          contactsTempList['常用联系人'] = tmp;
        }
        else{
          o.val.forEach((item,idx)=>{
            var firstChar = item.py[0].toUpperCase();
            if(contactsTempList[firstChar]==undefined)
              contactsTempList[firstChar] = [];
            contactsTempList[firstChar].push(item);
          })
        }
      })
      this.setData(
        {
          contactsList:page.sortContactsList(contactsTempList),
          peopleList:app.globalData.contactsList
        }
      );
      res();
      wx.hideLoading();
    },()=>{
      Util.toast(Tootips.LOAD_FAILED,'none');
    })
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
  getGroups:function(){
    wx.showLoading({title: Tootips.LOADING})
    var uid = app.globalData.userInfo.id;
    Util.request('get', API.BASE_URL + API.CONTACT_GETGROUPS, { uid },
      function (data) {
        var promises = data.data.map(function (o, i) {
          return (function(obj){
            var gid = o.id,
            gName = o.name,
            count = o.count;
            return new Promise((resolve, reject) => {
              Util.request('get', API.BASE_URL + API.CONTACT_GETPERSONBYGROUP, { gid },
                function (data) {
                  //console.log(app.globalData.contactsList);
                  var tmp = {
                    'id':gid,
                    'name':gName,
                    'count':count,
                    'val':data.data.map((o,i)=>{
                      return app.getPersonInfo(o);
                    })
                  }
                  resolve(tmp);
                },()=>{reject();})
            })
          })(o);
        });
        Promise.all(promises).then(
          (data)=>{
            wx.hideLoading();
            //console.log(data);
            page.setData({'groupsList':data})
          },()=>{
            wx.hideLoading();
            Util.toast(Tootips.LOAD_FAILED, 'none');
          });
      }, ()=>{
        wx.hideLoading();
        Util.toast(Tootips.LOAD_FAILED, 'none');
      })
    //setTimeout(function () { console.log(page.data.groupsList);},1000)
  },
  checkboxChange:function(e){
    var val = e.detail;
    var tmpContactsList = page.data.contactsList;
    tmpContactsList.forEach((o,i)=>{
      if(o){
        o.val.forEach((val,idx)=>{
          // if(val.id)
        })
      }
    })
    console.log(this.data.contactsList);
    console.log(val);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page = this;
    this.setData({'displayFlag':options.displayFlag})
   // console.log('options',options);
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
    //这样是保证在getGroups之前app.globalData.contactsList已经装载好了数据
    //但会产生本属于群组页面的加载条在联系人页面显示，待解决！
    new Promise((resolve,reject)=>{
      page.getContacts(resolve,reject);
    }).then(()=>{
      page.getGroups();
    })
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
    // var fsg = this.data.fsg;
    // if(fsg-3<0)
    //   fsg = 0;
    // else
    //   fsg = fsg - 3;
    // this.setData({fsg:fsg})
    // console.log('xia')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  //   var length = this.data.contactsList.length;
  //   if(fsg + 3 > length-1)
  //     fsg = length - 1;
  //   else
  //     fsg = fsg + 3;
  //   console.log('shang')
   },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})