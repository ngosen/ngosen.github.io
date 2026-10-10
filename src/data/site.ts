export const REPO = 'https://github.com/ngosen/ngosen';
// Pull requests up to 1.0.0-1 live in the old fork, archived when the project left the
// fcitx5-lotus fork network; the new repository numbers its pull requests from #1 again.
export const ARCHIVE_REPO = 'https://github.com/ngosen/ngosen-fork-archive';
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
    version: '1.1.0-1',
    date: '10/10/2026',
    summary:
      'Bản 1.1: file cài vào máy mang tên ngosen, cấu hình cũ tự chuyển sang. Có icon khay mới và nhật ký gõ để gửi kèm khi báo lỗi.',
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
      'Bản 1.0: Ngó Sen chỉ làm cho fcitx5. Click sang ô khác rồi gõ nay ra đúng trong LibreOffice Calc, WPS Office và Google Sheets.',
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
    summary: 'Bản đầu tiên đánh số riêng: bỏ uinput server, gom chế độ gõ vào Gõ Sen, lõi ghép dấu Rust.',
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
  'Mức đã test lấy từ lần test bản 0.5. Các bản sửa bảng tính trong 1.0 được test trên máy ảo CachyOS (KDE Wayland), với LibreOffice Calc, WPS Office và Google Sheets trong Firefox. Bản 1.1 đổi tên các file cài vào máy. Lần cập nhật từ 1.0.0-1 được test trên máy ảo Linux Mint 22 (Cinnamon X11): cấu hình cũ được chép sang, bộ gõ vẫn nằm trong danh sách và gõ ra đúng chữ.';

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
];

// Mirrors the "Chỉ cho fcitx5" section of README.md, which replaced the roadmap.
export const SCOPE = {
  title: 'Chỉ cho fcitx5',
  text: 'Ngó Sen chỉ làm cho fcitx5. Bản IBus và bản chạy thẳng trên Sway, Hyprland mà không qua fcitx5 đã bỏ; trên Sway và Hyprland vẫn gõ được qua fcitx5.',
  branch: 'feat/ibus-engine',
};

export const NAV = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/khac-gi-ban-goc/', label: 'Khác gì bản gốc' },
  { href: '/blog/', label: 'Blog' },
  { href: '/en/', label: 'English' },
];
