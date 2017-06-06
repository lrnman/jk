/**
 * Created by Jerry on 2017/5/25.
 */

$(function () {
    sessionStorage.setItem('isSigned', true);

    sessionStorage.getItem('isSigned')? $('.online').removeClass('hidden') :
        $('.outline').removeClass('hidden');

    //头部加载完毕，绑定退出事件
    $('#log_out').on('click', function () {
        sessionStorage.removeItem('isSigned');
        $('.online').addClass('hidden');
        $('.outline').removeClass('hidden');
    });

    //模态窗的事件
    var $modal = $('#login_modal');
    $('.modal-login-click').on('click', function () {
        $modal.find('.modal-login').slideDown();
        $modal.find('.modal-register').hide().find(':input').prop('disabled', true);
        $modal.find('.form-change-1').attr('action', '/login');
        $modal.find('.input-change-1').attr('placeholder', '请输入手机账号');
        $modal.find('.botton-change-1').text('立即登录');
        $modal.modal('show');
    });

    $('.modal-register-click').on('click', function () {
        $modal.find('.modal-register').slideDown().find(':input').prop('disabled', false);
        $modal.find('.modal-login').hide();
        $modal.find('.form-change-1').attr('action', '/register');
        $modal.find('.input-change-1').attr('placeholder', '请输入手机号码');
        $modal.find('.botton-change-1').text('同意协议并注册');
        $modal.modal('show');
    });

    //sider
    $('#close_im').on('click',function(){
        $('#main-im').css("height","0");
        $('#im_main').hide();
        $('#open_im').show();
    });
    $('#open_im').on('click',function(e){
        $('#main-im').css("height","272");
        $('#im_main').show();
        $(this).hide();
    });
    $('.go-top').on('click',function(){
        $(window).scrollTop(0);
    });
    $(".weixing-container").on('mouseenter',function(){
        $('.weixing-show').show();
    })
    $(".weixing-container").on('mouseleave',function(){
        $('.weixing-show').hide();
    });

});



