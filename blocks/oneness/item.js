'use strict';

var ITEM_HUE = 20;


Blockly.Blocks['item_model'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("宝贝模型");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("TRUE"), "title")
        .appendField("标题")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "itemId")
        .appendField("宝贝ID")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "picUrl")
        .appendField("图片URL")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "detailUrl")
        .appendField("详情页URL")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "userId")
        .appendField("店铺UserID");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("FALSE"), "categoryId")
        .appendField("类目ID")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "quantity")
        .appendField("库存")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "reservePrice")
        .appendField("发布价格")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "discountPrice")
        .appendField("促销价格")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isMallItem")
        .appendField("是否天猫商品");
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox("FALSE"), "startDate")
        .appendField("发布日期")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isOnline")
        .appendField("是否在线")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "city")
        .appendField("所在城市")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "prov")
        .appendField("所在省份")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "endDate")
        .appendField("结束日期");
    this.setInputsInline(false);
    this.setOutput(true, 'ItemModel');
    this.setColour(ITEM_HUE);
    this.setTooltip('宝贝模型获取，用于筛选宝贝属性');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/item-model');
  }
};

Blockly.Blocks['item_search'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("宝贝搜索，结果赋予变量")
        .appendField(new Blockly.FieldVariable("items"), "items");
    this.appendValueInput("itemModel")
        .setCheck("ItemModel")
        .appendField("宝贝模型");
    this.appendValueInput("keyword")
        .setCheck(['String','Reference'])
        .appendField("搜索关键词");
    this.appendValueInput("size")
        .setCheck(['Number','Reference'])
        .appendField("搜索宝贝数上限");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(ITEM_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/item-search');
  }
};

Blockly.Blocks['item_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取单个(批量)宝贝信息，结果赋予变量")
        .appendField(new Blockly.FieldVariable("item"), "item");
    this.appendValueInput("itemModel")
        .setCheck("ItemModel")
        .appendField("宝贝模型");
    this.appendValueInput("itemId")
        .setCheck(['Number','List','Reference'])
        .appendField("宝贝ID（ID列表）");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(ITEM_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/item-get');
  }
};

Blockly.Blocks['item_merge'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取宝贝信息后合并到")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("中");
    this.appendValueInput("itemModel")
        .setCheck("ItemModel")
        .appendField("宝贝模型");
    this.appendDummyInput()
        .appendField("合并ID(默认无需修改)")
        .appendField(new Blockly.FieldTextInput("itemId"), "itemId");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(ITEM_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/item-merge');
  }
};