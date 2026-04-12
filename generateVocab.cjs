const fs = require('fs');
const data = [];
function add(w, p, m) { 
  data.push({
    id: w.replace(/[^a-zA-Z]/g, '').toLowerCase() + '_' + Math.random().toString(36).substr(2, 5), 
    word: w, 
    partOfSpeech: p, 
    meaning: m
  });
}

// IMG_1628
add('cinema (Br)', 'n.', '電影院');
add('shopping centre (Br)', 'n.', '購物中心');
add('stretch', 'v.', '伸展、延伸');
add('score', 'v.', '得分');
add('swimming pool', 'n.', '游泳池');
add('car park', 'n.', '停車場');
add('pitcher', 'n.', '投手');
add('tie', 'v.', '平手; 繫');
add('restaurant', 'n.', '餐廳');
add('post office', 'n.', '郵局');
add('bat', 'v./n.', '打擊; 球棒; 蝙蝠');
add('(play) baseball', 'n.', '棒球');
add('library', 'n.', '圖書館');
add('station', 'n.', '車站');
add('catch', 'v.', '接住; 抓住');
add('season', 'n.', '季節');
add('supermarket', 'n.', '超級市場');
add('lose', 'v.', '輸掉; 丟失');
add('throw', 'v.', '丟、拋擲');
add('stand', 'v.', '站立');
add('visitor', 'n.', '訪客、遊客');
add('important', 'adj.', '重要的');
add('breakfast', 'n.', '早餐');
add('path', 'n.', '小道');
add('swing', 'v./n.', '擺動; 鞦韆');
add('actor', 'n.', '演員');
add('cover', 'v.', '蓋住; 遮蓋');
add('bridge', 'n.', '橋');
add('enormous', 'adj.', '巨大的');
add('after school', 'ph.', '放學後');
add('receive', 'v.', '收到');
add('river', 'n.', '河');
add('airport', 'n.', '機場');
add('early', 'adv.', '提早; 在初期');
add('shout', 'v.', '呼喊; 吼叫');
add('area', 'n.', '區域; 範圍');
add('slide', 'n.', '溜滑梯');
add('hungry', 'adj.', '飢餓的');
add('hand', 'v.', '將...交給');
add('wood', 'n.', '木頭; 樹林');
add('adventure', 'n.', '冒險; 奇遇');
add('countryside', 'n.', '農村; 鄉下');
add('shake', 'v.', '搖動; 發抖');
add('school', 'n.', '學校');
add('symbol', 'n.', '符號; 標誌; 象徵');
add('hard / soft', 'adj.', '困難的; 堅硬的 / 柔軟的');
add('dessert', 'n.', '甜點');
add('team', 'n.', '隊伍');

// IMG_1629
add('cross', 'v.', '越過; 跨越');
add('salt', 'n.', '鹽');
add('sweet', 'adj.', '甜的; 溫和的');
add('shop', 'n.', '商店');
add('island', 'n.', '島嶼');
add('delicious', 'adj.', '美味的');
add('fresh', 'adj.', '新鮮的; 清新的');
add('surprise', 'n.', '驚喜');
add('return', 'v.', '返回; 歸還');
add('pour', 'v.', '倒、注入');
add('thick', 'adj.', '厚的; 濃的');
add('kitchen', 'n.', '廚房');
add('park', 'n.', '公園');
add('computer', 'n.', '電腦');
add('soccer (US)', 'n.', '足球');
add('(play) badminton', 'n.', '羽毛球');
add('picnic', 'n.', '野餐');
add('beach', 'n.', '海灘; 沙灘');
add('straight', 'adv.', '筆直地; 坦率地');
add('(do) gymnastics', 'n.', '體操');
add('present', 'n.', '禮物');
add('balloon', 'n.', '氣球');
add('show', 'v.', '顯示; 說明');
add('(play) hockey', 'n.', '曲棍球');
add('restaurant', 'n.', '餐廳'); // wait duplicate? it's in both lists. that's ok.
add('bedroom', 'n.', '臥室');
add('shopper center (US)', 'n.', '購物中心');
add('(play) basketball', 'n.', '籃球');
add('sugar', 'n.', '糖');
add('fruit', 'n.', '水果; 成果');
add('parking lot (US)', 'n.', '停車場');
add('football', 'n.', '美式橄欖球(US); 足球(Br)');
add('(play) tennis', 'n.', '網球');
add('polite', 'adj.', '有禮貌的');
add('waiter', 'n.', '男服務生');
add('prefer', 'v.', '較(喜愛)');
add('(do) judo', 'n.', '柔道');
add('lady', 'n.', '女士');
add('kind', 'adj.', '親切的; 和善的');
add('ladder', 'n.', '梯子');
add('(play) chess', 'n.', '西洋棋');
add('gentleman', 'n.', '紳士、先生');
add('excuse', 'v.', '原諒、寬恕');
add('hole', 'n.', '洞穴、孔');

