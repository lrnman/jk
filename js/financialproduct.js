/**
 * Created by Jerry on 2017/5/28.
 */

;(function() {
    function load (type, count, attr, order, cb) {
        function goInterval(date, obj,html) {
            var end = new Date(date);
            var now = new Date();
            var ms = end.getTime() - now.getTime();
            var ss = Math.floor(ms / 1000 % 60);
            var mm = Math.floor(ms / 1000 / 60 % 60);
            var hh = Math.floor(ms / 1000 / 60 / 60 % 24);
            if (ms <= 0) {
                html.hide();
                return;
            }

            var time = fix(ss, mm, hh);
            var $ss = obj.find('.ss').text(time.ss);
            var $mm = obj.find('.mm').text(time.mm);
            var $hh = obj.find('.hh').text(time.hh);

            var timeId = setInterval(function () {
                now = new Date();
                ms = end.getTime() - now.getTime();
                if (ms <= 0) {
                    clearInterval(timeId);
                    html.hide();
                    return;
                }

                ss = Math.floor(ms / 1000 % 60);
                mm = Math.floor(ms / 1000 / 60 % 60);
                hh = Math.floor(ms / 1000 / 60 / 60 % 24);

                time = fix(ss, mm, hh);
                $ss.text(time.ss);
                $mm.text(time.mm);
                $hh.text(time.hh);
            }, 1000);

            function fix (ss, mm, hh) {
                var sss = ss + '';
                sss = sss.length == 1 ? '0'+ sss : sss;
                var mms = mm + '';
                mms = mms.length == 1 ? '0'+ mms : mms;
                var hhs = hh + '';
                hhs = hhs.length == 1 ? '0'+ hhs : hhs;

                return {
                    ss: sss,
                    mm: mms,
                    hh: hhs
                }
            }
        }
        if (type == 'all') {
            $('.load_financialProduct').load('financialproduct_all.html', function () {
                $.get('date/dq-data.json', function (data, msg) {
                    var deadline = 'deadline';
                    var i = 0;
                    for (var key in data) {
                        if (i++ >= count) return;
                        var html = template('p-l-dq', data[key]);
                        if (deadline in data[key]) {
                            html = $(html);
                            obj = html.find('.deadline');
                            obj.removeClass('hidden');
                            goInterval(data[key][deadline], obj, html);
                        }
                        $('.product-list-2th .more').before(html);
                    }
                });
                $.get('date/zr-data.json', function (data, msg) {
                    var i = 0;
                    for (var key in data) {
                        if (i++ >= count) return;
                        var html = template('p-l-zr', data[key]);
                        $('.product-list-3th .more').before(html);
                    }
                });
            });
        } else if (type == 'dq') {
            $('.load_financialProduct').load('financialproduct_dq.html', function () {
                $.get('date/dq-data.json', function (data, msg) {
                    if (attr) {
                        data.sort(function (o1, o2) {
                            if (order == 0) {
                                //升序
                                return parseFloat(o2[attr]) - parseFloat(o1[attr]);
                            } else if (order == 1) {
                                //降序
                                return parseFloat(o1[attr]) - parseFloat(o2[attr]);
                            }
                        });
                    }
                    var deadline = 'deadline';
                    var i = 0;
                    for (var key in data) {
                        if (count || i++ >= count) return;
                        var html = template('p-l-dq', data[key]);
                        if (deadline in data[key]) {
                            html = $(html);
                            obj = html.find('.deadline');
                            obj.removeClass('hidden');
                            goInterval(data[key][deadline], obj, html);
                        }
                        $('.product-list-2th').append(html);
                    }
                });
                if (cb) {
                    cb();
                }
            });
        } else if (type == 'zr') {
            $('.load_financialProduct').load('financialproduct_zr.html', function () {
                $.get('date/zr-data.json', function (data, msg) {
                    if (attr) {
                        data.sort(function (o1, o2) {
                            if (order == 0) {
                                //升序
                                return parseFloat(o2[attr]) - parseFloat(o1[attr]);
                            } else if (order == 1) {
                                //降序
                                return parseFloat(o1[attr]) - parseFloat(o2[attr]);
                            }
                        });
                    }
                    var i = 0;
                    for (var key in data) {
                        if (count || i++ >= count) return;
                        var html = template('p-l-zr', data[key]);
                        $('.product-list-3th').append(html);
                    }
                });
                if (cb) {
                    cb();
                }
            });
        }
    }

    var allCount = 5;

    //all
    $('.header-nav').on('click', '.all', function(){
        load('all', allCount);
        $('.header-nav a').removeClass('current');
        $(this).addClass('current');
    });

    //dq
    function handleDQ() {
        load('dq');
        $('.header-nav a').removeClass('current');
        $('.header-nav .dq').addClass('current');
    }
    $('.header-nav').on('click', '.dq', handleDQ);
    $('.load_financialProduct').on('click', '.product-list-2th .more', handleDQ);

    //zr
    function handleZR(){
        load('zr');
        $('.header-nav a').removeClass('current');
        $('.header-nav .zr').addClass('current');
    }
    $('.header-nav').on('click', '.zr', handleZR);
    $('.load_financialProduct').on('click', '.product-list-3th .more', handleZR);

    //init
    load('all', allCount);

    //order
    function returnOrder(type, attr) {
        var i = 0;
        if (type == 'dq') {
            return function () {
                var index = i % 3;
                load('dq', undefined, attr, index, function () {
                    $('.product-list-dq .title-name-bar .'+attr).find('i').removeClass('current').eq(index).addClass('current');
                });
                i++;
            }
        }
        return function () {
            var index = i % 3;
            load('zr', undefined, attr, index, function () {
                $('.product-list-zr .title-name-bar .'+attr).find('i').removeClass('current').eq(index).addClass('current');
            });
            i++;
        }
    }
    $('.load_financialProduct').on('click', '.product-list-dq .rate .order', returnOrder('dq', 'rate'));
    $('.load_financialProduct').on('click', '.product-list-dq .date .order', returnOrder('dq', 'date'));
    $('.load_financialProduct').on('click', '.product-list-dq .money .order', returnOrder('dq', 'money'));

    $('.load_financialProduct').on('click', '.product-list-zr .rate .order', returnOrder('zr', 'rate'));
    $('.load_financialProduct').on('click', '.product-list-zr .date .order', returnOrder('zr', 'date'));
    $('.load_financialProduct').on('click', '.product-list-zr .money .order', returnOrder('zr', 'money'));
})();