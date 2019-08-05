<template>
  <v-card :color="termColor" @click="clicked">
    <v-container grid-list-md text-xs-center>
      <v-layout justify-center>
        <v-card-title class="font-weight-bold title-class">
          {{ classData.classSummary.title }}
        </v-card-title>
      </v-layout>
      <v-layout wrap align-light>
        <p class="font-weight-bold title-class">
          {{ classData.classSummary.faculty }}学部,{{
            classData.classSummary.department
          }}学科,{{ classData.classSummary.grade }}年,{{
            classData.classSummary.professor
          }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </p>
        <img
          v-if="classData.classSummary.isRandom"
          class="random"
          src="@/assets/random.png"
          alt="抽選"
        />
      </v-layout>
      <v-layout justify-center>
        <app-evaluation-item
          :tag-label="label"
          output
          :model="result"
        ></app-evaluation-item>
      </v-layout>
      <v-layout justify-center>
        <app-evaluation-item
          :tag-label="label"
          :output="false"
          colors="#FAFAD2"
          :model="model"
          @rating-selected="eventTest2"
        ></app-evaluation-item>
      </v-layout>
      <v-btn block color="secondary" :href="classData.link" target="_blank" dark
        >シラバスに飛ぶ
      </v-btn>
      <app-comment-box :comments="classData.comments"></app-comment-box>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import AppEvaluationItem from '@/components/AppEvaluationItem.vue';
import AppCommentBox from '@/components/AppCommentBox.vue';
import { ClassData } from '@/src/types';
import { classSummary, comments } from '../mock_datas';

@Component({
  components: {
    AppEvaluationItem,
    AppCommentBox
  }
})
export default class DetailPage extends Vue {
  public classData: ClassData = {
    classSummary: classSummary,
    comments: comments,
    link: 'google.com'
  };
  public label: string = 'オススメ度';
  public result: number = 2.32;
  public model: number = 0;
  get termColor(): string {
    if (this.classData.classSummary.term === 'spring') {
      return '#ffebee';
    } else if (this.classData.classSummary.term === 'autumn') {
      return '#FFF3E0';
    } else {
      return '#ECEFF1';
    }
  }
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
