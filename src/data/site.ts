export const REPO = 'https://github.com/ngosen/ngosen';
// Pull requests up to 1.0.0-1 live in the old fork, archived when the project left the
// fcitx5-lotus fork network; the new repository numbers its pull requests from #1 again.
export const ARCHIVE_REPO = 'https://github.com/ngosen/ngosen-fork-archive';
// Link preview image. Bump the query after re-rendering it: Facebook, Zalo and Telegram cache
// previews by image URL.
export const OG_IMAGE = '/og.png?v=2';
export const INSTALL_COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/main/install.sh | bash';

export interface Change {
  claim: string;
  source: string;
  pr: number;
  // Repository this pr number refers to, when it differs from the release's.
  repo?: string;
}

// User-visible changes per release, newest first, picked from CHANGELOG.md.
// Internal refactors ("người dùng không thấy gì khác") stay in the changelog only.
export const RELEASES: {
  version: string;
  date: string;
  summary: string;
  changes: Change[];
  // Repository the pr numbers refer to; defaults to REPO.
  prRepo?: string;
}[] = [
  {
    version: '1.4.3-1',
    date: '17/10/2026',
    summary:
      'Version sửa lỗi: bỏ chọn “Từ điển tuỳ chỉnh” thì Ngó Sen quay về từ điển gốc trên Ubuntu 22.04, 24.04 và Debian 12, 13.',
    changes: [
      {
        claim:
          'Bỏ chọn “Từ điển tuỳ chỉnh” thì Ngó Sen quay về từ điển gốc trên distro có fcitx5 cũ hơn 5.1.13: Ubuntu 22.04, 24.04 (cả Linux Mint 22), Debian 12, 13 (cả MX Linux 25).',
        source: 'Trước đó chữ đã thêm vào từ điển tuỳ chỉnh vẫn được giữ dấu sau khi bỏ chọn.',
        pr: 111,
      },
    ],
  },
  {
    version: '1.4.2-1',
    date: '16/10/2026',
    summary:
      'Version sửa lỗi: Gõ Sen hết mất chữ trên Sway và ở ô trống trên Wayland, hết chữ lặp trong Ptyxis và GNOME Console. Có thêm gói cho máy ARM, và lệnh cài chạy được trên Kali.',
    changes: [
      {
        claim: 'Gõ Sen không còn mất chữ đầu tiên gõ vào ô trống trên Wayland, như ô hỏi của Gemini trên Chromium hay Zed.',
        source: 'Trước đó chữ có dd, ow… gõ đầu tiên trong ô trống có thể bị mất.',
        pr: 94,
      },
      {
        claim: 'Trên Sway, chữ có dấu trong app GTK và Firefox không còn bị mất khi gõ Gõ Sen.',
        source: 'Trước đó gõ “đường” ra “ường”.',
        pr: 87,
      },
      {
        claim: 'Gõ Sen trong Ptyxis, terminal mặc định của Ubuntu 26.04 và Fedora, không còn ra chữ lặp.',
        source: 'Trước đó “tieengs” ra “tieeenngss” rồi đứng.',
        pr: 74,
      },
      {
        claim: 'Gõ Sen trong GNOME Console cũng hết chữ lặp.',
        source: 'Ptyxis trên phiên X11, như KDE Plasma X11, khi máy có cài IBus cũng gõ đúng dấu.',
        pr: 81,
      },
      {
        claim: 'Lõi Rust gõ được từ dài hơn 16 phím khi đang bật tiếng Việt, như tên biến getUserNameByIdentifier.',
        source: 'Trước đó từ dài bị cắt hoặc mất phím. “tuowf” giờ ra “tườ” thay vì “từơ”. Gói dùng lõi Go không đổi.',
        pr: 78,
      },
      {
        claim: 'Kiểm tra chính tả bằng từ điển nhận cả kiểu đặt dấu cũ lẫn mới.',
        source:
          'Trước đó “chói lóa” có thể ra “chói loas”. Chỉ có ở gói lõi Rust; gói Debian 12, Debian 13 và Ubuntu 22.04 còn dùng lõi Go nên chưa có.',
        pr: 92,
      },
      {
        claim: 'Trên COSMIC, icon Ngó Sen ở khay hiện đúng.',
        source: 'Trước đó icon là một ô vuông trắng, giờ là chữ V có màu.',
        pr: 75,
      },
      {
        claim: 'Có gói cho máy ARM 64-bit (aarch64): Debian, Ubuntu, Kali và Fedora 43, 44.',
        source: 'Lệnh cài một dòng tự chọn gói theo máy.',
        pr: 86,
      },
      {
        claim: 'Lệnh cài một dòng chạy được trên Kali Linux.',
        source:
          'Kali dựa trên Debian testing nên lệnh cài lấy gói build cho Debian testing. Lệnh cài cũng không còn dừng giữa chừng trên máy X11 dùng im-config 1.1 và trên máy chưa từng chạy apt update.',
        pr: 85,
      },
      {
        claim: 'Lệnh cài không đổi phím bật tiếng Việt nữa: dùng Ctrl+Space, phím mặc định của fcitx5.',
        source: 'Máy đã được đặt Ctrl+Shift vẫn giữ nguyên. Muốn đổi phím thì vào cài đặt của fcitx5.',
        pr: 76,
      },
    ],
  },
  {
    version: '1.4.1-1',
    date: '14/10/2026',
    summary: 'Bản vá nhỏ: trên KDE Plasma (Wayland), lệnh cài tự đặt fcitx5 làm bộ gõ để app Qt gõ được tiếng Việt. Bộ gõ không đổi.',
    changes: [
      {
        claim: 'Trên KDE Plasma (Wayland), lệnh cài chọn fcitx5 làm bàn phím ảo của KDE, thêm Ngó Sen và đặt phím Ctrl+Shift.',
        source:
          'Trước đây fcitx5 vẫn tự chạy nhưng app Qt như Kate, Dolphin không gõ được tiếng Việt cho tới khi tự chọn mục Virtual Keyboard trong System Settings. Lệnh gỡ để nguyên lựa chọn này.',
        pr: 64,
      },
    ],
  },
  {
    version: '1.4.0-1',
    date: '14/10/2026',
    summary:
      'Version 1.4: lệnh cài một dòng tự đặt fcitx5 làm bộ gõ trên GNOME và Xfce, Cinnamon, MATE, có thêm lệnh gỡ, cửa sổ cấu hình bớt mục thừa.',
    changes: [
      {
        claim: 'Trên GNOME, lệnh cài tự đặt fcitx5 làm bộ gõ thay IBus và thêm Ngó Sen vào danh sách bộ gõ.',
        source:
          'Lệnh cài còn ẩn các icon fcitx5 thừa trong danh sách app và bật extension sửa lỗi gõ trên GNOME 50.0 đến 50.3. Cài xong chỉ cần đăng xuất rồi đăng nhập lại. Thêm --no-setup để chỉ cài gói như trước.',
        pr: 52,
      },
      {
        claim: 'Trên Xfce, Cinnamon, MATE (MX Linux, Linux Mint), lệnh cài cũng tự đặt fcitx5 làm bộ gõ và thêm Ngó Sen.',
        source:
          'Trên Debian và Ubuntu, lệnh cài luôn cài kèm im-config và các gói giúp app GTK, Qt gõ được qua fcitx5.',
        pr: 61,
      },
      {
        claim: 'Phím bật tiếng Việt mà lệnh cài đặt là Ctrl+Shift, thay cho Ctrl+Space.',
        source: 'Ctrl+Space là phím gợi ý code của VS Code. Ai đã tự chọn phím khác cho fcitx5 thì giữ nguyên.',
        pr: 55,
      },
      {
        claim: 'Lệnh cài có thêm --uninstall để gỡ Ngó Sen.',
        source:
          'Trên GNOME, lệnh này trả lại những gì lệnh cài đã đổi, để lần đăng nhập sau GNOME dùng lại IBus. Trên Xfce, Cinnamon, MATE, nó trả bộ gõ về mặc định của máy.',
        pr: 55,
      },
      {
        claim: 'GNOME không có khay hệ thống, như Fedora, thì lệnh cài thêm extension Input Method Panel.',
        source: 'Icon và menu bộ gõ hiện trên thanh trên cùng. Ubuntu đã có khay nên không cài thêm.',
        pr: 54,
      },
      {
        claim: 'Gỡ rồi cài lại trên GNOME không còn làm mất Ngó Sen khỏi danh sách bộ gõ.',
        source: 'Trước đó phải thêm lại Ngó Sen bằng tay sau khi cài lại.',
        pr: 60,
      },
      {
        claim: 'Cửa sổ cấu hình chung của fcitx5 không còn hiện 10 mục “Experiment” của Ngó Sen.',
        source: 'Các mục này chỉ dùng khi dò lỗi. Giá trị cũ vẫn giữ, và vẫn chỉnh được trong file ngosen.conf.',
        pr: 56,
      },
      {
        claim: 'Trang Gõ chữ bỏ mục “Đọc chữ quanh con trỏ”.',
        source:
          'Mục này mặc định tắt, và là cách chữa tạm lỗi gõ trên Messenger từ trước khi Ngó Sen có cách sửa riêng. Ai từng bật nó thì giờ gõ như mọi người khác.',
        pr: 59,
      },
    ],
  },
  {
    version: '1.3.0-1',
    date: '13/10/2026',
    summary:
      'Version 1.3: tuỳ chọn Backspace chỉ xoá dấu thanh, icon mới hai cọng ngó sen, và icon khay rõ trên panel tối.',
    changes: [
      {
        claim: 'Có tuỳ chọn “Backspace xoá dấu thanh”, mặc định tắt.',
        source:
          'Bật ở trang Gõ chữ, nhóm Cách bỏ dấu: bấm Backspace lúc đang gõ chữ “tiếng” thì ra “tiêng”. Chữ không có dấu thanh thì Backspace xoá như thường.',
        pr: 37,
      },
      {
        claim: 'Icon mới: hai cọng ngó sen chụm thành chữ V, thay cho lát củ sen 7 lỗ.',
        source: 'Cửa sổ cài đặt dùng bản đầy đủ có đổ bóng. Icon trên khay dùng bản giản lược, xám đi khi tắt tiếng Việt.',
        pr: 43,
      },
      {
        claim: 'Khay mặc định hiện icon Ngó Sen có nền màu, rõ trên panel sáng lẫn tối.',
        source:
          'Máy đã lưu cài đặt Ngó Sen thì giữ lựa chọn cũ. Muốn đổi thì bật “Sử dụng biểu tượng trạng thái Ngó Sen” trong cài đặt.',
        pr: 45,
      },
      {
        claim: 'Chữ V trên khay không còn màu đen chìm trên panel tối của Linux Mint, MX Linux và các desktop khác có panel tối.',
        source: 'Panel sáng thì chọn “Màu biểu tượng: Sáng” trong cài đặt.',
        pr: 44,
      },
      {
        claim: 'Icon trên khay cân với các icon bên cạnh, và không còn mờ trên panel Xfce.',
        source: 'Chữ V trắng cũng thành hai cọng ngó như logo.',
        pr: 46,
      },
      {
        claim: 'Cập nhật từ version trước 1.1.0 rồi chạy fcitx5 -rd không còn làm mất Ngó Sen khỏi danh sách bộ gõ.',
        source: 'Trước đó phải thêm lại Ngó Sen trong “Fcitx5 Configuration”.',
        pr: 47,
      },
      {
        claim: 'Có version thử, build tự động mỗi khi nhánh next thay đổi.',
        source:
          'Lệnh cài nằm ở trang Cài đặt. Version thử cài đè lên version chính thức được, và version chính thức sau đó vẫn tự nâng lên.',
        pr: 38,
      },
    ],
  },
  {
    version: '1.2.2-1',
    date: '11/10/2026',
    summary: 'Bản vá nhỏ: chữ “vi” thay hình bông sen cạnh con trỏ, và hết lỗi mất dấu khi gõ trên thanh địa chỉ Edge.',
    changes: [
      {
        claim: 'Khi bật Ngó Sen, ô nhỏ cạnh con trỏ hiện “vi” thay cho hình bông sen.',
        source: 'Giống bàn phím tiếng Anh hiện “us”.',
        pr: 28,
      },
      {
        claim: 'Gõ trên thanh địa chỉ Edge lúc đang có gợi ý tự điền không còn mất dấu.',
        source:
          'Trước đó gõ “ngos” có lúc vẫn ra “ngos” thay vì “ngó”, vì Ngó Sen tưởng con trỏ nhích theo gợi ý là một cú click chuột.',
        pr: 29,
      },
    ],
  },
  {
    version: '1.2.1-1',
    date: '11/10/2026',
    summary: 'Bản vá nhỏ: cửa sổ cài đặt bỏ trang Ứng dụng, còn 4 trang. Bộ gõ không đổi.',
    changes: [
      {
        claim: 'Cửa sổ cài đặt bỏ trang Ứng dụng, còn 4 trang.',
        source:
          'Chọn chế độ trong menu chế độ lúc đang ở một app thì Ngó Sen vẫn nhớ cho app đó; chọn “Chế độ gõ mặc định” trong menu đó để app quay về chế độ chung. Nút Mặc định vẫn xoá mọi chế độ đã nhớ.',
        pr: 26,
      },
    ],
  },
  {
    version: '1.2.0-1',
    date: '11/10/2026',
    summary:
      'Version 1.2: cửa sổ cài đặt mới theo giao diện máy, lưu ngay khi đổi và có Hoàn tác. Hết lỗi đảo chữ khi gõ nhanh trong gnome-terminal.',
    changes: [
      {
        claim: 'Gõ nhanh trong gnome-terminal và các app GTK3 khác không còn đảo chữ.',
        source: 'Trước đó, bấm chồng hai phím có lúc làm “rồi” ra “riồ”, “ngày” ra “ngyà”.',
        pr: 11,
      },
      {
        claim: 'Cửa sổ cài đặt lưu ngay khi đổi, không còn nút OK, Áp dụng, Huỷ.',
        source:
          'Mỗi lần lưu hiện dòng “Đã lưu” kèm nút Hoàn tác, đưa lại đúng cài đặt trước đó, kể cả luật app, gõ tắt và từ điển riêng.',
        pr: 14,
      },
      {
        claim: 'Cửa sổ cài đặt dùng giao diện của hệ thống: KDE hay GNOME, sáng hay tối.',
        source: 'Danh sách, bảng, thẻ chế độ của app và trang Giới thiệu theo theme đang dùng, thay cho màu và viền tự vẽ.',
        pr: 19,
      },
      {
        claim: 'Ô tìm ở đầu thanh bên tìm được cài đặt cả khi gõ không dấu.',
        source: 'Gõ “chinh ta” ra “Kiểm tra chính tả”. Chọn kết quả thì mở đúng trang, đúng tab và đưa con trỏ tới tuỳ chọn đó.',
        pr: 17,
      },
      {
        claim: 'Nút Mặc định đưa mọi trang về mặc định, kể cả trang chưa mở, luật cho từng app và từ điển riêng.',
        source: 'Trước đây nút này gần như không đổi gì. Sửa từ điển riêng giờ có tác dụng ngay, không phải khởi động lại fcitx5.',
        pr: 12,
      },
    ],
  },
  {
    version: '1.1.0-1',
    date: '10/10/2026',
    summary:
      'Version 1.1: file cài vào máy mang tên ngosen, cấu hình cũ tự chuyển sang. Có icon khay mới và nhật ký gõ để gửi kèm khi báo lỗi.',
    changes: [
      {
        claim: 'Cập nhật lên 1.1 không phải chỉnh lại gì: cấu hình cũ được chép sang tên mới, Ngó Sen vẫn nằm trong danh sách bộ gõ.',
        source: 'Cấu hình được chép một lần, lúc fcitx5 khởi động lần đầu sau khi cập nhật. File cấu hình cũ vẫn ở lại máy.',
        pr: 7,
      },
      {
        claim: 'Icon trên khay hệ thống được vẽ lại thành một lát cắt ngó sen.',
        source: 'Icon xám đi khi tắt gõ tiếng Việt và thành mặt cười ở chế độ Emoji. Kiểu icon chữ giữ nguyên.',
        pr: 8,
      },
      {
        claim: 'Gõ ra chữ sai thì chọn “Lưu nhật ký gõ” trong menu fcitx5 để lưu các phím vừa gõ vào một file, gửi kèm khi báo lỗi.',
        source: 'Nhật ký chỉ nằm trong bộ nhớ cho tới lúc lưu, và không ghi gì gõ trong ô mật khẩu.',
        pr: 93,
        repo: ARCHIVE_REPO,
      },
    ],
  },
  {
    version: '1.0.0-1',
    prRepo: ARCHIVE_REPO,
    date: '09/10/2026',
    summary:
      'Version 1.0: Ngó Sen chỉ làm cho fcitx5. Click sang ô khác rồi gõ nay ra đúng trong LibreOffice Calc, WPS Office và Google Sheets.',
    changes: [
      {
        claim: 'Google Sheets trên Wayland: click sang ô khác rồi gõ không còn ra lẫn chữ của ô trước.',
        source: 'Trước đó, sau vài ô, chữ ra lẫn chữ cũ và không thành tiếng Việt, như “afoc”, “ieengs”.',
        pr: 86,
      },
      {
        claim: 'LibreOffice Calc trên Wayland: click sang ô khác rồi gõ không còn mở hộp thoại “Delete Contents”.',
        source: 'Trước đó, sau một chữ có dấu, bộ gõ xoá nhầm và từ đó không gõ được tiếng Việt nữa.',
        pr: 87,
      },
      {
        claim: 'LibreOffice Calc mở thẳng trên Wayland, không qua module Qt của fcitx5, cũng không còn hai lỗi trên.',
        source: 'Trước đó chữ ra lẫn chữ của ô trước, hoặc mở hộp thoại “Delete Contents”.',
        pr: 90,
      },
      {
        claim: 'WPS Office không còn mất phím thứ hai khi gõ hai phím giống nhau liền nhau.',
        source: 'Trước đó “dd” không ra “đ”, “oo” không ra “ô”.',
        pr: 90,
      },
      {
        claim: 'WPS Office qua Xwayland: click sang ô khác rồi gõ không còn ra lẫn chữ của ô trước.',
        source: 'Bản sửa áp dụng cho mọi app X11 chạy trên phiên Wayland.',
        pr: 90,
      },
      {
        claim: 'Có gói Nix cho NixOS, build từ source của Ngó Sen.',
        source: 'Cách cài nằm trong README. CI build gói, chạy test và nạp nó vào fcitx5 trên màn hình X ảo.',
        pr: 82,
      },
    ],
  },
  {
    version: '0.5.1-1',
    prRepo: ARCHIVE_REPO,
    date: '09/10/2026',
    summary: 'Sửa lỗi chế độ Gõ Sen trên Sway và Hyprland; cài mới thì chế độ mặc định là Gõ Sen.',
    changes: [
      {
        claim: 'Chế độ Gõ Sen gõ được trên Sway, Hyprland và các compositor dùng input-method-v2.',
        source: 'Trước đó chữ đầu tiên cần thêm dấu làm bộ gõ kẹt, mọi phím sau đó không ra chữ.',
        pr: 73,
      },
      {
        claim: 'Cài mới thì chế độ mặc định là Gõ Sen thay cho Preedit.',
        source: 'Giờ khớp với chế độ mặc định trong cửa sổ cài đặt Ngó Sen. Ai đã tự chọn chế độ thì giữ chế độ đó.',
        pr: 74,
      },
    ],
  },
  {
    version: '0.5.0-1',
    prRepo: ARCHIVE_REPO,
    date: '08/10/2026',
    summary: 'Version đầu tiên đánh số riêng: bỏ uinput server, gom chế độ gõ vào Gõ Sen, lõi ghép dấu Rust.',
    changes: [
      {
        claim: 'Không còn uinput server.',
        source:
          'Bộ gõ xoá chữ cũ bằng forward key qua fcitx5, hoặc qua XTEST trên X11. Không còn service chạy nền có quyền đặc biệt, không cần quyền thiết bị.',
        pr: 43,
      },
      {
        claim: 'Chế độ gõ chỉ còn Gõ Sen và Preedit; chế độ Emoji vẫn giữ.',
        source: 'Uinput đổi tên thành Gõ Sen; Surrounding Text gộp vào Gõ Sen. Cấu hình cũ tự chuyển sang tên mới.',
        pr: 43,
      },
      {
        claim: 'Gói cho Fedora, Arch, openSUSE và Ubuntu 24.04 trở lên dùng lõi ghép dấu viết bằng Rust.',
        source: 'Debian 12, 13 và Ubuntu 22.04 vẫn dùng lõi Go. Hai lõi gõ ra chữ như nhau.',
        pr: 71,
      },
      {
        claim: 'Ubuntu 26.04 có extension sửa lỗi GNOME làm mất phím Backspace.',
        source: 'Chrome, Edge và app Electron chạy Wayland từng gõ ra “tieêngếng”. Phải bật extension một lần sau khi cài.',
        pr: 41,
      },
      {
        claim: 'Gõ nhanh trong Firefox trên GNOME không còn mất chữ.',
        source: 'Trước đó “viet” có lúc ra “v”. Ô soạn tin Facebook trên Edge cũng không còn ra “i” thay cho “đi”.',
        pr: 33,
      },
      {
        claim: 'Thanh địa chỉ Chrome, Edge và Chromium trên X11 không còn giữ dấu cũ.',
        source: 'Trước đó, gõ lại một địa chỉ đã vào trước đây có lúc ra “tiêng” thay cho “tiếng”.',
        pr: 38,
      },
      {
        claim: 'VS Code gõ được tiếng Việt khi cài bằng Flatpak, hoặc bằng gói .deb chạy Wayland.',
        source: 'Bộ gõ không còn coi việc VS Code nhích con trỏ sau mỗi phím là một cú click chuột.',
        pr: 58,
      },
    ],
  },
];

