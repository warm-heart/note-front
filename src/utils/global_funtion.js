function changeData() {
    alert("执行成功");
}

function query() {
    alert("查询成功");
}

exports.install = function (Vue, options) {
    Vue.prototype.changeData = changeData();
    Vue.prototype.query = query();
};
