'use strict';

goog.provide('Blockly.Blocks.rmi');

Blockly.Blocks.rmi.HUE=200;

Blockly.Blocks['rmi_hsf_generic_call'] = {
  init: function() {
        this.appendDummyInput()
            .appendField("HSF泛化调用，调用结果赋予")
            .appendField(new Blockly.FieldVariable("callResult"), "callResult");
        this.appendDummyInput()
            .appendField("接口名称")
            .appendField(new Blockly.FieldTextInput("com.taobao.uic.common.service.userinfo.UicReadService"), "interfaceName");
        this.appendDummyInput()
            .appendField("方法名称")
            .appendField(new Blockly.FieldTextInput("getUserIdByNick"), "methodName")
            .appendField("超时时间（毫秒）")
            .appendField(new Blockly.FieldTextInput("3000"), "timeout");
        this.appendValueInput('version')
            .setCheck('String')
            .appendField("版本号");
        this.appendValueInput('group')
            .setCheck('String')
            .appendField("分组");
        this.appendValueInput('argsType')
            .appendField("方法参数类型")
            .setCheck('List');
        this.appendValueInput('argsVal')
            .appendField("方法参数值")
            .setCheck('List');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly.Blocks.rmi.HUE);
        this.setTooltip('HSF泛化调用');
        this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/rmi-hsf-generic-call');
  }
};