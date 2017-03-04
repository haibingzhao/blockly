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

var INDEXS_HUE = 125;
/**
 * 指标数据按时间补全
 */
Blockly.Blocks['index_fill'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("数据补全");
    this.appendDummyInput()
        .appendField("查询结果列表")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("补全参数是否时间周期类型")
        .appendField(new Blockly.FieldCheckbox("TRUE",this.updateShape_.bind(this)), "isDatePeriod");
    this.appendDummyInput('fillParam')
        .appendField("补全参数")
        .appendField(new Blockly.FieldVariable("datePeriod"), "fillParam");
    this.appendDummyInput('method')
        .appendField("数据补全操作")
        .appendField(new Blockly.FieldDropdown([["只进行数据补全", "listAndFill"], ["数据补全并计算指标", "listAndFillCputIndx"], ["数据补全并计算指标后并转成趋势结果", "listAndFillCputCvtIndx"]]), "method");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true,  "IndexFill");
    this.setColour(INDEXS_HUE);
    this.setTooltip('对指标数据按照时间补全');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-fill');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isDatePeriod = (this.getFieldValue('isDatePeriod') == 'TRUE');
    container.setAttribute('is_date_period', isDatePeriod);
    var trendSize = (this.getFieldValue('trendSize') == 'TRUE');
    container.setAttribute('trend_size', trendSize);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isDatePeriod = (xmlElement.getAttribute('is_date_period') == 'true');
    var trendSize = (xmlElement.getAttribute('trend_size') == 'true');
    this.updateShape_(isDatePeriod, trendSize);
  },

  updateShape_: function(isDatePeriod, isTrendSize) {
    // Add or remove a Value Input.
    var paramName = 'fillParam';
    var fillParamInput = this.getInput(paramName);
    var trendSizeField = this.getField("trendSize");
    if(this.getField("textTrendSize")) fillParamInput.removeField("textTrendSize");
    if(trendSizeField) fillParamInput.removeField("trendSize");
    if(this.getField(paramName)) fillParamInput.removeField(paramName);
    if(this.getField('idAliasText'))fillParamInput.removeField('idAliasText');
    if(this.getField('idAlias'))fillParamInput.removeField('idAlias');
    if (isDatePeriod) {
        fillParamInput.appendField(new Blockly.FieldVariable("datePeriod"), paramName);
        fillParamInput.appendField("自定义配置趋势天数","textTrendSize");
        fillParamInput.appendField(new Blockly.FieldCheckbox(isTrendSize?"TRUE":"FALSE",this.handlerTrendSize.bind(this)), "trendSize");
        if(isTrendSize && !this.getInput("trendSize")){
            this.appendDummyInput("trendSize")
                .appendField("日")
                .appendField(new Blockly.FieldTextInput("30"), "day")
                .appendField("，周")
                .appendField(new Blockly.FieldTextInput("24"), "week")
                .appendField("，月")
                .appendField(new Blockly.FieldTextInput("13"), "month")
                .appendField("，季度")
                .appendField(new Blockly.FieldTextInput("8"), "quarter")
                .appendField("，年")
                .appendField(new Blockly.FieldTextInput("3"), "year");
        }else if(!isTrendSize && this.getInput("trendSize")){
            this.removeInput("trendSize",true);
        }
        this.removeInput("method");
        this.appendDummyInput('method')
            .appendField("数据补全操作")
            .appendField(new Blockly.FieldDropdown([["只进行数据补全", "listAndFill"], ["数据补全并计算指标", "listAndFillCputIndx"], ["数据补全并计算指标后并转成趋势结果", "listAndFillCputCvtIndx"]]), "method");

    }else{
        this.removeInput("trendSize",true);
        fillParamInput.appendField(new Blockly.FieldVariable("idList"), paramName);
        fillParamInput.appendField("数据补全的ID别名",'idAliasText');
        fillParamInput.appendField(new Blockly.FieldTextInput("idAlias"), 'idAlias');
        this.removeInput("method");
        this.appendDummyInput('method')
            .appendField("数据补全操作")
            .appendField(new Blockly.FieldDropdown([["只进行数据补全", "listAndFill"], ["数据补全并计算指标", "listAndFillCputIndx"],  ["数据补全并计算指标后并转成趋势结果", "listAndFillCputCvtIndx"]]), "method");
    }
  },

  handlerTrendSize: function(check){
    this.updateShape_(true ,check);
  }
};

