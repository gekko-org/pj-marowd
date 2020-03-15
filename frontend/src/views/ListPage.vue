<template>
  <div class="listview">
    <app-filter-search></app-filter-search>
    <v-container id="grid" fluid grid-list-md>
      <v-layout row wrap>
        <v-flex md4 sm6 xs12>
          <AppClassSummary
            v-for="cd in classData"
            :key="cd.id"
            :modelClass="cd"
            :comments="fetchComments(cd)"
            @click="eventTest"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import AppFilterSearch from '@/components/AppFilterSearch.vue';
import AppClassSummary from '@/components/AppClassSummary.vue';
import { Vue, Component } from 'vue-property-decorator';
import { DefaultApi, ModelClass } from './../gen';
import auth from './../plugins/auth';
import { Api } from '../plugins/api';

// TODO: @reud サーバからデータ持ってくる様に修正
@Component({
  components: { AppFilterSearch, AppClassSummary }
})
export default class ListPage extends Vue {
  classData: ModelClass[] = [];

  async created() {
    const cd = await fetchClassData();
    cd.forEach((mc: ModelClass) => {
      this.classData.push(mc);
    });
  }

  async fetchComments(mc: ModelClass) {
    const status = await auth();
    if (status) {
      const user = status as firebase.User;
      const api = await Api(user);
      const res = await api.commentGet(mc.name);
      if (res) {
        return res.data;
      }
    }
    return [];
  }

  static eventTest(val: string) {
    alert(`occured ${val}`);
  }
}

// GET /class_data
async function fetchClassData(): Promise<ModelClass[]> {
  const u = (await auth()) as firebase.User;
  const api = await Api(u);
  const result = await api.classDataGet().catch((e: Error) => {
    alert(e.toString());
  });

  if (result) {
    return result.data;
  }
  return [];
}
</script>

<style scoped>
.listview {
  background-color: palegoldenrod;
}
</style>
