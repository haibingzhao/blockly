'use strict';

var COLLECTIONS_HUE = 90;
Blockly.Blocks['collections_sum_allindex_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("对一行(列)结果集求和，结果赋予变量")
        .appendField(new Blockly.FieldVariable("sumValue"), "sumValue");
    this.appendDummyInput()
        .appendField("结果对象")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('对一行结果集求和，返回求和后的值');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-sum-allindex-value');
  }
};

Blockly.Blocks['collections_size'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取列表的Size")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.setOutput(true, 'Number');
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('获取列表的大小，如果为null，返回0');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-size');
  }
};

Blockly.Blocks['collections_keys'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取Map对象的Key列表")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.setOutput(true, 'List');
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('获取Map对象的Key列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-keys');
  }
};

Blockly.Blocks['collections_values'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取Map对象的Value列表")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.setOutput(true, 'List');
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('获取Map对象的Value列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-values');
  }
};

Blockly.Blocks['collections_merge'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("将多个集合(Map或者List)合并为一个集合，结果赋予变量")
        .appendField(new Blockly.FieldVariable("mergedResult"), "mergedResult");
    this.appendValueInput('params')
        .setCheck(['List','Reference'])
        .appendField("集合参数（类型需要是一个类型）");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('获取Map对象的Value列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-merge');
  }
};

Blockly.Blocks['collections_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("创建列表（跳过Null值），结果赋予变量")
        .appendField(new Blockly.FieldVariable("listResult"), "listResult");
    this.appendValueInput('params')
        .setCheck(['List','Reference'])
        .appendField("参数列表");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('将多个变量值（不包括null值）合并为一个列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-list');
  }
};


Blockly.Blocks['collections_get_one'] = {
  init: function() {
    this.appendValueInput('index')
        .appendField("获取列表某下标的数据（下标从1开始）")
        .appendField(new Blockly.FieldVariable("list"), "list")
        .appendField("，下标为：")
        .setCheck(['Number','Reference']);
    this.setOutput(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('获取列表某下标的数据（下标从1开始）');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-get-one');
  }
};

Blockly.Blocks['collections_order_paging'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("列表内存排序分页，结果赋予变量")
        .appendField(new Blockly.FieldVariable("result"), "result");
    this.appendDummyInput()
        .appendField("待排序列表")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.appendDummyInput()
        .appendField("是否返回总记录数")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "needRecordCount");
    this.appendDummyInput()
        .appendField("单页最大条数")
        .appendField(new Blockly.FieldTextInput("10"), "maxPageSize");
    this.appendDummyInput()
        .appendField("是否排序")
        .appendField(new Blockly.FieldCheckbox("TRUE",this.handlerOrderBy.bind(this)), "needOrderBy")
        .appendField("是否分页")
        .appendField(new Blockly.FieldCheckbox("TRUE",this.handlerPaging.bind(this)), "needPaging");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('对查询列表进行内存排序分页');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-order-paging');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var needOrderBy = (this.getFieldValue('needOrderBy') == 'TRUE');
    container.setAttribute('need_order_by', needOrderBy);
    var needPaging = (this.getFieldValue('needPaging') == 'TRUE');
    container.setAttribute('need_paging', needPaging);
    return container;
  },

  domToMutation: function(xmlElement) {
    var needOrderBy = (xmlElement.getAttribute('need_order_by') == 'true');
    var needPaging = (xmlElement.getAttribute('need_paging') == 'true');
    this.handlerOrderBy(needOrderBy);
    this.handlerPaging(needPaging);
  },

  addRemoveField: function(isSelected,selectedInputName,selectedFieldName){
    // Add or remove a Field.
    var hasInput = this.getInput(selectedInputName);
    var fieldExists = this.getField(selectedFieldName);
    if (isSelected) {
      if (!fieldExists) {
        hasInput
            .appendField(new Blockly.FieldVariable(selectedFieldName), selectedFieldName);
      }
    } else if (fieldExists) {
      hasInput.removeField(selectedFieldName);
    }
  },

  handlerOrderBy: function(isSelected) {
    // Add or remove a Field.
    var hasOrderByInput = this.getInput('orderBy');
    var hasDirectionInput = this.getInput('direction');
    if (isSelected) {
      if (!hasOrderByInput) {
        this.appendValueInput("orderBy")
            .setCheck(['String','Reference'])
            .appendField("排序字段名称（对应指标别名）");
       }
       if(!hasDirectionInput){
        this.appendValueInput("direction")
            .setCheck(['String','Reference'])
            .appendField("排序方向");
       }
    } else {
        if (hasOrderByInput) {
            this.removeInput('orderBy',true);
        }
        if(hasDirectionInput){
            this.removeInput('direction',true);
        }
    }
  },

  handlerPaging: function(isSelected) {
    // Add or remove a Field.
    var hasPageInput = this.getInput('page');
    var hasPageSizeInput = this.getInput('pageSize');
    if (isSelected) {
      if (!hasPageInput) {
        this.appendValueInput("page")
            .setCheck(['Number','Reference'])
            .appendField("页码");
      }
      if(!hasPageSizeInput){
        this.appendValueInput("pageSize")
            .setCheck(['Number','Reference'])
            .appendField("每页记录数");
      }
    } else {
        if (hasPageInput) {
            this.removeInput('page',true);
        }
        if(hasPageSizeInput){
            this.removeInput('pageSize',true);
        }
    }
  }
};

/**通过父子ID构建父子树*/
Blockly.Blocks['collections_build_parent_child'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("通过父子ID对查询结果")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("构建父子树并赋予该结果");
    this.appendDummyInput()
        .appendField("父ID名称")
        .appendField(new Blockly.FieldTextInput("parentId"), "parentId");
    this.appendDummyInput()
        .appendField("子ID名称")
        .appendField(new Blockly.FieldTextInput("id"), "id");
    this.appendDummyInput()
        .appendField("根节点ID取值")
        .appendField(new Blockly.FieldTextInput("0"), "root");
    this.appendDummyInput()
        .appendField("形成父子树后子节点索引键")
        .appendField(new Blockly.FieldTextInput("children"), "children");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('通过父子ID构建父子树');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-build-parent-child');
  }
};

/**把父子树平铺开来*/
Blockly.Blocks['collections_flat_parent_child'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("将父子树结果对象")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult")
        .appendField("平铺后并赋予该变量")
    this.appendDummyInput()
        .appendField("形成父子树后子节点索引键")
        .appendField(new Blockly.FieldTextInput("children"), "children");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('通过父子ID构建父子树');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-flat-parent-child');
  }
};
/***
 * 修改Map的Key
 */
Blockly.Blocks['collections_replace_map_key'] = {
  /**
   * Block for creating a list with any number of elements of any type.
   * @this Blockly.Block
   */
  init: function() {
    this.appendDummyInput()
        .appendField("递归替换结果中Map的Key");
    this.appendDummyInput()
        .appendField("查询结果")
        .appendField(new Blockly.FieldVariable("queryResult"), "queryResult");
    this.itemCount_ = 1;
    this.updateShape_();
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(COLLECTIONS_HUE);
    this.setTooltip('修改查询结果中Map的Key');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/collections-replace-map-key');
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
        this.appendValueInput('ADD' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .setCheck(['String','Reference'])
            .appendField(new Blockly.FieldTextInput("from key"), 'KEY'+i)
            .appendField('替换成')
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};