(function () {
    var $,
        AbstractBaymaxItem,
        BaymaxInput,
        BaymaxTag,
        BaymaxNumberInput,
        BaymaxNumberTag,
        BaymaxSelect,
        BaymaxMultiSelect,
        BaymaxBaseSelect,
        BaymaxMultiBaseSelect,
        BaymaxRadio,
        BaymaxCheckbox,
        BaymaxFile,
        BaymaxMultifile,
        BaymaxDatetime,
        BaymaxDatetimeRange,
        BaymaxTextarea,
        BaymaxTable;

    $ = jQuery;

    var stringMaxLength = 500, textMaxLength = 2000, maxIntegerLength = 8, maxDecimalLength = 4;

    AbstractBaymaxItem = (function () {
        function AbstractBaymaxItem($item, options) {
            this.options = options != null ? options : {};
            if (!AbstractBaymaxItem.browser_is_supported()) {
                return;
            }
        };
        /*判断浏览器类型及版本*/
        AbstractBaymaxItem.browser_is_supported = function () {
            if (window.navigator.appName === "Microsoft Internet Explorer") {
                return document.documentMode >= 8;
            }
            if (/iP(od|hone)/i.test(window.navigator.userAgent)) {
                return false;
            }
            if (/Android/i.test(window.navigator.userAgent)) {
                if (/Mobile/i.test(window.navigator.userAgent)) {
                    return false;
                }
            }
            return true;
        };
        AbstractBaymaxItem.randomString = function (len) {
            len = len || 32;
            var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
            var maxPos = $chars.length;
            var str = '';
            for (var i = 0; i < len; i++) {
                str += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return str;
        };
        AbstractBaymaxItem.dateFormat = function (fmt, date) {
            var ret;
            var opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "M+": (date.getMonth() + 1).toString(),     // 月
                "D+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "m+": date.getMinutes().toString(),         // 分
                "s+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (var k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
                }
            }
            return fmt;
        };
        return AbstractBaymaxItem;
    })();

    BaymaxInput = (function () {
        function BaymaxInput($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                minLength: null,
                minLengthMessage: "",
                maxLength: null,
                maxLengthMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength'>最小长度</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' name='minLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + stringMaxLength + "' data-parsley-max-message='系统文字最大长度为" + stringMaxLength + "个字符！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' data-parsley-lte-message='最小长度不得大于最大长度！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message'>最小长度错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message' name='minLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength'>最大长度</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' name='maxLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + stringMaxLength + "' data-parsley-max-message='系统文字最大长度为" + stringMaxLength + "个字符！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' data-parsley-gte-message='最大长度不得小于最小长度！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message'>最大长度错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message' name='maxLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").hide();
                //     }
                // });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name).change();
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val("").change();
                // if (this.configs.minLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val(this.configs.minLength).change();
                //     if (this.configs.minLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val(this.configs.minLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val("").change();
                // if (this.configs.maxLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val(this.configs.maxLength).change();
                //     if (this.configs.maxLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val(this.configs.maxLengthMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: "[name$='-message']:hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }

                    // var minLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val();
                    // if (minLength) {
                    //     config.minLength = parseInt(minLength);
                    //     config.minLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val();
                    // } else {
                    //     config.minLength = null;
                    //     config.minLengthMessage = "";
                    // }
                    // var maxLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val();
                    // if (maxLength) {
                    //     config.maxLength = parseInt(maxLength);
                    //     config.maxLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val();
                    // } else {
                    //     config.maxLength = null;
                    //     config.maxLengthMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<input id='" + this.configs._id + "-input' type='text' class='form-control'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                if (this.configs.minLength) {
                    html += "data-parsley-minlength='" + this.configs.minLength + "'";
                    html += "data-parsley-minlength-message='" + this.configs.minLengthMessage + "！'";
                }
                if (this.configs.maxLength) {
                    html += "data-parsley-maxlength='" + this.configs.maxLength + "'";
                    html += "data-parsley-maxlength-message='" + this.configs.maxLengthMessage + "！'";
                } else {
                    html += "data-parsley-maxlength='" + stringMaxLength + "'";
                    html += "data-parsley-maxlength-message='最多填写" + stringMaxLength + "个字符！'"
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-input").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请填写";
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-required");
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-input").attr("data-parsley-required", "true");
                        $("#" + this.configs._id + "-input").attr("data-parsley-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-input").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    $("#" + this.configs._id + "-input").val(value);
                }
            };
            this.getValue = function () {
                var value = $("#" + this.configs._id + "-input").val();
                if (value) {
                    return value;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            $("#" + this.configs._id + "-input").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxInput;
    })(AbstractBaymaxItem);

    BaymaxTag = (function () {
        function BaymaxTag($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                minSize: null,
                minSizeMessage: "",
                maxSize: null,
                maxSizeMessage: "",
                minLength: null,
                minLengthMessage: "",
                maxLength: null,
                maxLengthMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize'>最小标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' name='minSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' data-parsley-lte-message='最小标签数不得大于最大标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message'>最小标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message' name='minSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize'>最大标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' name='maxSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' data-parsley-gte-message='最大标签数不得小于最小标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message'>最大标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message' name='maxSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength'>最小长度</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' name='minLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + stringMaxLength + "' data-parsley-max-message='系统文字最大长度为" + stringMaxLength + "个字符！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' data-parsley-lte-message='最小长度不得大于最大长度！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message'>最小长度错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message' name='minLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength'>最大长度</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' name='maxLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + stringMaxLength + "' data-parsley-max-message='系统文字最大长度为" + stringMaxLength + "个字符！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' data-parsley-gte-message='最大长度不得小于最小长度！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message'>最大长度错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message' name='maxLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").hide();
                //     }
                // });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val("").change();
                // if (this.configs.minSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val(this.configs.minSize).change();
                //     if (this.configs.minSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val(this.configs.minSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val("").change();
                // if (this.configs.maxSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val(this.configs.maxSize).change();
                //     if (this.configs.maxSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val(this.configs.maxSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val("").change();
                // if (this.configs.minLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val(this.configs.minLength).change();
                //     if (this.configs.minLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val(this.configs.minLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val("").change();
                // if (this.configs.maxLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val(this.configs.maxLength).change();
                //     if (this.configs.maxLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val(this.configs.maxLengthMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    // var minSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val();
                    // if (minSize) {
                    //     config.minSize = parseInt(minSize);
                    //     config.minSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val();
                    // } else {
                    //     config.minSize = null;
                    //     config.minSizeMessage = "";
                    // }
                    // var maxSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val();
                    // if (maxSize) {
                    //     config.maxSize = parseInt(maxSize);
                    //     config.maxSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val();
                    // } else {
                    //     config.maxSize = null;
                    //     config.maxSizeMessage = "";
                    // }
                    // var minLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val();
                    // if (minLength) {
                    //     config.minLength = parseInt(minLength);
                    //     config.minLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val();
                    // } else {
                    //     config.minLength = null;
                    //     config.minLengthMessage = "";
                    // }
                    // var maxLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val();
                    // if (maxLength) {
                    //     config.maxLength = parseInt(maxLength);
                    //     config.maxLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val();
                    // } else {
                    //     config.maxLength = null;
                    //     config.maxLengthMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<ul id='" + this.configs._id + "-ul' class='form-control'" + this._renderValidateHtml() + "></ul>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " data-parsley-validate-if-empty='true'";
                if (this.configs.minLength) {
                    html += "data-parsley-tagit-minLength='" + this.configs.minLength + "'";
                    html += "data-parsley-tagit-minLength-message='" + this.configs.minLengthMessage + "！'";
                }
                if (this.configs.maxLength) {
                    html += "data-parsley-tagit-maxLength='" + this.configs.maxLength + "'";
                    html += "data-parsley-tagit-maxLength-message='" + this.configs.maxLengthMessage + "！'";
                } else {
                    html += "data-parsley-tagit-maxLength='" + stringMaxLength + "'";
                    html += "data-parsley-tagit-maxLength-message='最多填写" + stringMaxLength + "个字符！'"
                }
                if (this.configs.minSize) {
                    html += "data-parsley-tagit-minSize='" + this.configs.minSize + "'";
                    html += "data-parsley-tagit-minSize-message='" + this.configs.minSizeMessage + "！'";
                }
                if (this.configs.maxSize) {
                    html += "data-parsley-tagit-maxSize='" + this.configs.maxSize + "'";
                    html += "data-parsley-tagit-maxSize-message='" + this.configs.maxSizeMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-ul").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请填写";
                    $("#" + this.configs._id + "-ul").removeAttr("data-parsley-tagit-required");
                    $("#" + this.configs._id + "-ul").removeAttr("data-parsley-tagit-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-ul").attr("data-parsley-tagit-required", "true");
                        $("#" + this.configs._id + "-ul").attr("data-parsley-tagit-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-ul").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (valueList) {
                if (valueList) {
                    for (var i = 0; i < valueList.length; i++) {
                        var value = valueList[i];
                        $("#" + this.configs._id + "-ul").tagit("createTag", value);
                    }
                }
            };
            this.getValue = function () {
                var value = $("#" + this.configs._id + "-ul").tagit("assignedTags");
                if (value && value.length > 0) {
                    return value;
                }
                return null;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            $("#" + this.configs._id + "-ul").tagit({
                beforeTagAdded: function () {
                },
                afterTagAdded: function (e) {
                    $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
                },
                beforeTagRemoved: function () {
                },
                afterTagRemoved: function (e) {
                    $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
                },
                onTagAdded: function () {
                },
                onTagRemoved: function () {
                },
                readOnly: !this.configs.writeable
            });
            return this;
        };
        return BaymaxTag;
    })(AbstractBaymaxItem);

    BaymaxNumberInput = (function () {
        function BaymaxNumberInput($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                minValue: null,
                minValueMessage: "",
                maxValue: null,
                maxValueMessage: "",
                isInteger: false,
                isIntegerMessage: "",
                minLength: null,
                minLengthMessage: "",
                maxLength: null,
                maxLengthMessage: "",
                minPointLength: null,
                minPointLengthMessage: "",
                maxPointLength: null,
                maxPointLengthMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue'>最小值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue' name='minValue' class='form-control' data-parsley-type='number' data-parsley-type-message='请填写数字！' data-parsley-maxintegerlength='" + maxIntegerLength + "' data-parsley-maxintegerlength='整数部分最多" + maxIntegerLength + "位！' data-parsley-maxdecimallength='" + maxDecimalLength + "' data-parsley-maxdecimallength='小数部分最多" + maxDecimalLength + "位！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue' data-parsley-lte-message='最小值不得大于最大值！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message'>最小值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message' name='minValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue'>最大值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue' name='maxValue' class='form-control' data-parsley-type='number' data-parsley-type-message='请填写数字！' data-parsley-maxintegerlength='" + maxIntegerLength + "' data-parsley-maxintegerlength='整数部分最多" + maxIntegerLength + "位！' data-parsley-maxdecimallength='" + maxDecimalLength + "' data-parsley-maxdecimallength='小数部分最多" + maxDecimalLength + "位！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue' data-parsley-gte-message='最大值不得小于最小值！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message'>最大值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message' name='maxValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger'>是否为整数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-1' value='1'/>是</label></div>";
                // html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-0' value='0'/>否</label></div>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message'>是否为整数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message' name='isInteger-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength'>最小整数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' name='minLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxIntegerLength + "' data-parsley-max-message='系统数字整数最大长度为" + maxIntegerLength + "位' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' data-parsley-lte-message='最小整数位数不得大于最大整数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message'>最小整数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message' name='minLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-div>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength'>最大整数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' name='maxLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxIntegerLength + "' data-parsley-max-message='系统数字整数最大长度为" + maxIntegerLength + "位' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' data-parsley-gte-message='最大整数位数不得小于最小整数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message'>最大整数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message' name='maxLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength'>最小小数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength' name='minPointLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxDecimalLength + "' data-parsley-max-message='系统数字小数最大长度为" + maxDecimalLength + "位' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength' data-parsley-lte-message='最小小数位数不得大于最大小数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message'>最小小数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message' name='minPointLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength'>最大小数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength' name='maxPointLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxDecimalLength + "' data-parsley-max-message='系统数字小数最大长度为" + maxDecimalLength + "位' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength' data-parsley-gte-message='最大小数位数不得小于最小小数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message'>最大小数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message' name='maxPointLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").hide();
                //     }
                // });
                // $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger']").change(function () {
                //     if (this.value == 0) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message-div").hide();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-div").show();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message-div").show();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val("").change();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-div").hide();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val("").change();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message-div").hide();
                //     }
                // });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val("").change();
                // if (this.configs.minValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val(this.configs.minValue).change();
                //     if (this.configs.minValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val(this.configs.minValueMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val("").change();
                // if (this.configs.maxValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val(this.configs.maxValue).change();
                //     if (this.configs.maxValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val(this.configs.maxValueMessage);
                //     }
                // }
                // if (this.configs.isInteger) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-1").attr("checked", "checked").change();
                //     if (this.configs.isIntegerMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message").val(this.configs.isIntegerMessage);
                //     }
                // } else {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-0").attr("checked", "checked").change();
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val("").change();
                // if (this.configs.minLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val(this.configs.minLength).change();
                //     if (this.configs.minLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val(this.configs.minLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val("").change();
                // if (this.configs.maxLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val(this.configs.maxLength).change();
                //     if (this.configs.maxLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val(this.configs.maxLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val("").change();
                // if (this.configs.minPointLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val(this.configs.minPointLength).change();
                //     if (this.configs.minPointLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message").val(this.configs.minPointLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val("").change();
                // if (this.configs.maxPointLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val(this.configs.maxPointLength).change();
                //     if (this.configs.maxPointLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message").val(this.configs.maxPointLengthMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    // var minValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val();
                    // if (minValue) {
                    //     config.minValue = parseInt(minValue);
                    //     config.minValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val();
                    // } else {
                    //     config.minValue = null;
                    //     config.minValueMessage = "";
                    // }
                    // var maxValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val();
                    // if (maxValue) {
                    //     config.maxValue = parseInt(maxValue);
                    //     config.maxValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val();
                    // } else {
                    //     config.maxValue = null;
                    //     config.maxValueMessage = "";
                    // }
                    // var isInteger = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger']:checked").val() == "1";
                    // config.isInteger = isInteger;
                    // if (isInteger) {
                    //     config.isIntegerMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message").val();
                    // } else {
                    //     config.isIntegerMessage = "";
                    // }
                    // var minLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val();
                    // if (minLength) {
                    //     config.minLength = parseInt(minLength);
                    //     config.minLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val();
                    // } else {
                    //     config.minLength = null;
                    //     config.minLengthMessage = "";
                    // }
                    // var maxLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val();
                    // if (maxLength) {
                    //     config.maxLength = parseInt(maxLength);
                    //     config.maxLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val();
                    // } else {
                    //     config.maxLength = null;
                    //     config.maxLengthMessage = "";
                    // }
                    // var minPointLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val();
                    // if (minPointLength) {
                    //     config.minPointLength = parseInt(minPointLength);
                    //     config.minPointLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message").val();
                    // } else {
                    //     config.minPointLength = null;
                    //     config.minPointLengthMessage = "";
                    // }
                    // var maxPointLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val();
                    // if (maxPointLength) {
                    //     config.maxPointLength = parseInt(maxPointLength);
                    //     config.maxPointLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message").val();
                    // } else {
                    //     config.maxPointLength = null;
                    //     config.maxPointLengthMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<input id='" + this.configs._id + "-input' type='text' class='form-control'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                if (this.configs.minValue) {
                    html += "data-parsley-min='" + this.configs.minValue + "'";
                    html += "data-parsley-min-message='" + this.configs.minValueMessage + "！'";
                }
                if (this.configs.maxValue) {
                    html += "data-parsley-max='" + this.configs.maxValue + "'";
                    html += "data-parsley-max-message='" + this.configs.maxValueMessage + "！'";
                }
                if (this.configs.isInteger) {
                    html += "data-parsley-type='integer'";
                    html += "data-parsley-type-message='" + this.configs.isIntegerMessage + "！'";
                } else {
                    html += "data-parsley-type='number'";
                    html += "data-parsley-type-message='请填写数字！'";
                }
                if (this.configs.minLength) {
                    html += "data-parsley-minintegerlength='" + this.configs.minLength + "'";
                    html += "data-parsley-minintegerlength-message='" + this.configs.minLengthMessage + "！'";
                }
                if (this.configs.maxLength) {
                    html += "data-parsley-maxintegerlength='" + this.configs.maxLength + "'";
                    html += "data-parsley-maxintegerlength-message='" + this.configs.maxLengthMessage + "！'";
                } else {
                    html += "data-parsley-maxintegerlength='" + maxIntegerLength + "'";
                    html += "data-parsley-maxintegerlength-message='整数部分不得多于" + maxIntegerLength + "位'";
                }
                if (this.configs.minPointLength) {
                    html += "data-parsley-mindecimallength='" + this.configs.minPointLength + "'";
                    html += "data-parsley-mindecimallength-message='" + this.configs.minPointLengthMessage + "！'";
                }
                if (this.configs.maxPointLength) {
                    html += "data-parsley-maxdecimallength='" + this.configs.maxPointLength + "'";
                    html += "data-parsley-maxdecimallength-message='" + this.configs.maxPointLengthMessage + "！'";
                } else {
                    html += "data-parsley-maxdecimallength='" + maxDecimalLength + "'";
                    html += "data-parsley-maxdecimallength-message='小数部分不得多于" + maxDecimalLength + "位'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-input").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请填写";
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-required");
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-input").attr("data-parsley-required", "true");
                        $("#" + this.configs._id + "-input").attr("data-parsley-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-input").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    $("#" + this.configs._id + "-input").val(value);
                }
            };
            this.getValue = function () {
                var value = $("#" + this.configs._id + "-input").val();
                if (value) {
                    return value;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            $("#" + this.configs._id + "-input").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxNumberInput;
    })(AbstractBaymaxItem);

    BaymaxNumberTag = (function () {
        function BaymaxNumberTag($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                minSize: null,
                minSizeMessage: "",
                maxSize: null,
                maxSizeMessage: "",
                minValue: null,
                minValueMessage: "",
                maxValue: null,
                maxValueMessage: "",
                isInteger: false,
                isIntegerMessage: "",
                minLength: null,
                minLengthMessage: "",
                maxLength: null,
                maxLengthMessage: "",
                minPointLength: null,
                minPointLengthMessage: "",
                maxPointLength: null,
                maxPointLengthMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize'>最小标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' name='minSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' data-parsley-lte-message='最小标签数不得大于最大标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message'>最小标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message' name='minSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize'>最大标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' name='maxSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' data-parsley-gte-message='最大标签数不得小于最小标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message'>最大标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message' name='maxSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue'>最小值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue' name='minValue' class='form-control' data-parsley-type='number' data-parsley-type-message='请填写数字！' data-parsley-maxintegerlength='" + maxIntegerLength + "' data-parsley-maxintegerlength='整数部分最多" + maxIntegerLength + "位！' data-parsley-maxdecimallength='" + maxDecimalLength + "' data-parsley-maxdecimallength='小数部分最多" + maxDecimalLength + "位！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue' data-parsley-lte-message='最小值不得大于最大值！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message'>最小值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message' name='minValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue'>最大值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue' name='maxValue' class='form-control' data-parsley-type='number' data-parsley-type-message='请填写数字！' data-parsley-maxintegerlength='" + maxIntegerLength + "' data-parsley-maxintegerlength='整数部分最多" + maxIntegerLength + "位！' data-parsley-maxdecimallength='" + maxDecimalLength + "' data-parsley-maxdecimallength='小数部分最多" + maxDecimalLength + "位！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue' data-parsley-gte-message='最大值不得小于最小值！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message'>最大值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message' name='maxValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger'>是否为整数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-1' value='1'/>是</label></div>";
                // html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-0' value='0'/>否</label></div>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength'>最小整数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' name='minLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxIntegerLength + "' data-parsley-max-message='系统数字整数最大长度为" + maxIntegerLength + "位' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' data-parsley-lte-message='最小整数位数不得大于最大整数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message'>最小整数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message' name='minLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-div>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength'>最大整数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' name='maxLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxIntegerLength + "' data-parsley-max-message='系统数字整数最大长度为" + maxIntegerLength + "位' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' data-parsley-gte-message='最大整数位数不得小于最小整数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message'>最大整数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message' name='maxLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength'>最小小数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength' name='minPointLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxDecimalLength + "' data-parsley-max-message='系统数字小数最大长度为" + maxDecimalLength + "位' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength' data-parsley-lte-message='最小小数位数不得大于最大小数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message'>最小小数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message' name='minPointLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength'>最大小数位数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength' name='maxPointLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-max='" + maxDecimalLength + "' data-parsley-max-message='系统数字小数最大长度为" + maxDecimalLength + "位' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength' data-parsley-gte-message='最大小数位数不得小于最小小数位数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message'>最大小数位数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message' name='maxPointLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").hide();
                //     }
                // });
                // $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger']").change(function () {
                //     if (this.value == 0) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message-div").hide();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-div").show();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message-div").show();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val("").change();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-div").hide();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val("").change();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message-div").hide();
                //     }
                // });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val("").change();
                // if (this.configs.minSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val(this.configs.minSize).change();
                //     if (this.configs.minSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val(this.configs.minSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val("").change();
                // if (this.configs.maxSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val(this.configs.maxSize).change();
                //     if (this.configs.maxSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val(this.configs.maxSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val("").change();
                // if (this.configs.minValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val(this.configs.minValue).change();
                //     if (this.configs.minValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val(this.configs.minValueMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val("").change();
                // if (this.configs.maxValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val(this.configs.maxValue).change();
                //     if (this.configs.maxValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val(this.configs.maxValueMessage);
                //     }
                // }
                // if (this.configs.isInteger) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-1").attr("checked", "checked").change();
                //     if (this.configs.isIntegerMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message").val(this.configs.isIntegerMessage);
                //     }
                // } else {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-0").attr("checked", "checked").change();
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val("").change();
                // if (this.configs.minLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val(this.configs.minLength).change();
                //     if (this.configs.minLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val(this.configs.minLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val("").change();
                // if (this.configs.maxLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val(this.configs.maxLength).change();
                //     if (this.configs.maxLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val(this.configs.maxLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val("").change();
                // if (this.configs.minPointLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val(this.configs.minPointLength).change();
                //     if (this.configs.minPointLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message").val(this.configs.minPointLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val("").change();
                // if (this.configs.maxPointLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val(this.configs.maxPointLength).change();
                //     if (this.configs.maxPointLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message").val(this.configs.maxPointLengthMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    // var minSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val();
                    // if (minSize) {
                    //     config.minSize = parseInt(minSize);
                    //     config.minSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val();
                    // } else {
                    //     config.minSize = null;
                    //     config.minSizeMessage = "";
                    // }
                    // var maxSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val();
                    // if (maxSize) {
                    //     config.maxSize = parseInt(maxSize);
                    //     config.maxSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val();
                    // } else {
                    //     config.maxSize = null;
                    //     config.maxSizeMessage = "";
                    // }
                    // var minValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val();
                    // if (minValue) {
                    //     config.minValue = parseInt(minValue);
                    //     config.minValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val();
                    // } else {
                    //     config.minValue = null;
                    //     config.minValueMessage = "";
                    // }
                    // var maxValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val();
                    // if (maxValue) {
                    //     config.maxValue = parseInt(maxValue);
                    //     config.maxValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val();
                    // } else {
                    //     config.maxValue = null;
                    //     config.maxValueMessage = "";
                    // }
                    // var isInteger = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger']:checked").val() == "1";
                    // config.isInteger = isInteger;
                    // if (isInteger) {
                    //     config.isIntegerMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isInteger-message").val();
                    // } else {
                    //     config.isIntegerMessage = "";
                    // }
                    // var minLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val();
                    // if (minLength) {
                    //     config.minLength = parseInt(minLength);
                    //     config.minLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val();
                    // } else {
                    //     config.minLength = null;
                    //     config.minLengthMessage = "";
                    // }
                    // var maxLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val();
                    // if (maxLength) {
                    //     config.maxLength = parseInt(maxLength);
                    //     config.maxLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val();
                    // } else {
                    //     config.maxLength = null;
                    //     config.maxLengthMessage = "";
                    // }
                    // var minPointLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength").val();
                    // if (minPointLength) {
                    //     config.minPointLength = parseInt(minPointLength);
                    //     config.minPointLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minPointLength-message").val();
                    // } else {
                    //     config.minPointLength = null;
                    //     config.minPointLengthMessage = "";
                    // }
                    // var maxPointLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength").val();
                    // if (maxPointLength) {
                    //     config.maxPointLength = parseInt(maxPointLength);
                    //     config.maxPointLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxPointLength-message").val();
                    // } else {
                    //     config.maxPointLength = null;
                    //     config.maxPointLengthMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<ul id='" + this.configs._id + "-ul' class='form-control'" + this._renderValidateHtml() + "></ul>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " data-parsley-validate-if-empty='true'";
                if (this.configs.minValue) {
                    html += "data-parsley-tagit-minvalue='" + this.configs.minValue + "'";
                    html += "data-parsley-tagit-minvalue-message='" + this.configs.minValueMessage + "！'";
                }
                if (this.configs.maxValue) {
                    html += "data-parsley-tagit-maxvalue='" + this.configs.maxValue + "'";
                    html += "data-parsley-tagit-maxvalue-message='" + this.configs.maxValueMessage + "！'";
                }
                if (this.configs.isInteger) {
                    html += "data-parsley-tagit-type='integer'";
                    html += "data-parsley-tagit-type-message='" + this.configs.isIntegerMessage + "！'";
                } else {
                    html += "data-parsley-tagit-type='number'";
                    html += "data-parsley-tagit-type-message='请填写数字！'";
                }
                if (this.configs.minLength) {
                    html += "data-parsley-tagit-minintegerlength='" + this.configs.minLength + "'";
                    html += "data-parsley-tagit-minintegerlength-message='" + this.configs.minLengthMessage + "！'";
                }
                if (this.configs.maxLength) {
                    html += "data-parsley-tagit-maxintegerlength='" + this.configs.maxLength + "'";
                    html += "data-parsley-tagit-maxintegerlength-message='" + this.configs.maxLengthMessage + "！'";
                } else {
                    html += "data-parsley-tagit-maxintegerlength='" + maxIntegerLength + "'";
                    html += "data-parsley-tagit-maxintegerlength-message='整数部分不得多于" + maxIntegerLength + "位'";
                }
                if (this.configs.minPointLength) {
                    html += "data-parsley-tagit-mindecimallength='" + this.configs.minPointLength + "'";
                    html += "data-parsley-tagit-mindecimallength-message='" + this.configs.minPointLengthMessage + "！'";
                }
                if (this.configs.maxPointLength) {
                    html += "data-parsley-tagit-maxdecimallength='" + this.configs.maxPointLength + "'";
                    html += "data-parsley-tagit-maxdecimallength-message='" + this.configs.maxPointLengthMessage + "！'";
                } else {
                    html += "data-parsley-tagit-maxdecimallength='" + maxDecimalLength + "'";
                    html += "data-parsley-tagit-maxdecimallength-message='小数部分不得多于" + maxDecimalLength + "位'";
                }
                if (this.configs.minSize) {
                    html += "data-parsley-tagit-minSize='" + this.configs.minSize + "'";
                    html += "data-parsley-tagit-minSize-message='" + this.configs.minSizeMessage + "！'";
                }
                if (this.configs.maxSize) {
                    html += "data-parsley-tagit-maxSize='" + this.configs.maxSize + "'";
                    html += "data-parsley-tagit-maxSize-message='" + this.configs.maxSizeMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-ul").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请填写";
                    $("#" + this.configs._id + "-ul").removeAttr("data-parsley-tagit-required");
                    $("#" + this.configs._id + "-ul").removeAttr("data-parsley-tagit-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-ul").attr("data-parsley-tagit-required", "true");
                        $("#" + this.configs._id + "-ul").attr("data-parsley-tagit-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-ul").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (valueList) {
                if (valueList) {
                    for (var i = 0; i < valueList.length; i++) {
                        var value = valueList[i];
                        $("#" + this.configs._id + "-ul").tagit("createTag", value);
                    }
                }
            };
            this.getValue = function () {
                var value = $("#" + this.configs._id + "-ul").tagit("assignedTags");
                if (value && value.length > 0) {
                    return value;
                }
                return null;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            $("#" + this.configs._id + "-ul").tagit({
                beforeTagAdded: function () {
                },
                afterTagAdded: function (e) {
                    $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
                },
                beforeTagRemoved: function () {
                },
                afterTagRemoved: function (e) {
                    $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
                },
                onTagAdded: function () {
                },
                onTagRemoved: function () {
                },
                readOnly: !this.configs.writeable
            });
            return this;
        };
        return BaymaxNumberTag;
    })(AbstractBaymaxItem);

    BaymaxSelect = (function () {
        function BaymaxSelect($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList'>选项</label>";
                html += "<div class='col-md-9'>";
                html += "<ul id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList' name='optionList' class='form-control' data-parsley-validate-if-empty='true' data-parsley-tagit-minSize='1' data-parsley-tagit-minSize-message='请填写！' data-parsley-tagit-maxLength='" + stringMaxLength + "' data-parsley-tagit-maxLength-message='最多输入" + stringMaxLength + "个字符'></ul>";
                html += "</div>";
                html += "</div>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                html += "</form>";
                $div.append(html);

                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit({
                    beforeTagAdded: function () {
                    },
                    afterTagAdded: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    beforeTagRemoved: function () {
                    },
                    afterTagRemoved: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    onTagAdded: function () {
                    },
                    onTagRemoved: function () {
                    },
                });

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                if (this.configs.optionList) {
                    for (var i = 0; i < this.configs.optionList.length; i++) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("createTag", this.configs.optionList[i].optionValue);
                    }
                }
                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    config.optionList = new Array();
                    var optionValues = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("assignedTags");
                    if (optionValues) {
                        for (var i = 0; i < optionValues.length; i++) {
                            config.optionList.push({optionValue: optionValues[i]});
                        }
                    }
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<input id='" + this.configs._id + "-input' class='form-control'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " data-parsley-validate-if-empty='true'";
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-input").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required");
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required", "true");
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-input").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    var data = {id: value, text: value};
                    $("#" + this.configs._id + "-input").select2("data", data);
                }
            };
            this.getValue = function () {
                var data = $("#" + this.configs._id + "-input").select2("data");
                if (data) {
                    var value = data.id;
                    return value;
                }
                return null;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var select2Config = {
                theme: "bootstrap",
                language: "zh-CN",
                placeholder: "请选择",
                allowClear: true,
                initSelection: function (element, callback) {
                },
                formatSelection: function (item) {
                    return item.text;
                },
            };
            select2Config.data = new Array();
            if (this.configs.optionList && this.configs.optionList.length > 0) {
                for (var i = 0; i < this.configs.optionList.length; i++) {
                    select2Config.data.push({
                        id: this.configs.optionList[i].optionValue,
                        text: this.configs.optionList[i].optionValue,
                    })
                }
            }
            $("#" + this.configs._id + "-input").select2(select2Config);
            $("#" + this.configs._id + "-input").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxSelect;
    })(AbstractBaymaxItem);

    BaymaxMultiSelect = (function () {
        function BaymaxMultiselect($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                minSize: null,
                minSizeMessage: "",
                maxSize: null,
                maxSizeMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList'>选项</label>";
                html += "<div class='col-md-9'>";
                html += "<ul id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList' name='optionList' class='form-control' data-parsley-validate-if-empty='true' data-parsley-tagit-minSize='1' data-parsley-tagit-minSize-message='请填写！' data-parsley-tagit-maxLength='" + stringMaxLength + "' data-parsley-tagit-maxLength-message='最多输入" + stringMaxLength + "个字符'></ul>";
                html += "</div>";
                html += "</div>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize'>最小选择数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' name='minSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' data-parsley-lte-message='最小标签数不得大于最大标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message'>最小选择数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message' name='minSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize'>最大选择数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' name='maxSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' data-parsley-gte-message='最大标签数不得小于最小标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message'>最大选择数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message' name='maxSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);
                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit({
                    beforeTagAdded: function () {
                    },
                    afterTagAdded: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    beforeTagRemoved: function () {
                    },
                    afterTagRemoved: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    onTagAdded: function () {
                    },
                    onTagRemoved: function () {
                    },
                });
                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").hide();
                //     }
                // });

                if (this.configs.optionList) {
                    for (var i = 0; i < this.configs.optionList.length; i++) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("createTag", this.configs.optionList[i].optionValue);
                    }
                }
                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val("").change();
                // if (this.configs.minSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val(this.configs.minSize).change();
                //     if (this.configs.minSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val(this.configs.minSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val("").change();
                // if (this.configs.maxSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val(this.configs.maxSize).change();
                //     if (this.configs.maxSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val(this.configs.maxSizeMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    config.optionList = new Array();
                    var optionValues = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("assignedTags");
                    if (optionValues) {
                        for (var i = 0; i < optionValues.length; i++) {
                            config.optionList.push({optionValue: optionValues[i]});
                        }
                    }
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    // var minSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val();
                    // if (minSize) {
                    //     config.minSize = parseInt(minSize);
                    //     config.minSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val();
                    // } else {
                    //     config.minSize = null;
                    //     config.minSizeMessage = "";
                    // }
                    // var maxSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val();
                    // if (maxSize) {
                    //     config.maxSize = parseInt(maxSize);
                    //     config.maxSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val();
                    // } else {
                    //     config.maxSize = null;
                    //     config.maxSizeMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<input id='" + this.configs._id + "-input' class='form-control'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " data-parsley-validate-if-empty='true'";
                if (this.configs.minSize) {
                    html += "data-parsley-select2-minSize='" + this.configs.minSize + "'";
                    html += "data-parsley-select2-minSize-message='" + this.configs.minSizeMessage + "！'";
                }
                if (this.configs.maxSize) {
                    html += "data-parsley-select2-maxSize='" + this.configs.maxSize + "'";
                    html += "data-parsley-select2-maxSize-message='" + this.configs.maxSizeMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-input").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required");
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required", "true");
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-input").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (valueList) {
                if (valueList && valueList.length > 0) {
                    var dataList = new Array();
                    if (valueList && valueList.length > 0) {
                        for (var i = 0; i < valueList.length; i++) {
                            var value = valueList[i];
                            if (value) {
                                var data = {id: value, text: value};
                                dataList.push(data);
                            }
                        }
                    }
                    $("#" + this.configs._id + "-input").select2("data", dataList);
                }
            };
            this.getValue = function () {
                var valueList = new Array();
                var dataList = $("#" + this.configs._id + "-input").select2("data");
                if (dataList && dataList.length > 0) {
                    for (var i = 0; i < dataList.length; i++) {
                        var data = dataList[i];
                        if (data) {
                            var value = data.id;
                            valueList.push(value);
                        }
                    }
                }
                if (valueList && valueList.length > 0) {
                    return valueList;
                } else {
                    return null;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var select2Config = {
                theme: "bootstrap",
                language: "zh-CN",
                placeholder: "请选择",
                allowClear: true,
                multiple: true,
                initSelection: function (element, callback) {
                },
                formatSelection: function (item) {
                    return item.text;
                },
            };
            select2Config.data = new Array();
            if (this.configs.optionList && this.configs.optionList.length > 0) {
                for (var i = 0; i < this.configs.optionList.length; i++) {
                    select2Config.data.push({
                        id: this.configs.optionList[i].optionValue,
                        text: this.configs.optionList[i].optionValue,
                    })
                }
            }
            $("#" + this.configs._id + "-input").select2(select2Config);
            $("#" + this.configs._id + "-input").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxMultiselect;
    })(AbstractBaymaxItem);

    BaymaxBaseSelect = (function () {
        function BaymaxBaseSelect($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                baseType: "",
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType'>字典类型</label>";
                html += "<div class='col-md-9'>";
                html += "<select id='" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType' name='baseType' class='form-control' data-parsley-required='true' data-parsley-required-message='请选择！'>";
                html += "<option value=''>--请选择--</option>";
                if (baseTypeArray && baseTypeArray.length > 0) {
                    for (var i = 0; i < baseTypeArray.length; i++) {
                        html += "<option value='" + baseTypeArray[i].type + "'>" + baseTypeArray[i].name + "</option>";
                    }
                }
                html += "</select>";
                html += "</div>";
                html += "</div>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                html += "</form>";
                $div.append(html);

                if (inPageFlag) {
                    $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                        if (this.value == 0) {
                            $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                            $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                        } else {
                            $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                        }
                    });
                }

                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType").val(this.configs.baseType).change();
                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    config.baseType = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType").val();
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<input id='" + this.configs._id + "-input' class='form-control'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " data-parsley-validate-if-empty='true'";
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-input").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required");
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required", "true");
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-input").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    var data = {id: value.idStr, text: value.name, data: {idStr: value.idStr, name: value.name, baseType: value.baseType}};
                    $("#" + this.configs._id + "-input").select2("data", data);
                }
            };
            this.getValue = function () {
                var data = $("#" + this.configs._id + "-input").select2("data");
                if (data) {
                    var value = {idStr: data.data.idStr, baseType: data.data.type, name: data.data.name};
                    if (data.data && data.data.id) {
                        value.id = data.data.id;
                    }
                    return value;
                }
                return null;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var select2Config = {
                theme: "bootstrap",
                language: "zh-CN",
                placeholder: "请选择",
                allowClear: true,
                initSelection: function (element, callback) {
                },
                formatSelection: function (item) {
                    return item.text;
                },
            };
            var baseTypes = new Array();
            baseTypes.push(this.configs.baseType);
            select2Config.ajax = {
                url: "/front/base/list",
                params: {
                    contentType: "application/json; charset=utf-8"
                },
                dataType: 'json',
                type: "post",
                data: function (param, page) {
                    return JSON.stringify({
                        baseTypes: baseTypes,
                        query: {
                            nameLike: param
                        },
                        page: {
                            pageSize: 10,
                            pageIndex: page
                        }
                    });
                },
                results: function (data, page) { // parse the results into the format expected by Select2.
                    var results = new Array();
                    var more = false;
                    if (data.statusCode && data.statusCode == "SUCCESS") {
                        if (data.result.list) {
                            for (var i = 0; i < data.result.list.length; i++) {
                                results.push({
                                    id: data.result.list[i].idStr,
                                    text: data.result.list[i].name,
                                    data: data.result.list[i]
                                })
                            }
                        }
                        if (data.result.page) {
                            more = data.result.page.pageIndex < data.result.page.pageCount
                        }
                    }
                    return {
                        results: results,
                        more: more
                    };
                },
                cache: true
            }
            $("#" + this.configs._id + "-input").select2(select2Config);
            $("#" + this.configs._id + "-input").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxBaseSelect;
    })(AbstractBaymaxItem);

    BaymaxMultiBaseSelect = (function () {
        function BaymaxMultiBaseSelect($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                baseType: "",
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                minSize: null,
                minSizeMessage: "",
                maxSize: null,
                maxSizeMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType'>字典类型</label>";
                html += "<div class='col-md-9'>";
                html += "<select id='" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType' name='baseType' class='form-control' data-parsley-required='true' data-parsley-required-message='请选择！'>";
                html += "<option value=''>--请选择--</option>";
                if (baseTypeArray && baseTypeArray.length > 0) {
                    for (var i = 0; i < baseTypeArray.length; i++) {
                        html += "<option value='" + baseTypeArray[i].type + "'>" + baseTypeArray[i].name + "</option>";
                    }
                }
                html += "</select>";
                html += "</div>";
                html += "</div>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize'>最小选择数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' name='minSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' data-parsley-lte-message='最小标签数不得大于最大标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message'>最小选择数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message' name='minSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize'>最大选择数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' name='maxSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' data-parsley-gte-message='最大标签数不得小于最小标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message'>最大选择数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message' name='maxSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").hide();
                //     }
                // });

                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType").val(this.configs.baseType).change();
                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val("").change();
                // if (this.configs.minSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val(this.configs.minSize).change();
                //     if (this.configs.minSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val(this.configs.minSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val("").change();
                // if (this.configs.maxSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val(this.configs.maxSize).change();
                //     if (this.configs.maxSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val(this.configs.maxSizeMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    config.baseType = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-baseType").val();
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    // var minSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val();
                    // if (minSize) {
                    //     config.minSize = parseInt(minSize);
                    //     config.minSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val();
                    // } else {
                    //     config.minSize = null;
                    //     config.minSizeMessage = "";
                    // }
                    // var maxSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val();
                    // if (maxSize) {
                    //     config.maxSize = parseInt(maxSize);
                    //     config.maxSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val();
                    // } else {
                    //     config.maxSize = null;
                    //     config.maxSizeMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<input id='" + this.configs._id + "-input' class='form-control'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " data-parsley-validate-if-empty='true'";
                if (this.configs.minSize) {
                    html += "data-parsley-select2-minSize='" + this.configs.minSize + "'";
                    html += "data-parsley-select2-minSize-message='" + this.configs.minSizeMessage + "！'";
                }
                if (this.configs.maxSize) {
                    html += "data-parsley-select2-maxSize='" + this.configs.maxSize + "'";
                    html += "data-parsley-select2-maxSize-message='" + this.configs.maxSizeMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-input").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required");
                    $("#" + this.configs._id + "-input").removeAttr("data-parsley-select2-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required", "true");
                        $("#" + this.configs._id + "-input").attr("data-parsley-select2-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-input").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (valueList) {
                if (valueList && valueList.length > 0) {
                    var dataList = new Array();
                    for (var i = 0; i < valueList.length; i++) {
                        var value = valueList[i];
                        var data = {id: value.idStr, text: value.name, data: {idStr: value.idStr, name: value.name, baseType: value.baseType}};
                        dataList.push(data)
                    }
                    $("#" + this.configs._id + "-input").select2("data", dataList);
                }
            };
            this.getValue = function () {
                var valueList = new Array();
                var dataList = $("#" + this.configs._id + "-input").select2("data");
                if (dataList && dataList.length > 0) {
                    for (var i = 0; i < dataList.length; i++) {
                        var data = dataList[i];
                        if (data) {
                            var value = {idStr: data.data.idStr, baseType: data.data.type, name: data.data.name};
                            if (data.data && data.data.id) {
                                value.id = data.data.id;
                            }
                            valueList.push(value);
                        }
                    }
                }
                if (valueList && valueList.length > 0) {
                    return valueList;
                } else {
                    return null;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var select2Config = {
                theme: "bootstrap",
                language: "zh-CN",
                placeholder: "请选择",
                allowClear: true,
                multiple: true,
                initSelection: function (element, callback) {
                },
                formatSelection: function (item) {
                    return item.text;
                },
            };
            var baseTypes = new Array();
            baseTypes.push(this.configs.baseType);
            select2Config.ajax = {
                url: "/front/base/list",
                params: {
                    contentType: "application/json; charset=utf-8"
                },
                dataType: 'json',
                type: "post",
                data: function (param, page) {
                    return JSON.stringify({
                        baseTypes: baseTypes,
                        query: {
                            nameLike: param
                        },
                        page: {
                            pageSize: 10,
                            pageIndex: page
                        }
                    });
                },
                results: function (data, page) { // parse the results into the format expected by Select2.
                    var results = new Array();
                    var more = false;
                    if (data.statusCode && data.statusCode == "SUCCESS") {
                        if (data.result.list) {
                            for (var i = 0; i < data.result.list.length; i++) {
                                results.push({
                                    id: data.result.list[i].idStr,
                                    text: data.result.list[i].name,
                                    data: data.result.list[i]
                                })
                            }
                        }
                        if (data.result.page) {
                            more = data.result.page.pageIndex < data.result.page.pageCount
                        }
                    }
                    return {
                        results: results,
                        more: more
                    };
                },
                cache: true
            }
            $("#" + this.configs._id + "-input").select2(select2Config);
            $("#" + this.configs._id + "-input").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxMultiBaseSelect;
    })(AbstractBaymaxItem);

    BaymaxRadio = (function () {
        function BaymaxRadio($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList'>选项</label>";
                html += "<div class='col-md-9'>";
                html += "<ul id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList' name='optionList' class='form-control' data-parsley-validate-if-empty='true' data-parsley-tagit-minSize='1' data-parsley-tagit-minSize-message='请填写！' data-parsley-tagit-maxLength='" + stringMaxLength + "' data-parsley-tagit-maxLength-message='最多输入" + stringMaxLength + "个字符'></ul>";
                html += "</div>";
                html += "</div>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                html += "</form>";
                $div.append(html);

                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit({
                    beforeTagAdded: function () {
                    },
                    afterTagAdded: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    beforeTagRemoved: function () {
                    },
                    afterTagRemoved: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    onTagAdded: function () {
                    },
                    onTagRemoved: function () {
                    },
                });

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }

                if (this.configs.optionList) {
                    for (var i = 0; i < this.configs.optionList.length; i++) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("createTag", this.configs.optionList[i].optionValue);
                    }
                }
                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    config.optionList = new Array();
                    var optionValues = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("assignedTags");
                    if (optionValues) {
                        for (var i = 0; i < optionValues.length; i++) {
                            config.optionList.push({optionValue: optionValues[i]});
                        }
                    }
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<div id='" + this.configs._id + "-optionList'>";
                if (this.configs.optionList && this.configs.optionList.length > 0) {
                    for (var i = 0; i < this.configs.optionList.length; i++) {
                        var option = this.configs.optionList[i];
                        html += "<div class='radio-inline'><label><input type='radio' name='" + this.configs._id + "-radio' value='" + option["optionValue"] + "'" + this._renderValidateHtml();
                        if (!this.configs.writeable) {
                            html += " disabled "
                        }
                        html += "/>" + option["optionValue"] + "</label></div>";
                    }
                }
                html += "</div>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " data-parsley-multiple='" + this.configs._id + "-radio'";
                if (this.configs.isRequired) {
                    html += "data-parsley-required='true'";
                    html += "data-parsley-required-message='" + this.configs.isRequiredMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("[name='" + this.configs._id + "-radio']").each(function () {
                    $(this).parsley().reset();
                });
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    var isRequiredMessage = this.configs.isRequiredMessage;
                    $("[name='" + this.configs._id + "-radio']").each(function () {
                        $(this).removeAttr("data-parsley-required");
                        $(this).removeAttr("data-parsley-required-message");
                        if (flag) {
                            $(this).attr("data-parsley-required", "true");
                            $(this).attr("data-parsley-required-message", isRequiredMessage + "！");
                        }
                    });
                }
                var validate = true;
                $("[name='" + this.configs._id + "-radio']").each(function () {
                    validate = validate && $(this).parsley({inputs: "input,select,textarea,ul,table"}).validate();
                });
                return validate;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                    var optionListHtml = "";
                    if (this.configs.optionList && this.configs.optionList.length > 0) {
                        for (var i = 0; i < this.configs.optionList.length; i++) {
                            var option = this.configs.optionList[i];
                            optionListHtml += "<div class='radio-inline'><label><input type='radio' name='" + this.configs._id + "-radio' value='" + option["optionValue"] + "'/>" + option["optionValue"] + "</label></div>";
                        }
                    }
                    $("#" + this.configs._id + "-optionList").html(optionListHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    $("[name = '" + this.configs._id + "-radio']").each(function () {
                        if ($(this).val() == value) {
                            $(this).attr("checked", "checked");
                        }
                    });
                }
            };
            this.getValue = function () {
                var value = null;
                $("[name = '" + this.configs._id + "-radio']:checked").each(function () {
                    value = $(this).val();
                });
                return value;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            $("[name='" + this.configs._id + "-radio']").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxRadio;
    })(AbstractBaymaxItem);

    BaymaxCheckbox = (function () {
        function BaymaxCheckbox($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                minSize: null,
                minSizeMessage: "",
                maxSize: null,
                maxSizeMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList'>选项</label>";
                html += "<div class='col-md-9'>";
                html += "<ul id='" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList' name='optionList' class='form-control' data-parsley-validate-if-empty='true' data-parsley-tagit-minSize='1' data-parsley-tagit-minSize-message='请填写！' data-parsley-tagit-maxLength='" + stringMaxLength + "' data-parsley-tagit-maxLength-message='最多输入" + stringMaxLength + "个字符'></ul>";
                html += "</div>";
                html += "</div>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize'>最小选择数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' name='minSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' data-parsley-lte-message='最小标签数不得大于最大标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message'>最小选择数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message' name='minSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize'>最大选择数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' name='maxSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' data-parsley-gte-message='最大标签数不得小于最小标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message'>最大选择数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message' name='maxSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit({
                    beforeTagAdded: function () {
                    },
                    afterTagAdded: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    beforeTagRemoved: function () {
                    },
                    afterTagRemoved: function () {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").parsley({inputs: "input,select,textarea,ul,table"}).validate();
                    },
                    onTagAdded: function () {
                    },
                    onTagRemoved: function () {
                    },
                });

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").hide();
                //     }
                // });

                if (this.configs.optionList) {
                    for (var i = 0; i < this.configs.optionList.length; i++) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("createTag", this.configs.optionList[i].optionValue);
                    }
                }
                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val("").change();
                // if (this.configs.minSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val(this.configs.minSize).change();
                //     if (this.configs.minSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val(this.configs.minSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val("").change();
                // if (this.configs.maxSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val(this.configs.maxSize).change();
                //     if (this.configs.maxSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val(this.configs.maxSizeMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    config.optionList = new Array();
                    var optionValues = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-optionList").tagit("assignedTags");
                    if (optionValues) {
                        for (var i = 0; i < optionValues.length; i++) {
                            config.optionList.push({optionValue: optionValues[i]});
                        }
                    }
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    // var minSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val();
                    // if (minSize) {
                    //     config.minSize = parseInt(minSize);
                    //     config.minSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val();
                    // } else {
                    //     config.minSize = null;
                    //     config.minSizeMessage = "";
                    // }
                    // var maxSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val();
                    // if (maxSize) {
                    //     config.maxSize = parseInt(maxSize);
                    //     config.maxSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val();
                    // } else {
                    //     config.maxSize = null;
                    //     config.maxSizeMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<div  id='" + this.configs._id + "-optionList'>";
                if (this.configs.optionList && this.configs.optionList.length > 0) {
                    for (var i = 0; i < this.configs.optionList.length; i++) {
                        var option = this.configs.optionList[i];
                        html += "<div class='checkbox-inline'><label><input type='checkbox' name='" + this.configs._id + "-checkbox' value='" + option["optionValue"] + "'" + this._renderValidateHtml();
                        if (!this.configs.writeable) {
                            html += " disabled "
                        }
                        html += "/>" + option["optionValue"] + "</label></div>";
                    }
                }
                html += "</div>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " data-parsley-multiple='" + this.configs._id + "-checkbox'";
                if (this.configs.minSize) {
                    html += "data-parsley-mincheck='" + this.configs.minSize + "'";
                    html += "data-parsley-mincheck-message='" + this.configs.minSizeMessage + "！'";
                }
                if (this.configs.maxSize) {
                    html += "data-parsley-maxcheck='" + this.configs.maxSize + "'";
                    html += "data-parsley-maxcheck-message='" + this.configs.maxSizeMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("[name='" + this.configs._id + "-checkbox']").each(function () {
                    $(this).parsley().reset();
                });
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    var isRequiredMessage = this.configs.isRequiredMessage;
                    $("[name='" + this.configs._id + "-checkbox']").each(function () {
                        $(this).removeAttr("data-parsley-required");
                        $(this).removeAttr("data-parsley-required-message");
                        if (flag) {
                            $(this).attr("data-parsley-required", "true");
                            $(this).attr("data-parsley-required-message", isRequiredMessage + "！");
                        }
                    });
                }
                var validate = true;
                $("[name='" + this.configs._id + "-checkbox']").each(function () {
                    validate = validate && $(this).parsley({inputs: "input,select,textarea,ul,table"}).validate();
                });
                return validate;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                    var optionListHtml = "";
                    if (this.configs.optionList && this.configs.optionList.length > 0) {
                        for (var i = 0; i < this.configs.optionList.length; i++) {
                            var option = this.configs.optionList[i];
                            optionListHtml += "<div class='checkbox-inline'><label><input type='checkbox' name='" + this.configs._id + "-checkbox' value='" + option["optionValue"] + "'/>" + option["optionValue"] + "</label></div>";
                        }
                    }
                    $("#" + this.configs._id + "-optionList").html(optionListHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (valueList) {
                if (valueList) {
                    $("[name = '" + this.configs._id + "-checkbox']").each(function () {
                        if (valueList.indexOf($(this).val()) >= 0) {
                            $(this).attr("checked", "checked");
                        }
                    });
                }
            };
            this.getValue = function () {
                var valueList = new Array();
                $("[name = '" + this.configs._id + "-checkbox']:checked").each(function () {
                    valueList.push($(this).val());
                });
                if (valueList && valueList.length > 0) {
                    return valueList;
                } else {
                    return null;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            $("[name='" + this.configs._id + "-checkbox']").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxCheckbox;
    })(AbstractBaymaxItem);

    BaymaxFile = (function () {
        function BaymaxFile($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 12,
                height: 2,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 2,
                minWidth: 12,
                minHeight: 2,
                isRequired: false,
                isRequiredMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: "[name$='-message']:hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }

                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<div id='" + this.configs._id + "-file-list' name='file-list'>";
                if (this.configs.writeable) {
                    html += "<form id='" + this.configs._id + "-file-add' action='/admin/tempFile/upload' name='file-add'>";
                    html += "<input id='" + this.configs._id + "-file-add-input' name='file-add-input' type='file'/>";
                    html += "<span class='fa fa-plus' id='" + this.configs._id + "-file-add-span' name='file-add-span'></span>";
                    html += "</form>";
                }
                html += "<ul id='" + this.configs._id + "-file-container' name='file-container'" + this._renderValidateHtml() + "></ul>"
                html += "</ul>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " data-parsley-validate-if-empty='true'";
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-file-container").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请上传";
                    $("#" + this.configs._id + "-file-container").removeAttr("data-parsley-file-required");
                    $("#" + this.configs._id + "-file-container").removeAttr("data-parsley-file-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-file-container").attr("data-parsley-file-required", "true");
                        $("#" + this.configs._id + "-file-container").attr("data-parsley-file-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-file-container").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value && value.material) {
                    var suffix = value.material.name.substring(value.material.name.lastIndexOf(".") + 1, value.material.name.length);
                    var html = "";
                    html += "<div name='file'>";
                    if (suffixMap[suffix] == "word") {
                        html += "<img src='/static/image/material/word.png'>";
                    } else if (suffixMap[suffix] == "excel") {
                        html += "<img src='/static/image/material/excel.png'>";
                    } else if (suffixMap[suffix] == "powerPoint") {
                        html += "<img src='/static/image/material/ppt.png'>";
                    } else if (suffixMap[suffix] == "portableDocumentFormat") {
                        html += "<img src='/static/image/material/pdf.png'>";
                    } else if (suffixMap[suffix] == "image") {
                        html += "<img src='/static/image/material/image.png'>";
                    } else if (suffixMap[suffix] == "audio") {
                        html += "<img src='/static/image/material/audio.png'>";
                    } else if (suffixMap[suffix] == "video") {
                        html += "<img src='/static/image/material/video.png'>";
                    } else {
                        html += "<img src='/static/image/material/other.png'>";
                    }
                    html += "<p>" + value.material.name + "</p>";
                    html += "<div name='file-mask'></div>";
                    if (this.configs.writeable) {
                        html += "<button class='btn btn-danger btn-icon btn-circle btn-sm' name='deleteFileButton'><i class='fa fa-times'></i></button>";
                    }
                    html += "</div>";
                    $("#" + this.configs._id + "-file-container").append(html);
                    $("#" + this.configs._id + "-file-container>div[name='file']").first().data("file", value);
                    $('#' + this.configs._id + '-file-add').hide();
                }
            };
            this.getValue = function () {
                var file = null;
                $("#" + this.configs._id + "-file-container>div[name='file']").each(function () {
                    file = $(this).data("file");
                });
                if (file) {
                    return file;
                } else {
                    return null;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var configs_id = this.configs._id;
            $("body").on("click", "#" + this.configs._id + "-file-container button[name='deleteFileButton']", function () {
                $(this).parent("div").remove();
                $('#' + configs_id + '-file-add').show();
                $('#' + configs_id + '-file-container').parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            if (this.configs.writeable) {
                $('#' + this.configs._id + '-file-add').fileupload({
                    autoUpload: true,
                    filesContainer: '#' + this.configs._id + '-file-container',
                    progress: function (e, data) {
                        $('#' + configs_id + '-file-add').hide();
                        if (e.isDefaultPrevented()) {
                            return false;
                        }
                        var progress = Math.floor(data.loaded / data.total * 100);
                        var percent = 100 - progress;
                        if (data.context) {
                            data.context.each(function () {
                                $(this).find("div[name='file-progress']").children(".progressing").first().css('height', percent + '%');
                            });
                        }
                    },
                    done: function (e, data) {
                        $('#' + configs_id + '-file-add').hide();
                        if (e.isDefaultPrevented()) {
                            return false;
                        }
                        var that = $(this).data('blueimp-fileupload') ||
                            $(this).data('fileupload'),
                            deferred;
                        if (data.context) {
                            data.context.each(function (index) {
                                deferred = that._addFinishedDeferreds();
                                $(this).find("div[name='file-progress']").children(".progressing").first().css('height', '0%');
                                $(this).find("div[name='file-progress']").children().first().removeClass("progressing");
                                $(this).find("div[name='file-progress']").children().first().addClass("success");
                                if (data.result && data.result.statusCode == "SUCCESS" && data.result.result && data.result.result.tempFile) {
                                    $(this).data("file", {tempFile: data.result.result.tempFile})
                                    var suffix = data.result.result.tempFile.suffix;
                                    if (suffix && suffix.replace(".", "") && suffixMap[suffix.replace(".", "")] == "image") {
                                        $(this).find("img").attr("src", data.result.result.tempFile.url);
                                    }
                                    $('#' + configs_id + '-file-container').parsley({inputs: "input,select,textarea,ul,table"}).validate();
                                }
                            });
                        }
                    }
                });
            }
            return this;
        };
        return BaymaxFile;
    })(AbstractBaymaxItem);

    BaymaxMultifile = (function () {
        function BaymaxMultifile($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 12,
                height: 2,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 2,
                minWidth: 12,
                minHeight: 2,
                isRequired: false,
                isRequiredMessage: "",
                minSize: null,
                minSizeMessage: "",
                maxSize: null,
                maxSizeMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize'>最小标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' name='minSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' data-parsley-lte-message='最小标签数不得大于最大标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message'>最小标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message' name='minSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize'>最大标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize' name='maxSize' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize' data-parsley-gte-message='最大标签数不得小于最小标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message'>最大标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message' name='maxSize-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message-div").hide();
                //     }
                // });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val("").change();
                // if (this.configs.minSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val(this.configs.minSize).change();
                //     if (this.configs.minSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val(this.configs.minSizeMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val("").change();
                // if (this.configs.maxSize) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val(this.configs.maxSize).change();
                //     if (this.configs.maxSizeMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val(this.configs.maxSizeMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    // var minSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize").val();
                    // if (minSize) {
                    //     config.minSize = parseInt(minSize);
                    //     config.minSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minSize-message").val();
                    // } else {
                    //     config.minSize = null;
                    //     config.minSizeMessage = "";
                    // }
                    // var maxSize = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize").val();
                    // if (maxSize) {
                    //     config.maxSize = parseInt(maxSize);
                    //     config.maxSizeMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxSize-message").val();
                    // } else {
                    //     config.maxSize = null;
                    //     config.maxSizeMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<div id='" + this.configs._id + "-file-list' name='file-list'>";
                if (this.configs.writeable) {
                    html += "<form id='" + this.configs._id + "-file-add' action='/admin/tempFile/upload' name='file-add'>";
                    html += "<input id='" + this.configs._id + "-file-add-input' name='file-add-input' type='file' multiple/>";
                    html += "<span class='fa fa-plus' id='" + this.configs._id + "-file-add-span' name='file-add-span'></span>";
                    html += "</form>";
                }
                html += "<ul id='" + this.configs._id + "-file-container' name='file-container'" + this._renderValidateHtml() + "></ul>"
                html += "</ul>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " data-parsley-validate-if-empty='true'";
                if (this.configs.minSize) {
                    html += "data-parsley-file-minSize='" + this.configs.minSize + "'";
                    html += "data-parsley-file-minSize-message='" + this.configs.minSizeMessage + "！'";
                }
                if (this.configs.maxSize) {
                    html += "data-parsley-file-maxSize='" + this.configs.maxSize + "'";
                    html += "data-parsley-file-maxSize-message='" + this.configs.maxSizeMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-file-container").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请上传";
                    $("#" + this.configs._id + "-file-container").removeAttr("data-parsley-file-required");
                    $("#" + this.configs._id + "-file-container").removeAttr("data-parsley-file-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-file-container").attr("data-parsley-file-required", "true");
                        $("#" + this.configs._id + "-file-container").attr("data-parsley-file-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-file-container").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (valueList) {
                if (valueList && valueList.length > 0) {
                    for (var i = 0; i < valueList.length; i++) {
                        var value = valueList[i];
                        if (value && value.material) {
                            var suffix = value.material.name.substring(value.material.name.lastIndexOf(".") + 1, value.material.name.length);
                            var html = "";
                            html += "<div name='file'>";
                            if (suffixMap[suffix] == "word") {
                                html += "<img src='/static/image/material/word.png'>";
                            } else if (suffixMap[suffix] == "excel") {
                                html += "<img src='/static/image/material/excel.png'>";
                            } else if (suffixMap[suffix] == "powerPoint") {
                                html += "<img src='/static/image/material/ppt.png'>";
                            } else if (suffixMap[suffix] == "portableDocumentFormat") {
                                html += "<img src='/static/image/material/pdf.png'>";
                            } else if (suffixMap[suffix] == "image") {
                                html += "<img src='" + value.material.localPath + "'>"
                                // html += "<img src='/static/image/material/image.png'>";
                            } else if (suffixMap[suffix] == "audio") {
                                html += "<img src='/static/image/material/audio.png'>";
                            } else if (suffixMap[suffix] == "video") {
                                html += "<img src='/static/image/material/video.png'>";
                            } else {
                                html += "<img src='/static/image/material/other.png'>";
                            }
                            html += "<p>" + value.material.name + "</p>";
                            html += "<div name='file-mask'></div>";
                            if (this.configs.writeable) {
                                html += "<button class='btn btn-danger btn-icon btn-circle btn-sm' name='deleteFileButton'><i class='fa fa-times'></i></button>";
                            }
                            html += "</div>";
                            $("#" + this.configs._id + "-file-container").append(html);
                            $("#" + this.configs._id + "-file-container>div[name='file']").last().data("file", value);
                        }
                    }
                }
            };
            this.getValue = function () {
                var fileArray = new Array();
                $("#" + this.configs._id + "-file-container>div[name='file']").each(function () {
                    var file = $(this).data("file");
                    if (file) {
                        fileArray.push(file);
                    }
                });
                if (fileArray && fileArray.length > 0) {
                    return fileArray;
                } else {
                    return null;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var configs_id = this.configs._id;
            $("body").on("click", "#" + this.configs._id + "-file-container button[name='deleteFileButton']", function () {
                $(this).parent("div").remove();
                $('#' + configs_id + '-file-container').parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            if (this.configs.writeable) {
                $('#' + this.configs._id + '-file-add').fileupload({
                    autoUpload: true,
                    filesContainer: '#' + this.configs._id + '-file-container',
                    progress: function (e, data) {
                        if (e.isDefaultPrevented()) {
                            return false;
                        }
                        var progress = Math.floor(data.loaded / data.total * 100);
                        var percent = 100 - progress;
                        if (data.context) {
                            data.context.each(function () {
                                $(this).find("div[name='file-progress']").children(".progressing").first().css('height', percent + '%');
                            });
                        }
                    },
                    done: function (e, data) {
                        if (e.isDefaultPrevented()) {
                            return false;
                        }
                        var that = $(this).data('blueimp-fileupload') ||
                            $(this).data('fileupload'),
                            deferred;
                        if (data.context) {
                            data.context.each(function (index) {
                                deferred = that._addFinishedDeferreds();
                                $(this).find("div[name='file-progress']").children(".progressing").first().css('height', '0%');
                                $(this).find("div[name='file-progress']").children().first().removeClass("progressing");
                                $(this).find("div[name='file-progress']").children().first().addClass("success");
                                if (data.result && data.result.statusCode == "SUCCESS" && data.result.result && data.result.result.tempFile) {
                                    $(this).data("file", {tempFile: data.result.result.tempFile})
                                    var suffix = data.result.result.tempFile.suffix;
                                    if (suffix && suffix.replace(".", "") && suffixMap[suffix.replace(".", "")] == "image") {
                                        $(this).find("img").attr("src", data.result.result.tempFile.url);
                                    }
                                    $('#' + configs_id + '-file-container').parsley({inputs: "input,select,textarea,ul,table"}).validate();
                                }
                            });
                        }
                    }
                });
            }
            return this;
        };
        return BaymaxMultifile;
    })(AbstractBaymaxItem);

    BaymaxDatetime = (function () {
        function BaymaxDatetime($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                format: "",
                minValue: null,
                minValueMessage: "",
                maxValue: null,
                maxValueMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker")) {
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").destroy();
                }
                if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker")) {
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").destroy();
                }
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-format-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-format'>格式类型</label>";
                html += "<div class='col-md-9'>";
                html += "<select id='" + (preName ? (preName + "-") : "") + "modifyItemForm-format' name='format' class='form-control' data-parsley-required='true' data-parsley-required-message='请选择！'>";
                html += "<option value=''>--请选择--</option>";
                if (formatArray && formatArray.length > 0) {
                    for (var i = 0; i < formatArray.length; i++) {
                        html += "<option value='" + formatArray[i].type + "'>" + formatArray[i].name + "</option>";
                    }
                }
                html += "</select>";
                html += "</div>";
                html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue'>最小值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue' name='minValue' class='form-control'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message'>最小值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message' name='minValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue'>最大值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue' name='maxValue' class='form-control'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message'>最大值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message' name='maxValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-format").change(function () {
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker")) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").destroy();
                //     }
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val("").change();
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-div").hide();
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker")) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").destroy();
                //     }
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val("").change();
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-div").hide();
                //
                //     if ($(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").datetimepicker({
                //             format: $(this).val(),
                //             showClear: true
                //         });
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").datetimepicker({
                //             format: $(this).val(),
                //             showClear: true
                //         });
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-div").show();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-div").show();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").change(function () {
                //     if (!$("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker")) {
                //         if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val() != "") {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").show();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").hide();
                //         }
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").on("dp.change", function (e) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").minDate(e.date);
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").parsley().validate() && $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").change(function () {
                //     if (!$("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker")) {
                //         if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val() != "") {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").show();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").hide();
                //         }
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").on("dp.change", function (e) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").maxDate(e.date);
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").parsley().validate() && $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").hide();
                //     }
                // });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-format").val(this.configs.format).change();
                // if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker") && this.configs.minValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val(AbstractBaymaxItem.dateFormat(this.configs.format, new Date(this.configs.minValue))).change();
                //     if (this.configs.minValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val(this.configs.minValueMessage);
                //     }
                // }
                // if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker") && this.configs.maxValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val(AbstractBaymaxItem.dateFormat(this.configs.format, new Date(this.configs.maxValue))).change();
                //     if (this.configs.maxValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val(this.configs.maxValueMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    config.format = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-format").val();
                    // if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker") && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").date() && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").date()._d) {
                    //     config.minValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").date()._d.getTime();
                    //     config.minValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val();
                    // } else {
                    //     config.minValue = null;
                    //     config.minValueMessage = "";
                    // }
                    // if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker") && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").date() && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").date()._d) {
                    //     config.maxValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").date()._d.getTime();
                    //     config.maxValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val();
                    // } else {
                    //     config.maxValue = null;
                    //     config.maxValueMessage = "";
                    // }

                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<input type='text' class='form-control' id='" + this.configs._id + "-datetime'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-datetime").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    $("#" + this.configs._id + "-datetime").removeAttr("data-parsley-required");
                    $("#" + this.configs._id + "-datetime").removeAttr("data-parsley-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-datetime").attr("data-parsley-required", "true");
                        $("#" + this.configs._id + "-datetime").attr("data-parsley-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-datetime").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    $("#" + this.configs._id + "-datetime").val(AbstractBaymaxItem.dateFormat(this.configs.format, new Date(value))).change();
                }
            };
            this.getValue = function () {
                if ($("#" + this.configs._id + "-datetime").data("DateTimePicker").date()) {
                    var value = $("#" + this.configs._id + "-datetime").data("DateTimePicker").date()._d.getTime();
                    return value;
                }
                return null;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());


            var datetimepicker = {
                format: this.configs.format,
                showClear: true
            }
            if (this.configs.minValue) {
                datetimepicker["minDate"] = new Date(this.configs.minValue);
            }
            if (this.configs.maxValue) {
                datetimepicker["maxDate"] = new Date(this.configs.maxValue);
            }
            var config_id = this.configs._id;
            $("#" + config_id + "-datetime").datetimepicker(datetimepicker);
            $("#" + config_id + "-datetime").on("dp.change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate()
            });
            return this;
        };
        return BaymaxDatetime;
    })(AbstractBaymaxItem);

    BaymaxDatetimeRange = (function () {
        function BaymaxDatetimeRange($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 6,
                height: 1,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 1,
                minWidth: 4,
                minHeight: 1,
                isRequired: false,
                isRequiredMessage: "",
                format: "",
                minValue: null,
                minValueMessage: "",
                maxValue: null,
                maxValueMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker")) {
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").destroy();
                }
                if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker")) {
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").destroy();
                }
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-format-div'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-format'>格式类型</label>";
                html += "<div class='col-md-9'>";
                html += "<select id='" + (preName ? (preName + "-") : "") + "modifyItemForm-format' name='format' class='form-control' data-parsley-required='true' data-parsley-required-message='请选择！'>";
                html += "<option value=''>--请选择--</option>";
                if (formatArray && formatArray.length > 0) {
                    for (var i = 0; i < formatArray.length; i++) {
                        html += "<option value='" + formatArray[i].type + "'>" + formatArray[i].name + "</option>";
                    }
                }
                html += "</select>";
                html += "</div>";
                html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue'>最小值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue' name='minValue' class='form-control'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message'>最小值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message' name='minValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue'>最大值</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue' name='maxValue' class='form-control'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message'>最大值错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message' name='maxValue-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-format").change(function () {
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker")) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").destroy();
                //     }
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val("").change();
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-div").hide();
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker")) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").destroy();
                //     }
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val("").change();
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-div").hide();
                //
                //     if ($(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").datetimepicker({
                //             format: $(this).val(),
                //             showClear: true
                //         });
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").datetimepicker({
                //             format: $(this).val(),
                //             showClear: true
                //         });
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-div").show();
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-div").show();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").change(function () {
                //     if (!$("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker")) {
                //         if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val() != "") {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").show();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").hide();
                //         }
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").on("dp.change", function (e) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").minDate(e.date);
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").parsley().validate() && $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").change(function () {
                //     if (!$("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker")) {
                //         if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val() != "") {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").show();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").hide();
                //         }
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").on("dp.change", function (e) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").maxDate(e.date);
                //     if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").parsley().validate() && $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message-div").hide();
                //     }
                // });
                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-format").val(this.configs.format).change();
                // if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker") && this.configs.minValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").val(AbstractBaymaxItem.dateFormat(this.configs.format, new Date(this.configs.minValue))).change();
                //     if (this.configs.minValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val(this.configs.minValueMessage);
                //     }
                // }
                // if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker") && this.configs.maxValue) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").val(AbstractBaymaxItem.dateFormat(this.configs.format, new Date(this.configs.maxValue))).change();
                //     if (this.configs.maxValueMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val(this.configs.maxValueMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    config.format = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-format").val();
                    // if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker") && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").date() && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").date()._d) {
                    //     config.minValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue").data("DateTimePicker").date()._d.getTime();
                    //     config.minValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minValue-message").val();
                    // } else {
                    //     config.minValue = null;
                    //     config.minValueMessage = "";
                    // }
                    // if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker") && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").date() && $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").date()._d) {
                    //     config.maxValue = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue").data("DateTimePicker").date()._d.getTime();
                    //     config.maxValueMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxValue-message").val();
                    // } else {
                    //     config.maxValue = null;
                    //     config.maxValueMessage = "";
                    // }

                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<div class='input-group'>";
                html += "<input type='text' class='form-control' id='" + this.configs._id + "-datetime-start'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "<span class='input-group-addon'>至</span>";
                html += "<input type='text' class='form-control' id='" + this.configs._id + "-datetime-end'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "/>";
                html += "</div>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " ";
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-datetime-start").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请选择";
                    $("#" + this.configs._id + "-datetime-start").removeAttr("data-parsley-required");
                    $("#" + this.configs._id + "-datetime-start").removeAttr("data-parsley-required-message");
                    $("#" + this.configs._id + "-datetime-end").parsley().reset();
                    $("#" + this.configs._id + "-datetime-end").removeAttr("data-parsley-required");
                    $("#" + this.configs._id + "-datetime-end").removeAttr("data-parsley-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-datetime-start").attr("data-parsley-required", "true");
                        $("#" + this.configs._id + "-datetime-start").attr("data-parsley-required-message", this.configs.isRequiredMessage + "！");
                        $("#" + this.configs._id + "-datetime-end").attr("data-parsley-required", "true");
                        $("#" + this.configs._id + "-datetime-end").attr("data-parsley-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                var startValid = $("#" + this.configs._id + "-datetime-start").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true;
                var endValid = $("#" + this.configs._id + "-datetime-end").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true;
                if (startValid && endValid) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    if (value.start) {
                        $("#" + this.configs._id + "-datetime-start").val(AbstractBaymaxItem.dateFormat(this.configs.format, new Date(value.start))).change();
                    }
                    if (value.end) {
                        $("#" + this.configs._id + "-datetime-end").val(AbstractBaymaxItem.dateFormat(this.configs.format, new Date(value.end))).change();
                    }
                }
            };
            this.getValue = function () {
                var value = new Object();
                if ($("#" + this.configs._id + "-datetime-start").data("DateTimePicker").date()) {
                    value.start = $("#" + this.configs._id + "-datetime-start").data("DateTimePicker").date()._d.getTime();
                }
                if ($("#" + this.configs._id + "-datetime-end").data("DateTimePicker").date()) {
                    value.end = $("#" + this.configs._id + "-datetime-end").data("DateTimePicker").date()._d.getTime();
                }
                if (value.start || value.end) {
                    return value;
                }
                return null;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var startDatetimePicker = {
                format: this.configs.format,
                showClear: true
            }
            var endDatetimePicker = {
                format: this.configs.format,
                showClear: true
            }
            if (this.configs.minValue) {
                startDatetimePicker["minDate"] = new Date(this.configs.minValue);
                endDatetimePicker["minDate"] = new Date(this.configs.minValue);
            }
            if (this.configs.maxValue) {
                startDatetimePicker["maxDate"] = new Date(this.configs.maxValue);
                endDatetimePicker["maxDate"] = new Date(this.configs.maxValue);
            }
            var config_id = this.configs._id;
            $("#" + config_id + "-datetime-start").datetimepicker(startDatetimePicker);
            $("#" + config_id + "-datetime-end").datetimepicker(endDatetimePicker);
            $("#" + config_id + "-datetime-start").on("dp.change", function (e) {
                $("#" + config_id + "-datetime-end").data("DateTimePicker").minDate(e.date);
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            $("#" + config_id + "-datetime-end").on("dp.change", function (e) {
                $("#" + config_id + "-datetime-start").data("DateTimePicker").maxDate(e.date);
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate()
            });
            return this;
        };
        return BaymaxDatetimeRange;
    })(AbstractBaymaxItem);

    BaymaxTextarea = (function () {
        function BaymaxTextarea($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 12,
                height: 2,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 2,
                minWidth: 12,
                minHeight: 2,
                isRequired: false,
                isRequiredMessage: "",
                minLength: null,
                minLengthMessage: "",
                maxLength: null,
                maxLengthMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";

                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength'>最小长度</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' name='minLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' data-parsley-lte-message='最小长度不得大于最大长度！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message'>最小长度错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message' name='minLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength'>最大长度</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength' name='maxLength' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength' data-parsley-gte-message='最大长度不得小于最小长度！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message'>最大长度错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message' name='maxLength-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);

                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message-div").hide();
                //     }
                // });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }

                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val("").change();
                // if (this.configs.minLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val(this.configs.minLength).change();
                //     if (this.configs.minLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val(this.configs.minLengthMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val("").change();
                // if (this.configs.maxLength) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val(this.configs.maxLength).change();
                //     if (this.configs.maxLengthMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val(this.configs.maxLengthMessage);
                //     }
                // }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: "[name$='-message']:hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }

                    // var minLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength").val();
                    // if (minLength) {
                    //     config.minLength = parseInt(minLength);
                    //     config.minLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minLength-message").val();
                    // } else {
                    //     config.minLength = null;
                    //     config.minLengthMessage = "";
                    // }
                    // var maxLength = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength").val();
                    // if (maxLength) {
                    //     config.maxLength = parseInt(maxLength);
                    //     config.maxLengthMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxLength-message").val();
                    // } else {
                    //     config.maxLength = null;
                    //     config.maxLengthMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<textarea id='" + this.configs._id + "-textarea' class='form-control' rows='5'" + this._renderValidateHtml();
                if (!this.configs.writeable) {
                    html += " readonly "
                }
                html += "></textarea>";
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                if (this.configs.minLength) {
                    html += "data-parsley-minlength='" + this.configs.minLength + "'";
                    html += "data-parsley-minlength-message='" + this.configs.minLengthMessage + "！'";
                }
                if (this.configs.maxLength) {
                    html += "data-parsley-maxlength='" + this.configs.maxLength + "'";
                    html += "data-parsley-maxlength-message='" + this.configs.maxLengthMessage + "！'";
                } else {
                    html += "data-parsley-maxlength='" + textMaxLength + "'";
                    html += "data-parsley-maxlength-message='最多填写" + textMaxLength + "个字符！'"
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-textarea").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请填写";
                    $("#" + this.configs._id + "-textarea").removeAttr("data-parsley-required");
                    $("#" + this.configs._id + "-textarea").removeAttr("data-parsley-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-textarea").attr("data-parsley-required", "true");
                        $("#" + this.configs._id + "-textarea").attr("data-parsley-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-textarea").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                return false;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.setValue = function (value) {
                if (value) {
                    $("#" + this.configs._id + "-textarea").val(value);
                }
            };
            this.getValue = function () {
                var value = $("#" + this.configs._id + "-textarea").val();
                if (value) {
                    return value;
                }
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            $("#" + this.configs._id + "-textarea").on("change", function (e) {
                $(e.target).parsley({inputs: "input,select,textarea,ul,table"}).validate();
            });
            return this;
        };
        return BaymaxTextarea;
    })(AbstractBaymaxItem);

    BaymaxTable = (function () {
        function BaymaxTable($item, option) {
            this.configs = {
                _id: undefined,
                id: "",
                name: "",
                describe: "",
                remark: "",
                width: 12,
                height: 2,
                x: 0,
                y: 0,
                maxWidth: 12,
                maxHeight: 2,
                minWidth: 12,
                minHeight: 2,
                itemList: [],
                isRequired: false,
                isRequiredMessage: "",
                minRow: null,
                minRowMessage: "",
                maxRow: null,
                maxRowMessage: "",
                readable: true,
                writeable: true
            };
            this.clearConfigHtml = function ($div, preName) {
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley().reset();
                for (var i = 1; i <= tableItemIndex; i++) {
                    $("body").off("change", "#item-" + tableItemIndex + "-modifyItemForm-name");
                }
                $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").remove();
            };
            this.setConfigToHtml = function ($div, inPageFlag, preName) {
                var html = "";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm' class='form-horizontal'>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-name'>名称</label>";
                    html += "<div class='col-md-9'>";
                    html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-name' name='name' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe'>描述</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-describe' name='describe' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark'>备注</label>";
                    html += "<div class='col-md-9'>";
                    html += "<textarea id='" + (preName ? (preName + "-") : "") + "modifyItemForm-remark' name='remark' class='form-control' rows='5' data-parsley-maxlength='" + textMaxLength + "' data-parsley-maxlength-message='最多输入" + textMaxLength + "个字符'></textarea>";
                    html += "</div>";
                    html += "</div>";
                }
                html += "<div class='form-group'>";
                html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList'>数据列</label>";
                html += "<div class='col-md-9'>";
                html += "<button type='button' class='btn btn-success btn-sm' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList-addBtn'>添加</button>";
                html += "</div>";
                html += "</div>";
                html += "<div class='panel-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList'>";
                html += "</div>";
                if (inPageFlag) {
                    html += "<div class='form-group'>";
                    html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired'>是否必填</label>";
                    html += "<div class='col-md-9'>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1' value='1'/>是</label></div>";
                    html += "<div class='radio-inline'><label><input type='radio' name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0' value='0'/>否</label></div>";
                    html += "</div>";
                    html += "</div>";
                    // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div'>";
                    // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message'>是否必填错误提示</label>";
                    // html += "<div class='col-md-9'>";
                    // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message' name='isRequired-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                    // html += "</div>";
                    // html += "</div>";
                }
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow'>最小标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow' name='minRow' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-lte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow' data-parsley-lte-message='最小标签数不得大于最大标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message'>最小标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message' name='minRow-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow'>最大标签数</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow' name='maxRow' class='form-control' data-parsley-type='integer' data-parsley-type-message='请填写正整数！' data-parsley-min='1' data-parsley-min-message='请填写正整数！' data-parsley-gte='#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow' data-parsley-gte-message='最大标签数不得小于最小标签数！'>";
                // html += "</div>";
                // html += "</div>";
                // html += "<div class='form-group' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message-div'>";
                // html += "<label class='col-md-3 control-label' for='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message'>最大标签数错误提示</label>";
                // html += "<div class='col-md-9'>";
                // html += "<input type='text' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message' name='maxRow-message' class='form-control' data-parsley-required='true' data-parsley-required-message='请填写！' data-parsley-maxlength='" + stringMaxLength + "' data-parsley-maxlength-message='最多输入" + stringMaxLength + "个字符'>";
                // html += "</div>";
                // html += "</div>";
                html += "</form>";
                $div.append(html);
                // if (inPageFlag) {
                //     $("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']").change(function () {
                //         if (this.value == 0) {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val("");
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").hide();
                //         } else {
                //             $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message-div").show();
                //         }
                //     });
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message-div").hide();
                //     }
                // });
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow").change(function () {
                //     if ($(this).parsley().validate() && $(this).val() != "") {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message-div").show();
                //     } else {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message").val("");
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message-div").hide();
                //     }
                // });

                tableItemIndex = 0;
                var that = this;
                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList-addBtn").click(function () {
                    that.addColumnConfigHtml($div, inPageFlag, preName);
                });

                if (inPageFlag) {
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val(this.configs.name);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val(this.configs.describe);
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val(this.configs.remark);
                    if (this.configs.isRequired) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-1").attr("checked", "checked").change();
                        // if (this.configs.isRequiredMessage) {
                        //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val(this.configs.isRequiredMessage);
                        // }
                    } else {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-0").attr("checked", "checked").change();
                    }
                }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow").val("").change();
                // if (this.configs.minRow) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow").val(this.configs.minRow).change();
                //     if (this.configs.minRowMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message").val(this.configs.minRowMessage);
                //     }
                // }
                // $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow").val("").change();
                // if (this.configs.maxRow) {
                //     $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow").val(this.configs.maxRow).change();
                //     if (this.configs.maxRowMessage) {
                //         $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message").val(this.configs.maxRowMessage);
                //     }
                // }
                if (this.configs.itemList && this.configs.itemList.length > 0) {
                    for (var i = 0; i < this.configs.itemList.length; i++) {
                        var tableItem = this.configs.itemList[i];
                        var item = new Object();
                        if (tableItem) {
                            if (tableItem.item) {
                                for (var key in tableItem.item) {
                                    if (key != "id" && key != "idStr") {
                                        item[key] = tableItem.item[key];
                                    }
                                }
                                if (tableItem.item["id"]) {
                                    item["itemId"] = tableItem.item["id"];
                                }
                                if (tableItem.item["idStr"]) {
                                    item["itemIdStr"] = tableItem.item["idStr"];
                                }
                            }
                            if (tableItem["id"]) {
                                item["id"] = tableItem["id"];
                            }
                            if (tableItem["idStr"]) {
                                item["idStr"] = tableItem["idStr"];
                            }
                            item["name"] = tableItem["name"];
                            item["remark"] = tableItem["remark"];
                            item["isRequired"] = tableItem["isRequired"];
                            item["isRequiredMessage"] = tableItem["isRequiredMessage"];
                        }
                        this.addColumnConfigHtml($div, inPageFlag, preName, item);
                    }
                }
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList>div[name='modifyItemForm-item-div']").length <= 0) {
                    this.addColumnConfigHtml($div, inPageFlag, preName);
                }
            };
            this.getConfigFromHtml = function ($div, inPageFlag, preName) {
                if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm").parsley({
                    inputs: "input,select,textarea,ul,table",
                    excluded: ":hidden"
                }).validate()) {
                    var config = {}
                    if (inPageFlag) {
                        config.name = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-name").val();
                        config.describe = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-describe").val();
                        config.remark = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-remark").val();
                        var isRequired = $div.find("[name='" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired']:checked").val() == "1";
                        config.isRequired = isRequired;
                        // if (isRequired) {
                        //     config.isRequiredMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-isRequired-message").val();
                        // } else {
                        //     config.isRequiredMessage = "";
                        // }
                    }
                    config.itemList = new Array();
                    $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList>div[name='modifyItemForm-item-div']").each(function () {
                        var index = $(this).attr("data-tableItemIndex");
                        var item = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemTempDiv").westieItem().getConfigFromHtml($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemDiv"), true, (preName ? (preName + "-") : "") + "item-" + index);
                        item["type"] = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-type").val();
                        var tableItem = new Object();
                        tableItem["name"] = item["name"];
                        tableItem["remark"] = item["remark"];
                        tableItem["isRequired"] = item["isRequired"];
                        tableItem["isRequiredMessage"] = item["isRequiredMessage"];
                        tableItem["item"] = new Object();
                        for (var key in item) {
                            if (["_id", "id", "idStr", "itemId", "itemIdStr", "name", "remark", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "x", "y", "isRequired", "isRequiredMessage", "readable", "writeable"].indexOf(key) < 0) {
                                tableItem.item[key] = item[key];
                            } else if (key == "itemId" && item["itemId"]) {
                                tableItem.item["id"] = item["itemId"];
                            } else if (key == "itemIdStr" && item["itemIdStr"]) {
                                tableItem.item["idStr"] = item["itemIdStr"];
                            }
                        }
                        config.itemList.push(tableItem);
                    });
                    // var minRow = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow").val();
                    // if (minRow) {
                    //     config.minRow = parseInt(minRow);
                    //     config.minRowMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-minRow-message").val();
                    // } else {
                    //     config.minRow = null;
                    //     config.minRowMessage = "";
                    // }
                    // var maxRow = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow").val();
                    // if (maxRow) {
                    //     config.maxRow = parseInt(maxRow);
                    //     config.maxRowMessage = $div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-maxRow-message").val();
                    // } else {
                    //     config.maxRow = null;
                    //     config.maxRowMessage = "";
                    // }
                    return config;
                }
                return;
            };
            this.addColumnConfigHtml = function ($div, inPageFlag, preName, tableItem) {
                tableItemIndex++;
                var html = "";
                html += "<div class='panel panel-inverse overflow-hidden' name='modifyItemForm-item-div' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-div' data-tableItemIndex='" + tableItemIndex + "'>";
                html += "<div class='panel-heading'>";
                html += "<h4 class='panel-title'>";
                html += "<a class='accordion-toggle accordion-toggle-styled' data-toggle='collapse' data-parent='#" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList' href='#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "' aria-expanded='false'>";
                if (tableItem) {
                    html += tableItem.name;
                } else {
                    html += "列";
                }
                html += "</a>";
                html += "</h4>";
                html += "</div>";
                html += "<a id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-deleteBtn' data-tableItemIndex='" + tableItemIndex + "' class='btn btn-danger btn-sm pull-right' style='margin-top: -35px;margin-right: 10px'>删除</a>";
                html += "<div id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "' class='panel-collapse collapse'' aria-expanded='false'>";
                html += "<div class='panel-body' id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-body'>";
                html += "<form id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form'>";
                html += "<div class='form-group'>";
                html += "<label class='col-md-3 control-label'>类型</label>";
                html += "<div class='col-md-9'>";
                html += "<select id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form-type' name='type' data-tableItemIndex='" + tableItemIndex + "' class='form-control' data-parsley-required='true' data-parsley-required-message='请选择！'>";
                html += "<option value=''>--请选择--</option>";
                if (itemArray && itemArray.length > 0) {
                    for (var i = 0; i < itemArray.length; i++) {
                        if (itemArray[i] && itemArray[i].type != "table") {
                            html += "<option value='" + itemArray[i].type + "'>" + itemArray[i].name + "</option>";
                        }
                    }
                }
                html += "</select>";
                html += "</div>";
                html += "</div>";
                html += "</form>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList").append(html);

                var that = this;
                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-deleteBtn").click(function () {
                    var index = $(this).attr("data-tableItemIndex");
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-div").remove();
                    if ($div.find("#" + (preName ? (preName + "-") : "") + "modifyItemForm-itemList>div[name='modifyItemForm-item-div']").length <= 0) {
                        that.addColumnConfigHtml($div, inPageFlag, preName);
                    }
                });
                $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form-type").change(function () {
                    var index = $(this).attr("data-tableItemIndex");
                    if ($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemTempDiv").westieItem()) {
                        var item = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemTempDiv").westieItem();
                        item.clearConfigHtml($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemDiv"));
                    }
                    $(this).parents(".panel").find(".accordion-toggle").html("列");
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemDiv").remove();
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemTempDiv").remove();
                    var type = $(this).val();
                    if (type) {
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form").append("<div id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemDiv'></div>");
                        $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form").append("<div id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemTempDiv' style='display: none'></div>");
                        var item = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemTempDiv").westieItem({type: type});
                        item.setConfigToHtml($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + index + "-form-itemDiv"), true, (preName ? (preName + "-") : "") + "item-" + index);
                    }
                });
                $("body").on("change", "#item-" + tableItemIndex + "-" + (preName ? (preName + "-") : "") + "modifyItemForm-name", function (e) {
                    if ($(this).val()) {
                        $(this).parents(".panel").find(".accordion-toggle").html($(this).val());
                    } else {
                        $(this).parents(".panel").find(".accordion-toggle").html("列");
                    }
                });
                if (tableItem) {
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form-type").val(tableItem.type);
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form").append("<div id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form-itemDiv'></div>");
                    $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form").append("<div id='" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form-itemTempDiv' style='display: none'></div>");
                    var item = $("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form-itemTempDiv").westieItem(tableItem);
                    item.setConfigToHtml($("#" + (preName ? (preName + "-") : "") + "modifyItemForm-item-" + tableItemIndex + "-form-itemDiv"), true, (preName ? (preName + "-") : "") + "item-" + tableItemIndex);
                }
            };
            this._renderHtml = function () {
                var html = "";
                html += "<div class='form-group' id='" + this.configs._id + "'";
                if (!this.configs.readable) {
                    html += " style='display:none' "
                }
                html += ">";
                html += "<label id='" + this.configs._id + "-name'>";
                html += this.configs.name;
                if (this.configs.describe) {
                    html += ":";
                    html += this.configs.describe;
                }
                html += "</label>";
                html += "<table id='" + this.configs._id + "-table'" + this._renderValidateHtml() + " name='item-table'>";
                html += "<thead id='" + this.configs._id + "-thead'>";
                html += "<tr>";
                html += "<th name='item-table-no' style='width: 5%;'>序号</th>";
                for (var i = 0; i < this.configs.itemList.length; i++) {
                    html += "<th style='width: " + (90 / this.configs.itemList.length).toFixed(2) + "%;'>" + this.configs.itemList[i].name + "</th>";
                }
                html += "<th name='item-table-option' style='width: 5%;'>操作</th>";
                html += "</tr>";
                html += "</thead>";
                html += "<tbody id='" + this.configs._id + "-tbody'>";
                html += "</tbody>";
                html += "</table>";
                html += "<button type='button' id='" + this.configs._id + "-addBtn' class='btn btn-success' style='width: 100%' name='item-table-addBtn'><i class='fa fa-plus'></i></button>"
                html += "</div>";
                return html;
            };
            this._renderValidateHtml = function () {
                var html = "";
                html += " data-parsley-validate-if-empty='true'";
                if (this.configs.minRow) {
                    html += "data-parsley-table-minRow='" + this.configs.minRow + "'";
                    html += "data-parsley-table-minRow-message='" + this.configs.minRowMessage + "！'";
                }
                if (this.configs.maxRow) {
                    html += "data-parsley-table-maxRow='" + this.configs.maxRow + "'";
                    html += "data-parsley-table-maxRow-message='" + this.configs.maxRowMessage + "！'";
                }
                html += " ";
                return html;
            };
            this.validate = function (flag) {
                $("#" + this.configs._id + "-table").parsley().reset();
                if (this.configs.isRequired) {
                    this.configs.isRequiredMessage = "请录入";
                    $("#" + this.configs._id + "-table").removeAttr("data-parsley-table-required");
                    $("#" + this.configs._id + "-table").removeAttr("data-parsley-table-required-message");
                    if (flag) {
                        $("#" + this.configs._id + "-table").attr("data-parsley-table-required", "true");
                        $("#" + this.configs._id + "-table").attr("data-parsley-table-required-message", this.configs.isRequiredMessage + "！");
                    }
                }
                if ($("#" + this.configs._id + "-table").parsley({inputs: "input,select,textarea,ul,table"}).validate() == true) {
                    return true;
                }
                var result = true;
                $("#" + this.configs._id + "-tbody>tr").each(function () {
                    $(this).find("td").each(function () {
                        var westieItem = $(this).westieItem();
                        if (westieItem) {
                            result = westieItem.validate(flag) && result;
                        }
                    });
                });
                return result;
            };
            this.setConfig = function (option) {
                if (option) {
                    $.extend(this.configs, option);
                    var nameHtml = "";
                    nameHtml += this.configs.name;
                    if (this.configs.describe) {
                        nameHtml += ":";
                        nameHtml += this.configs.describe;
                    }
                    $("#" + this.configs._id + "-name").html(nameHtml);
                    var theadHtml = "";
                    theadHtml += "<tr>";
                    theadHtml += "<th name='item-table-no' style='width: 5%;'>序号</th>";
                    for (var i = 0; i < this.configs.itemList.length; i++) {
                        theadHtml += "<th style='width: " + (90 / this.configs.itemList.length).toFixed(2) + "%;'>" + this.configs.itemList[i].name + "</th>";
                    }
                    theadHtml += "<th name='item-table-option' style='width: 5%;'>操作</th>";
                    theadHtml += "</tr>";
                    $("#" + this.configs._id + "-thead").html(theadHtml);
                }
            };
            this.getConfig = function () {
                return this.configs;
            };
            this.config = function (option) {
                this.setConfig(option);
                return this.getConfig();
            };
            this.setWidth = function (width) {
                if (width != undefined) {
                    this.configs.width = width;
                    this.configs.width = Math.max(this.configs.minWidth, this.configs.width);
                    this.configs.width = Math.min(this.configs.width, this.configs.maxWidth);
                }
            };
            this.getWidth = function () {
                return this.configs.width;
            };
            this.width = function (width) {
                this.setWidth(width);
                return this.getWidth();
            };
            this.setHeight = function (height) {
                if (height != undefined) {
                    this.configs.height = height;
                    this.configs.height = Math.max(this.configs.minHeight, this.configs.height);
                    this.configs.height = Math.min(this.configs.height, this.configs.maxHeight);
                }
            };
            this.getHeight = function () {
                return this.configs.height;
            };
            this.height = function (height) {
                this.setHeight(height);
                return this.getHeight();
            };
            this.setX = function (x) {
                if (x != undefined) {
                    this.configs.x = x;
                }
            };
            this.getX = function () {
                return this.configs.x;
            };
            this.x = function (x) {
                this.setX(x);
                return this.getX();
            };
            this.setY = function (y) {
                if (y != undefined) {
                    this.configs.y = y;
                }
            };
            this.getY = function () {
                return this.configs.y;
            };
            this.y = function (y) {
                this.setY(y);
                return this.getY();
            };
            this.addRow = function (value) {
                var itemList = this.configs.itemList;
                var trHtml = "";
                trHtml += "<tr>";
                trHtml += "<td>" + ($("#" + this.configs._id + "-tbody>tr").length + 1) + "</td>";
                for (var i = 0; i < itemList.length; i++) {
                    trHtml += "<td data-propertyId=" + itemList[i].idStr + "></td>";
                }
                trHtml += "<td><button type='button' class='btn btn-danger btn-xs' name='" + this.configs._id + "-deleteBtn'>删除</button></td>";
                trHtml += "</tr>";
                $("#" + this.configs._id + "-tbody").append(trHtml);
                for (var i = 0; i < itemList.length; i++) {
                    var tableItem = itemList[i];
                    var item = new Object();
                    if (tableItem) {
                        if (tableItem.item) {
                            for (var key in tableItem.item) {
                                if (key != "id" && key != "idStr") {
                                    item[key] = tableItem.item[key];
                                }
                            }
                            if (tableItem.item["id"]) {
                                item["itemId"] = tableItem.item["id"];
                            }
                            if (tableItem.item["idStr"]) {
                                item["itemIdStr"] = tableItem.item["idStr"];
                            }
                        }
                        if (tableItem["id"]) {
                            item["id"] = tableItem["id"];
                        }
                        if (tableItem["idStr"]) {
                            item["idStr"] = tableItem["idStr"];
                        }
                        item["name"] = tableItem["name"];
                        item["remark"] = tableItem["remark"];
                        item["isRequired"] = tableItem["isRequired"];
                        item["isRequiredMessage"] = tableItem["isRequiredMessage"];
                    }
                    $("#" + this.configs._id + "-tbody>tr:last-child>td:eq(" + (i + 1) + ")").westieItem(item);
                }
                if (value && value.length > 0) {
                    for (var i = 0; i < value.length; i++) {
                        var propertyData = value[i]
                        $("#" + this.configs._id + "-tbody>tr:last-child>td[data-propertyId='" + propertyData.propertyIdStr + "']").westieItem().value(propertyData.value);
                    }
                }
                $('#' + this.configs._id + '-table').parsley({inputs: "input,select,textarea,ul,table"}).validate();
            };
            this.setValue = function (valueList) {
                if (valueList) {
                    for (var i = 0; i < valueList.length; i++) {
                        var value = valueList[i];
                        this.addRow(value);
                    }
                }
            };
            this.getValue = function () {
                var valueList = [];
                $("#" + this.configs._id + "-tbody>tr").each(function () {
                    var object = new Array();
                    $(this).find("td").each(function () {
                        var westieItem = $(this).westieItem();
                        if (westieItem) {
                            var value = westieItem.value();
                            if (value) {
                                object.push({
                                    propertyIdStr: westieItem.config().idStr,
                                    propertyType: westieItem.config().type,
                                    value: value
                                })
                            }
                        }
                    });
                    valueList.push(object);
                });
                if (valueList && valueList.length > 0) {
                    return valueList;
                }
                return null;
            };
            this.value = function (value) {
                this.setValue(value);
                return this.getValue();
            };
            this.config(option);
            $item.html(this._renderHtml());
            var that = this;
            $("#" + this.configs._id + "-addBtn").click(function () {
                that.addRow();
            });
            $("body").on("click", "button[name='" + that.configs._id + "-deleteBtn']", function (e) {
                $(this).parents("tr").remove();
                $("#" + that.configs._id + "-tbody>tr").each(function (index) {
                    $(this).find("td:eq(0)").html((index + 1));
                })
            });
            return this;
        }

        return BaymaxTable;
    })(AbstractBaymaxItem);

    $.fn.extend({
        westieItem: function (options) {
            if (!AbstractBaymaxItem.browser_is_supported()) {
                return null;
            }
            var itemArray = new Array();
            this.each(function () {
                var item = $(this).data('westieItem');
                if (options && options.type && !item) {
                    var _id = ""
                    while (!(_id) || $("#" + _id).length > 0 || $("#" + _id + "-name").length > 0) {
                        _id = AbstractBaymaxItem.randomString(16);
                    }
                    options._id = _id;
                }
                if (options && options.type == "input" && !(item instanceof BaymaxInput)) {
                    item = new BaymaxInput($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "tag" && !(item instanceof BaymaxTag)) {
                    item = new BaymaxTag($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "numberInput" && !(item instanceof BaymaxNumberInput)) {
                    item = new BaymaxNumberInput($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "numberTag" && !(item instanceof BaymaxNumberTag)) {
                    item = new BaymaxNumberTag($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "select" && !(item instanceof BaymaxSelect)) {
                    item = new BaymaxSelect($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "multiSelect" && !(item instanceof BaymaxMultiSelect)) {
                    item = new BaymaxMultiSelect($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "baseSelect" && !(item instanceof BaymaxBaseSelect)) {
                    item = new BaymaxBaseSelect($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "multiBaseSelect" && !(item instanceof BaymaxMultiBaseSelect)) {
                    item = new BaymaxMultiBaseSelect($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "radio" && !(item instanceof BaymaxRadio)) {
                    item = new BaymaxRadio($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "checkbox" && !(item instanceof BaymaxCheckbox)) {
                    item = new BaymaxCheckbox($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "file" && !(item instanceof BaymaxFile)) {
                    item = new BaymaxFile($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "multiFile" && !(item instanceof BaymaxMultifile)) {
                    item = new BaymaxMultifile($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "datetime" && !(item instanceof BaymaxDatetime)) {
                    item = new BaymaxDatetime($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "datetimeRange" && !(item instanceof BaymaxDatetimeRange)) {
                    item = new BaymaxDatetimeRange($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "textarea" && !(item instanceof BaymaxTextarea)) {
                    item = new BaymaxTextarea($(this), options);
                    $(this).data('westieItem', item);
                } else if (options && options.type == "table" && !(item instanceof BaymaxTable)) {
                    item = new BaymaxTable($(this), options);
                    $(this).data('westieItem', item);
                } else if (item) {
                    item.config(options);
                    $(this).data('westieItem', item);
                }
                itemArray.push(item);
            });
            if (itemArray.length > 1) {
                return itemArray;
            } else if (itemArray.length == 1) {
                return itemArray[0];
            } else {
                return null;
            }
        }
    });
}).call(this);