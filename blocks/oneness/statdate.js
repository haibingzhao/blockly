'use strict';
var STATDATE_HUE = 285;
Blockly.Blocks['statdate_variable'] = {
  init: function() {
    this.appendDummyInput("dateVariable")
        .appendField("通讯表名称，结果赋予变量")
        .appendField(new Blockly.FieldVariable("statDate"), "dateVariable");
    this.appendDummyInput()
        .appendField("通讯表时间类型")
        .appendField(new Blockly.FieldDropdown([["day", "day"],["1day", "1day"],["nday", "nday"], ["week", "week"], ["month", "month"], ["quarter", "quarter"], ["year", "year"], ["hh", "hh"]]), "commType");
    this.appendDummyInput("statDateName")
        .appendField("通讯表名称")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerStatDateName.bind(this)), "hasStatDateName");
    this.appendDummyInput("isDatePeriod")
        .appendField("是否返回时间周期类型")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerDatePeriod.bind(this)), "isDatePeriod");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(STATDATE_HUE);
    this.setTooltip('通讯表日期获取');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-variable');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var hasStatDateName = (this.getFieldValue('hasStatDateName') == 'TRUE');
    container.setAttribute('has_stat_date_name', hasStatDateName);
    var isDatePeriod = (this.getFieldValue('isDatePeriod') == 'TRUE');
    container.setAttribute('is_date_period', isDatePeriod);
    return container;
  },

  domToMutation: function(xmlElement) {
    var hasStatDateName = (xmlElement.getAttribute('has_stat_date_name') == 'true');
    this.handlerStatDateName(hasStatDateName);
    var isDatePeriod = (xmlElement.getAttribute('is_date_period') == 'true');
    this.handlerDatePeriod(isDatePeriod);
  },

  handlerStatDateName: function(isSelected) {
    // Add or remove a Field.
    var hasInput = this.getInput("statDateName");
    var fieldExists = this.getField("statDateName");
    if (isSelected) {
      if (!fieldExists) {
        hasInput
            .appendField(new Blockly.FieldTextInput("input statDate name"), "statDateName");
      }
    } else if (fieldExists) {
      hasInput.removeField("statDateName");
    }
  },
  handlerDatePeriod: function(isSelected) {
    // Add or remove a Field.
    var hasInput = this.getInput("dateVariable");
    var fieldExists = this.getField("dateVariable");
    if (isSelected) {
      if (!fieldExists) {
        hasInput
            .appendField(new Blockly.FieldVariable("datePeriod"), "dateVariable");
      }else{
        if(fieldExists.getValue() == 'statDate'){
            hasInput.removeField("dateVariable");
            hasInput.appendField(new Blockly.FieldVariable("datePeriod"), "dateVariable");
        }
      }
      if(!this.getField("periodType")){
        this.getInput("isDatePeriod")
            .appendField(new Blockly.FieldDropdown([["自然日", "day"], ["自然周", "week"], ["自然月", "month"], ["自然季度", "quarter"], ["自然年", "year"],
                 ["最近1天（日均）", "recent1"],["最近7天（日均）", "recent7"],["最近30天（日均）", "recent30"],
                 ["连续自然日", "range"],["连续自然周", "rangeWeek"],["连续自然月", "rangeMonth"]]), "periodType");
      }
    } else{
     if(this.getField("periodType")){
        this.getInput("isDatePeriod").removeField("periodType");
     }
     if (!fieldExists) {
        hasInput
            .appendField(new Blockly.FieldVariable("statDate"), "dateVariable");

     }else{
        if(fieldExists.getValue() == 'datePeriod'){
            hasInput.removeField("dateVariable");
            hasInput.appendField(new Blockly.FieldVariable("statDate"), "dateVariable");
        }
     }
    }
  }
};

Blockly.Blocks['statdate_pre_period'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("中获取前一个时间周期");
    this.setOutput(true, "DatePeriod");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间周期中获取前一个时间周期');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-pre-period');
  }
};

Blockly.Blocks['statdate_trend_convert'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("将最近N天时间周期")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("转成最近1天时间周期");
    this.setOutput(true, "DatePeriod");
    this.setColour(STATDATE_HUE);
    this.setTooltip('将最近N天时间周期转成最近1天时间周期');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-trend-convert');
  }
};

Blockly.Blocks['statdate_trend_pre_period'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取当前时间周期")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("前一个趋势的时间周期")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerTrendSize.bind(this)), "trendSize")
        .appendField("自定义配置趋势天数");
    this.setOutput(true, "DatePeriod");
    this.setColour(STATDATE_HUE);
    this.setTooltip('获取当前时间周期的前一个趋势的时间周期');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-trend-pre-period');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var trendSize = (this.getFieldValue('trendSize') == 'TRUE');
    container.setAttribute('trend_size', trendSize);
    return container;
  },

  domToMutation: function(xmlElement) {
    var trendSize = (xmlElement.getAttribute('trend_size') == 'true');
    this.handlerTrendSize(trendSize);
  },

  handlerTrendSize: function(check){
    var input = this.getInput("trendSize");
    if(check && !input){
      this.appendDummyInput("trendSize")
        .appendField("日")
        .appendField(new Blockly.FieldNumber(30, 0, 1000), "day")
        .appendField("，周")
        .appendField(new Blockly.FieldNumber(24, 0, 1000), "week")
        .appendField("，月")
        .appendField(new Blockly.FieldNumber(13, 0, 1000), "month")
        .appendField("，季度")
        .appendField(new Blockly.FieldNumber(8, 0, 1000), "quarter")
        .appendField("，年")
        .appendField(new Blockly.FieldNumber(3, 0, 1000), "year");
      }else if(!check && input){
        this.removeInput("trendSize");
      }
  }
};

