// pages/index/index.js
const app = getApp();
console.log('App Instance:', app);
Page({
  data: {
    userInfo: {
      
    },
    currentSwiper: 0,
    swiperMax: 2
  },

  onLoad: function() {
    // 从全局状态获取用户信息
    const globalData = getApp().globalData;
    if (globalData.userInfo) {
      this.setData({
        userInfo: globalData.userInfo
      });
    } else {
      // 从本地存储获取用户信息
      const userInfo = wx.getStorageSync('userInfo');
      if (userInfo) {
        this.setData({
          userInfo
        });
      } else {
        // 处理未登录状态
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        });
      }
    }
  },

  onShow: function() {
    // Actions to take when page is displayed
  },

  goToDineIn: function() {
    // 检查用户是否已选择门店
    console.log('Selected Store:', app.globalData.selectedStore);
    if (app.globalData.selectedStore) {
      // 如果已选择门店，跳转到点餐页面
      wx.navigateTo({
        url: '../../packageA/pages/order/index' // 确保这个路径是正确的
      });
    } else {
      // 如果未选择门店，跳转到选择门店页面
      wx.navigateTo({
        url: '/pages/storeLocator/index' // 确保这个路径是正确的
      });
    }
  },
  goToPointsMall: function () {
    //const selectedStore = app.globalData.selectedStore;
    const selectedStore = "某某门店"
    if (selectedStore) {
      wx.navigateTo({
        url: '../../packageC/pages/points/index'
      });
    } else {
      wx.navigateTo({
        url: '/pages/storeLocator/index'
      });
    }
  }
});