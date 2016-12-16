var ZgUtil={
	//弹出iframe对话框
	openWindow:function(url,options,callbackFu){
	    var windowDiv=$('<div id="iframe"><iframe scrolling="auto" frameborder="0" style="height:99%;width:100%" src=""></iframe></div>');
	    $(document.body).append(windowDiv);
	    var settings={
	    	onClose:function(){
	    	    windowDiv.window("destroy");
	    	}
	    }
	    $.extend(settings, options);
	    windowDiv.window(settings);
	    if(!callbackFu){
	    	callbackFu={};
	    }
	    callbackFu.closeWindow=function(){
	    	 windowDiv.window("close");
	    };
	    $("iframe",windowDiv).bind('load', function() {
	    	$("iframe",windowDiv)[0].contentWindow.callbackFu=callbackFu;
	    });
		$("iframe",windowDiv).attr("src",url);
	},
    //返回json格式的表单数据
	getFormDataJson:function(formId){
		var dataArray=$("#"+formId).serializeArray();
		var dataJson={};
		if(dataArray){
		  var len=dataArray.length;
		  for(var i=0;i<len;i++){
		    var name=dataArray[i].name;
		    var value=dataArray[i].value;
		    if(dataJson[name]){
		       dataJson[name]+=','+value
		    }else{
		       dataJson[name]=value;
		    }
		  }
		}
		return dataJson;
	},
	//统一提示出口
	msgAlert:function(message){
		$.messager.alert('提示',message);
	},
	//post请求提交
	postToUrl:function(url, params, newWindow) 
	{
	    var form = $('<form>');
	    form.attr('action', url);
	    form.attr('method', 'POST');
	    if(newWindow){ form.attr('target', '_blank'); }
	    var addParam = function(paramName, paramValue){
	        var input = $('<input type="hidden">');
	        input.attr({ 'id':     paramName,
	                     'name':   paramName,
	                     'value':  paramValue });
	        form.append(input);
	    };
	    if(params instanceof Array){
	        for(var i=0; i<params.length; i++){
	            addParam(i, params[i]);
	        }
	    }
	    if(params instanceof Object){
	        for(var key in params){
	            addParam(key, params[key]);
	        }
	    }
	    form.appendTo(document.body);
	    form.submit();
	    form.remove();
	},
    //三十二位随机数
	generUUID : function(withSepar) {
		var sb = "";
		sb += new Date().getTime().toString(16) + "0000000".substring(0, 8);
		sb += Math.round(Math.random() * 0xffffffff).toString(16);
		sb += Math.round(Math.random() * 0xffffffff).toString(16);
		sb += Math.round(Math.random() * 0xffffffff).toString(16);
		sb += "000000000000000000000";
		var str = sb;
		return [ str.substring(0, 8), str.substring(8, 12),
				str.substring(12, 16), str.substring(16, 20),
				str.substring(20, 32) ].join((withSepar != true) ? "" : "-");
	}
}