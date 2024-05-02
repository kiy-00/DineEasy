// pages/index/index.js
const app = getApp();
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

  onLoad: function(options) {
    // Page initialization logic here
  },

  onShow: function() {
    // Actions to take when page is displayed
  },

  goToDineIn: function() {
    // 检查用户是否已选择门店
    if (app.globalData.selectedStore) {
      // 如果已选择门店，跳转到点餐页面
      wx.navigateTo({
        url: '/pages/order/index' // 确保这个路径是正确的
      });
    } else {
      // 如果未选择门店，跳转到选择门店页面
      wx.navigateTo({
        url: '/pages/storeLocator/index' // 确保这个路径是正确的
      });
    }
  }
});