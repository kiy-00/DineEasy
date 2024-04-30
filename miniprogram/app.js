// 引入必要的模块和库
//const WXAPI = require('apifm-wxapi')  // 微信小程序API库
const CONFIG = require('config.js')  // 配置文件
//const AUTH = require('utils/auth')  // 授权处理工具
const i18n = require("i18n/index")  // 国际化处理库

// 应用的主体定义
App({
  onLaunch: function () {
    // 初始化国际化配置，并设置语言相关的TabBar
    i18n.getLanguage()
    this.setTabBarLanguage()

    // 初始化API接口
    WXAPI.init(CONFIG.subDomain)

    // 检查小程序的新版本
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        confirmText: i18n.$t().common.confirm,
        cancelText: i18n.$t().common.cancel,
        content: i18n.$t().common.upgrade,
        success(res) {
          if (res.confirm) {
            // 如果用户确认更新，应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })

    // 检查网络状态，无网络时提醒用户
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          this.globalData.isConnected = false
          wx.showToast({
            title: i18n.$t().common.noNetwork,
            icon: 'loading'
          })
        }
      }
    })

    // 监听网络状态变化，做出相应处理
    wx.onNetworkStatusChange((res) => {
      if (!res.isConnected) {
        this.globalData.isConnected = false
        wx.showToast({
          title: i18n.$t().common.networkDown,
          icon: 'loading'
        })
      } else {
        this.globalData.isConnected = true
        wx.hideToast()
      }
    })

    // 批量查询配置数据，设置本地缓存
    WXAPI.queryConfigBatch('mallName,myBg,mapPos,order_hx_uids,subscribe_ids,share_profile,zxdz,admin_uids,shop_goods_split,QQ_MAP_KEY,shop_join_open,create_order_select_time,packaging_fee,customerServiceChatCorpId,customerServiceChatUrl').then(res => {
      if (res.code == 0) {
        res.data.forEach(config => {
          wx.setStorageSync(config.key, config.value);
        })
        if (this.configLoadOK) {
          this.configLoadOK()
        }
      }
    })
  },

  onShow(e) {
    // 处理扫码或分享链接进入小程序的逻辑
    if (e && e.query && e.query.scene) {
      const scene = decodeURIComponent(e.query.scene)  // 解析场景值
      if (scene && scene.split(',').length == 3) {
        // 扫码点餐逻辑
      } else {
        AUTH.checkHasLogined().then(isLogined => {
          if (!isLogined) {
            AUTH.authorize()
          }
        })
      }
    } else {
      AUTH.checkHasLogined().then(isLogined => {
        if (!isLogined) {
          AUTH.authorize()
        }
      })
    }
    // 处理邀请人信息，用于邀请奖励等逻辑
    if (e && e.query && e.query.inviter_id) {
      wx.setStorageSync('referrer', e.query.inviter_id)
      if (e.shareTicket) {
        wx.getShareInfo({
          shareTicket: e.shareTicket,
          success: res => {
            wx.login({
              success(loginRes) {
                if (loginRes.code) {
                  WXAPI.shareGroupGetScore(
                    loginRes.code,
                    e.query.inviter_id,
                    res.encryptedData,
                    res.iv
                  ).then(_res => {
                    console.log(_res)
                  }).catch(err => {
                    console.error(err)
                  })
                } else {
                  console.error(loginRes.errMsg)
                }
              }
            })
          }
        })
      }
    }
    this.refreshStorageShopInfo()
  },

  // 刷新存储的门店信息
  async refreshStorageShopInfo() {
    let shopInfo = wx.getStorageSync('shopInfo')
    if (!shopInfo) {
      return
    }
    const res = await WXAPI.shopSubdetail(shopInfo.id)
    if (res.code == 0) {
      const distance = shopInfo.distance
      shopInfo = res.data.info
      shopInfo.distance = distance
      wx.setStorageSync('shopInfo', shopInfo)
    }
  },

  // 初始化页面的语言设置
  initLanguage(_this) {
    _this.setData({
      language: i18n.getLanguage(),
      $t: i18n.$t(),
    })
  },

  // 改变应用内的语言设置
  changeLang(_this) {
    const langs = i18n.langs
    const nameArray = []
    langs.forEach(ele => nameArray.push(ele.name))
    wx.showActionSheet({
      itemList: nameArray,
      success: (e) => {
        const lang = langs[e.tapIndex]
        wx.setStorageSync('Language', lang.code)
        _this.setData({
          language: i18n.getLanguage(),
          $t: i18n.$t(),
        })
        this.setTabBarLanguage()
      }
    })
  },

  // 设置TabBar的语言
  setTabBarLanguage() {
    i18n.setTabBarLanguage()
  },

  // 全局数据
  globalData: {
    isConnected: true  // 网络连接状态
  }
})
