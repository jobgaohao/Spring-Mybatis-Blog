$.extend($.fn.validatebox.defaults.rules, {
	minLength : { // 判断最小长度
		validator : function(value, param) {
			return value.length >= param[0];
		},
		message : '最少输入 {0} 个字符。'
	},
	//字符串长度区间
	length:{validator:function(value,param){
		var len=$.trim(value).length;
		return len>=param[0]&&len<=param[1];
		},
		message:"内容长度不超过{1}个字符"
	},
	//字符串长度区间
	CHNlength:{validator:function(value,param){
				var str = "";
				if(value == null || value == undefined){
					str += "";
				}else{
					str = $.trim(value);
				}
				var strLength = str.replace(/[^\x00-\xff]/g,"01").length;
				
				return strLength>=param[0]&&strLength<=param[1];
		},
		message:"输入内容长度超过限制"
	},
	//字符串长度区间，一个汉字算2个字符
	lengthIncludeChinese:{validator:function(value,param){
		var v=$.trim(value);
		var len = v.glen();
		return len>=param[0]&&len<=param[1];
	},
		message:"内容长度不超过{1}个字符"
	},
	imgSuffix:{//验证图片格式
		validator:function(value){
			var isSuffix = false;
			//全转换为小写
			var img = value.toLowerCase();
			//截取后缀
			var suffix = img.substring(img.lastIndexOf(".")+1);
			var imgSuffix = ['png','tif','tiff','gif','jpg','jpeg','jpe','jfif','bmp','dib'];
			
			for(var i = 0;i< imgSuffix.length;i++){
				if(suffix == imgSuffix[i]){
					isSuffix = true;
					break;
				}
			}
			return isSuffix;
		},
		message:'图片格式不正确，请上传以下格式图片png，tif，tiff，gif，jpg，jpeg，jpe，jfif，bmp，dib。'
	},
	phone : {// 验证电话号码
		validator : function(value) {
			return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
		},
		message : '格式不正确,请使用下面格式:020-88888888'
	},
	mobile : {//验证手机号码格式
		validator : function(value) {
			return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/i.test(value);
		},
		message : '号码格式不正确(正确格式如：13450774432)'
	},
	phoneOrMobile:{//验证手机或电话
		validator : function(value) {
			return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/i.test(value) || /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
		},
		message:'请填入手机或电话号码,如13688888888或020-8888888'
	},
	idcard : {// 验证身份证
		validator : function(value) {
			return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
		},
		message : '身份证号码格式不正确'
	},
	floatOrInt : {// 验证是否为小数或整数
		validator : function(value) {
			return /^(\d{1,3}(,\d\d\d)*(\.\d{1,3}(,\d\d\d)*)?|\d+(\.\d+))?$/i.test(value);
		},
		message : '请输入数字，并保证格式正确'
	},
	currency : {// 验证货币
		validator : function(value) {
			return /^d{0,}(\.\d+)?$/i.test(value);
		},
		message : '货币格式不正确'
	},
	qq : {// 验证QQ,从10000开始
		validator : function(value) {
			return /^[1-9]\d{4,9}$/i.test(value);
		},
		message : 'QQ号码格式不正确(正确如：453384319)'
	},
	unableNumber : {// 验证非数字
		validator : function(value) {
			return /^[^0-9]*$/i.test(value);
		},
		message : '请勿输入数字'
	},
	integer : {// 验证整数
		validator : function(value) {
			return /^[+]?[0-9]+\d*$/i.test(value);
		},
		message : '请输入整数'
	},
	unsignedInteger : {// 验证无符号整数
		validator : function(value) {
			return /^[0-9]\d*$/i.test(value);
		},
		message : '请输入正整数'
	},
	realNumberByLength : {// 验证带长度正实数 param[0]:整数位最大长度 param[1]:小数位最大长度
		validator : function(value,param) {
			
			var intLength = param[0];
			var decimalLength = param[1];
			
			var intStr = "";
			var decimaStr = "";
			
			if(value.indexOf(".") >= 0){
				//获取输入内容整数部分和小数部分
				intStr = value.substring(0,value.indexOf(".")); 
				decimaStr = value.substring(value.indexOf(".")+1,value.length);
				//判断整数部分和小数部分是否超过限制
				if(intStr.length <= intLength && decimaStr.length <= decimalLength){
					return /^[0-9]+(.[0-9]+)?$/i.test(value);
				}
			}else{
				//获取输入内容整数部分
				intStr = value;
				if(intStr.length <= intLength){
					return /^\d+$/i.test(value);
				}
			}
			
			return false;
			
		},
		message : '数字格式不正确,整数位不多于{0}位,小数位不多于{1}位'
	},
	positiveNumberByLength : {// 验证带长度正数 param[0]:整数位最大长度 param[1]:小数位最大长度
		validator : function(value,param) {
			
			var intLength = param[0];
			var decimalLength = param[1];
			
			var intStr = "";
			var decimaStr = "";
			
			if(value.indexOf(".") >= 0){
				//获取输入内容整数部分和小数部分
				intStr = value.substring(0,value.indexOf(".")); 
				decimaStr = value.substring(value.indexOf(".")+1,value.length);
				//判断整数部分和小数部分是否超过限制
				if(intStr.length <= intLength && decimaStr.length <= decimalLength){
					return /^[0-9]+(.[0-9]+)?$/i.test(value);
				}
			}else{
				//获取输入内容整数部分
				intStr = value;
				if(intStr.length <= intLength){
					return /^\d*[1-9]\d*$/i.test(value);
				}
			}
			
			return false;
			
		},
		message : '请输入大于0的数,且整数位不多于{0}位,小数位不多于{1}位'
	},
	bigzeronumber : {//验证大于0的数
		validator : function(value) {
			return /^[1-9]\d*(\.\d+)?$/i.test(value);
		},
		message : '请输入大于0的数'
	},
	chinese : {// 验证中文
		validator : function(value) {
			return /^[\u0391-\uFFE5]+$/i.test(value);
		},
		message : '请输入中文'
	},
	unableChinese : {// 验证非中文
		validator : function(value) {
			return /^[^\u4e00-\u9fa5]*$/i.test(value);
		},
		message : '请勿输入中文'
	},
	english : {// 验证英语
		validator : function(value) {
			return /^[A-Za-z]+$/i.test(value);
		},
		message : '请输入英文'
	},
	unnormal : {// 验证是否包含空格和非法字符
		validator : function(value) {
			return /.+/i.test(value);
		},
		message : '输入值不能为空和包含其他非法字符'
	},
	stringCheck : {// 验证是否有非法字符 除空格外
		validator : function(value) {
			return /^[a-zA-Z0-9\u4e00-\u9fa5 ]+$/i.test(value);
		},
		message : '输入值不能包含非法字符'
	},
	batchcodeCheck : {// 验证炉批号是否有非法字符 除逗号、空格、-外
		validator : function(value) {
			return /^[a-zA-Z0-9\u4e00-\u9fa5-,， ]+$/i.test(value);
		},
		message : '输入值不能包含非法字符'
	},
	specificationCheck : {// 验证规格是否有非法字符 除*空格外
		validator : function(value) {
			return /^[a-zA-Z0-9\u4e00-\u9fa5.* ]+$/i.test(value);
		},
		message : '输入值不能包含非法字符'
	},
	contractCodeCheck : {// 验证规格是否有非法字符 -、()、空格外
		validator : function(value) {
			return /^[a-zA-Z0-9\u4e00-\u9fa5-() ]+$/i.test(value);
		},
		message : '输入值不能包含非法字符'
	},
	logisticsNumCheck : {// 验证规格是否有非法字符 -、.、#空格外
		validator : function(value) {
			return /^[a-zA-Z0-9\u4e00-\u9fa5-.# ]+$/i.test(value);
		},
		message : '输入值不能包含非法字符'
	},
	username : {// 验证用户名
		validator : function(value) {
			return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
		},
		message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
	},
	faxno : {// 验证传真
		validator : function(value) {
			//          return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
			return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
		},
		message : '请输入正确的传真号码'
	},
	zip : {// 验证邮政编码
		validator : function(value) {
			return /^[1-9]\d{5}$/i.test(value);
		},
		message : '邮政编码格式不正确'
	},
	ip : {// 验证IP地址
		validator : function(value) {
			return /d+.d+.d+.d+/i.test(value);
		},
		message : 'IP地址格式不正确'
	},
	name : {// 验证姓名，可以是中文或英文
		validator : function(value) {
			return /^[\u0391-\uFFE5]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value);
		},
		message : '请输入姓名'
	},
	carNo:{
		validator : function(value){
			return /^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(value);
		},
		message : '车牌号码无效（例：粤J12350）'
	},
	carenergin:{
		validator : function(value){
			return /^[a-zA-Z0-9]{16}$/.test(value);
		},
		message : '发动机型号无效(例：FG6H012345654584)'
	},
	email:{
		validator : function(value){
			return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		},
		message : '请输入有效的电子邮件账号(例：abc@126.com)'
	},
	msn:{
		validator : function(value){
			return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		},
		message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
	},
	same:{
		validator : function(value, param){
			if($("#"+param[0]).val() != "" && value != ""){
				return $("#"+param[0]).val() == value;
			}else{
				return true;
			}
		},
		message : '两次输入的密码不一致！'
	},
	fileType:{//验证文件格式
		validator:function(value){
			var isSuffix = false;
			//全转换为小写
			var img = value.toLowerCase();
			//截取后缀
			var suffix = img.substring(img.lastIndexOf("."));
			var imgSuffix =[".tif",".tiff",".gif",".jpeg",".jpe",".jfif",".bmp",".dib",".jpg",".png",".rar",".7z",".txt",".zip",".doc",".ppt",".xls",".pdf",".docx",".xlsx"]; 
			
			for(var i = 0;i< imgSuffix.length;i++){
				if(suffix == imgSuffix[i]){
					isSuffix = true;
					break;
				}
			}
			return isSuffix;
		},
		message:'文件格式不正确，请上传以下格式dib,tif,tiff,gif,jpeg,jpe,jfif,bmp,dib,jpg,png,rar,7z,txt,zip,doc,ppt,xls,pdf,docx,xlsx'
	},
	floatAndInt : {// 验证是否为小数或整数
		validator : function(value) {
			return /^\d+(\.\d+)?$/i.test(value);  
			
		},
		message : '请输入整数或小数，并保证格式正确'
	},
	idcardNum : {// 较精确验证身份证
		validator : function(value) {
			return (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/i.test(value) || 
					/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9a-zA-Z]$/i.test(value))?true:false;
		},
		message : '身份证号码格式不正确'
	}
});

//校验上传文件大小
var isIE = /msie/i.test(navigator.userAgent) && !window.opera;         
function fileChange(target) {     

	var fileSize = 0;          
	if (isIE && !target.files) {      
		var filePath = target.value;      
		var fileSystem = new ActiveXObject("Scripting.FileSystemObject");         
		var file = fileSystem.GetFile (filePath);      
		fileSize = file.Size;     
	} else {     
		fileSize = target.files[0].size;      
	}    
	var size = fileSize / 1024;     
	if(size>1000){   
		alert("附件不能大于10M");   
	}   

}    
