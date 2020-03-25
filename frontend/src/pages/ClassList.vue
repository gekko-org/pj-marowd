<template>
  <div>
    <whats-new class="mb-4" :items="newsItems" />
    <SummaryCards :class-items="classes" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WhatsNew from './../atoms/WhatsNew.vue';
import News from './../data/news.json';
import SummaryCards from '@/components/SummaryCards.vue';
import auth from '@/plugins/auth';
import { Api } from '@/plugins/api';
import { errorHandler } from '@/utils/error';
import { ModelClass } from '@/gen';

@Component({
  components: { SummaryCards, WhatsNew }
})
export default class ClassList extends Vue {
  newsItems: Array<any> = News.newsItems;
  classes: Array<ModelClass> = [];

  async created() {
    this.getAllClasses();
  }

  async getAllClasses() {
    const user = (await auth()) as firebase.User;
    const api = await Api(user);

    const s = await api.classDataGet().catch(errorHandler);
    if (!!s && !!s.data) {
      this.classes = s.data;
    }
  }
}
</script>

<style scoped></style>
