// config.js
module.exports = {
  // 小程序的子域名，用于构建API请求的基础URL
  subDomain: "your-subdomain",

  // 可能需要的其他配置项
  mallName: "DineEasy", // 商城名称
  mapPos: { // 商城地图位置
    latitude: 23.099994,
    longitude: 113.324520
  },
  order_hx_uids: ['uid1', 'uid2'], // 核销员用户ID列表
  subscribe_ids: ['subid1', 'subid2'], // 订阅消息ID列表
  share_profile: "欢迎光临我们的点餐小程序！", // 分享描述信息
  zxdz: true, // 是否支持自提地址
  admin_uids: ['admin1', 'admin2'], // 管理员用户ID列表
  shop_goods_split: true, // 是否支持商品拆分显示
  QQ_MAP_KEY: "YOUR_QQ_MAP_API_KEY", // 腾讯地图API密钥
  shop_join_open: true, // 是否开放商家加盟
  create_order_select_time: false, // 是否在创建订单时选择时间
  packaging_fee: "0.00", // 打包费用
  customerServiceChatCorpId: "your-corp-id", // 客服企业微信CorpId
  customerServiceChatUrl: "https://your-customer-service-url", // 客服聊天页面URL

  // 其他可能需要的配置
  version: "1.0.0", // 小程序版本号
  s3Bucket: "your-bucket-name", // S3存储桶名，用于文件上传
};