/**
 * 指标数据补全，兼容累计的数据指标
 */
Blockly.Blocks['index_fill_accumulate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("累计指标数据补全（兼容非累计指标）");
    this.appendDummyInput()
        .appendField("查询结果列表")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("补全参数")
        .appendField(new Blockly.FieldVariable("idList"), 'fillParam')
        .appendField("数据补全的ID别名")
        .appendField(new Blockly.FieldTextInput("idAlias"), 'idAlias');
    this.appendValueInput("notAccumulates")
        .setCheck(['List'])
        .appendField("非累计指标别名列表");
    this.appendDummyInput('method')
        .appendField("数据补全操作")
        .appendField(new Blockly.FieldDropdown([["只进行数据补全", "listAndFill"], ["数据补全并计算指标", "listAndFillCputIndx"], ["数据补全并计算指标后并转成趋势结果", "listAndFillCputCvtIndx"]]), "method");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true,  "IndexFill");
    this.setColour(INDEXS_HUE);
    this.setTooltip('对指标数据按照时间补全');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-fill-accumulate');
  }
}
/**
 * 衍生指标计算
 */

Blockly.Blocks['index_cput'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("衍生指标计算");
    this.appendDummyInput()
        .appendField("查询结果列表")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true,  "IndexCput");
    this.setColour(INDEXS_HUE);
    this.setTooltip('计算衍生指标');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-cput');
  }
};


/**
 * 获取指标名称
 */
Blockly.Blocks['index_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取指标接口，结果赋予变量")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("是否趋势(对最近7天和30天做过特殊处理)")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isTrend");
    this.appendDummyInput()
        .appendField("应用模块")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");
    this.appendValueInput("interfaceName")
        .setCheck(['String','Reference'])
        .appendField("接口名称");

    this.appendDummyInput("hasIndexs")
        .appendField("是否返回给定指标")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerHasIndexs.bind(this)), "hasIndexs");
    this.appendDummyInput("hasTb")
        .appendField("是否区分淘宝天猫")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerHasTb.bind(this)), "hasTb");
    this.appendDummyInput("hasPeriod")
        .appendField("是否区分时间周期")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerHasPeriod.bind(this)), "hasPeriod");
    this.appendDummyInput("hasDevice")
        .appendField("是否区分终端类型")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerHasDevice.bind(this)), "hasDevice")
    this.appendDummyInput("hasOrderBy")
        .appendField("是否验证排序字段存在")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerHasOrderBy.bind(this)), "hasOrderBy");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true,  "IndexGet");
    this.setColour(INDEXS_HUE);
    this.setTooltip('根据接口名称获取所有接口下指标');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-get');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasIndexs = (this.getFieldValue('hasIndexs') == 'TRUE');
    container.setAttribute('has_indexs', hasIndexs);
    var hasTb = (this.getFieldValue('hasTb') == 'TRUE');
    container.setAttribute('has_tb', hasTb);
    var hasPeriod = (this.getFieldValue('hasPeriod') == 'TRUE');
    container.setAttribute('has_period', hasPeriod);
    var hasDevice = (this.getFieldValue('hasDevice') == 'TRUE');
    container.setAttribute('has_device', hasDevice);
    var hasOrderBy = (this.getFieldValue('hasOrderBy') == 'TRUE');
    container.setAttribute('has_orderby', hasOrderBy);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasIndexs = (xmlElement.getAttribute('has_indexs') == 'true');
    var hasTb = (xmlElement.getAttribute('has_tb') == 'true');
    var hasPeriod = (xmlElement.getAttribute('has_period') == 'true');
    var hasDevice = (xmlElement.getAttribute('has_device') == 'true');
    var hasOrderBy = (xmlElement.getAttribute('has_orderby') == 'true');
    this.updateShape_(hasIndexs,hasTb,hasPeriod,hasDevice,hasOrderBy);
  },

  updateShape_: function(hasIndexs,hasTb,hasPeriod,hasDevice,hasOrderBy) {
    this.addRemoveField(hasIndexs,"hasIndexs","indexCode");
    this.addRemoveField(hasTb,"hasTb","isTb");
    this.addRemoveField(hasPeriod,"hasPeriod","datePeriod");
    this.addRemoveField(hasDevice,"hasDevice","deviceType");
    this.addRemoveField(hasOrderBy,"hasOrderBy","orderBy");
  },

  addRemoveField: function(isSelected,selectedInputName,selectedFieldName){
    // Add or remove a Field.
    var hasInput = this.getInput(selectedInputName);
    var fieldExists = this.getField(selectedFieldName);
    if (isSelected) {
      if (!fieldExists) {
        hasInput
            .appendField(new Blockly.FieldVariable(selectedFieldName=='deviceType'?'device':selectedFieldName), selectedFieldName);
      }
    } else if (fieldExists) {
      hasInput.removeField(selectedFieldName);
    }
  },
  handlerHasIndexs: function(isSelected) {
    this.addRemoveField(isSelected,"hasIndexs","indexCode");
  },
  handlerHasTb: function(isSelected) {
    this.addRemoveField(isSelected,"hasTb","isTb");
  },
  handlerHasPeriod: function(isSelected) {
    this.addRemoveField(isSelected,"hasPeriod","datePeriod");
  },
  handlerHasDevice: function(isSelected) {
    this.addRemoveField(isSelected,"hasDevice","deviceType");
  },
  handlerHasOrderBy: function(isSelected) {
    this.addRemoveField(isSelected,"hasOrderBy","orderBy");
  }
};

