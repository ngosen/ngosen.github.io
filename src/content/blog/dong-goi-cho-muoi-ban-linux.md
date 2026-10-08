---
title: "Đóng gói cho mười bản Linux: thử trong container nói được gì"
description: "Ngó Sen có gói cài sẵn cho mười bản Linux và một dòng lệnh cài. Trình cài được thiết kế thế nào, và test trong container không trả lời được gì."
pubDate: 2026-10-04
outdated: "Mức đã test trong bài là của bản 3.5.10-4. Bản mới có mức khác, xem bảng ở trang Cài đặt. Lệnh cài nay lấy script từ nhánh main, và máy chủ nền đã bỏ từ bản 0.5.0."
---

Trước đây, cài Ngó Sen nghĩa là tự build từ source. Nay dự án có gói cài sẵn cho mười bản Linux: Fedora 43 và 44, Ubuntu 22.04, 24.04 và 26.04, Debian 12 và 13, Arch, CachyOS, openSUSE Tumbleweed. Gói nằm trong mỗi bản release trên GitHub, kèm một dòng lệnh cài.

## Trình cài làm gì

Trình cài đọc tên distro rồi tìm gói tương ứng trong bản release mới nhất. Nó nói rõ sẽ làm gì và hỏi lại trước khi làm. Đồng ý thì nó tải gói, so hash SHA-256 với danh sách công bố kèm bản release, rồi cài bằng trình quản lý gói của máy. Hash lệch thì nó dừng, không cài gì.

Hash bắt được file tải lỗi hoặc tải dở. Nó không bảo vệ được khi chính bản release bị kẻ khác chiếm, vì trình cài, danh sách hash và gói đều đến từ GitHub. Gói hiện chưa được ký.

## Thay bộ gõ cũ mà không làm hỏng máy

Ngó Sen thay cho `fcitx5-lotus`, hai gói không cài chung được. Nên câu hỏi quan trọng nhất là: máy đang có gói cũ thì sao?

Trong một lần test, cố ý làm thiếu một gói phụ thuộc, bước cài hỏng và máy mất cả hai gói. Từ đó trình cài gỡ gói cũ và cài gói mới **trong cùng một giao dịch**, giống chuyển khoản ngân hàng: hoặc xong trọn, hoặc mọi thứ ở nguyên chỗ cũ. Chạy lại đúng lần test đó, máy vẫn giữ gói cũ. Cấu hình bộ gõ giữ nguyên.

Trình cài cũng xử lý vài trường hợp riêng. Trên Fedora và openSUSE, `dnf` và `zypper` từ chối cài khi `fcitx5-lotus` của bản gốc mang số phiên bản cao hơn. Trên Arch, file còn sót của một bản tự build làm `pacman` từ chối cài; trình cài chỉ cho ghi đè đúng các file mà gói mang theo.

## Container không trả lời được gì

Container là một hệ điều hành thu nhỏ, dựng lên để test rồi xoá đi. Mỗi lượt test đều ghi kết quả mong đợi trước rồi mới chạy. Lượt nào lệch thì coi như chưa chứng minh được gì.

Container cho biết gói cài được, thay được gói cũ và giữ cấu hình. Nó không cho biết gõ tiếng Việt trong app có chạy hay không. Gói build được chưa có nghĩa là gõ được, nên mức test của từng distro được ghi riêng.

Xem [trang Cài đặt](/cai-dat/) để có lệnh cài và mức test hiện tại.
