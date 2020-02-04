<template>
  <v-container grid-list-md text-xs-center>
    <v-flex>
      <v-layout row wrap>
        <v-flex v-for="(comment, index) in comments" :key="index">
          <app-comment :comment="comment"/>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
import AppComment from '@/components/AppComment.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Comment } from './../gen';

@Component({
  components: { AppComment }
})
export default class AppCommentBox extends Vue {
  @Prop({ required: true })
  public comments!: Comment[];
}
</script>

<style scoped></style>
