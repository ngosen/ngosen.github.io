---
title: "WPS Office không phù hợp với IBus"
description: "Gõ tiếng Việt trong WPS Office qua IBus ra tieêngếng thay vì tiếng. Đây là một phần lý do Ngó Sen thôi làm bản IBus."
pubDate: 2026-10-09
---

Trên Ubuntu 26.04 GNOME, gõ `hocj tieengs vieetj` qua IBus vào một ô của WPS Spreadsheets thì ô hiện
`hocọc tieêngếng vieêtệt` chứ không phải `học tiếng việt`: mỗi lần thêm dấu, chữ mới bị nối vào sau
thay vì thay chữ cũ. Click sang ô khác rồi gõ tiếp thì chữ của hai ô dính vào nhau.

WPS tự mang theo phần kết nối với IBus, và phần đó không làm theo lệnh xoá chữ của bộ gõ. Trên fcitx5,
WPS nối với bộ gõ theo cách khác, và lệnh xoá chữ chạy đúng.

## Một phần lý do thôi làm bản IBus

Trước ngày 09/10/2026, Ngó Sen đang làm một bản cho IBus, bộ gõ nền mặc định của GNOME và Ubuntu. WPS cho thấy cùng một app
có thể lỗi mỗi bộ gõ nền một kiểu, và mỗi kiểu phải sửa riêng. Vì vậy, cùng vài lý do khác, Ngó Sen
thôi làm bản IBus và chỉ làm cho fcitx5, kể ở bài [Ngó Sen chỉ làm cho fcitx5](/blog/chi-lam-cho-fcitx5/).

## Dùng WPS thế nào

Dùng fcitx5 cùng Ngó Sen, như hướng dẫn ở [trang cài đặt](/cai-dat/). Trên Ubuntu 26.04, bật thêm
extension `forward-keys@ngosen.github.io` một lần, xem mục [Ubuntu 26.04](/cai-dat/#ubuntu-26-04).

Trên fcitx5, WPS từng có hai lỗi: gõ hai phím giống nhau liền nhau (như `dd`, `ee`) có lúc mất một
phím, và click sang ô khác có lúc dính chữ. Bản [1.0.0-1](/ban-phat-hanh/) đã sửa các lỗi này.
