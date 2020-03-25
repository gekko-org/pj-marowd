<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap justify-space-around>
      <v-flex v-for="item in classItems" :key="item.key">
        <v-card color="blue-grey darken-2" class="white--text" width="300px">
          <v-card-title primary-title>
            <div>
              <div class="headline font-weight-bold">{{ item.name }}</div>
            </div>
          </v-card-title>
          <v-card-text
            class="info pa-12"
            v-for="info in createInfoArray(item)"
            :key="info.key"
          >
            {{ info }}
          </v-card-text>
          <div>
            <div class="star-rating text-no-wrap">
              <div class="star-rating-front" style="width: 50%">★★★★★</div>
              <div class="star-rating-back">★★★★★</div>
            </div>
          </div>
        </v-card>
      </v-flex>
      <v-flex v-for="item in classItems" :key="item.key" class="flex-empty">
        <div></div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ModelClass } from '@/gen';

@Component
export default class SummaryCards extends Vue {
  @Prop({ required: true }) classItems!: ModelClass[];

  // mergeString 学部などの情報を結合して返す
  createInfoArray(m: ModelClass): string[] {
    return [
      `${m.faculty}学部`,
      `${m.department}学科`,
      `${m.grade}年`,
      `${m.professor}先生`
    ];
  }
}
</script>

<style scoped lang="scss">
// レーティング表現のためにオーバーフローの改行を無効化
.v-card {
  overflow-wrap: normal;
}
.flex {
  flex-grow: 0;
}

.flex-empty {
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;

  div {
    width: 300px;
  }
}

img.random {
  width: 55px;
  height: 55px;
}
p.font-setting {
  font-size: 25px;
  text-align: right;
}
.title-class {
  font-size: 25px;
}

.v-card__text.info {
  padding-top: 0;
}

.star-rating {
  position: relative;
  width: 5em;
  font-size: 25px;
}
.star-rating-front {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  color: #ffcc33;
}
.star-rating-back {
  color: #ccc;
}
</style>
