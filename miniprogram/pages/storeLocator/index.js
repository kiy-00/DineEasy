// storeLocator.js
Page({
  data: {
    regions: ['上海', '北京', '昆明', '南京', '杭州'],
    regionIndex: 0,
    searchQuery: '',
    filteredStores: []
  },

  onLoad: function() {
    this.fetchNearbyStores(); // 加载时获取200km内的门店数据
  },

  fetchNearbyStores: function() {
    let that = this;
    // 检查位置服务是否开启和授权状态
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userLocation']) {
          // 已经授权，可以直接调用 getLocation 获取位置了
          that.getLocationAndFetchStores();
        } else if (res.authSetting['scope.userLocation'] === undefined) {
          // 首次请求授权
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户同意授权，直接获取位置
              that.getLocationAndFetchStores();
            },
            fail() {
              // 用户拒绝授权，引导用户去开启
              wx.showModal({
                title: '需要位置权限',
                content: '请允许使用您的位置信息以便为您提供附近的门店信息',
                success(modalRes) {
                  if (modalRes.confirm) {
                    wx.openSetting(); // 引导用户自行打开设置页面
                  }
                }
              });
            }
          });
        } else {
          // 用户已拒绝，再次引导用户开启权限
          wx.showModal({
            title: '需要位置权限',
            content: '请在设置界面打开位置信息权限，以便为您提供服务',
            success(modalRes) {
              if (modalRes.confirm) {
                wx.openSetting(); // 引导用户自行打开设置页面
              }
            }
          });
        }
      }
    });
  },
  
  getLocationAndFetchStores: function() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;
        wx.request({
          url: `https://example.com/api/stores/nearby?lat=${latitude}&lng=${longitude}&distance=200`,
          success: (res) => {
            this.setData({
              filteredStores: res.data
            });
          },
          fail: (error) => {
            console.error("请求门店数据失败:", error);
          }
        });
      },
      fail: (error) => {
        console.error("获取位置失败:", error);
      }
    });
  },  

  onRegionChange: function(e) {
    this.setData({
      regionIndex: e.detail.value
    });
  },

  onSearchInput: function(e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  onSearch: function() {
    // 调用API根据地区和搜索词获取门店数据
    wx.request({
      url: `https://example.com/api/stores/search?region=${this.data.regions[this.data.regionIndex]}&query=${this.data.searchQuery}`,
      success: (res) => {
        this.setData({
          filteredStores: res.data
        });
      }
    });
  },

  makeCall: function(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    });
  },

  navigateTo: function(e) {
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.lat),
      longitude: parseFloat(e.currentTarget.dataset.lng),
      scale: 18
    });
  }
});