// The release whose notes the tested levels below are copied from.
export const RELEASE = RELEASES[0];

// Mirrors the paragraph under the table in packaging/release-notes.md.
export const LEVELS_NOTE =
  'Mức đã test lấy từ lần test version 0.5. Các bản sửa bảng tính trong 1.0 được test trên máy ảo CachyOS (KDE Wayland), với LibreOffice Calc, WPS Office và Google Sheets trong Firefox. Version 1.1 đổi tên các file cài vào máy. Lần cập nhật từ 1.0.0-1 được test trên máy ảo Linux Mint 22 (Cinnamon X11): cấu hình cũ được chép sang, bộ gõ vẫn nằm trong danh sách và gõ ra đúng chữ. Version 1.2 thay cửa sổ cài đặt. Lưu và Hoàn tác qua fcitx5 thật được test trên máy ảo Linux Mint 22 (Cinnamon X11), CachyOS (KDE Wayland) và Ubuntu 26.04 (GNOME Wayland). Trên máy ảo CachyOS (KDE Wayland), version 1.2 gõ ra đúng chữ trong GNOME Text Editor. Bản sửa lỗi đảo chữ trong gnome-terminal được test bằng client D-Bus giả lập và gõ tay trong gnome-terminal: không còn đảo chữ. Version 1.2.1 chỉ bỏ trang Ứng dụng khỏi cửa sổ cài đặt, bộ gõ không đổi. Cửa sổ 4 trang được mở trên máy ảo CachyOS (KDE Wayland), cả giao diện sáng và tối. Version 1.2.2 sửa nhãn cạnh con trỏ và lỗi mất dấu trên thanh địa chỉ Edge. Lỗi Edge được tái hiện bằng một test viết lại từ log gõ phím trên Fedora 44 (KDE Wayland), rồi gõ tay lại trên Edge sau khi sửa: ra đúng “ngó”, cạnh con trỏ hiện “vi”. Version 1.3.0 thêm tuỳ chọn Backspace xoá dấu thanh, được gõ tay trên Fedora 44 (KDE Wayland) với bản build từ nhánh next. Icon khay mới được xem trên máy ảo Linux Mint 22.3 (Cinnamon) và MX Linux 25.3 (Xfce). Gói Debian 13 được cài trên máy ảo MX Linux 25.3: Telex “vieejt” ra “việt” trong terminal GTK. Lần cập nhật từ 1.0.0-1 rồi chạy fcitx5 -rd cũng được test trên máy ảo MX Linux 25.3: Ngó Sen vẫn nằm trong danh sách bộ gõ. Version 1.4.0 chủ yếu đổi lệnh cài một dòng. Lệnh cài được chạy trên máy ảo Ubuntu 26.04 (GNOME Wayland), CachyOS (GNOME 51), Linux Mint (Cinnamon X11) và MX Linux 25 (Xfce X11) với bản build từ nhánh next: sau khi đăng nhập lại, Ctrl+Shift rồi Telex “tieengs vieetj” ra “tiếng việt” trong ô chữ GTK3, 3/3 lần trên mỗi máy. Lệnh gỡ được test trên Ubuntu 26.04 (IBus chạy lại) và MX Linux 25. Version 1.4.1 chỉ đổi lệnh cài, bộ gõ giữ nguyên như 1.4.0. Lệnh cài trên KDE được chạy trên máy ảo CachyOS (Plasma 6.7 Wayland) với tài khoản chưa cấu hình bộ gõ: sau khi đăng nhập lại, Ctrl+Shift rồi Telex “tieengs vieetj” ra “tiếng việt” 3/3 lần trong ô chữ Qt6 và 3/3 lần trong ô chữ GTK3; trước khi sửa, ô chữ Qt6 ra chữ thô. Với gói 1.4.0, Chrome 155, VS Code, Discord, Firefox và GNOME Text Editor (Flatpak) gõ đúng trên máy ảo Ubuntu 26.04 (GNOME Wayland); Chrome ép chạy qua Xwayland sai 5/30 lần. Version 1.4.2 là version sửa lỗi, test với bản build từ nhánh release/1.4.2. Ô hỏi của Gemini trong Chromium trên máy ảo CachyOS (Plasma Wayland): “ddown” ở đầu ô trống ra “đơn” 3/3 câu (trước khi sửa ra “n”). Trên Sway (CachyOS), dòng “dduwowngf tieengs vieetj…” ra đúng “đường tiếng việt…” trong ô chữ GTK3 và Firefox. Trên máy ảo Ubuntu 26.04 (GNOME Wayland), “ddwowngf tieengs vieetj” ra “đường tiếng việt” 2/2 lần trong Ptyxis và 2/2 lần trong GNOME Console. Gói ARM 64-bit được bạn ansidev cài và chạy trên Ubuntu 26.04 (máy ảo VMware) từ version thử. Version 1.4.3 là version sửa lỗi, test bằng gói Ubuntu 24.04 build từ PR #111 trên máy ảo Linux Mint 22.1 (Cinnamon X11, fcitx5 5.1.7): sau khi thêm “kạ” vào từ điển tuỳ chỉnh, bật “Từ điển tuỳ chỉnh” thì “kaj” ra “kạ” 2/2 lần, bỏ chọn thì ra “kaj” 2/2 lần. Cùng các bước đó với 1.4.2 thì cả hai lần đều ra “kạ”.';

