var comment = document.querySelector('#comment');
var ips = document.querySelector('.input1');
var textarea = document.querySelector('.textarea1');
var tjpl = document.getElementById('tjpl')
tjpl.onclick = function () {
    if (ips.value == '' || textarea.value == '') {
        alert("输入不能为空！");
        return;
    }
    var divs = document.createElement('div');
    divs.className = 'comment1';
    divs.innerHTML = '网友昵称:';
    comment.appendChild(divs);
    var spans = document.createElement('span');
    spans.innerHTML = ips.value;
    divs.appendChild(spans);
    var time = document.createElement('time');
    time.innerHTML = new Date().toLocaleString();
    divs.appendChild(time);
    var ps = document.createElement('p');
    ps.innerHTML = textarea.value;
    divs.appendChild(ps);
    var del = document.createElement('button');
    del.className = 'del';
    del.innerHTML = '删除';
    divs.appendChild(del);

    del.onclick = function () {
        comment.removeChild(this.parentNode);
    }

    ips.value = '';
    textarea.value = '';
}