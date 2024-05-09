// pages/orders/index.js
const app = getApp();

Page({
  data: {
    currentTab: 'all',
    orders: [
      {
        id: 1,
        type: '外卖',
        shopName: '某某门店',
        shopCode: '001',
        status: '制作中',
        goods: [
          { id: 1, name: '奶茶', quantity: 2, image: '../../images/goods/tea.png' },
          { id: 2, name: '汉堡', quantity: 1, image: '../../images/goods/burger.png' }
        ],
        date: '2024-05-09',
        totalQuantity: 3,
        totalPrice: 30.0
      },
      {
        id: 2,
        type: '堂食',
        shopName: '某某门店',
        shopCode: '002',
        status: '已完成',
        goods: [
          { id: 1, name: '咖啡', quantity: 1, image: '../../images/goods/coffee.png' }
        ],
        date: '2024-05-08',
        totalQuantity: 1,
        totalPrice: 10.0
      },
      {
        id: 3,
        type: '电商订单',
        shopName: '某某电商',
        shopCode: 'E001',
        status: '已完成',
        goods: [
          { id: 1, name: '牛奶', quantity: 3, image: '../../images/goods/milk.png' }
        ],
        date: '2024-05-07',
        totalQuantity: 3,
        totalPrice: 20.0
      }
    ],
    filteredOrders: []
  },

  onLoad: function () {
    this.filterOrders();
  },

  filterOrders: function () {
    let filteredOrders = [];
    switch (this.data.currentTab) {
      case 'all':
        filteredOrders = this.data.orders;
        break;
      case 'store':
        filteredOrders = this.data.orders.filter(
          (order) => order.type === '外卖' || order.type === '堂食'
        );
        break;
      case 'ecommerce':
        filteredOrders = this.data.orders.filter(
          (order) => order.type === '电商订单'
        );
        break;
    }
    this.setData({ filteredOrders });
  },

  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab }, this.filterOrders);
  }
});
