// pages/points/index.js
const app = getApp();

Page({
  data: {
    selectedStore: {},
    userPoints: 0,
    products: [
      {
        id: 1,
        image: '../../../images/points-products/product1.jpg',
        name: '丝袜奶茶',
        points: 300,
        stock: 20
      },
      {
        id: 2,
        image: '../../../images/points-products/product2.jpg',
        name: '珍珠奶茶',
        points: 500,
        stock: 10
      }
      // 更多商品数据
    ]
  },

  onLoad: function () {
    const selectedStore = app.globalData.selectedStore || {};
    const userInfo = wx.getStorageSync('user');
    const userPoints = userInfo ? userInfo.points : 0;
    this.setData({
      selectedStore,
      userPoints
    });
  },

  goToStoreLocator: function () {
    wx.navigateTo({
      url: '../../../pages/storeLocator/index'
    });
  },

  goToPointsDetail: function () {
    wx.navigateTo({
      url: '/pages/pointsDetail/index'
    });
  },

  goToPointsRules: function () {
    wx.navigateTo({
      url: '/pages/pointsRules/index'
    });
  },

  goToProductDetail: function (e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../pointsProductDetail/index?id=${productId}`
    });
  }
});