Blockly.Blocks['statdate_from_period'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("中获取结束日期");
    this.setOutput(true, "Date");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间周期中获取通讯表日期');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-from-period');
  }
};

Blockly.Blocks['statdate_start_from_period'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("中获取起始日期");
    this.setOutput(true, "Date");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间周期中获取起始时间');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-start-from-period');
  }
};

Blockly.Blocks['statdate_between_days'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取")
        .appendField(new Blockly.FieldVariable("startDate"), "startDate")
        .appendField("和")
        .appendField(new Blockly.FieldVariable("endDate"), "endDate")
        .appendField("之间相隔的天数");
    this.setOutput(true, "Number");
    this.setColour(STATDATE_HUE);
    this.setTooltip('获取起止时间相隔的天数，包括起止时间');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-between-days');
  }
};

Blockly.Blocks['statdates_from_period'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("中获取默认的历史趋势时间列表")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerTrendSize.bind(this)), "trendSize")
        .appendField("自定义配置趋势天数");
    this.setOutput(true, "ListDate");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间周期中获取默认的历史趋势时间列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdates-from-period');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var trendSize = (this.getFieldValue('trendSize') == 'TRUE');
    container.setAttribute('trend_size', trendSize);
    return container;
  },

  domToMutation: function(xmlElement) {
    var trendSize = (xmlElement.getAttribute('trend_size') == 'true');
    this.handlerTrendSize(trendSize);
  },

  handlerTrendSize: function(check){
    var input = this.getInput("trendSize");
    if(check && !input){
      this.appendDummyInput("trendSize")
        .appendField("日")
        .appendField(new Blockly.FieldNumber(30, 0, 1000), "day")
        .appendField("，周")
        .appendField(new Blockly.FieldNumber(24, 0, 1000), "week")
        .appendField("，月")
        .appendField(new Blockly.FieldNumber(13, 0, 1000), "month")
        .appendField("，季度")
        .appendField(new Blockly.FieldNumber(8, 0, 1000), "quarter")
        .appendField("，年")
        .appendField(new Blockly.FieldNumber(3, 0, 1000), "year");
      }else if(!check && input){
        this.removeInput("trendSize");
      }
  }
};

Blockly.Blocks['statdate_start_of_period_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("中获取默认的历史趋势时间列表的起始时间")
        .appendField(new Blockly.FieldCheckbox("FALSE",this.handlerTrendSize.bind(this)), "trendSize")
        .appendField("自定义配置趋势天数");
    this.setOutput(true, "Date");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间周期中获取默认的历史趋势时间列表的起始时间');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-start-of-period-list');
  },

  mutationToDom: function() {
    var container = document.createElement('mutation');
    var trendSize = (this.getFieldValue('trendSize') == 'TRUE');
    container.setAttribute('trend_size', trendSize);
    return container;
  },

  domToMutation: function(xmlElement) {
    var trendSize = (xmlElement.getAttribute('trend_size') == 'true');
    this.handlerTrendSize(trendSize);
  },

  handlerTrendSize: function(check){
    var input = this.getInput("trendSize");
    if(check && !input){
      this.appendDummyInput("trendSize")
        .appendField("日")
        .appendField(new Blockly.FieldNumber(30, 0, 1000), "day")
        .appendField("，周")
        .appendField(new Blockly.FieldNumber(24, 0, 1000), "week")
        .appendField("，月")
        .appendField(new Blockly.FieldNumber(13, 0, 1000), "month")
        .appendField("，季度")
        .appendField(new Blockly.FieldNumber(8, 0, 1000), "quarter")
        .appendField("，年")
        .appendField(new Blockly.FieldNumber(3, 0, 1000), "year");
      }else if(!check && input){
        this.removeInput("trendSize");
      }
  }
};

Blockly.Blocks['statdates_sync_cycle_from_period'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("中获取")
        .appendField(new Blockly.FieldDropdown([
          ["当前周期时间和上周期时间列表", "periods"],
          ["当前周期时间和环比时间列表", "cycles"],
          ["当前周期时间和同比时间列表", "syncs"],
          ["当前周期时间和环比和同比时间列表", "cycle_syncs"],
          ["上周期时间", "period"],
          ["环比时间", "cycle"],
          ["同比时间", "sync"]
          ]), "type")

    this.setOutput(true, "ListDate");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间周期中获取当前时间和去年同期以及上一周期的时间，用于计算环比和同比');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdates-sync-cycle-from-period');
  }
};