/**
 * 合并我的数据和行业数据
 */
Blockly.Blocks['index_merge_rival'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("将行业平均（优秀）数据合并到我的数据中");
    this.appendDummyInput()
        .appendField("我的查询结果集")
        .appendField(new Blockly.FieldVariable("myQueryResult"), "myQueryResult");
    this.appendDummyInput()
        .appendField("行业查询结果集")
        .appendField(new Blockly.FieldVariable("rivalQueryResult"), "rivalQueryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("合并内容")
        .appendField(new Blockly.FieldDropdown([["合并行业平均数据", "rivalAvg"], ["合并行业优秀数据", "rivalGood"]]), "rivalType");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "MergeRival");
    this.setColour(INDEXS_HUE);
    this.setTooltip('合并我的数据和行业数据，要求我的数据和行业数据相同指标对应的别名是一样的，具有映射关系，并且查询结果都是单条数据');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-merge-rival');
  }
};

/**
 * 将其他数据合并到我的数据中
 */
Blockly.Blocks['index_merge_data_2_my'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("合并数据到我的数据集指标下");
    this.appendDummyInput()
        .appendField("我的查询结果集")
        .appendField(new Blockly.FieldVariable("myQueryResult"), "myQueryResult");
    this.appendDummyInput()
        .appendField("待合并数据集")
        .appendField(new Blockly.FieldVariable("mergerQueryResult"), "mergerQueryResult");
    this.appendDummyInput()
        .appendField("是否整体下沉一层合并(否则为同名指标合并)")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isSank");
    this.appendDummyInput()
        .appendField("合并后的属性Key(最终展示给前端)")
        .appendField(new Blockly.FieldTextInput("dataKey"), "dataKey");
    var isMultiLine = new Blockly.FieldCheckbox("FALSE", function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    this.appendDummyInput()
        .appendField("查询结果集是否是多条数据")
        .appendField(isMultiLine, "isMultiLine");;
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "MergeRival");
    this.setColour(INDEXS_HUE);
    this.setTooltip('合并我的数据和行业数据，如果单个指标合并要求我的数据和行业数据相同指标对应的别名是一样的，具有映射关系');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-merge-data-2-my');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isMultiLineInput = (this.getFieldValue('isMultiLine') == 'TRUE');
    container.setAttribute('is_multiline', isMultiLineInput);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isMultiLineInput = (xmlElement.getAttribute('is_multiline') == 'true');
    this.updateShape_(isMultiLineInput);
  },

  updateShape_: function(isMultiLineInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('indexAlias');
    if (isMultiLineInput) {
      if (!inputExists) {
        this.appendDummyInput("indexAlias")
            .appendField("唯一确定一条记录的指标别名")
            .appendField(new Blockly.FieldTextInput("input index alias"), "indexAlias");
      }
    } else if (inputExists) {
      this.removeInput("indexAlias",true);
    }
  }
};

