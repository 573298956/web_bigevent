$(function () {
    let layer = layui.layer;
    let form = layui.form;
    getArtCate();
    // 初始化富文本编辑器
    initEditor()
    //渲染文章类别下拉框
    function getArtCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message);
                }
                let cateLists = template('cate-list', res);
                $('[name=cate_id]').html(cateLists);
                form.render();
            }
        });
    }



    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#chooseCov').on('click', function () {
        $('#coverFile').click();
    });

    $('#coverFile').on('change', function (e) {
        let files = e.target.files;
        if (files.length < 1) {
            return;
        }
        var newImgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    let art_state = '已发布';
    $('.layui-btn.layui-btn-primary').on('click', function (e) {
        art_state = '草稿';
    })
    $('#art-form').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData($(this)[0]);
        fd.append('state',art_state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img',blob);
                pubArt(fd);
            })
        
        
    });

    //文章发布请求
    function pubArt(fd){
        $.ajax({
            method:'POST',
            url:'/my/article/add',
            data:fd,
            processData:false,
            contentType:false,
            success:function(res){
                if(res.status!==0){
                    console.log(res);
                    return layer.msg(res.message);
                }
                console.log(res);
                layer.msg(res.message);
            }
        });
    }
});