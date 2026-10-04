---
title: "Đóng gói cho mười bản Linux: thử trong container nói được gì"
description: "Ngó Sen có gói cài sẵn cho mười bản Linux và một dòng lệnh cài. Phép thử trong container đã chỉ ra gì, và điều gì nó không trả lời được."
pubDate: 2026-10-04
---

Cho tới giờ, cài Ngó Sen nghĩa là tự dựng từ mã nguồn. Dự án nay có gói cài sẵn cho mười bản Linux: Fedora 43 và 44, Ubuntu 22.04, 24.04 và 26.04, Debian 12 và 13, Arch, CachyOS, openSUSE Tumbleweed. Các gói được đính kèm vào bản phát hành trên GitHub, cùng một dòng lệnh để cài.

Người giữ dự án chỉ dùng hằng ngày hai trong mười bản đó. Với các bản còn lại, gói mới qua bước dựng và các phép thử trong container, tức một hệ điều hành thu nhỏ dựng lên để thử rồi xoá đi.

## Ghi dự đoán trước, chạy sau

Người giữ dự án chỉ vibecode dự án này: nêu việc cho trợ lý AI viết mã, rồi đo và dùng thử hằng ngày.

Trước mỗi lượt thử, kết quả mong đợi được ghi ra: lệnh nào phải chạy được, lệnh nào phải bị từ chối, cài xong thì máy ở trạng thái nào. Lượt nào lệch dự đoán thì coi như chưa chứng minh được gì.

Cách này giống thử cân bằng quả cân đã biết trọng lượng. Đặt quả một ký lên mà cân báo một ký hai thì biết ngay cân sai. Không biết trước thì con số nào cũng có vẻ hợp lý.

Riêng trình cài có 16 kịch bản trong container. Sau lần sửa cuối, tất cả được chạy lại và đều khớp dự đoán.

## Container đã chỉ ra những gì

Ngó Sen thay cho bộ gõ gốc `fcitx5-lotus`, hai gói không cài chung được. Nhiều kịch bản vì thế hỏi cùng một câu: máy đang có gói cũ thì sao?

Trên Fedora và openSUSE, trình quản lý gói (chương trình cài và gỡ phần mềm của hệ thống) là `dnf` và `zypper`. Cả hai từ chối cài khi máy đang có `fcitx5-lotus` của bản gốc ở phiên bản cao hơn. Lúc viết bài, bản gốc ở 4.0.1, còn gói Ngó Sen mang số 3.5.10. Trình cài xử lý trường hợp này.

Trên Arch, lệnh `pacman -U --noconfirm` tự trả lời "không" khi được hỏi có gỡ gói xung đột hay không. Bản đầu của trình cài gỡ gói cũ trước, rồi mới cài gói mới.

Một phép thử cố ý làm thiếu một gói phụ thuộc cho thấy hậu quả: bước cài hỏng, máy mất cả hai gói. Trình cài được sửa để gỡ và cài trong một giao dịch, giống chuyển khoản ngân hàng: hoặc xong trọn, hoặc mọi thứ ở nguyên chỗ cũ. Chạy lại đúng phép thử đó, máy vẫn giữ gói cũ.

Một bản tự dựng từ mã trên Arch còn để lại những tệp không thuộc gói nào. Gặp chúng, `pacman` từ chối với 144 dòng báo tệp đã tồn tại. Trình cài chỉ cho ghi đè đúng những đường dẫn mà gói mang theo.

## Khi chính dụng cụ đo sai

Lệnh `dpkg -V` và `pacman -Qkk` so tệp trên đĩa với nội dung gói. Lần chạy đầu, chúng báo một tệp bị thay đổi: tệp dịch tiếng Việt. Ảnh container (bản mẫu dùng để dựng container) của Ubuntu và Arch được cấu hình để lặng lẽ bỏ tệp dịch khi cài. Gói `fcitx5` có sẵn của Ubuntu cũng bị báo y như vậy. Phép thử giờ gỡ quy tắc ấy trước khi chạy.

Hai kịch bản của trình cài lúc đầu không thử được gì. Trên openSUSE, gói giả đóng vai bản gốc bị tìm sai thư mục. Ở kịch bản Debian 11, bản chưa có gói, container không cài được `curl` nên trình cài dừng vì một lý do khác.

Một phép thử "phải dừng" mà dừng thật vẫn có thể vô nghĩa nếu nó dừng sai lý do.

## Điều container không trả lời được

Container cho biết gói cài vào được, thay được gói cũ và giữ cấu hình của người dùng. Nó không cho biết gõ tiếng Việt có chạy trong ứng dụng hay không. Chưa ai gõ thử trên Debian, Ubuntu, openSUSE hay Arch bằng các gói này. Mức đã thử của từng bản:

- Fedora 44 với KDE Plasma Wayland: dùng hằng ngày.
- CachyOS với KDE Plasma Wayland: dùng hằng ngày bằng bản tự dựng từ mã. Gói chung cho Arch và CachyOS mới cài thử trong container.
- Ubuntu 24.04 với GNOME X11: dùng sơ bằng bản tự dựng. Gói mới cài thử trong container.
- Fedora 43 và openSUSE Tumbleweed: chỉ dựng và cài thử trong container.
- Ubuntu 22.04, 26.04 và Debian 12, 13: chỉ dựng.

Container cũng thiếu thiết bị thật, nên máy chủ nền (chương trình chạy ngầm bấm phím xoá thay bộ gõ) không khởi động được trong đó.

Quy trình phát hành chỉ chạy khi có thẻ phát hành, nên lần chạy thật đầu tiên của nó chính là bản phát hành đầu tiên. Trình cài cũng chưa được thử trên máy thật.

## Dòng lệnh cài làm gì

```
curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/ban-dung/install.sh | bash
```

Trình cài đọc tên bản phân phối, tức bản Linux đang chạy trên máy, rồi tìm gói tương ứng trong bản phát hành mới nhất trên GitHub. Nó nói rõ sẽ làm gì và hỏi lại.

Đồng ý thì nó tải gói và đối chiếu mã băm SHA-256, một dãy ký tự đóng vai dấu vân tay của tệp, với danh sách công bố kèm bản phát hành. Mã băm lệch thì nó dừng, không cài gì. Khớp thì nó cài bằng trình quản lý gói của máy, rồi bật máy chủ nền cho tài khoản đang gọi lệnh. Gói `fcitx5-lotus` nếu có sẽ bị thay, cấu hình bộ gõ giữ nguyên.

Gói chưa được ký. Mã băm bắt được tệp tải lỗi hoặc tải dở. Nó không bảo vệ được khi chính bản phát hành bị kẻ khác chiếm, vì trình cài, danh sách mã băm và gói đều đến từ GitHub.

Kết quả từng phép thử nằm trong mô tả các thay đổi [#23](https://github.com/ngosen/ngosen/pull/23), [#24](https://github.com/ngosen/ngosen/pull/24), [#25](https://github.com/ngosen/ngosen/pull/25) và [#26](https://github.com/ngosen/ngosen/pull/26).
