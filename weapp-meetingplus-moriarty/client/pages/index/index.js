//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userName:app.globalData.userInfo.username,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  handleClick:function(e){
    var id = e.currentTarget.dataset.id;
    switch(id){
      case 0:
        wx.navigateTo({
          url:'../contact/contact?displayFlag=0'
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../../settingPackage/pages/feedback/feedback',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../../settingPackage/pages/introduce/introduce',
        })
        break;
    }
  },
  onLoad: function () {
    console.log(app.globalData.userInfo.username)
    if (app.globalData.wxUserInfo) {
      this.setData({
        userInfo: app.globalData.wxUserInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.wxUserInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log('aaa', app.globalData.wxUserInfo);
    console.log('can i use', this.data.canIUse);
    console.log('hasUserInfo', this.data.hasUserInfo);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.wxUserInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