/**
 * 将其他数据和我的数据进行合并
 */
Blockly.Blocks['index_merge_data'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("合并数据集，结果赋予我的查询结果集");
    this.appendDummyInput()
        .appendField("合并双方数据是否下沉一层")
        .appendField(new Blockly.FieldCheckbox("TRUE",this.isSank_.bind(this)), "isSank");
    this.appendDummyInput('myQueryResult')
        .appendField("我的查询结果集")
        .appendField(new Blockly.FieldVariable("myQueryResult"), "myQueryResult");
    this.appendDummyInput('mergerQueryResult')
        .appendField("待合并数据集")
        .appendField(new Blockly.FieldVariable("mergerQueryResult"), "mergerQueryResult");
    var isMultiLine = new Blockly.FieldCheckbox("FALSE", function(option) {
      this.sourceBlock_.isMultiLine_(option);
    });
    this.appendDummyInput()
        .appendField("查询结果集是否是多条数据")
        .appendField(isMultiLine, "isMultiLine");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "MergeRival");
    this.setColour(INDEXS_HUE);
    this.setTooltip('合并我的数据和行业数据，要求我的数据和行业数据相同指标对应的别名是一样的，具有映射关系，并且查询结果都是单条数据');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-merge-data');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isMultiLine = (this.getFieldValue('isMultiLine') == 'TRUE');
    container.setAttribute('is_multiline', isMultiLine);
    var isSank = (this.getFieldValue('isSank') == 'TRUE');
    container.setAttribute('is_sank', isSank);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isMultiLine = (xmlElement.getAttribute('is_multiline') == 'true');
    this.isMultiLine_(isMultiLine);
    var isSank = (xmlElement.getAttribute('is_sank') == 'true');
    this.isSank_(isSank);
  },
  isSank_: function(isSank){
    // Add or remove a Value Input.
    var fieldExists = this.getFieldValue('myKey');
    if (isSank) {
      if (!fieldExists) {
        this.getInput("myQueryResult")
            .appendField(new Blockly.FieldTextInput("input key stand for this result"), "myKey");
        this.getInput("mergerQueryResult")
            .appendField(new Blockly.FieldTextInput("input key stand for this result"), "mergerKey");
      }
    } else if (fieldExists) {
        this.getInput("myQueryResult")
            .removeField("myKey");
        this.getInput("mergerQueryResult")
            .removeField("mergerKey");
    }
  },
  isMultiLine_: function(isMultiLine) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('indexAlias');
    if (isMultiLine) {
      if (!inputExists) {
        this.appendDummyInput("indexAlias")
            .appendField("唯一确定一条记录的指标别名")
            .appendField(new Blockly.FieldTextInput("input index alias"), "indexAlias");
      }
    } else if (inputExists) {
      this.removeInput("indexAlias",true);
    }
  }
};


/**
 * 计算指标环比和同比
 */
Blockly.Blocks['index_cput_crc_and_cqc'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("计算指标环比（同比），结果赋予变量")
        .appendField(new Blockly.FieldVariable("result"), "result");
    this.appendDummyInput()
        .appendField("查询结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("时间周期")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod");
    this.appendDummyInput()
        .appendField("计算范围")
        .appendField(new Blockly.FieldDropdown([["计算较上周期变化率", "period"],["计算环比", "cycle"], ["计算同比", "sync"], ["计算环比和同比", "cycle_sync"]]), "method");
    var isMultiLine = new Blockly.FieldCheckbox("FALSE", function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    this.appendDummyInput()
        .appendField("计算后结果集是否是多条数据")
        .appendField(isMultiLine, "isMultiLine");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SelfRatio");
    this.setColour(INDEXS_HUE);
    this.setTooltip('计算指标同比或者环比');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-cput-crc-and-cqc');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isMultiLineInput = (this.getFieldValue('isMultiLine') == 'TRUE');
    container.setAttribute('is_single_line_input', !isMultiLineInput);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isMultiLineInput = (xmlElement.getAttribute('is_single_line_input') != 'true');
    this.updateShape_(isMultiLineInput);
  },

  updateShape_: function(isMultiLineInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('indexAlias');
    if (isMultiLineInput) {
      if (!inputExists) {
        this.appendDummyInput("indexAlias")
            .appendField("唯一确定一条记录的指标别名")
            .appendField(new Blockly.FieldTextInput("input index alias"), "indexAlias");
      }
    } else if (inputExists) {
      this.removeInput("indexAlias",true);
    }
  }
};