// Mirrors the "Máy ARM 64-bit" row of packaging/release-notes.md, which spans several distros and cores.
export const ARM_NOTE = {
  packages:
    'Máy ARM 64-bit (aarch64) có gói .deb arm64 cho Debian, Ubuntu, Kali và gói .aarch64.rpm cho Fedora 43, 44; lệnh cài một dòng tự chọn gói theo máy.',
  tested: 'đã cài và chạy được gói ARM trên Ubuntu 26.04 (máy ảo VMware); các gói ARM khác chỉ build.',
};

// The user who tested the ARM package; linked wherever the ARM test is mentioned.
export const ARM_TESTER = { name: 'ansidev', url: 'https://github.com/ansidev' };

export type Level = 'daily' | 'vm' | 'built';

export const LEVELS: Record<Level, { label: string; meaning: string }> = {
  daily: {
    label: 'Môi trường dùng chính',
    meaning: 'Máy người giữ dự án dùng để gõ hằng ngày.',
  },
  vm: {
    label: 'Đã test',
    meaning: 'Đã gõ thử trong một số app trên máy ảo. Chưa ai dùng hằng ngày.',
  },
  built: {
    label: 'Chỉ build',
    meaning: 'Gói build được và qua test lúc build. Chưa ai gõ thử trên distro đó.',
  },
};

