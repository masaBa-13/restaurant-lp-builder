import { RestaurantData } from './types';

export const SYSTEM_PROMPT = `あなたは飲食店のランディングページコンテンツ専門のコピーライターです。
以下のルールを厳守してください：

1. 出力は必ず有効なJSONのみとし、説明文は一切含めない
2. 日本語で書く。自然な話し言葉・温かみのある表現を使う
3. 誇大表現・虚偽表現は避ける
4. ターゲット顧客層に刺さる言葉を選ぶ
5. SEOを意識した自然なキーワード配置
6. 飲食店ならではの食欲をそそる表現を使う`;

export function buildPrompt(data: RestaurantData): string {
  const { basic, menu, appeal, access } = data;

  return `以下の飲食店情報からランディングページのコンテンツを生成してください。

【店舗基本情報】
- 店名: ${basic.name}
- ジャンル: ${basic.genre}
- コンセプト: ${basic.concept}
- ターゲット顧客: ${basic.targetCustomer}
- 価格帯: ${basic.priceRange}

【メニュー情報】
- 看板メニュー: ${menu.signatureDish}
- 看板メニュー説明: ${menu.signatureDescription || '（説明なし）'}
- その他のメニュー: ${menu.otherMenus.length > 0 ? menu.otherMenus.join('、') : 'なし'}
- ドリンクメニュー: ${menu.drinkOption ? 'あり' : 'なし'}
- コース料理: ${menu.courseOption ? 'あり' : 'なし'}

【アピールポイント】
- 強み・こだわり: ${appeal.strengths.length > 0 ? appeal.strengths.join('、') : 'なし'}
- 雰囲気: ${appeal.atmosphere}
- 独自アピール: ${appeal.uniquePoint || 'なし'}

【アクセス情報】
- 住所: ${access.address}
- 最寄り駅: ${access.nearestStation || '未記入'}

以下のJSON形式で出力してください（コードブロックや説明文は不要、JSONのみ）:
{
  "catchCopy": "店の魅力を一言で表すキャッチコピー（20文字以内）",
  "subCopy": "キャッチコピーを補完するサブコピー（40文字以内）",
  "conceptText": "店のコンセプト・ストーリーを語る文章（150文字程度）",
  "signatureDishDescription": "看板メニューの魅力を伝える文章（100文字以内）",
  "appealPoints": [
    {
      "icon": "絵文字1つ",
      "title": "アピールポイントのタイトル（15文字以内）",
      "description": "アピールポイントの説明（60文字以内）"
    },
    {
      "icon": "絵文字1つ",
      "title": "アピールポイントのタイトル（15文字以内）",
      "description": "アピールポイントの説明（60文字以内）"
    },
    {
      "icon": "絵文字1つ",
      "title": "アピールポイントのタイトル（15文字以内）",
      "description": "アピールポイントの説明（60文字以内）"
    }
  ],
  "closingMessage": "来店・予約を促すクロージングメッセージ（60文字以内）",
  "seoTitle": "SEO用タイトル（60文字以内、店名と地域・ジャンルを含む）",
  "seoDescription": "SEO用メタ説明（120文字以内）"
}`;
}
