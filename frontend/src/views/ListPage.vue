<template>
  <div class="listview">
    <app-filter-search></app-filter-search>
    <v-container id="grid" fluid grid-list-md>
      <v-layout row wrap>
        <v-flex md4 sm6 xs12>
          <AppClassSummary
            :classSummary="testClassSummary"
            @click="EventTest"
          ></AppClassSummary>
        </v-flex>
        <v-flex md4 sm6 xs12>
          <AppClassSummary
            :classSummary="testClassSummary"
            @click="EventTest"
          ></AppClassSummary>
        </v-flex>
        <v-flex md4 sm6 xs12>
          <AppClassSummary
            :classSummary="testClassSummary"
            @click="EventTest"
          ></AppClassSummary>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <AppClassSummary
            :classSummary="testClassSummary"
            @click="EventTest"
          ></AppClassSummary>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <AppClassSummary
            :classSummary="testClassSummary"
            @click="EventTest"
          ></AppClassSummary>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <AppClassSummary
            :classSummary="testClassSummary"
            @click="EventTest"
          ></AppClassSummary>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import AppFilterSearch from '@/components/AppFilterSearch.vue';
import AppClassSummary from '@/components/AppClassSummary.vue';
import { Vue, Component } from 'vue-property-decorator';
import { ClassSummary } from '@/src/types';
import { classSummary } from '../mock_datas';

@Component({
  components: { AppFilterSearch, AppClassSummary }
})
export default class ListPage extends Vue {
  public testClassSummary: ClassSummary = classSummary;

  static EventTest(val: string) {
    alert(`occured ${val}`);
  }
}
</script>

<style scoped>
.listview {
  background-color: palegoldenrod;
}
</style>
