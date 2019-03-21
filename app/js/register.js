var check = {
    email(val) {
        const reg = /^\w+@\w+\.\w+$/;
        return reg.test(val);
    },
    username(val) {
        const reg = /^\w{6,13}$/;
        return reg.test(val);

    },
    name(val) {
        const reg = /^[\u4e00-\u9fa5]{2,5}$/;
        return reg.test(val);
    },
    password(val) {
        const reg = /^\w{6,18}$/;
        return reg.test(val);
    },
    phone(val) {
        const reg = /^1[35789]\d{9}$/;
        return reg.test(val);
    }
}
var checkInput = (function () {
    let $requestInpAll,
        $form,
        $btn;
    return {
        init(ele) {
            $form = document.querySelector(ele);
            $requestInpAll = document.querySelectorAll('input[required]');
            console.log($requestInpAll)
            $btn = document.querySelector('.btn');
            this.event();
        },
        event() {
            const self = this;
            for (let i = 0; i < $requestInpAll.length; i++) {
                $requestInpAll[i].onblur = function () {
                    self.tips(this)
                }
            }
            // 再次输入密码
            $form['repassword'].onblur = function () {
                // 获取文本内容
                let text = this.value;
                const $p = this.nextElementSibling;
                if (text == $requestInpAll[4].value) {
                    // 验证成功
                    $p.innerHTML = '验证成功';
                    $p.className = 'bg-success';
                } else {
                    // 验证失败
                    $p.innerHTML = '两次密码输入不一致';
                    $p.className = 'bg-danger';
                }
            }
            $btn.onclick = function () {
                for (let i = 0; i < $requestInpAll.length; i++) {
                    const $input = $requestInpAll[i];
                    const $p = $input.nextElementSibling;
                    if ($p.className != 'bg-success') {
                        $input.focus();
                        return false;
                    }
                }
                alert('所有表单验证成功');
            }
        },
        tips($input) {
            // 根据不同的表单， 使用不同的正则表达式
            const name = $input.name; //username
            const text = $input.value;
            const $p = $input.nextElementSibling;
            if (check[name](text)) {
                // 验证成功
                $p.innerHTML = '验证成功';
                $p.className = 'bg-success';
            } else {
                // 验证失败
                $p.innerHTML = $input.getAttribute('data-error');
                $p.className = 'bg-danger';
            }
        }
    }
}())