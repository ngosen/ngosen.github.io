---
title: "Lỗi chuyển bảng mã cũ về Unicode trong bộ chuyển mã UniKey"
description: "Bộ chuyển mã của UniKey đọc sai 8 chữ Việt khi chuyển từ VISCII, VPS và BKHCM 1 về Unicode: cách test, nguyên nhân và những gì chưa kiểm tra."
pubDate: 2026-10-21
draft: true
---

Đưa “VIỆT NAM” từ UTF-8 sang VISCII rồi chuyển về UTF-8 bằng bộ chuyển mã của UniKey, kết quả là
“VIŽT NAM”. “TRỤ SỞ” thành “TRž SỞ”. Chiều ghi sang VISCII cho đúng byte; lúc đọc lại, chữ Việt bị đổi
thành ký hiệu phương Tây.

UniKey của Phạm Kim Long là bộ gõ cả một thế hệ người Việt đã dùng. Lỗi nằm ở VnConv, phần chuyển mã
trong source UniKey mà fcitx5-unikey và ibus-unikey vẫn dùng trên Linux.

## Cách test và kết quả

Ngày 21/10/2026, VnConv trong [thư mục `unikey/` của fcitx5-unikey](https://github.com/fcitx/fcitx5-unikey/tree/ed9170c35c1a6275d105e03d7f9bc4f674c1469c/unikey)
(commit `ed9170c`) được build rồi cho chạy với 134 chữ Việt và 94 ký tự ASCII in được. Mỗi ký tự đi
một vòng UTF-8 → bảng mã cũ → UTF-8, qua 16 bảng mã.

Có 8 chữ được ghi sang bảng mã cũ đúng byte nhưng khi chuyển về lại thành ký hiệu. Chúng nằm trên 7 byte
của ba bảng:

| Bảng mã | Chữ ban đầu | Byte | Chuyển về thành |
| --- | --- | --- | --- |
| VISCII | Ạ | `0x80` | € |
| VISCII | Ệ | `0x8E` | Ž |
| VISCII | Ụ | `0x9E` | ž |
| VPS | Ằ | `0x8E` | Ž |
| VPS | Ờ | `0x9E` | ž |
| BKHCM 1 | Á | `0x80` | € |
| BKHCM 1 | Ị, Ỵ | `0x8E` | Ž |

Với BKHCM 1, “THÁNG” đi một vòng thành “TH€NG”.

## Bảy số chưa đặt về 0

Trong `data.cpp`, cuối mỗi bảng mã một byte có một danh sách byte dành cho ký hiệu của Windows cp1252,
như €, Ž và ž. Ghi chú ngay trong file dặn:

> If a single byte charset occupies a certain symbol, its code point in the charset must be set to zero. See TCVN3 & VPS below for examples

Tức là bảng mã nào đã dùng một byte trong danh sách đó cho chữ thì mục ký hiệu ứng với byte ấy phải
đặt về `0`. VISCII, VPS và BKHCM 1 dùng các byte trong bảng trên cho chữ Việt, nhưng mục ký hiệu vẫn
giữ giá trị. Lúc đọc lại, bộ chuyển mã chọn ký hiệu thay vì chữ.

Ví dụ, VISCII ghi Ệ thành `0x8E`, đúng. Khi đọc `0x8E`, mục của Ž trong cùng bảng vẫn là `0x8E`, nên
ra Ž. Sửa lỗi này chỉ cần đặt 7 số trong các mục ký hiệu về `0`. VPS là một trong hai bảng mà ghi chú
trên lấy làm ví dụ.

## Giới hạn riêng của BKHCM 1 và ISC

Hai chỗ khác đến từ chính bảng ánh xạ, nên sửa 7 số trên vẫn không đưa được mọi chữ về đúng.

Bảng BKHCM 1 của UniKey gán cả Ặ và Ụ vào `0x98`, nên Ặ chuyển về thành Ụ: “ĐẶC BIỆT” thành
“ĐỤC BIỆT”. Ị và Ỵ cũng dùng chung `0x8E`; đặt mục ký hiệu về `0` thì hết ra Ž, nhưng từ byte đó vẫn
không phân biệt được hai chữ.

Bảng ISC dùng `#` cho chữ Ự, còn UniKey ghi `#` cho ký tự mà bảng mã không biểu diễn được. Vì vậy các
ký tự <code># @ \ ^ &#96; | ~</code> đều chuyển về thành Ự.

## Có từ năm 2004

Các byte này đã có trong [lần nhập source UniKey đầu tiên ở bản sao xmirror/unikey](https://github.com/xmirror/unikey/tree/b5c58fb87)
(commit `b5c58fb`, ngày 04/02/2004). Đầu file ghi “Copyleft (C) 1998-2002 Pham Kim Long”. Như vậy lỗi
đã có ít nhất 22 năm.

Các giá trị đó vẫn còn trong commit `ed9170c`, commit mới nhất trên nhánh `master` của fcitx5-unikey
lúc kiểm tra, và trong [ibus-unikey](https://github.com/vn-input/ibus-unikey). Tìm trong issue của hai
repo với các từ VISCII, VPS, convert, và tìm trên web, đều chưa thấy ai báo lỗi này. Tìm như vậy chưa
đủ để nói chưa ai từng gặp.

Người viết đoán là người ta chủ yếu chuyển từ Unicode sang bảng mã cũ, chiều này đúng; lỗi chỉ lộ ra
khi đọc file cũ về Unicode. Trên Linux, fcitx5-unikey và ibus-unikey chỉ dùng bộ chuyển mã cho gõ tắt
và đầu ra UTF-8, không có chỗ để người dùng chuyển file bảng mã cũ. Phỏng đoán dựa trên hai điều đó,
không có số liệu về cách mọi người dùng UniKey.

## Bộ chuyển mã mới cho bamboo-core

Người giữ dự án Ngó Sen gặp lỗi này khi viết bộ chuyển mã đọc bảng mã cũ về Unicode cho
[bamboo-core bản Rust](https://github.com/bamboo-vi/bamboo-core). Code nằm ở
[PR #23](https://github.com/bamboo-vi/bamboo-core/pull/23);
[một bình luận trong PR](https://github.com/bamboo-vi/bamboo-core/pull/23#issuecomment-6310888512) mô tả lỗi.

Bộ chuyển mã đó không sai 8 chữ nói trên, vì bảng của bamboo-core không có danh sách ký hiệu cp1252 ở
cuối. Còn chỗ chung byte thì bamboo-core cũng có: bảng BKHCM 1 của nó gán Ặ và Ụ cùng `0x98`, Ị và Ỵ
cùng `0x8E`, nên chữ ghi ra bằng bảng mã này cũng không tách lại được. Gặp `0x98`, bộ chuyển mã mới giữ
nguyên byte thay vì đoán là Ặ hay Ụ.
UniKey làm tốt hơn ở một chỗ: khi ghi VIQR, UniKey escape dấu chấm, còn bộ chuyển mã của bamboo-core
chưa làm.

## Những gì chưa kiểm tra

UniKey cho Windows hiện tại (version 4.x, không công khai source) chưa được chạy để kiểm tra, nên chưa
biết version đó còn lỗi này hay không.

Tới ngày 21/10/2026, lỗi chưa được báo cho fcitx5-unikey hay ibus-unikey, và PR #23 chưa được merge.
