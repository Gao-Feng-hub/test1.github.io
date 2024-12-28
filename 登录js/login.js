document.getElementById("loginButton").onclick = function(){
    // 1.获取用户名、密码
    let userName = document.getElementById("userName").value
    let password = document.getElementById("pwd").value

    //2.获取本地储存的用户名和密码
    let userInfo = JSON.parse(localStorage.getItem("userInfo"))

    //3.判断用户名或密码是否一致
    if(userName != userInfo.userName || password !=userInfo.password){
        alert("您输入的用户名或密码有误！")
        return false
    }

    //4.判断是否登录，跳转到首页
    let session = sessionStorage.getItem("userInfo")
    if(session != null){
        alert("登录成功")
        location.href="index.html"
    }else{
        sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
        location.href = "index.html"
    }
}