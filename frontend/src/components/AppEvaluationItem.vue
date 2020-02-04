<template>
  <div :class="border ? 'material' : ''">
    <v-chip label color="pink" text-color="white">
      <v-icon left></v-icon>
      {{ tagLabel }}
    </v-chip>
    <div v-if="output">
      <star-rating
        v-model="model"
        :increment="0.01"
        :rating="model"
        @rating-selected="ratingSelectedFromStarRating"
        :read-only="output"
      ></star-rating>
    </div>
    <div v-else>
      <star-rating
        v-model="model"
        :increment="0.1"
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
  @Prop({ required: true })
  public output!: boolean;
  @Prop()
  public border?: boolean;
  @Prop({ required: true })
  public tagLabel!: string;
  @Prop({ required: true })
  public model!: number;
  public inputRating = 0;

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public ratingSelected(val: number, label: string) {}

  public ratingSelectedFromStarRating(val: number) {
    this.ratingSelected(val, this.tagLabel);
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
