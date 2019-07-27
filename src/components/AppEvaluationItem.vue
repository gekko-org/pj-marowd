<template>
  <div :class="border ? 'material' : ''">
    <v-chip label color="pink" text-color="white">
      <v-icon left></v-icon>
      {{ tagLabel }}
    </v-chip>
    <div v-if="output">
      <star-rating
        :increment="output ? 0.01 : 0.5"
        :rating="rating"
        @rating-selected="ratingSelectedFromStarRating"
        :read-only="output"
      ></star-rating>
    </div>
    <div v-else>
      <star-rating
        v-model="model"
        :increment="output ? 0.01 : 0.5"
        :rating="3"
        @rating-selected="ratingSelectedFromStarRating"
        :read-only="output"
      ></star-rating>
    </div>
  </div>
  <!-- from https://www.npmjs.com/package/vue-star-rating */ -->
</template>

<script lang="ts">
import StarRating from 'vue-star-rating';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({
  components: { StarRating }
})
export default class extends Vue {
  @Prop()
  public output: boolean = false;
  @Prop()
  public rating: number = 0;
  @Prop()
  public border: boolean = false;
  @Prop({ required: true })
  public tagLabel!: string;
  public model: number = 0;
  public inputRating = 0;

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ratingSelected(val: number) {}

  public ratingSelectedFromStarRating(val: number) {
    this.ratingSelected(val);
    this.inputRating = val;
    this.model = val;
  }


}
</script>

<style scoped>
div.material {
  border: 1px solid #64b5f6;
  width: 280px;
}
</style>
