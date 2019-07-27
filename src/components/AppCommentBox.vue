<template>
  <v-container grid-list-md text-xs-center>
    <v-flex>
      <v-layout row wrap>
        <v-flex v-for="(c, index) in comments" :key="index">
          <app-comment
                  :comment="c"
          ></app-comment>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script>
import AppComment from '@/components/AppComment.vue';

export default {
  name: 'AppCommentBox',
  components: { AppComment },
  props: {
    comments: {
      type: Array,
      default: () => [
        {
          name: 'mockname1',
          image:
            'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
          date: '1234.12.12',
          subject: 'math',
          text: 'Lorem Ipsum......',
          isRecommend: true
        },
        {
          name: 'mockname2',
          image:
            'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
          date: '1234.12.12',
          subject: 'math',
          text:
            '初めは痛いのか思いましたが、全然痛さは感じられずお互いにS.Mになりながらのプレーは最高でした。価格、品質、見ばえ、全てにおいて満足です。肌に当たるところは柔らかい素材になっていて、跡がつきにくいです。デザインが大変良いと思います。素材が安っぽいと感じる人がいるかもしれません',
          isRecommend: true
        },
        {
          name: 'mockname3',
          image:
            'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
          date: '1234.12.12',
          subject: 'math',
          text: 'Lorem Ipsum......',
          isRecommend: true
        },
        {
          name: 'mockname4',
          image:
            'https://4.bp.blogspot.com/-6sCiU0t3xEw/XDXctFskcpI/AAAAAAABRMQ/J_7v9n7-nmcL2PFWYx3suE3pzqlvApxMwCLcBGAs/s800/sougankyou_nozoku_girl.png',
          date: '1234.12.12',
          subject: 'math',
          text: 'Lorem Ipsum......',
          isRecommend: true
        }
      ]
    }
  }
};
</script>

<style scoped></style>
