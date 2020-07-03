! function(n, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : ((n = n || self).__vee_validate_locale__zh_CN = n.__vee_validate_locale__zh_CN || {}, n.__vee_validate_locale__zh_CN.js = e())
}(this, function() {
    "use strict";
    var n, e = {
        name: "zh_CN",
        messages: {
            _default: function(n) {
                return  "的值无效"
            },
            after: function(n, e) {
                var t = e[0];
                return n + "必须在" + t + "之后" + (e[1] ? "或等于" + t : "")
            },
            alpha: function(n) {
                return n + "只能包含字母字符"
            },
            alpha_dash: function(n) {
                return n + "能够包含字母数字字符、破折号和下划线"
            },
            alpha_num: function(n) {
                return n + "只能包含字母数字字符"
            },
            alpha_spaces: function(n) {
                return "只能包含字母字符和空格"
            },
            before: function(n, e) {
                var t = e[0];
                return n + "必须在" + t + "之前" + (e[1] ? "或等于" + t : "")
            },
            between: function(n, e) {
                return n + "必须在" + e[0] + "与" + e[1] + "之间"
            },
            confirmed: function(n, e) {
                return n + "不能和" + e[0] + "匹配"
            },
            credit_card: function(n) {
                return n + "的格式错误"
            },
            date_between: function(n, e) {
                return n + "必须在" + e[0] + "和" + e[1] + "之间"
            },
            date_format: function(n, e) {
                return n + "必须符合" + e[0] + "格式"
            },
            decimal: function(n, e) {
                void 0 === e && (e = []);
                var t = e[0];
                return void 0 === t && (t = "*"),  "必须是数字，且能够保留" + ("*" === t ? "" : t) + "位小数"
            },
            digits: function(n, e) {
                return n + "必须是数字，且精确到" + e[0] + "位数"
            },
            dimensions: function(n, e) {
                return n + "必须在" + e[0] + "像素与" + e[1] + "像素之间"
            },
            email: function(n) {
                return n + "不是一个有效的邮箱"
            },
            excluded: function(n) {
                return n + "不是一个有效值"
            },
            ext: function(n) {
                return n + "不是一个有效的文件"
            },
            image: function(n) {
                return n + "不是一张有效的图片"
            },
            included: function(n) {
                return n + "不是一个有效值"
            },
            integer: function(n) {
                return n + "必须是整数"
            },
            ip: function(n) {
                return n + "不是一个有效的地址"
            },
            length: function(n, e) {
                var t = e[0],
                    r = e[1];
                return r ?  "长度必须在" + t + "到" + r + "之间" : "长度至少为" + t
            },
            max: function(n, e) {
                return  "不能超过" + e[0] + "个字符"
            },
            max_value: function(n, e) {
                return n + "必须小于或等于" + e[0]
            },
            mimes: function(n) {
                return n + "不是一个有效的文件类型"
            },
            min: function(n, e) {
                return  "必须至少有"+ e[0] + "个字符"
            },
            min_value: function(n, e) {
                return n + "必须大于或等于" + e[0]
            },
            numeric: function(n) {
                return n + "只能包含数字字符"
            },
            regex: function(n) {
                return n + "格式无效"
            },
            required: function(n) {
                return  "不能为空"
            },
            size: function(n, e) {
                return n + "必须小于" + function(n) {
                    var e = 1024,
                        t = 0 === (n = Number(n) * e) ? 0 : Math.floor(Math.log(n) / Math.log(e));
                    return 1 * (n / Math.pow(e, t)).toFixed(2) + " " + ["Byte", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][t]
                }(e[0])
            },
            url: function(n) {
                return n + "不是一个有效的url"
            }
        },
        attributes: {}
    };
    return "undefined" != typeof VeeValidate && VeeValidate.Validator.localize(((n = {})[e.name] = e, n)), e
});