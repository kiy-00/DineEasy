## ER图解释



### 表结构字段含义

1. **mall_order（商城订单表）**
   - **mall_order_id (PK)**：商城订单的唯一标识符
   - **order_date**：订单日期
   - **total_amount**：订单总金额
2. **mall_inventory（商城库存表）**
   - **inventory_id (PK)**：库存项的唯一标识符
   - **stock**：库存数量
3. **commodity（商城商品表）**
   - **commodity_id (PK)**：商品的唯一标识符
   - **commodity_name**：商品名称
   - **price**：商品价格
   - **description**：商品描述
4. **card（会员卡表）**
   - **card_id (PK)**：会员卡的唯一标识符
   - **balance**：会员卡余额
   - **experience**：会员卡经验值
5. **coupon（优惠券表）**
   - **coupon_id (PK)**：优惠券的唯一标识符
   - **discount_amount**：优惠金额
   - **discount_percentage**：折扣百分比
   - **expiration_date**：优惠券到期日期
   - **terms_and_conditions**：优惠券的条款和条件
6. **promotion（促销活动表）**
   - **promotion_id (PK)**：促销活动的唯一标识符
   - **promotion_name**：活动名称
   - **start_time**：活动开始时间
   - **end_time**：活动结束时间
7. **shop（店铺表）**
   - **shop_id (PK)**：店铺的唯一标识符
   - **shop_name**：店铺名称
   - **phone_number**：联系电话
   - **address**：店铺地址
8. **order（餐饮订单表）**
   - **order_id (PK)**：订单的唯一标识符
   - **order_type**：订单类型（堂食或外卖）
   - **order_date**：订单日期
   - **total_amount**：订单总金额
9. **menu_item（菜单项/餐饮商品表）**
   - **menu_item_id (PK)**：菜单项的唯一标识符
   - **name**：菜单项名称
   - **description**：菜单项描述
   - **price**：菜单项价格
10. **option_value（选项值表）**
    - **option_value_id (PK)**：选项值的唯一标识符
    - **value_name**：选项值名称
    - **extra_cost**：额外费用
11. **user（用户信息表）**
    * **user_id（PK）**：用户的唯一标识
    * **user_name**：用户的名称
    * **password**：用户的密码
    * **membership_level**：用户的会员等级

### 关系的含义

1. **buy（用户购买商城订单的关系）**
   - **用户与商城订单**之间的关系：一个用户可购买多个商城订单，但每个商城订单只能属于一个用户。
   - **mall_order <-> user**：1对1到多的关系
2. **remain（商城商品的库存关系）**
   - **商城商品与库存**之间的关系：每个商品只有一个库存条目，每个库存条目属于一个商品。
   - **commodity <-> mall_inventory**：1对1的关系
3. **list（商城订单中商品的关系）**
   - **商城订单与商品**之间的关系：一个订单可包含多个商品，一个商品可在多个订单中出现。
   - **mall_order <-> commodity**：多对多的关系
4. **possess（用户持有会员卡的关系）**
   - **用户与会员卡**之间的关系：一个用户可以拥有一张或多张会员卡，但每张会员卡只能属于一个用户。
   - **user <-> card**：1对多的关系
5. **use_coupon（用户使用优惠券的关系）**
   - **用户与优惠券**之间的关系：一个用户可拥有多个优惠券，但每张优惠券只能属于一个用户。
   - **user <-> coupon**：1对多的关系
6. **involve（促销活动与商品的关系）**
   - **促销活动与商品**之间的关系：一个促销活动可包含多个商品，一个商品也可参加多个促销活动。
   - **promotion <-> menu_item**：多对多的关系
7. **belong（订单与店铺的关系）**
   - **订单与店铺**之间的关系：一个店铺可包含多个订单，但每个订单只能属于一个店铺。
   - **order <-> shop**：1对多的关系
8. **contains（订单与餐饮商品的关系）**
   - **订单与餐饮商品**之间的关系：一个订单可包含多个餐饮商品，一个餐饮商品可在多个订单中出现。
   - **order <-> menu_item**：多对多的关系
9. **option（菜单项/餐饮商品与选项值的关系）**
   - **菜单项/餐饮商品与选项值**之间的关系：一个菜单项可包含多个选项值，但每个选项值只能属于一个菜单项。
   - **menu_item <-> option_value**：1对多的关系

### 关系图总结

- **实体**：用户、店铺、订单、商城订单、会员卡、优惠券、促销活动、菜单项、选项值、库存

- 关系

  ：

  - 用户购买商城订单
  - 商品库存管理
  - 订单商品列表
  - 用户持有会员卡
  - 用户使用优惠券
  - 促销活动与商品
  - 店铺与订单
  - 订单与菜单项
  - 菜单项与选项值