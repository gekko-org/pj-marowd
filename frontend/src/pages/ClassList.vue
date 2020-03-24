<template>
  <div>
    <whats-new class="mb-4" :items="newsItems" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WhatsNew from './../atoms/WhatsNew.vue';
import News from './../data/news.json';

@Component({
  components: { WhatsNew }
})
export default class ClassList extends Vue {
  newsItems: Array<any> = News.newsItems;
}
</script>

<style scoped></style>
