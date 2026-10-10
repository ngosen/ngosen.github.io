---
title: "Ubuntu 26.04: Chrome gõ ra tieêngếng và cách giúp Ubuntu sửa sớm"
description: "GNOME Shell trên Ubuntu 26.04 làm mất phím Backspace mà bộ gõ gửi, nên Chrome gõ ra tieêngếng. Bản sửa đã có; còn chờ Ubuntu đưa vào bản cập nhật."
pubDate: 2026-10-09
---

Trên Ubuntu 26.04, gõ `tieengs` trong Chrome, Edge hay app Electron chạy Wayland thì màn hình hiện
`tieêngếng` chứ không phải `tiếng`. Lỗi do GNOME Shell, nên bộ gõ tiếng Việt nào gửi Backspace
qua GNOME Shell cũng bị, không riêng Ngó Sen.

## Chuyện gì xảy ra

Mỗi lần thêm dấu, bộ gõ phải xoá chữ cũ rồi commit chữ mới. Với các app
trên, bộ gõ gửi Backspace qua GNOME Shell bằng forward key.

Từ GNOME 50.0, GNOME Shell bỏ mọi phím đi theo đường forward key. Backspace không tới app, còn chữ mới
vẫn được commit:

- Gõ `tiee`: bộ gõ xoá `e` để thay bằng `ê`. Không xoá được, ô còn `tieê`.
- Gõ thêm `ng`: `tieêng`.
- Gõ `s`: bộ gõ xoá `êng` để thay bằng `ếng`. Lại không xoá được, ô còn `tieêngếng`.

Lỗi đã được sửa ở GNOME từ bản 50.4 ([mutter#4853](https://gitlab.gnome.org/GNOME/mutter/-/work_items/4853)).
Bản sửa chỉ là một dòng code. Ubuntu 26.04 vẫn dùng mutter (phần lõi của GNOME Shell) bản 50.1, nên
chưa có bản sửa đó. Ubuntu 24.04 dùng GNOME 46, bản ra trước khi có lỗi này, nên không bị.

## Ngó Sen đang chữa tạm thế nào

Từ bản 0.5.0-1, gói Ngó Sen kèm một extension GNOME Shell tên `forward-keys@ngosen.github.io` để
Backspace tới được app. Cài xong, đăng xuất rồi đăng nhập lại, sau đó bật một lần:

```
gnome-extensions enable forward-keys@ngosen.github.io
```

Chi tiết ở [trang cài đặt](/cai-dat/#ubuntu-26-04). Đây chỉ là miếng vá tạm. Cách sửa đúng là Ubuntu đưa
dòng code của GNOME vào bản cập nhật cho 26.04; khi đó extension có thể tắt đi.

## Báo lỗi trên Launchpad

Launchpad là nơi Ubuntu nhận báo lỗi. Ngó Sen đã gửi báo lỗi này ngày 07/10/2026:
[Bug #2169784](https://bugs.launchpad.net/ubuntu/+source/mutter/+bug/2169784). Báo lỗi ghi rõ nguyên
nhân, dòng code GNOME đã sửa và các bước tái hiện lỗi.

Tới ngày 09/10/2026, trạng thái trên Launchpad là:

- **Ubuntu 26.10:** đã có bản sửa.
- **Ubuntu 26.04:** đã được xác nhận (Confirmed) và đưa vào danh sách chờ bản cập nhật `resolute-updates`,
  nhưng chưa có ai nhận làm.

Với một phiên bản Ubuntu đã phát hành, mỗi bản cập nhật phải qua quy trình SRU (Stable Release Update):
có người đóng gói bản sửa và đưa lên repo `resolute-proposed`, người dùng cài để test rồi xác nhận, sau đó
bản sửa mới tới máy mọi người. Báo lỗi càng nhiều người bị thì càng dễ được làm sớm.

## Anh chị em có thể giúp

Nếu đang dùng Ubuntu 26.04 và đã gặp lỗi `tieêngếng`:

1. Đăng nhập Launchpad (dùng tài khoản Ubuntu One), mở
   [Bug #2169784](https://bugs.launchpad.net/ubuntu/+source/mutter/+bug/2169784), click **"Does this bug
   affect you?"** rồi chọn **"Yes, it affects me"**. Mỗi người chọn làm tăng điểm "heat", con số
   Launchpad dùng để cho thấy lỗi nào đang ảnh hưởng nhiều người.
2. Không cần viết bình luận chỉ để nói "mình cũng bị". Bình luận có ích khi có thông tin mới: app nào bị,
   bộ gõ nền nào (fcitx5, IBus) và phiên bản GNOME Shell lấy từ lệnh `gnome-shell --version`.
3. Khi bản sửa lên repo `resolute-proposed`, báo lỗi sẽ có thẻ `verification-needed-resolute`. Lúc đó,
   ai bật được repo `resolute-proposed` thì cập nhật, gõ lại `tieengs` trong Chrome với extension đã tắt
   rồi bình luận kết quả. Không có người xác nhận thì bản sửa không ra khỏi `resolute-proposed` được.
