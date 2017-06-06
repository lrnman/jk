/**
 * Created by Jerry on 2017/5/28.
 */
$(function () {
    $.get('date/dq-data.json', function (data, msg) {
        var html = "";
        var limit = 4;
        for (var key in data) {
            if(limit == 0) break;
            limit--;
            html += template('p-l', data[key]);
        }
        $('.product-list').append(html);
    });
});