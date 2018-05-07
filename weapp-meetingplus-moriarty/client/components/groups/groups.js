var page;
const app = getApp();
const Util = require('../../utils/util.js');
Component({
  properties:{
    groupsList:{
      type:Object,
      value:null,
      observer:'_packageArray'
    },
    displayFlag: {
      type: Number,
      value: null
    },
  },
  data:{
    templateData:{
      groupsList:{},
      status:{}
    }
  },
  methods:{
    _packageArray:function(newVal){
      //console.log('newVal1',newVal);
      if(newVal.length>0&&Array.isArray(newVal)){
        var status = {}
        newVal.forEach(function(o,i){
          if(i==0)
            status[o.id] = true;
          else
            status[o.id] = false;
        })
        page.setData({
          templateData:{
            'groupsList':newVal,
            'status':status
          }
        })
      }
    },
    _handleAddGroup:function(){
      wx.navigateTo({
        url: '../../contactsPackage/pages/addgroup/addgroup',
      })
    },
    toggleGroup: function (e) {
      var id = e.currentTarget.dataset.id;
      console.log(id);
      // var nextStatus = Object.assign({}, this.data.status);
      // nextStatus[id] = !this.data.status[id]
      // // console.log(this.data.status);
      // console.log(nextStatus);
      // this.setData({ status: nextStatus });
      var nextStatus = Object.assign({},page.data.templateData.status);
      nextStatus[id] = !page.data.templateData.status[id];
      this.setData(
        {
          templateData:{
            groupsList:page.data.groupsList,
            status:nextStatus
          }
        }
      );
      setTimeout(function () { console.log(page.data) }, 0)
    }
  },
  ready:function(){
    page = this;
  },
  
})