export type Core = 'Rust' | 'Go';

export interface Distribution {
  name: string;
  level: Level;
  // What the level rests on; shown next to the stamp so the claim carries its origin.
  basis: string;
  file: string;
  core: Core;
}

// Mirrors packaging/release-notes.md in ngosen/ngosen; the asterisk in a file name stands for the version.
export const DISTRIBUTIONS: Distribution[] = [
  {
    name: 'Fedora 44',
    level: 'daily',
    basis: 'KDE Plasma, Wayland',
    file: 'fcitx5-ngosen-*.fc44.x86_64.rpm',
    core: 'Rust',
  },
  {
    name: 'Arch, CachyOS',
    level: 'vm',
    basis: '5 app ở chế độ Gõ Sen trên máy ảo CachyOS (Hyprland)',
    file: 'fcitx5-ngosen-*-x86_64.pkg.tar.zst',
    core: 'Rust',
  },
  {
    name: 'Ubuntu 26.04',
    level: 'vm',
    basis: '9 app trên máy ảo (GNOME, Wayland), với bản tự build',
    file: 'fcitx5-ngosen_*_resolute_amd64.deb',
    core: 'Rust',
  },
  {
    name: 'Ubuntu 24.04',
    level: 'vm',
    basis: '7 app trên máy ảo Linux Mint 22 (cùng nền 24.04), với bản tự build',
    file: 'fcitx5-ngosen_*_noble_amd64.deb',
    core: 'Rust',
  },
  {
    name: 'Debian 13',
    level: 'vm',
    basis: '6 app trên máy ảo MX 25 (cùng nền Debian 13)',
    file: 'fcitx5-ngosen_*_trixie_amd64.deb',
    core: 'Go',
  },
  {
    name: 'Kali Rolling',
    level: 'vm',
    basis: 'lệnh cài chạy trên máy ảo Kali 2026.2 (Xfce X11)',
    file: 'fcitx5-ngosen_*_forky_amd64.deb',
    core: 'Rust',
  },
  {
    name: 'Fedora 43',
    level: 'built',
    basis: 'chỉ build và chạy test lúc build',
    file: 'fcitx5-ngosen-*.fc43.x86_64.rpm',
    core: 'Rust',
  },
  {
    name: 'openSUSE Tumbleweed',
    level: 'built',
    basis: 'chỉ build và chạy test lúc build',
    file: 'fcitx5-ngosen-*.opensuse-tumbleweed.x86_64.rpm',
    core: 'Rust',
  },
  {
    name: 'Ubuntu 22.04',
    level: 'built',
    basis: 'chỉ build và chạy test lúc build',
    file: 'fcitx5-ngosen_*_jammy_amd64.deb',
    core: 'Go',
  },
  {
    name: 'Debian 12',
    level: 'built',
    basis: 'chỉ build và chạy test lúc build',
    file: 'fcitx5-ngosen_*_bookworm_amd64.deb',
    core: 'Go',
  },
];

