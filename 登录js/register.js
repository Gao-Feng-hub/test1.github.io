document.getElementById("btn").onclick = function(){
    // 1.获取用户名、邮箱、密码、确认密码
    let userName = document.getElementById("userName").value
    let email = document.getElementById("email").value
    let password = document.getElementById("pwd").value
    let repwd = document.getElementById("repwd").value

    //2.将基本信息存储到对象
    let userInfo = {
        userName:userName,
        email:email,
        password:password,
    }

    //3.判断两次密码是否一致
    if(password != repwd){
        alert("两次密码输入不一致")
        return false
    }

    // 4.储存到本地
    localStorage.setItem("userInfo",JSON.stringify(userInfo))

    //5.注册成功并在1s之后跳转到登录页面
    alert("注册成功，即将跳转!")
    setTimeout("location.href='login.html'",1000)
}