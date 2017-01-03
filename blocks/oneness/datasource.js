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

/**
 * Common HSV hue for all blocks in this category.
 */
var DATASOURCE_HUE = 225;
/**查询SmartDQ，查询的结果根据指定的指标转成了相应的类型*/
Blockly.Blocks['datasource_select'] = {
  // Container for unit tests.
  init: function() {
    var methods = [["获取单条数据", "get"], ["获取多条数据", "list"], ["分页获取多条数据", "pageQuery"]];
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("smartdq"), "dbSpringName")
        .appendField("查询，结果赋予变量")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("sqlKeyValue")
        .setCheck(['String','Reference'])
        .appendField("SQL Key")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("条件参数");
    var dropdown = new Blockly.FieldDropdown(methods, function(option) {
      var pageQueryInput = (option == 'pageQuery');
      this.sourceBlock_.updateShape_(pageQueryInput);
    });
    this.appendDummyInput("method")
        .appendField("调用方法")
        .appendField(dropdown, "method")
        .appendField("单条模式数据为空是否默认一条")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "getFillIfNull");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('SmartDQ数据查询，查询的结果返回的是Map<String,Object>类型，Map中Key表示指标别名，Value表示指标的值 '+
            ' >1、SQL Key：对应查询的SQL，以及所在的应用和模块 '+
            ' >2、指标集合：对应查询所涉及的指标 '+
            ' >3、条件参数：数据查询需要的参数'+
            ' >4、调用方法：调用哪个方法查询数据');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-select');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var pageQueryInput = (this.getFieldValue('method') == 'pageQuery');
    container.setAttribute('pagequery_input', pageQueryInput);
    return container;
  },

  domToMutation: function(xmlElement) {
    var pageQueryInput = (xmlElement.getAttribute('pagequery_input') == 'true');
    this.updateShape_(pageQueryInput);
  },

  updateShape_: function(pageQueryInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('recordCount');
    if (pageQueryInput) {
      if (!inputExists) {
        this.appendDummyInput("recordCount")
            .appendField("记录数")
            .appendField(new Blockly.FieldVariable("recordCount"), "recordCount");
        this.appendDummyInput("maxPageSize")
            .appendField("单页最大条数")
            .appendField(new Blockly.FieldTextInput("20"), "maxPageSize");
      }
    } else if (inputExists) {
      this.removeInput("recordCount",true);
      this.removeInput("maxPageSize",true);
    }
  }
};
/**查询SmartDQ，进行增删改操作*/
Blockly.Blocks['datasource_update'] = {
  // Container for unit tests.
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("smartdq"), "dbSpringName")
        .appendField("增删改，影响记录数赋予变量")
        .appendField(new Blockly.FieldVariable("affectRows"), "affectRows");
    this.appendValueInput("sqlKeyValue")
        .setCheck(['String','Reference'])
        .appendField("SQL Key")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");

    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("条件参数");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('数据库增删改操作');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-update');
  }
};

/**查询SmartDQ，对查询的结计算衍生指标后返回*/
Blockly.Blocks['datasource_cput_indx'] = {
  // Container for unit tests.
  init: function() {
    var methods = [["获取单条数据", "get"], ["获取多条数据", "list"], ["分页获取多条数据", "pageQuery"]];
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("smartdq"), "dbSpringName")
        .appendField("查询并计算衍生指标，结果赋予变量")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("sqlKeyValue")
        .setCheck(['String','Reference'])
        .appendField("SQL Key")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("条件参数");
    var dropdown = new Blockly.FieldDropdown(methods, function(option) {
      var pageQueryInput = (option == 'pageQuery');
      this.sourceBlock_.updateShape_(pageQueryInput);
    });
    this.appendDummyInput("method")
        .appendField("调用方法")
        .appendField(dropdown, "method")
        .appendField("单条模式数据为空是否默认一条")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "getFillIfNull");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('SmartDQ查询数据并计算衍生指标');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-cput-indx');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var pageQueryInput = (this.getFieldValue('method') == 'pageQuery');
    container.setAttribute('pagequery_input', pageQueryInput);
    return container;
  },

  domToMutation: function(xmlElement) {
    var pageQueryInput = (xmlElement.getAttribute('pagequery_input') == 'true');
    this.updateShape_(pageQueryInput);
  },

  updateShape_: function(pageQueryInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('recordCount');
    if (pageQueryInput) {
      if (!inputExists) {
        this.appendDummyInput("recordCount")
            .appendField("记录数")
            .appendField(new Blockly.FieldVariable("recordCount"), "recordCount");
        this.appendDummyInput("maxPageSize")
            .appendField("单页最大条数")
            .appendField(new Blockly.FieldTextInput("20"), "maxPageSize");
      }
    } else if (inputExists) {
      this.removeInput("recordCount",true);
      this.removeInput("maxPageSize",true);
    }
  }
};

