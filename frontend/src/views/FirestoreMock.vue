<template>
  <v-container>
    <v-layout>
      <AppClassSummary
        v-for="(csy, i) in cs"
        :key="i"
        :classSummary="csy"
      ></AppClassSummary>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ClassSummary } from '@/src/types';
import { GetClassSummaries } from '../database';
import AppClassSummary from '../components/AppClassSummary.vue';
@Component({
  components: { AppClassSummary }
})
export default class FirestoreMock extends Vue {
  public cs: ClassSummary[] = [];

  public created() {
    GetClassSummaries().then((css) => {
      this.cs = css;
    });
  }
}
</script>

<style scoped></style>