// Mirrors the opening of README.md in ngosen/ngosen (PR #75): the tagline and its points.
export const TAGLINE = 'Bộ gõ tiếng Việt cho fcitx5 trên Linux.';

export const HIGHLIGHTS: { title: string; text: string }[] = [
  {
    title: 'Không cần quyền đặc biệt',
    text: 'Ngó Sen không còn uinput server, chỉ dùng đúng quyền của fcitx5. Cài xong gõ được ngay, không phải bật service hay cấp quyền thiết bị.',
  },
  {
    title: 'Gõ thẳng, không gạch chân',
    text: 'Chế độ Gõ Sen đưa chữ vào app ngay khi gõ. Gợi ý ở thanh địa chỉ hay ô tìm kiếm hiện ra theo từng phím gõ.',
  },
  {
    title: 'Một chế độ cho hầu hết app',
    text: 'Trình duyệt, terminal, Zalo, LibreOffice đều dùng Gõ Sen. Ngó Sen tự nhận ra app nhận chữ kiểu gì, không phải đổi chế độ.',
  },
  {
    title: 'Lõi Rust',
    text: 'Phần biến tieengs thành tiếng được viết lại bằng Rust. Gói cho Fedora, Arch, openSUSE và Ubuntu 24.04 trở lên dùng lõi Rust.',
  },
  {
    title: 'Cài bằng một dòng lệnh',
    text: 'Có cho Fedora, Ubuntu, Debian, Arch, CachyOS và openSUSE. Script so hash SHA-256 trước khi cài.',
  },
  {
    title: 'Cửa sổ cài đặt theo giao diện máy',
    text: 'Sáng hay tối, KDE hay GNOME, cửa sổ dùng giao diện đang có. Đổi gì lưu ngay, có nút Hoàn tác.',
  },
];

