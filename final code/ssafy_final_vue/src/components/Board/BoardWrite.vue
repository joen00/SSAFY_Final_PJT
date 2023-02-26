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
        <span class="board_title">글쓰기</span>
      </div>
      <div class="writerclass">
        <v-row>
          <!-- 오른쪽 -->
          <v-col cols="18">
            <v-col cols="12">
              <v-text-field
                v-model="title"
                :counter="200"
                label="제목"
                required
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="user_id"
                :counter="200"
                label="작성자"
                required
                outlined
                dense
                disabled
              ></v-text-field>
              <v-combobox
                outlined
                v-model="select"
                :items="items"
                label="구 / 군을 선택해주세요"
                chips
              >
                <template v-slot:selection="data">
                  <v-chip
                    :key="JSON.stringify(data.item)"
                    v-bind="data.attrs"
                    :input-value="data.selected"
                    :disabled="data.disabled"
                    @click:close="data.parent.selectItem(data.item)"
                  >
                    <v-avatar
                      class="accent white--text"
                      left
                      v-text="data.item.slice(0, 1).toUpperCase()"
                    ></v-avatar>
                    {{ data.item }}
                  </v-chip>
                </template>
              </v-combobox>
              <div id="app">
                <ckeditor v-model="editorData" :config="editorConfig"></ckeditor>
              </div>
              <br />
              <v-btn
                class="btn_submit"
                rounded
                large
                color="#e57373"
                style="float: right"
                @click="write()"
              >
                <v-icon left> mdi-pencil </v-icon>
                완료
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { boardWrite } from "@/api/board";
import http from "@/util/http-common";

export default {
  data() {
    return {
      title: "",
      user_id: "",
      select: "",
      items: [],
      sido: "서울특별시",
      editorData: "",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.user_id = this.userInfo.userId;
    http.get(`home/gugunName?sidoName=서울특별시`).then(({ data }) => {
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i].gugunName);
      }
    });
  },
  methods: {
    ...mapActions([""]),
    write() {
      // console.log(this.editorData);
      let board = {
        title: this.title,
        user_id: this.user_id,
        gugun: this.select,
        content: this.editorData,
        sido: this.sido,
      };
      boardWrite(
        //api
        board,
        ({ data }) => {
          if (data === "success") {
            alert("글 작성이 완료되었습니다.");
            this.$router.push({ name: "board" });
          } else {
            console.log("에러~~");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //
    moveBoardListPage() {
      this.$router.push({ name: "board" }).catch(() => {});
    },
  },
};
</script>

<style>
.AddWrap {
  width: 60%;
  height: 1000px;
  margin: auto;
}
</style>
