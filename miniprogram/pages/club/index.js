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

  onLoad: function(options) {
    console.log("页面加载", this.data.userInfo);
  },
  onShow: function() {
    console.log("页面显示");
  }
});
