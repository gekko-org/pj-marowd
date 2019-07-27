<template>
  <div>
    <p>
      This is ShowCase
      <AppFilterSearch @input="EventTest"></AppFilterSearch>
    </p>
    <p>
      <AppGoodButton
        fav="121"
        @favPush="EventTest"
        @favUnPush="EventTest"
      ></AppGoodButton>
    </p>
    <p>
      <AppComment :comment="testComment"></AppComment>
      <AppEvaluationItem
        :output="false"
        :model="evaluationItemModel"
        tagLabel="心地よさ"
        @rating-selected="EventTest"
      >
      </AppEvaluationItem>
    </p>
    <AppEvaluationItems
      :labels="['HP', '攻撃', '防御', '素早さ', '運']"
      :out="false"
      colors="#FAFAD2"
      @rating-selected="EventTest2"
    ></AppEvaluationItems>
    <br />
    <AppEvaluationItems
      :labels="['HP', '攻撃', '防御', '素早さ', '運']"
      :out="true"
      :value="[1, 2, 3, 4, 5]"
      colors="#E6E6FA"
      @rating-selected="EventTest2"
    ></AppEvaluationItems>
    <AppClassSummary :classSummary="testClassSummary" @click="EventTest">
    </AppClassSummary>
    <AppCommentBox :comments="testComments"></AppCommentBox>
    <DetailPage
      title="アドラー心理学基礎"
      faculty="心理"
      grade="1"
      professor="アルフレッド・アドラー"
      :is-random="true"
      department="個人心理"
      :rating="4.76"
      last-updated-by="reud"
      term="autumn"
      link="https://www.youtube.com/"
    ></DetailPage>
    <router-link to="/neworeditpage">
      <v-btn color="success">新規授業登録</v-btn>
    </router-link>
  </div>
</template>

<script lang="ts">
import AppCommentBox from '@/components/AppCommentBox.vue';
import { Component, Vue } from 'vue-property-decorator';
import DetailPage from '@/views/DetailPage.vue';
import AppFilterSearch from '@/components/AppFilterSearch.vue';
import AppGoodButton from '@/components/AppGoodButton.vue';
import AppComment from '@/components/AppComment.vue';
import AppEvaluationItem from '@/components/AppEvaluationItem.vue';
import AppEvaluationItems from '@/components/AppEvaluationItems.vue';
import AppClassSummary from '@/components/AppClassSummary.vue';
// 変数のimport時に@マークでうまく指定できない (interfaceはうまくいく)
import { classSummary, comments, comment } from '../mock_datas';
import { ClassSummary, Comment } from '@/src/types';

@Component({
  components: {
    DetailPage,
    AppCommentBox,
    AppFilterSearch,
    AppGoodButton,
    AppComment,
    AppEvaluationItem,
    AppEvaluationItems,
    AppClassSummary
  }
})
export default class ShowCase extends Vue {
  public evaluationItemModel: number = 0;
  public evaluationItemModel2: number | null = null;
  public testComments: Comment[] = comments;
  public testComment: Comment = comment;
  public testClassSummary: ClassSummary = classSummary;

  public EventTest(val: number) {
    alert(`Fired: ${val}`);
  }

  public static EventTest2(val: string, label: string) {
    alert(val + ',' + label);
  }
}
</script>

<style scoped></style>
