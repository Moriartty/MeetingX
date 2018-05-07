Component({
  properties:{
    messageList:{
      type:Object,
      value:{}
    }
  },
  data:{},
  methods:{},
  ready: function () {
    console.log('aa', this.properties.messageList);
  }
})