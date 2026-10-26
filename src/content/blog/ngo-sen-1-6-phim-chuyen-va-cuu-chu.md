---
title: "Ngó Sen 1.6 thêm phím chuyển Anh/Việt, Cứu chữ và Cứu dấu"
description: "Version 1.6.0-1 có phím chuyển Anh/Việt riêng, Cứu chữ khi quên bật tiếng Việt và Cứu dấu cho chữ đang bôi đen."
pubDate: 2026-10-26
---

Ngó Sen version 1.6.0-1 đã phát hành. Hai thay đổi chính là phím riêng chuyển Anh/Việt và hai tuỳ chọn
Cứu chữ, Cứu dấu.

## Phím chuyển Anh/Việt

Máy cài mới bằng `install.sh` dùng `Ctrl+Shift` như UniKey và bắt đầu ở tiếng Anh. Máy nâng cấp từ
version cũ giữ phím đã chọn, thường là `Ctrl+Space`. Khi tắt tiếng Việt, gõ như không có bộ gõ.

Trạng thái Anh/Việt dùng chung cho mọi cửa sổ và được nhớ qua lần đăng xuất. Riêng app đã đặt chế độ
gõ riêng thì phím chuyển chỉ đổi trạng thái của app đó.

Khi bấm phím chuyển, nhãn cạnh con trỏ hiện “Ngó Sen (Telex)” khi bật tiếng Việt với kiểu gõ Telex,
hoặc “Ngó Sen (Tắt)” khi tắt. Biểu tượng khay hiện chữ V màu xanh khi bật, lát củ sen trên nền xám khi
tắt.

Để đổi phím, vào “Cài đặt Ngó Sen › Phím › Phím tắt”, tìm “Phím chuyển Anh/Việt”. Nếu đang dùng phím
khác, nút “Dùng Ctrl+Shift” đặt lại tổ hợp này. Cách đổi phím ở
[hướng dẫn bật, tắt tiếng Việt](/huong-dan/bat-tat-tieng-viet/).

## Cứu chữ

Nếu quên bật tiếng Việt và đã gõ `tieengs vieetj`, bấm phím chuyển Anh/Việt để bật lại: Cứu chữ đổi
đoạn đó thành `tiếng việt`. Bấm `Tab` hoặc `Esc` để trả lại `tieengs vieetj` nếu muốn giữ chữ ban đầu.

Với `abc tieengs`, Ngó Sen chỉ hiện gợi ý `abc tieengs → abc tiếng`, không tự đổi. Vì `abc` gõ lại vẫn
y nguyên, đoạn này có thể chứa tiếng Anh được gõ có chủ ý. Bấm `Enter` để nhận gợi ý, `Tab` hoặc `Esc`
để giữ nguyên.

Cứu chữ không ghi nhớ phím trong ô mật khẩu. Đoạn đã gõ bị quên khi click chuột, bấm `Enter`, phím
mũi tên hoặc chuyển ô; app không cho bộ gõ xoá chữ thì không hiện Cứu chữ.

## Cứu dấu

Bôi đen `nhanh`, rồi gõ `s`: chữ đổi thành `nhánh`. Bấm `Tab`, `Esc` hoặc gõ `s` lần nữa để trả lại
phím vừa gõ. Nếu gõ tiếp thành một từ mới, chẳng hạn bôi đen `nhanh` rồi gõ `sách`, kết quả vẫn là
`sách`.

Cứu dấu chỉ chạy với bảng mã Unicode trong app hỗ trợ surrounding text. Cứu chữ và Cứu dấu đều bật sẵn,
kể cả khi nâng cấp; có thể tắt từng tuỳ chọn ở “Cài đặt Ngó Sen › Gõ chữ”, nhóm “Gõ nhanh”. Các ví dụ
và cách dùng ở [hướng dẫn Cứu chữ, Cứu dấu](/huong-dan/cuu-chu-cuu-dau/).

## Các thay đổi khác

- Khi bật “Gõ tắt chữ hoa”, gõ tắt viết hoa chữ đầu thì cụm từ cũng viết hoa chữ đầu: lưu `kq` là
  `kết quả` thì `Kq` ra `Kết quả`. Cụm từ đã có chữ hoa giữ như đã lưu: lưu `ip` là `iPhone` thì `Ip`
  vẫn ra `iPhone`. Xem [cách gõ tắt](/huong-dan/go-tat/).

- “Phím chốt chữ” nằm ở trang “Gõ chữ”, nhóm “Cách bỏ dấu”, mặc định là `Ctrl`. Bấm rồi thả riêng phím
  này để giữ nguyên từ đang gõ, không thêm dấu, tự khôi phục hay bung macro. Tuỳ chọn này thay mục bỏ qua
  gõ tắt cũ; ai đã chọn `Shift`, `Ctrl` hoặc `Alt` vẫn giữ phím đó. Xem
  [cách dùng phím chốt chữ](/huong-dan/go-tat/#giu-nguyen).

- Menu khay có thêm “Kiểu gõ” để chuyển giữa Telex và VNI, lưu ngay lựa chọn. Menu “Tự viết hoa” cho
  bật, tắt từng kiểu viết hoa, chẳng hạn tắt khi gõ lệnh trong terminal. Xem
  [cách chọn kiểu gõ](/huong-dan/kieu-go-bang-ma/) và
  [cách đặt tự viết hoa](/huong-dan/tu-sua-dau-cau/).

- Tuỳ chọn “Tự viết hoa chữ đầu văn bản và đầu dòng (thử nghiệm)” mặc định tắt. Khi bật, gõ `xin` vào
  ô trống hoặc đầu dòng mới ra `Xin`. Tuỳ chọn không áp dụng ở thanh địa chỉ, ô mật khẩu và app không
  cho bộ gõ đọc chữ trong ô. Trên GNOME 47 trở lên, Chrome và app tương tự chưa viết hoa ở ô trống. Xem
  [hướng dẫn tự viết hoa](/huong-dan/tu-sua-dau-cau/).

- Trang “Giao diện” có nhóm “Hiện trong menu khay” để ẩn các mục không dùng. “Ngôn ngữ giao diện” cho
  đổi sang tiếng Anh; mặc định Ngó Sen dùng tiếng Việt kể cả khi desktop dùng tiếng Anh. Menu khay
  đổi ngay, cửa sổ cài đặt đổi khi mở lại. Xem [cách chỉnh giao diện và menu khay](/huong-dan/icon-khay/).

- Nếu biểu tượng hoặc menu khay bị mất hay treo, chạy `ngosen-save-log` trong terminal để lưu nhật ký
  gõ. Lệnh in đường dẫn file đã lưu, chỉ tài khoản của bạn đọc được. Xem
  [cách lấy nhật ký khi báo lỗi](/huong-dan/bao-loi/).

- Các tuỳ chọn ở trang “Gõ chữ”, “Phím tắt” và “Giao diện” có thêm giải thích ngắn bên dưới, thường
  kèm ví dụ.

- Cập nhật bằng `install.sh` tự nạp lại fcitx5, các app đang mở vẫn gõ tiếp được mà không cần đăng
  xuất. Riêng KDE Wayland vẫn cần đăng xuất rồi đăng nhập lại.

## Cập nhật

Cách cập nhật lên version 1.6.0-1 ở [mục Cập nhật của trang Cài đặt](/cai-dat/#cap-nhat).

Danh sách thay đổi đầy đủ ở [changelog](https://github.com/ngosen/ngosen/blob/main/CHANGELOG.md),
gói cài ở [release 1.6.0-1](https://github.com/ngosen/ngosen/releases/tag/ngosen-1.6.0-1).