Blockly.Blocks['statdate_add_days'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("对")
        .appendField(new Blockly.FieldVariable("statDate"), "statDate")
        .appendField("增加");
    this.appendValueInput("days")
        .setCheck(['Number','Reference'])
    this.appendDummyInput()
        .appendField("天");
    this.setOutput(true, "Date");
    this.setColour(STATDATE_HUE);
    this.setTooltip('对给定时间增加X天后返回');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-add-days');
  }
};

Blockly.Blocks['statdate_start_of_day'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("statDate"), "statDate")
        .appendField("中对应天的开始时间");
    this.setOutput(true, "Date");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间中获取对应天的开始时间');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-start-of-day');
  }
};

Blockly.Blocks['statdate_end_of_day'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("statDate"), "statDate")
        .appendField("中对应天的结束时间");
    this.setOutput(true, "Date");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间中获取对应天的结束时间');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-end-of-day');
  }
};

Blockly.Blocks['statdate_get_hour_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("从")
        .appendField(new Blockly.FieldVariable("statDate"), "statDate")
        .appendField("中提取所在小时（返回String类型）");
    this.appendDummyInput()
        .appendField("不足2位是否补0")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "fillZero");
    this.setOutput(true, "String");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间中获取所在小时，返回的格式是01，11这样');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-get-hour-string');
  }
};

/***
 * 返回凌晨截止当前时间的小时对应的字符串数组
 */
Blockly.Blocks['statdate_2_now_hour_string_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("凌晨截止当前时间所有小时String列表");
    this.appendDummyInput()
        .appendField("不足2位是否补0")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "fillZero");
    this.setOutput(true, "ListString");
    this.setColour(STATDATE_HUE);
    this.setTooltip('凌晨截止当前时间的小时对应的String列表，返回的格式是[01,02,03,04,05]这样');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-2-now-hour-string-list');
  }
};

/***
 * 返回凌晨截止当前时间的小时对应的时间数组
 */
Blockly.Blocks['statdate_2_now_hour_date_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("凌晨截止当前时间所有小时Date列表");
    this.setOutput(true, "ListDate");
    this.setColour(STATDATE_HUE);
    this.setTooltip('凌晨截止当前时间的小时对应的Date列表');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-2-now-hour-date-list');
  }
};

/***
 * 返回给定时间天的开始到给定时间的小时时间数组
 */
Blockly.Blocks['statdate_2_day_hour_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("一天开始时间到")
        .appendField(new Blockly.FieldVariable("statDate"), "statDate")
        .appendField("之间的小时对应的Date列表");
    this.setOutput(true, "ListDate");
    this.setColour(STATDATE_HUE);
    this.setTooltip('返回给定时间天的开始到给定时间的小时时间数组');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-2-day-hour-list');
  }
};


/***
 * 返回给定时间天的开始到给定时间的小时时间数组
 */
Blockly.Blocks['statdate_2_day_hour_string_list'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("一天开始时间到")
        .appendField(new Blockly.FieldVariable("statDate"), "statDate")
        .appendField("之间的小时对应的String列表");
    this.appendDummyInput()
        .appendField("不足2位是否补0")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "fillZero");
    this.setOutput(true, "ListString");
    this.setColour(STATDATE_HUE);
    this.setTooltip('返回给定时间天的开始到给定时间的小时时间数组');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-2-day-hour-string-list');
  }
};

/***
 * 时间格式化
 */
Blockly.Blocks['statdate_format'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("对")
        .appendField(new Blockly.FieldVariable("statDate"), "statDate")
        .appendField("格式化为")
        .appendField(new Blockly.FieldDropdown([
          ["yyyy-MM-dd", "yyyy-MM-dd"],
          ["yyyy-MM-dd HH:mm:ss ", "yyyy-MM-dd HH:mm:ss"],
          ["yyyy-MM", "yyyy-MM"]]), "format");
    this.setOutput(true, "String");
    this.setColour(STATDATE_HUE);
    this.setTooltip('格式化时间变量');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdate-format');
  }
};


Blockly.Blocks['statdates_size_from_period'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("获取时间周期")
        .appendField(new Blockly.FieldVariable("datePeriod"), "datePeriod")
        .appendField("对应的天数定义");
    this.appendDummyInput("trendSize")
        .appendField("日")
        .appendField(new Blockly.FieldNumber(30, 0, 1000), "day")
        .appendField("，周")
        .appendField(new Blockly.FieldNumber(24, 0, 1000), "week")
        .appendField("，月")
        .appendField(new Blockly.FieldNumber(13, 0, 1000), "month")
        .appendField("，季度")
        .appendField(new Blockly.FieldNumber(8, 0, 1000), "quarter")
        .appendField("，年")
        .appendField(new Blockly.FieldNumber(3, 0, 1000), "year");
    this.setOutput(true, "DaySize");
    this.setColour(STATDATE_HUE);
    this.setTooltip('从时间周期中获取对应天数定义');
    this.setHelpUrl('http://gitlab-sc.alibaba-inc.com/alidp/oneness/wikis/statdates-size-from-period');
  }
};