/**
 * 计算指标变化率
 */
Blockly.Blocks['index_cput_rate_change'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("计算指标变化率（同环比），结果赋予变量")
        .appendField(new Blockly.FieldVariable("result"), "result");
    this.appendDummyInput()
        .appendField("查询结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("时间列表")
        .appendField(new Blockly.FieldVariable("dateList"), "dateList");
    this.appendDummyInput()
        .appendField("自定义变化率名称")
        .appendField(new Blockly.FieldTextInput("rateChange"), "rateChangeName");
    var isMultiLine = new Blockly.FieldCheckbox("FALSE", function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    this.appendDummyInput()
        .appendField("计算后结果集是否是多条数据")
        .appendField(isMultiLine, "isMultiLine");
    this.appendValueInput('stepSize')
        .appendField("变化率步长")
        .setCheck(['Number','DaySize']);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SelfRatio");
    this.setColour(INDEXS_HUE);
    this.setTooltip('计算指标变化率（同比或者环比）');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-cput-rate-change');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isMultiLineInput = (this.getFieldValue('isMultiLine') == 'TRUE');
    container.setAttribute('is_single_line_input', !isMultiLineInput);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isMultiLineInput = (xmlElement.getAttribute('is_single_line_input') != 'true');
    this.updateShape_(isMultiLineInput);
  },

  updateShape_: function(isMultiLineInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('indexAlias');
    if (isMultiLineInput) {
      this.removeInput("stepSize",true);
      if (!inputExists) {
        this.appendDummyInput("indexAlias")
            .appendField("唯一确定一条记录的指标别名")
            .appendField(new Blockly.FieldTextInput("input index alias"), "indexAlias");
      }
    } else if (inputExists) {
      this.removeInput("indexAlias",true);
      this.appendValueInput('stepSize')
        .appendField("变化率步长")
        .setCheck(['Number','DaySize']);
    }
  }
};

/**
 * 计算指标占比(占比的分母是查询列表对应列的总和，计算每一列占总和的占比)
 */
Blockly.Blocks['index_cput_self_ratio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("计算指标占比（每列占列总和的占比）");
    this.appendDummyInput()
        .appendField("查询结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SelfRatio");
    this.setColour(INDEXS_HUE);
    this.setTooltip('计算指标占比(占比的分母是查询列表对应列的总和，计算每一列占总和的占比)');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-cput-self-ratio');
  }
};


/**
 * 计算指标占比(占比的分母是给定的值)
 */
Blockly.Blocks['index_cput_ratio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("计算指标占比（每列占给定值的比）");
    this.appendDummyInput()
        .appendField("查询结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("占比的分母")
        .appendField(new Blockly.FieldVariable("sumValue"), "sumValue");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "Ratio");
    this.setColour(INDEXS_HUE);
    this.setTooltip('计算指标占比(占比的分母是给定的值)');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-cput-ratio');
  }
};

/**
 * 获取查询结果的某个指标值
 */
Blockly.Blocks['index_col_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取查询结果的某个指标值或者值列表");
    this.appendDummyInput()
        .appendField("查询结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("指标别名")
        .appendField(new Blockly.FieldTextInput("indexAlias"), "indexAlias");
    this.setOutput(true, null);
    this.setColour(INDEXS_HUE);
    this.setTooltip('获取查询结果的指标值或者指标值列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-col-get');
  }
};

/**
 * 获取查询结果的某个指标值(通过指标别名引用获取)
 */
Blockly.Blocks['index_col_get_by_ref'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取查询结果的某个指标值或者值列表");
    this.appendDummyInput()
        .appendField("查询结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("indexAlias")
        .setCheck(['Reference','String'])
        .appendField("指标别名")
    this.setOutput(true, null);
    this.setColour(INDEXS_HUE);
    this.setTooltip('获取查询结果的指标值或者指标值列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-col-get-by-ref');
  }
};


