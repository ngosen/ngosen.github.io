---
title: "Bỏ uinput server"
description: "Ngó Sen từng cần một uinput server chạy nền, có quyền đọc mọi bàn phím, để bấm Backspace hộ bộ gõ. Từ bản 0.5.0, server đó không còn."
pubDate: 2026-10-08
---

Với Telex, chữ hiện ra trước, dấu tới sau. Muốn thêm dấu, bộ gõ phải xoá chữ cũ rồi gõ chữ mới. Ở chế độ Uinput (nay là Gõ Sen), việc bấm Backspace do `fcitx5-lotus-server` làm hộ: một uinput server chạy nền, bấm phím qua bàn phím ảo của kernel.

Việc chỉ có vậy, nhưng quyền nó cầm rộng hơn nhiều. Người giúp việc chỉ cần bấm một phím thì không nên giữ chìa khoá mọi phòng trong nhà.

## Rủi ro nằm ở quyền thừa

Server còn theo dõi cú bấm chuột, để biết khi nào người dùng bấm sang chỗ khác giữa một từ. Để làm vậy nó dùng libinput, thư viện mở mọi thiết bị nhập trên máy, kể cả bàn phím. Tài khoản `uinput_proxy` của nó lại nằm trong group `input`, group đọc được mọi bàn phím. Cộng lại, server có sẵn đường đọc mọi phím người dùng gõ, kể cả mật khẩu.

Mã của server chỉ xử lý nút chuột. Nhưng nếu nó có lỗi và bị lợi dụng, đường đọc bàn phím đã mở sẵn.

## Bước đầu: thu quyền lại

Cuối tháng 9/2026, server bị thu bớt quyền: chỉ mở chuột và touchpad ở chế độ chỉ đọc, ra khỏi group `input`, bỏ `CAP_SYS_PTRACE`, và từ chối lệnh có số phím quá lớn ([#7](https://github.com/ngosen/ngosen/pull/7), [#8](https://github.com/ngosen/ngosen/pull/8), [#9](https://github.com/ngosen/ngosen/pull/9), [#10](https://github.com/ngosen/ngosen/pull/10), [#18](https://github.com/ngosen/ngosen/pull/18)). Nhưng máy vẫn phải chạy một service có quyền đặc biệt.

## Quyết định: bỏ hẳn

Từ bản 0.5.0, bộ gõ xoá chữ cũ bằng forward key: gửi phím Backspace hộ qua chính fcitx5, hoặc bấm phím qua XTEST trên phiên X11. Không còn service chạy nền, tài khoản `uinput_proxy` hay luật udev cấp quyền thiết bị ([#43](https://github.com/ngosen/ngosen/pull/43)).

Cập nhật từ bản cũ thì gói tự tắt service và xoá tài khoản `uinput_proxy`. Ai từng tự build từ source thì làm theo bước 4 trong [TU-DUNG.md](https://github.com/ngosen/ngosen/blob/main/TU-DUNG.md) để dọn file server cũ để lại.

## Cái giá

- Game dùng SDL ngoài X11 không nhận forward key, nên gõ ra chữ không dấu.
- GNOME 50.0 tới 50.3 trên Ubuntu 26.04 làm mất phím Backspace mà bộ gõ gửi. Gói Ngó Sen kèm extension `forward-keys@ngosen.github.io` để sửa, phải bật một lần sau khi cài ([#41](https://github.com/ngosen/ngosen/pull/41)).
