---
title: "Vì sao gõ tiếng Việt trên Linux hay bị nuốt chữ, lặp chữ"
description: "Linux không có một đường duy nhất để bộ gõ đưa chữ vào app; mỗi desktop, mỗi toolkit làm một kiểu, nên chữ hay bị nuốt hoặc lặp."
pubDate: 2026-10-04
updatedDate: 2026-10-09
outdated: "Phần Messenger kể cách làm trước bản 0.5.0. Từ 0.5.0, chế độ Uinput đổi tên thành Gõ Sen, không còn uinput server, và trên KDE ô soạn tin Facebook được xử lý như ô thường."
---

Gõ `tieengs vieetj` vào ô chat Messenger, đáng ra phải thấy `tiếng việt`. Trên Linux, có lúc màn hình lại hiện `iếngiệt`: chữ có dấu vẫn đúng, còn `t`, dấu cách và `v` phía trước thì biến mất. Ở thanh địa chỉ trình duyệt thì ngược lại: gõ `tooi` ra `toôi`. Trên Ubuntu 26.04, Chrome có lúc gõ ra `tieêngếng`.

## Bộ gõ phải sửa chữ đã hiện trên màn hình

Với Telex, chữ hiện ra trước, dấu tới sau. Lúc bấm phím bỏ dấu, chữ chưa dấu đã nằm sẵn trong ô. Bộ gõ phải xoá chữ cũ rồi commit chữ có dấu.

Có ba cách để làm việc đó:

- Gửi Backspace cho app, bằng forward key hoặc bàn phím ảo.
- Bảo app tự xoá qua surrounding text, tức phần chữ quanh con trỏ mà app báo cho bộ gõ.
- Không xoá gì cả: dùng preedit, chữ đang gõ nằm tạm trong ô, có gạch chân, tới khi xong từ mới commit.

Cách nào cũng chỉ chạy được nếu app và đường nối tới app hỗ trợ nó, và trên Linux thì mỗi đường hỗ trợ một kiểu.

## Linux không có một đường duy nhất

Chữ đi từ bộ gõ tới app qua nhiều đường khác nhau, tuỳ ba thứ:

- Phiên đăng nhập: X11, Wayland, hay app X11 chạy trên Wayland qua Xwayland.
- Desktop: GNOME chuyển chữ qua GNOME Shell; KDE Plasma dùng giao thức text-input của Wayland qua KWin; Sway, Hyprland và các compositor tương tự dùng giao thức input-method-v2.
- Cách app nối với bộ gõ: qua XIM (giao thức cũ của X11), qua module IBus hoặc fcitx5 trong GTK và Qt, qua Wayland, hoặc qua module fcitx đời cũ nằm sẵn trong gói snap.

Mỗi tổ hợp là một đường. Vài ví dụ Ngó Sen đã gặp khi làm bản 0.5.0, có cái đã sửa, có cái chưa:

- GNOME 50.0 tới 50.3 trên Ubuntu 26.04 làm mất Backspace mà bộ gõ gửi qua GNOME Shell, nên Chrome, Edge và app Electron gõ ra `tieêngếng`.
- Module GTK4 bỏ qua forward key, nên app GTK4 phải xoá bằng surrounding text.
- Game dùng SDL không nhận forward key, cũng không báo surrounding text. Ngoài X11, chúng chỉ nhận được chữ không dấu.
- Trên X11, terminal đọc Shift+mũi tên trái thành ký tự rác, nên trong terminal không cách thay chữ nào dựa vào bôi đen dùng được.
- Trên KDE, lệnh xoá và lệnh commit tới app thành hai lần riêng.

Rồi trong cùng một đường, mỗi app lại xử lý một kiểu. LibreOffice, Firefox, Chromium và ô soạn tin Facebook đều cần cách riêng.

## Preedit là đường chính, vì nó sinh ra cho tiếng Trung, Nhật, Hàn

Các bộ gõ trên Linux lớn lên cùng tiếng Trung, Nhật và Hàn. IBus, bộ gõ nền mặc định của GNOME, ra đời theo đề xuất của Northeast Asia OSS Forum, diễn đàn mã nguồn mở của ba nước này ([Wikipedia](https://en.wikipedia.org/wiki/Intelligent_Input_Bus)).

Với các thứ tiếng đó, phím gõ chưa phải chữ cuối cùng. Gõ pinyin của tiếng Trung hay romaji của tiếng Nhật, bộ gõ hiện chuỗi đang soạn có gạch chân, người dùng chọn chữ trong danh sách gợi ý rồi mới commit. Giao thức text-input-v3 của Wayland cũng gọi preedit là "composing text", chữ đang soạn ([đặc tả](https://wayland.app/protocols/text-input-unstable-v3)). Vì vậy preedit là đường mà app và desktop trên Linux quen hỗ trợ nhất.

Tiếng Việt thì khác: mỗi phím ra ngay một chữ, dấu thêm vào chữ đã có. Gõ bằng preedit thì chữ có gạch chân cho tới khi xong từ, và ô gợi ý của thanh địa chỉ hay ô tìm kiếm phải chờ chữ được commit. Muốn gõ thẳng, không gạch chân, thì bộ gõ phải dùng forward key và surrounding text, như các ví dụ ở trên.

## Nhiều đường thì sinh ra nhiều chế độ

Các bản Ngó Sen trước 0.5.0 đối phó bằng cách cho người dùng chọn: ba chế độ Uinput (Slow, Smooth, Super Smooth), Surrounding Text, Preedit, Minecraft. Gõ sai ở app nào thì người dùng tự thử từng chế độ cho app đó.

Ở Ngó Sen, bộ gõ tự nhận ra app nhận chữ kiểu gì và chọn cách xoá phù hợp, người dùng chỉ cần một chế độ Gõ Sen. Chuyện gom chế độ được kể ở bài [Vì sao gom các chế độ gõ vào Gõ Sen](/blog/gom-che-do-go-vao-go-sen/).

## Chuyện ở ô chat Messenger

Lỗi `iếngiệt` xảy ra khi bước xoá và bước commit lệch nhịp nhau. Ở chế độ Uinput lúc đó, uinput server bấm Backspace qua bàn phím ảo, rồi bộ gõ commit chữ mới theo một đường khác. Nếu chữ mới tới ô chat trước khi Backspace chạy xong, Backspace xoá luôn cả chữ mới.

Phần lỗi do bộ gõ đã sửa. Phần còn lại nhiều khả năng do Facebook: xoá xong, ô soạn tin tự vẽ lại, và chữ nào tới đúng lúc đó thì bị nuốt. Đợi thêm một chút sau khi xoá thì đỡ, nhưng máy càng bận càng dễ lọt, không có mức chờ nào đủ cho mọi lúc.

Vì vậy, ở ô soạn tin Facebook và Messenger, Ngó Sen thay chữ theo một cách khác để ô không lúc nào trống, nên Facebook không còn lúc để nuốt chữ. Cách này chỉ dùng cho hai ô đó.

## Thanh địa chỉ và LibreOffice

Ở thanh địa chỉ, lỗi lặp chữ đến từ phần gợi ý tự điền. Edge báo đúng phần tự điền, nên ở đó đã hết lỗi. Firefox không báo đúng, nên Ngó Sen xử lý riêng thanh địa chỉ của Firefox.

Ở LibreOffice, gõ `chao` rồi bấm `f` ra `chaà`. LibreOffice xếp Backspace vào hàng để xử lý sau, còn chữ mới thì chèn ngay, nên chờ lâu hơn cũng không cứu được. Ngó Sen bảo thẳng LibreOffice xoá chữ qua surrounding text, không gửi Backspace nữa.
