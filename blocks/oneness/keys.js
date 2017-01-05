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
var KEYS_HUE = 180;
Blockly.Blocks['keys_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("String")
        .appendField(new Blockly.FieldTextInput("inputValue"), "value");
    this.setOutput(true, "String");
    this.setColour(KEYS_HUE);
    this.setTooltip('创建String参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-string');
  }
};

Blockly.Blocks['keys_long'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Long")
        .appendField(new Blockly.FieldNumber(0, -9223372036854775000, 9223372036854775000), "value");
    this.setOutput(true, "Number");
    this.setColour(KEYS_HUE);
    this.setTooltip('创建Long参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-long');
  }
};

Blockly.Blocks['keys_integer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Integer")
        .appendField(new Blockly.FieldNumber(0, -2147483648, 2147483647), "value");
    this.setOutput(true, "Number");
    this.setColour(KEYS_HUE);
    this.setTooltip('创建Integer参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-integer');
  }
};

Blockly.Blocks['keys_boolean'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Boolean")
        .appendField(new Blockly.FieldDropdown([["true", "TRUE"], ["false", "FALSE"]]), "value");
    this.setOutput(true, "Boolean");
    this.setColour(KEYS_HUE);
    this.setTooltip('创建Boolean参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-boolean');
  }
};

Blockly.Blocks['keys_double'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Double")
        .appendField(new Blockly.FieldNumber(0, -9223372036854775000, 9223372036854775000, 10), "value");
    this.setOutput(true, "Number");
    this.setColour(KEYS_HUE);
    this.setTooltip('创建Double参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-double');
  }
};

Blockly.Blocks['keys_strings'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("String[]")
        .appendField(new Blockly.FieldTextInput("input string array splited by ','"), "value");
    this.setOutput(true, "String[]");
    this.setColour(KEYS_HUE);
    this.setTooltip('创建String参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-strings');
  }
};

Blockly.Blocks['keys_types'] = {
  init: function() {
    var TYPES =  [
          ['Long[]', 'Long[]'],
          ['Integer[]', 'Integer[]'],
          ['Double[]', 'Double[]'],
          ['String[]', 'String[]'],
          ['List<Long>', 'ListLong'],
          ['List<Integer>', 'ListInteger'],
          ['List<Double>', 'ListDouble'],
          ['List<String>', 'ListString'],
          ['String', 'String'],
          ['Long', 'Long'],
          ['Integer', 'Integer'],
          ['Boolean', 'Boolean'],
          ['Double', 'Double'],
          ['Json', 'Json']
        ];
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown(TYPES),'types')
        .appendField(new Blockly.FieldTextInput("inputValue"), "value");
    var thisBlock = this;
    this.setOutput(true, function(){
      return thisBlock.getFieldValue('types');
    });
    this.setColour(KEYS_HUE);
    this.setTooltip('创建特定类型参数');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-types');
  }
};


Blockly.Blocks['keys_array_2_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("将数组对象")
        .appendField(new Blockly.FieldVariable("array"), "array")
        .appendField("转成List列表");
    this.setOutput(true, ['ListLong','ListInteger','ListDouble','ListString']);
    this.setColour(KEYS_HUE);
    this.setTooltip('将数组对象转成List列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-array-2-list');
  }
};

Blockly.Blocks['keys_null'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Null");
    this.setOutput(true, null);
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-null');
  }
};

Blockly.Blocks['keys_current_date'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("当前系统时间");
    this.setOutput(true, "Date");
    this.setColour(KEYS_HUE);
    this.setTooltip('获取当前系统时间');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-current-date');
  }
};

