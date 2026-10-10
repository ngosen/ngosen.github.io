---
title: "Bỏ uinput server"
description: "Ngó Sen từng cần một uinput server chạy nền, có quyền đọc mọi bàn phím, để bấm Backspace hộ bộ gõ. Từ bản 0.5.0, server đó không còn."
pubDate: 2026-10-08
---

Gõ Telex thì dấu tới sau chữ, nên muốn thêm dấu, bộ gõ phải xoá chữ cũ rồi gõ chữ mới. Ở chế độ Uinput (nay là Gõ Sen), `fcitx5-lotus-server` bấm Backspace hộ bộ gõ: một uinput server chạy nền, bấm phím qua bàn phím ảo của kernel.

Server chỉ cần bấm Backspace, nhưng lại được cấp quyền đọc mọi bàn phím trên máy.

## Vì sao server đọc được mật khẩu

Server còn theo dõi chuột, để biết khi nào người dùng click sang chỗ khác giữa một từ. Để làm vậy nó dùng libinput, thư viện mở mọi thiết bị nhập trên máy, kể cả bàn phím. Tài khoản `uinput_proxy` của nó lại nằm trong group `input`, group đọc được mọi bàn phím. Vì vậy server đọc được mọi phím người dùng gõ, kể cả mật khẩu.

Mã của server chỉ xử lý nút chuột. Nhưng nếu nó có lỗi và bị lợi dụng thì kẻ tấn công đọc được bàn phím ngay.

## Tháng 9: thu bớt quyền

Cuối tháng 9/2026, server bị thu bớt quyền: không còn đọc được bàn phím, chỉ còn mở chuột và touchpad ([#7](https://github.com/ngosen/ngosen-fork-archive/pull/7), [#8](https://github.com/ngosen/ngosen-fork-archive/pull/8), [#9](https://github.com/ngosen/ngosen-fork-archive/pull/9), [#10](https://github.com/ngosen/ngosen-fork-archive/pull/10), [#18](https://github.com/ngosen/ngosen-fork-archive/pull/18)). Máy vẫn phải chạy một service có quyền đặc biệt.

## Bản 0.5.0: bỏ server

Từ bản 0.5.0, bộ gõ xoá chữ cũ bằng forward key: gửi phím Backspace hộ qua chính fcitx5, hoặc bấm phím qua XTEST trên phiên X11. Không còn service chạy nền, tài khoản `uinput_proxy` hay luật udev cấp quyền thiết bị ([#43](https://github.com/ngosen/ngosen-fork-archive/pull/43)).

Cập nhật từ bản cũ thì gói tự tắt service và xoá tài khoản `uinput_proxy`. Ai từng tự build từ source thì làm theo bước 4 trong [TU-DUNG.md](https://github.com/ngosen/ngosen/blob/main/TU-DUNG.md) để dọn các file server cũ còn sót lại.

## Những chỗ còn vướng sau khi bỏ

- Game dùng SDL ngoài X11 không nhận forward key, nên gõ ra chữ không dấu.
- GNOME 50.0 tới 50.3 trên Ubuntu 26.04 làm mất phím Backspace mà bộ gõ gửi. Gói Ngó Sen kèm extension `forward-keys@ngosen.github.io` để sửa, phải bật một lần sau khi cài ([#41](https://github.com/ngosen/ngosen-fork-archive/pull/41)).
