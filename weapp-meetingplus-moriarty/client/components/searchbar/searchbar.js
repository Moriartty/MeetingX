Component({
  properties:{
    
  },
  data:{
    defaultVal:''
  },
  methods:{
    _handleInput:function(e){
      var val = e.detail.value;
      this.triggerEvent('_handleInput', val);
    },
    _clear:function(){
      this.setData({defaultVal:''});
      this.triggerEvent('_clear','');
    }
  }
})