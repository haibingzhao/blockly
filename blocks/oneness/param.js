/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Unit test blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';
var PARAM_HUE = 345;
/**
 * 参数输入处理
 */
Blockly.Blocks['param_input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("输入参数定义");
    this.appendValueInput("param")
        .setCheck("List")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("入参");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "ParamInput");
    this.setColour(PARAM_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-input');
  }
};


/**处理默认值的回调函数*/

Blockly.Blocks['param_string'] = {
  init: function() {
    this.appendDummyInput('param')
        .appendField("String")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault")
    this.setOutput(true, "String");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建String参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-string');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_long'] = {
  init: function() {
    this.appendDummyInput('param')
        .appendField("Long")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Number");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Long参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-long');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_integer'] = {
  init: function() {
    this.appendDummyInput('param')
        .appendField("Integer")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Number");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Integer参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-integer');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_boolean'] = {
  init: function() {
    this.appendDummyInput('param')
        .appendField("Boolean")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Boolean");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Boolean参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-boolean');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_double'] = {
  init: function() {
    this.appendDummyInput('param')
        .appendField("Double")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Number");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Double参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-double');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};


Blockly.Blocks['param_device'] = {
  init: function() {
    this.appendDummyInput('param')
        .appendField("Device")
        .appendField(new Blockly.FieldVariable("device"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Device");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Device参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-device');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};


Blockly.Blocks['param_date'] = {
  init: function() {
    this.appendDummyInput('param')
        .appendField("Date")
        .appendField(new Blockly.FieldVariable("date"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Date");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Date参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-date');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_strings'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("String[]")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull");
    this.appendDummyInput('param')
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "String[]");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建String参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-strings');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_longs'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Long[]")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull");
    this.appendDummyInput('param')
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Long[]");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Long参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-longs');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_integers'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Integer[]")
        .appendField(new Blockly.FieldVariable("keyName"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull");
    this.appendDummyInput('param')
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Integer[]");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Integer参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-integers');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};


Blockly.Blocks['param_devices'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Device[]")
        .appendField(new Blockly.FieldVariable("devices"), "key")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull");
    this.appendDummyInput('param')
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "Device[]");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建Device参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-devices');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};



Blockly.Blocks['param_statdate'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("时间周期，结果赋予变量")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("Date Range")
        .appendField(new Blockly.FieldTextInput("dateRange"), "dateRange")
        .appendField("不验证结束时间")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "endDateNoVerify");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_LEFT)
        .appendField("Date Type")
        .appendField(new Blockly.FieldTextInput("dateType"), "dateType")
        .appendField("是否必传")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "dateTypeNotNull")
        .appendField("自定义校验时间范围")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.verify.bind(this)), "verify");
    this.setOutput(true, "DatePeriod");
    this.setColour(PARAM_HUE);
    this.setTooltip('创建时间周期参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-statdate');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var verify = (this.getFieldValue('verify') == 'TRUE');
    container.setAttribute('verify', verify);
    return container;
  },

  domToMutation: function(xmlElement) {
    var verify = (xmlElement.getAttribute('verify') == 'true');
    this.verify(verify);
  },

  verify: function(check){
    var input = this.getInput("verify");
    if(check && !input){
      this.appendDummyInput("verify")
        .appendField("日")
        .appendField(new Blockly.FieldTextInput("90"), "day")
        .appendField("，周")
        .appendField(new Blockly.FieldTextInput("24"), "week")
        .appendField("，月")
        .appendField("连续日")
        .appendField(new Blockly.FieldTextInput("30"), "rangeDay")
        .appendField("，连续周")
        .appendField(new Blockly.FieldTextInput("3"), "rangeWeek")
        .appendField("，连续月")
        .appendField(new Blockly.FieldTextInput("3"), "rangeMonth")
        .appendField("，季度")
        .appendField(new Blockly.FieldTextInput("8"), "quarter")
        .appendField("，年")
        .appendField(new Blockly.FieldTextInput("3"), "year");
      }else if(!check && input){
        this.removeInput("verify");
      }
  }

};

Blockly.Blocks['param_indexcode'] = {
  init: function() {
    this.appendDummyInput("param")
        .appendField("指标串")
        .appendField(new Blockly.FieldVariable("indexCode"), "indexCode")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "String[]");
    this.setColour(PARAM_HUE);
    this.setTooltip('解析需要的指标，多个指标用逗号分隔，解析后返回String数组');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-indexcode');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_indexcode_extra'] = {
  init: function() {
    this.appendDummyInput("param")
        .appendField("指标串")
        .appendField(new Blockly.FieldVariable("indexCode"), "indexCode")
        .appendField("额外必传指标")
        .appendField(new Blockly.FieldTextInput("extraFields"),"extraFields")
        .appendField("默认值")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.hasDefault.bind(this)), "hasDefault");
    this.setOutput(true, "String[]");
    this.setColour(PARAM_HUE);
    this.setTooltip('解析需要的指标，多个指标用逗号分隔，额外指标表示所有请求都添加这些指标，解析后返回String数组');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-indexcode-extra');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasDefault = (this.getFieldValue('hasDefault') == 'TRUE');
    container.setAttribute('has_default', hasDefault);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasDefault = (xmlElement.getAttribute('has_default') == 'true');
    this.hasDefault(hasDefault);
  },

  hasDefault: function(hasDefault){
    if(hasDefault){
        if(!this.getField('defaultValue')){
            this.getInput("param")
                .appendField(new Blockly.FieldTextInput("defaultValue"), "defaultValue");
        }
    }else{
        if(this.getField('defaultValue')){
            this.getInput("param")
                .removeField("defaultValue");
        }
    }
  }
};

Blockly.Blocks['param_verify'] = {
  init: function() {
    var verifyType = [["取值范围", "range"], ["宝贝权限", "item"], ["类目权限", "cate"],
                ["品牌权限", "brand"], ["类目品牌权限", "cateBrand"]];
    var dropdown = new Blockly.FieldDropdown(verifyType, function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    this.appendDummyInput("verifyType")
        .appendField("参数合法性校验（单店版）")
        .appendField(dropdown,"verifyType");
    this.setOutput(true, null);
    this.setColour(PARAM_HUE);
    this.setTooltip('参数验证，验证参数的合法性');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/param-verify');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var verifyType = this.getFieldValue('verifyType');
    container.setAttribute('verify_type', verifyType);
    return container;
  },

  domToMutation: function(xmlElement) {
    var verifyType = xmlElement.getAttribute('verify_type');
    this.updateShape_(verifyType);
  },

  updateShape_: function(verifyType) {
    this.removeInput("verifyParam",true);
    this.removeInput("cateFlag",true);
    if(verifyType === 'range'){
        this.appendValueInput('verifyParam')
            .appendField("取值范围(多个以逗号隔开)")
            .appendField(new Blockly.FieldTextInput("1,2,3"), "range");
    }else if(verifyType === 'item'){
        this.appendDummyInput('verifyParam')
            .appendField("宝贝ID")
            .appendField(new Blockly.FieldVariable("itemId"), "itemId")
            .appendField("是否必传")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "notNull");
    }else if(verifyType === 'cate'){
        this.appendDummyInput('verifyParam')
            .appendField("类目ID")
            .appendField(new Blockly.FieldVariable("cateId"), "cateId");
        this.appendValueInput("cateFlag")
            .setCheck(['Number','Reference'])
            .appendField("类目层级");
    }else if(verifyType === 'brand'){
        this.appendDummyInput('verifyParam')
            .appendField("品牌ID")
            .appendField(new Blockly.FieldVariable("brandId"), "brandId");
    }else if(verifyType === 'cateBrand'){
        this.appendDummyInput('verifyParam')
            .appendField("品牌ID")
            .appendField(new Blockly.FieldVariable("brandId"), "brandId")
            .appendField("类目ID")
            .appendField(new Blockly.FieldVariable("cateId"), "cateId")
        this.appendValueInput("cateFlag")
            .setCheck(['Number','Reference'])
            .appendField("类目层级");
    }
  }
};
