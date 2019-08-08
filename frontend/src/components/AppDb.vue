<template>
    <div class="home">
      <input v-model="name" placeholder="Name">
      <input type="email" v-model="email">
      <input v-model="message" placeholder="message">
      <button @click="sendItem">送信する</button>
      <p v-if="showMessage">
          フォームが正常に送信されました。
      </p>
  </div>
</template>

<script>
import {db} from '../main.ts'

export default {
  name: 'AppDb',
  data() {
    return {
        department: '',
        faculty: '',
        grade: '',
        items: [],
        showMessage: false,
    }
  },
  
  methods: {
   sendItem(){
     const colref = db.collection("ClassSummary"); // classSummaryコレクションへの参照を作成
     
     // 保存用JSONデータを作成
     const saveData = {
        faculty: this.faculty,
        department: this.department,
        grade: this.grade
     };
     
     // addの引数に保存したいデータを渡す
     colref.add(saveData).then(function(docRef) {
          // 正常にデータ保存できた時の処理
          console.log("Document written with ID: ", docRef.id);
      }).catch(function(error) {
          // エラー発生時の処理
          console.error("Error adding document: ", error);
      });

      this.showMessage = true;
   },
  }
}
</script>