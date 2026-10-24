---
title: "Gõ tiếng Việt trong ArtCraft"
description: "Kết quả test Ngó Sen trong ArtCraft trên Ubuntu 26.04 GNOME Wayland: chỗ gõ đúng, lỗi đã báo và cách dùng tạm trong khi chờ app sửa."
pubDate: 2026-10-24
---

Nếu các bạn quan tâm đến việc gõ tiếng Việt trong ArtCraft, đây là kết quả test của mình với Ngó Sen để các bạn tham khảo.
Trên Ubuntu 26.04 GNOME Wayland, sáu app gõ đúng và bốn app gặp lỗi.
ArtCraft là bộ app của storytold trên GitHub, gồm WordCraft, DeckCraft, GridCraft, CADCraft, PdfCraft…

## Test thế nào

Test ngày 24/10/2026 trên Ubuntu 26.04 GNOME (Wayland), fcitx5 version 5.1.19,
Ngó Sen version 1.5.6-1, chế độ “Gõ Sen”. Riêng WordCraft được test từ 18 đến 21/10.
Chuỗi `tieengs vieetj cos daaus` được gõ bằng các lần bấm phím thật, cách nhau 50 đến 150 ms,
rồi đọc lại chữ từ app.

## Kết quả từng app

| App | Kết quả | Theo dõi |
| --- | --- | --- |
| PdfCraft version 0.13.0 | Gõ đúng trong ô tìm lệnh và ghi chú | — |
| DesignCraft version 0.12.0 | Gõ đúng trong ô tìm kiếm và khung chữ | — |
| PhotoCraft version 0.15.1 | Gõ đúng trong lớp chữ | — |
| VectorCraft version 0.16.0 | Gõ đúng chữ trên trang | — |
| FigCraft version 0.10.0 | Gõ đúng trong lớp chữ | — |
| LightCraft version 0.13.0 | Gõ đúng trong ô tìm ảnh | — |
| WordCraft version 0.8.0 | Chữ sai, như `tiêiees` thay vì `tiếng` | [Lỗi #2932](https://github.com/storytold/wordcraft/issues/2932), [bản sửa chờ review](https://github.com/storytold/wordcraft/pull/3074), [Ngó Sen #288](https://github.com/ngosen/ngosen/issues/288) |
| DeckCraft version 0.10.0 | Chữ sai trong 2/4 lượt: `tiêiees viieej có dấu` | [Lỗi #1306](https://github.com/storytold/deckcraft/issues/1306) |
| GridCraft version 0.11.1 | Gõ thẳng vào ô còn nguyên Telex ở từ đầu: `tieengs việt có dấu` | [Lỗi #2345](https://github.com/storytold/gridcraft/issues/2345), [đang sửa](https://github.com/storytold/gridcraft/pull/1632) |
| CADCraft version 0.12.0 | Chữ trong lệnh TEXT còn nguyên Telex | [Lỗi #1761](https://github.com/storytold/cadcraft/issues/1761) |

Các lỗi trên nằm ở app và đã được báo cho storytold. Ngó Sen không cần thay đổi để sửa các lỗi này.

## Cách dùng tạm

Với WordCraft, khởi động app với biến môi trường `WORDCRAFT_WAYLAND=1` để chạy Wayland thực sự,
hoặc chuyển Ngó Sen sang chế độ “Gạch chân”. Trên phiên X11, Ngó Sen đã tự tránh lỗi WordCraft
từ version 1.5.3-1.

DeckCraft cũng có hai cách: khởi động với biến môi trường `DECKCRAFT_WAYLAND=1` để chạy Wayland
thực sự, hoặc dùng “Gạch chân”. DeckCraft trên X11 chưa được test.

Với GridCraft, bấm F2 trên ô trước rồi mới gõ. CADCraft chưa có cách dùng tạm.

## Những chỗ chưa test

EffectCraft, FilmCraft, SoundCraft, phiên X11 (Linux Mint…) và KDE Plasma chưa được test
trong đợt này. Nếu dùng các app hoặc môi trường đó, các bạn có thể test rồi báo kết quả tại
[Ngó Sen #295](https://github.com/ngosen/ngosen/issues/295).
Bảng trong issue được cập nhật khi app phát hành version có bản sửa.
