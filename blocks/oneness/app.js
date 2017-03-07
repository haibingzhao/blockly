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
var APP_HUE = 190;
Blockly.Blocks['rpc_definition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("通讯表名称")
        .appendField(new Blockly.FieldTextInput("tb_one_plat"), "statDateName")
        .appendField("是否实时数据")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.updateIsRt_.bind(this)), "isRt");
    this.appendDummyInput("statDate")
        .appendField("更新时间",'updateTimeText')
        .appendField(new Blockly.FieldCheckbox("FALSE",this.updateNeedUpdateTime_.bind(this)), "needUpdateTime");
    this.appendDummyInput("interval")
        .appendField("轮询间隔时间",'intervalText')
        .appendField(new Blockly.FieldCheckbox("FALSE",this.updateNeedInterval_.bind(this)), "needInterval");
    this.appendStatementInput("business_flows")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("服务类型")
        .appendField(new Blockly.FieldDropdown([["HTTP服务", "http"], ["HSF服务", "hsf"], ["HTTP和HSF服务", "http-hsf"]]), "rpcType");
    this.setColour(APP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/rpc-definition');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isRt = (this.getFieldValue('isRt') == 'TRUE');
    container.setAttribute('is_rt', isRt);
    var needUpdateTime = (this.getFieldValue('needUpdateTime') == 'TRUE');
    container.setAttribute('need_update_time', needUpdateTime);
    var needInterval = (this.getFieldValue('needInterval') == 'TRUE');
    container.setAttribute('need_interval', needInterval);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isRt = (xmlElement.getAttribute('is_rt') == 'true');
    var needUpdateTime = (xmlElement.getAttribute('need_update_time') == 'true');
    var needInterval = (xmlElement.getAttribute('need_interval') == 'true');
    this.updateIsRt_(isRt);
    this.updateNeedUpdateTime_(needUpdateTime,isRt);
    this.updateNeedInterval_(needInterval,isRt);
  },

  updateNeedUpdateTime_: function(needUpdateTime,isRt) {
    var statDateInput = this.getInput('statDate');
    if(isRt==='undefined') isRt = (this.getFieldValue('isRt') == 'TRUE');
    if(!isRt){
        if(needUpdateTime) {
            if(!this.getField('appId'))
                statDateInput.appendField(new Blockly.FieldVariable("statDate"), "statDate");
        }else{
            if(this.getField('statDate'))
                statDateInput.removeField('statDate');
        }
    }
  },

  updateNeedInterval_: function(needInterval,isRt) {
    var intervalInput = this.getInput('interval');
    if(isRt==='undefined') isRt = (this.getFieldValue('isRt') == 'TRUE');
    if(!isRt){
        if(needInterval) {
            if(!this.getField('intervalKey'))
                intervalInput.appendField(new Blockly.FieldTextInput("interval key"), "intervalKey");
        }else{
            if(this.getField('intervalKey'))
                intervalInput.removeField('intervalKey');
        }
    }
  },

  updateIsRt_: function(isRt) {
    var statDateInput = this.getInput('statDate');
    var intervalInput = this.getInput('interval');
    if(isRt){
        if(this.getField('needUpdateTime')) statDateInput.removeField("needUpdateTime");
        if(this.getField('needInterval')) intervalInput.removeField("needInterval");
        if(this.getField('appId')) statDateInput.removeField("appId");
        if(this.getField('intervalKey')) intervalInput.removeField("intervalKey");
        statDateInput.appendField(new Blockly.FieldCheckbox("TRUE"), "needUpdateTime");
        statDateInput.appendField(new Blockly.FieldTextInput("app id"), "appId");
        intervalInput.appendField(new Blockly.FieldCheckbox("TRUE"), "needInterval");
        intervalInput.appendField(new Blockly.FieldTextInput("interval key"), "intervalKey");
    }else{
        if(this.getField('needInterval')){
            if(this.getField('needUpdateTime')) statDateInput.removeField('needUpdateTime');
            if(this.getField('statDate')) statDateInput.removeField('statDate');
            if(this.getField('appId')) statDateInput.removeField("appId");
            if(this.getField('needInterval')) intervalInput.removeField("needInterval");
            if(this.getField('intervalKey')) intervalInput.removeField("intervalKey");
            statDateInput.appendField(new Blockly.FieldCheckbox("FALSE",this.updateNeedUpdateTime_.bind(this)), "needUpdateTime");
            intervalInput.appendField(new Blockly.FieldCheckbox("FALSE",this.updateNeedInterval_.bind(this)), "needInterval");
        }
    }
  },
};

