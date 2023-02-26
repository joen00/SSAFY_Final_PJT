<template>
  <div class="AddWrap">
    <div class="menuclass">
      <button class="previous-btn" @click="moveBoardListPage">
        <v-icon style="color: #e57373">fa-solid fa-square-caret-left</v-icon>
        목록보기
      </button>
    </div>

    <div class="boardclass">
      <div class="titleclass">
        <span class="board_title">{{ board.title }}</span>

        <!-- 버튼들 -->
        <button
          class="update-btn"
          @click="
            moveBoardModifyPage(board.bno, board.title, board.user_id, board.content, board.gugun)
          "
          v-if="userInfo && board.user_id == userInfo.userId"
        >
          <v-icon style="color: rgb(255, 255, 255)">fa-light fa-wrench</v-icon>
        </button>
        <button
          class="delete-btn"
          @click="boardDelete(board.bno)"
          v-if="userInfo && board.user_id == userInfo.userId"
        >
          <v-icon style="color: rgb(255, 255, 255)">fa-regular fa-trash-can</v-icon>
        </button>
      </div>
      <div class="writerclass">
        <v-chip v-if="1" :color="`red lighten-4`" class="ml-0 mr-2 black--text" label small>
          작성자
        </v-chip>

        <span> {{ board.user_id }}</span>
        <br />
        <br />
        <v-chip v-if="1" :color="`red lighten-4`" class="ml-0 mr-2 black--text" label small>
          주소
        </v-chip>
        <span> {{ board.sido }} {{ board.gugun }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-chip v-if="1" :color="`red lighten-4`" class="ml-0 mr-2 black--text" label small>
          등록일자
        </v-chip>
        <span> {{ board.regtime }}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <v-chip v-if="1" :color="`red lighten-4`" class="ml-0 mr-2 black--text" label small>
          조회수
        </v-chip>
        <span> {{ board.hit }}</span>
        <br />
        <br />
        <v-divider></v-divider>
        <div class="contentclass" v-html="board.content"></div>
        <!-- comment -->
        <div class="commentclass">
          <div class="comment">
            <v-text-field
              placeholder="댓글 추가..."
              autocomplete="off"
              @focus="focusComment = true"
              v-model="content"
            />
            <div style="text-align: right" v-show="focusComment">
              <v-btn rounded @click="commentInsert" :disabled="content.length < 1">등록</v-btn>
              <v-btn rounded @click="clearComment">취소</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end input Comment -->
    <div class="comment-list-section" v-for="c in comment" :key="c.no">
      <div class="user-image-section">
        <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="32"
          ><span style="color: aliceblue; font-weight: bold">{{ c.userId[0] }}</span></v-avatar
        >
      </div>
      <div class="comment-content-section">
        <div>
          <b>{{ c.userId }}</b> <span style="font-size: 11px">{{ c.writeDate }}</span>
        </div>
        <div>{{ c.content }}</div>
        <div>
          <v-btn icon color="#e57373">
            <v-icon>mdi-thumb-up</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/util/http-common";
import { commentWrite, commnetList } from "@/api/board";
import { mapState } from "vuex";
export default {
  data() {
    return {
      board: [],
      focusComment: false,
      focusEnroll: false,
      content: "",
      comment: [],
    };
  },
  created() {
    this.detailBoard(this.$route.query.bno);

    //댓글 가져와.
    this.getCommentList(this.$route.query.bno);
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    async detailBoard(bno) {
      await http.get(`board/read?bno=` + bno).then(({ data }) => {
        this.board = data;
        console.log(data);
      });
    },
    moveBoardListPage() {
      this.$router.push({ name: "board" });
    },
    boardDelete(bno) {
      http.delete(`board?bno=` + bno).then(({ data }) => {
        console.log(data);
        alert("삭제 완료");
        this.$router.push({ name: "board" });
      });
    },
    moveBoardModifyPage(bno, title, user_id, content, gugun) {
      this.$router.push({
        name: "modify",
        query: { bno, title, user_id, content, gugun },
      });
    },
    clearComment() {
      this.focusComment = false;
      this.content = "";
    },
    async commentInsert() {
      if (!this.content) {
        return false;
      }
      //로그인 정보가 없으면
      if (!this.userInfo) {
        return false;
      }
      let comment = {
        bno: this.board.bno,
        userId: this.userInfo.userId,
        content: this.content,
      };

      await commentWrite(
        comment,
        async ({ data }) => {
          if (data === "success") {
            //댓글 목록 불러와
            console.log("댓글 등록 성공");
            this.clearComment();
            this.comment = [];

            this.getCommentList(this.board.bno);
          } else {
            //작성 실패..
            console.log("댓글 등록 실패");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getCommentList(bno) {
      await commnetList(
        bno,
        async ({ data }) => {
          console.log(data);
          if (data) {
            data.forEach((c) => {
              this.comment.push(c);
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style>
.AddWrap {
  width: 60%;
  height: 800px;
  margin: auto;
}
.menuclass {
  margin-top: 10px;
}
.boardclass {
  border-radius: 0.5em;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(224, 224, 224);

  min-height: 80vh;
  margin-top: 10px;
}
.titleclass {
  height: 13%;
  border-radius: 0.5em 0.5em 0em 0em;
  background-color: #e57373;
  color: #ffffff;
  border: 1px;
  text-align: left;
  padding: 0.5em;

  position: relative;
}
.board_title {
  font-weight: bold;
  font-size: 24px;
  margin-left: 10px;
}
.writerclass {
  height: 8%;
  background-color: rgb(255, 255, 255);
  border: 1px;
  margin: 1em;
}
.contentclass {
  margin: 1em;
  max-height: 50vh;
  min-height: 50vh;
}
.commentclass {
  height: 20%;
  border-radius: 0.5em;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(224, 224, 224);
}
.comment {
  margin: 20px;
}
.comment-list-section {
  display: flex;
  margin: 20px 0;
}
.user-image-section {
  padding: 7px 15px;
}
.update-btn {
  position: absolute;
  right: 50px;
  top: 10px;
}
.delete-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.previous-btn {
  color: #e57373;
  font-weight: bold;
  font-size: 20px;
}
</style>
