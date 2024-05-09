const CONFIG = require('config.js');

// 伪代码 - 假设实现
const AUTH = {
  // 自动登录逻辑
  autoLogin: function() {
    const token = wx.getStorageSync('token');
    const userInfo = wx.getStorageSync('userInfo');

    // 若已登录，则直接跳过
    if (token && userInfo) {
      getApp().globalData.userInfo = userInfo;
      console.log('已登录');
      return;
    }

    // 否则尝试微信登录
    wx.login({
      success: function(loginRes) {
        if (loginRes.code) {
          wx.request({
            url: `${CONFIG.apiBaseUrl}/user/login`,
            method: 'POST',
            data: { code: loginRes.code },
            success: function(res) {
              if (res.data.success) {
                wx.setStorageSync('userInfo', res.data.userInfo);
                wx.setStorageSync('token', res.data.token);
                getApp().globalData.userInfo = res.data.userInfo; // 更新全局状态
                console.log('登录成功');
              } else {
                console.error('登录失败');
              }
            }
          });
        } else {
          console.error('微信登录失败：', loginRes.errMsg);
        }
      },
      fail: function(err) {
        console.error('微信登录请求失败：', err);
      }
    });
  },

  // 处理扫码信息
  handleScan: function(e) {
    if (e && e.query && e.query.scene) {
      const scene = decodeURIComponent(e.query.scene);
      if (scene.split(',').length === 3) {
        this.autoLogin(); // 确保登录
        // 执行扫码点餐逻辑
        console.log('扫码点餐逻辑处理');
      }
    } else {
      this.autoLogin(); // 默认尝试自动登录
    }
  }
};

module.exports = AUTH;
