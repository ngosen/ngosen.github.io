---
title: "Ubuntu 26.04 làm mất phím Backspace của bộ gõ, và cách giúp Ubuntu sửa sớm"
description: "GNOME Shell trên Ubuntu 26.04 bỏ rơi phím Backspace mà bộ gõ gửi, nên Chrome gõ ra tieêngếng. Bản sửa đã có; còn chờ Ubuntu đưa vào bản cập nhật."
pubDate: 2026-10-09
---

Trên Ubuntu 26.04, gõ `tieengs` trong Chrome, Edge hay app Electron chạy Wayland, đáng ra phải thấy
`tiếng`, màn hình lại hiện `tieêngếng`. Lỗi không nằm ở bộ gõ. Nó nằm ở GNOME Shell, và nó làm hỏng mọi
bộ gõ tiếng Việt đi qua đường này, không riêng Ngó Sen.

## Chuyện gì xảy ra

Với Telex, chữ hiện ra trước, dấu tới sau, nên bộ gõ phải xoá chữ cũ rồi commit chữ mới. Ở các app trên,
phím Backspace bộ gõ gửi đi qua GNOME Shell bằng forward key.

Từ GNOME 50.0, GNOME Shell vứt bỏ mọi phím bộ gõ gửi theo đường forward key. Backspace không tới được
app, nhưng chữ mới vẫn được commit:

- Gõ `tiee`: bộ gõ xoá `e` để thay bằng `ê`. Không xoá được, ô còn `tieê`.
- Gõ thêm `ng`: `tieêng`.
- Gõ `s`: bộ gõ xoá `êng` để thay bằng `ếng`. Lại không xoá được, ô còn `tieêngếng`.

Lỗi đã được sửa ở GNOME từ bản 50.4 ([mutter#4853](https://gitlab.gnome.org/GNOME/mutter/-/work_items/4853)).
Bản sửa chỉ là một dòng code. Ubuntu 26.04 vẫn dùng mutter 50.1, phần lõi của GNOME Shell, nên chưa có
bản sửa đó. Ubuntu 24.04 không bị, vì GNOME bản 46 không có lỗi này.

## Ngó Sen đang chữa tạm thế nào

Từ bản 0.5.0-1, gói Ngó Sen kèm một extension GNOME Shell tên `forward-keys@ngosen.github.io`. Nó thay
đường forward key bị hỏng bằng một bàn phím ảo của chính GNOME Shell, nên Backspace tới được app. Cài
xong, đăng xuất rồi đăng nhập lại, sau đó bật một lần:

```
gnome-extensions enable forward-keys@ngosen.github.io
```

Chi tiết ở [trang cài đặt](/cai-dat/#ubuntu-26-04). Đây chỉ là miếng vá tạm. Cách sửa đúng là Ubuntu đưa
dòng code của GNOME vào bản cập nhật cho 26.04; khi đó extension có thể tắt đi.

## Báo lỗi trên Launchpad

Launchpad là nơi Ubuntu nhận báo lỗi. Ngó Sen đã gửi báo lỗi này ngày 07/10/2026:
[Bug #2169784](https://bugs.launchpad.net/ubuntu/+source/mutter/+bug/2169784). Báo lỗi ghi rõ nguyên
nhân, dòng code GNOME đã sửa, và cách thử lại từng bước.

Tới ngày 09/10/2026, trạng thái trên Launchpad là:

- **Ubuntu 26.10:** đã có bản sửa.
- **Ubuntu 26.04:** đã được xác nhận (Confirmed) và đưa vào danh sách chờ bản cập nhật `resolute-updates`,
  nhưng chưa có ai nhận làm.

Bản cập nhật cho một bản Ubuntu đã phát hành phải đi qua quy trình SRU (Stable Release Update): có người
đóng gói bản sửa, đưa lên kho thử `resolute-proposed`, người dùng gõ thử rồi xác nhận, sau đó mới tới máy
mọi người. Báo lỗi càng có nhiều người bị ảnh hưởng thì càng dễ được làm sớm.

## Anh chị em có thể giúp

Nếu đang dùng Ubuntu 26.04 và đã gặp lỗi `tieêngếng`:

1. Đăng nhập Launchpad (dùng tài khoản Ubuntu One), mở
   [Bug #2169784](https://bugs.launchpad.net/ubuntu/+source/mutter/+bug/2169784), bấm **"Does this bug
   affect you?"** rồi chọn **"Yes, it affects me"**. Mỗi người bấm làm tăng điểm "heat", con số
   Launchpad dùng để cho thấy lỗi nào đang ảnh hưởng nhiều người.
2. Không cần viết bình luận chỉ để nói "mình cũng bị". Bình luận có ích khi có thông tin mới: app nào bị,
   bộ gõ nào (fcitx5, IBus), và phiên bản GNOME Shell lấy từ lệnh `gnome-shell --version`.
3. Khi bản sửa lên kho `resolute-proposed`, báo lỗi sẽ có thẻ `verification-needed-resolute`. Lúc đó,
   ai bật được kho thử thì cập nhật, gõ lại `tieengs` trong Chrome với extension đã tắt, và bình luận kết
   quả. Không có người xác nhận thì bản sửa không rời được kho thử.

Bản sửa này giúp mọi bộ gõ tiếng Việt trên Ubuntu 26.04, không riêng Ngó Sen.
