// pages/user-center/index.js
Page({
  data: {
    userInfo: {
      name: "",
      avatar: "../../images/avatar.png",
      exp: 800
    },
    calendarRows: [
      [{ date: 1, signed: true }, { date: 2, signed: false }, { date: 3, signed: true }, { date: 4, signed: true }, { date: 5, signed: false }, { date: 6, signed: true }, { date: 7, signed: false }],
      [{ date: 8, signed: true }, { date: 9, signed: false }, { date: 10, signed: true }, { date: 11, signed: true }, { date: 12, signed: false }, { date: 13, signed: true }, { date: 14, signed: false }],
      [{ date: 15, signed: true }, { date: 16, signed: false }, { date: 17, signed: true }, { date: 18, signed: true }, { date: 19, signed: false }, { date: 20, signed: true }, { date: 21, signed: false }],
      [{ date: 22, signed: true }, { date: 23, signed: false }, { date: 24, signed: true }, { date: 25, signed: true }, { date: 26, signed: false }, { date: 27, signed: true }, { date: 28, signed: false }]
    ]
  },

  onLoad: function() {
    // 获取用户信息并设置数据
    const globalData = getApp().globalData;
    if (globalData.userInfo) {
      this.setData({ userInfo: globalData.userInfo });
    } else {
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({ userInfo });
      }
    }
  },

  gotoProfile: function() {
    wx.navigateTo({ url: '/pages/profile/index' });
  },

  gotoLogin: function() {
    wx.navigateTo({ url: '../../packageB/pages/login/index'});
  },
  gotoOrders: function() {
    wx.switchTab({ url: '/pages/orders/index' });
  },

  gotoPoints: function() {
    wx.navigateTo({ url: '../../packageC/pages/points/index' });
  },

  gotoCoupons: function() {
    wx.navigateTo({ url: '/pages/coupons/index' });
  },

  gotoFranchise: function() {
    wx.navigateTo({ url: '/pages/franchise/index' });
  },

  gotoBalance: function() {
    wx.navigateTo({ url: '/pages/balance/index' });
  }
});
