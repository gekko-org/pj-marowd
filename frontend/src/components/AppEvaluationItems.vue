<template>
  <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex>
        <v-card :color="colors" class="py-2">
          <v-layout justify-center>
            <div>
              <div v-for="label in labels.length" :key="label.id">
                <AppEvaluationItem
                  :model="models[label - 1]"
                  @rating-selected="EventTest"
                  :output="output"
                  :tagLabel="labels[label - 1]"
                  :rating="value[label - 1]"
                ></AppEvaluationItem>
              </div>
            </div>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import AppEvaluationItem from '@/components/AppEvaluationItem.vue';
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({
  components: { AppEvaluationItem }
})
export default class AppEvaluationItems extends Vue {
  @Prop({ required: true })
  public labels!: string[];
  @Prop({ default: () => [] })
  public value!: number[];
  @Prop({ required: true})
  output!: boolean;
  @Prop()
  colors?: string;
  @Prop({default: ()=>[0,0,0]})
  models!: number[];

  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ratingSelected(val: number, label: string) {}

  EventTest(val: number, label: string) {
    this.ratingSelected(val, label);
  }
}
</script>
