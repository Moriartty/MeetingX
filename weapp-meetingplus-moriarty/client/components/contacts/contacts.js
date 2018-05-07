var page;
const app = getApp();
const Util = require('../../utils/util.js');
const top = 0,bottom = 5000;
Component({
  properties:{
    contactsList:{
      type:Object,
      value:null,
      observer:'_packageArray'
    },
    peopleList:{
      type:Array,
      value:null,
    },
    displayFlag:{
      type:Number,
      value:null
    },
  },
  data:{
    alphabat: ['☆','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
    toView:'',
    searchContent:'',
    matchedList:[],
    templateData:{
      contactsList:[],
      status:{}
    },
    top:0
  },
  methods:{  
    /*
    将父组件传来的数组类型结果包装成模板需要的对象
    模板必须要传对象数据，所以将数组封装成对象
    */ 
    _packageArray:function(newVal){
      //console.log(Util.filter_array(newVal));
      if(newVal.length>0){
        var array = Util.filter_array(newVal);
        var status = {};
        array.forEach(function(o,i){
          if(i==0)
            status[o.type] = true;
          else
            status[o.type] = false;
        })
        //console.log(array);
        this.setData(
          {
            'templateData':{
              'contactsList': array,
              'status': status
            }
          })
      }
    },
    /*
    接受搜索框的输入值进行搜索，然后重新渲染
    */ 
    handleInput:function(e){
      var curVal = e.detail;
      console.log(e);
      //这里暂时不判断contactsList是否为空，因为在初次加载时应该就把contactsList存为全局变量了
      //var peopleList = app.globalData.contactsList;
      var peopleList = page.data.peopleList;
      var result = [];
      peopleList.forEach((o,i)=>{
        if(o.py.indexOf(curVal)>=0)
          result.push(o);
      })
      page.setData({
        'searchContent':curVal,
        //这里好奇怪，contactsList传给模板得用对象，这里TMD用数组
        'matchedList':result
      });
      setTimeout(function(){
        console.log(page.data.matchedList)
      },0);
    },
    /**
     * 点击右侧sidebar实现scroll-view重新定位
     */
    _handleClickSidebar:function(e){
      var id = e.currentTarget.dataset.id;
      //id = (id == '☆'?'常用联系人':id);
      console.log(id);
      //当不处于分类列表状态时不进行状态更新
      if(page.data.searchContent=='')
        page.toggleParentItem(id);
    },
    /**
     * 响应checkbox点击事件
     */
    _checkboxChange:function(e){
      var val =e.detail.value;
      this.triggerEvent('_checkboxChange', val);
    },
    /**
     * 响应联系人列表parent点击事件
     */
    _handleHeadTap:function(e){
      var id = e.currentTarget.dataset.id;
      page.toggleParentItem(id);
    },
    /**
     * 滑到顶部
     */
    _hasScrolledTop:function(e){
      var fsg = this.data.templateData.fsg;
      if(fsg-3<0)
        fsg = 0;
      else
        fsg = fsg - 3;
      console.log(fsg);
      this.setData(
        {
          'templateData':{
            contactsList:page.data.contactsList,
            fsg:fsg
          },
          'top':bottom
      })
      console.log('xia')
      //this.triggerEvent('_hasScrolledTop', e);
    },
    /**
     * 滑到底部
     */
    _hasScrolledBottom:function(e){
      var length = this.data.templateData.contactsList.length;
      var fsg = this.data.templateData.fsg;
      if (fsg + 3 > length - 1)
        fsg = length - 1;
      else
        fsg = fsg + 3;
      console.log(fsg);
      this.setData(
        {
          'templateData':{
            contactsList:page.data.contactsList,
            fsg:fsg
          },
          'top':top
        })
      console.log('shang')
      //this.triggerEvent('_hasScrolledBottom', e);
    },
    toggleParentItem:function(id){
      var nextStatus = Object.assign({}, page.data.templateData.status);
      //为了性能，整个可拓展列表同一时刻只允许一个子项展开
      var nextState = !nextStatus[id];
      for (var i in nextStatus) {
        if (i == id)
          nextStatus[i] = nextState;
        else
          nextStatus[i] = false;
      }
      //更新templateData,并将对应id项置顶
      page.setData({
        'templateData': {
          contactsList: page.data.templateData.contactsList,
          status: nextStatus
        },
        'toView': id
      })
    }
  },
  ready:function(){
    page = this;
  }
})