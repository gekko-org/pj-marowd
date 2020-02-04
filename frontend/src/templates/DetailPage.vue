<template>
  <v-card :color="termColor" @click="clicked">
    <v-container grid-list-md text-xs-center>
      <v-layout justify-center>
        <v-card-title class="font-weight-bold title-class">
          {{ modelClass.title }}
        </v-card-title>
      </v-layout>
      <v-layout wrap align-light>
        <p class="font-weight-bold title-class">
          {{ modelClass.faculty }}学部,{{ modelClass.department }}学科,{{
            modelClass.grade
          }}年,{{
            modelClass.professor
          }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <img
          v-if="modelClass.isRandom"
          class="random"
          src="@/assets/random.png"
          alt="抽選"
        />
      </v-layout>
      <v-layout justify-center>
        <app-evaluation-item :tag-label="label" output :model="result" />
      </v-layout>
      <v-layout justify-center>
        <app-evaluation-item
          :tag-label="label"
          :output="false"
          colors="#FAFAD2"
          :model="model"
          @rating-selected="eventTest2"
        />
      </v-layout>
      <v-btn block color="secondary" :href="classData.link" target="_blank" dark
        >シラバスに飛ぶ
      </v-btn>
      <app-comment-box :comments="classData.comments" />
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator';
import AppEvaluationItem from '@/components/AppEvaluationItem.vue';
import AppCommentBox from '@/components/AppCommentBox.vue';
import { Comment, ModelClass } from './../gen';

@Component({
  components: {
    AppEvaluationItem,
    AppCommentBox
  }
})
export default class DetailPage extends Vue {
  @Prop({ required: true })
  modelClass!: ModelClass;
  @Prop({ required: true })
  comments!: Comment[];

  // TODO: @reud ラベルなどはJSONに移す。
  public label: string = 'オススメ度';
  public result: number = 0;
  public model: number = 0;

  get termColor(): string {
    if (this.modelClass.term === 'spring') {
      return '#ffebee';
    }
    if (this.modelClass.term === 'autumn') {
      return '#FFF3E0';
    }
    return '#ECEFF1';
  }

  // TODO: @reud レート設定時のイベントを実装する。
  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  click(val: number) {}

  clicked(val: number) {
    this.click(val);
  }

  eventTest2(val: number, label: string) {
    alert(val + ',' + label);
  }
}
</script>

<style scoped>
img.random {
  width: 70px;
  height: 70px;
}

p.font-setting {
  font-size: 25px;
  text-align: right;
}

.title-class {
  font-size: 25px;
}
</style>
