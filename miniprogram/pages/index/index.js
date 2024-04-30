// pages/index/index.js
Page({
  data: {
    userInfo: {
      name: "张三",
      level: "金卡会员",
      exp: 500,
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
    // Page initialization logic here
  },

  onShow: function() {
    // Actions to take when page is displayed
  }
});