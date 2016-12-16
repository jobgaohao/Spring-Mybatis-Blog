

(function ($) {
    Number.prototype.toFixed = function (d) {

        var s = this + "";
        if (!d) d = 0;
        if (s.indexOf(".") == -1) s += ".";
        s += new Array(d + 1).join("0");
        if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {

            var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
            if (a == d + 2) {
                a = s.match(/\d/g);
                if (parseInt(a[a.length - 1]) > 4) {

                    for (var i = a.length - 2; i >= 0; i--) {
                        a[i] = parseInt(a[i]) + 1;
                        if (a[i] == 10) {
                            a[i] = 0;
                            b = i != 1;

                        } else break;

                    }

                }
                s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

            } if (b) s = s.substr(1);
            return (pm + s).replace(/\.$/, "");

        } return this + "";

    };

    


    //获取指定form中的所有的<input>对象    
    function getElements(formId) {
        var form = document.getElementById(formId);
        var elements = [];
        var tagElements = form.getElementsByTagName('input');
        for (var j = 0; j < tagElements.length; j++) {
            elements.push(tagElements[j]);

        }
        return elements;
    }

    //获取单个input中的【name,value】数组  
    function inputSelector(element) {
        if (element.checked)
            return [element.name, element.value];
    }

    function input(element) {
        switch (element.type.toLowerCase()) {
            case 'submit':
            case 'hidden':
            case 'password':
            case 'text':
                return [element.name, element.value];
            case 'checkbox':
                return [element.name, element.checked == true ? 1 : 0];
            case 'radio':
                return inputSelector(element);
        }
        return false;
    }

    //组合URL  
    function serializeElement(element, isJson) {
        var isJsonTemp = false;
        isJsonTemp = isJson;
        var parameter = input(element);
        var connector = isJsonTemp ? ":" : "=";

        if (parameter) {
            var key = encodeURIComponent(parameter[0]);
            if (key.length == 0) return;


            if (parameter[1].constructor != Array)
                parameter[1] = [parameter[1]];

            var values = parameter[1];
            var results = [];
            for (var i = 0; i < values.length; i++) {
                var value = encodeURIComponent(values[i]);
                if (isJsonTemp) {
                    key = '"' + key + '"';
                    value = '"' + value + '"';
                }
                results.push(key + connector + value);
            }
            return results;
        }
    }

    //调用方法     
    function serializeForm(formId, isJson) {
        var elements = getElements(formId);

        var isJsonTemp = false;
        isJsonTemp = isJson;

        var connector = isJsonTemp ? "," : "&";

        var queryComponents = [];

        for (var i = 0; i < elements.length; i++) {
            var queryComponent = serializeElement(elements[i], isJson);
            if (queryComponent)
                queryComponents.push(queryComponent);
        }

        return queryComponents.join(connector);
    }

    //formId:表单id   prefix:用于兼容MVC复杂表单对象的问题
    function serializeFormJson(formId, prefix) {
        var temp = '{' + serializeForm(formId, true) + '}';
        var jsonStr = temp.replace(new RegExp(prefix, 'gm'), '');

        //为空处理
        jsonStr = jsonStr.replace(new RegExp(':,', 'gm'), ':null,');
        //尾部处理
        jsonStr = jsonStr.replace(new RegExp(':}', 'gm'), ':null}');

        var obj = jQuery.parseJSON(jsonStr);
        return obj;
    }

    function serializeFormQueryStr(formId) {
        return serializeForm(formId);
    }

    //导出excel文件
    function downLoadExcel(strUrl, parms) {
        var form = $("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', strUrl);

        for (items in parms) {
            //根据parms 参数拼接隐藏域
            var input = $('<input>');
            input.attr('type', 'hidden');
            input.attr('name', items);
            input.attr('value', parms[items]);

            form.append(input);       //将查询参数控件提交到表单上
        }


        $('body').append(form);  //将表单放置在web中 

        form.submit();

    }

    //格式化时间戳
    function timeStampToDateString(parameters) {
        if (!parameters) {
            return "";
        }
        var timestamp = parameters.toString().replace("/Date(", "").replace(")/", "");
        var newDate = new Date();
        newDate.setTime(timestamp);

        var date = newDate.Format("yyyy-MM-dd")
        return date == "1-01-01" ? "" : date;
    }

    function timeStampToDateStringYYMMDDHHMMSS(parameters) {
        if (!parameters) {
            return "";
        }
        var timestamp = parameters.toString().replace("/Date(", "").replace(")/", "");
        var newDate = new Date();
        newDate.setTime(timestamp);
        return newDate.Format("yyyy-MM-dd hh:mm:ss");
    }

    //截取字符传长度，显示在titel上面
    function subToTitel(value, subLength) {
        var temp = "";
        if (!value) {
            return "";
        } else {
            var len = getByteLen(value);
            if (len <= subLength) {
                return value;
            } else {
                temp = getByteVal(value, subLength);
                return "<a title=" + value + ">" + temp + "</>";
            }
        }
    }

    function getByteLen(val) {
        var len = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null) //全角 
                len += 2;
            else
                len += 1;
        }
        return len;
    }

    function getByteVal(val, max) {
        var returnValue = '';
        var byteValLen = 0;
        for (var i = 0; i < val.length; i++) {
            if (val[i].match(/[^\x00-\xff]/ig) != null)
                byteValLen += 2;
            else
                byteValLen += 1;
            if (byteValLen > max)
                break;
            returnValue += val[i];
        }
        return returnValue + "...";
    }

    function moneyToShortValue(value,length) {
        if ($.type(value) !== "number") {
            var temp = parseFloat(value);

            if (isNaN(temp)) {
                return value;
            }

            value = temp;
        }

        if (length == undefined) {
            length = 2;
        }

        return commafy(value.toFixed(length));
    }

    function WeightToShortValue(value) {
        if ($.type(value) !== "number") {
            var temp = parseFloat(value);

            if (isNaN(temp)) {
                return value;
            }

            value = temp;
        }
        return value.toFixed(3);

    }

    function commafy(num) {
        if ((num + "").trim() == "") {
            return "";
        }
        if (isNaN(num)) {
            return "";
        }
        num = num + "";
        if (/^.*\..*$/.test(num)) {
            var pointIndex = num.lastIndexOf(".");
            var intPart = num.substring(0, pointIndex);
            var pointPart = num.substring(pointIndex + 1, num.length);
            intPart = intPart + "";
            var re = /(-?\d+)(\d{3})/
            while (re.test(intPart)) {
                intPart = intPart.replace(re, "$1,$2")
            }
            num = intPart + "." + pointPart;
        } else {
            num = num + "";
            var re = /(-?\d+)(\d{3})/
            while (re.test(num)) {
                num = num.replace(re, "$1,$2")
            }
        }
        return num;
    }

    function unCommafy(num) {
        if ($.type(num) !== "string") {
            return "";
        }

        num = num.replace(/,/g, "");

        return num;
    }

    function showMsg(title, msg, timeout) {
        $.messager.show({
            title: title,
            msg: msg,
            showType: 'show',
            timeout: timeout,
            style: {
                right: true,
                top: document.body.scrollTop + document.documentElement.scrollTop,
                bottom: true
            }
        });
    }


    function IsExistsObj(obj, key, value) {
        var index = -1;
        $.each(obj, function (idx, item) {
            if (item[key] == value) {
                index = idx;
            }
        });
        return index;
    }

    function isDev() {
        return window.rootUrl.indexOf("localhost") >= 0;
    }

    //时间戳
    $.timeStamp = {
        timeStampToDateString: timeStampToDateString,
        timeStampToDateStringYYMMDDHHMMSS: timeStampToDateStringYYMMDDHHMMSS
    };

    //内容截取
    $.contentSub = {
        subToTitel: subToTitel
    }

    //导出文件
    $.downloadFile = {
        downLoadExcel: downLoadExcel
    };

    //序列化表单
    $.formEx = {
        serializeForm: serializeForm,
        serializeFormJson: serializeFormJson,
        serializeFormQueryStr: serializeFormQueryStr
    };

    //保留两位小数
    $.longNumber = {
        moneyToShortValue: moneyToShortValue,
        WeightToShortValue: WeightToShortValue
    }

    //提示消息
    $.msg = {
        show: showMsg
    }

    //数组中是否存在对象
    $.IsExists = {
        IsExistsObj: IsExistsObj
    }

    //千分位
    $.commafy = {
        commafy: commafy,
        unCommafy: unCommafy
    }

    //是否开发环境 -- 通过URL判断
    $.isDev = {
        isDev: isDev
    }

    //数组相关
    Array.prototype.IndexOf = function (val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == val) return i;
        }
        return -1;
    };

    Array.prototype.Remove = function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };


    //日期转换
    //调用实例 var time2 = new Date().format("yyyy-MM-dd");  
    Date.prototype.Format = function (fmt) { //author: meizz   
        var o = {
            "M+": this.getMonth() + 1,                 //月份   
            "d+": this.getDate(),                    //日   
            "h+": this.getHours(),                   //小时   
            "m+": this.getMinutes(),                 //分   
            "s+": this.getSeconds(),                 //秒   
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
            "S": this.getMilliseconds()             //毫秒   
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

})(jQuery);

var Common = {

    //关闭弹层
    closeDialog: function (obj) {
        var $obj = $(obj);
        if ($obj.length > 0)
            $obj.dialog('close');
    },

    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },

    showLoading: function () {
        $("#_loading").mask();
    },

    hideLoading: function () {
        $("#_loading").unmask();
    }
}