Blockly.Blocks['keys_arithmetic'] = {
  /**
   * Block for basic arithmetic operator.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
          "check": null
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options":
            [[Blockly.Msg.MATH_ADDITION_SYMBOL, 'ADD'],
             [Blockly.Msg.MATH_SUBTRACTION_SYMBOL, 'MINUS'],
             [Blockly.Msg.MATH_MULTIPLICATION_SYMBOL, 'MULTIPLY'],
             [Blockly.Msg.MATH_DIVISION_SYMBOL, 'DIVIDE']]
        },
        {
          "type": "input_value",
          "name": "B",
          "check": null
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": KEYS_HUE,
      "helpUrl": "http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-arithmetic"
    });
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      var TOOLTIPS = {
        'ADD': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_ADD,
        'MINUS': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MINUS,
        'MULTIPLY': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_MULTIPLY,
        'DIVIDE': Blockly.Msg.MATH_ARITHMETIC_TOOLTIP_DIVIDE
      };
      return TOOLTIPS[mode];
    });
  }
};

Blockly.Blocks['keys_reference'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Reference")
        .appendField(new Blockly.FieldVariable("item"), "key");
    this.setOutput(true, 'Reference');
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-reference');
  }
};

Blockly.Blocks['keys_create_variable'] = {
  init: function() {
    this.appendValueInput("value")
        .appendField("创建")
        .appendField(new Blockly.FieldVariable("item"), "key")
        .appendField("=");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-create-variable');
  }
};

Blockly.Blocks['keys_assign_variable'] = {
  init: function() {
    this.appendValueInput("value")
        .appendField("创建或赋值")
        .appendField(new Blockly.FieldVariable("item"), "key")
        .appendField("=");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-assign-variable');
  }
};

Blockly.Blocks['keys_throw_exception'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("抛异常");
    this.appendDummyInput()
        .appendField("code")
        .appendField(new Blockly.FieldTextInput("1001"), "code");
    this.appendDummyInput()
        .appendField("message")
        .appendField(new Blockly.FieldTextInput("error message"), "msg");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-throw-exception');
  }
};

Blockly.Blocks['keys_variable_param'] = {
  init: function() {
    this.appendValueInput("value")
        .setCheck(null)
        .appendField("创建")
        .appendField(new Blockly.FieldVariable("item"), "key")
        .appendField("=");
    this.setOutput(true, 'Reference');
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-variable-param');
  }
};

Blockly.Blocks['keys_login_user_id'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("loginUserId");
    this.setOutput(true, ['String','Long','Integer']);
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-login-user-id');
  }
};

Blockly.Blocks['keys_runas_user_id'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("runAsUserId");
    this.setOutput(true, ['String','Number']);
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-runas-user-id');
  }
};

Blockly.Blocks['keys_runas_shop_id'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("runAsShopId");
    this.setOutput(true, 'Number');
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-runas-shop-id');
  }
};

Blockly.Blocks['keys_main_user_id'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("mainUserId");
    this.setOutput(true, ['String','Long','Integer']);
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-main-user-id');
  }
};

Blockly.Blocks['keys_is_b2c_shop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("isB2cShop");
    this.setOutput(true, 'Boolean');
    this.setColour(KEYS_HUE);
    this.setTooltip('是否B2C卖家');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-is-b2c-shop');
  }
};

Blockly.Blocks['keys_bc_seller'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("bcSeller");
    this.setOutput(true, "Number");
    this.setColour(KEYS_HUE);
    this.setTooltip('淘宝卖家为0，天猫卖家为1');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-bc-seller');
  }
};

Blockly.Blocks['keys_main1_cateid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取主营一级类目ID");
    this.appendValueInput("statDate")
        .setCheck(['Reference','Date'])
        .appendField("统计日期");
    this.setOutput(true, "Number");
    this.setColour(KEYS_HUE);
    this.setTooltip('卖家主营一级类目ID');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-main1-cateid');
  }
};

Blockly.Blocks['keys_main2_cateid'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取主营二级类目ID");
    this.appendValueInput("statDate")
        .setCheck(['Reference','Date'])
        .appendField("统计日期");
    this.setOutput(true, "Number");
    this.setColour(KEYS_HUE);
    this.setTooltip('卖家主营二级类目ID');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-main2-cateid');
  }
};

Blockly.Blocks['keys_page_start_index'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取分页起始下标");
    this.appendDummyInput()
        .appendField("页码")
        .appendField(new Blockly.FieldVariable("page"), "page")
        .appendField("每页记录数")
        .appendField(new Blockly.FieldVariable("pageSize"), "pageSize");
    this.setInputsInline(false);
    this.setOutput(true, "Number");
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-page-start-index');
  }
};

/**字符串拼接*/
Blockly.Blocks['keys_string_concat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("字符串拼接");
    this.appendDummyInput()
        .appendField("拼接分隔符")
        .appendField(new Blockly.FieldDropdown([
          ["无", ""],
          ["逗号(,)", ","],
          ["中划线(-)", "-"],
          ["下划线(_)", "_"],
          ["小数点(.)", "."],
          ["空格", " "],
          ["不可见字符char6", "char6"]]), "split");
    this.appendValueInput('strings')
        .appendField("待拼接的字符串");
    this.setInputsInline(false);
    this.setOutput(true, "String");
    this.setColour(KEYS_HUE);
    this.setTooltip('');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-string-concat');
  }
};


Blockly.Blocks['keys_array'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/keys-array');
    this.setColour(KEYS_HUE);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, 'List');
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip('创建数组参数');
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
        var input = this.appendValueInput('ADD' + i);
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
