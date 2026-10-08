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

// Machines the input method itself runs on, as the opening of README.md lists them. Unlike
// DISTRIBUTIONS this is about where people type, not which prebuilt package was tried.
export const MACHINES: { name: string; level: Extract<Level, 'daily' | 'vm'>; desktop: string }[] = [
  { name: 'Fedora 44', level: 'daily', desktop: 'KDE Plasma, Wayland' },
  { name: 'CachyOS', level: 'daily', desktop: 'KDE Plasma, Wayland' },
  { name: 'Ubuntu 26.04', level: 'vm', desktop: 'GNOME, Wayland' },
  { name: 'CachyOS', level: 'vm', desktop: 'Hyprland' },
  { name: 'MX Linux', level: 'vm', desktop: 'Xfce, X11' },
  { name: 'Linux Mint', level: 'vm', desktop: 'Cinnamon, X11' },
];

// Mirrors the "Roadmap: Ngó Sen 1.0" section of README.md; `status` is what is already shipped.
export const ROADMAP: { goal: string; detail: string; status: string; done: boolean }[] = [
  {
    goal: 'Bỏ máy chủ nền uinput',
    detail:
      'Bộ gõ không còn chương trình chạy ngầm có quyền đặc biệt. Cài xong là gõ, không phải bật dịch vụ, không cần quyền thiết bị.',
    status: 'Xong ở bản 0.5.0. Cập nhật từ bản cũ thì gói tự tắt và dọn dịch vụ cũ.',
    done: true,
  },
  {
    goal: 'Chỉ còn hai chế độ gõ: Gõ Sen và Preedit',
    detail:
      'Cùng chế độ Emoji để chọn biểu tượng cảm xúc. Người dùng không còn phải chọn giữa nhiều chế độ khó hiểu.',
    status: 'Đã gộp chế độ Surrounding Text vào Gõ Sen.',
    done: false,
  },
  {
    goal: 'Lõi ghép dấu chuyển sang Rust',
    detail: 'Phần biến tieengs thành tiếng (bamboo-core) đổi từ Go sang Rust. Chỉ đổi khi bản mới gõ ra y hệt bản cũ.',
    status: 'Gói Fedora, Arch, openSUSE và Ubuntu 24.04 trở lên đã dùng lõi Rust.',
    done: false,
  },
  {
    goal: 'Tách lõi Ngó Sen để dùng được ở nhiều nơi',
    detail:
      'Ngoài fcitx5 sẽ có bản cho IBus (bộ gõ mặc định của GNOME và Ubuntu) và cho các môi trường dùng wlroots như Sway.',
    // From CHANGELOG.md 0.5.0-1 (#47–#66): the core is split out, no IBus build yet.
    status: 'Phần gõ đã tách thành thư viện riêng, không nối với fcitx5. Chưa có bản IBus.',
    done: false,
  },
];

export const NAV = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/khac-gi-ban-goc/', label: 'Khác gì bản gốc' },
  { href: '/blog/', label: 'Blog' },
  { href: '/en/', label: 'English' },
];
