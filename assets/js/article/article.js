$(function () {
    let layer = layui.layer;
    let form = layui.form;
    getArtList();
    //渲染文章列表
    function getArtList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log(res);
                let list = template("art-cate-template", res);
                $('.layui-table tbody').empty().html(list);
            }
        });
    }
    //添加分类弹出层
    let indexAdd;
    $('#add-cate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#addCateForm').html(),
        });

    });
    //提交添加类别请求
    $('body').on('submit', '#addform', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res)
                if (res.status !== 0) {
                    layer.msg(res.message);
                }
                layer.msg(res.message);
                layer.close(indexAdd);
                getArtList();
            }
        });
    });
    //编辑弹出层
    let indexEdit;
    $('tbody').on('click', '#edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            , content: $('#editCateForm').html(),
        });
        let id = $(this).attr('data-id');
        //获取类别信息请求
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('editform', res.data);
            }
        });
    });
    // 点击提交修改
    $('body').on('submit', '#editform', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $('#editform').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                layer.close(indexEdit);
                getArtList();
            }
        });
    });
    //删除确认框
    let indexRemove;
    $('body').on('click', '.layui-btn-danger', function () {
        let id = $(this).attr('data-id');
        layer.confirm('确定要删除吗？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    getArtList();
                }
            })

            layer.close(index);
        });
        // indexRemove = layer.open({
        //     type:0,
        //     title: '确认',
        //     content: '确定要删除该分类吗',
        //     btn:['确认','取消'],
        //     yes:function(){
        //         $.ajax({
        //             method:'get',
        //             url:'/my/article/deletecate/'+id,
        //             success:function(res){
        //                 if(res.status!==0){
        //                     return layer.msg(res.message);
        //                 }
        //                 layer.msg(res.message);
        //                 getArtList();
        //             }
        //         })
        //     }
        //   });     

    });
});