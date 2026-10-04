---
title: "Máy chủ nền chỉ còn đọc chuột"
description: "Chương trình nền bấm phím xoá hộ bộ gõ từng mở được mọi bàn phím, nay chỉ còn đọc chuột, kèm cái giá và phần chưa kiểm trên máy thật."
pubDate: 2026-10-04
---

Ở chế độ Uinput, Ngó Sen sửa một chữ bằng cách xoá chữ cũ rồi gõ chữ mới. Việc bấm phím xoá lùi (backspace) do một chương trình nhỏ chạy nền làm hộ, gọi là máy chủ nền. Nó bấm qua một bàn phím ảo, tức bàn phím do phần mềm tạo ra.

Bàn phím ảo ấy chỉ khai ba phím: xoá lùi, mũi tên trái và Shift phải. Máy chủ nền còn theo dõi cú bấm chuột, để khi người dùng bấm chuột giữa một từ đang gõ thì bộ gõ bắt đầu từ mới.

Việc chỉ có vậy, nhưng quyền nó từng cầm rộng hơn nhiều. Người giúp việc chỉ cần bấm một phím thì không nên giữ chìa khoá mọi phòng trong nhà.

## Vì sao đọc được mọi thiết bị nhập là rủi ro

Để bắt cú bấm chuột, máy chủ nền dùng libinput, thư viện đọc thiết bị nhập. Thư viện này mở mọi thiết bị nhập trên máy, kể cả bàn phím. Tài khoản hệ thống `uinput_proxy` của máy chủ nền lại từng nằm trong nhóm `input`, nhóm đọc được mọi bàn phím.

Hai điều đó cho máy chủ nền một đường đọc mọi phím người dùng gõ. Mật khẩu cũng là phím gõ.

Mã của máy chủ nền lúc đó chỉ xử lý nút chuột. Rủi ro nằm ở phần quyền thừa: nếu chương trình này có lỗi và bị lợi dụng, đường đọc bàn phím đã mở sẵn.

## Thu quyền lại

Các thay đổi chính viết ngày 26/09/2026, gộp vào nhánh mặc định ngày 03/10/2026.

