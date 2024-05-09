Page({
  data: {
    userInfo: {
    },
    discounts: [
      { title: "折扣菜品1", detail: "折扣价格 ￥XX.XX" },
      { title: "特价菜品2", detail: "仅售 ￥XX.XX" },
      { title: "优惠套餐", detail: "节日特惠 ￥XX.XX" }
    ],
    regular: [
      {content: "购买菜品获得与价格数量相同的积分"},
      {content: "金卡会员获得的积分数量是一般用户的1.3倍"},
      {content: "银卡会员获得的积分数量是一般用户的1.2倍"},
      {content: "普通会员获得的积分数量是一般用户的1.1倍"}
    ]
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
    console.log("页面显示");
  }
});
