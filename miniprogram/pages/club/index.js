// pages/index/index.js
Page({
  data: {
    userInfo: {
      name: "张三",
      level: "金卡会员",
      exp: 3000,
      coupons: 5,
      balance: 200,
      avatar: "../../images/avatar.png" // 示例头像路径
    },
    currentSwiper: 0,
    swiperMax: 2
  },

  swiperLeft: function() {
    console.log('Swiping left');
    let newIndex = this.data.currentSwiper - 1;
    if (newIndex < 0) {
      newIndex = this.data.swiperMax;
    }
    this.setData({
      currentSwiper: newIndex
    });
  },
  
  swiperRight: function() {
    console.log('Swiping right');
    let newIndex = this.data.currentSwiper + 1;
    if (newIndex > this.data.swiperMax) {
      newIndex = 0;
    }
    this.setData({
      currentSwiper: newIndex
    });
  },  

  onLoad: function(options) {
    console.log("页面加载", this.data.userInfo);
  },
  onShow: function() {
    console.log("页面显示");
  }
});
