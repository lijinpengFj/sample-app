/**
 * verifys.js
 * 格式验证类
 */
var inspect = {
	//每一个判断尽可能使独立的，通过组合来实现最后的功能，比如说某一个判断的前提是参数是数字，可以先组合进一个 isnum 的判断
	isphone:function(data){
		return /^(1[3|4|5|7|8|9][0-9])\d{8}$/.test(data);
	},
	isnum:function(data){
		return /^\d+$/i.test(data);
	},
	len: function(data, max, min){//长度验证，若想实现固定长度的验证，请设置 max = min
		var data = data;
		//注意这里是先max后min，是因为要兼容只有max的情况，相对来说更容易出现的应该是验证最大值
		//但是参数的设置是反常理的，一定要注意顺序
		var max = parseInt(max) || data.length;
		var min = parseInt(min) || data.length;
		var length = data.length;
		return length >= min && length <= max;
	},
	ismail: function(data){
		return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(data);
	},
	ispassword: function(data){//数字、字母、下划线，长度限制交给len来控制
		return /^[a-zA-Z0-9\_]*$/.test(data);
	},
	isfloate: function(data, places/*小数后多少位*/){//小数（允许整数）
		var places = places || '';//没有传就是无限制
		var reg;
		reg = new RegExp('^\\d+(?:.\\d{0,' + places + '})?$');
		return reg.test(data);
	},
	ispositive: function(data){
		var data = parseFloat(data);
		return data > 0;
	},
	//大小的比较，闭集
	valuelimit: function(data, max, min){//与验证长度类似，要想实现固定值的验证，请设置 max = min
		var data = parseFloat(data);
		var max = isNaN(parseFloat(max))? data:parseFloat(max);
		var min = isNaN(parseFloat(min))? data:parseFloat(min);
		return data >= min && data <= max;
	},
	min: function(data, min){
		var min = isNaN(parseFloat(min))? data:parseFloat(min);
		return data >= min;
	},
	max: function(data, max){
		var max = isNaN(parseFloat(max))? data:parseFloat(max);
		return data <= max;
	},
	//大小的比较，开集
	greater: function(data, min){
		var min = isNaN(parseFloat(min))? data:parseFloat(min);
		return data > min;
	}
}
export default function factories(){
	var args = Array.prototype.slice.call(arguments),name = args.shift();
    if(name in inspect){
    	return inspect[name].apply(this,args);
    }
    return false;	
}