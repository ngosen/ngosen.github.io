---
title: "Tổng hợp các bộ gõ tiếng Việt trên Linux và cơ chế gõ"
description: "Đọc mã các bộ gõ tiếng Việt trên Linux, kể cả Ngó Sen: năm cách đưa chữ vào app, vì sao có bộ gõ làm mất chữ, lặp chữ và ý nào đáng học."
pubDate: 2026-10-08
updatedDate: 2026-10-19
---

Khi gõ `as` ra `á`, mọi bộ gõ đều phải làm cùng một việc: xoá `a` rồi viết `á`. Cách làm việc đó quyết
định chuyện người dùng có bị mất chữ, lặp chữ hay không.

Ngày 24/09/2026, người giữ dự án xem mỗi bộ gõ làm việc đó ra sao. Danh sách là 18 bộ gõ trong
[danh sách cộng đồng](https://docs.google.com/spreadsheets/d/1DhW_jVM3IPSR1fX2CJyZstNFqoHDL3u6aLOrj2tYDk4/edit?gid=1097134275)
(kể cả Ngó Sen); đọc được mã của 16 bộ. Không bộ gõ nào được cài hay chạy, chỉ đọc mã. Bản đầy đủ, ghi
rõ file và dòng đã đọc, nằm trong [repo chính](https://github.com/ngosen/ngosen/blob/main/NGHIEN-CUU-BO-GO-KHAC.md).
Mã của các bộ gõ có thể đã đổi sau ngày đó; phiên bản mã đã đọc (commit) ghi ở bảng cuối bài.

Ngày 14/10/2026, bài có thêm bốn bộ gõ có sẵn gói trong distro, vốn không có trong danh sách cộng đồng,
và một danh sách bộ gõ mới đang được làm. Ngày 19/10/2026, bài có thêm số sao, fork và commit của từng
bộ gõ, cùng hai bộ gõ chưa có trước đó.

## Vì sao đọc mã bộ gõ khác

Lúc đó Ngó Sen xoá chữ bằng **hai đường**: một bàn phím ảo bấm Backspace, còn chữ mới đi đường riêng
của bộ gõ (commit). Lỗi mất chữ ở Messenger và ô đăng bài Facebook đều do hai đường này lệch nhịp. Vì
vậy, bộ gõ nào xoá rồi viết **chỉ bằng một đường** là bộ gõ đáng học.

## 22 bộ gõ, năm cách

<div class="table-scroll">

| Cách đưa chữ vào app                                                             | Bộ gõ                                                                                                                                                                                                                                                                                                                                               |
| -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Một đường: nhờ app xoá chữ quanh con trỏ (surrounding text), rồi chèn chữ mới    | [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo) (chế độ phụ), [Funput](https://github.com/Funput/Funput), [Unikey-Wayland-Final](https://github.com/quannguyen247/Unikey-Wayland-Pro), [CanType](https://github.com/LumeWorks/CanType), [pinakey](https://github.com/trananhtung/pinakey) (chế độ phụ), [vnkey](https://github.com/marixdev/vnkey), [telebit](https://github.com/sonnam0904/telebit)            |
| Preedit: chữ đang gõ nằm tạm trong ô tới khi xong từ, có hoặc không gạch chân    | [fcitx5-unikey](https://github.com/fcitx/fcitx5-unikey), [fcitx5-bamboo](https://github.com/fcitx/fcitx5-bamboo), [ibus-unikey](https://github.com/vn-input/ibus-unikey), [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo) (mặc định), [pinakey](https://github.com/trananhtung/pinakey) (mặc định), [TypeVN](https://github.com/vithanhlam/TypeVN), [vietc](https://github.com/vndangkhoa/vietc)                                                                                                                                                                                          |
| Tự làm bộ gõ Wayland riêng, gõ bằng bàn phím ảo mang bảng phím chữ Việt          | [vi-ime](https://github.com/nhanth87/vi-ime)                                                                                                                                                                                                                                                                                                        |
| Hai đường: bấm Backspace (hoặc bôi đen) qua uinput, forward key hoặc XTest, rồi commit, canh nhịp bằng đồng hồ hoặc tin báo của app | [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo) (chế độ phụ), [skey](https://github.com/collyn/skey), [ArecaIME](https://github.com/xhkzeroone/ArecaIME), [VMK](https://github.com/thanhpy2009/VMK), [fcitx5-lilypad](https://github.com/chiconcota/fcitx5-lilypad), [fcitx5-lotus](https://github.com/LotusInputMethod/fcitx5-lotus), Ngó Sen lúc đó |
| X11: đổi bảng phím cho từng chữ rồi bấm                                          | [Unikey-Wayland](https://github.com/ubuntu2310fake/Unikey-Wayland) (version cũ), nhánh X11 của Unikey-Wayland-Final                                                                                                                                                                                                                                     |

</div>

Hai bộ gõ không đọc được. Lúc đó nhánh chính của [UniLume](https://github.com/LumeWorks/UniLume) không có
mã, và dự án đã chuyển thành CanType. Mã cũ (lõi UniKey, addon fcitx5) nằm ở nhánh `legacy`, có release
v0.1.1 ngày 01/08/2026; README ở nhánh chính ghi dự án đã dời sang CanType và
[Cadence](https://github.com/LumeWorks/Cadence). Link codekeyvn trong danh sách gõ sai tên tài khoản nên trả về lỗi 404; repo thật là
[codekeyvn](https://github.com/toilaai2212hp22-lgtm/codekeyvn), bài này chưa nghiên cứu sâu.

## Năm cách, người dùng thấy gì

**Nhờ app tự xoá rồi chèn chữ mới.** Bộ gõ đọc surrounding text, tức chữ quanh con trỏ mà app báo lại,
bảo app xoá đúng phần cần bỏ, rồi chèn chữ mới. Tất cả đi một đường nên không lệch nhịp. Nhưng cách này
chỉ chạy tốt khi app báo đúng surrounding text, mà nhiều app báo sai hoặc không báo.

**Preedit.** Chữ đang gõ nằm tạm trong ô cho tới khi xong từ, như chế độ Preedit của Ngó Sen.
fcitx5-unikey, fcitx5-bamboo và ibus-unikey mặc định gạch chân phần này. Các bộ gõ khác trong hàng này
của bảng xin app đừng gạch chân để trông giống chữ thường. App có chiều theo hay không thì tuỳ từng app.

**Tự làm bộ gõ Wayland riêng.** Bộ gõ không chạy trong fcitx5 mà tự nói chuyện với Wayland. Lệnh xoá và
lệnh chèn tới app cùng một lần. Cách này thường cần compositor có input-method-v2 và bàn phím ảo của
Wayland, như Sway và Hyprland; KDE chưa có hai phần đó.

**Hai đường: bấm Backspace rồi gõ chữ mới.** Bộ gõ bấm Backspace qua bàn phím ảo, hoặc nhờ fcitx5 hay
IBus chuyển phím Backspace tới app, rồi commit chữ mới theo đường riêng. Cách này chạy được ở gần như mọi
app, nhưng hai đường có thể lệch nhịp, và bàn phím ảo uinput cần quyền đặc biệt trên máy.

**Đổi bảng phím rồi bấm (X11).** Với mỗi chữ có dấu, bộ gõ đổi tạm bảng phím rồi bấm phím. Cách này
không dùng được trên Wayland.

## Năm hướng đáng học nhất

### Funput: gõ luôn, rồi đọc lại ô xem app có làm đúng không

[Funput](https://github.com/Funput/Funput) chạy trên fcitx5, có cả bản IBus dùng chung lõi. Nó xoá bằng
surrounding text rồi commit, cùng một đường, không dùng uinput.

Funput gõ luôn, không chờ trước. Sau đó nó đọc nội dung ô mà app báo lại và xếp vào ba loại: app làm
đúng, app bỏ qua lệnh xoá hoặc app chưa trả lời. App nào bỏ qua lệnh xoá thì **riêng app đó** chuyển
sang gõ bằng preedit, và Funput nhớ tên app đó cho lần sau.

README của họ ghi vài số đo, Ngó Sen chưa kiểm lại: app chỉ trả lời 61% số lần commit; chờ trả lời từng
lần thì chậm khoảng 25 ms mỗi phím; xoá và chèn dồn liền nhau không nghỉ thì ra sai chữ.

### Unikey-Wayland-Final: giữ phím gõ tiếp tới khi app xác nhận

[Unikey-Wayland-Final](https://github.com/quannguyen247/Unikey-Wayland-Pro) là bộ gõ Wayland riêng,
dùng giao thức input-method-v1, đúng giao thức mà KWin của KDE có. Nó xoá rồi chèn, một đường. Ngày
19/10/2026, repo này đã đổi tên thành Unikey-Wayland-Pro; GitHub ghi nó là fork của Unikey-Wayland, 0 sao,
đẩy mã lần cuối ngày 30/09/2026.

Sau mỗi lần thay chữ, nó đánh dấu “đang chờ”, và **mọi phím gõ tiếp bị xếp hàng**. Chỉ khi ô báo lại
đúng đuôi chữ mong đợi thì hàng mới được thả ra. Thấy dấu hiệu lệnh xoá bị bỏ qua thì nó làm lại, tối đa
3 lần. Đồng hồ 750 ms chỉ để phòng khi ô không báo lại.

Mã của họ có ghi chú: trên KDE, lệnh xoá và lệnh commit tới app thành hai lần riêng.

### vi-ime: bàn phím ảo gõ thẳng chữ Việt

[vi-ime](https://github.com/nhanth87/vi-ime) là bộ gõ Wayland viết bằng Rust, dùng input-method-v2 và bàn
phím ảo của Wayland. Khi thay chữ, nó gửi lệnh xoá, lệnh chèn rồi **một** lệnh chốt, nên app nhận cả hai
cùng lúc.

Nó gõ chữ có dấu bằng một bảng phím cố định nạp một lần lúc đầu: 8 mức trên 36 phím hàng chữ, khoảng 280
chỗ cho chữ Việt. Tác giả ghi lại các bẫy đã gặp:

- Vài mã phím bị app hiểu thành phím chức năng: mã 107 là phím End, mã 162 cũng bị hiểu sai.
- Đổi bảng phím giữa chừng thì Chrome và Edge áp dụng trễ, chữ `ấ` rơi vào phím Enter. Vì vậy bảng phím
  phải cố định từ đầu.

vi-ime không chạy trên KDE: KWin trên Plasma 6.7.5 không có cả input-method-v2 lẫn bàn phím ảo Wayland
(kiểm bằng `wayland-info`). Nó chạy trên Sway, Hyprland và các compositor tương tự.

### pinakey và TypeVN: preedit không gạch chân

[pinakey](https://github.com/trananhtung/pinakey) chạy trên fcitx5, mặc định gõ bằng preedit với cờ
“không gạch chân”. Chế độ uinput có sẵn nhưng tắt, phải bật bằng biến môi trường `PINAKEY_UINPUT=1`. Lý
do họ ghi: trên GNOME, đường D-Bus không bảo đảm thứ tự, nên cả cách uinput có kèm tin báo như của
Ngó Sen lúc đó cũng không chắc đúng.

[TypeVN](https://github.com/vithanhlam/TypeVN) chạy trên IBus, cũng dùng preedit không gạch chân và tự
commit sau 800 ms không gõ hoặc khi rời ô.

App có thật sự bỏ gạch chân khi được xin hay không thì chưa kiểm; phải test từng app. Nếu đủ giống chữ
thường, đây là đường dự phòng rẻ cho những ô khó như Messenger.

### CanType: không biết ô có gì thì không xoá

[CanType](https://github.com/LumeWorks/CanType) có một luật an toàn đơn giản. Trước khi xoá, nó kiểm phần
chữ trước con trỏ có kết thúc bằng đúng chữ nó vừa gõ không. App không báo nội dung ô thì nó chỉ chèn,
không bao giờ xoá.

## Các bộ gõ còn lại

Phần lớn bộ gõ dưới đây đi hai đường như Ngó Sen lúc đó. Số còn lại không có cách chống mất chữ nào
ngoài cách đã ghi trong bảng.

- [skey](https://github.com/collyn/skey): fcitx5, lõi Rust, uinput. Bấm thừa một Backspace làm mốc, đồng
  hồ tự chỉnh theo trung bình, theo dõi ô qua AT-SPI và có bộ test dài 1.481 dòng. Luật polkit của nó cho
  mọi người dùng trên máy quyền nạp lại service.
- [ArecaIME](https://github.com/xhkzeroone/ArecaIME): 5 cách thay chữ đổi được, đều canh nhịp bằng đồng
  hồ, tự tăng 5 ms mỗi bước tới 50 ms. Có cách bôi đen bằng Shift+mũi tên trái rồi gõ đè, ghi rõ là để
  trị Facebook, và cũng chốt bằng đồng hồ. Luật udev cho người dùng quyền đọc cả chuột và touchpad. Lõi
  Go để ở dạng file đã build sẵn.
- [VMK](https://github.com/thanhpy2009/VMK): bấm thừa một Backspace rồi chờ cố định 20 ms.
- [fcitx5-lilypad](https://github.com/chiconcota/fcitx5-lilypad): có thêm chế độ gõ canh theo đồng hồ và
  tự gửi tin xác nhận.
- [Unikey-Wayland](https://github.com/ubuntu2310fake/Unikey-Wayland) (version cũ): chạy trên X11, đổi bảng
  phím cho từng chữ rồi bấm, có nghỉ giữa các bước. Không dùng được trên Wayland.
- [vietc](https://github.com/vndangkhoa/vietc), [vnkey](https://github.com/marixdev/vnkey),
  [telebit](https://github.com/sonnam0904/telebit): một đường, bằng surrounding text hoặc preedit.

## Ngó Sen chọn gì

Ngày 24/09, người giữ dự án quyết định chỉ đi tiếp một hướng: **gõ thẳng chữ Việt bằng bàn phím ảo**,
học từ vi-ime, với bảng phím cố định ngay từ đầu. Các ý còn lại (giữ phím chờ xác nhận, nhớ app hay mất
chữ, preedit không gạch chân) thì không làm.

Sau đó, version 0.5.0 đổi cách Ngó Sen xoá chữ. Vẫn là hai bước, nhưng Backspace đi bằng forward key qua
chính fcitx5 thay vì qua bàn phím ảo, nên không cần uinput server nữa.

Từ ngày 09/10/2026, hướng bàn phím ảo cũng thôi làm, vì Ngó Sen chỉ làm cho fcitx5. Chuyện này kể ở bài
[Ngó Sen chỉ làm cho fcitx5](/blog/chi-lam-cho-fcitx5/).

## Bốn bộ gõ có sẵn trong distro

Bốn bộ gõ này có gói trong kho của nhiều distro nhưng không có trong danh sách cộng đồng. Mã được đọc
ngày 14/10/2026.

- [fcitx5-unikey](https://github.com/fcitx/fcitx5-unikey) do nhóm làm fcitx5 giữ, có gói trong Debian,
  Ubuntu, Fedora, Arch, openSUSE và NixOS. Nó gõ bằng preedit, có tuỳ chọn bỏ gạch chân. Một tuỳ chọn bật
  sẵn cho nó đọc surrounding text để gõ tiếp vào từ ngay trước con trỏ. Tuỳ chọn sửa thẳng chữ trong ô
  vẫn ghi là thử nghiệm và tắt sẵn.
- [fcitx5-bamboo](https://github.com/fcitx/fcitx5-bamboo) cũng do nhóm làm fcitx5 giữ, dùng chung lõi
  bamboo-core với ibus-bamboo, có gói trong Debian, Ubuntu, Arch và NixOS. Nó chỉ gõ bằng preedit, có tuỳ
  chọn bỏ gạch chân.
- [ibus-unikey](https://github.com/vn-input/ibus-unikey) chỉ gõ bằng preedit, luôn gạch chân. Commit cuối
  từ tháng 7/2025, version cuối từ năm 2020, nhưng nó vẫn có gói trong hầu hết distro, kể cả Ubuntu 26.04.
- [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo) có nhiều cách gõ nhất, chọn được cho từng
  app, mặc định là preedit không gạch chân. Các chế độ phụ gồm surrounding text, bấm Backspace qua IBus
  (một chế độ gửi cả chữ mới thành phím) và bôi đen bằng Shift+mũi tên trái rồi gõ đè. Trên X11 còn có chế
  độ bấm phím giả bằng XTest. Các chế độ bấm phím đều chờ một khoảng cố định giữa lúc xoá và lúc commit.

  Nó có gói trong Fedora, AUR và NixOS. README ghi dự án đã lâu không tiến triển, có thể không được duy
  trì nữa, và gợi ý dùng fcitx5-unikey thay thế.

## Bộ gõ mới, chưa nghiên cứu sâu

Các bộ gõ dưới đây có commit trong 30 ngày tính tới 14/10/2026. Cách gõ ghi theo README của từng dự án.

Chạy trên fcitx5:

- [Clak](https://github.com/versenilvis/ClakIME): có gói .deb, AUR và Nix.
- [BambooMintKey](https://github.com/thatislg/BambooMintKey): lõi viết bằng F#, có bản Flatpak cho Steam Deck.
- [Gõ Nhanh](https://github.com/khaphanspace/gonhanh.org): bản chính cho macOS, addon fcitx5 còn là bản beta.
- [VietnameseKey](https://github.com/dangnhatphi001-vibe-AI/vietnamesekey): gõ bằng preedit.

Chạy trên IBus:

- [GoTV](https://github.com/isthaison/gotv): lõi viết bằng C, có bản cho Windows và macOS.
- [ibus-vie](https://github.com/IDev4life/ibus-vie): viết bằng Rust, có kho apt riêng.
- [ibus-gokien](https://github.com/libgokien/ibus-gokien): viết bằng Rust, mới có Telex.
- [ibus-telex](https://github.com/manhavn/ibus-telex) và [rs-telex](https://github.com/duyphan0503/rs-telex):
  viết bằng Rust, nói chuyện thẳng với IBus qua D-Bus.

Chạy trên cả fcitx5 và IBus:

- [TextVN](https://github.com/hunglinhpt/TextVN): preedit không gạch chân, có bản cho Windows và macOS.
- [UVie](https://github.com/uvie-project/uvie-linux): có thêm service đọc bàn phím rồi gõ ra qua uinput.

Không qua fcitx5 hay IBus:

- [SenKey](https://github.com/coderabangai/senkey): đọc thẳng bàn phím, gõ ra qua uinput hoặc bàn phím ảo
  của Wayland.
- [VNIKey](https://github.com/hideonhp/vnikey-linux): input-method-v2 trên Wayland, XTest trên X11 và một
  engine IBus cho GNOME.
- [Mimi IME](https://github.com/Mimi-IME/mimi-ime): bộ gõ Wayland chỉ gõ bằng preedit, cài qua Nix.

Hai bộ gõ dưới đây thêm ngày 19/10/2026. Bản chính của cả hai là cho macOS, và OpenKey không có commit
nào trong 30 ngày:

- [OpenKey](https://github.com/tuyenvm/OpenKey): README ghi bản Linux “đang phát triển”. Version cuối
  là 2.0.5, ngày 19/03/2022.
- [gõkey](https://github.com/huytd/goxkey): viết bằng Rust. Bản IBus cho Linux nằm ở nhánh
  `ibus-implementation` ([PR #155](https://github.com/huytd/goxkey/pull/155), chưa gộp). README ghi bản này
  còn đang làm nhưng đã thử được, và tự đổi giữa surrounding text và preedit.

## Bộ gõ nào đang được làm, bộ gõ nào nhiều người theo dõi

Số đo ngày 19/10/2026 qua GitHub API. “Commit 30 ngày” là số commit trên nhánh mặc định từ 19/09/2026;
API trả tối đa 100 commit một lần, nên 100 ghi là 100+. Người đóng góp không tính người gửi commit mà không
có tài khoản GitHub.

Số sao không phải số người dùng. fcitx5-unikey, ibus-bamboo và ibus-unikey có gói trong kho của distro, nên
có thể có nhiều người dùng hơn số sao và số commit cho thấy. Đây là phỏng đoán: không có số lượt tải để
kiểm.

<div class="table-scroll">

| Bộ gõ                                                        | Sao  | Fork | Commit 30 ngày | Người đóng góp | Đẩy mã lần cuối |
| ------------------------------------------------------------ | ---: | ---: | -------------: | -------------: | --------------- |
| [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo)   | 1.505 |  100 |              0 |             15 | 03/07/2026      |
| [OpenKey](https://github.com/tuyenvm/OpenKey)                |  968 |  282 |              0 |             16 | 15/06/2026      |
| [Gõ Nhanh](https://github.com/khaphanspace/gonhanh.org)      |  766 |  103 |             48 |             10 | 19/10/2026      |
| [fcitx5-lotus](https://github.com/LotusInputMethod/fcitx5-lotus) | 506 | 53 |           100+ |             22 | 19/10/2026      |
| [gõkey](https://github.com/huytd/goxkey)                     |  280 |   35 |              1 |             14 | 23/09/2026      |
| [ibus-unikey](https://github.com/vn-input/ibus-unikey)       |  146 |   42 |              0 |              4 | 21/07/2025      |
| [fcitx5-unikey](https://github.com/fcitx/fcitx5-unikey)      |  133 |   24 |              0 |              7 | 06/09/2026      |
| [Unikey-Wayland](https://github.com/ubuntu2310fake/Unikey-Wayland) | 102 | 79 |            6 |              1 | 01/10/2026      |
| [vnkey](https://github.com/marixdev/vnkey)                   |  101 |   12 |              0 |              1 | 03/04/2026      |
| [VMK](https://github.com/thanhpy2009/VMK)                    |  100 |   14 |              1 |              1 | 20/09/2026      |
| [fcitx5-bamboo](https://github.com/fcitx/fcitx5-bamboo)      |   76 |   17 |              0 |              2 | 06/09/2026      |
| [vietc](https://github.com/vndangkhoa/vietc)                 |   59 |    9 |              2 |              6 | 06/10/2026      |
| [Funput](https://github.com/Funput/Funput)                   |   49 |    4 |           100+ |              3 | 18/10/2026      |
| [skey](https://github.com/collyn/skey)                       |   27 |    5 |             40 |              1 | 15/10/2026      |
| [ArecaIME](https://github.com/xhkzeroone/ArecaIME)           |   19 |    1 |             81 |              2 | 18/10/2026      |
| [Ngó Sen](https://github.com/ngosen/ngosen)                  |   19 |    1 |           100+ |             21 | 19/10/2026      |
| [UniLume](https://github.com/LumeWorks/UniLume)              |   12 |    0 |              0 |              1 | 07/08/2026      |

</div>

Các bộ gõ còn lại trong bài đều dưới 11 sao: BambooMintKey 10, TextVN 9, telebit 8, vi-ime 7, pinakey 7,
fcitx5-lilypad 6, codekeyvn 6, Mimi IME 4, TypeVN 3, GoTV 2, Clak 2, VietnameseKey 1, ibus-gokien 1,
CanType 1. SenKey, rs-telex, VNIKey, ibus-vie, ibus-telex và UVie chưa có sao nào. Trong số đó,
BambooMintKey, TextVN và Clak có 100+ commit trong 30 ngày, SenKey có 92.

fcitx5-lotus và Gõ Nhanh vừa nhiều sao vừa có nhiều commit. Bản chính của Gõ Nhanh là cho macOS, addon
fcitx5 còn là bản beta, và 48 commit là của cả repo. Funput, ArecaIME và skey ít sao nhưng commit nhiều.

ibus-bamboo nhiều sao nhất nhưng không có commit nào trong 30 ngày, và README của nó tự ghi có thể không
còn được duy trì. ibus-unikey đẩy mã lần cuối từ tháng 7/2025, vnkey từ tháng 4/2026. fcitx5-unikey và
fcitx5-bamboo cũng không có commit trong 30 ngày; cả hai do nhóm làm fcitx5 giữ. Unikey-Wayland và VMK có
vài commit.

Repo Ngó Sen mới chuyển sang chỗ hiện tại ngày 10/10/2026; 21 người đóng góp tính cả lịch sử của repo cũ.

## Phiên bản mã đã đọc

<div class="table-scroll">

| Bộ gõ                                                                 | Commit    | Ngày       |
| --------------------------------------------------------------------- | --------- | ---------- |
| [Funput](https://github.com/Funput/Funput/tree/a0278f1)                          | `a0278f1` | 23/09/2026 |
| [Unikey-Wayland-Final](https://github.com/quannguyen247/Unikey-Wayland-Pro/tree/1d7c107) | `1d7c107` | 04/09/2026 |
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
| [fcitx5-unikey](https://github.com/fcitx/fcitx5-unikey/tree/ed9170c)             | `ed9170c` | 06/09/2026 |
| [fcitx5-bamboo](https://github.com/fcitx/fcitx5-bamboo/tree/fb02a24)             | `fb02a24` | 06/09/2026 |
| [ibus-bamboo](https://github.com/BambooEngine/ibus-bamboo/tree/49e03d7)          | `49e03d7` | 19/05/2026 |
| [ibus-unikey](https://github.com/vn-input/ibus-unikey/tree/ede78c3)              | `ede78c3` | 21/07/2025 |

</div>
