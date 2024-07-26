# markdownlint-rule-zenn-slug

墓標です。

## やりたかったこと

Zenn CLI を使った執筆環境において、markdownlint を拡張して slug の衝突を検出したかった。

## できること

- APIリクエストを使った非同期でのslug衝突検出
- 1行目のエラーとしてmarkdownlintのエラーとして報告できる
- markdownlintの対象ファイルが1つ～少量ならたぶん使える

## だめだったところ

- Zenn API に DoS 攻撃してしまう。
- Dos攻撃しないように待機時間を設けるとファイル数が多い場合に遅い
