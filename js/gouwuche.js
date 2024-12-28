//第一个表格
function show(image, event) {
    var x;
    var y;
    document.getElementById("photo").style.display = "block";
    x = parseFloat(event.clientX) + parseFloat(document.documentElement.scrollLeft);
    y = parseFloat(event.clientY) + parseFloat(document.documentElement.scrollTop);
    document.getElementById("photo").style.top = y + "px";
    document.getElementById("photo").style.left = x + "px";
    document.getElementById("big").src = "images/" + image;

}

function shows() {
    document.getElementById("photo").style.display = "block";
}

function hidden() {
    document.getElementById("photo").style.display = "none";
}
window.onscroll = "show()";

//------------------------------------------------------------------------------------------------				
var map = new Map(); //创建一个集合

function add_shoppingcart(btn) { //btn就是上面传下来的this
    //console.log(btn);
    var ntr = document.createElement("tr");
    //获取到商品的价格和名称
    var tr = btn.parentNode.parentNode; //获取到按钮的父亲 
    var tds = tr.children;
    //获取商品的名称
    var name = tds[0].innerHTML;
    //获取商品的价格
    var price = tds[2].innerHTML;
    console.log("name:" + name + ",price:" + price);

    //判断集合中是否又加入商品.如果有不能加入,只能加数量,没有可加入
    if (map.has(name)) {
        //如果有不能加入,只能加数量
        var tr1 = map.get(name);
        //console.log(tr1);
        var btn1=tr1.getElementById("btn1");                                                
        var btn1 = tr1.getElementsByTagName("button")[1];
        //console.log(btn1);
        jia(btn1);
    } else {
        //如果没有该商品,可以正常添加
        ntr.innerHTML =
            `
                <td  style="display: table-cell; text-align: center; vertical-align: middle;">${name}</td>
                 <td  style="display: table-cell; text-align: center; vertical-align: middle;">${price}</td>
                <td  style="display: table-cell; text-align: center; vertical-align: middle;">
                <input type="text" value="1" size="1" />
                </td>
                <td style="display: table-cell; text-align: center; vertical-align: middle;">${price}</td>
                <td  style="display: table-cell; text-align: center; vertical-align: middle;"><button onclick="del(this)">X</buttton></td>
            `;
        //将name和一行数据存入到集合中
        map.set(name, ntr);
        //找到tbody的对象
        var tbody = document.getElementById("goods");
        //把上面创建好的一行五列加入到tbody中
        tbody.appendChild(ntr);
        sum();
    }
}

function del(btn) {
    var tr = btn.parentNode.parentNode;
    tr.remove(); //删除的是DOM文档中的内容,并没有把集合中的内容删除.
    var tr = btn.parentNode.parentNode; //获取到按钮的父亲
    var tds = tr.children;
    //获取商品的名称
    var name = tds[1].innerHTML;
    map.delete(name); //删除的是集合中的内容
    nane = ''
    sum();
}

function jian(btn) {
    var inpt = btn.nextElementSibling;
    var amount = inpt.value;
    if (amount <= 1) {
        return;
    } else {
        inpt.value = --amount;
        var trs = btn.parentNode.parentNode;
        console.log(trs);
        var price = parseFloat(trs.children[1].innerHTML);
        trs.children[3].innerHTML = price * amount;
        sum();
    }
}

//求所有商品的累加和
function sum() {
    //获取到tbody的对象
    var tbody = document.getElementById("goods");
    var trs = tbody.children; //得到tbody的孩子
    var total = 0; //用于求累加和
    for (i = 0; i < trs.length; i++) { //取到每一个商品的价格
        var price = trs[i].children[3].innerHTML;
        total = total + parseFloat(price);
    }
    var t = document.getElementById("total");
    //然后把total的值放入到t对象中
    t.innerHTML = total;
}

function tk(){
    alert("购买成功！！！")
}