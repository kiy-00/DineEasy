// pages/productDetail/index.js
const productsData = [
  {
    id: 1,
    image: '../../../images/points-products/product1.jpg',
    name: '抹茶拿铁',
    points: 300,
    stock: 20
  },
  {
    id: 2,
    image: '../../../images/points-products/product2.jpg',
    name: '草莓奶昔',
    points: 500,
    stock: 10
  }
  // 更多商品数据
];

Page({
  data: {
    product: {}
  },

  onLoad: function (options) {
    const productId = parseInt(options.id, 10);
    const product = productsData.find(item => item.id === productId);
    this.setData({ product });
  },

  exchangeProduct: function () {
    const { product } = this.data;
    wx.showModal({
      title: '兑换确认',
      content: `您确定要兑换 ${product.name} 吗？`,
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '兑换成功！',
            icon: 'success'
          });
          // 进一步逻辑：更新用户积分、库存等
        }
      }
    });
  }
});
