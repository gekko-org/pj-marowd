<template>
  <v-container id="grid" fluid grid-list-sm tag="section">
    <v-layout class="display-1">新規科目追加・編集画面</v-layout>

    <v-flex xs10 md5>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          label="科目名"
          :rules="rules"
          required
        ></v-text-field>
      </v-form>
    </v-flex>
    <v-layout row wrap>
      <v-flex xs6 md3 class="pa-2">
        <v-select v-model="dep" :items="departments" label="学部"></v-select>
      </v-flex>
      <v-flex xs6 md3 class="pa-2">
        <v-select v-model="major" :items="majorItems" label="学科"></v-select>
      </v-flex>
      <v-flex xs6 md3 class="pa-2">
        <v-select v-model="year" :items="yearSelects" label="学年"></v-select>
      </v-flex>
      <v-flex xs6 md3 class="pa-2">
        <v-form ref="form">
          <v-text-field
            v-model="teacher"
            :counter="max"
            label="先生"
          ></v-text-field>
        </v-form>
      </v-flex>
      <v-checkbox
        v-model="lottery"
        color="indigo"
        label="抽選授業"
      ></v-checkbox>
      <v-btn color="info" :disabled="!valid" @click="submit"
        >授業を追加する</v-btn
      >
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';

@Component
export default class NewOrEditPage extends Vue {
  public name: string = '';
  public dep: string = 'foo';
  public year: string = '';
  public major: string = '';
  public teacher: string = '';
  public lottery: string = '';
  public departments: string[] = ['理工', '生命', '情科', '共通'];
  public yearSelects: string[] = ['1', '2', '3', '4', '共通', '大学院'];
  @Emit()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  input(val: string) {}

  updated() {
    this.input(this.major);
  }
  public static ruleDoNotEmpty(s: string): boolean {
    return !!s;
  }
  public get rules(): Array<(v: string) => any> {
    // いつかルール追加するかも・・・？
    const rules: Array<(v: string) => any> = [];
    const doNotEmptyRUle = (v: string) =>
      NewOrEditPage.ruleDoNotEmpty(v) || 'Do Not Empty';
    rules.push(doNotEmptyRUle);
    return rules;
  }

  get majorItems(): string[] {
    if (this.dep === '理工') {
      return ['機械工', '電電', '応情'];
    } else if (this.dep === '生命') {
      return ['応植', '環応'];
    } else if (this.dep === '情科') {
      return ['CS', 'DM'];
    } else {
      return [''];
    }
  }

  submit() {
    alert('submitted!');
  }
  public get valid(): boolean {
    return !!this.name;
  }
}
</script>

<style scoped></style>
