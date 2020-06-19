function jqGrid(){$("#jqGrid").jqGrid({
    url: baseURL + 'contract/list' ,
    datatype: "json",
    colModel: [

        {label: 'contractApplyRecordId', name: 'contractApplyRecordId', index: 'contract_apply_record_id', width: 10, key: true, hidden: true},
        {label: '合同名称', name: 'contractName', index: 'contract_name', width: 140, align: 'center'},
        {label: '申请人', name: 'contractManager', index: 'contract_manager', width: 100},
        {label: '申请部门', name: 'demandDeptId', index: 'demand_dept_id', width: 140, align: 'center'},
        {label: '申请时间', name: 'createDate', index: 'create_date', width: 100},
        {
            label: '开始时间', name: 'startDate', index: 'start_date', width: 80, hidden: true
        },
        {label: '结束时间', name: 'endDate', index: 'end_date', width: 180, align: 'center'},
        {label: '当前节点', name: 'currentNode', index: 'current_node', width: 140, align: 'center'},
        {label: '备注', name: 'remarks', index: 'remarks', width: 100,align: 'center'},
        {label: '操作',  width: 100, sortable: false, align: 'center',
            formatter:function (cellValue, options, rowData) {
                var i  = rowData["contractApplyRecordId"];
                var node = rowData["currentNode"];
                console.log(node)
            return "<a class='btn btn-primary' onclick='pass(\""+i+"\",\""+node+"\")' '>通过</a>"


            }
        },
    ],
    viewrecords: true,
    height: 385,
    rowNum: 20,
    rowList: [20, 30, 40, 50],
    rownumbers: true,
    rownumWidth: 25,
    autowidth: true,
    shrinkToFit: false,
    multiselect: true,
    pager: "#jqGridPager",
    jsonReader: {
        root: "page.list",
        page: "page.currPage",
        total: "page.totalPage",
        records: "page.totalCount"
    },
    prmNames: {
        page: "page",
        rows: "limit",
        order: "order"
    },
    gridComplete: function () {
        //隐藏grid底部滚动条
        // $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
    }
});}
$(function () {
    jqGrid();
});

function pass(i,node){

        layer.confirm('确定仔细核查了吗？', {
            btn: ['确定','再看一下'] //按钮
        }, function(){
            $.ajax({
                type:"get",
                url:baseURL + "contract/myMission/pass?contractApplyRecordId="+i+"&currentNode="+node,
                success:function(re){
                    if(re.code==1){
                        layer.alert("操作成功",{
                            icon:1
                        },function(index){
                            layer.close(index)
                            window.location.reload();
                        })
                    }else {
                        layer.alert(re.message,{
                            icon:2
                        },function (index){
                            layer.close(index)
                        })
                    }
                }


            })

        }, function(){
            layer.close();
        });



}

