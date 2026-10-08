---
title: "Máy chủ nền chỉ còn đọc chuột"
description: "Chương trình nền bấm Backspace hộ bộ gõ từng mở được mọi bàn phím. Ngó Sen thu quyền của nó lại, rồi tới bản 0.5.0 thì bỏ hẳn."
pubDate: 2026-10-04
outdated: "Từ bản 0.5.0, Ngó Sen bỏ hẳn máy chủ nền. Cập nhật từ bản cũ thì gói tự tắt dịch vụ và xoá tài khoản uinput_proxy, không cần chạy lệnh nào."
---

Ở chế độ Uinput, Ngó Sen sửa một chữ bằng cách xoá chữ cũ rồi gõ chữ mới. Việc bấm Backspace do một chương trình chạy nền làm hộ, gọi là máy chủ nền. Nó bấm qua một bàn phím ảo do phần mềm tạo ra, và theo dõi cú bấm chuột để biết khi nào người dùng bấm sang chỗ khác giữa một từ.

Việc chỉ có vậy, nhưng quyền nó từng cầm rộng hơn nhiều. Người giúp việc chỉ cần bấm một phím thì không nên giữ chìa khoá mọi phòng trong nhà.

## Rủi ro nằm ở quyền thừa

Để bắt cú bấm chuột, máy chủ nền dùng libinput, thư viện mở mọi thiết bị nhập trên máy, kể cả bàn phím. Tài khoản `uinput_proxy` của nó lại nằm trong nhóm `input`, nhóm đọc được mọi bàn phím. Cộng lại, máy chủ nền có sẵn đường đọc mọi phím người dùng gõ, kể cả mật khẩu.

Mã của nó lúc đó chỉ xử lý nút chuột. Nhưng nếu chương trình này có lỗi và bị lợi dụng, đường đọc bàn phím đã mở sẵn.

## Quyết định: chỉ giữ đúng quyền cần dùng

- Máy chủ nền chỉ mở chuột, touchpad và núm trỏ, ở chế độ chỉ đọc. Tài khoản `uinput_proxy` ra khỏi nhóm `input` ([#8](https://github.com/ngosen/ngosen/pull/8)).
- Luật udev, tức luật cấp quyền thiết bị của Linux, không còn trao bàn phím ảo và mọi thiết bị nhập cho cả nhóm `input` ([#10](https://github.com/ngosen/ngosen/pull/10)).
- Máy chủ nền và bộ gõ nhận nhau theo tài khoản, không theo đường dẫn chương trình. Nhờ vậy máy chủ bỏ được `CAP_SYS_PTRACE`, quyền soi vào tiến trình khác ([#9](https://github.com/ngosen/ngosen/pull/9)).
- Máy chủ bỏ qua lệnh có số phím quá lớn, và xoá hàng chờ khi bộ gõ ngắt kết nối. Trước đây một con số sai có thể làm máy chủ chết, kéo bàn phím chết theo ([#7](https://github.com/ngosen/ngosen/pull/7), [#18](https://github.com/ngosen/ngosen/pull/18)).

Cái giá: máy chủ nền bỏ qua mọi thiết bị tự khai là bàn phím, kể cả loại chuột kiêm bàn phím. Trên loại chuột đó, bấm chuột để ngắt từ không chạy nữa.

## Bước tiếp theo: bỏ hẳn máy chủ nền

Bản 0.5.0 đi thêm một bước: bộ gõ xoá chữ cũ bằng phím gửi hộ qua chính fcitx5, hoặc bấm phím qua XTEST trên phiên X11. Không còn chương trình chạy ngầm, tài khoản `uinput_proxy` hay quyền thiết bị nào nữa ([#43](https://github.com/ngosen/ngosen/pull/43)).
