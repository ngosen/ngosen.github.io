---
title: "Ngó Sen 1.4 tối ưu lại lệnh cài và bỏ bớt tuỳ chọn thừa"
description: "Trên GNOME và Xfce, Cinnamon, MATE, lệnh cài một dòng tự đặt fcitx5 làm bộ gõ và thêm Ngó Sen. Có thêm lệnh gỡ, cửa sổ cấu hình bớt mục thừa."
pubDate: 2026-10-14
draft: true
---

Ngó Sen 1.4 tối ưu lại nhiều chỗ. Lệnh cài một dòng tự làm các bước cấu hình mà trước đây người dùng
phải làm tay, trên GNOME và trên các desktop X11 như Xfce, Cinnamon. Các tuỳ chọn và đoạn code không còn cần thì được bỏ đi.

## Cài trên GNOME

Trước đây, cài Ngó Sen trên GNOME (desktop mặc định của Ubuntu) xong vẫn phải tự đặt fcitx5 thay IBus,
rồi tự thêm Ngó Sen vào danh sách bộ gõ. Giờ lệnh cài làm các việc đó:

- đặt fcitx5 làm bộ gõ thay IBus: fcitx5 tự chạy khi đăng nhập, app được đặt biến môi trường để gõ qua
  fcitx5;
- thêm Ngó Sen vào danh sách bộ gõ;
- bật extension sửa lỗi gõ, chỉ trên GNOME 50.0 đến 50.3 là các bản có lỗi kể ở bài
  [Ubuntu 26.04 lỗi gõ tiếng Việt ra chữ sai](/blog/ubuntu-26-04-go-tieng-viet-ra-chu-sai/);
- trên GNOME không có khay hệ thống, như Fedora, cài thêm extension
  [Input Method Panel](https://extensions.gnome.org/extension/261/) để biểu tượng và menu bộ gõ hiện trên
  thanh trên cùng. Ubuntu đã có khay nên không cài thêm.

Cài xong, đăng xuất rồi đăng nhập lại, sau đó bấm Ctrl+Shift để bật tiếng Việt. Phím mặc định trước đây là
Ctrl+Space, nhưng đó cũng là phím gợi ý code của VS Code. Ai đã tự chọn phím khác cho fcitx5 thì phím đó
giữ nguyên.

### Bớt icon thừa trong danh sách app

Gói fcitx5 cài kèm vài icon trong danh sách app mà người dùng Ngó Sen không cần mở. Lệnh cài ẩn chúng
đi:

- icon mở fcitx5, vì fcitx5 đã tự chạy khi đăng nhập;
- icon công cụ chuyển cấu hình từ fcitx4, vì người dùng Ngó Sen không cần chuyển cấu hình cũ;
- icon "Fcitx5 Configuration", nhưng chỉ khi khay hệ thống hoặc menu của Input Method Panel đã mở được
  cùng cửa sổ đó.

Icon chỉ ẩn với tài khoản đang chạy lệnh, app vẫn nằm nguyên trên máy.

## Cài trên Xfce, Cinnamon, MATE

Trên các desktop X11 chọn bộ gõ bằng im-config, như Xfce, Cinnamon, MATE (MX Linux, Linux Mint), lệnh cài
cũng tự đặt fcitx5 làm bộ gõ cho tài khoản: fcitx5 tự chạy khi đăng nhập, app gõ qua fcitx5. Lệnh thêm Ngó
Sen vào danh sách bộ gõ và đặt phím Ctrl+Shift như trên GNOME.

Trên Debian và Ubuntu, lệnh cài luôn cài kèm `im-config` và các gói giúp app GTK, Qt gõ được qua fcitx5,
kể cả trên máy tắt cài gói đi kèm như MX Linux.

## Nhiều tài khoản và cài tay

Lệnh cài chỉ đổi cấu hình của tài khoản đang chạy nó. Máy có nhiều tài khoản thì đăng nhập vào từng tài
khoản rồi chạy lại lệnh cài.

Muốn tự làm các bước trên thì thêm `--no-setup`, lệnh chỉ cài gói như trước:

```
curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/main/install.sh | bash -s -- --no-setup
```

## Gỡ bằng một dòng lệnh

Lệnh cài có thêm `--uninstall`. Nó gỡ Ngó Sen, và trên GNOME thì trả lại những gì lệnh cài đã đổi, để lần
đăng nhập sau GNOME dùng lại IBus:

```
curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/main/install.sh | bash -s -- --uninstall
```

Trên Xfce, Cinnamon, MATE, lệnh gỡ trả bộ gõ về mặc định của máy. Gói fcitx5 vẫn còn trên máy, nên fcitx5
có thể vẫn tự chạy khi đăng nhập, chỉ gõ được tiếng Anh. Muốn gỡ hẳn thì chạy `sudo apt remove fcitx5`.

## Bớt tuỳ chọn thừa

Cửa sổ cấu hình chung của fcitx5 không còn hiện 10 mục "Experiment" của Ngó Sen. Các mục này chỉ dùng khi
dò lỗi. Giá trị cũ vẫn giữ, và vẫn chỉnh được trong file `ngosen.conf` khi cần.

Trang Gõ chữ trong cửa sổ cài đặt bỏ mục "Đọc chữ quanh con trỏ". Mục này mặc định tắt, và là cách chữa
tạm lỗi gõ trên Messenger từ trước khi Ngó Sen có cách sửa riêng. Ai từng bật nó thì giờ gõ như mọi người
khác.

Một phần code không còn chỗ nào dùng cũng được bỏ. Người dùng không thấy khác gì.

## Sửa lỗi

Gỡ rồi cài lại trên GNOME không còn làm mất Ngó Sen khỏi danh sách bộ gõ.

Gói Ngó Sen dựng lại được. Kho mã lõi Go mà Ngó Sen dùng đã bị xoá khỏi GitHub, nên mọi lần dựng gói đều
hỏng ngay bước tải mã. Lõi Go giờ lấy từ bản sao [ngosen/bamboo-go-core](https://github.com/ngosen/bamboo-go-core),
cùng đúng bản code như trước.

## Đã test trên máy nào

Lệnh cài được chạy trên máy ảo Ubuntu 26.04 (GNOME Wayland), CachyOS (GNOME 51), Linux Mint (Cinnamon X11)
và MX Linux 25 (Xfce X11), với bản dựng từ nhánh `next`. Sau khi đăng nhập lại, bấm Ctrl+Shift rồi gõ Telex
`tieengs vieetj` ra `tiếng việt` trong ô chữ GTK3, 3/3 lần trên mỗi máy. Lệnh gỡ được test trên Ubuntu 26.04
(IBus chạy lại) và MX Linux 25.

## Cập nhật

Chạy lại lệnh cài ở [trang Cài đặt](/cai-dat/). Cấu hình cũ giữ nguyên. Trên GNOME và Xfce, Cinnamon, MATE,
đăng xuất rồi đăng nhập lại để các bước cấu hình mới có tác dụng.
