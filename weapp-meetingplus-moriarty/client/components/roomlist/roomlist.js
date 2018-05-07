const app = getApp();
Component({
  properties:{
    roomList:{
      type:Object,
      value:[],
      observer:function(){}
    }
  },
  data:{
    status:{}
  },
  methods:{
    toggleFloor:function(e){
      var id = e.currentTarget.dataset.id;
      var nextStatus = Object.assign({},this.data.status);
      nextStatus[id] = !this.data.status[id]
      // console.log(this.data.status);
      // console.log(nextStatus);
      this.setData({status:nextStatus});
    }
  },
  attached:function(){
    // console.log('aaa',this.properties.roomList)
    var status = {}
    //console.log('aaa',app.globalData.floorList);
    app.globalData.floorList.forEach(function(o,i){
      if (o.id == 1)
        status[o.id] = true;
      else
        status[o.id] = false;
    })
    //console.log(status);
    this.setData({status:status});
    //console.log('attached',this.properties.roomList)
  }
})