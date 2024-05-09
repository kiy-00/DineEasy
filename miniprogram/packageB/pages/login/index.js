Page({
  data: {
    username: '',
    password: '',
    usernamePlaceholder: '请输入用户名',
    passwordPlaceholder: '请输入密码'
  },

  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  onPasswordLogin(e) {
    const { username, password } = this.data;

    // 检查用户名和密码是否为空
    if (!username) {
      this.setData({
        usernamePlaceholder: '请输入用户名'
      });
    }

    if (!password) {
      this.setData({
        passwordPlaceholder: '请输入密码'
      });
    }

    if (!username || !password) {
      wx.showToast({
        title: '用户名和密码均不能为空',
        icon: 'none'
      });
      return;
    }

    // 发送登录请求
    wx.request({
      url: 'https://api.dineeasy.cn/api/password-login',
      method: 'POST',
      data: {
        username,
        password
      },
      success: (res) => {
        const { token, user } = res.data;
        wx.setStorageSync('token', token);
        wx.setStorageSync('user', user);
        wx.redirectTo({
          url: '/pages/index/index'
        });
      },
      fail: () => {
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
      }
    });
  },

  onGetWechatAuth(e) {
    wx.login({
      success: (res) => {
        wx.request({
          url: 'https://api.dineeasy.cn/api/wechat-login',
          method: 'POST',
          data: {
            code: res.code
          },
          success: (res) => {
            const { token, user } = res.data;
            wx.setStorageSync('token', token);
            wx.setStorageSync('user', user);
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }
        });
      }
    });
  }
});