Máy chủ nền nay chỉ mở chuột, bàn chạm (touchpad) và núm trỏ (pointing stick), ở chế độ chỉ đọc. Nó không mở bàn phím nào nữa. Tài khoản `uinput_proxy` ra khỏi nhóm `input` ([#8](https://github.com/ngosen/ngosen/pull/8)).

Luật udev, tức luật cấp quyền trên thiết bị của Linux, không còn trao `/dev/uinput` (cửa tạo bàn phím ảo) và mọi thiết bị nhập cho cả nhóm `input` ([#10](https://github.com/ngosen/ngosen/pull/10)). Phần này khớp với bản gốc fcitx5-lotus ([#525](https://github.com/LotusInputMethod/fcitx5-lotus/issues/525)).

Tệp khai báo dịch vụ của systemd, trình quản lý dịch vụ, cũng được siết. Lệnh `systemd-analyze security` chấm mức phơi ra của một dịch vụ: điểm của máy chủ nền từ 7.0 xuống 2.0.

## Nhận nhau theo tài khoản, từ chối lệnh quá cỡ

Máy chủ nền và mô-đun bộ gõ (phần chạy trong fcitx5) nói chuyện qua socket, một kênh nối giữa hai chương trình. Trước đây máy chủ nhận khách bằng cách xem đường dẫn chương trình của bên kia. Việc xem đó cần `CAP_SYS_PTRACE`, một quyền hệ thống dùng để soi vào tiến trình khác. Phép kiểm này lại không chặn được gì, vì chính người dùng chạy được fcitx5 kèm phần bổ sung tuỳ ý.

Nay hai bên nhận nhau theo uid, số định danh tài khoản của tiến trình bên kia. Máy chủ chỉ nhận tài khoản của người dùng nó phục vụ, mô-đun chỉ nhận `uinput_proxy`. Máy chủ bỏ hẳn `CAP_SYS_PTRACE`. Mô-đun kiểm cả socket phím xoá, nên chương trình chiếm tên socket trước không đọc được độ dài từng từ ([#9](https://github.com/ngosen/ngosen/pull/9)).

Máy chủ cũng kiểm con số nó nhận. Số từ 1 tới 1024 là số lần bấm xoá lùi, số từ -1 tới -1024 là số chữ cần bôi đen. Số khác bị bỏ qua và ghi vào nhật ký. Trước đây một số âm rất lớn làm máy chủ chết, bàn phím chết theo ([#7](https://github.com/ngosen/ngosen/pull/7)).

Hàng chờ phím xoá giữ tối đa 1024 phím và bị bỏ khi bộ gõ ngắt kết nối. Trước đây một chương trình gửi dồn dập có thể khiến máy chủ tiếp tục xoá chữ rất lâu sau khi nó đã dừng ([#18](https://github.com/ngosen/ngosen/pull/18)).

## Cái giá

Máy chủ nền bỏ mọi thiết bị tự khai là bàn phím, kể cả chuột kiêm bàn phím. Trên loại chuột đó, tính năng bấm chuột để ngắt từ không chạy nữa.

Máy từng cài Lotus, bản gốc hoặc bản fork trước 26/09, vẫn còn `uinput_proxy` trong nhóm `input`, vì công cụ tạo tài khoản của hệ thống chỉ thêm vào nhóm chứ không gỡ ra. Cần chạy một lần, trước khi khởi động lại máy chủ nền:

```
sudo gpasswd -d uinput_proxy input
```

Các gói dựng sẵn tự làm bước này khi cài hoặc cập nhật: gói Fedora từ [#19](https://github.com/ngosen/ngosen/pull/19), các gói còn lại sau đó. Chỉ bản tự dựng từ mã mới phải chạy tay.

Kiểm theo tài khoản cũng có giá. Khi đo, một chương trình thử chạy cùng tài khoản người dùng bị bản cũ từ chối, còn bản mới nhận.

## Đã kiểm ở đâu, chưa kiểm ở đâu

Người giữ dự án chỉ vibecode dự án này: nêu việc cho trợ lý AI viết mã, rồi đo và dùng hằng ngày.

Phần lọc thiết bị đo bằng một máy chủ chạy riêng dưới tài khoản người dùng. Trước khi sửa, nó mở 12 thiết bị, trong đó có một bàn phím. Sau khi sửa chỉ còn bàn chạm và phần chuột của nó.

Điểm 7.0 và 2.0 đo ngày 06/09/2026 trên CachyOS với KDE Plasma Wayland, tức trước các thay đổi ngày 26/09; sau đó chưa đo lại. Dịch vụ đã siết được cài và chạy thật, gõ thử ra đúng chữ.

Từ tối 26/09, máy Fedora của người giữ dự án chạy bản đã sửa. Kiểm ngày 27/09: dịch vụ không còn `CAP_SYS_PTRACE`, chạy với nhóm riêng `uinput_proxy` và chỉ được đọc thiết bị nhập.

Việc số âm lớn làm chết máy chủ là kết luận từ đọc mã, chưa chạy thử từ đầu tới cuối.

Bước tự gỡ nhóm của gói Fedora mới thử trong hộp chứa (container) Fedora 44, nâng cấp từ hai bản cũ, đạt. Phần áp luật quyền lên chuột đang cắm chưa thử trên chuột thật, vì máy dựng gói không cắm chuột. Tính tới 04/10, gói có bước tự gỡ chưa được cài trên máy Fedora thật.

Trên CachyOS, ngày 04/10 người giữ dự án cập nhật từ mã, chạy lệnh gỡ nhóm và báo dùng được; lần đó không lưu đầu ra để đối chiếu. Phần sửa cho OpenRC và runit, hai trình quản lý dịch vụ khác, chưa thử.
