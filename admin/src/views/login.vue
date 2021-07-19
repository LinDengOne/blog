<template>
  <div class="max">
    <login-bg></login-bg>
    <div class=form>
      <form class="login-form" action="javascript:void(0);">
          <h1>{{ btnName }}</h1>
          <div class="form-control">
              <input 
              type="text"
              v-model="data.username"
              placeholder=" "
              autocomplete="off"
              />
              <label for="username">账号</label>
          </div>
          <transition name="fade">
    <div class="form-control" v-if="type === 1">
      <input
        type="text"
        name="username"
        v-model="data.captcha"
        id="captcha"
        placeholder=" "
        autocomplete="off"
      />
      <label for="username">验证码</label>
      <img class="code" @click="changeCode" :src="captcha" alt="">
    </div>
  </transition>
  <div class="form-control">
    <input
      type="password"
      name="password"
      v-model="data.password"
      id="password"
      placeholder=" "
      autocomplete="off"
    />
    <label for="password">密码</label>
  </div>
  <button type="submit" class="btn" @click="operate">{{ btnName }}</button>
  <div class="handleTips">{{cTips}}<span @click="changeType">{{cAuthor}}</span></div>
</form>
    </div>
      
</div>
</template>

<script>
import LoginBg from '../components/loginBg.vue'
export default {
  components:{
    LoginBg
  },
data(){
        return {
              type: 0, // 0是登陆 1 是注册
              data: {
                username: '',
                password: '',
                captcha: ''
              },
             captcha: `http://localhost:3000/admin/api/captcha`
        }
    },
    computed: {
    cTips () {
      return this.type === 0 ? '还没有账号,点击' : '已有账号,点击'
    },
    cAuthor () {
      return this.type === 0 ? '注册' : '登陆'
    },
    btnName () {
      return this.type === 0 ? '登陆' : '注册'
    }
  },
  methods: {
    // 切换验证码
    changeCode () {
      this.captcha = `http://localhost:3000/admin/api/captcha`
    },
    async operate () {
      console.log(this.data)
      const valData = [
        {
          data: this.data.username.trim(),
          msg: '账号不能为空'
        },
        {
          data: this.data.password.trim(),
          msg: '密码不能为空'
        }
      ]
      if (this.type === 1) {
        valData.push({data: this.data.captcha.trim(), msg: '验证码不能为空'})
      }
      const result = valData => {
        let res = true
        for (let item of valData) {
          if (!item.data || item.data.length === 0) {
          res = false
          Message({
            message: item.msg,
            type: 'error',
            offset: 60
          })
          break
        }
      }
      return res
    }
      if (!result) return
      // this.type === 1 && (this.data.id = JSON.parse(localStorage.getItem('userInfo'))._id)
      this.submit ()
    },
    submit () {
      this.type === 0 ? this.landing() : this.enroll()
    },
    changeType () {
      this.type === 0 ? this.type = 1 : this.type = 0
      for (let i in this.data) {
        this.data[i] = ''
      }
    },
    // 登陆
    landing () {
      delete this.data.captcha
      this.$http.post('/login', this.data).then(res => {
        if(res.data.status == 1) {
          localStorage.setItem("Authorization", res.data.body.token)
          this.$store.commit('updataId',res.data.body.info)
          this.$message.success('success')
          this.$router.push('/')
        } else {
          this.$message.error(res.data.body)
        }
      })
    },
    // 注册
    enroll () {
      this.$http.post('/register', this.data).then(res => {
        if(res.data.status == 1) {
          this.$message.success(res.data.body.message)
          this.isCreate()
        } else {
                        this.$alert(res.data.body, '注册失败', { confirmButtonText: '确定' })
                    }
      })
      
    }
  },
}
</script>

<style lang="scss" scoped>

.max{
    width: 100vw;
    height: 100vh;
    &{
    display: flex;
    justify-content: center;
    align-items: center;  
    }
    .icon {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      img {
        width: 100px;
        height: auto;
        cursor: pointer;
      }
    }
}
.form {
    width: 600px;
  }
.form-control {
  --default-color: currentColor;
  --invalid-color: #e74c3c;
  --valid-color: #3498db;
  --border-bottom-color: currentColor;

  position: relative;
  border-bottom: 1px solid var(--border-bottom-color);

  &::after {
    position: absolute;
    content: "";
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 2px;
    background: var(--valid-color);
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s;
  }

  &:focus-within::after {
    transform: scaleX(1);
  }
  .code {
    position: absolute;
    right: -100px;
    top: -16px;
  }
  input {
    padding: 8px 0;
    font-size: inherit;
    font-weight: inherit;
    color: currentColor;
    background: transparent;
    border: none;
    outline: none;

    &:invalid ~ label {
      color: var(--invalid-color);
    }

    &:valid ~ label {
      color: var(--valid-color);
    }

    &:placeholder-shown ~ label {
      color: var(--default-color);
    }
    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      transform: translateY(-120%) scale(0.75);
    }
  }

  label {
    position: absolute;
    top: 8px;
    left: 0;
    transition: 0.3s;
    transform-origin: left;
  }
}

.btn {
  position: relative;
  width: 100%;
  padding: 6px 0;
  font-size: 16px;
  color: currentColor;
  background: transparent;
  border: 2px solid hsla(204, 70%, 53%, 1);
  outline: none;
  cursor: pointer;
  overflow: hidden;
  transition: 0.6s;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      hsla(204, 70%, 53%, 0.5),
      transparent
    );
    transform: translateX(-100%);
    transition: 0.6s;
  }

  &:hover {
    box-shadow: 0 0 20px 10px hsla(204, 70%, 53%, 0.5);
  }

  &:hover::before {
    transform: translateX(100%);
  }
}

.login-form {
  display: flex;
  padding: 100px 50px;
  flex-direction: column;
  align-items: center;
  color: white;
  background: rgba(0,0,0,0.1);
  border-radius: 10px;
  box-shadow: 0 0.4px 0.4px rgba(128, 128, 128, 0.109),
    0 1px 1px rgba(128, 128, 128, 0.155),
    0 2.1px 2.1px rgba(128, 128, 128, 0.195),
    0 4.4px 4.4px rgba(128, 128, 128, 0.241),
    0 12px 12px rgba(128, 128, 128, 0.35);

  h1 {
    margin: 0 0 24px 0;
    font-size: 36px;
  }

  .form-control {
    margin: 18px 0;
  }

  .btn {
    width: 100%;
    margin: 18px 0 9px 0;
  }
}
.handleTips {
  margin-top: 26px;
  letter-spacing: 2px;
  span {
    cursor: pointer;
    color: #007fff
  }
}

@media screen and ( max-width: 600px ) {
  .login-form {
    padding: 26px 20px !important;
    h1 {
      margin: 0 0 24px 0;
      font-size: 24px;
    }
  }
  .form-control {
    width: 40vw;
    margin: 18px 0;
  }
  .code {
    width: 80px;
    right: -80px !important;
    top: -5px !important;
  }
}
</style>