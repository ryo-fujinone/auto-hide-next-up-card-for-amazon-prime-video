# Auto hide next up card for Amazon Prime Video

Amazon Prime VideoのNext up等の邪魔な要素を非表示にするユーザースクリプト及びChrome/Firefoxの拡張機能。

[Greasy Fork](https://greasyfork.org/ja/scripts/478102-auto-hide-next-up-card-for-amazon-prime-video)  
[Chrome ウェブストア](https://chrome.google.com/webstore/detail/auto-hide-next-up-card-fo/pnpkddhaeadgjpmmcahamnicmplobkci)  
[Firefox Add-ons](https://addons.mozilla.org/ja/firefox/addon/auto-hide-next-up-card/)

以下の機能を実装しています。

- Next upの非表示
  - デフォルトでは通信を監視してNext upの表示フラグを無効化
    - 通信の監視を無効化してNext upを非表示にすることも可能
  - 非表示ボタンの自動クリック時にオーバーレイ表示を5秒間無効化
  - Next upの出現と同時に画面が暗くなるのを防ぐ（非表示ボタンが無い場合のみ）
  - オーバーレイ表示が有効な時はNext upを表示する（非表示ボタンが無い場合のみ）
    - この機能はデフォルトでは無効状態
- Reactions（好き/好きではない）の非表示
  - オーバーレイ表示が有効な時にのみReactionsを表示することも可能
      - この機能はデフォルトでは無効状態
- 動画終了時にサジェストされたコンテンツに遷移するのを防ぐ（自動再生が有効の場合）
  - 動画終了時の次のエピソードへの遷移は通常通り機能
- イントロスキップボタンの非表示
  - オーバーレイ表示が有効な時にのみイントロスキップボタンを表示させることも可能
    - この機能はデフォルトでは無効状態
- レーティング（推薦年齢対象）の非表示
- オーバーレイ表示が有効な時に暗くならないようにする
  - この機能はデフォルトでは無効状態
  - 文字とアイコンを黒で縁取りすることも可能
- 中央のボタン（再生/停止、戻る、進む）を下部に移動する
  - この機能はデフォルトでは無効状態

動画右上にオプションダイアログを開くことができるオプションアイコンが追加されます。  
オプションダイアログでは上記機能の有効/無効の切り替えが可能です。  
オプションダイアログは`Alt + P`で開くことも可能です。（ショートカットキーは変更可能）  
オプションダイアログ上で設定を変更した場合は設定反映のためにページをリロードしてください。  

スクリプトは各国のAmazonのページ上で実行されますが、動作テストは日本のPrime Video上でのみ行いました。
