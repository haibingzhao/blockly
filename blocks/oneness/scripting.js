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