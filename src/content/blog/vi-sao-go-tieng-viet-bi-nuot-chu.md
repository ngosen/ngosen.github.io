---
title: "Vì sao gõ tiếng Việt trên Linux hay bị nuốt chữ, lặp chữ"
description: "Bộ gõ phải xoá chữ cũ rồi gõ chữ có dấu, và hai bước đó dễ lệch nhịp với ứng dụng. Chuyện ở Messenger cho thấy Ngó Sen xử lý thế nào."
pubDate: 2026-10-04
---

Gõ `tieengs vieetj` vào ô chat Messenger, đáng ra phải thấy `tiếng việt`. Trên Linux, có lúc màn hình lại hiện `iếngiệt`: chữ có dấu vẫn đúng, còn chữ `t`, dấu cách và chữ `v` phía trước thì biến mất. Ở thanh địa chỉ trình duyệt thì gặp lỗi ngược lại: gõ `tôi` ra `toôi`.

Bài này giải thích vì sao, và bộ gõ [Ngó Sen](https://github.com/ngosen/ngosen) cho fcitx5 đã xử lý tới đâu.

## Bộ gõ phải sửa chữ đã hiện trên màn hình

Với kiểu gõ Telex, chữ hiện ra trước, dấu tới sau. Lúc người gõ bấm phím bỏ dấu, chữ chưa dấu đã nằm sẵn trong ô. Bộ gõ phải bỏ chữ cũ đi và đưa chữ có dấu vào thay.

Ở chế độ Ngó Sen khuyên dùng, tên là Uinput, việc thay chữ gồm hai bước. Trước hết, một chương trình nhỏ chạy nền, đóng vai bàn phím ảo, bấm phím xoá (Backspace) thay người gõ. Sau đó bộ gõ đưa chữ có dấu vào.

Có thể hình dung hai người cùng sửa một tấm bảng: một người lau chữ cũ, người kia viết chữ mới. Viết sớm quá thì chữ mới bị lau theo. Đợi lâu quá thì người gõ thấy chậm.

Mỗi ứng dụng xử lý phím xoá nhanh chậm khác nhau, còn bộ gõ chỉ biết những gì ứng dụng báo lại. Hai bước lệch nhịp nhau là ra lỗi: mất chữ, lặp chữ, hoặc ra chữ sai.

## Chuyện ở ô chat Messenger

Lỗi `iếngiệt` được báo ở dự án gốc từ tháng 5/2026, tại [issue #267](https://github.com/LotusInputMethod/fcitx5-lotus/issues/267), và nhiều người xác nhận gặp.

Người giữ dự án đo trên trình duyệt Edge và tìm ra bốn nguyên nhân. Hai nguyên nhân là lỗi của chính bộ gõ, đã vá xong: nó tưởng đã xoá xong trong khi ô chat chưa xoá hết chữ cũ.

Hai nguyên nhân còn lại nhiều khả năng nằm ở phía Facebook. Sau khi chữ cũ bị xoá, ô soạn tin tự vẽ lại. Chữ nào tới đúng lúc đó thì bị nuốt, và ô không phát ra tín hiệu nào để bộ gõ biết mà tránh.

Cách chữa đầu tiên là chờ: xoá xong, đợi vài chục mili giây (phần nghìn giây) rồi mới gõ. Mức được chọn là 40 mili giây giữa câu và 60 mili giây cho từ đầu tiên của tin nhắn.

Chờ thì đỡ, nhưng không dứt. Lúc máy bận, mức này vẫn sai 1 trên 50 câu thử. Máy càng bận càng dễ lọt, nên không có mức chờ nào đủ cho mọi lúc.

## Bôi đen rồi gõ đè

Ngày 20/09/2026, bản này đổi cách làm: bỏ hẳn bước xoá.

Chương trình nền bấm Shift cùng mũi tên trái để bôi đen (chọn) đúng số chữ cần bỏ. Sau đó bộ gõ gõ chữ mới đè lên vùng bôi đen. Ô chat không lúc nào trống, và giữa hai bước không còn khe hở cho Facebook chen vào.

Thay đổi thứ hai nằm ở cách chờ. Edge báo lại cho bộ gõ là đang có bao nhiêu chữ được bôi đen. Bộ gõ đợi đúng tin báo đó rồi mới gõ, thay vì chờ theo đồng hồ. Giống như đợi người lau bảng nói "xong rồi", khỏi phải đoán họ cần bao lâu.

Đo ngày 20/09 bằng máy gõ tự động, lúc máy bận: 100 từ đầu tin nhắn và 50 câu đầy đủ, không sai lần nào. Qua 861 lần thay chữ, tin báo về sau 3 đến 20 mili giây, thường là 6. Cách mới bật sẵn từ ngày 26/09.

Nếu sau 150 mili giây ô chat vẫn không báo lại, bộ gõ không gõ đè. Nó trả con trỏ về chỗ cũ và bỏ lần bỏ dấu đó. Mất dấu một chữ thì thấy ngay, còn chữ chèn sai chỗ thì khó phát hiện hơn.

Cách này chỉ dùng cho ô soạn tin của Facebook và Messenger. Phép đo cho thấy các ô khác không báo lại khi chữ bị bôi đen, nên bật ở mọi nơi thì chữ nào cũng mất dấu.

## Thanh địa chỉ và LibreOffice

Ở thanh địa chỉ trình duyệt, lỗi là lặp chữ đầu, như `toôi` ở trên. Thanh địa chỉ có phần gợi ý tự điền, và bộ gõ phải nhận ra phần đó thì mới thay chữ đúng. Edge báo đúng phần tự điền, nên ở đó lỗi đã sửa dứt. Firefox không báo đúng, nên bản này nhận ra thanh địa chỉ qua hình dạng của ô nhập. Đo được 7 trên 7 lần có gợi ý ra đúng, nhưng mẫu còn nhỏ.

Ở LibreOffice, gõ `chao` rồi bấm `f` ra `chaà`. LibreOffice xếp phím xoá vào hàng để xử lý sau, còn chữ mới thì chèn ngay. Chữ mới vượt lên trước phím xoá, và chờ lâu hơn cũng không cứu được.

Bản này chữa riêng cho LibreOffice: bảo thẳng ứng dụng xoá chữ ngay tại con trỏ, không đi qua phím xoá. Đo trên Writer, 60 từ mỗi lượt: trước khi vá sai 30 đến 36 từ, sau khi vá không sai từ nào.

## Những gì chưa xong

Mọi lượt đo ở trên đều gõ Telex. Kiểu gõ VNI chưa được kiểm.

Cách bôi đen rồi gõ đè mới đo trên Edge, chưa đo trên Firefox và Chrome.

Các bản Firefox mang tên khác, như LibreWolf, chưa được nhận ra ở thanh địa chỉ.

Chế độ gõ Surrounding Text, tức chế độ dựa vào văn bản quanh con trỏ do ứng dụng báo về, không được sửa và vẫn lỗi, nhất là trên Firefox và LibreOffice Writer. Ở Writer, chế độ này sai 60 trên 60 từ thử.

Còn một lỗi đã tái hiện được mà chưa vá: chương trình nền chết đúng lúc đang thay chữ thì bàn phím chết theo.

Người giữ dự án chỉ vibecode Ngó Sen: nêu việc cho trợ lý AI viết mã, rồi đo và dùng thử hằng ngày.