var ztree;
var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "orgId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl"
        }
    }
};
var vmFinUser = new Vue({
    el: '#rrapp',
    data: {
        showList: 1,
        title: null,
        opName: "",
        supplier:{
            blackList:1
        },
        finUser: {
            orgId: "",
            orgName: "",
            userFlag: 1
        },
        finUserSearch: {
            userName: "",
            realName: "",
            userStatus: "",
            orgId: "",
            orgName: "",
            createDateStart: "",
            createDateEnd: ""
        },
        supplierSearch:{
            supplierName:"",
            creditCode:""
        },
        userStatusList: [
            {code: 1, value: "启用"},
            {code: 2, value: "停用"},
            {code: 3, value: "注销"}
        ],
        operatingStatusList: [
            {code: 1, value: "营业"},
            {code: 2, value: "停业"}
        ],
        typeList: [
            {code: 1, value: "科技"},
            {code: 2, value: "教育"}
        ],
        oldPassword: "",
        newPassword: "",
        newPasswordSure: "",
        chooseUserId: ""
    },
    methods: {

        //搜索
        querySupplier: function () {
            this.reload();
        },
        //重置
        clearSupplier: function () {
            this.supplierSearch = {
                supplierName:"",
                creditCode:""
            };
            this.reload();
        },
        //新增
        addSupplier: function () {
            this.showList = 2;
            this.title = "新增";
            this.opName = "add";
            this.supplier = {
                blackList:1
            };
        },

        //跳转详情页面
        supplierDetails:function(){
            var supplierId = getSelectedRow();
            if (supplierId == null) {
                return;
            }
            this.showList = 3;
            this.title = "详情";
            this.opName = "details";
            this.getInfo(supplierId);
            this.getContract(supplierId);
        },

        //跳转黑名单页面
        getBlackList:function(){
            this.$router.push({ path:'/blackList.html'  })
        },

        //跳转修改页面
        updateFinUser: function (event) {
            var supplierId = getSelectedRow();
            if (supplierId == null) {
                return;
            }
            this.showList = 2;
            this.title = "修改";
            this.opName = "update";
            this.getInfo(supplierId);
        },
        //新增或修改
        saveOrUpdate: function (event) {
            var url = this.supplier.supplierId == null ? "contract/supplier/save" : "contract/supplier/update";
            var _this = this;

            console.log("============")
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(this.supplier),
                success: function (r) {
                    if (r.code === 1) {
                        alert('操作成功', function (index) {
                            _this.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        //删除
        del: function (event) {
            var supplierIds = getSelectedRows();
            if (supplierIds == null) {
                return;
            }
            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "contract/supplier/delete",
                    contentType: "application/json",
                    data: JSON.stringify(supplierIds),
                    success: function (r) {
                        if (r.code == 1) {
                            alert('操作成功', function (index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },

        //获取相关合同
        getContract:function(supplierId){
            $("#jqGrid").jqGrid({
                url: baseURL + 'contract/contract/list'+supplierId,
                datatype: "json",
                colModel: [

                    {label: 'supplierId', name: 'supplierId', index: 'supplier_id', width: 10, key: true, hidden: true},
                    {label: '公司名称', name: 'supplierName', index: 'supplier_name', width: 140, align: 'center'},
                    {label: '统一社会信用代码', name: 'creditCode', index: 'credit_code', width: 140, align: 'center'},
                    {label: '法定代表人', name: 'legaRepresentative', index: 'lega_representative', width: 100, align:'center'},
                    {label: '所属地', name: 'attribution', index: 'attribution', width: 100},
                    {label: '注册资本', name: 'registeredCapital', index: 'registered_capital', width: 140, align: 'center'},
                    {label: '经营状态,1:营业,2:停业,3:跑路', name: 'operatingStatus', index: 'operating_status', width: 10, hidden: true},
                    {
                        label: '经营状态',
                        name: 'operatingStatus',
                        index: 'operating_status',
                        width: 80,
                        sortable: false,
                        align: 'center',
                        formatter: function (cellValue, options, rowData) {
                            var val = "";
                            var operatingStatus = rowData["operatingStatus"];
                            if (operatingStatus == "1") {
                                val = "营业";
                            } else if (operatingStatus == "2") {
                                val = "停业";
                            } else if (operatingStatus == "3") {
                                val = "跑路";
                            }
                            return val;
                        }
                    },
                    {
                        label: '公司类型,1:主账号,2:子账号', name: 'supplierType', index: 'supplier_type', width: 80, hidden: true
                    },
                    {
                        label: '公司类型', name: 'supplierType', index: 'supplier_type', width: 80, sortable: false, align: 'center',
                        formatter: function (cellValue, options, rowData) {
                            var val = "";
                            var type = rowData["supplierType"];
                            if (type == "2") {
                                val = "教育";
                            } else if (type == "1") {
                                val = "科技";
                            }
                            return val;
                        }
                    },
                    {label: '经营范围', name: 'businessScope', index: 'business_scope', width: 180, align: 'center'},
                    {label: '黑名单，1：2：', name: 'status', index: 'status', width: 10, hidden: true},
                    {
                        label: '黑名单', name: 'status', index: 'status', width: 100, sortable: false, align: 'center',
                        formatter: function (cellValue, options, rowData) {
                            var val = "";
                            var status = rowData["status"];
                            if (status == "1") {
                                val = "移入黑名单";
                            } else if (status == "0") {
                                val = "移出黑名单";
                            }
                            return val;
                        }
                    },
                    // {label: '操作',  width: 100, sortable: false, align: 'center',
                    //     formatter:function (cellValue, options, rowData) {
                    //     return "<button class='btn btn-primary' @click='supplierDetails'>详情</button>"
                    //     }
                    // },
                ],
                viewrecords: true,
                height: 385,
                rowNum: 20,
                rowList: [20, 30, 40, 50],
                rownumbers: true,
                rownumWidth: 25,
                autowidth: true,
                shrinkToFit: false,
                multiselect: true,
                pager: "#jqGridPager",
                jsonReader: {
                    root: "page.list",
                    page: "page.currPage",
                    total: "page.totalPage",
                    records: "page.totalCount"
                },
                prmNames: {
                    page: "page",
                    rows: "limit",
                    order: "order"
                },
                gridComplete: function () {
                    //隐藏grid底部滚动条
                    // $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                }
            });
        },
        handleFinUser: function (num) {
            var userIds = getSelectedRows();
            if (userIds == null) {
                return;
            }
            var ids = [];
            for (var i = 0; i < userIds.length; i++) {
                ids.push(userIds[i] + "--" + num);
            }
            var msg = "";
            if (num == 1) {
                msg = "确定启用所选客户的账户信息";
            } else if (num == 2) {
                msg = "确定停用所选客户的账户信息";
            } else if (num == 3) {
                msg = "确定注销所选客户的账户信息";
            }
            var _this = this;
            confirm(msg, function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "business/finuser/handleFinUser",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function (r) {
                        if (r.code == 1) {
                            alert(r.msg, function (index) {
                                _this.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },

        //得到所选id的信息
        getInfo: function (supplierId) {
            var _this = this;
            $.get(baseURL + "contract/supplier/info/" + supplierId, function (r) {
                _this.supplier = r.supplier;
                console.log(_this.supplier+"===================")
            });
        },

        //搜索函数
        reload: function (event) {
            this.showList = 1;
            // var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            var postData = {
                "supplierName":this.supplierSearch.supplierName,
                "creditCode":this.supplierSearch.creditCode,
            };
            console.log(postData.supplierName)
            $("#jqGrid").jqGrid('setGridParam', {
                page: 1, "postData": postData
            }).trigger("reloadGrid");
        },
        finUserOrgTree: function (num) {
            var _this = this;
            this.getFinOrgInfoTreeData();
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择所属机构",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#finUserOrgInfoTreeLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    // console.log("node====", node, "==num==", num);
                    if (null != node) {
                        if (num == 1 || num == "1") {
                            _this.finUserSearch.orgId = node[0]["orgId"];
                            _this.finUserSearch.orgName = node[0]["orgName"];
                        } else if (num == 2 || num == "2") {
                            //选择上级菜单
                            _this.finUser.orgId = node[0]["orgId"];
                            _this.finUser.orgName = node[0]["orgName"];
                        }
                    }
                    layer.close(index);
                }
            });
        },
        checkStartDate: function () {
            if (this.finUserSearch.createDateStart) {
                if (this.finUserSearch.createDateEnd) {
                    var start = new Date((this.finUserSearch.createDateStart).replace(/-/g, '/'));
                    var end = new Date((this.finUserSearch.createDateEnd).replace(/-/g, '/'));
                    if (start.getTime() > end.getTime()) {
                        alert("起始时间不能大于截止时间！");
                        this.finUserSearch.createDateStart = '';
                        return;
                    }
                }

            }
        },
        checkEndDate: function () {
            if (this.finUserSearch.createDateEnd) {
                if (this.finUserSearch.createDateStart) {
                    var start = new Date((this.finUserSearch.createDateStart).replace(/-/g, '/'));
                    var end = new Date((this.finUserSearch.createDateEnd).replace(/-/g, '/'));
                    if (end.getTime() < start.getTime()) {
                        alert("截止时间不能小于起始时间！");
                        this.finUserSearch.createDateEnd = '';
                        return;
                    }
                }

            }
        },
        getFinOrgInfoTreeData: function () {
            var _this = this;
            //加载菜单树
            $.get(baseURL + "business/finorginfo/finOrgTreeList", function (r) {
                var arr = [];
                if (null != r["data"] && r["data"].length > 0) {
                    var total = r["data"].length;
                    for (var i = 0; i < total; i++) {
                        var obj = r["data"][i];
                        obj["name"] = r["data"][i]["orgName"];
                        arr.push(obj);
                    }
                }
                ztree = $.fn.zTree.init($("#finUserOrgInfoTree"), setting, arr);
                if (_this.finOrgInfo != null) {
                    var node = ztree.getNodeByParam("orgId", _this.finOrgInfo.parentId);
                    if (null != node) {
                        ztree.selectNode(node);
                        _this.finOrgInfo.parentName = node.orgName;
                    }
                }
            })
        }
    }
});

//加载页面
function read(){
    $("#jqGrid").jqGrid('setGridParam', {
        page: 1
    }).trigger("reloadGrid");
}

window.onload = window.onresize = function () {
    var target = document.querySelector(".ui-jqgrid-bdiv");
    if (target) {
        target.style.height = (document.documentElement.clientHeight - document.querySelector('.ui-jqgrid').offsetTop - 82) + 'px';
    }
};