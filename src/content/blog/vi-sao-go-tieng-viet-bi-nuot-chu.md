---
title: "Vì sao gõ tiếng Việt trên Linux hay bị nuốt chữ, lặp chữ"
description: "Bộ gõ phải xoá chữ cũ rồi gõ chữ có dấu, và hai bước đó dễ lệch nhịp với app. Ngó Sen đã chọn cách nào để chữa ở Messenger và LibreOffice."
pubDate: 2026-10-04
outdated: "Từ bản 0.5.0, chế độ Uinput đổi tên thành Gõ Sen, Surrounding Text gộp vào Gõ Sen, và máy chủ nền đã bỏ: bộ gõ xoá chữ bằng phím gửi hộ qua fcitx5. Trên KDE, ô soạn tin Facebook nay xoá rồi gõ lại như ô thường."
---

Gõ `tieengs vieetj` vào ô chat Messenger, đáng ra phải thấy `tiếng việt`. Trên Linux, có lúc màn hình lại hiện `iếngiệt`: chữ có dấu vẫn đúng, còn chữ `t`, dấu cách và chữ `v` phía trước thì biến mất. Ở thanh địa chỉ trình duyệt thì gặp lỗi ngược lại: gõ `tôi` ra `toôi`.

## Bộ gõ phải sửa chữ đã hiện trên màn hình

Với Telex, chữ hiện ra trước, dấu tới sau. Lúc bấm phím bỏ dấu, chữ chưa dấu đã nằm sẵn trong ô. Bộ gõ phải xoá chữ cũ rồi đưa chữ có dấu vào.

Ở chế độ Uinput, việc đó gồm hai bước. Một chương trình chạy nền bấm phím Backspace thay người gõ, rồi bộ gõ đưa chữ có dấu vào. Giống hai người cùng sửa một tấm bảng: một người lau, một người viết. Viết sớm quá thì chữ mới bị lau theo. Đợi lâu quá thì người gõ thấy chậm.

Mỗi app xử lý Backspace nhanh chậm khác nhau, còn bộ gõ chỉ biết những gì app báo lại. Hai bước lệch nhịp là ra lỗi: mất chữ, lặp chữ, hoặc chữ sai.

## Messenger: bỏ bước xoá, chờ app xác nhận

Lỗi `iếngiệt` được báo ở dự án gốc từ tháng 5/2026 ([issue #267](https://github.com/LotusInputMethod/fcitx5-lotus/issues/267)). Hai nguyên nhân nằm ở bộ gõ và đã vá. Phần còn lại nhiều khả năng nằm ở Facebook: xoá xong, ô soạn tin tự vẽ lại, và chữ nào tới đúng lúc đó thì bị nuốt.

Cách chữa đầu tiên là đợi một chút sau khi xoá. Cách đó đỡ lỗi nhưng không dứt, vì máy càng bận càng dễ lọt. Không có mức chờ nào đủ cho mọi lúc.

Vì vậy Ngó Sen đổi cách làm ở ô soạn tin Facebook và Messenger:

- **Bôi đen rồi gõ đè, không xoá.** Bộ gõ bấm Shift cùng mũi tên trái để chọn đúng số chữ cần thay, rồi gõ chữ mới đè lên. Ô chat không lúc nào trống, nên không còn khe hở cho Facebook chen vào.
- **Chờ tin báo, không chờ đồng hồ.** Edge báo lại đang có bao nhiêu chữ được bôi đen. Bộ gõ đợi đúng tin đó rồi mới gõ, như đợi người lau bảng nói "xong rồi".
- **Không chắc thì bỏ dấu, không chèn bừa.** Nếu ô chat không báo lại, bộ gõ trả con trỏ về chỗ cũ và bỏ lần thêm dấu đó. Mất dấu một chữ thì thấy ngay, còn chữ chèn sai chỗ thì khó phát hiện.

Cách này chỉ dùng cho Facebook và Messenger. Các ô khác không báo lại khi chữ bị bôi đen, nên bật ở mọi nơi thì chữ nào cũng mất dấu.

## Thanh địa chỉ và LibreOffice

Ở thanh địa chỉ, lỗi lặp chữ đến từ phần gợi ý tự điền. Edge báo đúng phần tự điền, nên ở đó đã hết lỗi. Firefox không báo đúng, nên bộ gõ nhận ra thanh địa chỉ của Firefox qua hình dạng của ô nhập.

Ở LibreOffice, gõ `chao` rồi bấm `f` ra `chaà`. LibreOffice xếp phím Backspace vào hàng để xử lý sau, còn chữ mới thì chèn ngay, nên chờ lâu hơn cũng không cứu được. Ngó Sen chữa bằng cách bảo thẳng LibreOffice xoá chữ tại con trỏ, không gửi Backspace nữa.

Lúc viết bài, cách bôi đen rồi gõ đè mới được kiểm trên Edge, và mọi lượt thử đều gõ Telex.
