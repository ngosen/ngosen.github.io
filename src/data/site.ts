export const REPO = 'https://github.com/ngosen/ngosen';
export const INSTALL_COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/main/install.sh | bash';

export interface Change {
  claim: string;
  source: string;
  pr: number;
}

// User-visible changes per release, newest first, picked from CHANGELOG.md.
// Internal refactors ("người dùng không thấy gì khác") stay in the changelog only.
export const RELEASES: { version: string; date: string; summary: string; changes: Change[] }[] = [
  {
    version: '0.5.1-1',
    date: '09/10/2026',
    summary: 'Sửa lỗi Gõ Sen trên Sway và Hyprland, và cài mới thì dùng Gõ Sen luôn.',
    changes: [
      {
        claim: 'Gõ Sen gõ được trên Sway, Hyprland và các WM dùng input-method-v2.',
        source: 'Trước đó chữ đầu tiên cần thêm dấu làm bộ gõ kẹt, mọi phím sau đó không ra chữ.',
        pr: 73,
      },
      {
        claim: 'Cài mới thì chế độ mặc định là Gõ Sen thay cho Preedit.',
        source: 'Khớp với cửa sổ cài đặt. Ai đã chọn chế độ thì giữ nguyên.',
        pr: 74,
      },
    ],
  },
  {
    version: '0.5.0-1',
    date: '08/10/2026',
    summary: 'Bản đầu tiên đánh số riêng: bỏ uinput server, gom chế độ gõ vào Gõ Sen, lõi ghép dấu Rust.',
    changes: [
      {
        claim: 'Không còn uinput server.',
        source:
          'Bộ gõ xoá chữ cũ bằng forward key qua fcitx5, hoặc qua XTEST trên X11. Không còn chương trình chạy ngầm có quyền đặc biệt, không cần quyền thiết bị.',
        pr: 43,
      },
      {
        claim: 'Chỉ còn hai chế độ gõ: Gõ Sen và Preedit, cùng chế độ Emoji.',
        source: 'Uinput đổi tên thành Gõ Sen; Surrounding Text gộp vào Gõ Sen. Cấu hình cũ tự chuyển sang tên mới.',
        pr: 43,
      },
      {
        claim: 'Lõi ghép dấu viết bằng Rust trong gói Fedora, Arch, openSUSE và Ubuntu 24.04 trở lên.',
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
        source: 'Gõ lại một địa chỉ đã từng vào từng ra “tiêng” thay cho “tiếng”.',
        pr: 38,
      },
      {
        claim: 'VS Code bản Flatpak, và bản .deb chạy Wayland, gõ được tiếng Việt.',
        source: 'Bộ gõ không còn coi việc VS Code nhích con trỏ sau mỗi phím là một cú bấm chuột.',
        pr: 58,
      },
    ],
  },
];

// The release whose notes the tested levels below are copied from.
export const RELEASE = RELEASES[0];

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
    basis: 'gói build sẵn',
    file: 'fcitx5-ngosen-*.fc43.x86_64.rpm',
    core: 'Rust',
  },
  {
    name: 'openSUSE Tumbleweed',
    level: 'built',
    basis: 'gói build sẵn',
    file: 'fcitx5-ngosen-*.opensuse-tumbleweed.x86_64.rpm',
    core: 'Rust',
  },
  {
    name: 'Ubuntu 22.04',
    level: 'built',
    basis: 'gói build sẵn',
    file: 'fcitx5-ngosen_*_jammy_amd64.deb',
    core: 'Go',
  },
  {
    name: 'Debian 12',
    level: 'built',
    basis: 'gói build sẵn',
    file: 'fcitx5-ngosen_*_bookworm_amd64.deb',
    core: 'Go',
  },
];

// Mirrors the opening of README.md in ngosen/ngosen (PR #75): the tagline and its points.
export const TAGLINE = 'Bộ gõ tiếng Việt tối ưu cho Linux.';

export const HIGHLIGHTS: { title: string; text: string }[] = [
  {
    title: 'Bỏ hẳn uinput server',
    text: 'Ngó Sen chỉ dùng đúng quyền của fcitx5. Cài xong là gõ, không bật dịch vụ, không cấp quyền thiết bị.',
  },
  {
    title: 'Gõ thẳng, không gạch chân',
    text: 'Chế độ Gõ Sen đưa chữ vào app ngay khi gõ. Ô gợi ý của thanh địa chỉ hay ô tìm kiếm chạy theo từng phím.',
  },
  {
    title: 'Một chế độ cho mọi app',
    text: 'Trình duyệt, terminal, Zalo, LibreOffice đều dùng Gõ Sen. Ngó Sen tự nhận ra app nhận chữ kiểu gì, không phải đổi chế độ.',
  },
  {
    title: 'Lõi Rust',
    text: 'Phần biến tieengs thành tiếng được viết lại bằng Rust. Gói cho Fedora, Arch, openSUSE và Ubuntu 24.04 trở lên dùng lõi Rust.',
  },
  {
    title: 'Cài bằng một dòng lệnh',
    text: 'Trên Fedora, Ubuntu, Debian, Arch, CachyOS, openSUSE; script kiểm hash trước khi cài.',
  },
];

// Mirrors the "Chỉ cho fcitx5" section of README.md, which replaced the roadmap.
export const SCOPE = {
  title: 'Chỉ cho fcitx5',
  text: 'Ngó Sen chỉ làm cho fcitx5. Bản IBus và bản chạy thẳng trên Sway, Hyprland đã thôi làm: mỗi bộ gõ nền cần thử lại từng app, và một người không giữ nổi hai ba bản cùng lúc. Trên GNOME và Ubuntu, cài fcitx5 cùng Ngó Sen là gõ được.',
  branch: 'feat/ibus-engine',
};

export const NAV = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/khac-gi-ban-goc/', label: 'Khác gì bản gốc' },
  { href: '/blog/', label: 'Blog' },
  { href: '/en/', label: 'English' },
];
