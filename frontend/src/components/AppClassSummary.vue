<template>
  <v-container grid-list-lg>
    <v-flex>
      <v-card :color="termColor" @click="clicked">
        <v-layout justify-center>
          <v-card-title class="font-weight-bold title-class">
            {{ modelClass.title }}
          </v-card-title>
        </v-layout>
        <v-card-text class="pb-0">
          <v-layout wrap align-light>
            {{ modelClass.faculty }}学部,{{ modelClass.department }}学科,{{
              modelClass.grade
            }}年,{{ modelClass.professor }}先生
            <v-flex xs12 sm12 md8 class="font-weight-bold">
              <StarRating
                :increment="0.01"
                :rating="modelClass.rating"
                :read-only="true"
              >
              </StarRating>
            </v-flex>
            <v-flex xs2 sm1 md4>
              <img
                v-if="modelClass.isRandom"
                class="random"
                src="../assets/random.jpg"
                alt="抽選"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text>
          <!-- TODO: @reud ここにコメントを入れる？-->
          <v-card v-for="comment in comments" :key="comment.id">
            <v-card-text class="font-weight-bold ">
              {{ comment.name }}
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs6 sm6 class="font-weight-bold">
              <AppGoodButton :favAmount="modelClass.favAmount" />
            </v-flex>
            <v-flex xs6 sm6 class="font-weight-bold">
              <p class="font-setting">最終更新者 {{ modelClass.updateBy }}</p>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
import AppGoodButton from '@/components/AppGoodButton.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import StarRating from 'vue-star-rating';
import { Comment, ModelClass } from './../gen';

@Component({
  components: { AppGoodButton, StarRating }
})
export default class AppmodelClass extends Vue {
  @Prop({ required: true })
  public modelClass!: ModelClass;
  @Prop({ required: true })
  public comments!: Comment[];

  public get termColor(): string {
    if (this.modelClass.term === 'spring') {
      return '#ffebee';
    } else if (this.modelClass.term === 'autumn') {
      return '#FFF3E0';
    } else {
      return '#ECEFF1';
    }
  }

  public clicked(val: string) {
    this.$emit('click', val);
  }
}
</script>

<style scoped>
img.random {
  width: 55px;
  height: 55px;
}
p.font-setting {
  font-size: 25px;
  text-align: right;
}
.title-class {
  font-size: 25px;
}
</style>
