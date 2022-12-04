<template>
  <!-- 로그인폼 시작 -->
  <div class="login-wrapper">
    <div class="login_content">
      <div class="logo-section">
        <a class="logo" href="/">
          <span style="color: rgb(229, 115, 115); font-size: 30px; font-weight: bold">
            다나와 홈즈
          </span>
        </a>
      </div>

      <form class="loginFrm" v-on:submit.prevent>
        <v-text-field
          type="text"
          v-model="user.userId"
          @keyup.enter="confirm"
          label="ID"
          placeholder="아이디"
        />
        <v-text-field
          type="password"
          v-model="user.userPw"
          @keyup.enter="confirm"
          placeholder="비밀번호"
          label="Password"
        />
        <v-btn type="submit" class="login-btn" @click="confirm" @keyup.enter="confirm"
          >로그인</v-btn
        >
      </form>
      <div class="service">
        <ul>
          <li><a href="/user/join"> 회원가입 </a></li>
          <li><a href="/user/findId">아이디 찾기</a></li>
          <li><a href="/user/findPw">비밀번호 찾기</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      user: {
        userId: null,
        userPw: null,
      },
    };
  },
  computed: {
    ...mapState(["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    ...mapActions(["userConfirm", "getUserInfo"]),
    async confirm() {
      //로그인 버튼 클릭시 이벤트
      //비동기 호출
      await this.userConfirm(this.user);

      //토큰 가져오기
      let token = sessionStorage.getItem("access-token");
      console.log(token);

      //발급 받은 토큰을 통해 비동기로 데이터 요청
      if (this.isLogin) {
        await this.getUserInfo(token);
        this.$router.push({ name: "aptMain" });
      }
    },
  },
};
</script>

<style scope>
form {
  margin-bottom: 0px;
}

.login-wrapper {
  margin-top: 100px;
  position: relative;
  height: 100%;
  animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.login_content {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 360px;
}

h3 {
  margin: 30px 0 10px;
  font-size: 16px;
  font-weight: 700;
}

input ::placeholder {
  color: rgb(94, 94, 94);
}

.login {
  width: 100%;
  padding: 21px 0 17px;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  color: black;
  background-color: rgb(224, 224, 224);
  font-size: 20px;
  font-weight: 400;
}

.service {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: black;
  margin: 0 10px;
}

.service > ul {
  padding: 0px;
}

.service > ul > li {
  display: inline-block;
}

.service > ul > li::after {
  color: rgb(224, 224, 224);
  content: " | ";
  font-weight: 600;
}

.service > ul > li:last-child::after {
  content: "";
}

.logo-section {
  text-align: center;
}
.v-input {
  margin-top: 20px;
}
.login-btn {
  width: 100%;
  min-height: 40px;
  max-height: 40px;
  margin: 10px 0;
}
</style>