/**
 * 获取指标别名对应的指标英文名
 */
Blockly.Blocks['index_en_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取指标别名对应的指标英文名");
    this.appendValueInput("indexAlias")
        .setCheck(['String','Reference'])
        .appendField("指标别名");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.setOutput(true, 'String');
    this.setColour(INDEXS_HUE);
    this.setInputsInline(false);
    this.setTooltip('获取指标别名对应的指标英文名');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-en-get');
  }
};
/**
 * 通过分组过滤出一批指标
 */
Blockly.Blocks['index_filtered_by_group'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("通过分组过滤出一批指标，赋予变量")
        .appendField(new Blockly.FieldVariable("groupIndexs"), "groupIndexs");
    this.appendDummyInput()
        .appendField("指标全集")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendValueInput("groupName")
        .setCheck(['String','Reference'])
        .appendField("分组名称");
    this.appendDummyInput()
        .appendField("是否包括无分组指标")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "containsNoGroup");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true,  "IndexFilter");
    this.setColour(INDEXS_HUE);
    this.setTooltip('通过分组过滤出一批指标');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-filtered-by-group');
  }
};

/**
 * 判断指标或者指标数组是否全部在指标全集或者某个分组下
 */
Blockly.Blocks['index_is_in_group'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("指标或者指标数组是否全部在某个分组下");
    this.appendDummyInput()
        .appendField("指标全集")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendValueInput("indexsBeJudged")
        .setCheck(['String','Reference','List'])
        .appendField("待判断的指标（或指标集合）");
    this.appendDummyInput()
        .appendField("是否判断在某个分组下")
        .appendField(new Blockly.FieldCheckbox("TRUE",this.isInGroup.bind(this)), "isInGroup");
    this.setOutput(true, 'Boolean');
    this.setColour(INDEXS_HUE);
    this.setTooltip('判断指标(多个指标以逗号隔开)或者指标数组是否全部在某个分组下，如果是无分组指标那么属于任何分组下');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-is-in-group');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isInGroup = (this.getFieldValue('isInGroup') == 'TRUE');
    container.setAttribute('is_in_group', isInGroup);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isInGroup = (xmlElement.getAttribute('is_in_group') == 'true');
    this.isInGroup(isInGroup);
  },

  isInGroup: function(isInGroup){
    // Add or remove a Value Input.
    var inputExists = this.getInput('groupName');
    if (isInGroup) {
      if (!inputExists) {
        this.appendValueInput('groupName')
            .setCheck(['String','Reference'])
            .appendField("分组名称");
      }
    } else if (inputExists) {
        this.removeInput('groupName',true);
    }
  },
};

/**
 * 合并数据集对应的指标和
 */
Blockly.Blocks['index_add_merge'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("合并数据（相同指标相加）到我的查询结果集下");
    this.appendDummyInput()
        .appendField("我的查询结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("待合并数据集")
        .appendField(new Blockly.FieldVariable("mergedResult"), "mergedResult");
    var isMultiLine = new Blockly.FieldCheckbox("FALSE", function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    var isMultiLine = new Blockly.FieldCheckbox("FALSE", function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    this.appendValueInput('excluded')
        .setCheck(['String','Reference'])
        .appendField("不参与计算的指标（多个用英文逗号隔开）");
    this.appendDummyInput()
        .appendField("结果集是否是多条数据")
        .appendField(isMultiLine, "isMultiLine");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "MergeRival");
    this.setColour(INDEXS_HUE);
    this.setTooltip('合并数据到我的数据集下，相同的指标执行加法算法');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/index-add-merge');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isMultiLineInput = (this.getFieldValue('isMultiLine') == 'TRUE');
    container.setAttribute('is_multiline', isMultiLineInput);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isMultiLineInput = (xmlElement.getAttribute('is_multiline') == 'true');
    this.updateShape_(isMultiLineInput);
  },

  updateShape_: function(isMultiLineInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('indexAlias');
    if (isMultiLineInput) {
      if (!inputExists) {
        this.appendDummyInput("indexAlias")
            .appendField("唯一确定一条记录的指标别名")
            .appendField(new Blockly.FieldTextInput("input index alias"), "indexAlias");
      }
    } else if (inputExists) {
      this.removeInput("indexAlias",true);
    }
  }
};