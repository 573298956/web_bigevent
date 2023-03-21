$(function(){
    //表单验证
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        nickname:function(value,index){
            if(value.length > 6){
                return '只能输入1~6位字符！';
            }
        }
    });
    initUserInfo();

    //为表单赋值
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取信息失败！');
                }
                console.log(res);
                form.val('user-info',res.data);
            }
        });
    }
    
    //提交修改
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg("修改用户信息失败！");
                }
                layer.msg("修改信息成功！");
                window.parent.getUserInfo();
            }
        });
    });
    //重置
    $('#userinforeset').on('click',function(e){
        e.preventDefault();
        initUserInfo();
    });
});