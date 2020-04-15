import * as admin from "firebase-admin";
import * as faker from "faker";
import * as functions from "firebase-functions";
import * as express from "express";

const Firestore = admin.firestore();

const sentenceArray = [
  "説明がわかりやすいと思った。",
  "授業中は理解できますが、復習したときやテスト前などに理解できるかが不安なので、説明をもうちょっと簡潔にしてほしいです。",
  "計算の仕方なども、細かくたどってくれていて、とてもわかりやすかったです。疑問に思ったことも特にないです。他の授業で聞いてまったくわからなくてあきらめていたエントロピーが理解できてよかったです。",
  "前期に基礎物理学３でエントロピーについて勉強したのですが、ほとんど意味不明でただ公式だけを覚えたという感じでしたが、統計力学の講義でなぞがとけました。とてもわかりやすく解説していただけるので、とても理解しやすいです．",
  "式の成り立ちが丁寧すぎるほど詳しく説明してくれるので、わかりやすかった。ここまでやると、あまりできないのではないかとしんぱいです。＋や－の間違いや書き忘れが多いので、気をつけてください．",
  "間違いが多くてすいません。気をつけますが、間違いに気が付いたら、遠慮なく指摘してください．",
  "感想としては、授業の話をきいていると、とてもわかりやすいという印象を受ける．授業では多くの問題で計算を伴ってきそうなので、たいへんそうにも思われた。",
  "非常にわかりやすくてよい講義だと思います．",
  "聞きやすい授業でよかったです。",
  "先生の授業はとても丁寧でよいと思います．また、たまに現実のおもしろい話を例に出したり（宇宙服に穴があくと人が蒸発する（正確には、体の水分が蒸発する、ですね）空気が教室の片方に偏る確率など）するのは、とてもおもしろいし、授業への興味をひきます。またそういう話をしてください。",
  "そうしたいですね。ただ統計力学は、ネタを作るのが難しいそう。",
  "教科書は絶対に必要か？なくてもノートだけで十分か？",
  "今までのところ、丁寧に教えてもらいわかりやすいです。ミクロカノニカルは、あまり使われていないのに、ほとんどの教科書で最初にあるのがなぞです。",
  "板書が多いので、ノートをとっていれば、あとで復習しやすいので、すぐに理解できないときには、助かります．なんとか授業についていきたいと思います．",
  "統計力学という科目は、数学と物理が融合したような感じの授業で、ともに苦手なので、はっきりいって、つらいです。",
  "黒板に図解してくれるので、イメージができてわかりやすいです。",
  "図や式を丁寧にかいてくださるので、とてもわかりやすいと思います．",
  "文字を大きくかいてくれているので、記号などがわかりやすい。",
  "今回の、というわけではないのですが、はっきりいって、応用物理の専門は、何をやっているかさっぱりわからないのです。何せ、講義名からその内容がまったく連想できない！計測学では、計測することについてではなく、ガウス関数やらフーリエ級数ばかりを学ぶし、（まったく、フーリエ君もえらいものみつけてくれたもんだ）、この統計力学も、熱力学に改めたほうがよいと思うのですが、、、ともかく、応用物理の科目は、本気でワケがわからんので、先が思いやられる限りです．",
  "確かにフーリエはえらいもんを見つけたのかもしれませんね。でも、残念ながら、フーリエ解析は重要なんですよ．特にぶつりでは。太陽からくる光のスペクトル、というのをみたことありますか？プリズムを通して、見るのですが、あちこちに暗線ができて、なかなか面白いです．この光のスペクトルが、実はフーリエ変換そのものなのですよ。よって、プリズム（一般に分光器）を扱いはじめたら、フーリエ解析はとっても大切なわけです、、、、って統計と関係ないけどね。",
  "字がおおきいので、すごく見やすいです．",
  "log",
  "P_N(n)の計算中、n/N=1/2+xとしていたが、これは平均値が1/2であることが明らかであるために使っているが、もし平均値を求めるのが困難であるときは、どうすればいいか？",
  "すごく丁寧な授業でわかりやすい。周りは用語の説明をもっと厳密にしてほしいといっているが、僕にはあの説明で十分だし、そっちのほうがいい。ただ、丁寧すぎるところもかんじられなくもなく、黒板に見えない口だけで言うようなところもあっていいと思う．でも猿がシェイクスピアを書く確率の余談などはおもしろかった。",
  "よくも悪くも堅実かつ無難な授業。わかりにくいということは特にないので、このままでもよいと思う．",
  "教科書にそっていて、わかりやすい、いい授業だと思います．",
  "黒板の字が見やすくてよいです。",
  "教科書やノートをみてさっぱりわからない講義が多い中、今回の授業はとてもわかりやすかったです。少しでもついていければなと思っています．",
  "総合教育科目の物理科目の授業と比べると、わかりやすいですが、時間をオーバーするのは、やめてください。",
  "統計力学という専門的なことを学ぶにあたって、やっぱり難しいというのが、感想です．ですが、授業は本に書いてあることに加えて、先生が考えていることをいってくれるので、少しは身近に感じるところもでてきています。エントロピーがなんなのかは、未だに理解できていません。不可逆性はなんとなくわかりますが、エントロピーの増大が何を意味しているのかが、はっきりはっきりとわかりません．",
  "他の講義とちがって、このしきは何を意味している、やこの式の変形は～のためにしている、など、ていねいに教えてくれるので、わかりやすい。",
  "今日の講義でわかりやすいと思います．",
  "もうすこしだけ、ゆっくりやってほしい。ちょっと理解に時間がかかってしまうから。それとグラフを書くとき、書き込む値の文字が小さいので読みにくい．",
  "これ以上ゆっくりやるのは、ちょっとむりかな、と思います．ただ、とても大切なところはゆっくり話すようにしますから、そこの部分はできるだけ理解するようにしてみてください。のこりは、ノートをあとで見返してみてください。",
  "講義に関しては、このままでいいと思います．",
  "まだ、わかりにくいということはなく、理解していける。わかりやすい説明をお願いします。",
  "もっとやすい良いテキストはないでしょうか。あと、レポートはA4でないといけないのでしょうか。",
  "字がおおきく、説明もわかりやすい。教室が狭すぎです．大講義室などのもっと大きな教室にしてください。",
  "すごくていねいでわかりやすい講義だと思います．",
  "講義はわかりやすくてよいと思います．例でやってくれるのがうれしいです。れからもいろんな例を挙げてやってください。",
  "できれば、時間をまもってください。",
  "先生の授業は具体的な例を出して説明してくれるので、非常にわかりやすいです。板書もくわしくて役立つのでこんな感じでこれからも授業を続けてほしいです．",
  "なるべつ時間内に終わるようにしてください。",
  "ほかの授業よりいくらか理解しやすくて、話も面白いです．",
  "生徒のことを考えたよい授業だと思う．字もみやすいし、図とかも使っていて良かった．物理に出てくる公式を導く式は、何をやっているのか、わからないけど、先生は1つ1つ、どうやって計算しているかを説明してくれるので、何をやっているかはわかった．",
  "ただ物理は内容が難しいので、これからもかみくだいて、説明してください。",
  "わかりやすい授業なのでいいです。ただひとつ、教室せまいです。",
  "板書を写したノートをあとで見直しても、よくわかるようにまとまっていて、いい講義だと思います．",
  "エントロピーはなぜ、S=k_B",
  "log",
  "Wと表すのですか？",
  "くつの紐があるいているうちに勝手に結ぶ確率はどれくらいですか？",
  "エントロピーのことがわかりました。",
  "基本から丁寧に教えてくれるので、わかりやすい。",
  "先生の話はわかりやすくて、授業がねむくなくてうれしいです。",
  "授業は、生徒の睡魔との戦いなのかもしれませんね。",
  "黒板の字がみやすくていいです。テーラー展開がよくわかりません。",
  "授業でやっている式の変化などはわかるが、なぜそれを導いているのかよくわからないときがある。何を求めているかはわかるがもうすこしわかりやすく説明していただきたいです。",
  "説明がわかりやすくてよい。こちらは統計力学を始めてならうので、具体的にいろいろ教えてほしい．",
  "字も声も大きいので、非常に授業を受けやすい。ただ人が多いので、苦しい．",
  "黒板の字も大きく、説明も今のところわかりやすいのでとてもよい感じです．",
  "授業がどうとかではなくて、統計力学そのものが、今までの物理の勉強と性質がちがうので、とっつきにくい。あと、統計力学演習との難易度がひらきすぎている。もっと大きい教室でやってほしい。せまくて、いやや。",
  "今のところ、授業の内容的には、まだついていけていると思いますが、カノニカルにはいっていったら、混乱するかもしれないので、今後もこの調子でお願いします。ノートもとりやすいし、長岡洋介の統計力学の本もあるので、連動して勉強していきたいと思います．",
  "説明もわかりやすいし、字も大きいので、眠くならないし、わかるから楽しい。ただ教室が狭すぎるので大きい教室にかえてほしい。",
  "わかるから、楽しい、というのは、うれしい感想ですね．僕も、物理がわからんときは、物理が嫌いですが、解けてすいすい進むときはとても好きです．",
  "理解不能というほど、難解な授業ではなくて、よかったです。地道に勉強すれば、なんとかなるかもしれません。"
];
const kamokuArray = [
  "ようこそ名大の授業へ",
  "女子中高生理系進学セミナー2008",
  "生命農学基礎講義",
  "民法 II",
  "ジェンダーとセクシュアリティ",
  "数理解析・計算機数学 I",
  "基礎セミナー - 図書館情報リテラシー: 図書館と情報を使いこなす",
  "力学 I",
  "中国西南の民族と歴史",
  "離散数学及び演習",
  "英語（リーディング）4",
  "管理会計",
  "宇宙物理学γ (宇宙論)",
  "留学生と日本〜異文化を通しての日本理解〜",
  "基礎セミナー - 民法の世界で遊ぶ",
  "言語教育工学",
  "物質情報学2",
  "資源植物環境学",
  "複雑系科学演習1",
  "適応システム特論",
  "英語（リーディング）2",
  "経済理論 I ",
  "地理学",
  "法学",
  "教育方法学講義 II —授業分析と教育の科学化—",
  "科学・技術の哲学",
  "情報通信工学第2",
  "現代日本語コース中級\u3000聴解",
  "ドイツ語1",
  "ロシア語2",
  "ポスト・ローマ期ヨーロッパの表象構造—コミュニケーション行為の歴史的考察(1)—",
  "人間発達科学 I",
  "数学展望 I ",
  "基礎セミナー - 自然をみつめ，考える",
  "全学教養科目 - 名大の歴史をたどる",
  "計算情報学 I",
  "非線形制御特論",
  "固体力学",
  "機械創造設計製作",
  "情報メディア空間構成特論",
  "応用行動学講義 II —産業・組織の心理学—",
  "経営学",
  "電磁気学 I",
  "消化器",
  "数学展望 II",
  "動物感覚情報学",
  "ドイツ語4",
  "対照表現論演習 I",
  "メディアディスコース分析論",
  "固体電子工学",
  "B. エコロジーな発電装置を作ろう！ ",
  "C. マイナスイオンでリフレッシュ！",
  "D. ロボットのしくみを理解する",
  "E. ライントレースカーを作る",
  "F. 携帯で動くアプリ開発",
  "正多面体と群",
  "連分数の不思議な世界",
  "図形をドミノで敷き詰める",
  "遺伝と遺伝子",
  "A. 電子ブロックで体験する物理と研究最前線",
  "フィンランド語文法",
  "情報デバイス工学特論",
  "微生物学3",
  "生物学各論",
  "環境行動論",
  "情報リテラシー",
  "有機化学 II",
  "トポロジー特論 I ",
  "ミクロ経済学 II",
  "中級中国語2",
  "社会システム情報学特論",
  "中級フランス語2",
  "比較文学論a",
  "物理学実験",
  "日本語文法論b",
  "言語文化学方法論a：明治初期記録『米欧回覧実記』に見る日本人の西洋体験",
  "現代数学への流れ",
  "生物圏環境学1",
  "メディアアート論",
  "数理科学展望 I",
  "空間エネルギー制御論",
  "海外実地研修",
  "最終講義 - 西洋中世史が解決すべき幾つかの大きな問題",
  "教育方法学講義 I —教育方法概論—",
  "最終講義 - やったこと、やれなかったこと、やらなかったこと−対照言語学と言語教育−",
  "最終講義 - ロベルト・ユンクの２０世紀",
  "最終講義 - 私の食糧生産管理学：研究・教育・普及",
  "最終講義 - 学校臨床社会学の構想",
  "最終講義 - 花色の遺伝から植物組織培養まで",
  "最終講義 - 光と大気の窓",
  "最終講義 - メダカに明け、メダカに暮れ",
  "最終講義 - 志 −名大形成外科の道−",
  "最終講義 - 環境放射能研究４０年",
  "最終講義 - 大学における研究開発の在り方一考察",
  "最終講義 - 今後の核融合研究への期待",
  "人間発達の心理学（発達教育臨床基礎論）",
  "開発経済統計学",
  "最終講義 - 人間のための画像処理",
  "腫瘍学概論",
  "マイクロマシン〜ミリ・マイクロ・ナノ世界のためのものつくり",
  '女性も頑張ってます！〜"土木"の世界〜',
  "先端文化思想論ab",
  "基礎セミナー - オペラの魔力とはなにか",
  "家族看護学",
  "産業社会と企業",
  "発達障害治療学及び実習",
  "心理・教育の統計学",
  "信号伝送検出理論特論",
  "生物学入門",
  "地球環境学2",
  "環境政策論",
  "物理環境設計学",
  "地球環境学",
  "最終講義 - 植物で明るい未来を",
  "最終講義 - 失敗した事、やり残した事\u3000−名古屋大学での19年",
  "最終講義 - タンパク質の研究に行き着くまで",
  "人間形成学講義 III",
  "最終講義 - 開発途上国の農学・農業・農村問題に取り組んで",
  "最終講義 - 行動科学の隘路を探る道具としての眼球運動研究 ",
  "最終講義 - 強相関電子系の光物性—ラマン散乱に魅せられて",
  "最終講義 - 合金設計−過去・現在・未来−",
  '最終講義 - "自然に学ぶ"フィールドワーク40年',
  "統計解析",
  "最終講義 - たまねぎの皮むくたびに涙かな−複合理論とともに−",
  "最終講義 - 『密約』調査を終えて",
  "最終講義 - 食品機能化学研究と共に",
  "最終講義 - 1兆分の1秒から30億年：光合成の分子システムとその進化",
  "最終講義 - 生き暮れて30有余年",
  "人体器官の構造（発生学）",
  "ジェンダーと文学b−日中のフェミニズム＼ジェンダー文学批評の流れ",
  "心理行動科学実験演習3（検査・測定法）",
  "パターン認識及び演習",
  "解析力学 II",
  "日本語教育学原論ab",
  "アルゴリズム",
  "電磁気学 I",
  "光・放射線化学",
  "基礎セミナー - 遺伝子を使うと何がわかる？何ができる？",
  "言語文化学方法論a：表象の領域—普遍的イメージの成立を巡って",
  "ロマン主義文学の諸相",
  "開発金融論",
  "古代手工業生産史の考古学的研究—国分寺瓦を題材として—",
  "最終講義 - 20世紀から21世紀へ〜放送は何を伝えてきたか〜",
  "最終講義 - 新聞は消えない",
  "メディア英語",
  "放射線計測学",
  "「モデル小説」から見るプライヴァシーの近代",
  "最終講義 - 痛覚過敏の機構をめぐって歩いた15年−熱痛覚過敏から機械痛覚過敏へ−",
  "最終講義 - 第二外科140年の歴史を旅して",
  "英語（コミュニケーション）",
  "Gaussの和を計算してみよう",
  "金融特論",
  "核医学診断技術学 I ",
  "統計物理学III",
  "動物生理学2",
  "現代中国語表現論ab",
  "反応プロセス工学特論",
  "地球環境変動論（温暖化概論）",
  "多元比較表象論ab",
  "第二言語習得研究概論a：第二言語習得研究の理解",
  "実験音声学基礎",
  "最終講義 - 動機づけ研究の歩みと到達点\u3000〜さて、上がってきたのか、下がってきたのか〜",
  "最終講義 - 宇宙天気研究をふり返って",
  "最終講義 - 麻薬学への道しるべ",
  "最終講義 - 単結晶シリコンを対象としたマイクロ機械理工学研究",
  "最終講義 - 有機導体の研究をふりかえって",
  "最終講義 - 森林流域における水循環の解明を目指して",
  "最終講義 - Pursuing the Critical Role of Government in Development",
  "最終講義 - 企業の研究、大学の教育",
  "ドラマ研究概論b/国際多元文化演習b",
  "日中比較文化論ab—古代日本と外来文化",
  "比較文化論"
];
const departmentArray = [
  "理工学部",
  "経済学部",
  "情報学部",
  "ナノサイエンス学部",
  "法学部"
];
const facultyArray = [
  "理学科",
  "電子学科",
  "経営学科",
  "法学科",
  "グローバル学科"
];
const titleArray = [
  "字が大きいので見やすい。",
  "すごく助かった",
  "言うことなしです。",
  "最高",
  "わかりやすかったです",
  "板書も見やすく、説明もわかりやすかった",
  "字が大きくてみやすい。",
  "説明もよかったです。",
  "書き方は良いが、消すのが早い。",
  "非常によろしい",
  "字がやや大きめである",
  "字の間違いが多いっス。",
  "でも字は大きくてわかりやすかったです。",
  "説明はわかりやすかったです。",
  "結構漢字の間違いが多い",
  "字が大きくて見やすいが、消すのが少し早かった",
  "字が大きくてよかった",
  "分かりやすく説明していると思います。",
  "少なくとも説明しようとしているのは、とっても感じました。",
  "字が大きくて、見やすかったです。",
  "微妙な漢字間違いも笑えてGood！",
  "字が大きく、よみやすかった",
  "とてもわかりやすくてよかったと思う"
];

