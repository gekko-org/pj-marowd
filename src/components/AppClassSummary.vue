<template>
  <v-container grid-list-lg>
    <v-flex>
      <v-card :color="termColor" @click="clicked">
        <v-layout justify-center>
          <v-card-title class="font-weight-bold title-class">
            {{ classSummary.title }}
          </v-card-title>
        </v-layout>
        <v-card-text class="pb-0">
          <v-layout wrap align-light>
            {{ classSummary.faculty }}学部,{{ classSummary.department }}学科,{{
              classSummary.grade
            }}年,{{ classSummary.professor }}

            <v-flex xs12 sm12 md8 class="font-weight-bold">
              <StarRating
                :increment="0.01"
                :rating="classSummary.rating"
                :read-only="true"
              >
              </StarRating>
            </v-flex>

            <v-flex xs2 sm1 md4>
              <img
                v-if="classSummary.isRandom"
                class="random"
                src="../assets/random.jpg"
                alt="抽選"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-text>
          <v-card>
            <v-card-text class="font-weight-bold ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-text>
          <v-layout wrap>
            <v-flex xs6 sm6 class="font-weight-bold">
              <app-good-button :fav="13222"></app-good-button>
            </v-flex>
            <v-flex xs6 sm6 class="font-weight-bold">
              <p class="font-setting">
                最終更新者 {{ classSummary.lastUpdatedBy }}
              </p>
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
import { ClassSummary } from '@/src/types';
import StarRating from 'vue-star-rating';

@Component({
  components: { AppGoodButton, StarRating }
})
export default class AppClassSummary extends Vue {
  @Prop({ required: true })
  public classSummary!: ClassSummary;

  public get termColor(): string {
    if (this.classSummary.term === 'spring') {
      return '#ffebee';
    } else if (this.classSummary.term === 'autumn') {
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