// IMG_1630
add('(play) table tennis', 'n.', '桌球');
add('hedge', 'n.', '樹籬');
add('adult', 'n.', '成人');
add('ticket', 'n.', '票、券');
add('act', 'v.', '行為、表現');
add('quietly', 'adv.', '安靜地');
add('smile', 'v.', '微笑');
add('boat trip(s)', 'n.', '乘船旅行');
add('rock climbing', 'n.', '攀岩運動');
add('alone', 'adv.', '單獨地、獨自地');
add('arrive', 'v.', '到達、抵達');
add('take photos of', 'ph.', '拍攝...的照片');
add('offer', 'n.', '(短期)折扣; 提議');
add('corner', 'n.', '角落、轉角');
add('subject', 'n.', '主題; 科目');
add('feed', 'v.', '餵養; 提供食物');
add('figure', 'n.', '數字; 外形; 畫像; 塑像');
add('textbook', 'n.', '教科書');
add('already', 'adv.', '已經、早已');
add('lamb', 'n.', '小羊、羊羔');
add('climbing wall', 'n.', '攀岩牆');
add('empty', 'adj./v.', '空的; 倒空');
add('find', 'v.', '尋找; 發現');
add('notice', 'n.', '通知; 告示');
add('route', 'n.', '路線');
add('fan', 'n.', '粉絲; 電風扇');
add('interesting', 'adj.', '有趣的');
add('get up', 'ph.', '起床、起立');
add('flag', 'n.', '旗幟');
add('quarter', 'n.', '四分之一');
add('fly', 'n.', '蒼蠅');
add('have a shower (Br)', 'ph.', '淋浴/洗澡');
add('scarf', 'n.', '圍巾');
add('T-shirt / hat', 'n.', 'T恤 / 帽子');
add('hide', 'v.', '躲藏; 遮掩');
add('take a shower (US)', 'ph.', '淋浴/洗澡');
add('wig', 'n.', '假髮');
add('climb', 'v.', '爬、攀登');
add('boring', 'adj.', '無聊的');
add('go to work', 'ph.', '上班');
add('drum', 'n.', '鼓');
add('through', 'prep.', '穿越、通過; 從頭至尾');

// IMG_1631
add('half', 'adj./n.', '一半的; 一半');
add('change', 'v.', '交換; 改變');
add('lizard', 'n.', '蜥蜴');
add('leave work', 'ph.', '下班');
add('leave school', 'ph.', '放學; 畢業');
add('traffic jam', 'n.', '塞車');
add('Internet', 'n.', '網際網路');
add('shop', 'v.', '買、購買');
add('go to school', 'ph.', '上學');
add('build', 'v.', '建造; 建立');
add('message', 'n.', '訊息、消息');
add('few', 'adj.', '很少的、一點點');
add('go to bed', 'ph.', '睡覺');
add('call', 'v.', '打電話; 呼喊');
add('closely', 'adv.', '密切地; 仔細地');
add('tell', 'v.', '講述、告訴');
add('machine', 'n.', '機器');
add('phone', 'n./v.', '電話; 致電');
add('camera', 'n.', '照相機');
add('sport(s)', 'n.', '體育運動');
add('at work', 'ph.', '工作');
add('past', 'adj./n.', '過去的; 過去');
add('travel', 'v.', '旅行、旅遊');
add('hobby', 'n.', '愛好、嗜好');
add('photo', 'n.', '照片、相片');
add('set up', 'ph.', '建立; 安排; 安裝');
add('movie theater', 'n.', '電影院');
add('concert', 'n.', '音樂會');
add('popular', 'adj.', '受歡迎的; 大眾的');
add('plug', 'v./n.', '宣傳; 插入; 插頭');
add('wonderful', 'adj.', '令人驚奇的; 極好的');
add('gym', 'n.', '體操館; 健身房');
add('information', 'n.', '資料、消息');
add('switch', 'v./n.', '打開/關閉; 開關');
add('draw', 'v.', '繪畫');
add('picture', 'n.', '圖畫、照片');
add('chart', 'n.', '圖表');
add('happen', 'v.', '發生');
add('listen', 'v.', '聽');
add('fantastic', 'adj.', '極好的; 幻想的');