/**查询并合并相同ID的查询结果*/
Blockly.Blocks['datesource_merge_by_key'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("smartdq"), "dbSpringName")
        .appendField("根据ID集合查询结果后合并到")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("中");
    this.appendValueInput("sqlKeyValue")
        .setCheck(['String','Reference'])
        .appendField("SQL Key")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");
    this.appendValueInput("interfaceKeyValue")
        .setCheck(['String','Reference'])
        .appendField("指标接口名称");
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("条件参数");
    this.appendDummyInput()
        .appendField("指标ID(集合)名称")
        .appendField(new Blockly.FieldTextInput("indexListName"), "indexListName");
    this.appendDummyInput()
        .appendField("调用方法")
        .appendField(new Blockly.FieldDropdown([["获取多条数据", "list"], ["获取单条数据", "get"]]), "method");
    this.appendDummyInput()
        .appendField("合并指标别名")
        .appendField(new Blockly.FieldTextInput("indexAlias"), "indexAlias");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-merge-by-key');
  }
};
/**查询SmartDQ多条数据，并对结果进行补全*/
Blockly.Blocks['datasource_fill'] = {
  // Container for unit tests.
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("smartdq"), "dbSpringName")
        .appendField("查询后进行数据补全，结果赋予变量")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("sqlKeyValue")
        .setCheck(['String','Reference'])
        .appendField("SQL Key")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("条件参数");
    this.appendDummyInput()
        .appendField("补全参数是否时间周期类型")
        .appendField(new Blockly.FieldCheckbox("TRUE",this.updateShape_.bind(this)), "isDatePeriod");
    this.appendDummyInput('fillParam')
        .appendField("补全参数")
        .appendField(new Blockly.FieldVariable("datePeriod"), "fillParam");
    this.appendDummyInput('method')
        .appendField("数据补全操作")
        .appendField(new Blockly.FieldDropdown([["只进行数据补全", "listAndFill"], ["数据补全并计算指标", "listAndFillCputIndx"], ["数据补全并计算指标后并转成趋势结果", "listAndFillCputCvtIndx"]]), "method");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('SmartDQ查询多条数据并进行结果补全');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-fill');
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

/**SmartDQ获取查询数据，并对查询结果计算衍生指标，然后计算环比（同比）*/
Blockly.Blocks['datasource_cput_crc_indx'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("smartdq"), "dbSpringName")
        .appendField("查询后计算衍生指标以及环比（同比），结果赋予变量")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("sqlKeyValue")
        .setCheck(['String','Reference'])
        .appendField("SQL Key")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput()
        .appendField("时间周期")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod");
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("条件参数");
    this.appendDummyInput()
        .appendField("计算范围")
        .appendField(new Blockly.FieldDropdown([["计算较上周期变化率", "period"],["计算环比", "cycle"], ["计算同比", "sync"], ["计算环比和同比", "cycle_sync"]]), "method")
        .appendField("单条模式数据为空是否默认一条")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "getFillIfNull");
    var isMultiLine = new Blockly.FieldCheckbox("TRUE", function(option) {
      this.sourceBlock_.updateShape_(option);
    });
    this.appendDummyInput()
        .appendField("查询结果集是否是多条数据")
        .appendField(isMultiLine, "isMultiLine");
    this.appendDummyInput("indexAlias")
            .appendField("唯一确定一条记录的指标别名")
            .appendField(new Blockly.FieldTextInput("input index alias"), "indexAlias");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('SmartDQ获取查询数据，并对查询结果计算衍生指标，然后计算环比（同比）');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-cput-crc-indx');
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

/**查询SmartDQ，计算衍生指标后计算占比*/
Blockly.Blocks['datasource_cput_ratio'] = {
  // Container for unit tests.
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("smartdq"), "dbSpringName")
        .appendField("查询后计算指标占比，结果赋予变量")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendValueInput("sqlKeyValue")
        .setCheck(['String','Reference'])
        .appendField("SQL Key")
        .appendField(new Blockly.FieldDropdown([["本应用本模块", "self.self"], ["本应用通用模块", "self.common"], ["父应用组通用模块", "parent.common"], ["通用应用通用模块", "common.common"]]), "appModule");
    this.appendDummyInput()
        .appendField("指标集合")
        .appendField(new Blockly.FieldVariable("indexs"), "indexs");
    this.appendDummyInput("totalNumber")
        .appendField("占比的分母")
        .appendField(new Blockly.FieldVariable("totalNumber"), "totalNumber");
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("条件参数");
    this.appendDummyInput()
        .appendField("调用方法")
        .appendField(new Blockly.FieldDropdown([["获取单条数据", "get"], ["获取多条数据", "list"]]), "method")
        .appendField("单条模式数据为空是否默认一条")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "getFillIfNull");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('查询SmartDQ，计算衍生指标后计算占比');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-cput-ratio');
  }
};


