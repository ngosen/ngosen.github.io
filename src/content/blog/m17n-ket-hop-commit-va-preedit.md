---
title: "Phát hiện cơ chế gõ tiếng Việt cực tốt đã có 16 năm trên bộ gõ m17n"
description: "Từ năm 2010, bộ gõ m17n (ibus-m17n) trên Linux gõ tiếng Việt kiểu commit phụ âm đầu, giữ phần còn lại trong preedit. Cách nó chạy và các PR sửa luật Telex."
pubDate: 2026-11-10
updatedDate: 2026-11-22
---

Trong lúc đóng góp quy tắc Telex và VNI cho m17n, người viết thấy vi-telex đã có cách kết hợp commit với preedit từ năm 2010. Phụ âm đầu được đưa ngay cho app; phần còn lại của âm tiết nằm trong preedit. Bộ gõ không cần xoá chữ đã commit để thêm dấu.

Đây là một thiết kế tốt, đã tồn tại khoảng 16 năm nhưng ít người dùng tiếng Việt biết đến. Phần quy tắc gõ quanh cơ chế này có nhiều hạn chế, và từ version 1.8.17 phát hành tháng 11/2026, m17n-db đã nhận các PR sửa quy tắc Telex và VNI.

## Lịch sử trong file vi-telex

m17n là thư viện nhập liệu đa ngôn ngữ. Các bộ gõ nằm trong m17n-db dưới dạng file `.mim`. Tiếng Việt có vi-telex, vi-vni, vi-tcvn và vi-viqr, dùng chung một phần trong vi-base. Trên GNOME, m17n chạy qua ibus-m17n.

Log của `MIM/vi-telex.mim` bắt đầu từ năm 2007, và các lần sửa từ đó tới 2010 phần lớn do Kenichi Handa làm. Ngày 18/02/2010, ông thêm nhánh surrounding text. Sau đó chỉ còn lần cập nhật năm bản quyền vào tháng 12/2010, rồi đến các đóng góp tháng 11/2026.

## Phụ âm đầu được commit ngay

Bài [Vì sao gõ tiếng Việt trên Linux hay bị nuốt chữ, lặp chữ](/blog/vi-sao-go-tieng-viet-bi-nuot-chu/) nói về hai cách thường dùng. Preedit giữ chữ tạm, khiến app có gợi ý theo từng phím phải chờ commit. Gõ thẳng cho app nhận chữ ngay, nhưng bước xoá rồi gõ lại chữ có dấu có thể làm mất hoặc lặp chữ.

m17n kết hợp hai cách đó. Khi app báo surrounding text, tức phần chữ quanh con trỏ, vi-telex commit ngay phụ âm đầu. Nguyên âm, phụ âm cuối và dấu vẫn nằm trong preedit. Dấu luôn rơi vào chữ còn trong preedit, nên bộ gõ không phải xoá phần đã commit. Nếu app không báo surrounding text, cả âm tiết nằm trong preedit như thường.

Cơ chế này được xác nhận bằng cách đọc file, theo dõi từng phím trong chương trình test và dùng thực tế trên Fedora 45 GNOME. Về nguyên tắc, app đã nhận được những chữ đầu mà bộ gõ vẫn không cần xoá chữ đã commit. Tuy nhiên, chưa đo xem gợi ý trong ô tìm kiếm hay các app khác có hưởng lợi hay không. Mục cuối bài nói về những app báo surrounding text không đúng.

## Quy tắc cũ hạn chế thứ tự phím

Người duy trì Ngó Sen đo m17n-db version 1.8.16 trên khoảng 8.000 âm tiết từ dữ liệu diễn đàn tiếng Việt, dùng engine của dự án làm tham chiếu. Mỗi âm tiết được gõ theo các thứ tự phím người dùng thường dùng, rồi so với chữ mong đợi theo cách đặt dấu thanh mới.