// commentを作成する数
const commentNum = 100;
// ratingを小数で表示できるように変換するときに使う値
const randomRate = 1.27;
// コメントの配列からrandomに格納するときに必要なcomment配列の大きさ(概算)
const randomStateForComment = 65;
//titleの配列からrandomに格納するときに必要なtitle配列の大きさ(概算)
const randomStateForTitle = 22;
// kamokuarrayの配列からrandomに格納するときに必要なkamokuarray配列の大きさ(概算)
const randomStateForClass = 100;

export const makeMock = async (
  req: functions.Request,
  resp: express.Response
): Promise<void> => {
  const batchSize = 30;
  for (let i = 0; i < batchSize; i++) {
    const batch = Firestore.batch();

    const className =
      kamokuArray[faker.random.number() % randomStateForClass] +
      (faker.random.number() % randomStateForClass);
    const classData = {
      created_at: faker.date.past(),
      department:
        departmentArray[faker.random.number() % departmentArray.length],
      faculty: facultyArray[faker.random.number() % facultyArray.length],
      favamount: faker.random.number(),
      grade: faker.random.number() % 5,
      is_random: Boolean(faker.random.number() % 2),
      made_by: faker.internet.password(),
      name: className,
      professor: faker.name.lastName(),
      rating: (faker.random.number() % 5) * randomRate,
      term: faker.random.number() % 3,
      update_by: faker.random.uuid(),
      update_at: faker.date.future()
    };
    Firestore.collection("ClassSummary")
      .doc(className)
      .set(classData);

    const commentRef = await Firestore.collection("ClassSummary")
      .doc(className)
      .collection("comment");
    for (let j = 0; j < commentNum; j++) {
      const uid = faker.internet.password();
      const commentData = {
        comment: sentenceArray[faker.random.number() % randomStateForComment],
        created_at: faker.date.past(),
        image: faker.image.animals(),
        is_recommend: Boolean(faker.random.number() % 2),
        made_by: uid,
        name: className,
        title: titleArray[faker.random.number() % randomStateForTitle],
        updated_at: faker.date.future()
      };
      batch.set(commentRef.doc(uid), commentData);
    }
    await batch.commit().catch((e: Error) => {
      console.log(JSON.stringify(e));
    });
  }
  resp.sendStatus(200);
  return;
};