/***
 * 数据源条件Map
 */
Blockly.Blocks['datasource_condition_map'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-condition-map');
    this.setColour(DATASOURCE_HUE);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, 'Map');
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip('创建条件参数');
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('ADD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    }
    // else if (!this.itemCount_ && !this.getInput('EMPTY')) {
    //   this.appendDummyInput('EMPTY')
    //       .appendField(Blockly.Msg.LISTS_CREATE_EMPTY_TITLE);
    // }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        var input = this.appendValueInput('ADD' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField(new Blockly.FieldTextInput("key"), 'KEY'+i);;
        // if (i == 0) {
        //   input.appendField(Blockly.Msg.LISTS_CREATE_WITH_INPUT_WITH);
        // }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

/***
 * 数据过滤
 */
Blockly.Blocks['datasource_data_filter_var'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("按条件过滤结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("过滤条件为");
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-data-filter-var');
    this.setColour(DATASOURCE_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.itemCount_ = 1;
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip('过滤数据');
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('RIGHT' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'RIGHT' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('RIGHT' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    }
    var OPERATORS =  [
          ['=', 'EQ'],
          ['\u2260', 'NEQ'],
          ['<', 'LT'],
          ['\u2264', 'LTE'],
          ['>', 'GT'],
          ['\u2265', 'GTE'],
          ['in', 'IN'],
          ['not in', 'NIN'],
          ['contains', 'CTNS']
        ];
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('RIGHT' + i)) {
        this.appendValueInput('RIGHT' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldVariable("fieldName"),'LEFT'+i)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP' + i);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('RIGHT' + i)) {
      this.removeInput('RIGHT' + i);
      i++;
    }
  }
};

/***
 * 数据过滤
 */
Blockly.Blocks['datasource_data_filter_text'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("按条件过滤结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("过滤条件为");
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-data-filter-text');
    this.setColour(DATASOURCE_HUE);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "SmartDQQuery");
    this.itemCount_ = 1;
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip('过滤数据');
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('RIGHT' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'RIGHT' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('RIGHT' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    }
    var OPERATORS =  [
          ['=', 'EQ'],
          ['\u2260', 'NEQ'],
          ['<', 'LT'],
          ['\u2264', 'LTE'],
          ['>', 'GT'],
          ['\u2265', 'GTE'],
          ['in', 'IN'],
          ['not in', 'NIN'],
          ['contains', 'CTNS']
        ];
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('RIGHT' + i)) {
        this.appendValueInput('RIGHT' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(new Blockly.FieldTextInput("fieldName"),"LEFT"+i)
            .appendField(new Blockly.FieldDropdown(OPERATORS), 'OP');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('RIGHT' + i)) {
      this.removeInput('RIGHT' + i);
      i++;
    }
  }
};

Blockly.Blocks['datasource_case_when'] = {
  /**
   * Block for  case when field condition then
   * @this Blockly.Block
   */
  init: function() {
    var WHEN_OPS =  [
          ['=', 'EQ'],
          ['\u2260', 'NEQ'],
          ['<', 'LT'],
          ['\u2264', 'LTE'],
          ['>', 'GT'],
          ['\u2265', 'GTE'],
          ['in', 'IN'],
          ['not in', 'NIN'],
          ['contains', 'CTNS']
        ];

    var THEN_OPS = [
             ['replaced with', 'REPLACED_WITH'],
             [Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
             [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
             [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
             [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE'],
             ['add prefix', 'ADD_PREFIX'],
             ['add suffix', 'ADD_SUFFIX'],
             ['replaced with if null add', 'REPLACED_WITH_IF_NULL_ADD']
        ];
    this.setHelpUrl("http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-case-when");
    this.setColour(DATASOURCE_HUE);
    this.appendDummyInput()
        .appendField("对")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("执行Case When");
    this.appendValueInput('whenField')
        .appendField('case when fieldName')
        .setCheck(['String','Reference'])
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('whenValue')
        .appendField(new Blockly.FieldDropdown(WHEN_OPS), 'whenOp')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('thenField')
        .appendField('then fieldName')
        .setCheck(['String','Reference'])
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('thenValue')
        .appendField(new Blockly.FieldDropdown(THEN_OPS), 'thenOp')
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "CaseWhen");
    this.setInputsInline(false);
  }
};

/***
 * 数据Group By
 */
Blockly.Blocks['datasource_data_group_by'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */

  init: function() {
    var AGGREGATED_FUNC =  [
          ['sum', 'SUM'],
          ['avg', 'AVG'],
          ['无', 'NONE']
        ];
    this.appendDummyInput()
        .appendField("对")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("执行Group By后结果赋予该对象");
    this.appendValueInput('groupBy')
        .setCheck(['String','Reference'])
        .appendField("group by字段");
    this.appendDummyInput()
        .appendField("聚合后是否为单条数据")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "isSingle");
    this.appendDummyInput('defaultAggregatedInput')
        .appendField("默认执行函数")
        .appendField(new Blockly.FieldDropdown(AGGREGATED_FUNC),'defaultAggregated');
    this.itemCount_ = 2;
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "GroupBy");
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-data-group-by');
    this.setColour(DATASOURCE_HUE);
    this.setTooltip('对结果集执行Group By');
  },

  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('FIELD' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'FIELD' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('FIELD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    }
    var AGGREGATED_FUNC =  [
          ['avg', 'AVG'],
          ['sum', 'SUM'],
          ['max', 'MAX'],
          ['min', 'MIN'],
          ['无', 'NONE']
        ];
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('FIELD' + i)) {
            this.appendValueInput('FIELD' + i)
                .setCheck(['String','Reference'])
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField('对字段执行函数')
                .appendField(new Blockly.FieldDropdown(AGGREGATED_FUNC),'AGGREGATED'+i)
                .appendField('忽略NULL值','SKIPTEXT'+i)
                .appendField(new Blockly.FieldCheckbox("TRUE"), "SKIPNULL"+i);
      }else{
           var input = this.getInput('FIELD' + i);
           if(this.getFieldValue('AGGREGATED'+i) !== 'AVG'){
                if(this.getField('SKIPTEXT'+i))input.removeField('SKIPTEXT'+i);
                if(this.getField('SKIPNULL'+i))input.removeField('SKIPNULL'+i);
           }else{
               if(!this.getField('SKIPTEXT'+i) && !this.getField('SKIPNULL'+i)){
                    input.appendField('忽略NULL值','SKIPTEXT'+i)
                    .appendField(new Blockly.FieldCheckbox("TRUE"), "SKIPNULL"+i);
               }
           }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('FIELD' + i)) {
      this.removeInput('FIELD' + i);
      i++;
    }
  },

  onchange: function(e) {
    this.updateShape_();
    var input = this.getInput('defaultAggregatedInput');
    if(this.getFieldValue('defaultAggregated') !== 'AVG'){
        if(this.getField('defaultSkipText')){
            input.removeField('defaultSkipText');
            input.removeField('defaultSkipNull');
        }
    }else{
        if(!this.getField('defaultSkipText')){
            input.appendField('忽略NULL值','defaultSkipText')
                 .appendField(new Blockly.FieldCheckbox("TRUE"), 'defaultSkipNull');
        }
    }
  }

};

Blockly.Blocks['datasource_value_replace'] = {
  /**
   * Block for  case when field condition then
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl("http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/datasource-value-replace");
    this.setColour(DATASOURCE_HUE);
    this.appendDummyInput()
        .appendField("对结果集")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("某字段进行值替换");
    this.appendValueInput('fieldName')
        .setCheck(['String','Reference'])
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField('字段名称');
    this.itemCount_ = 2;
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "ValueReplace");
    this.setInputsInline(false);
  },
  /**
   * Create XML to represent list inputs.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  /**
   * Parse XML to restore the list inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('lists_create_with_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('lists_create_with_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (itemBlock) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.itemCount_; i++) {
      var connection = this.getInput('AFTER' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'AFTER' + i);
    }
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('AFTER' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('AFTER' + i)) {
        var input = this.appendValueInput('AFTER' + i)
                        .setAlign(Blockly.ALIGN_RIGHT)
                        .appendField('值为')
                        .appendField(new Blockly.FieldTextInput("value"), 'BEFORE'+i)
                        .appendField('替换为');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('AFTER' + i)) {
      this.removeInput('AFTER' + i);
      i++;
    }
  }
};