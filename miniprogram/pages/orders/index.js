// pages/orders/index.js
Page({
  data: {
    // 模拟的订单数据
    orders: [
      { id: 1, title: "订单001", status: "已完成", date: "2023-09-01" },
      { id: 2, title: "订单002", status: "处理中", date: "2023-09-02" },
      { id: 3, title: "订单003", status: "已取消", date: "2023-09-03" }
    ]
  },

  onLoad: function(options) {
    // 页面加载时执行的操作
  },

  onShow: function() {
    // 页面显示时的操作
  },

  goToOrderDetail: function(e) {
    // 跳转到订单详情页
    wx.navigateTo({
      url: '/pages/order-detail/index?id=' + e.currentTarget.dataset.id
    });
  }
});
