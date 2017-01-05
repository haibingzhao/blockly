'use strict';
var UTIL_HUE = 255;

Blockly.Blocks['util_call'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("调用自定义方法，结果赋予变量")
        .appendField(new Blockly.FieldVariable("callResult"), "callResult")
        .appendField("中");
    this.appendDummyInput()
        .appendField("类名称(包括包名称)")
        .appendField(new Blockly.FieldTextInput("className"), "className");
    this.appendDummyInput()
        .appendField("方法名称")
        .appendField(new Blockly.FieldTextInput("methodName"), "methodName");
    this.appendDummyInput('springBean')
        .appendField("是否Spring Bean(非静态方法)")
        .appendField(new Blockly.FieldCheckbox("FALSE"), "isSpringBean");
    this.appendValueInput("params")
        .setCheck("List")
        .appendField("方法入参（具有顺序）");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(UTIL_HUE);
    this.setTooltip('调用自定义的方法，要求类中不能够有同名的方法,并且方法对应的修饰符是public的');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-call');
  }

  // mutationToDom: function() {
  //   var container = document.createElement('mutation');
  //   var isSpringBean = (this.getFieldValue('isSpringBean') == 'TRUE');
  //   container.setAttribute('is_spring_bean', isSpringBean);
  //   return container;
  // },

  // domToMutation: function(xmlElement) {
  //   var isSpringBean = (xmlElement.getAttribute('isSpringBean') == 'true');
  //   this.updateShape_(isSpringBean);
  // },

  // updateShape_: function(isSelected) {
  //   // Add or remove a Field.
  //   var hasInput = this.getInput('springBean');
  //   var fieldExists = this.getField('beanName');
  //   if (isSelected) {
  //     if (!fieldExists) {
  //       hasInput
  //           .appendField(new Blockly.FieldTextInput("springBeanName"), "beanName");
  //     }
  //   } else if (fieldExists) {
  //     hasInput.removeField("beanName");
  //   }
  // }

};

Blockly.Blocks['util_debug'] = {
  init: function() {
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("Debug");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "Debug");
    this.setColour(UTIL_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-debug');
  }
};

Blockly.Blocks['util_log'] = {
  init: function() {
    this.appendValueInput("params")
        .setCheck("Map")
        .appendField("Log");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, "Log");
    this.setColour(UTIL_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-log');
  }
};

Blockly.Blocks['util_cache'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("是否开启缓存(Tair)")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "useCache");
    this.appendDummyInput()
        .appendField("缓存时间(秒)")
        .appendField(new Blockly.FieldTextInput("43200"), "cacheTime");
    this.appendValueInput("keys")
        .setCheck("List")
        .appendField("缓存Key列表");
    this.appendStatementInput("cacheStatement")
        .setCheck(null);
    this.appendValueInput("values")
        .setCheck("Reference")
        .appendField("缓存变量");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(UTIL_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-cache');
  }
};

Blockly.Blocks['util_parallel_struct'] = {
  init: function() {
    this.appendStatementInput("parallelStatement")
        .setCheck('ParallelStatement')
        .appendField("并行框架");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(UTIL_HUE);
    this.setTooltip('并行框架,所有在该框架内的语句将并行处理，请确定这些语句没有先后执行关系');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-parallel-struct');
  }
};

Blockly.Blocks['util_parallel_statement'] = {
  init: function() {
    this.appendStatementInput("serialStatement")
        .setCheck(null)
        .appendField("并行语句");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "ParallelStatement");
    this.setNextStatement(true, "ParallelStatement");
    this.setColour(UTIL_HUE);
    this.setTooltip('并行语句，只有用在并行框架内才起作用');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-parallel-statement');
  },

  onchange: function(e) {
    var legal = false;
    var block = this;
    do {
      if (this.PARALLEL_STRUCT_TYPES.indexOf(block.type) != -1) {
        legal = true;
        break;
      }
      block = block.getSurroundParent();
    } while (block);

    if (legal) {
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setDisabled(false);
      }
    } else {
      this.setWarningText('并行语句只能放在并行框架中');
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setDisabled(true);
      }
    }
  },

  PARALLEL_STRUCT_TYPES: ['util_parallel_struct']
};

Blockly.Blocks['util_reference'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("业务逻辑片段调用，业务逻辑片段名称：")
        .appendField(new Blockly.FieldTextInput("segment"), "segment");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(UTIL_HUE);
    this.setTooltip('业务逻辑片段调用');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-reference');
  }
};

Blockly.Blocks['util_function_call'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("调用自定义函数后结果赋予变量")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("函数名称")
        .appendField(new Blockly.FieldTextInput("methodName"), "methodName");
    this.appendValueInput('params')
        .setCheck(['List'])
        .appendField("函数入参");
    this.appendDummyInput('isSelf')
        .appendField("函数是否位于当前接口")
        .appendField(new Blockly.FieldCheckbox("TRUE",this.handlerIsSelf.bind(this)), "isSelf");

    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(UTIL_HUE);
    this.setTooltip('业务函数调用');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/util-function-call');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var isSelf = (this.getFieldValue('isSelf') == 'TRUE');
    container.setAttribute('is_self', isSelf);
    return container;
  },

  domToMutation: function(xmlElement) {
    var isSelf = (xmlElement.getAttribute('is_self') == 'true');
    this.handlerIsSelf(isSelf);
  },

  handlerIsSelf: function(isSelected) {
    // Add or remove a Field.
    var hasInput = this.getInput("isSelf");
    var fieldExists = this.getField("segment");
    if (isSelected) {
      if (fieldExists) {
        hasInput.removeField("segment");
      }
    } else if (!fieldExists) {
      hasInput
            .appendField(new Blockly.FieldTextInput("输入调用的RPC接口名称"), "segment");
    }
  },

  onchange: function(e) {
    var legal = true;
    var block = this;
    do {
      if (this.FUNCTION_TYPES.indexOf(block.type) != -1) {
        legal = false;
        break;
      }
      block = block.getSurroundParent();
    } while (block);

    if (legal) {
      this.setWarningText(null);
      if (!this.isInFlyout) {
        this.setDisabled(false);
      }
    } else {
      this.setWarningText('函数调用中不能再调用其它函数');
      if (!this.isInFlyout && !this.getInheritedDisabled()) {
        this.setDisabled(true);
      }
    }
  },

  FUNCTION_TYPES: ['rpc_function']
};