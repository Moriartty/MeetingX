Component({
  properties: {
    orderList:{
      type:Object,
      value:{}
     }
  },
  data:{

  },
  methods:{
    /**
     * 点击item查看会议详情
     */
    _handleClick:function(e){
      var meetingId = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../conferenceDetails/conferenceDetails?meetingId='+meetingId,
      })
      //console.log(e.currentTarget.dataset.id);
    }
  },
  ready:function(){
    //console.log('aa', this.properties.orderList);
  }
})