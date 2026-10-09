---
title: "Tổng hợp các bộ gõ tiếng Việt trên Linux và cơ chế gõ"
description: "Đọc mã của 18 bộ gõ tiếng Việt khác cho Linux: năm cách đưa chữ vào app, mỗi bộ gõ làm gì, ý nào đáng học, và Ngó Sen chọn hướng nào."
pubDate: 2026-10-08
---

Khi gõ `as` ra `á`, mọi bộ gõ đều phải làm cùng một việc: xoá `a` rồi viết `á`. Cách làm việc đó quyết
định chuyện người dùng có bị mất chữ, lặp chữ hay không.

Ngày 24/09/2026, người giữ dự án đọc mã của 18 bộ gõ trong
[danh sách cộng đồng](https://docs.google.com/spreadsheets/d/1DhW_jVM3IPSR1fX2CJyZstNFqoHDL3u6aLOrj2tYDk4/edit?gid=1097134275)
để tìm câu trả lời. Chỉ đọc mã, không cài, không chạy. Bản đầy đủ, ghi rõ file và dòng đã đọc, nằm
trong [repo chính](https://github.com/ngosen/ngosen/blob/main/NGHIEN-CUU-BO-GO-KHAC.md). Mã của các bộ
gõ có thể đã đổi sau ngày đó; commit đã đọc ghi ở bảng cuối bài. Danh sách cộng đồng nay có thêm vài bộ
gõ ra đời sau, bài này chưa xét tới.

## Vì sao hỏi câu này

Lúc đó Ngó Sen xoá chữ bằng **hai đường**: một bàn phím ảo bấm Backspace, còn chữ mới đi đường riêng
của bộ gõ (commit). Lỗi mất chữ ở Messenger và ô đăng bài Facebook đều do hai đường này lệch nhịp. Bộ gõ
nào làm được việc đó **chỉ bằng một đường** là bộ gõ đáng học.

## 18 bộ gõ, năm cách

<div class="table-scroll">

| Cách đưa chữ vào app                                                             | Bộ gõ                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Một đường: nhờ app xoá chữ quanh con trỏ (surrounding text), rồi chèn chữ mới    | [Funput](https://github.com/Funput/Funput), [Unikey-Wayland-Final](https://github.com/quannguyen247/Unikey-Wayland-Final), [CanType](https://github.com/LumeWorks/CanType), [pinakey](https://github.com/trananhtung/pinakey) (chế độ phụ), [vnkey](https://github.com/marixdev/vnkey), [telebit](https://github.com/sonnam0904/telebit)            |
| Preedit nhưng tắt gạch chân, cho giống chữ thường                                | [pinakey](https://github.com/trananhtung/pinakey) (mặc định), [TypeVN](https://github.com/vithanhlam/TypeVN), [vietc](https://github.com/vndangkhoa/vietc)                                                                                                                                                                                          |
| Tự làm bộ gõ Wayland riêng, gõ bằng bàn phím ảo mang bảng phím chữ Việt          | [vi-ime](https://github.com/nhanth87/vi-ime)                                                                                                                                                                                                                                                                                                        |
| Hai đường: bấm Backspace (hoặc bôi đen) qua uinput, rồi commit, canh nhịp bằng đồng hồ hoặc tin báo của app | [skey](https://github.com/collyn/skey), [ArecaIME](https://github.com/xhkzeroone/ArecaIME), [VMK](https://github.com/thanhpy2009/VMK), [fcitx5-lilypad](https://github.com/chiconcota/fcitx5-lilypad), [fcitx5-lotus](https://github.com/LotusInputMethod/fcitx5-lotus), Ngó Sen lúc đó |
| X11: đổi bảng phím cho từng chữ rồi bấm                                          | [Unikey-Wayland](https://github.com/ubuntu2310fake/Unikey-Wayland) (bản cũ), nhánh X11 của Unikey-Wayland-Final                                                                                                                                                                                                                                     |

</div>

Hai bộ gõ không đọc được: [UniLume](https://github.com/dismonjames/UniLume) không có mã và đã chuyển
thành CanType; codekeyvn thì link trong danh sách trả về lỗi 404.

## Năm cách, người dùng thấy gì

**Nhờ app tự xoá rồi chèn chữ mới.** Bộ gõ đọc surrounding text, tức chữ quanh con trỏ mà app báo lại,
bảo app xoá đúng phần cần bỏ, rồi chèn chữ mới. Tất cả đi một đường nên không lệch nhịp. Nhưng cách này
chỉ chạy tốt khi app báo đúng surrounding text, mà nhiều app báo sai hoặc không báo.

**Preedit, nhưng tắt gạch chân.** Chữ đang gõ nằm tạm trong ô cho tới khi xong từ, như chế độ Preedit
của Ngó Sen. Bộ gõ xin app đừng gạch chân để trông giống chữ thường. App có chiều theo hay không thì tuỳ
từng app.

**Tự làm bộ gõ Wayland riêng.** Bộ gõ không chạy trong fcitx5 mà tự nói chuyện với Wayland. Lệnh xoá và
lệnh chèn tới app cùng một lần. Cách này chỉ chạy trên compositor có input-method-v2 và bàn phím ảo của
Wayland, như Sway và Hyprland; KDE chưa có hai phần đó.

**Hai đường: bấm Backspace rồi gõ chữ mới.** Bộ gõ bấm Backspace qua bàn phím ảo, rồi commit chữ mới
theo đường riêng. Chạy được ở gần như mọi app, nhưng hai đường có thể lệch nhịp, và bàn phím ảo uinput
cần quyền đặc biệt trên máy.

**Đổi bảng phím rồi bấm (X11).** Với mỗi chữ có dấu, bộ gõ đổi tạm bảng phím rồi bấm phím. Cách này
không dùng được trên Wayland.

## Năm bộ gõ đáng học nhất

### Funput: gõ luôn, rồi đọc lại ô xem app có làm đúng không

[Funput](https://github.com/Funput/Funput) chạy trên fcitx5, có cả bản IBus dùng chung lõi. Nó xoá bằng
surrounding text rồi commit, cùng một đường, không dùng uinput.

Điểm đáng học là cách chống mất chữ. Funput không chờ trước khi gõ. Nó gõ luôn, rồi đọc nội dung ô mà
app báo lại và xếp vào ba loại: app làm đúng, app bỏ qua lệnh xoá, hoặc app chưa trả lời. App nào bỏ qua
lệnh xoá thì **riêng app đó** chuyển sang gõ bằng preedit, và Funput nhớ tên app đó cho lần sau.

README của họ ghi vài số đo, Ngó Sen chưa kiểm lại: app chỉ trả lời 61% số lần commit; chờ trả lời từng
lần thì chậm khoảng 25 ms mỗi phím; xoá và chèn dồn liền nhau không nghỉ thì hỏng chữ.

Ngó Sen nhận ra ô khó bằng hình dạng của ô. Funput nhận ra bằng cách ô thật sự phản ứng.

### Unikey-Wayland-Final: giữ phím gõ tiếp tới khi app xác nhận

[Unikey-Wayland-Final](https://github.com/quannguyen247/Unikey-Wayland-Final) là bộ gõ Wayland riêng,
dùng giao thức input-method-v1, đúng giao thức mà KWin của KDE có. Nó xoá rồi chèn, một đường.

Ý chính: sau mỗi lần thay chữ, nó đánh dấu "đang chờ", và **mọi phím gõ tiếp bị xếp hàng**. Chỉ khi ô
báo lại đúng đuôi chữ mong đợi thì hàng mới được thả ra. Thấy dấu hiệu lệnh xoá bị bỏ qua thì làm lại,
tối đa 3 lần. Đồng hồ 750 ms chỉ là lưới an toàn.

Mã của họ có một ghi chú khớp với điều Ngó Sen đo được: trên KDE, lệnh xoá và lệnh commit tới app thành
hai lần riêng.

Ngó Sen chờ app trong từng lần thay chữ. Cái chốt của Unikey-Wayland-Final chặn cả chuỗi phím phía sau.

### vi-ime: bàn phím ảo gõ thẳng chữ Việt

[vi-ime](https://github.com/nhanth87/vi-ime) là bộ gõ Wayland viết bằng Rust, dùng input-method-v2 và bàn
phím ảo của Wayland. Khi thay chữ, nó gửi lệnh xoá, lệnh chèn rồi **một** lệnh chốt, nên app nhận cả hai
cùng lúc.

Nó gõ chữ có dấu bằng một bảng phím cố định nạp một lần lúc đầu: 8 mức trên 36 phím hàng chữ, khoảng 280
chỗ cho chữ Việt. Tác giả ghi lại các bẫy đã gặp:

- Vài mã phím bị app hiểu thành phím chức năng: mã 107 là phím End, mã 162 cũng hỏng.
- Đổi bảng phím giữa chừng thì Chrome và Edge áp dụng trễ, chữ `ấ` rơi vào phím Enter. Vì vậy bảng phím
  phải cố định từ đầu.

vi-ime không chạy trên KDE: KWin trên Plasma 6.7.5 không có input-method-v2 lẫn bàn phím ảo Wayland
(kiểm bằng `wayland-info`). Nó chạy trên Sway, Hyprland và các compositor tương tự.

### pinakey và TypeVN: preedit không gạch chân

[pinakey](https://github.com/trananhtung/pinakey) chạy trên fcitx5, mặc định gõ bằng preedit với cờ
"không gạch chân". Chế độ uinput có sẵn nhưng tắt, phải bật bằng biến môi trường `PINAKEY_UINPUT=1`. Lý
do họ ghi: trên GNOME, đường D-Bus không bảo đảm thứ tự, kể cả cách uinput kèm tin báo như fcitx5-lotus.

[TypeVN](https://github.com/vithanhlam/TypeVN) chạy trên IBus, cũng dùng preedit không gạch chân, và tự
commit sau 800 ms không gõ hoặc khi rời ô.

App có thật sự bỏ gạch chân khi được xin hay không thì chưa kiểm; phải thử từng app. Nếu đủ giống chữ
thường, đây là đường dự phòng rẻ cho những ô khó như Messenger.

### CanType: không biết ô có gì thì không xoá

[CanType](https://github.com/LumeWorks/CanType) có một luật an toàn đơn giản. Trước khi xoá, nó kiểm phần
chữ trước con trỏ có kết thúc bằng đúng chữ nó vừa gõ không. App không báo nội dung ô thì nó chỉ chèn,
không bao giờ xoá.

## Các bộ gõ còn lại

Những bộ gõ này cùng họ hai đường với Ngó Sen lúc đó, hoặc không có cơ chế chống mất chữ nào khác đáng kể.

- [skey](https://github.com/collyn/skey): fcitx5, lõi Rust, uinput. Bấm thừa một Backspace làm mốc, đồng
  hồ tự chỉnh theo trung bình, theo dõi ô qua AT-SPI, và có bộ test dài 1.481 dòng. Luật polkit của nó cho
  mọi người dùng trên máy quyền nạp lại dịch vụ.
- [ArecaIME](https://github.com/xhkzeroone/ArecaIME): 5 cách thay chữ đổi được, đều canh nhịp bằng đồng
  hồ, tự tăng 5 ms mỗi bước tới 50 ms. Có cách bôi đen bằng Shift+mũi tên trái rồi gõ đè, ghi rõ là để
  trị Facebook, giống hướng Ngó Sen chọn, nhưng nó chốt bằng đồng hồ chứ không chờ ô xác nhận. Luật udev
  cho người dùng quyền đọc cả chuột và bàn di. Lõi Go để ở dạng file đã build sẵn.
- [VMK](https://github.com/thanhpy2009/VMK): bấm thừa một Backspace rồi chờ cố định 20 ms.
- [fcitx5-lilypad](https://github.com/chiconcota/fcitx5-lilypad): bản fcitx5-lotus đổi tên từ đầu tháng
  8/2026, thêm chế độ gõ canh theo đồng hồ và tự gửi tin xác nhận.
- [fcitx5-lotus](https://github.com/LotusInputMethod/fcitx5-lotus): bản gốc mà Ngó Sen tách ra, cùng cách
  hai đường.
- [Unikey-Wayland](https://github.com/ubuntu2310fake/Unikey-Wayland) (bản cũ): chạy trên X11, đổi bảng
  phím cho từng chữ rồi bấm, có nghỉ giữa các bước. Không áp được cho Wayland.
- [vietc](https://github.com/vndangkhoa/vietc), [vnkey](https://github.com/marixdev/vnkey),
  [telebit](https://github.com/sonnam0904/telebit): một đường, bằng surrounding text hoặc preedit.

## Ngó Sen chọn gì

Người giữ dự án quyết định chỉ đi tiếp một hướng: **gõ thẳng chữ Việt bằng bàn phím ảo**, học từ vi-ime,
với bảng phím cố định ngay từ đầu. Các ý còn lại (giữ phím chờ xác nhận, nhớ app hay mất chữ, preedit
không gạch chân) chưa làm.

Từ đó tới nay, bản 0.5.0 đã đổi cách Ngó Sen xoá chữ. Vẫn là hai bước, nhưng Backspace đi bằng forward
key qua chính fcitx5 thay vì qua bàn phím ảo, nên không cần uinput server nữa.

## Các commit đã đọc

<div class="table-scroll">

| Bộ gõ                                                                 | Commit    | Ngày       |
| --------------------------------------------------------------------- | --------- | ---------- |
| [Funput](https://github.com/Funput/Funput/tree/a0278f1)                          | `a0278f1` | 23/09/2026 |
| [Unikey-Wayland-Final](https://github.com/quannguyen247/Unikey-Wayland-Final/tree/1d7c107) | `1d7c107` | 04/09/2026 |
| [TypeVN](https://github.com/vithanhlam/TypeVN/tree/1fd1910)                      | `1fd1910` | 10/09/2026 |
| [CanType](https://github.com/LumeWorks/CanType/tree/603a20a)                     | `603a20a` | 07/08/2026 |
| [ArecaIME](https://github.com/xhkzeroone/ArecaIME/tree/5c6e34a)                  | `5c6e34a` | 13/09/2026 |
| [vi-ime](https://github.com/nhanth87/vi-ime/tree/71cebcb)                        | `71cebcb` | 16/07/2026 |
| [Unikey-Wayland](https://github.com/ubuntu2310fake/Unikey-Wayland/tree/4323ffb)  | `4323ffb` | 09/08/2026 |
| [skey](https://github.com/collyn/skey/tree/915246f)                              | `915246f` | 16/09/2026 |
| [vietc](https://github.com/vndangkhoa/vietc/tree/e98e4f0)                        | `e98e4f0` | 14/09/2026 |
| [pinakey](https://github.com/trananhtung/pinakey/tree/3068680)                   | `3068680` | 31/08/2026 |
| [vnkey](https://github.com/marixdev/vnkey/tree/b75cdc0)                          | `b75cdc0` | 03/04/2026 |
| [telebit](https://github.com/sonnam0904/telebit/tree/969efe2)                    | `969efe2` | 15/09/2026 |
| [VMK](https://github.com/thanhpy2009/VMK/tree/4973ec3)                           | `4973ec3` | 20/09/2026 |

</div>
