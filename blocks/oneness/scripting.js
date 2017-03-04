'use strict';

goog.provide('Blockly.Blocks.scripting');

Blockly.Blocks.scripting.HUE=123;

Blockly.Blocks['scripting_for_each'] = {
	init: function() {
	    this.appendDummyInput()
	        .appendField("对结果对象集合")
	        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
	        .appendField("进行foreach操作");
	    this.appendDummyInput()
	        .appendField("foreach处理脚本")
	        .appendField(new Blockly.FieldTextArea(""), "script");
	    this.setPreviousStatement(true, null);
	    this.setNextStatement(true, null);
	    this.setColour(Blockly.Blocks.scripting.HUE);
	    this.setTooltip('结果对象集合.foreach(function($item)->{<输入脚本>})');
	    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/scripting-for-each');
	}
};

Blockly.Blocks['scripting_reduce'] = {
	init: function() {
		    this.appendDummyInput()
		        .appendField("对结果对象集合")
		        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
		        .appendField("进行聚合操作");
		    this.appendDummyInput()
		        .appendField("reduce处理脚本")
		        .appendField(new Blockly.FieldTextArea(""), "script");
		    this.appendDummyInput()
		        .appendField("输出结果")
		        .appendField(new Blockly.FieldVariable("reducedResult"), "reducedResult");
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(Blockly.Blocks.scripting.HUE);
		    this.setTooltip('输出结果 = 结果对象集合.reduce(function($item)->{<输入脚本>})');
		    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/scripting-reduce');
	}
};

Blockly.Blocks['scripting_map'] = {
	init: function() {
		    this.appendDummyInput()
		        .appendField("对结果对象集合")
		        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
		        .appendField("进行map操作");
		    this.appendDummyInput()
		        .appendField("map处理脚本")
		        .appendField(new Blockly.FieldTextArea(""), "script");
		    this.appendDummyInput()
		        .appendField("输出结果")
		        .appendField(new Blockly.FieldVariable("mappedResult"), "mappedResult");
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.setColour(Blockly.Blocks.scripting.HUE);
		    this.setTooltip('输出结果 = 结果对象集合.map(function($item)->{<输入脚本>})');
		    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/scripting-map');
	}
};

Blockly.Blocks['scripting_engine'] = {
	init: function() {
		    this.appendDummyInput()
		        .appendField("脚本调用，调用结果如有返回值则赋予变量")
		        .appendField(new Blockly.FieldVariable("callResult"), "callResult");
		    this.appendDummyInput()
		        .appendField("脚本类型")
		        .appendField(new Blockly.FieldDropdown([["JavaScript", "js"], ["Groovy", "groovy"]]), "type");
		    this.appendDummyInput()
		        .appendField("处理结果集")
		        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
		    this.appendDummyInput()
		        .appendField("处理脚本")
		        .appendField(new Blockly.FieldTextArea(""), "script");
		    this.setPreviousStatement(true, null);
		    this.setNextStatement(true, null);
		    this.itemCount_ = 0;
		    this.updateShape_();
    		this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
		    this.setColour(Blockly.Blocks.scripting.HUE);
		    this.setTooltip('调用动态脚本，如果没有返回值那么输出结果变量为 null');
		    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/scripting-engine');
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
    this.itemCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.itemCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
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
      if (!this.getInput('ADD' + i)) {
        var input = this.appendDummyInput('ADD' + i)
        								.appendField('脚本其它入参')
        								.appendField(new Blockly.FieldVariable("queryResult"), 'PARAM' + i)
        								.setAlign(Blockly.ALIGN_RIGHT);
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};