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

var RESULT_HUE = 315;
/**
 * 结果转换
 */

Blockly.Blocks['result_to_map_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("趋势结果转换")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(RESULT_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/result-to-map-list');
  }
};

Blockly.Blocks['result_trend_fill_null'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("趋势结果填充null")
    this.appendDummyInput()
        .appendField("趋势结果对象")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("size")
        .appendField("趋势列表长度（不足该长度补null）")
        .setCheck(['Number','Reference']);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(RESULT_HUE);
    this.setTooltip('趋势结果填充null');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/result-trend-fill-null');
  }
};

Blockly.Blocks['result_return'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("结果返回")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.setPreviousStatement(true, null);
    this.setColour(RESULT_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/result-return');
  }
};

Blockly.Blocks['result_return_empty'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("空结果返回")
        .appendField(new Blockly.FieldDropdown([["空列表", "emptylist"], ["空Map", "emptymap"], ["空分页结果", "emptypage"], ["空对象(null)", "null"], ["当前系统日期(yyyy-MM-dd)", "currentdate"]]), "emptyType");
    this.setPreviousStatement(true, null);
    this.setColour(RESULT_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/result-return-empty');
  }
};

Blockly.Blocks['result_excel_download'] = {
  init: function() {
    this.appendStatementInput("sheets")
        .setCheck('excel')
        .appendField("Excel下载");
    this.appendValueInput("title")
        .setCheck(['String','Reference'])
        .appendField("Excel文件名");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setColour(RESULT_HUE);
    this.setTooltip('Excel下载，可以添加多个Sheet');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/result-excel-download');
  }
};

/**
 * Excel Sheet内容
 */
Blockly.Blocks['result_sheet_content'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Excel Sheet内容");
    this.appendValueInput("sheet")
        .setCheck(['String','Reference'])
        .appendField("Sheet名称");
    this.appendValueInput("desc")
        .setCheck(['String','Reference'])
        .appendField("说明");
    this.appendValueInput("linkText")
        .setCheck(['String','Reference'])
        .appendField("链接文案");
    this.appendValueInput("linkAddress")
        .setCheck(['String','Reference'])
        .appendField("链接地址");
    this.appendValueInput("hint")
        .setCheck(['List','String','Reference'])
        .appendField("提示信息");
    this.appendDummyInput()
        .appendField("结果集（需要是列表类型）")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("indexCode")
        .setCheck(['List'])
        .appendField("指标序列（具有顺序）");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(RESULT_HUE);
    this.setTooltip('Excel下载，其中每个指标格式为：英文名^中文名^格式化串，格式化串可以不提供，详情查看Help文档');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/result-sheet-content');
  },


  onchange: function(e) {
    var legal = false;
    var block = this.getSurroundParent();
    if (block && this.EXCEL_TYPES.indexOf(block.type) != -1) {
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setDisabled(false);
      }
    } else {
      this.setWarningText('Excel Sheet只能放在Excel下载中');
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setDisabled(true);
      }
    }
  },

  EXCEL_TYPES: ['result_excel_download']

};


Blockly.Blocks['result_card_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("页面卡片返回");
    this.setPreviousStatement(true, null);
    this.setColour(RESULT_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/result-card-get');
  }
};