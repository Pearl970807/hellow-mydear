$(function() {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    form.verify({
            // 自定义了一个叫做 pwd 校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            // 校验两次密码是否一致的规则
            repwd: function(value) {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致！'
                }
            }
        })
        // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
            }
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault(),
            $.ajax({
                url: '/api/login',
                method: 'POST',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('登录失败！')
                    }
                    layer.msg('登录成功！')
                        // 将登录成功得到的 token 字符串，保存到 localStorage 中
                    localStorage.setItem('token', res.token)
                        // 跳转到后台主页
                    location.href = '/index.html'
                }
            })
    })
})