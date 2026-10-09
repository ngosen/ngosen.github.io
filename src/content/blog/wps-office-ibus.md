---
title: "WPS Office không phù hợp với IBus"
description: "Gõ tiếng Việt trong WPS Spreadsheets qua IBus ra hocọc thay vì học. Plugin IBus của WPS bỏ qua mọi cách xoá chữ. Trên fcitx5 thì gõ được."
pubDate: 2026-10-09
---

Gõ `hocj tieengs vieetj` vào một ô của WPS Spreadsheets, đáng ra phải thấy `học tiếng việt`. Qua IBus,
ô lại hiện `hocọc tieêngếng vieêtệt`: mỗi lần thêm dấu, chữ mới được nối vào sau thay vì thay chữ cũ.

Mọi kết quả trong bài đo ngày 09/10/2026 trên máy ảo, với bản IBus của Ngó Sen đang làm dở, chưa phát
hành.

## Lỗi trông thế nào

Máy thử chạy Ubuntu 26.04 GNOME (Wayland) và WPS Spreadsheets 11.1.0.11723.

- **Không gõ được gì nếu không chỉnh.** Trên Ubuntu cài sẵn, WPS không nối với bộ gõ nào cả. Phải mở
  WPS với biến `QT_IM_MODULE=ibus` thì nó mới nói chuyện với IBus.
- **Thêm dấu thì nối chữ.** Như ví dụ ở trên: `hocj` ra `hocọc`, không ra `học`.
- **Click sang ô khác thì chữ dính nhau.** Click chuột sang ô mới rồi gõ, chữ của ô mới dính vào chữ ô
  trước: 0 trên 6 ô đúng. WPS không báo gì cho bộ gõ khi người dùng click sang ô khác.

Ngoài lề: WPS 11 không mở được trên Ubuntu 26.04 nếu không chỉnh, vì nó cần `libxml2.so.2` mà
26.04 không còn kèm theo. Để thử, bản `libxml2` 2.9.14 và `libicu74` của Ubuntu 24.04 được chép vào thư
mục riêng của WPS. Đây là cách để đo, không phải cách cài khuyên dùng.

## Vì sao

Với Telex, chữ hiện ra trước, dấu tới sau, nên bộ gõ phải xoá chữ cũ rồi commit chữ có dấu. Việc xoá
phải nhờ app làm.

WPS không dùng module IBus của hệ thống mà mang theo plugin Qt5 IBus riêng; IBus thấy nó với tên
`QIBusInputContext`. Plugin khai là hỗ trợ cả hai cách xoá: forward key (gửi Backspace hộ) và surrounding
text (bảo app xoá chữ quanh con trỏ). Nhưng ô nhập của WPS không làm theo cách nào. Log của bộ gõ cho
thấy Backspace đã được gửi đúng, và WPS lờ đi.

## Đã thử những gì

Cả bốn cách đều thử trong bản build thử, cùng một câu:

1. **Gửi Backspace qua forward key** (cách đang dùng): WPS bỏ qua, ra `hocọc`.
2. **Bảo WPS tự xoá qua surrounding text:** cũng bị bỏ qua, ra y như trên. Log xác nhận lệnh xoá đã chạy
   5 lần.
3. **Preedit:** WPS vứt từ đang gạch chân khi click sang ô khác. Từ cuối của câu bị mất, và cả 6 ô click
   sang đều trống.
4. **Tự bấm phím bằng XTEST qua Xwayland:** gõ được, nhưng Xwayland của GNOME chạy với
   `-enable-ei-portal`. Nó hiện hộp thoại "Remote Desktop – Allow Remote Interaction" và một biểu tượng
   màu cam "đang bị điều khiển" trên thanh trên cùng suốt phiên. Không bộ gõ nào nên bắt người dùng chịu
   cảnh đó.

Vậy với IBus, phía bộ gõ không có cách sửa nào sạch.

## Cách gõ được: dùng fcitx5

Trên fcitx5, WPS đi qua một plugin khác nó mang theo, plugin fcitx4, và Backspace gửi hộ chạy đúng.

Đường fcitx5 có hai lỗi riêng với WPS. Cả hai đã sửa trên nhánh `dev`, chưa phát hành:

- WPS ghi thời điểm bấm phím tính theo giây chẵn. Gõ hai phím giống nhau liền nhau (`dd`, `ee`, `oo`,
  `aa`, `ww`) thì phím thứ hai bị coi là phím app gửi lại, và bị bỏ.
- Trong phiên Wayland, Ngó Sen nay theo dõi cú click trên cửa sổ Xwayland, nên ô mới bắt đầu một chữ mới.

Với bản build có hai bản sửa đó, gõ câu có phím đôi `hồ nước cấp` rồi click sang 6 ô và gõ tiếp, mỗi máy chạy
hai lần:

- **CachyOS KDE Plasma Wayland:** câu đúng, 6/6 ô.
- **Linux Mint 22.3 X11:** câu đúng, 6/6 ô cả hai lần.
- **MX Linux 25.3 X11:** câu đúng, 6/6 ô cả hai lần.

Bản `dev` cũ hơn, chưa có bản sửa phím đôi, chỉ đúng 4/6 ô trên Mint và MX.

Một cái bẫy khi tự thử: AutoComplete của WPS khớp cả chữ nằm giữa các ô phía trên trong cùng cột, và ô gợi
ý của nó nuốt cú click kế tiếp. Trông như lỗi bộ gõ, nhưng không phải.

## Tiếp theo

Lỗi nằm trong plugin IBus của WPS, nên Ngó Sen dự định báo cho Kingsoft, hãng làm WPS; báo lỗi chưa
gửi. Chưa thử các app Qt5 khác dùng plugin IBus, và chưa thử WPS trên IBus ở phiên X11.
