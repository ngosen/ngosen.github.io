---
title: "Tổng hợp các bộ gõ tiếng Việt trên Linux và cơ chế gõ"
description: "Đọc mã của 18 bộ gõ tiếng Việt khác cho Linux. Có năm cách đưa chữ vào app, mỗi cách người dùng thấy gì, và Ngó Sen chọn học điều gì."
pubDate: 2026-10-08
---

Khi gõ `as` ra `á`, mọi bộ gõ đều phải làm cùng một việc: xoá `a` rồi viết `á`. Cách làm việc đó quyết định chuyện người dùng có bị mất chữ, lặp chữ hay không.

Ngày 24/09/2026, người giữ dự án đọc mã của 18 bộ gõ trong [danh sách cộng đồng](https://docs.google.com/spreadsheets/d/1DhW_jVM3IPSR1fX2CJyZstNFqoHDL3u6aLOrj2tYDk4/edit?gid=1097134275) để tìm câu trả lời. Chỉ đọc mã, không cài, không chạy. Bản đầy đủ, ghi rõ file, dòng và commit đã đọc, nằm trong [repo chính](https://github.com/ngosen/ngosen/blob/main/NGHIEN-CUU-BO-GO-KHAC.md).

## Năm cách đưa chữ vào app

**Nhờ app tự xoá rồi chèn chữ mới.** Bộ gõ đọc surrounding text, tức chữ quanh con trỏ mà app báo lại, bảo app xoá đúng phần cần bỏ, rồi chèn chữ mới. Tất cả đi một đường nên không lệch nhịp. Nhưng cách này chỉ chạy tốt khi app báo đúng surrounding text, mà nhiều app báo sai hoặc không báo. Funput, Unikey-Wayland-Final, CanType, vnkey, telebit đi theo cách này.

**Preedit, nhưng tắt gạch chân.** Chữ đang gõ nằm tạm trong ô, có gạch chân, cho tới khi xong từ, như chế độ Preedit của Ngó Sen. Bộ gõ xin app đừng gạch chân để trông giống chữ thường. App có chiều theo hay không thì tuỳ từng app. pinakey, TypeVN, vietc dùng cách này.

**Tự làm bộ gõ Wayland riêng.** vi-ime không chạy trong fcitx5 mà tự nói chuyện với Wayland, gõ ra chữ Việt bằng một bàn phím ảo mang sẵn bảng phím có dấu. Lệnh xoá và lệnh chèn tới app cùng một lần. Cách này chỉ chạy trên Sway, Hyprland và các môi trường wlroots; KDE chưa có phần Wayland cần thiết.

**Hai bước: bấm Backspace rồi gõ chữ mới.** Bộ gõ bấm Backspace qua bàn phím ảo, rồi commit chữ mới theo đường riêng, canh nhịp bằng đồng hồ hoặc bằng tin báo của app. skey, ArecaIME, VMK, fcitx5-lilypad, fcitx5-lotus và Ngó Sen lúc đó đều cùng họ này.

**Đổi bảng phím rồi bấm (X11).** Mỗi chữ có dấu, bộ gõ đổi tạm bảng phím rồi bấm phím. Cách này không dùng được trên Wayland.

## Những ý đáng học

- **Funput** gõ luôn, rồi đọc lại ô để xem app có làm đúng không. App nào bỏ qua lệnh xoá thì riêng app đó chuyển sang preedit, và bộ gõ nhớ app đó cho lần sau.
- **Unikey-Wayland-Final** giữ các phím gõ tiếp vào hàng chờ, tới khi app xác nhận đã thay chữ xong mới thả ra.
- **CanType** không biết trong ô có gì thì không xoá, chỉ chèn.
- **vi-ime** cho thấy gõ thẳng chữ Việt bằng bàn phím ảo chạy được, và ghi lại các bẫy gặp phải: vài mã phím bị app hiểu thành phím chức năng, còn đổi bảng phím giữa chừng thì Chrome và Edge áp dụng trễ.

## Ngó Sen chọn gì

Người giữ dự án quyết định chỉ đi tiếp một hướng: **gõ thẳng chữ Việt bằng bàn phím ảo**, học từ vi-ime, với bảng phím cố định ngay từ đầu. Các ý còn lại (giữ phím chờ xác nhận, nhớ app hay mất chữ, preedit không gạch chân) chưa làm.

Từ đó tới nay, bản 0.5.0 đã đổi cách Ngó Sen xoá chữ. Vẫn là hai bước, nhưng Backspace đi bằng forward key qua chính fcitx5 thay vì qua bàn phím ảo, nên không cần uinput server nữa.
