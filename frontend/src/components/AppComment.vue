<template>
  <v-container grid-list-lg>
    <v-flex xs12 md4 sm3>
      <v-card width="480px" height="300px">
        <v-layout wrap align-light>
          <v-card-title class="font-weight-bold pb-0">
            <img
              v-if="isGood"
              class="icon"
              src="../assets/goodIcon.png"
              alt="good button"
            />
            <img
              v-else
              class="icon"
              src="../assets/badIcon.png"
              alt="bad button"
            />
            {{ comment.subject }}</v-card-title
          >
        </v-layout>
        <v-card-text class="pb-0">
          <v-layout wrap align-light>
            <v-flex xs1 sm1 class="pr-5"
              ><img :src="imageUrl" class="circle"
            /></v-flex>
            <!--<v-layout justify-center>-->
            <v-flex xs8 sm6 class="pl-3">
              <div>{{ comment.date }}<br />reviewed by {{ comment.name }}</div>
            </v-flex>
            <!--</v-layout>-->
          </v-layout>
        </v-card-text>
        <v-card-text>
          {{ comment.text }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Comment } from './../gen';

@Component
export default class AppComment extends Vue {
  @Prop({ required: true })
  public comment!: Comment;

  // なぜか二つはgetter(computedを通さないとダメだった)
  get isGood() {
    return this.comment.isRecommend;
  }
  get imageUrl() {
    return this.comment.image;
  }
}
</script>

<style scoped>
img.icon {
  display: inline-block;
  width: 20px;
  height: 20px;
}

.circle {
  display: inline-block;
  width: 50px;
  height: 50px;
  background: #67a6eb;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  -o-border-radius: 50px;
  -ms-border-radius: 50px;
  border-radius: 50px;
}
</style>
