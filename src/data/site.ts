export const REPO = 'https://github.com/ngosen/ngosen';
export const INSTALL_COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/main/install.sh | bash';

// The release whose notes the tested levels below are copied from.
export const RELEASE = { version: '0.5.0-1', date: '08/10/2026' };

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
    basis: '5 app trên máy ảo CachyOS (Hyprland), cài bằng install.sh',
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
    title: 'Không chạy ngầm với quyền root',
    text: 'Bỏ hẳn uinput server, Ngó Sen chỉ dùng đúng quyền của fcitx5. Cài xong là gõ, không bật dịch vụ, không cấp quyền thiết bị.',
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
  {
    title: 'Chuyển từ fcitx5-lotus không mất gì',
    text: 'Gói tự thay bản cũ, giữ nguyên cấu hình, chế độ cũ tự chuyển sang Gõ Sen.',
  },
];

// Mirrors the "Roadmap" section of README.md.
export const ROADMAP: { goal: string; detail: string }[] = [
  {
    goal: 'IBus',
    detail:
      'Bản cho GNOME và Ubuntu, nơi IBus là bộ gõ mặc định, không phải cài thêm fcitx5. Gói ibus-ngosen; install.sh sẽ hỏi chọn bản nào.',
  },
  {
    goal: 'wlroots, không cần fcitx5',
    detail: 'Ngó Sen chạy thẳng trên Sway, Hyprland, river, labwc, Wayfire, gọn nhẹ hơn cài cả fcitx5.',
  },
];

export const NAV = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/khac-gi-ban-goc/', label: 'Khác gì bản gốc' },
  { href: '/blog/', label: 'Blog' },
  { href: '/en/', label: 'English' },
];
