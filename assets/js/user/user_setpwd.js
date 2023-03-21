$(function(){
    //表单验证
    let form = layui.form;
    let layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
          newpwd:function(value,item){
            if($('#oldpwd').val()===value){
                return '原密码与新密码不能相同'
            }
          },
          repwd:function(value, item){ //value：表单的值、item：表单的DOM对象
            if($('#newpwd').val()!==value){
              return '两次输入的密码不一致';
            }
        },
    });

    //提交修改密码
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                layer.msg('密码更新成功！');
                $('.layui-form')[0].reset();
                console.log($('.layui-form'),$('.layui-form')[0])
            }
        });
    });
});