// Mirrors the "Chỉ cho fcitx5" section of README.md, which replaced the roadmap.
export const SCOPE = {
  title: 'Chỉ cho fcitx5',
  text: 'Ngó Sen chỉ làm cho fcitx5. fcitx5 chạy được trên GNOME, KDE, Xfce lẫn Sway, Hyprland, có nhiều tính năng và nhẹ RAM. Làm cho một bộ gõ nền cũng đỡ công giữ nhiều bản.',
  branch: 'feat/ibus-engine',
};

// The install guide spans two pages; each shows both as keys above its index.
export const INSTALL_PAGES = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/cai-dat/nang-cao/', label: 'Cài nâng cao' },
];

// The usage guide, one task per page, in reading order. Groups follow the order set in AGENTS.md.
export const GUIDE = [
  {
    title: 'Gõ hằng ngày',
    pages: [
      {
        href: '/huong-dan/bat-tat-tieng-viet/',
        label: 'Bật và tắt tiếng Việt',
        summary: 'Phím Ctrl+Space, dấu hiệu đang bật, đổi phím khác.',
      },
      {
        href: '/huong-dan/kieu-go-bang-ma/',
        label: 'Chọn kiểu gõ và bảng mã',
        summary: 'Telex hay VNI, Unicode hay bảng mã cũ, gõ thử ngay trong cửa sổ cài đặt.',
      },
      {
        href: '/huong-dan/che-do-go/',
        label: 'Chọn chế độ gõ',
        summary: 'Gõ Sen hay Gạch chân, chế độ riêng cho từng app.',
      },
      {
        href: '/huong-dan/go-emoji/',
        label: 'Gõ emoji',
        summary: 'Tìm emoji bằng từ khoá ngay chỗ đang gõ.',
      },
    ],
  },
  {
    title: 'Dấu và chính tả',
    pages: [
      {
        href: '/huong-dan/cach-dat-dau/',
        label: 'Chọn cách đặt dấu',
        summary: 'Hoà hay hòa, gõ dấu ở cuối từ hay ngay sau nguyên âm.',
      },
      {
        href: '/huong-dan/sua-khi-go-sai/',
        label: 'Sửa khi gõ sai',
        summary: 'Từ tiếng Anh tự trở lại, Backspace chỉ xoá dấu, w ra ư, phím [ ] ra ơ ư.',
      },
      {
        href: '/huong-dan/kiem-tra-chinh-ta/',
        label: 'Kiểm tra chính tả',
        summary: 'Chữ không có trong từ điển, thêm chữ vào từ điển riêng.',
      },
    ],
  },
  {
    title: 'Gõ nhanh hơn',
    pages: [
      {
        href: '/huong-dan/go-tat/',
        label: 'Gõ tắt một cụm từ hay dùng',
        summary: 'Từ viết tắt thành cụm từ đầy đủ, chữ hoa, ngày giờ hôm nay.',
      },
      {
        href: '/huong-dan/tu-sua-dau-cau/',
        label: 'Tự sửa dấu câu',
        summary: 'Hai gạch nối thành gạch dài, hai dấu cách thành dấu chấm, viết hoa đầu câu.',
      },
    ],
  },
  {
    title: 'Tuỳ chỉnh',
    pages: [
      {
        href: '/huong-dan/phim-tat-che-do/',
        label: 'Đổi phím tắt của chế độ gõ',
        summary: 'Đổi phím trong menu chế độ, ẩn chế độ không dùng, phím chuyển nhanh.',
      },
      {
        href: '/huong-dan/keymap/',
        label: 'Tự đặt phím bỏ dấu',
        summary: 'Keymap riêng: phím nào thêm dấu nào, dựa trên Telex hay VNI.',
      },
      {
        href: '/huong-dan/icon-khay/',
        label: 'Đổi icon trên khay',
        summary: 'Icon Ngó Sen có nền hay chữ V, màu chữ V theo panel sáng hay tối.',
      },
      {
        href: '/huong-dan/tim-sao-luu/',
        label: 'Tìm cài đặt, hoàn tác và sao lưu',
        summary: 'Ô tìm cài đặt, nút Hoàn tác, Mặc định, Sao lưu và Khôi phục.',
      },
    ],
  },
];

