<template>
  <v-container grid-list-md>
    <v-layout wrap align-center>
      <v-flex xs6 sm4 d-flex>
        <v-select
                v-model="dep"
                :items="departmentItems"
                label="学部"
        />
      </v-flex>

      <v-flex xs6 sm4 d-flex>
        <v-select v-model="major" :items="majorItems" label="学科"/>
      </v-flex>
      <v-flex xs12 sm2 d-flex>
        <router-link to="/detailpage">
          <v-btn color="success">検索</v-btn>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component
export default class AppFilterSearch extends Vue {
  @Prop({ default: () => ['FOO', 'VAR', 'ICE'] })
  public departmentItems!: string[];
  public dep: string = '';
  public major: string = '';
  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  input(major: string) {}
  updated() {
    this.input(this.major);
  }
  get majorItems() {
    if (this.dep === 'FOO') {
      return ['FOO1', 'FOO2'];
    } else if (this.dep === 'VAR') {
      return ['VAR1', 'VAR2'];
    } else if (this.dep === 'ICE') {
      return ['ICE1', 'ICE2'];
    } else {
      return ['E1', 'E2'];
    }
  }
}
</script>

<style scoped></style>