// IMG_1632
add('collect', 'v.', '收藏; 聚集');
add('everyone', 'pron.', '每個人');
add('playground', 'n.', '操場; 遊樂場');
add('leaf / leaves', 'n.', '葉片、樹葉');
add('music', 'n.', '音樂');
add('different', 'adj.', '不一樣的; 另類的');
add('difficult', 'adj.', '困難的、艱難地');
add('touch', 'v.', '碰、觸摸');
add('wet', 'adj.', '濕的、潮濕的');
add('dim', 'adj.', '暗淡的、昏暗的');
add('bright', 'adj.', '明亮的、鮮豔的');
add('have breakfast / eat breakfast', 'ph.', '吃早餐');
add('hundreds of', 'ph.', '許多的、成百上千');
add('mint', 'n.', '薄荷');
add('motor', 'n.', '發動機; 馬達');
add('have lunch / eat lunch', 'ph.', '吃午餐');
add('solar power', 'n.', '太陽能');
add('kit', 'n.', '工具箱、成套工具');
add('circuit', 'n.', '電路、回路');
add('have dinner / eat dinner', 'ph.', '吃晚餐');
add('solar energy', 'n.', '太陽能');
add('bulb', 'n.', '燈泡');
add('electricity', 'n.', '電、電能');
add('advert(s) / advertisement', 'n.', '廣告、宣傳');
add('energy', 'n.', '精力; 能量');
add('battery', 'n.', '電池');
add('dangerous', 'adj.', '危險的、有威脅的');
add('wire', 'n.', '電線; 金屬絲');
add('bus station', 'n.', '公車總站');
add('train station', 'n.', '火車站');
add('amazing', 'adj.', '驚人的; 令人驚喜的');
add('on or off', 'adj.', '開啟的或關閉的');
add('cheer on', 'ph.', '為...加油');
add('shout at', 'ph.', '對...大聲喊');
add('go to the dentist', 'ph.', '看牙醫');
add('stay up (late)', 'ph.', '熬夜');

// IMG_1633
add("It's time to...", "ph.", "是...的時候");
add('head for + a place', 'ph.', '朝...走去');
add('as busy as a bee', 'ph.', '忙個不停');
add('as sick as a dog', 'ph.', '非常虛弱; 病得很重');
add('as hungry as a bear', 'ph.', '非常飢餓');
add('eat out', 'ph.', '外出用餐');
add('act like...', 'ph.', '表現得像...');
add('turn off', 'ph.', '關掉、停止');
add('be worried about', 'ph.', '對...感到擔憂');
add('smile at sb.', 'ph.', '對某人微笑');
add('talk about', 'ph.', '討論、談論');
add('be crazy about', 'ph.', '對...著迷、很狂熱');
add('keep away from', 'ph.', '遠離、避開');
add('as well', 'ph.', '也; 還有');
add('be different from', 'ph.', '不同於; 和...不一樣');
add('watch movies', 'ph.', '看電影');
add('have a lot of fun +V-ing / N.', 'ph.', '玩得很開心');
add('take pictures', 'ph.', '拍照');
add('listen to...', 'ph.', '聽(音樂等)');
add('a number of', 'ph.', '一些、許多');

const tsFileContent = `export interface VocabWord {
  id: string;
  word: string;
  partOfSpeech: string;
  meaning: string;
  englishMeaning?: string; // Optional field if we add it later
}

export const vocabData: VocabWord[] = ${JSON.stringify(data, null, 2)};
`;

fs.writeFileSync('services/newVocabData.ts', tsFileContent);
console.log("Successfully generated services/newVocabData.ts");
