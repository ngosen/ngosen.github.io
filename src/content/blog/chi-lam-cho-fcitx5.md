---
title: "Ngó Sen chỉ làm cho fcitx5"
description: "Ngó Sen thôi làm bản IBus và bản chạy thẳng trên Sway, Hyprland. Người dùng GNOME và Ubuntu vẫn gõ được bằng fcitx5."
pubDate: 2026-10-09
---

Từ ngày 09/10/2026, Ngó Sen chỉ làm cho fcitx5. Hai hướng trong roadmap cũ đã thôi làm: bản cho IBus
(bộ gõ mặc định của GNOME và Ubuntu) và bản chạy thẳng trên Sway, Hyprland không cần fcitx5.

## Vì sao

Tốn công nhất là test. Mỗi bộ gõ nền, fcitx5 hay IBus, đưa chữ vào app theo cách
riêng, nên mỗi bản phải test lại từng app. Cùng một app có thể lỗi theo kiểu khác hẳn trên mỗi nền.

Một ví dụ là WPS Office. Trên IBus, ở Ubuntu 26.04 GNOME, gõ `tieengs` trong một ô ra `tieêngếng`
thay vì `tiếng`. Trên fcitx5, cùng app đó gõ đúng. Chi tiết ở bài
[WPS Office không phù hợp với IBus](/blog/wps-office-ibus/).

Mỗi app lỗi kiểu riêng như vậy phải sửa riêng cho từng nền, rồi test lại sau mỗi bản cập nhật. Một người
làm dự án không kham nổi hai ba bản cùng lúc mà vẫn test kỹ từng bản.

## Người dùng GNOME và Ubuntu

Vẫn gõ được: cài fcitx5 cùng Ngó Sen, như hướng dẫn ở [trang cài đặt](/cai-dat/). Trên Ubuntu 26.04,
bật thêm extension `forward-keys@ngosen.github.io` một lần, xem mục
[Ubuntu 26.04](/cai-dat/#ubuntu-26-04).

## Mã bản IBus

Phần đã làm của bản IBus vẫn nằm ở nhánh
[`feat/ibus-engine`](https://github.com/ngosen/ngosen/tree/feat/ibus-engine) trên GitHub, nhưng không
được cập nhật nữa.
