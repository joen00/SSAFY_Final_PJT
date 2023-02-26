<template>
  <div class="join">
    <div class="form-box">
      <h1>다나와 홈즈</h1>
      <v-text-field
        type="text"
        v-model="userId"
        label="ID"
        placeholder="아이디(8~20자)"
        ref="idInput"
      />

      <div id="idValid" ref="idValid"></div>

      <v-text-field
        type="password"
        v-model="userPw"
        label="Password"
        placeholder="(대문자, 소문자, 특수문자 8~20자리)"
        autocomplete="new-password"
      />

      <div ref="pwValid"></div>

      <v-text-field
        type="password"
        v-model="userPw2"
        label="Password Confirm"
        placeholder="(대문자, 소문자, 특수문자 8~20자리)"
        autocomplete="off"
      />

      <div ref="pwConfirmValid"></div>

      <v-text-field type="text" v-model="userName" label="Name" />

      <div ref="nameValid"></div>

      <v-text-field type="text" v-model="phone" label="Phone" placeholder="010-0000-0000" />
      <div ref="phoneValid"></div>

      <v-btn type="submit" id="joinBtn" @click="join">회원가입</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { duplicateCheck, registUser } from "@/api/member";
export default {
  data() {
    return {
      userId: null,
      userPw: null,
      userPw2: null,
      userName: null,
      phone: null,
      isIdCheck: null,
      isPwCheck: null,
      isNameCheck: null,
      isPhoneCheck: null,
    };
  },
  watch: {
    userId() {
      const idValid = this.$refs.idValid;
      idValid.style.color = "red";

      if (!this.userId || this.userId.length < 4 || this.userId.length > 20) {
        // userId가 널이거나 빈 값
        this.isIdCheck = false;
        idValid.textContent = "아이디는 4~20자리 이여야 합니다.";
      } else {
        //중복체크
        duplicateCheck(
          this.userId,
          ({ data }) => {
            if (data === "usable") {
              //사용 가능
              this.isIdCheck = true;
              idValid.textContent = "";
            } else {
              // 사용 불가능
              this.isIdCheck = false;
              idValid.textContent = "이미 사용중인 아이디입니다.";
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    userPw() {
      //유효성 검사
      const pwValid = this.$refs.pwValid;
      pwValid.style.color = "red";
    },
    userPw2() {
      const pwConfirmValid = this.$refs.pwConfirmValid;
      pwConfirmValid.style.color = "red";

      if (this.userPw != this.userPw2) {
        pwConfirmValid.textContent = "비밀번호 불일치";
        this.isPwCheck = false;
      } else {
        pwConfirmValid.textContent = "";
        this.isPwCheck = true;
      }
    },
    userName() {
      const nameValid = this.$refs.nameValid;
      nameValid.style.color = "red";
      if (!this.userName) {
        nameValid.textContent = "이름을 입력하세요!!";
        this.isNameCheck = false;
      } else {
        nameValid.style.color = "black";
        nameValid.textContent = "멋진 이름이네요 ㅋ";
        this.isNameCheck = true;
      }
    },
    phone() {
      const phoneValid = this.$refs.phoneValid;
      phoneValid.style.color = "red";
      if (!this.phone || this.phone.length < 11) {
        phoneValid.textContent = "연락처 입력.";
        this.isPhoneCheck = false;
      } else {
        phoneValid.textContent = "";
        this.isPhoneCheck = true;
      }
    },
  },
  methods: {
    ...mapActions(["userConfirm", "getUserInfo"]),
    join() {
      if (!this.isIdCheck) {
        alert("아이디 확인!");
        return false;
      } else if (!this.isPwCheck) {
        alert("두 비밀번호 확인");
        return false;
      } else if (!this.isNameCheck) {
        alert("이름을 입력하세요!");
        return false;
      } else if (!this.isPhoneCheck) {
        alert("연락처를 입력하세요!");
        return false;
      } else {
        let user = {
          userId: this.userId,
          userPw: this.userPw,
          userName: this.userName,
          phone: this.phone,
        };
        console.log(user);
        registUser(
          user,
          ({ data }) => {
            if (data === "success") {
              //사용 가능
              alert("회원가입이 완료되었습니다.");
              this.movePage("/home");
            } else {
              // 사용 불가능
              alert("회원가입 오류.");
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
    movePage(path) {
      this.$router.push({ path: path });
    },
  },
};
</script>

<style scope>
.join {
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 1000px;
  background-color: white;
  margin: 0px auto;
  -webkit-animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.form-box {
  width: 300px;
  flex-direction: row;
  margin: 50px 80px;
}
.form-box h1 {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  color: rgb(229, 115, 115);
  font-size: 30px;
  font-weight: bold;
}

#joinBtn,
#loginBtn {
  width: 300px;
  height: 50px;
  margin-top: 10px;
  font-size: 20px;
}
#joinLink {
  font-size: 18px;
  color: black;
  transition: all 0.2s;
  text-decoration: underline;
}
#joinLink:hover {
  font-size: 20px;
  font-weight: 500;
}
#backBtn {
  color: rgb(229, 115, 115);
}
</style>
