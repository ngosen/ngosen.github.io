---
title: "WPS Office không phù hợp với IBus"
description: "Gõ tiếng Việt trong WPS Office qua IBus ra tieêngếng thay vì tiếng. Đây là một phần lý do Ngó Sen thôi làm bản IBus."
pubDate: 2026-10-09
---

Gõ `hocj tieengs vieetj` vào một ô của WPS Spreadsheets, đáng ra phải thấy `học tiếng việt`. Qua IBus,
trên Ubuntu 26.04 GNOME, ô lại hiện `hocọc tieêngếng vieêtệt`: mỗi lần thêm dấu, chữ mới bị nối vào sau
thay vì thay chữ cũ. Click sang ô khác rồi gõ tiếp thì chữ của hai ô dính vào nhau.

Lỗi nằm ở phần WPS tự mang theo để kết nối với IBus: nó không làm theo lệnh xoá chữ của bộ gõ. Trên
fcitx5, WPS đi đường khác, và lệnh xoá chữ chạy đúng.

## Một phần lý do thôi làm bản IBus

Lúc đó Ngó Sen đang làm một bản cho IBus, bộ gõ mặc định của GNOME và Ubuntu. WPS cho thấy cùng một app
có thể hỏng mỗi bộ gõ nền một kiểu, và mỗi kiểu phải sửa riêng. Đó là một phần lý do Ngó Sen thôi làm
bản IBus và chỉ làm cho fcitx5, kể ở bài [Ngó Sen chỉ làm cho fcitx5](/blog/chi-lam-cho-fcitx5/).

## Dùng WPS thế nào

Dùng fcitx5 cùng Ngó Sen, như hướng dẫn ở [trang cài đặt](/cai-dat/). Trên Ubuntu 26.04, bật thêm
extension `forward-keys@ngosen.github.io` một lần, xem mục [Ubuntu 26.04](/cai-dat/#ubuntu-26-04).

Trên fcitx5, WPS còn vài lỗi nhỏ: gõ hai phím giống nhau liền nhau (như `dd`, `ee`) có lúc mất một phím,
và click sang ô khác có lúc dính chữ. Các lỗi này đã sửa nhưng chưa có trong bản phát hành.
