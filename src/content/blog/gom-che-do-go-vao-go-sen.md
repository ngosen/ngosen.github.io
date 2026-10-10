---
title: "Vì sao gom các chế độ gõ vào Gõ Sen"
description: "Bảng chọn của fcitx5-lotus có tám mục, người dùng phải tự đoán app nào hợp chế độ nào. Ngó Sen gom lại còn Gõ Sen và Preedit."
pubDate: 2026-10-08
---

Lúc Ngó Sen tách ra từ fcitx5-lotus, bảng chọn chế độ có tám mục: Uinput (Slow), Uinput (Smooth), Uinput (Super Smooth), Surrounding Text, Preedit, Minecraft, Emoji Picker và OFF. Gõ sai ở app nào thì người dùng phải tự thử từng chế độ, rồi đặt luật riêng cho app đó.

Từ bản 0.5.0, chỉ còn **Gõ Sen** để gõ ở mọi chỗ, **Preedit** cho app không hợp với Gõ Sen, cùng Emoji (trước là Emoji Picker) và OFF. Bộ gõ tự chọn cách thay chữ cho từng app, người dùng không phải thử từng chế độ nữa.

## Ba chế độ Uinput thành một

Slow, Smooth và Super Smooth đều xoá chữ cũ bằng uinput server rồi commit chữ mới, chỉ khác nhau ở cách canh nhịp giữa hai bước đó.

Ngó Sen gộp cả ba thành một chế độ **Uinput** ([#6](https://github.com/ngosen/ngosen-fork-archive/pull/6)). Thay vì chờ một khoảng cố định, bộ gõ chờ app sẵn sàng rồi mới commit chữ mới, nên app nhanh không phải chờ.

## Bỏ Minecraft

Chế độ Minecraft là Uinput bớt đi một lần Backspace, vì Minecraft nhận cả những phím bộ gõ đã chặn lại, không cho tới app. Bản gốc thêm nó để chữa tạm khi chưa rõ nguyên nhân, và tới nay vẫn chưa ai tìm ra. Đặt nhầm chế độ này cho app thường thì mỗi lần thêm dấu, app còn sót một chữ cũ.

Ngó Sen bỏ chế độ này ([#29](https://github.com/ngosen/ngosen-fork-archive/pull/29)). Vì vậy, ai gõ trong Minecraft sẽ bị xoá thừa một chữ mỗi lần thêm dấu.

## Surrounding Text gộp vào, Uinput đổi tên

Chế độ Uinput vốn đã tự xoá chữ qua surrounding text ở app cần cách đó, như LibreOffice. Một chế độ Surrounding Text riêng chỉ còn là thêm một lựa chọn để chọn nhầm, nên bản 0.5.0 gộp nó vào ([#43](https://github.com/ngosen/ngosen-fork-archive/pull/43)).

Cùng bản đó, uinput server bị bỏ hẳn: Backspace đi bằng forward key qua fcitx5, hoặc qua XTEST trên phiên X11. Chế độ không còn dùng uinput thì tên Uinput cũng không còn đúng, nên nó đổi tên thành **Gõ Sen**.

Cấu hình cũ tự chuyển: `Mode=Uinput`, `Mode=Surrounding Text`, `Mode=Minecraft` và luật theo app dùng các chế độ đó đều đọc thành Gõ Sen. Không phải sửa tay file nào.

## Gõ Sen là mặc định

Từ bản 0.5.1-1, Gõ Sen là chế độ mặc định khi cài mới, thay cho Preedit, khớp với cửa sổ cài đặt Ngó Sen và README. Ai đã chọn chế độ thì giữ nguyên ([#74](https://github.com/ngosen/ngosen-fork-archive/pull/74)).

Còn một chỗ Gõ Sen chưa làm được: game dùng SDL ngoài X11 không nhận forward key, cũng không báo surrounding text, nên gõ ra chữ không dấu.
