/**
 * Created by Jerry on 2017/5/31.
 */
$(function () {
    $('button[type=submit]').on('click', function () {
        var step = $(this).parents('.form-box>div').addClass('hidden').index() + 1;
        $('.form-box>div:nth-child('+(step+1)+')').removeClass('hidden');
        $('.'+step+'-icon img').removeClass('gray');
        $('.process-text p:nth-child('+ step+')').addClass('hidden');
        $('.process-text p:nth-child('+ (step+1)+')').removeClass('hidden');
    });
});