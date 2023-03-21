//每次调用ajax请求时会先调用ajaxPrefilter这个函数
//在函数中可以拿到ajax配置对象。

$.ajaxPrefilter(function(options){
//在发起真正ajax请求前先拼接请求根路径
    options.url = "http://api-breakingnews-web.itheima.net" +options.url;
    if(options.url.indexOf('my') !== -1){
        options.headers = {Authorization:localStorage.getItem('token')||''};
    }
    options.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
            localStorage.removeItem('token');
            location.href = "../login.html";
        }
    }
});