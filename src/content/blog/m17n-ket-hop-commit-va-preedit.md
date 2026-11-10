---
title: "Phát hiện cơ chế gõ tiếng Việt cực tốt đã có 16 năm trên bộ gõ m17n"
description: "vi-telex commit phụ âm đầu, giữ phần còn lại trong preedit và không xoá chữ đã commit. Cơ chế này đã có khoảng 16 năm, nhưng quy tắc gõ còn hạn chế."
pubDate: 2026-11-10
---

Trong lúc đóng góp quy tắc Telex và VNI cho m17n, người viết thấy vi-telex đã có cách kết hợp commit với preedit từ năm 2010. Phụ âm đầu được đưa ngay cho app; phần còn lại của âm tiết nằm trong preedit. Bộ gõ không cần xoá chữ đã commit để thêm dấu.

Đây là một thiết kế tốt, đã tồn tại khoảng 16 năm nhưng ít người dùng tiếng Việt biết đến. Phần quy tắc gõ quanh cơ chế này vẫn còn nhiều hạn chế.

## Lịch sử trong file vi-telex

m17n là thư viện nhập liệu đa ngôn ngữ. Các bộ gõ nằm trong m17n-db dưới dạng file `.mim`. Tiếng Việt có vi-telex, vi-vni, vi-tcvn và vi-viqr, dùng chung một phần trong vi-base. Trên GNOME, m17n chạy qua ibus-m17n.

Log của `MIM/vi-telex.mim` bắt đầu từ năm 2007, và các lần sửa từ đó tới 2010 phần lớn do Kenichi Handa làm. Ngày 18/02/2010, ông thêm nhánh surrounding text. Sau đó chỉ còn lần cập nhật năm bản quyền vào tháng 12/2010, rồi đến các đóng góp tháng 11/2026.

## Phụ âm đầu được commit ngay

Bài [Vì sao gõ tiếng Việt trên Linux hay bị nuốt chữ, lặp chữ](/blog/vi-sao-go-tieng-viet-bi-nuot-chu/) nói về hai cách thường dùng. Preedit giữ chữ tạm, khiến app có gợi ý theo từng phím phải chờ commit. Gõ thẳng cho app nhận chữ ngay, nhưng bước xoá rồi gõ lại chữ có dấu có thể làm mất hoặc lặp chữ.

m17n kết hợp hai cách đó. Khi app báo surrounding text, tức phần chữ quanh con trỏ, vi-telex commit ngay phụ âm đầu. Nguyên âm, phụ âm cuối và dấu vẫn nằm trong preedit. Dấu luôn rơi vào chữ còn trong preedit, nên bộ gõ không phải xoá phần đã commit. Nếu app không báo surrounding text, cả âm tiết nằm trong preedit như thường.

Cơ chế này được xác nhận bằng cách đọc file, theo dõi từng phím trong chương trình test và dùng thực tế trên Fedora 45 GNOME. Về nguyên tắc, app đã nhận được những chữ đầu mà bộ gõ vẫn không cần xoá chữ đã commit. Tuy nhiên, chưa đo xem gợi ý trong ô tìm kiếm hay các app khác có hưởng lợi hay không.

## Quy tắc cũ hạn chế thứ tự phím

Người duy trì Ngó Sen đo m17n-db version 1.8.16 trên khoảng 8.000 âm tiết từ dữ liệu diễn đàn tiếng Việt, dùng engine của dự án làm tham chiếu. Mỗi âm tiết được gõ theo các thứ tự phím người dùng thường dùng, rồi so với chữ mong đợi theo cách đặt dấu thanh mới.

| Cách gõ | Ví dụ | Tỷ lệ đúng của Telex |
| --- | --- | --- |
| Dấu đi cùng chữ | `vieetj` → việt | 98,9% |
| Dấu thanh trước phụ âm cuối | `toasn` → toán | 96,4% |
| Dấu mũ, râu, trăng ở cuối từ | `vietej` → việt, `nguoiwf` → người | 14,6% |
| Một `w` cho ươ | `nguwoif` → người | 0% |

VNI cũng có hạn chế tương tự. Mặc định vẫn đặt dấu kiểu cũ: hòa, thúy thay vì hoà, thuý.

Theo người viết, có lẽ quy tắc Telex đòi hỏi thứ tự phím cố định, không được cập nhật suốt thời gian đó, đã khiến người dùng chuyển sang bộ gõ khác và ít biết đến cơ chế kết hợp. Đây là nhận định từ quy tắc và lịch sử file, chưa có số liệu về lý do người dùng chọn bộ gõ.

## Các thay đổi đang chờ review

[Issue #15](https://github.com/mike-fabian/m17n-db/issues/15) mở ngày 08/11/2026. Ngày 09/11, Mike Fabian, người giữ repo m17n-db trên GitHub, phản hồi tích cực và đề nghị gửi PR kèm test trong `tests/test_m17n_translit.py` của ibus-typing-booster.

[PR #16](https://github.com/mike-fabian/m17n-db/pull/16) chuyển mặc định sang hoà, thuý, khoẻ; đặt `tone-mark-on-last` thành `0` để về kiểu cũ. [PR #17](https://github.com/mike-fabian/m17n-db/pull/17) thêm cách gõ dấu cuối từ và một `w` cho ươ, cho Telex và VNI. Test nằm ở [PR #933](https://github.com/mike-fabian/ibus-typing-booster/pull/933) và [PR #934](https://github.com/mike-fabian/ibus-typing-booster/pull/934).

Sau hai PR, cùng phép đo cho kết quả giống nhau khi có và không có surrounding text:

| Cách gõ | Telex | VNI |
| --- | --- | --- |
| Dấu cuối từ | 99,8% | 99,9% |
| Dấu thanh trước phụ âm cuối | 100% | 100% |
| Dấu đi cùng chữ | 99,9% | 100% |

Cách gõ một `w` cho ươ tăng từ 0% lên 98,9–100%.

Đổi lại, 26 từ tiếng Anh trước đây được Telex giữ nguyên nay đổi thành chữ Việt, như `damage` → `dâmge`, `drama` → `drâm`. Tỷ lệ từ tiếng Anh giữ nguyên giảm từ 75,2% xuống 73,8%.