Blockly.Blocks['rpc_business'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("业务逻辑片段");
    this.appendStatementInput("business_flows")
        .setCheck(null);
    this.setColour(APP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/rpc-business');
  }
};

Blockly.Blocks['rpc_get_params'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取RPC的参数列表，赋予变量")
        .appendField(new Blockly.FieldVariable("params"), "params");
    this.appendDummyInput()
        .appendField("RPC接口名称")
        .appendField(new Blockly.FieldVariable("rpcName"), "rpcName");
    this.setPreviousStatement(true, 'ParamInput');
    this.setNextStatement(true, 'GetParams');
    this.setColour(APP_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/rpc-get-params');
  },
};


Blockly.Blocks['rpc_function'] = {
  /**
   * Block for defining a procedure with no return value.
   * @this Blockly.Block
   */
  init: function() {
    var nameField = new Blockly.FieldTextInput(
        'method name',
        Blockly.Procedures.rename);
    nameField.setSpellcheck(false);
    this.appendDummyInput()
        .appendField('自定义函数名称')
        .appendField(nameField, 'NAME')
        .appendField('', 'PARAMS');
    this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
    if (Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
      this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
    }
    this.setColour(APP_HUE);
    this.setTooltip(Blockly.Msg.PROCEDURES_DEFNORETURN_TOOLTIP);
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/rpc-function');
    this.arguments_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },
  /**
   * Add or remove the statement block from this function definition.
   * @param {boolean} hasStatements True if a statement block is needed.
   * @this Blockly.Block
   */
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK')
          .appendField(Blockly.Msg.PROCEDURES_DEFNORETURN_DO);
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  /**
   * Update the display of parameters for this procedure definition block.
   * Display a warning if there are duplicately named parameters.
   * @private
   * @this Blockly.Block
   */
  updateParams_: function() {
    // Check for duplicated arguments.
    var badArg = false;
    var hash = {};
    for (var i = 0; i < this.arguments_.length; i++) {
      if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
        badArg = true;
        break;
      }
      hash['arg_' + this.arguments_[i].toLowerCase()] = true;
    }
    if (badArg) {
      this.setWarningText(Blockly.Msg.PROCEDURES_DEF_DUPLICATE_WARNING);
    } else {
      this.setWarningText(null);
    }
    // Merge the arguments into a human-readable list.
    var paramString = '';
    if (this.arguments_.length) {
      paramString = Blockly.Msg.PROCEDURES_BEFORE_PARAMS +
          ' ' + this.arguments_.join(', ');
    }
    // The params field is deterministic based on the mutation,
    // no need to fire a change event.
    Blockly.Events.disable();
    try {
      this.setFieldValue(paramString, 'PARAMS');
    } finally {
      Blockly.Events.enable();
    }
  },
  /**
   * Create XML to represent the argument inputs.
   * @param {=boolean} opt_paramIds If true include the IDs of the parameter
   *     quarks.  Used by Blockly.Procedures.mutateCallers for reconnection.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function(opt_paramIds) {
    var container = document.createElement('mutation');
    if (opt_paramIds) {
      container.setAttribute('name', this.getFieldValue('NAME'));
    }
    for (var i = 0; i < this.arguments_.length; i++) {
      var parameter = document.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      if (opt_paramIds && this.paramIds_) {
        parameter.setAttribute('paramId', this.paramIds_[i]);
      }
      container.appendChild(parameter);
    }

    // Save whether the statement input is visible.
    if (!this.hasStatements_) {
      container.setAttribute('statements', 'false');
    }
    return container;
  },
  /**
   * Parse XML to restore the argument inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
      if (childNode.nodeName.toLowerCase() == 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
      }
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show or hide the statement input.
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('procedures_mutatorcontainer');
    containerBlock.initSvg();

    // Check/uncheck the allow statement box.
    if (this.getInput('RETURN')) {
      containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
                                   'STATEMENTS');
    } else {
      containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
    }

    // Parameter list.
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.arguments_.length; i++) {
      var paramBlock = workspace.newBlock('procedures_mutatorarg');
      paramBlock.initSvg();
      paramBlock.setFieldValue(this.arguments_[i], 'NAME');
      // Store the old location.
      paramBlock.oldLocation = i;
      connection.connect(paramBlock.previousConnection);
      connection = paramBlock.nextConnection;
    }
    // Initialize procedure's callers with blank IDs.
    Blockly.Procedures.mutateCallers(this);
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    // Parameter list.
    this.arguments_ = [];
    this.paramIds_ = [];
    var paramBlock = containerBlock.getInputTargetBlock('STACK');
    while (paramBlock) {
      this.arguments_.push(paramBlock.getFieldValue('NAME'));
      this.paramIds_.push(paramBlock.id);
      paramBlock = paramBlock.nextConnection &&
          paramBlock.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);

    // Show/hide the statement input.
    var hasStatements = containerBlock.getFieldValue('STATEMENTS');
    if (hasStatements !== null) {
      hasStatements = hasStatements == 'TRUE';
      if (this.hasStatements_ != hasStatements) {
        if (hasStatements) {
          this.setStatements_(true);
          // Restore the stack, if one was saved.
          Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
          this.statementConnection_ = null;
        } else {
          // Save the stack, then disconnect it.
          var stackConnection = this.getInput('STACK').connection;
          this.statementConnection_ = stackConnection.targetConnection;
          if (this.statementConnection_) {
            var stackBlock = stackConnection.targetBlock();
            stackBlock.unplug();
            stackBlock.bumpNeighbours_();
          }
          this.setStatements_(false);
        }
      }
    }
  },
  /**
   * Return the signature of this procedure definition.
   * @return {!Array} Tuple containing three elements:
   *     - the name of the defined procedure,
   *     - a list of all its arguments,
   *     - that it DOES NOT have a return value.
   * @this Blockly.Block
   */
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, false];
  },
  /**
   * Return all variables referenced by this block.
   * @return {!Array.<string>} List of variable names.
   * @this Blockly.Block
   */
  getVars: function() {
    return this.arguments_;
  },
  /**
   * Notification that a variable is renaming.
   * If the name matches one of this block's variables, rename it.
   * @param {string} oldName Previous name of variable.
   * @param {string} newName Renamed variable.
   * @this Blockly.Block
   */
  renameVar: function(oldName, newName) {
    var change = false;
    for (var i = 0; i < this.arguments_.length; i++) {
      if (Blockly.Names.equals(oldName, this.arguments_[i])) {
        this.arguments_[i] = newName;
        change = true;
      }
    }
    if (change) {
      this.updateParams_();
      // Update the mutator's variables if the mutator is open.
      if (this.mutator.isVisible()) {
        var blocks = this.mutator.workspace_.getAllBlocks();
        for (var i = 0, block; block = blocks[i]; i++) {
          if (block.type == 'procedures_mutatorarg' &&
              Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
            block.setFieldValue(newName, 'NAME');
          }
        }
      }
    }
  },
  /**
   * Add custom menu options to this block's context menu.
   * @param {!Array} options List of menu options to add to.
   * @this Blockly.Block
   */
  customContextMenu: function(options) {
    // Add option to create caller.
    var option = {enabled: true};
    var name = this.getFieldValue('NAME');
    option.text = Blockly.Msg.PROCEDURES_CREATE_DO.replace('%1', name);
    var xmlMutation = goog.dom.createDom('mutation');
    xmlMutation.setAttribute('name', name);
    for (var i = 0; i < this.arguments_.length; i++) {
      var xmlArg = goog.dom.createDom('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlMutation.appendChild(xmlArg);
    }
    var xmlBlock = goog.dom.createDom('block', null, xmlMutation);
    xmlBlock.setAttribute('type', this.callType_);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    // Add options to create getters for each parameter.
    if (!this.isCollapsed()) {
      for (var i = 0; i < this.arguments_.length; i++) {
        var option = {enabled: true};
        var name = this.arguments_[i];
        option.text = Blockly.Msg.VARIABLES_SET_CREATE_GET.replace('%1', name);
        var xmlField = goog.dom.createDom('field', null, name);
        xmlField.setAttribute('name', 'VAR');
        var xmlBlock = goog.dom.createDom('block', null, xmlField);
        xmlBlock.setAttribute('type', 'variables_get');
        option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
        options.push(option);
      }
    }
  },
  callType_: 'procedures_callnoreturn'
};