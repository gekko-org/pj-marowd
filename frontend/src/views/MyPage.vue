<template>
  <v-container>
    <v-row justify="center">
      <!-- スマホサイズなら行分けする -->
      <v-col xs="12" sm="6">
        <img :src="src" alt="プロフィール画像" />
      </v-col>
      <v-col xs="12" sm="6">
        <v-container fill-height>
          <v-row>
            <v-col xs="12" sm="6">
              <p v-if="!isEditing" class="username">{{ this.userName }}</p>
              <v-text-field v-else v-model="newName" solo> </v-text-field>
            </v-col>
            <v-col xs="12" sm="6">
              <v-btn
                icon
                color="cyan"
                :disabled="this.isNameChangeProcessing"
                @click="buttonDispatch"
              >
                <v-icon size="30"
                  >mdi-{{
                    isEditing ? 'content-save-outline' : 'pencil'
                  }}</v-icon
                ></v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="center" align-content="center">
      <v-col>
        <a href="" class="text-align:cebter;">お問い合わせページ</a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import auth from '@/plugins/auth';
import firebase from 'firebase';

@Component
export default class MyPage extends Vue {
  isUserLoggedIn: firebase.User | boolean = false;

  // プロフィール画像が取得出来なかった場合は忍者の画像を表示させる。
  src: string = require('@/assets/ninja_kakuremi.png');
  userName = 'Loading...';
  isEditing = false;
  isNameChangeProcessing = false;

  // for v-model
  newName: string = '';

  async created() {
    this.isUserLoggedIn = await auth();
    if (!this.isUserLoggedIn) {
      // TODO: @reud: エラーページを作成したらそこに飛ばす
      console.log('error');
    }
    const user = this.isUserLoggedIn as firebase.User;
    this.src = user.photoURL || this.src;
    this.userName = user.displayName || 'Anonymous';
    this.newName = this.userName;
  }


  // TODO: @reud 8文字を超える場合は警告を出す。
  async buttonDispatch() {
    this.isNameChangeProcessing = true;
    console.log('called');
    if (this.isEditing && !!this.newName && this.newName != this.userName) {
      await this.save();
    }

    this.isEditing = !this.isEditing;
    this.isNameChangeProcessing = false;
  }

  // TODO: @reud: エラー時のハンドリング処理
  async save() {
    this.isUserLoggedIn = await auth();
    if (!this.isUserLoggedIn) {
      // TODO: @reud: エラーページを作成したらそこに飛ばす
      console.log('error');
    }
    const user = this.isUserLoggedIn as firebase.User;
    // TODO: @reud: エラーページを作成したらそこに飛ばす
    await user.updateProfile({
      displayName: this.newName
    });
    alert('名前の変更に成功しました。ブラウザを更新すると反映されます。');
  }
}
</script>

<style scoped module>
/*画像を丸くするcss*/
img {
  border-radius: 50%; /* 角丸半径を50%にする(=円形にする) */
  width: max(180px,30vmin); /* ※縦横を同値に */
  height: max(180px,30vmin); /* ※縦横を同値に */
}

/* HACK: @reud Vuetify側で設定してもcolorが何故か書き換わらなかったため直接している。原因解明次第修正 */
.v-btn--outlined .v-btn__content .v-icon,
.v-btn--round .v-btn__content .v-icon {
  color: blue;
}
.username {
  font-size: 32px;
}

a {
  font-size: 8px;
}
</style>
