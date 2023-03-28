$(function(){
    let layer = layui.layer;
    let form = layui.form;
    let laypage = layui.laypage;
    let q={
            pagenum:1,
            pagesize:2,
            cate_id:'',
            state:'',
        }

    //定义时间过滤器
    template.defaults.imports.FormDate = function(date){
        let dt = new Date(date);

        let Y = dt.getFullYear();
        let M = bul(dt.getMonth() + 1);
        let D = bul(dt.getDate());
        let h = bul(dt.getHours());
        let m = bul(dt.getMinutes());
        let s = bul(dt.getSeconds());
        return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }

    //时间补零函数
    function bul(dt){
        return dt > 9 ? dt : "0" + dt;
    }

    //获取文章列表
    function getArtList(){
        $.ajax({
            method:"GET",
            url:"/my/article/list",
            data:q,
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message);
                }
                console.log(res);
                let lists = template('art-list-mol',res);
                $('tbody').empty().html(lists);
                renderPage(res.total);
            }
        });
    }
    getArtList();

    //获取文章分类筛选列表
    function getCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.mes(res.message);
                }
                let cateLists = template('cate-mol',res);
                $('select[name=cate_id]').html(cateLists);
                form.render();
            }
        });
    }
    getCateList();

    //实现筛选功能
    $('#search').on('submit',function(e){
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val();
        q.state = $('[name=state]').val();
        getArtList();
    });

    //实现分页功能
    function renderPage(total){
        laypage.render({
            elem:'page',
            count:total,
            limit:q.pagesize,
            curr:q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2,5,8,10],
            jump:function(obj,first){
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if(!first){
                    getArtList();
                }
            },
        });
    }
    //实现删除文章功能
    $('tbody').on('click','.layui-btn-danger',function(){
        let $id = $(this).attr('data-id');
        layer.confirm('确定要删除吗?', {icon: 3, title:'提示'}, function(index){
            
            let $len = $('.layui-btn-danger').length;
            console.log($(this));
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+$id,
                success:function(res){
                    if(res.status!==0){
                        layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    if($len===1){
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum -1;
                    }
                    getArtList();
                }
            });
            
            layer.close(index);
          });
    });
})