| Cách gõ | Ví dụ | Tỷ lệ đúng của Telex |
| --- | --- | --- |
| Dấu đi cùng chữ | `vieetj` → việt | 98,9% |
| Dấu thanh trước phụ âm cuối | `toasn` → toán | 96,4% |
| Dấu mũ, râu, trăng ở cuối từ | `vietej` → việt, `nguoiwf` → người | 14,6% |
| Một `w` cho ươ | `nguwoif` → người | 0% |

VNI cũng có hạn chế tương tự. Mặc định khi đó đặt dấu kiểu cũ: hòa, thúy thay vì hoà, thuý.

Theo người viết, có lẽ quy tắc Telex đòi hỏi thứ tự phím cố định, không được cập nhật suốt thời gian đó, đã khiến người dùng chuyển sang bộ gõ khác và ít biết đến cơ chế kết hợp. Đây là nhận định từ quy tắc và lịch sử file, chưa có số liệu về lý do người dùng chọn bộ gõ.

## Version 1.8.17

[Issue #15](https://github.com/mike-fabian/m17n-db/issues/15) mở ngày 08/11/2026. Ngày 09/11, Mike Fabian, người giữ repo m17n-db trên GitHub, phản hồi tích cực và đề nghị gửi PR kèm test trong `tests/test_m17n_translit.py` của ibus-typing-booster.

[PR #16](https://github.com/mike-fabian/m17n-db/pull/16) chuyển mặc định sang hoà, thuý, khoẻ; đặt `tone-mark-on-last` thành `0` để về kiểu cũ. [PR #17](https://github.com/mike-fabian/m17n-db/pull/17) thêm cách gõ dấu cuối từ và một `w` cho ươ, cho Telex và VNI. Test nằm ở [PR #933](https://github.com/mike-fabian/ibus-typing-booster/pull/933) và [PR #934](https://github.com/mike-fabian/ibus-typing-booster/pull/934) của ibus-typing-booster. Cả bốn PR đã được merge; m17n-db version 1.8.17 có hai PR đầu, phát hành ngày 11/11/2026, cùng ngày issue được đóng.

Sau hai PR, cùng phép đo cho kết quả giống nhau khi có và không có surrounding text:

| Cách gõ | Telex | VNI |
| --- | --- | --- |
| Dấu cuối từ | 99,8% | 99,9% |
| Dấu thanh trước phụ âm cuối | 100% | 100% |
| Dấu đi cùng chữ | 99,9% | 100% |

Cách gõ một `w` cho ươ tăng từ 0% lên 98,9–100%.

Đổi lại, 26 từ tiếng Anh trước đây được Telex giữ nguyên nay đổi thành chữ Việt, như `damage` → `dâmge`, `drama` → `drâm`. Tỷ lệ từ tiếng Anh giữ nguyên giảm từ 75,2% xuống 73,8%.

## Version 1.8.18

Version 1.8.18 phát hành ngày 17/11/2026, có thêm sáu PR của người viết, từ #19 đến #24 ([PR #18](https://github.com/mike-fabian/m17n-db/pull/18) bị đóng, không merge). Ví dụ dưới đây lấy từ mô tả từng PR.

- [PR #19](https://github.com/mike-fabian/m17n-db/pull/19): phím mũ, trăng, râu gõ sau nguyên âm thay được dấu đang có trên nguyên âm đó. Telex `caamw` ra căm (trước để nguyên caamw), `cawam` ra câm, `coomw` ra cơm, `cowo` ra cô; VNI `ca6m8` ra căm.
- [PR #20](https://github.com/mike-fabian/m17n-db/pull/20): âm tiết tận cùng bằng c, ch, p, t chỉ nhận dấu sắc và dấu nặng, nên từ có dấu huyền, hỏi hay ngã ở vị trí đó được để nguyên như đã gõ. Trước đây `text` ra tẽt, `part` ra pảt, `next` ra nẽt.
- [PR #21](https://github.com/mike-fabian/m17n-db/pull/21): thêm hai luật nhận ra từ không thể là tiếng Việt. Luật đầu bắt các cụm nguyên âm không âm tiết nào có: `euro` trước ra eủo, `layer` ra laỷe, `choose` ra chốe. Luật sau bắt "ng" sau một chữ i và chữ w không đánh dấu gì: `things` trước ra thíng, `news` ra néw.
- [PR #22](https://github.com/mike-fabian/m17n-db/pull/22): VNI để nguyên từ có chữ số hay có phần cuối không phải tiếng Việt. Trước đây `covid19` ra covíd9, `web2` ra wèb, `iphone15` ra iphonẹ.
- [PR #23](https://github.com/mike-fabian/m17n-db/pull/23): một từ có Backspace ở giữa rồi hoá ra không phải tiếng Việt thì không còn mất phím. `tang` Backspace `k` trước ra tang, nay ra tank; `thin` Backspace `ng` trước ra thi, nay ra thing.
- [PR #24](https://github.com/mike-fabian/m17n-db/pull/24): Telex nhận chữ d thứ hai gõ ở cuối từ, như Unikey và ibus-bamboo: `did` ra đi, `dangd` ra đang, `dangfd` ra đàng. Gõ thêm một d nữa thì về lại d: `didd` ra did.

Mô tả PR #21 có số đo trên 1.821 từ nước ngoài, một bộ từ khác với bộ từ tiếng Anh ở phần trên. Gộp #19, #20 và #21, 98,2% số từ được để nguyên, so với 96,0% ở version 1.8.17. Kết quả trên 7.900 âm tiết tiếng Việt không đổi.

## Khi app báo surrounding text không đúng

Cách commit phụ âm đầu cần app báo đúng surrounding text và làm theo yêu cầu xoá chữ của bộ gõ. Hai PR gửi sau version 1.8.18 cho thấy không phải app nào cũng làm vậy.

[PR #26](https://github.com/mike-fabian/m17n-db/pull/26) đã được merge nhưng chưa có trong version phát hành nào. Trong trang web trên Firefox, như ô textarea hay ô nhập của Gemini, version 1.8.18 để nguyên một số từ khi từ đứng trước bắt đầu bằng s, c hay g: `sex cos` ra "sẽ cos" thay vì "sẽ có", `soos nhieeuf` ra "số nhieeuf". Lỗi đến từ một luật người viết thêm vào version 1.8.18. Luật này đọc chữ đứng trước phụ âm từ app, trong khi trang web trên Firefox vẫn báo phần chữ của lần commit trước. Thanh địa chỉ của Firefox và GNOME Text Editor không bị, và version 1.8.17 gõ đúng các từ này. PR #26 cho luật đó đọc phụ âm vừa gõ trong cùng từ thay vì đọc từ app. Thử trên Fedora 45, GNOME 51, Firefox 158 với 14 cặp từ trong ô nhập của Gemini: version 1.8.18 để nguyên 7 cặp, bản có PR #26 không để nguyên cặp nào.

[PR #27](https://github.com/mike-fabian/m17n-db/pull/27) đang chờ review. Khi app báo surrounding text, chữ d đầu từ được commit ngay, nên gõ d thứ hai ở cuối từ thì bộ gõ phải xoá chữ d đã commit để thay bằng đ. Chromium và LibreOffice có vẻ bỏ qua yêu cầu xoá này: `did` ra "dđi" trong Chromium và "did" trong LibreOffice Writer. PR #27 giữ chữ d hay đ đầu từ trong preedit; các phụ âm đầu khác vẫn được commit ngay. Trên Ubuntu 26.04 với ibus-m17n, Chromium, LibreOffice Writer, Firefox và GNOME Text Editor cho cùng kết quả đúng, mỗi app hai lượt.

Commit phụ âm đầu giúp bộ gõ không phải xoá chữ đã commit khi thêm dấu. Luật nào cần đọc lại hay sửa chữ đã commit thì vẫn phụ thuộc vào app.
