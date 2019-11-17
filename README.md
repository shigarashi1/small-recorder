# small-recorder

## nvm use

```
use v12.4.0
```

## install modules

```
npm install
```

## Running the server

```
$ npm start
```

## Build Project

```
$ npm run build
```

## Running the tests

```
$ npm run test
```

## 残タスク

- [x] Type の id の Nullable を廃止する
- [x] user の登録

- [x] reportPage の設定
- [x] searchPage の設定
- [x] ListItemText

- [ ] recordPage のバグ修正（修正時に新規の textarea にも表示される）
- [ ] login でも sidebar を表示する
- [ ] sidebar に権限チェックをつけて manual は表示できるようにする
- [ ] deploy 後は sample は表示できないようにする
- [ ] pagetitle は別コンポーネントにして main template に追加する
- [ ] auth データの調整。必要なデータのみを pickup する
- [ ] background でページ幅や高さを取得して redux で管理する
- [ ] url に応じて、browseTab を変更できるようにする
- [ ] 上記を元にページの表示を切り替えられるようにする
- [ ] settingPage、recordPage の調整（ダイアログとかを redux 経由にする）

- [ ] snackbar で複数のメッセージを表示できるようにする

- [ ] settingPage の table 上で編集できるようにする

- [ ] loading の調整

- [ ] 言語変更用をコンポーネント作成
- [ ] message もっといい感じにしたい
- [ ] i18n の導入

- [ ] type には population したまま渡してあげるようにする

- [ ] username 変更できるようにする
- [ ] user の削除ができるようにする
- [ ] user 削除時に batch でユーザーのデータを消す

- [ ] メール未認証ユーザーへの通知
