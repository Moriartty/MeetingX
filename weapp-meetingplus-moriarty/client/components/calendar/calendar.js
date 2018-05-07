const Util = require('../../utils/util.js');
Component({
  properties:{
    // clickCallback:{
    //   type:null,
    //   value:function(){}
    // }
  },
  data:{
    curSelectedDate:'',
    curSelectedMonth:[],
    curSelectedMonthList:[]
  },
  methods:{
    handleItemClick:function(e){
      var id = e.currentTarget.dataset.id;
      this.triggerEvent('itemClick', this.data.curSelectedMonth[0]+'-'+this.data.curSelectedMonth[1]+'-'+id);
      this.setData({
        curSelectedDate:id
      })
    },
    back:function(){
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth();
      var today = date.getDate();
      //不能到当前日期以前
      var selected = [];
      if(this.data.curSelectedMonth[1]==1){
        selected[0] = this.data.curSelectedMonth[0]-1;
        selected[1] = 12;
      }
      else{
        selected[0] = this.data.curSelectedMonth[0];
        selected[1] = this.data.curSelectedMonth[1]-1
      }
      if(selected.join('-')>year+'-'+(month+1)){
        selected[2] = 1;
        var selectedList = Util.getSelectedMonth(selected)
        //监听点击，返回数据给page
        this.triggerEvent('backClick', selected.join('-'))
        this.setData(
          {
            curSelectedDate: 1,
            curSelectedMonth: selected,
            curSelectedMonthList: selectedList
          }
        )
      }
      else if (selected.join('-') == year + '-' + (month+1)){
        selected[2] = 1; 
        var temp = Util.getSelectedMonth(selected);
        var selectedList = temp.splice(today - 1, temp.length); 
        this.triggerEvent('backClick', selected[0]+'-'+selected[1]+'-'+today);
        this.setData(
          {
            curSelectedDate: selectedList[0].date,
            curSelectedMonth: [selected[0], selected[1]],
            //返回包括今天在内的当月剩余天
            curSelectedMonthList: selectedList
          }
        )
      }
      else{
        return;
      }
    },
    next:function(){
      var selected = [];
      if (this.data.curSelectedMonth[1] == 12) {
        selected[0] = this.data.curSelectedMonth[0] + 1;
        selected[1] = 1;
      }
      else {
        selected[0] = this.data.curSelectedMonth[0];
        selected[1] = this.data.curSelectedMonth[1] + 1
      }
      selected[2] = 1;
      var selectedList = Util.getSelectedMonth(selected);
      this.triggerEvent('nextClick', selected.join('-'));
      this.setData(
        {
          curSelectedDate: 1,
          curSelectedMonth: [selected[0], selected[1]],
          //返回包括今天在内的当月剩余天
          curSelectedMonthList: selectedList
        }
      )
    }
  },
  ready: function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var today = date.getDate();
    var temp = Util.getSelectedMonth([year, month+1, 1]);
    var list = temp.splice(today - 1, temp.length);
    //console.log(temp.splice(today-1, temp.length));
    this.setData(
      {
        curSelectedDate:list[0].date,
        curSelectedMonth:[year,month+1],
        //返回包括今天在内的当月剩余天
        curSelectedMonthList:list
      }
    )
    //console.log(Util.getNowFormatDate());
    //console.log(Util.getSelectedMonth([2018,4,1]));
  },
})