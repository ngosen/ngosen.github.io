---
title: "Vì sao gõ tiếng Việt trên Linux hay bị nuốt chữ, lặp chữ"
description: "Linux không có một đường duy nhất để bộ gõ đưa chữ vào app. Mỗi desktop, mỗi toolkit làm một kiểu, và đó là gốc của lỗi nuốt chữ, lặp chữ."
pubDate: 2026-10-04
outdated: "Phần Messenger kể cách làm của chế độ Uinput trước bản 0.5.0. Từ 0.5.0, Uinput đổi tên thành Gõ Sen, uinput server đã bỏ, và trên KDE ô soạn tin Facebook xoá rồi gõ lại như ô thường."
---

Gõ `tieengs vieetj` vào ô chat Messenger, đáng ra phải thấy `tiếng việt`. Trên Linux, có lúc màn hình lại hiện `iếngiệt`: chữ có dấu vẫn đúng, còn `t`, dấu cách và `v` phía trước thì biến mất. Ở thanh địa chỉ trình duyệt thì ngược lại: gõ `tôi` ra `toôi`. Trên Ubuntu 26.04, Chrome có lúc gõ ra `tieêngếng`.

## Bộ gõ phải sửa chữ đã hiện trên màn hình

Với Telex, chữ hiện ra trước, dấu tới sau. Lúc bấm phím bỏ dấu, chữ chưa dấu đã nằm sẵn trong ô. Bộ gõ phải xoá chữ cũ rồi commit chữ có dấu.

Có ba cách để làm việc đó:

- **Gửi Backspace** cho app, bằng forward key hoặc bàn phím ảo.
- **Bảo app tự xoá** qua surrounding text, tức phần chữ quanh con trỏ mà app báo cho bộ gõ.
- **Không xoá gì cả**: dùng preedit, chữ đang gõ nằm tạm trong ô, có gạch chân, tới khi xong từ mới commit.

Cách nào cũng chỉ chạy được nếu app và đường nối tới app hỗ trợ nó. Trên Linux, chỗ khó nằm đúng ở đó.

## Linux không có một đường duy nhất

Chữ đi từ bộ gõ tới app qua nhiều đường khác nhau, tuỳ ba thứ:

- **Phiên đăng nhập:** X11, Wayland, hay app X11 chạy trên Wayland qua XWayland.
- **Desktop:** GNOME chuyển chữ qua GNOME Shell; KDE Plasma dùng giao thức text-input của KWin; Sway, Hyprland và các môi trường wlroots dùng input-method-v2.
- **Cách app nối với bộ gõ:** qua XIM (giao thức cũ của X11), qua mô-đun IBus hoặc fcitx5 trong GTK và Qt, qua Wayland, hoặc qua mô-đun fcitx đời cũ nằm sẵn trong gói snap.

Mỗi tổ hợp là một đường, và mỗi đường hỗ trợ một phần khác nhau. Vài ví dụ Ngó Sen đã gặp và sửa trong bản 0.5.0:

- GNOME 50.0 tới 50.3 trên Ubuntu 26.04 làm mất Backspace mà bộ gõ gửi qua GNOME Shell, nên Chrome, Edge và app Electron gõ ra `tieêngếng`.
- Mô-đun GTK4 bỏ qua forward key, nên app GTK4 phải xoá bằng surrounding text.
- Game dùng SDL không nhận forward key, cũng không báo surrounding text. Ngoài X11, chúng chỉ nhận được chữ không dấu.
- Trên X11, terminal in Shift+mũi tên trái ra thành ký tự rác thay vì bôi đen, nên mẹo bôi đen rồi gõ đè chỉ dùng được cho trình duyệt họ Chromium.
- Trên KDE, lệnh xoá và lệnh commit tới app thành hai lần riêng, nên bộ gõ phải chờ app báo đã xoá xong rồi mới commit.

Rồi trong cùng một đường, mỗi app lại xử lý một kiểu. LibreOffice, Firefox, Chromium và ô soạn tin Facebook đều cần cách riêng, kể ở phần dưới.

## Nhiều đường thì sinh ra nhiều chế độ

Bản gốc fcitx5-lotus đối phó bằng cách cho người dùng chọn: ba chế độ Uinput (Slow, Smooth, Super Smooth), Surrounding Text, Preedit, Minecraft. Gõ sai ở app nào thì người dùng tự thử từng chế độ cho app đó. Việc chọn đường bị đẩy sang cho người gõ.

Ngó Sen đi theo hướng ngược lại: bộ gõ tự nhận ra app nhận chữ kiểu gì và chọn cách xoá phù hợp, người dùng chỉ cần một chế độ Gõ Sen. Chuyện gom chế độ được kể ở bài [Vì sao gom các chế độ gõ vào Gõ Sen](/blog/gom-che-do-go-vao-go-sen/).

## Chuyện ở ô chat Messenger

Lỗi `iếngiệt` là ví dụ rõ nhất cho chuyện hai bước lệch nhịp. Lỗi này được báo ở dự án gốc từ tháng 5/2026 ([issue #267](https://github.com/LotusInputMethod/fcitx5-lotus/issues/267)). Ở chế độ Uinput lúc đó, uinput server bấm Backspace qua bàn phím ảo, rồi bộ gõ commit chữ mới theo một đường khác. Giống hai người cùng sửa một tấm bảng: một người lau, một người viết. Viết sớm quá thì chữ mới bị lau theo.

Hai nguyên nhân nằm ở bộ gõ và đã vá. Phần còn lại nhiều khả năng nằm ở Facebook: xoá xong, ô soạn tin tự vẽ lại, và chữ nào tới đúng lúc đó thì bị nuốt. Đợi thêm một chút sau khi xoá thì đỡ, nhưng máy càng bận càng dễ lọt, không có mức chờ nào đủ cho mọi lúc.

Vì vậy Ngó Sen đổi cách làm ở ô soạn tin Facebook và Messenger:

- **Bôi đen rồi gõ đè, không xoá.** Bộ gõ bấm Shift cùng mũi tên trái để chọn đúng số chữ cần thay, rồi gõ chữ mới đè lên. Ô chat không lúc nào trống, nên không còn khe hở cho Facebook chen vào.
- **Chờ app báo, không chờ đồng hồ.** Edge báo lại đang có bao nhiêu chữ được bôi đen. Bộ gõ đợi đúng tin đó rồi mới commit, như đợi người lau bảng nói "xong rồi".
- **Không chắc thì bỏ dấu, không chèn bừa.** Ô chat không báo lại thì bộ gõ trả con trỏ về chỗ cũ và bỏ lần thêm dấu đó. Mất dấu một chữ thì thấy ngay, còn chữ chèn sai chỗ thì khó phát hiện.

Cách này chỉ dùng cho Facebook và Messenger. Các ô khác không báo lại khi chữ bị bôi đen, nên bật ở mọi nơi thì chữ nào cũng mất dấu.

## Thanh địa chỉ và LibreOffice

Ở thanh địa chỉ, lỗi lặp chữ đến từ phần gợi ý tự điền. Edge báo đúng phần tự điền, nên ở đó đã hết lỗi. Firefox không báo đúng, nên bộ gõ nhận ra thanh địa chỉ của Firefox qua hình dạng của ô nhập.

Ở LibreOffice, gõ `chao` rồi bấm `f` ra `chaà`. LibreOffice xếp Backspace vào hàng để xử lý sau, còn chữ mới thì chèn ngay, nên chờ lâu hơn cũng không cứu được. Ngó Sen bảo thẳng LibreOffice xoá chữ qua surrounding text, không gửi Backspace nữa.
