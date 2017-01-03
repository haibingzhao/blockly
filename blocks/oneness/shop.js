'use strict';

var SHOP_HUE = 200;

Blockly.Blocks['shop_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("店铺模型");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "title")
        .appendField("标题")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "userId")
        .appendField("店铺ID")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "pictureUrl")
        .appendField("图片URL")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "shopUrl")
        .appendField("详情页URL");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("FALSE"), "b2CShop")
        .appendField("是否天猫店铺")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "category")
        .appendField("类目ID")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "starts")
        .appendField("创建时间")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "productCount")
        .appendField("在售商品数");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("FALSE"), "approveStatus")
        .appendField("店铺状态")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "address")
        .appendField("所在地")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "city")
        .appendField("所在城市")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "province")
        .appendField("所在省份");
    this.setInputsInline(false);
    this.setOutput(true, 'ShopModel');
    this.setColour(SHOP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/shop-model');
  }
};


Blockly.Blocks['shop_search'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("店铺搜索，结果赋予变量")
        .appendField(new Blockly.FieldVariable("shops"), "shops");
    this.appendValueInput("shopModel")
        .setCheck("ShopModel")
        .appendField("店铺模型");
    this.appendValueInput("keyword")
        .setCheck(['String','Reference'])
        .appendField("搜索关键词");
    this.appendValueInput("size")
        .setCheck(['String','Reference'])
        .appendField("搜索店铺数上限");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(SHOP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/shop-search');
  }
};

Blockly.Blocks['shop_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取单个（批量）店铺信息，结果赋予变量")
        .appendField(new Blockly.FieldVariable("shop"), "shop");
    this.appendValueInput("shopModel")
        .setCheck("ShopModel")
        .appendField("店铺模型");
    this.appendValueInput("userId")
        .setCheck(['Number','Reference'])
        .appendField("店铺ID（ID列表）");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(SHOP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/shop-get');
  }
};

Blockly.Blocks['shop_merge'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取店铺信息后合并到")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("中");
    this.appendValueInput("shopModel")
        .setCheck("ShopModel")
        .appendField("店铺模型");
    this.appendDummyInput()
        .appendField("合并ID(默认无需修改)")
        .appendField(new Blockly.FieldTextInput("userId"), "userId");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(SHOP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/shop-merge');
  }
};


Blockly.Blocks['shop_get_shopid_by_userid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("通过userId获取shopId，userId变量")
        .appendField(new Blockly.FieldVariable("userId"), "userId");
    this.setOutput(true, 'Number');
    this.setColour(SHOP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/shop-get-shopid-by-userid');
  }
};

Blockly.Blocks['shop_map_shopid_by_userid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("通过userId批量获取Map<userId,shopId>集合，结果赋予变量")
        .appendField(new Blockly.FieldVariable("user2ShopIds"), "user2ShopIds");
    this.appendValueInput("userIds")
        .setCheck(['List','Reference'])
        .appendField("userId列表");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(SHOP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/shop-map-shopid-by-userid');
  }
};