# Auto hide next up card for Amazon Prime Video

Amazon Prime VideoのNext up等の邪魔な要素を非表示にするユーザースクリプト及びChromeの拡張機能。

[ユーザースクリプト](https://greasyfork.org/ja/scripts/478102-auto-hide-next-up-card-for-amazon-prime-video)  
[Chrome ウェブストア](https://chrome.google.com/webstore/detail/auto-hide-next-up-card-fo/pnpkddhaeadgjpmmcahamnicmplobkci)

以下の機能を実装しています。

- 非表示ボタンの自動クリックとdisplay:noneの設定によるNext upの非表示
  - 非表示ボタンの自動クリック時にオーバーレイ表示を5秒間無効化
  - オーバーレイ表示が有効な時にのみNext upを表示可能
    - デフォルトではこの機能は無効になっており、Next upは完全に非表示
    - この機能はNext upに非表示ボタンが存在しない場合にのみ機能
- イントロスキップボタンの非表示
  - オーバーレイ表示が有効な時にのみイントロスキップボタンを表示可能
    - デフォルトではこの機能は無効になっており、イントロスキップボタンは完全に非表示
- レーティング(推奨対象年齢)及びその周辺のオーバーレイ要素の非表示

動画右上にオプションダイアログを開くことができるオプションアイコンが追加されます。  
オプションダイアログは`Alt + P`で開くことも可能です。オプションダイアログ上でショートカットキーの変更が可能です。
ショートカットキーにはCtrl/Alt/Shiftとアルファベットが使用可能で、Ctrl/Altとアルファベットは必須です。

スクリプトは各国のAmazonのページ上で実行されますが、動作テストは日本のPrime Video上でのみ行いました。
