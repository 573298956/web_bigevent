$(function(){
    getUserInfo();

    //登出功能
    $('.btnlogout').on('click',function(){
        layer.confirm('确定要退出吗？', {icon: 3, title:'确认'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = "../login.html";
            layer.close(index);
          });
    });
    
});
//获取用户信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||'',
        //     },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg(res.message);
            }
            rendAvatar(res.data);
            
        },
        
    })
}

//渲染头像
function rendAvatar(user){
    let username = user.nickname || user.username;
    $('.welcome').text('欢迎 '+username);

    if(user.user_pic !== null){
        $('.text-touxiang').hide();
        $('.layui-nav-img').attr('src',user.user_pic).show()
    }else{
        $('.layui-nav-img').hide()
        $('.text-touxiang').text(username[0].toUpperCase()).show();
    }
}