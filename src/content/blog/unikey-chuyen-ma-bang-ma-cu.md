---
title: "Phát hiện lỗi charset trong UniKey có từ năm 2004"
description: "Bộ chuyển mã của UniKey đọc sai 8 chữ Việt khi chuyển từ VISCII, VPS và BKHCM 1 về Unicode: cách test, nguyên nhân và những gì chưa kiểm tra."
pubDate: 2026-10-21
---

Chuyển “VIỆT NAM” từ UTF-8 sang VISCII rồi về UTF-8 bằng bộ chuyển mã của UniKey thì được “VIŽT NAM”.
“TRỤ SỞ” thành “TRž SỞ”. Bộ chuyển mã ghi Ệ và Ụ sang VISCII đúng byte, nhưng khi đọc lại thì đổi
chúng thành ký hiệu phương Tây.

UniKey của Phạm Kim Long là bộ gõ cả một thế hệ người Việt đã dùng. Lỗi nằm ở VnConv, bộ chuyển mã
trong source UniKey mà fcitx5-unikey và ibus-unikey vẫn dùng trên Linux.

## Cách test và kết quả

Ngày 21/10/2026, VnConv trong [thư mục `unikey/` của fcitx5-unikey](https://github.com/fcitx/fcitx5-unikey/tree/ed9170c35c1a6275d105e03d7f9bc4f674c1469c/unikey)
(commit `ed9170c`) được build để test với 134 chữ Việt và 94 ký tự ASCII in được. Với mỗi bảng trong
16 bảng mã, từng ký tự được chuyển một vòng UTF-8 → bảng mã cũ → UTF-8.

Có 8 chữ được ghi sang bảng mã cũ đúng byte, nhưng khi chuyển về Unicode lại thành ký hiệu. Các chữ
này dùng 7 byte trong ba bảng mã:

<div class="table-scroll">

| Bảng mã | Chữ ban đầu | Byte | Chuyển về thành |
| --- | --- | --- | --- |
| VISCII | Ạ | `0x80` | € |
| VISCII | Ệ | `0x8E` | Ž |
| VISCII | Ụ | `0x9E` | ž |
| VPS | Ằ | `0x8E` | Ž |
| VPS | Ờ | `0x9E` | ž |
| BKHCM&nbsp;1 | Á | `0x80` | € |
| BKHCM&nbsp;1 | Ị, Ỵ | `0x8E` | Ž |

</div>

Với BKHCM 1, “THÁNG” đi một vòng thành “TH€NG”.

## Bảy số chưa đặt về 0

Trong `data.cpp`, cuối mỗi bảng mã một byte có danh sách byte dành cho các ký hiệu của Windows cp1252,
như €, Ž và ž. Ghi chú trong file dặn:

> If a single byte charset occupies a certain symbol, its code point in the charset must be set to zero. See TCVN3 & VPS below for examples

Nếu bảng mã đã dùng một byte trong danh sách đó cho chữ thì mục ký hiệu tương ứng phải đặt về `0`.
VISCII, VPS và BKHCM 1 dùng các byte ở bảng trên cho chữ Việt, nhưng các mục ký hiệu tương ứng vẫn
giữ giá trị. Khi đọc những byte này, bộ chuyển mã chọn ký hiệu thay vì chữ.

Chẳng hạn, VISCII ghi đúng Ệ thành `0x8E`. Nhưng mục của Ž trong cùng bảng cũng còn giá trị `0x8E`,
nên đọc `0x8E` lại ra Ž. Để sửa lỗi này, chỉ cần đặt 7 số trong các mục ký hiệu về `0`. VPS cũng
là một trong hai bảng mà ghi chú lấy làm ví dụ.

## Giới hạn riêng của BKHCM 1 và ISC

Còn hai chỗ vướng ở chính bảng ánh xạ. Sửa 7 số trên vẫn không đưa được mọi chữ về đúng.

Bảng BKHCM 1 của UniKey gán Ặ và Ụ cùng byte `0x98`, nên Ặ chuyển về thành Ụ: “ĐẶC BIỆT” thành
“ĐỤC BIỆT”. Ị và Ỵ cũng dùng chung `0x8E`. Đặt mục ký hiệu về `0` thì hết ra Ž, nhưng vẫn không biết
byte đó vốn là chữ nào trong hai chữ.

Bảng ISC dùng `#` cho chữ Ự. UniKey cũng ghi `#` khi gặp ký tự mà bảng mã không biểu diễn được, nên các
ký tự <code># @ \ ^ &#96; | ~</code> đều chuyển về thành Ự.

## Có từ năm 2004

Các byte này đã có trong [lần nhập source UniKey đầu tiên ở bản sao xmirror/unikey](https://github.com/xmirror/unikey/tree/b5c58fb87)
(commit `b5c58fb`, ngày 04/02/2004). Đây là x-unikey 0.9.1, UniKey cho X Window trên Linux.
Đầu file ghi “Copyleft (C) 1998-2002 Pham Kim Long”. Lỗi đã có
ít nhất 22 năm.

Các giá trị đó vẫn còn trong commit `ed9170c`, commit mới nhất trên nhánh `master` của fcitx5-unikey
lúc kiểm tra, và trong [ibus-unikey](https://github.com/vn-input/ibus-unikey). Tìm issue của hai repo
bằng các từ VISCII, VPS, convert rồi tìm trên web vẫn chưa thấy ai báo lỗi này. Kết quả tìm kiếm đó
chưa đủ để nói chưa ai từng gặp.

Người viết đoán rằng ít ai để ý vì người dùng chủ yếu chuyển từ Unicode sang bảng mã cũ, còn lỗi này
lộ ra khi đọc file cũ về Unicode. Trên Linux, fcitx5-unikey và ibus-unikey chỉ dùng bộ chuyển mã cho
gõ tắt và đầu ra UTF-8, không có chỗ để người dùng chuyển file bảng mã cũ. Đây vẫn chỉ là phỏng đoán,
không có số liệu về cách mọi người dùng UniKey.

## Bộ chuyển mã mới cho bamboo-core

Người giữ dự án Ngó Sen gặp lỗi này khi viết bộ chuyển mã đọc bảng mã cũ về Unicode cho
[bamboo-core bản Rust](https://github.com/bamboo-vi/bamboo-core). Bộ chuyển mã nằm ở
[PR #23](https://github.com/bamboo-vi/bamboo-core/pull/23);
[một bình luận trong PR](https://github.com/bamboo-vi/bamboo-core/pull/23#issuecomment-6310888512) mô tả lỗi.

Bảng của bamboo-core không có danh sách ký hiệu cp1252 ở cuối, nên bộ chuyển mã mới không đọc sai
8 chữ nói trên. Tuy vậy, bảng BKHCM 1 cũng gán Ặ và Ụ cùng `0x98`, Ị và Ỵ cùng `0x8E`. Với chữ ghi
ra bằng bảng mã này, bộ chuyển mã cũng không phân biệt lại được các chữ dùng chung byte. Gặp `0x98`,
bộ chuyển mã mới giữ nguyên byte thay vì đoán là Ặ hay Ụ.

Khi ghi VIQR, UniKey escape dấu chấm, còn bộ chuyển mã của bamboo-core chưa làm được điều này.

## Những gì chưa kiểm tra

UniKey cho Windows hiện tại (version 4.x, không công khai source) chưa được chạy để test, nên chưa
biết version đó còn lỗi này hay không.