export const GUIDE_PAGES = GUIDE.flatMap((group) => group.pages);

// Mirrors ROADMAP.md on main of the main repository; change them together. Backticks mark typed text.
// `version` is set only for work with a GitHub milestone; `refs` are issue or PR numbers.
export const ROADMAP_FILE = `${REPO}/blob/main/ROADMAP.md`;

export const ROADMAP: {
  version?: string;
  items: { text: string; refs?: number[] }[];
}[] = [
  {
    version: '1.5.0',
    items: [
      {
        text: 'Nút “Kiểm tra máy tôi…” trong cửa sổ cài đặt: xem fcitx5 và Ngó Sen đã cài đúng chưa, lỗi nào cũng kèm cách sửa, và test được một app gõ đúng hay sai.',
        refs: [88, 90],
      },
      {
        text: 'Gộp “Kiểm tra chính tả” vào “Tự khôi phục từ gõ sai”, vì nó chỉ có tác dụng khi Tự khôi phục đang bật.',
        refs: [112],
      },
    ],
  },
  {
    version: '1.6.0',
    items: [
      {
        text: 'Cứu chữ: quên bật tiếng Việt mà đã gõ `tieengs vieetj`, bấm phím chuyển sang Ngó Sen là chữ thành `tiếng việt`.',
        refs: [71, 80, 82, 83],
      },
      {
        text: 'Cứu dấu: sửa dấu chữ đã gõ xong. Bôi đen chữ, gõ dấu rồi bấm Tab (`nhanh` + `s` → `nhánh`). Ở app hỗ trợ surrounding text, chỉ cần click vào chữ rồi gõ dấu.',
        refs: [118],
      },
    ],
  },
  {
    version: '1.7.0',
    items: [{ text: 'Làm lại cách chèn emoji.', refs: [110] }],
  },
  {
    items: [
      { text: 'Chữ tiếng Anh có chữ cái đôi không còn mất phím khi trả về: `affect` không thành `afect`, `coffee` không thành `cofee`.' },
      { text: 'Bớt đổi nhầm chữ tiếng Anh thành tiếng Việt, như `nest` thành `nét`, `too` thành `tô`.' },
      { text: 'Đoán dấu: gõ cả câu không dấu rồi bấm một phím để thêm dấu.' },
      { text: 'Bôi đen một đoạn rồi thêm dấu, bỏ dấu, hoặc chuyển chữ mã cũ (TCVN3, VNI) sang Unicode.' },
      { text: 'Sửa lỗi gõ vội, như `tiếgn` thành `tiếng`.' },
      { text: 'Tự chạy “Kiểm tra máy tôi” lần đầu mở cửa sổ cài đặt. Có thêm bảng các app gõ được, lấy từ kết quả test người dùng gửi về.' },
      { text: 'Đưa Ngó Sen vào kho phần mềm của các distro: nixpkgs và AUR trước, rồi COPR, PPA, OBS, sau cùng là Debian.' },
    ],
  },
];

export const NAV = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/huong-dan/', label: 'Hướng dẫn' },
  { href: '/blog/', label: 'Blog' },
  { href: '/en/', label: 'English' },
];
