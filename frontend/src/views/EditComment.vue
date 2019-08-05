<template>
  <v-container id="grid" fluid grid-list-sm tag="section">
    <v-form ref="form" lazy-validation>
      <v-layout class="display-1">
        コメントを追加・編集する
      </v-layout>
      <v-flex xs10 md5>
        <v-text-field
          v-model="name"
          label="タイトル"
          :rules="rules"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 md8>
        <v-textarea Filled auto-grow v-model="text" label="コメント">
        </v-textarea>
      </v-flex>
      <v-layout row-wrap>
        <v-flex md9>
          <v-btn-toggle v-model="commentEvaluate" mandatory dark>
            <v-btn flat><i class="fas fa-thumbs-up"></i>Good!!</v-btn>
            <v-btn flat><i class="fas fa-thumbs-down"></i>Bad</v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex md3>
          <v-btn color="info" :disabled="!valid" @click="submit"
            >レビューを投稿する</v-btn
          >
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class EditComment extends Vue {
  public static ruleDoNotEmpty(s: string): boolean {
    return !!s;
  }

  public get rules(): Array<(v: string) => any> {
    // いつかルール追加するかも・・・？
    const rules: Array<(v: string) => any> = [];
    const doNotEmptyRUle = (v: string) =>
      EditComment.ruleDoNotEmpty(v) || 'Do Not Empty';
    rules.push(doNotEmptyRUle);
    return rules;
  }
  public name: string = '';
  public text: string = '';
  public commentEvaluate: string = '';
  static submit() {
    alert('submitted!');
  }
  public get valid(): boolean {
    return !!(this.name)
  }
}
</script>

<style scoped></style>
