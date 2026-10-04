export const REPO = 'https://github.com/ngosen/ngosen';
export const INSTALL_COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/ban-dung/install.sh | bash';

export type Level = 'daily' | 'light' | 'container' | 'built';

export const LEVELS: Record<Level, { label: string; meaning: string }> = {
  daily: {
    label: 'Dùng hằng ngày',
    meaning: 'Người giữ dự án gõ trên máy này mỗi ngày.',
  },
  light: {
    label: 'Mới dùng sơ',
    meaning: 'Đã gõ thử trên máy thật, chưa dùng hằng ngày và chưa thử kỹ.',
  },
  container: {
    label: 'Cài thử trong container',
    meaning: 'Gói dựng được và cài được trong một hệ thống thử dùng xong bỏ. Chưa ai gõ trên máy thật.',
  },
  built: {
    label: 'Chỉ dựng',
    meaning: 'Gói dựng được và qua bộ kiểm lúc dựng. Chưa cài thử, chưa ai gõ.',
  },
};

export interface Distribution {
  name: string;
  level: Level;
  // What the level rests on; shown next to the stamp so the claim carries its origin.
  basis: string;
}

// Mirrors packaging/release-notes.md in ngosen/ngosen.
export const DISTRIBUTIONS: Distribution[] = [
  { name: 'Fedora 44', level: 'daily', basis: 'KDE Plasma, Wayland' },
  {
    name: 'CachyOS',
    level: 'daily',
    basis: 'KDE Plasma, Wayland, với bản tự dựng từ mã; gói dựng sẵn mới cài thử trong container',
  },
  {
    name: 'Ubuntu 24.04',
    level: 'light',
    basis: 'GNOME, X11, với bản tự dựng từ mã; gói dựng sẵn mới cài thử trong container',
  },
  { name: 'Arch', level: 'container', basis: 'cùng gói với CachyOS' },
  { name: 'Fedora 43', level: 'container', basis: 'gói dựng sẵn' },
  { name: 'openSUSE Tumbleweed', level: 'container', basis: 'gói dựng sẵn' },
  { name: 'Ubuntu 22.04', level: 'built', basis: 'gói dựng sẵn' },
  { name: 'Ubuntu 26.04', level: 'built', basis: 'gói dựng sẵn' },
  { name: 'Debian 12', level: 'built', basis: 'gói dựng sẵn' },
  { name: 'Debian 13', level: 'built', basis: 'gói dựng sẵn' },
];

export const NAV = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/khac-gi-ban-goc/', label: 'Khác gì bản gốc' },
  { href: '/blog/', label: 'Blog' },
  { href: '/en/', label: 'English' },
];
