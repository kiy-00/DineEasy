// 引入必要的模块和库
const WXAPI = require('apifm-wxapi');  // 微信小程序API库
const CONFIG = require('config.js');   // 配置文件
const AUTH = require('utils/auth');    // 授权处理工具
const i18n = require("i18n/index");    // 国际化处理库

App({
  onLaunch: function () {
    // 初始化国际化配置，并设置语言相关的TabBar
    i18n.getLanguage();
    this.setTabBarLanguage();

    // 初始化API接口
    WXAPI.init(CONFIG.subDomain);

    // 检查小程序的新版本
    const updateManager = wx.getUpdateManager();
    updateManager.onUpdateReady(function () {
      wx.showModal({
        confirmText: i18n.$t().common.confirm,
        cancelText: i18n.$t().common.cancel,
        content: i18n.$t().common.upgrade,
        success(res) {
          if (res.confirm) {
            // 如果用户确认更新，应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });

    // 检查网络状态，无网络时提醒用户
    this.checkNetworkStatus();

    // 自动登录或刷新用户会话
    AUTH.autoLogin();

    // 批量查询配置数据，设置本地缓存
    this.loadConfiguration();
  },

  onShow(e) {
    // 处理扫码或分享链接进入小程序的逻辑
    AUTH.handleScan(e);
  },

  checkNetworkStatus: function() {
    const that = this;
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        if (networkType === 'none') {
          that.globalData.isConnected = false;
          wx.showToast({
            title: i18n.$t().common.noNetwork,
            icon: 'loading'
          });
        } else {
          that.globalData.isConnected = true;
          wx.hideToast();
        }
      }
    });

    wx.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        that.globalData.isConnected = false;
        wx.showToast({
          title: i18n.$t().common.networkDown,
          icon: 'loading'
        });
      } else {
        that.globalData.isConnected = true;
        wx.hideToast();
      }
    });
  },

  loadConfiguration: function() {
    WXAPI.queryConfigBatch('mallName,myBg,mapPos,order_hx_uids,subscribe_ids,share_profile,zxdz,admin_uids,shop_goods_split,QQ_MAP_KEY,shop_join_open,create_order_select_time,packaging_fee,customerServiceChatCorpId,customerServiceChatUrl').then(res => {
      if (res.code == 0) {
        res.data.forEach(config => {
          wx.setStorageSync(config.key, config.value);
        });
        if (this.configLoadOK) {
          this.configLoadOK();
        }
      }
    });
  },

  // 全局数据
  globalData: {
    isConnected: true,  // 网络连接状态
    userInfo: null,    // 用户信息
    selectedStore: null
  }
});
