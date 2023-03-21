$(function(){
    //表单切换效果
    $('.go-reg a').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('.go-login a').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show();
    });
    //表单验证
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value, item){ //value：表单的值、item：表单的DOM对象
            if($('.reg-box [name=password]').val()!==value){
              return '两次输入的密码不一致';
            }
        },
    });
    //发起注册请求
    $('.reg-box form').on('submit',function(e){
        e.preventDefault();
        let $username = $('.reg-box [name=username]').val();
        let $password = $('.reg-box [name=password]').val();
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:{
                username:$username,
                password:$password,},
            success:function(res){
                if(res.status === 0){
                    layer.msg(res.message);
                }
                layer.msg(res.message);
            }
        } )
        $('.go-login a').click();
    });
    //发起登录请求
    $('.login-box form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){

                if(res.status !== 0){
                    layer.msg(res.message);
                    return;
                }
                localStorage.setItem('token',res.token);
                location.href = './index.html';
            }
        });
    });
});