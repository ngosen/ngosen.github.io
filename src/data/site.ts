export const REPO = 'https://github.com/ngosen/ngosen';
// Pull requests up to 1.0.0-1 live in the old fork, archived when the project left the
// fcitx5-lotus fork network; the new repository numbers its pull requests from #1 again.
export const ARCHIVE_REPO = 'https://github.com/ngosen/ngosen-fork-archive';
// Link preview image. Bump the query after re-rendering it: Facebook, Zalo and Telegram cache
// previews by image URL.
export const OG_IMAGE = '/og.png?v=4';
// The project's Facebook Page; it posts new versions and blog posts.
export const FACEBOOK = 'https://www.facebook.com/profile.php?id=61595753582618';
export const INSTALL_COMMAND =
  'curl -fsSL https://raw.githubusercontent.com/ngosen/ngosen/main/install.sh | bash';
export const UNINSTALL_COMMAND = `${INSTALL_COMMAND} -s -- --uninstall`;

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
    version: '1.9.0-1',
    date: '08/11/2026',
    summary:
      'GNOME tắt extension vẫn nhớ chế độ gõ và cài đặt riêng theo từng app; lệnh cài không còn tự bật extension khi portal báo được tên app. Gõ Sen hiện dấu ngay trong terminal và bớt khựng trong Firefox trên Hyprland, Sway. Gõ -- trong terminal và ô địa chỉ giữ nguyên.',
    changes: [
      {
        claim: 'GNOME Wayland với fcitx5 cũ hơn 5.1.22 (Ubuntu 24.04, 26.04): tắt extension vẫn giữ chế độ gõ và cài đặt riêng theo từng app; Ngó Sen lấy tên app từ gói xdg-desktop-portal-gnome.',
        source: 'App không có file .desktop vẫn cần extension. Ô tìm kiếm trong màn tổng quan GNOME được nhận ra ở mọi version fcitx5, kể cả khi tắt extension.',
        pr: 621,
      },
      {
        claim: 'GNOME 46 đến 49 và từ 50.4 với fcitx5 cũ hơn 5.1.22: lệnh cài không còn tự bật extension Ngó Sen khi máy có gói xdg-desktop-portal-gnome; máy đã bật thì để nguyên.',
        source: 'Lệnh cài vẫn tự bật extension trên GNOME 50.0 đến 50.3 hoặc khi máy không có gói này. Trang Kiểm tra máy báo khi portal chưa cho Ngó Sen biết tên app và gợi ý bật extension. Lệnh cài và trang Kiểm tra máy chưa được test lại trên gói 1.9.0-1.',
        pr: 629,
      },
      {
        claim: 'Gõ Sen hiện chữ ngay khi thêm dấu trong kitty, Ptyxis, GNOME Terminal, foot, Ghostty trên Hyprland và trong xterm; trên GNOME, trong Ptyxis, GNOME Console và GNOME Terminal.',
        source: 'Trên GNOME đúng cả khi bật hay tắt extension Ngó Sen (#630). Terminal chưa được test lại trên gói 1.9.0-1.',
        pr: 620,
      },
      {
        claim: 'Gõ Sen nhanh trong Firefox trên Hyprland và Sway bớt khựng: khi app báo chữ chậm, phím thêm dấu sửa luôn phần chữ chưa gửi, không phải xoá bằng Backspace rồi gõ lại.',
        source: 'Gồm #607: trên Hyprland, Sway và KDE Plasma, Ngó Sen quay lại chờ chữ của Firefox khi app phản hồi kịp trở lại. Sway, Hyprland chưa được test lại trên gói 1.9.0-1.',
        pr: 623,
      },
      {
        claim: 'Bật “Hai gạch nối thành gạch dài” thì gõ -- trong terminal hay ô địa chỉ vẫn giữ nguyên, nên “git push --force” không còn thành “git push —force”.',
        source: 'Ô địa chỉ của Firefox và terminal không tự báo mình là terminal (như terminal trong VS Code) chưa nhận ra được.',
        pr: 625,
      },
      {
        claim: 'GNOME: Ngó Sen nhận ra Firefox cài từ gói Fedora, Mullvad Browser cài từ gói và các bản Flatpak của Firefox và trình duyệt dựa trên Firefox, để chữ gõ trong thanh địa chỉ không lẫn với autofill.',
        source: 'Fedora chưa được test lại trên gói 1.9.0-1.',
        pr: 634,
      },
    ],
  },
  {
    version: '1.8.3-1',
    date: '08/11/2026',
    summary:
      'Khi bật gõ tắt, gõ từ không phải tiếng Việt liền chữ số hết bị thêm dấu. Đổi dấu sau phụ âm cuối vẫn ra đúng chữ tiếng Việt khi chốt từ.',
    changes: [
      {
        claim: 'Khi bật gõ tắt, gõ từ không phải tiếng Việt liền chữ số không còn bị thêm dấu: “Sose2026” giữ nguyên, không thành “Sóe2026”.',
        source: 'Từ tiếng Việt liền số như “tôi2” vẫn giữ nguyên.',
        pr: 614,
      },
      {
        claim: 'Đổi dấu sau phụ âm cuối không còn làm chữ trả về phím đã gõ: Telex “dduoxwcj” hay VNI “d9uo37c5” thành “được” khi gõ dấu cách, dấu câu hoặc Enter.',
        source: 'Đúng ở cả Gõ Sen lẫn Preedit; lúc đang gõ vẫn hiện nguyên phím. Từ tiếng Anh như “parts”, “texts” vẫn giữ nguyên; muốn giữ phím đã gõ thì bấm phím chốt chữ (mặc định Ctrl) trước dấu cách.',
        pr: 622,
      },
    ],
  },
  {
    version: '1.8.2-1',
    date: '07/11/2026',
    summary:
      'Cứu chữ hết xoá nhầm chữ khi click sang chỗ khác ngay sau phím chuyển Anh/Việt. Gõ tắt khi đang tiếng Anh hết thành “vnviệt nam” ở ô không cho đọc chữ.',
    changes: [
      {
        claim: 'Cứu chữ không còn xoá nhầm chữ khi click sang chỗ khác ngay sau phím chuyển Anh/Việt: bấm Enter hay Esc lúc đó giữ nguyên chữ trong ô.',
        source: 'Lời mời gõ lại bị bỏ khi app báo con trỏ đã dời đi. Bản sửa được kiểm bằng test của lõi, chưa gõ thử trong app thật.',
        pr: 605,
      },
      {
        claim: 'Gõ tắt khi đang tiếng Anh không còn chèn cụm chữ đầy đủ sau chữ tắt (thành “vnviệt nam”) ở ô không cho đọc chữ quanh con trỏ; chữ tắt được giữ nguyên.',
        source: 'Bản sửa được kiểm bằng test của lõi, chưa gõ thử trong app thật.',
        pr: 604,
      },
    ],
  },
  {
    version: '1.8.1-1',
    date: '07/11/2026',
    summary:
      'Gõ Sen hết nuốt hoặc đảo thứ tự phím điều hướng và phím tắt Ctrl bấm ngay sau một chữ; riêng app Wayland trên GNOME vẫn nhận Ctrl+phím thành chữ.',
    changes: [
      {
        claim: 'Gõ Sen không còn nuốt hoặc đảo thứ tự phím mũi tên, Home, End, Delete, Esc và phím tắt Ctrl bấm ngay sau một chữ.',
        source: 'Riêng app Wayland trên GNOME vẫn nhận Ctrl+phím thành chữ: trên máy test Debian 12 (GNOME 43 Wayland), Ctrl+A trong Chromium vẫn ra chữ “a”.',
        pr: 591,
      },
    ],
  },
  {
    version: '1.8.0-1',
    date: '07/11/2026',
    summary:
      'Trang Kiểm tra máy hướng dẫn thiết lập, có nút sửa từng việc, ô gõ thử và gửi kết quả. GNOME tắt extension: Firefox ít sai chữ khi gõ nhanh, thanh địa chỉ Chrome gõ đúng, một app lỗi không còn làm mọi app ra chữ thô. GNOME bật extension hết mất chữ khi gõ nhanh và xoá nhầm khi Backspace. Firefox trên KDE hết mất dấu khi chèn chữ giữa câu; trên Hyprland, Sway hết mất chữ khi gõ nhanh. Lệnh cài hỗ trợ Fedora 45.',
    changes: [
      {
        claim: 'Cửa sổ cài đặt Qt và GTK có trang “Kiểm tra máy”: hiện các bước cài đặt, số việc còn cần sửa và nút sửa từng việc hoặc “Sửa cả N việc”.',
        source: 'Ô gõ thử, test app kèm nhật ký gõ, danh sách app kết nối với fcitx5 và gửi kết quả qua Facebook, GitHub hoặc chép kết quả nằm cùng trang, thay hộp “Kiểm tra máy tôi…” và nút “Báo lỗi” ở trang Giới thiệu. Trang kiểm tra fcitx5 có tự chạy khi đăng nhập không, có nút đặt tự chạy, đặt biến môi trường, chọn Fcitx 5 làm Virtual Keyboard trên KDE và chạy im-config trên X11 (#563); trên GNOME báo khi thiếu extension Input Method Panel và có nút Cài (#507, #508). Trang Kiểm tra máy chưa được test lại trên gói 1.8.0-1.',
        pr: 463,
      },
      {
        claim: 'Gõ Sen trên GNOME khi tắt extension: một app làm rơi lệnh xoá, như gợi ý tự điền của thanh địa chỉ Chrome, không còn khiến mọi app gõ ra chữ thô như “vieetj” tới khi fcitx5 khởi động lại; nay chỉ ô đó bị ảnh hưởng, tới khi đổi focus.',
        source: 'Thanh địa chỉ Chrome có gợi ý tự điền nay ra đúng tiếng Việt (#543). Firefox ít sai chữ hơn hẳn khi gõ nhanh; VS Code hết sai chữ đầu (#541).',
        pr: 586,
      },
      {
        claim: 'Gõ Sen trên GNOME khi bật extension: gõ nhanh tới mức hai phím đè nhau không còn mất chữ, như “người” ra “ời”; bấm Backspace ngay sau khi gõ dấu không còn xoá nhầm chữ.',
        source: 'Áp dụng cho Antigravity và các app khác đi qua IBus (#581, #584).',
        pr: 581,
      },
      {
        claim: 'GNOME 46–50 với fcitx5 cũ hơn 5.1.22 (Ubuntu 24.04, 26.04): extension đi kèm gói nay báo tên app cho Ngó Sen, để mỗi app nhớ riêng chế độ gõ và Anh/Việt.',
        source: '`install.sh` tự bật extension. Nâng gói bằng apt, dnf thì chưa tự bật; trang Kiểm tra máy gợi ý và có nút bật, sau đó cần đăng xuất, đăng nhập lại.',
        pr: 510,
      },
      {
        claim: 'Gõ Sen trong Firefox trên KDE không còn mất dấu khi chèn chữ vào giữa câu trong web editor như Slate, CKEditor; trên Hyprland và Sway, Firefox không còn mất chữ vừa gõ khi gõ nhanh lúc phản hồi chậm.',
        source: 'Gồm #580, #582 và #583. KDE, Sway, Hyprland chưa được test lại trên gói 1.8.0-1.',
        pr: 582,
      },
      {
        claim: 'Khi bật tự khôi phục (mặc định), gõ issue, sorry, coffee không còn mất chữ thành isue, sory, cofee.',
        source: 'Gõ đúp để bỏ dấu vẫn như cũ: tesst ra test, iss ra is, off ra of.',
        pr: 534,
      },
      {
        claim: 'Cài được Ngó Sen bằng lệnh một dòng trên Fedora 45; release có thêm gói cho x86_64 và aarch64.',
        source: 'Gói Fedora 45 chỉ được build và qua test lúc build, chưa ai gõ thử trên máy thật. Nếu release chưa có gói dựng sẵn cho bản Fedora mới, lệnh báo rõ và hướng dẫn cài từ mã nguồn (#558).',
        pr: 556,
      },
      {
        claim: 'Lệnh cài trên Sway và Hyprland nay bật fcitx5 để gõ ngay, in dòng config cho lần đăng nhập sau và đặt biến để app Qt 5 gõ được tiếng Việt từ lần đăng nhập sau.',
        source: 'Biến cho app Qt 5 có tác dụng khi vào desktop từ màn hình đăng nhập (#566). Chưa test lại trên gói 1.8.0-1.',
        pr: 557,
      },
      {
        claim: 'Cửa sổ cài đặt: trang Gõ chữ chia lại nhóm theo công dụng; ô bị tuỳ chọn khác chặn được làm mờ và có giải thích; lăn chuột trên ô chọn không còn đổi và tự lưu giá trị.',
        source: 'Cài đặt đã lưu giữ nguyên (#519). Gồm giải thích ô bị chặn (#520, #521) và lăn chuột (#522).',
        pr: 519,
      },
      {
        claim: 'Cửa sổ cài đặt: bỏ nút “Tắt” khỏi Chế độ gõ; máy từng chọn “Tắt” nay hiện Gõ Sen, dùng phím chuyển Anh/Việt để gõ tiếng Anh.',
        source: 'Bản Qt đổi nút “Mặc định” thành “Đưa về mặc định…” (#525).',
        pr: 528,
      },
      {
        claim: 'Ô tìm kiếm của GNOME không còn Cứu chữ và Cứu dấu, vì GNOME nhận Tab và Esc trước Ngó Sen nên không trả lại được chữ đã đổi.',
        source: 'Cần fcitx5 5.1.22 trở lên hoặc extension của Ngó Sen báo tên app. Trình duyệt và app soạn thảo vẫn có cả hai.',
        pr: 513,
      },
    ],
  },
  {
    version: '1.7.6-1',
    date: '02/11/2026',
    summary:
      'Google Docs, Slides trên Chrome, Edge, Brave, Opera, Vivaldi ở X11 hết lặp chữ khi thêm dấu. GNOME hết mất dấu khi gõ nhanh ở ô chỉ xoá qua surrounding text. Cứu dấu đổi được dấu chữ bôi đen trong WPS Office ở X11. Trên GNOME, lệnh cài luôn thêm extension Input Method Panel.',
    changes: [
      {
        claim: 'Gõ Sen trong Google Docs và Google Slides trên Chrome, Edge, Brave, Opera, Vivaldi trên X11: thêm dấu không còn ra chữ lặp như “trenên” thay vì “trên”, “dauâuấu” thay vì “dấu”.',
        source: 'Gồm #523 và #527. Google Docs, Google Slides chưa được test lại trên gói 1.7.6-1.',
        pr: 523,
      },
      {
        claim: 'Gõ Sen trên GNOME: trong ô chỉ cho Ngó Sen xoá qua surrounding text, gõ nhanh hơn app phản hồi (như khi máy bận) không còn làm mất lần thêm dấu, như “vieetj” ra “vieêệt” thay vì “việt”.',
        source: 'Ngó Sen chờ app theo kịp, tối đa 100 ms, rồi mới xoá.',
        pr: 501,
      },
      {
        claim: 'Cứu dấu trong WPS Office trên X11: bôi đen “chuyển” rồi gõ j nay ra “chuyện” thay vì bị thay bằng “j”.',
        source: 'Cách click ngay sau chữ rồi gõ phím dấu vẫn chưa dùng được trong WPS. WPS chưa được test lại trên gói 1.7.6-1.',
        pr: 505,
      },
      {
        claim: 'GNOME: lệnh cài nay luôn thêm extension Input Method Panel, kể cả khi đã có khay như Ubuntu, để menu chế độ hiện được trong ô tìm kiếm của GNOME; Kiểm tra máy báo khi thiếu extension này.',
        source: 'Menu khay ghi rõ “Kiểu gõ (Telex)”, “Bảng mã (Unicode)” và đánh dấu lựa chọn đang dùng (#506, #507). Lệnh cài chưa được test lại trên gói 1.7.6-1.',
        pr: 506,
      },
    ],
  },
  {
    version: '1.7.5-1',
    date: '01/11/2026',
    summary:
      'Phím chuyển Anh/Việt nay chỉ đổi app đang gõ, mỗi app nhớ riêng lựa chọn. Enter nay bung gõ tắt trong Preedit và Gõ Sen; Gõ Sen không còn mất Enter, Shift+Enter, Tab bấm ngay lúc đang thêm dấu. Gõ Sen xoá qua surrounding text ở thêm nhiều app trên KDE, Sway và X11, và ít mất dấu hơn trên GNOME.',
    changes: [
      {
        claim: 'Phím chuyển Anh/Việt (Ctrl+Shift) nay chỉ đổi app đang gõ, và mỗi app nhớ riêng Anh hay Việt qua lần đăng xuất. App chưa bấm lần nào theo lần bấm gần nhất.',
        source: 'Nút “Mặc định”, sao lưu và hoàn tác trong cửa sổ cài đặt bao luôn phần nhớ này. App đã chọn Preedit qua menu chế độ không còn chuyển sang Gõ Sen sau khi bấm phím chuyển hai lần. PR này chỉ có test tự động. Trên gói 1.7.5-1, app mở lần đầu theo lần bấm phím chuyển gần nhất; nhóm fcitx5 có hai bộ gõ chưa được test.',
        pr: 469,
      },
      {
        claim: 'Preedit và Gõ Sen: bấm Enter ngay sau từ gõ tắt nay bung từ trước khi Enter tới app, ví dụ gõ “dc” rồi Enter trong ô chat sẽ gửi “được”.',
        source: 'Đo trên build của PR: máy ảo Ubuntu 24.04, GNOME 46 Wayland, fcitx5 5.1.7, Chrome, trang chat, đúng 10/10 lượt ở cả Preedit và Gõ Sen (1.7.4: 0/10).',
        pr: 476,
      },
      {
        claim: 'Gõ Sen: Enter, Shift+Enter, Tab và Shift+Tab bấm ngay sau từ đang được thêm dấu không còn bị mất hay chen vào giữa chữ.',
        source: 'Gồm Enter trong Google Docs trên Firefox, GNOME (#487), Enter và Shift+Enter trong app GTK, Qt (#488), Shift+Enter trong Google Docs và Tab, Shift+Tab (#489). Trên gói 1.7.5-1, Chromium snap trên Ubuntu 26.04: gõ “nhes”, Enter, “a” với 30 ms giữa các phím ra “nhé”, xuống dòng, “a”, đúng 4/4 lượt; Google Docs chưa test trên gói này.',
        pr: 487,
      },
      {
        claim: 'Gõ Sen trên KDE (Wayland), Sway, Hyprland và app X11 dùng mô-đun fcitx5 (GTK3, Qt) nay nhờ app xoá thẳng chữ cũ trong ô khi thêm dấu, như trên GNOME, để Backspace tới muộn không xoá mất chữ mới khi app chậm.',
        source: 'Ô chưa cho biết chữ bên trong, thanh địa chỉ và khi lệnh xoá làm ô trống trên Wayland vẫn dùng Backspace như trước. Trên gói 1.7.5-1: CachyOS KDE, GNOME Text Editor, Kate và Chromium đúng 4/4, xoá qua surrounding text; Linux Mint 22 X11, xed đúng 4/4.',
        pr: 477,
      },
      {
        claim: 'Gõ Sen trên GNOME: khi Ngó Sen phải xoá bằng Backspace, như ở Google Docs và Firefox, dấu vừa gõ không còn lâu lâu bị mất hay chen vào giữa chữ (“chư”, “dâuấ”).',
        source: 'Ngó Sen chờ ít nhất 40 ms sau Backspace thay vì 15 ms. Đo trên build của PR: Google Docs, Firefox 158, Ubuntu 26.04 GNOME 50.1, gõ 40 ms/phím: đúng 60/60 khi chờ 40 ms sau Backspace, 13/20 khi chờ 15 ms.',
        pr: 481,
      },
      {
        claim: 'Gõ Sen trên GNOME: gõ hai phím dấu sát nhau (như w và f trong “nguowfi”) không còn ra “ngời”.',
        source: 'Chỉ được chứng minh bằng test tự động, chưa tái hiện trên máy thật.',
        pr: 490,
      },
      {
        claim: 'Gõ Sen trên Debian 12 và các bản dựa trên nó (fcitx5 cũ hơn 5.1.7): gõ nhanh trong app xoá chữ bằng Backspace, như Google Docs và Firefox, không còn có thể làm fcitx5 crash.',
        source: 'Chỉ có test tự động; chưa test trên máy Debian 12 thật.',
        pr: 493,
      },
      {
        claim: '`install.sh` cài được trên Ultramarine Linux và các bản dựng từ Fedora 43, 44 khác; trên Fedora Silverblue, Kinoite, Bazzite thì in sẵn lệnh `rpm-ostree` để cài tay thay vì hỏng giữa chừng.',
        source: 'Thử trong container Ultramarine 44 (#491) và container Fedora 44 giả lập máy ostree (#494); chưa test trên desktop Ultramarine, Silverblue, Bazzite thật.',
        pr: 491,
      },
      {
        claim: 'Cửa sổ cài đặt, trang Giao diện: ba mục menu Bảng mã, Gõ tắt chữ hoa và Tự viết hoa nay có icon trên GNOME, Ubuntu và các theme thiếu icon đó, cả trong menu khay.',
        source: 'Menu khay được xem trên máy ảo Ubuntu 26.04 GNOME, dùng Yaru và AppIndicator (#486). Cửa sổ cài đặt chỉ có test tự động, chưa test trên desktop Ubuntu thật.',
        pr: 484,
      },
    ],
  },
  {
    version: '1.7.4-1',
    date: '31/10/2026',
    summary:
      'Sửa Preedit trên GNOME mất Enter khi giữ phím, mất chữ đang gõ khi click trong Alacritty và app XIM khác trên X11. Trên GNOME 50.0–50.3 không có extension chuyển phím, sửa Gõ Sen ra chữ lặp trong kitty và Preedit mất Enter.',
    changes: [
      {
        claim: 'Preedit trên GNOME: bấm Enter sau chữ đang gạch chân không còn bị mất khi giữ phím lâu một chút như gõ bình thường; Enter nay đi lúc nhả phím.',
        source: 'Đo trên build của PR, Ubuntu 26.04 GNOME 50.1, có extension chuyển phím, Chrome, trang chat: trước khi sửa, giữ Enter 80/120/200 ms gửi 0/30 lượt ở mỗi mức; sau khi sửa, giữ 10/120/300 ms đều gửi 30/30.',
        pr: 465,
      },
      {
        claim: 'Ở chế độ Preedit, click trong Alacritty và app XIM khác không còn làm mất chữ đang gõ dở.',
        source: 'Có test tự động; chưa test với Alacritty.',
        pr: 466,
      },
      {
        claim: 'GNOME 50.0–50.3 khi không có extension chuyển phím: Gõ Sen trong kitty không còn ra chữ lặp kiểu “tieêngếng” mà chuyển sang gạch chân; Enter sau chữ gạch chân ở Preedit không còn bị mất.',
        source: 'Đo trên build của PR, Ubuntu 26.04 GNOME 50.1, tắt extension: câu 14 chữ trong kitty, 1.7.3 sai 12/14 chữ, bản sửa sai 0/14; Preedit trong Chrome giữ Enter 10 và 120 ms: ở mỗi mức, 1.7.3 gửi 0/30 lượt, bản sửa 30/30. Khi GNOME lỗi mà không có extension, ô chat Gemini có thể phải bấm Enter hai lần.',
        pr: 467,
      },
    ],
  },
  {
    version: '1.7.3-1',
    date: '30/10/2026',
    summary:
      'Trên X11, Ngó Sen nhận ra Firefox, Chrome và LibreOffice khi chúng nối qua mô-đun IBus GTK.',
    changes: [
      {
        claim: 'Trên X11, Firefox (kể cả bản snap), Chrome và LibreOffice khi nối qua mô-đun IBus GTK được Ngó Sen nhận đúng tên app và xử lý như khi nối thẳng với fcitx5.',
        source: 'Đã test trên Linux Mint 22 (fcitx5 5.1.7): xed, Chromium, Firefox và LibreOffice Writer qua cổng IBus đều đúng 4/4; fcitx5 5.1.7 nhận tên app rỗng nên trên máy này không có gì thay đổi.',
        pr: 458,
      },
    ],
  },
  {
    version: '1.7.2-1',
    date: '30/10/2026',
    summary:
      'Sửa Gõ Sen quên chữ đang gõ trong VS Code trên GNOME.',
    changes: [
      {
        claim: 'Sửa Gõ Sen quên chữ đang gõ trong VS Code trên GNOME, khi VS Code báo con trỏ nhảy về đầu dòng rồi quay lại cuối chữ mà chữ không đổi.',
        source: 'Kiểm tra bằng test tự động. VS Code snap chưa test được trên máy ảo vì công cụ test không đưa được phím từ VS Code tới fcitx5.',
        pr: 453,
      },
    ],
  },
  {
    version: '1.7.1-1',
    date: '30/10/2026',
    summary:
      'Trên GNOME, Gõ Sen xoá chữ qua surrounding text khi app báo đúng chữ đang gõ, để Backspace tới muộn không còn làm hỏng chữ; app bỏ qua lệnh xoá thì Ngó Sen tự quay về Backspace tới hết phiên. Sửa hỏng chữ khi app báo chữ chậm, bỏ khoảng dừng sau mỗi lần xoá, và cảnh báo GNOME 50.0–50.3 thiếu bản sửa forward-keys.',
    changes: [
      {
        claim: 'Trên GNOME, Gõ Sen dùng surrounding text khi app báo đúng chữ đang gõ, tránh Backspace tới muộn làm hỏng chữ.',
        source: 'Nếu app bỏ qua lệnh xoá, Ngó Sen sửa chữ thừa bằng Backspace và dùng Backspace tới hết phiên; nếu không có cách xoá khác thì gõ thô để lỗi không chồng lên nhau. KDE và các desktop Wayland khác chưa đổi (#446). Đã test trên Ubuntu 26.04 (GNOME Wayland): Firefox snap, GNOME Text Editor và Chromium snap đều đúng 4/4 lượt.',
        pr: 443,
      },
      {
        claim: 'Sửa Gõ Sen làm hỏng chữ như “tiíiếng” khi app dùng surrounding text báo chữ chậm hơn phím gõ (LibreOffice, ô GTK4).',
        source: 'Chưa test trên gói 1.7.1.',
        pr: 441,
      },
      {
        claim: 'Gõ Sen không còn dừng vài mili giây sau mỗi lần xoá và commit trong app xoá chữ qua surrounding text như LibreOffice và ô GTK4.',
        source: 'Chưa test trên gói 1.7.1.',
        pr: 438,
      },
      {
        claim: 'Kiểm tra máy cảnh báo khi GNOME 50.0–50.3 chạy mà không bật bản sửa forward-keys (Enter sau chữ Preedit và Backspace của Gõ Sen bị mất), kèm lệnh bật lại.',
        source: 'Báo lỗi có thêm version GNOME Shell và trạng thái bản sửa. Chưa test trên gói 1.7.1.',
        pr: 440,
      },
      {
        claim: 'Kiểm tra máy không còn báo “IBus đang chạy song song” khi IBus đó chỉ phục vụ chương trình khác (như IBus xpra tự bật).',
        source: 'Chỉ báo khi IBus thật sự giành bộ gõ của phiên đang dùng. Chưa test trên gói 1.7.1.',
        pr: 442,
      },
      {
        claim: 'Trên GNOME với fcitx5 cũ (Ubuntu 26.04, Debian), chế độ gõ chọn ở menu `,` hay bằng phím đổi chế độ chỉ áp cho mọi app tới khi đăng xuất, không còn bị lưu mãi.',
        source: 'Đăng nhập lại thì về chế độ mặc định trong cửa sổ cài đặt; luật cũ còn trong máy được bỏ qua. Chưa test trên gói 1.7.1.',
        pr: 444,
      },
      {
        claim: 'Nhật ký gõ lưu ra file giữ mỗi sự kiện trên đúng một dòng, kể cả ở phím Enter hay khi app báo chữ có xuống dòng.',
        source: 'Chưa test trên gói 1.7.1.',
        pr: 445,
      },
    ],
  },
  {
    version: '1.7.0-1',
    date: '29/10/2026',
    summary:
      'Cửa sổ cài đặt có thêm bản GTK giống app GNOME, mở mặc định trên GNOME và Cinnamon, đổi qua lại với bản Qt bằng một nút. Trang “Có gì mới & mẹo” và thông báo một lần sau khi cập nhật lên version có tính năng mới. Không còn gói cho Ubuntu 22.04.',
    changes: [
      {
        claim: 'Cửa sổ cài đặt có thêm bản GTK giống app GNOME, dùng libadwaita 1.5 trở lên, bên cạnh bản Qt như cũ.',
        source: 'GNOME và Cinnamon (Linux Mint) mở GTK nếu đủ libadwaita; desktop khác mở Qt. Chỉ có thư viện bản nào thì mở bản đó (#396). Đã test trên Linux Mint 22 (Cinnamon X11) và Ubuntu 26.04 (GNOME Wayland): cửa sổ cài đặt mở bản GTK.',
        pr: 386,
      },
      {
        claim: 'Trang Giao diện: bản Qt có nút “Đổi sang bản GTK…”, bản GTK có nút “Đổi sang bản Qt…”.',
        source: 'Có sẵn bản kia thì cửa sổ mở lại ngay bằng bản đó. Chưa có thì báo cần cài gói nào, tải về khoảng bao nhiêu, rồi cho chọn cài ngay (hỏi mật khẩu) hoặc chép lệnh để tự chạy (#407).',
        pr: 393,
      },
      {
        claim: 'Sau khi cập nhật lên version có tính năng mới, một thông báo ở góc màn hình hiện một lần; bấm “Xem” thì mở cửa sổ cài đặt ở trang “Có gì mới & mẹo”.',
        source: 'Version chỉ sửa lỗi và cài mới không báo. Trang có Cứu chữ, Cứu dấu, phím chuyển Anh/Việt với nút “Mở cài đặt” dẫn tới đúng ô, và 12 mẹo gõ; trang Gõ chữ hiện một mẹo ngẫu nhiên mỗi lần mở cửa sổ (#409, #433). Đã test trên Linux Mint 22: cập nhật từ 1.6.3-1, thông báo “Ngó Sen có gì mới?” hiện câu của version 1.7, bấm “Xem” mở trang “Có gì mới & mẹo”.',
        pr: 331,
      },
      {
        claim: 'Ở chế độ gạch chân, Backspace ngay sau khi gõ xong một chữ sẽ mở lại chữ đó để sửa dấu (`việt ` + Backspace + `s` → `viết`), như Gõ Sen.',
        source: 'Cần app báo surrounding text; terminal thì Backspace như cũ. Chưa test trên gói 1.7.0.',
        pr: 344,
      },
      {
        claim: 'Hộp “Kiểm tra máy tôi…” có nút “Nhắn qua Facebook…”: chép sẵn thông tin máy và mở khung chat với trang Facebook Ngó Sen.',
        source: 'Dán thông tin vào tin nhắn để báo lỗi, không cần tài khoản GitHub. Chưa test trên gói 1.7.0.',
        pr: 374,
      },
      {
        claim: 'Lệnh cài hỏi “Tiếp tục? [y/N]” thay cho “Tiếp tục? [c/K]”, như đa số lệnh Linux.',
        source: 'Gõ y, yes hoặc c để đồng ý; bấm Enter không gõ gì vẫn là không (#398). Cài trên GNOME, lệnh nói rõ trước câu hỏi sẽ đổi gì cho tài khoản và cách trả lại bằng `--uninstall` (#400, #410).',
        pr: 398,
      },
      {
        claim: 'Cửa sổ cài đặt dùng xanh men của Ngó Sen cho ô đã đánh dấu, trang đang chọn ở thanh bên, focus và vùng chọn, thay cho màu nhấn của desktop.',
        source: 'Màu này dùng cho cả giao diện sáng và tối; sắc xanh ở giao diện tối đậm hơn trước một chút để chữ dễ đọc hơn.',
        pr: 352,
      },
      {
        claim: '`install.sh` trên GNOME và Cinnamon (Linux Mint) ở Debian, Ubuntu, Linux Mint, Fedora và openSUSE cài thư viện cửa sổ cài đặt GTK, không tải Qt.',
        source: 'Khoảng 20 MB trên Ubuntu 24.04 GNOME và Mint 22.1. Debian 12 (libadwaita quá cũ), KDE và desktop khác vẫn dùng Qt. Arch/CachyOS vẫn cài Qt. Máy đã cài Ngó Sen vẫn giữ bộ Qt, không bị gỡ.',
        pr: 387,
      },
      {
        claim: 'KDE Wayland: cài hoặc nâng cấp xong, Ngó Sen vẫn nhớ chế độ riêng từng app mà không cần đăng nhập lại.',
        source: 'fcitx5 được KDE bật lại như lúc đăng nhập, nên Ngó Sen vẫn biết đang gõ trong app nào. Chưa test trên gói 1.7.0.',
        pr: 428,
      },
      {
        claim: 'WPS Office trên deepin: Gõ Sen không còn để lại chữ cũ khi WPS kết nối với fcitx5 theo đường D-Bus.',
        source: '“thucws” ra “thức” thay vì “thucưcức”. Chưa test trên gói 1.7.0.',
        pr: 430,
      },
      {
        claim: 'deepin-editor mặc định dùng chế độ gạch chân, để gõ nhanh không còn đảo chữ, mất hoặc lặp dấu.',
        source: 'Vẫn giữ chế độ đã chọn cho app qua menu, không đổi các app khác.',
        pr: 421,
      },
      {
        claim: 'Người cài gói rồi tự thêm Ngó Sen trong Fcitx5 Configuration không còn bị mất bàn phím tiếng Anh và đổi sang Ctrl+Space sau lần khởi động fcitx5 kế tiếp.',
        source: 'Máy mới giữ Ctrl+Shift.',
        pr: 419,
      },
      {
        claim: 'Cửa sổ cài đặt: bấm “Mặc định” nay báo trước phím chuyển Anh/Việt sẽ về Ctrl+Shift nếu đang dùng phím khác.',
        source: 'Kể cả phím vừa đổi, trong cả cửa sổ Qt và GTK.',
        pr: 414,
      },
      {
        claim: 'Cửa sổ cài đặt: lưu từ điển riêng không còn xoá chữ bắt đầu bằng dấu # khỏi file; bấm “Khôi phục…” với file sao lưu bị hỏng nay báo lỗi và không thay đổi gì.',
        source: 'Trước đây khôi phục file hỏng có thể làm trống file từ điển riêng và ghi một phần cài đặt (#382). Cửa sổ cài đặt cũng mở được khi `ngosen.conf` có byte không phải UTF-8 (#415).',
        pr: 367,
      },
      {
        claim: 'Không còn gói cho Ubuntu 22.04 (và Linux Mint 21 dựa trên nó); cần Ubuntu 24.04 hoặc Linux Mint 22 trở lên.',
        source: 'Version cuối cho Ubuntu 22.04 là 1.6.4. Lệnh cài một dòng báo rõ điều này; máy đã thêm repo APT của Ngó Sen thì nên gỡ dòng repo đó, vì `apt update` sẽ báo lỗi thiếu `jammy`.',
        pr: 332,
      },
    ],
  },
  {
    version: '1.6.4-1',
    date: '28/10/2026',
    summary:
      'Version sửa lỗi: Antigravity trên GNOME không còn mất dấu khi gõ nhanh, Cứu dấu chạy trên Chrome, Chromium và Brave ở X11, phím tắt Super không còn bị gõ thành chữ ở Gạch chân, cửa sổ cài đặt và Hoàn tác được sửa. Lệnh cài chạy được trên deepin, LMDE, Devuan, Parrot và Artix.',
    changes: [
      {
        claim: 'Antigravity trên GNOME: Gõ Sen không còn mất dấu khi gõ nhanh trong vùng soạn thảo.',
        source: 'Đã test trên Ubuntu 26.04 (GNOME Wayland) với Antigravity 2.6.0: gõ 18 từ không nghỉ giữa các phím trong chat và editor đều ra đúng, đọc từ log gõ (#362).',
        pr: 395,
      },
      {
        claim: 'Cứu dấu chạy trên Chrome, Chromium và Brave ở phiên X11: bôi đen `nhanh` (bấm đúp hoặc Shift+mũi tên) rồi gõ `s` ra `nhánh`.',
        source: 'Chỉ ở Gõ Sen; Tab hoặc Esc vẫn trả lại phím đã gõ (#360). Đã test trên MX Linux 25 (Xfce X11) với Chromium: ra `nhánh` ở 2/3 lượt; ở lượt đầu, ngay sau khi mở Chromium, phím `d` đầu tiên bị mất trước khi ô chữ nối với fcitx5.',
        pr: 390,
      },
      {
        claim: 'Gạch chân: phím tắt Super + chữ (như Super+Q chuyển workspace) không còn bị gõ thành `q`, `ư`; nay đi thẳng tới desktop và app như Ctrl, Alt, giữ lại chữ đang gõ dở.',
        source: 'Chưa test trên gói 1.6.4 (#391).',
        pr: 392,
      },
      {
        claim: 'Cửa sổ cài đặt không còn lỗi không mở được khi file từ điển riêng có chữ không phải UTF-8.',
        source: 'Trang Từ điển báo không đọc trọn được file. Chưa test trên gói 1.6.4.',
        pr: 376,
      },
      {
        claim: 'Cửa sổ cài đặt: “Hoàn tác” chỉ trả lại đúng thay đổi vừa lưu.',
        source: 'Không còn làm mất kiểu gõ đã nhớ cho app khi chọn từ menu Ngó Sen trong lúc cửa sổ đang mở. Chưa test trên gói 1.6.4.',
        pr: 383,
      },
      {
        claim: '`install.sh` trên máy để tiếng Việt cài đủ im-config và module gõ fcitx5 cho app GTK, Qt trên Debian, Ubuntu, Mint, MX.',
        source: 'Trước đây lệnh bỏ sót các gói này khi máy để tiếng Việt; nay cài đủ ở mọi ngôn ngữ.',
        pr: 388,
      },
      {
        claim: '`install.sh` không còn dừng giữa chừng khi máy có một nguồn apt khác đang lỗi.',
        source: 'Ví dụ Zorin OS có nguồn `github.io` hỏng; nay lệnh báo nguồn lỗi rồi vẫn cài tiếp.',
        pr: 399,
      },
      {
        claim: '`install.sh` cài được trên deepin 23 và 25. Gói `.deb` không còn đòi `python3-qtpy`.',
        source: 'Cửa sổ cài đặt chạy thẳng với PyQt6. Lệnh cài kèm `whiptail` để im-config không dừng giữa chừng trên deepin và Kali mới cài (#408). Đã test trên deepin 25.2 (DDE X11, máy mới cài): lệnh cài chạy xong không lỗi và thêm Ngó Sen vào danh sách bộ gõ.',
        pr: 397,
      },
      {
        claim: '`install.sh` cài được trên LMDE, Devuan, Parrot và Artix.',
        source: 'Trước đây lệnh báo không hỗ trợ dù gói Debian, Arch dùng được.',
        pr: 403,
      },
    ],
  },
  {
    version: '1.6.3-1',
    date: '27/10/2026',
    summary:
      'Version sửa lỗi: gõ đúng trong editor và ô chat của Antigravity trên GNOME; Cứu dấu ở Gõ Sen chạy cả khi backspace về chữ trước hoặc bấm chuột vào giữa chữ.',
    changes: [
      {
        claim: 'Antigravity trên GNOME: gõ trong vùng soạn thảo không còn để nguyên chữ thô (`vieetj`), và ô chat không còn mất hay rối chữ khi gõ nhanh.',
        source: 'Đã test trên Ubuntu 26.04 (GNOME Wayland) với Antigravity 2.6.0: 18 từ trong editor và ô chat đều ra đúng. Lỗi mất chữ trong ô chat không hiện ra trên máy ảo, nên phần sửa này chỉ được đối chiếu với log gõ của người báo lỗi (#362).',
        pr: 365,
      },
      {
        claim: 'Sửa lỗi Cứu dấu khi backspace về chữ trước (`sưa oke|` → backspace 4 lần → `sưa|` + `s` → `sứa`) hoặc bấm chuột vào giữa chữ (`nh|anh` + `s` → `nhánh`).',
        source: 'Chỉ ở Gõ Sen; Tab hoặc Esc vẫn trả lại phím đã gõ (#358). Đã test trên Ubuntu 26.04 trong GNOME Text Editor, Firefox và editor của Antigravity 2.6.0.',
        pr: 370,
      },
    ],
  },
  {
    version: '1.6.2-1',
    date: '27/10/2026',
    summary:
      'Cứu dấu nhanh hơn ở Gõ Sen: bấm chuột ngay sau chữ đã gõ rồi gõ phím dấu, không cần bôi đen. Lệnh gỡ chỉ tắt những gì lệnh cài đã bật.',
    changes: [
      {
        claim: 'Cứu dấu không cần bôi đen: bấm chuột ngay sau chữ đã gõ rồi gõ phím dấu là chữ đổi dấu (`nhanh|` + `s` → `nhánh`).',
        source: 'Tab hoặc Esc trả lại chữ đã gõ. Bấm vào giữa chữ thì phím gõ như thường. Chỉ ở Gõ Sen (#118). Không được test lại trên gói 1.6.2.',
        pr: 327,
      },
      {
        claim: '`install.sh --uninstall` chỉ tắt những gì lệnh cài đã bật.',
        source: 'Extension Input Method Panel, extension sửa lỗi gõ của GNOME 50 và im-config mà người dùng tự bật từ trước được giữ nguyên.',
        pr: 328,
      },
    ],
  },
  {
    version: '1.6.1-1',
    date: '26/10/2026',
    summary:
      'Version sửa lỗi: gợi ý Cứu chữ, Cứu dấu mặc định tiếng Việt, Ngó Sen tự có trong danh sách bộ gõ khi cài gói trên máy tiếng Việt, log gỡ lỗi không ghi chữ trong ô mật khẩu.',
    changes: [
      {
        claim: 'Dòng gợi ý cạnh con trỏ của Cứu chữ và Cứu dấu theo “Ngôn ngữ giao diện” của Ngó Sen, mặc định tiếng Việt.',
        source: 'Giống menu tray, dòng gợi ý dùng tiếng Việt kể cả khi desktop dùng tiếng Anh. Đã test trên Ubuntu 26.04 (GNOME Wayland, desktop tiếng Anh): cập nhật từ 1.6.0-1 bằng install.sh, dòng gợi ý của Cứu chữ hiện tiếng Việt; Cứu chữ đổi `tieengs vieetj` thành `tiếng việt`, Esc trả lại chữ cũ, Tab giữ nguyên `tieengs Nam`.',
        pr: 322,
      },
      {
        claim: 'Cài gói (apt, gói tải về) trên máy để ngôn ngữ tiếng Việt thì lần đầu fcitx5 chạy, Ngó Sen đã có trong danh sách bộ gõ.',
        source: 'Máy để tiếng Anh vẫn cần thêm tay hoặc dùng lệnh cài một dòng (#300). Đã test trên Linux Mint 22: cài gói bằng apt, chạy fcitx5 lần đầu với `LANG=vi_VN.UTF-8` thì Ngó Sen có sẵn. Mint chọn tiếng Việt bằng `LANGUAGE` mà giữ `LANG=en_US.UTF-8` thì danh sách vẫn chỉ có bàn phím.',
        pr: 316,
      },
      {
        claim: 'Khi bật log để gỡ lỗi, chữ gõ trong ô mật khẩu không còn bị ghi vào log.',
        source: 'Log chỉ ghi “(hidden)” ở chỗ đó.',
        pr: 321,
      },
    ],
  },
  {
    version: '1.6.0-1',
    date: '26/10/2026',
    summary:
      'Thêm Cứu chữ khi quên bật tiếng Việt, Cứu dấu cho chữ đã bôi đen và phím riêng chuyển Anh/Việt.',
    changes: [
      {
        claim: 'Cứu chữ đổi chữ gõ khi quên bật tiếng Việt thành chữ có dấu khi bật lại.',
        source: 'Gõ `tieengs vieetj` rồi bật tiếng Việt thì thành `tiếng việt`, Tab hoặc Esc trả lại chữ cũ; nếu có chữ giữ nguyên khi gõ lại, Ngó Sen chỉ hiện gợi ý để bấm Enter nhận (#82, #232, #239, #243, #80). Đã test trong ô chữ GTK3 trên Ubuntu 26.04 và Linux Mint 22, cùng Chrome trên Ubuntu: đổi chữ, Esc trả lại và Tab bỏ qua gợi ý `tieengs Nam` đều đúng; Cứu chữ bật sẵn cả khi nâng cấp.',
        pr: 290,
      },
      {
        claim: 'Cứu dấu cho bôi đen chữ đã gõ xong rồi gõ phím dấu để đổi dấu ngay.',
        source: '`nhanh` + `s` → `nhánh`, gõ tiếp `f` → `nhành`; gõ tiếp chữ cái thì thay bằng chữ mới, như `nhanh` + `sách` vẫn ra `sách` (#290). Tuỳ chọn bật sẵn trong “Gõ chữ › Gõ nhanh”, dùng ở app hỗ trợ surrounding text; Tab, Esc hoặc gõ lại đúng phím dấu trả lại phím đã gõ.',
        pr: 272,
      },
      {
        claim: 'Ngó Sen có phím riêng chuyển Anh/Việt: cài mới dùng Ctrl+Shift như UniKey, cập nhật giữ phím cũ.',
        source: 'Đổi ở “Phím › Phím tắt”, ô “Phím chuyển Anh/Việt”; ghi được Ctrl+Shift khi thả phím, dùng bên trái hay bên phải đều được (#242, #244), và cài mới bằng install.sh chỉ có Ngó Sen trong danh sách bộ gõ (#237, #248). Đã test cài mới: bắt đầu ở tiếng Anh, Ctrl+Shift chuyển sang tiếng Việt; nâng cấp từ 1.5.8-1 trên Ubuntu 26.04 và Linux Mint 22 giữ Ctrl+Space.',
        pr: 234,
      },
      {
        claim: '“Phím chốt chữ” thay tuỳ chọn bỏ qua gõ tắt, giữ nguyên từ đang gõ khi bấm rồi thả riêng phím.',
        source: 'Mặc định là Ctrl: gõ `tunx`, Ctrl rồi Space giữ `tũn`, không thêm dấu, tự khôi phục hay bung macro; phím tiếp theo bắt đầu từ mới. Ai đã chọn Shift, Ctrl hoặc Alt vẫn giữ phím đó.',
        pr: 219,
      },
      {
        claim: 'Menu tray thêm “Kiểu gõ”, “Tự viết hoa”, cho ẩn các mục và đổi icon khi tắt tiếng Việt.',
        source: 'Chuyển nhanh Telex/VNI, bật tắt từng kiểu viết hoa (#240), ẩn mục ở “Giao diện › Hiện trong menu khay” (#275); “Cài đặt” và “Lưu nhật ký gõ” luôn có trong menu. Khi tắt tiếng Việt, icon là lát củ sen trên ô xám; GNOME dùng Input Method Panel (kimpanel) hiện icon Ngó Sen thay chữ “vi” (#233).',
        pr: 274,
      },
      {
        claim: 'Cửa sổ cài đặt thêm giải thích, tách “Giao diện” và “Giới thiệu” thành hai trang, cho đổi ngôn ngữ giao diện.',
        source: 'Bỏ trang “Khác”, trang “Giao diện” có xem trước icon tray (#276); giải thích dưới tuỳ chọn thường kèm ví dụ, cách gõ không đổi. Menu và cửa sổ Ngó Sen mặc định dùng tiếng Việt; đổi “Ngôn ngữ giao diện” ở đầu trang “Giao diện” sang tiếng Anh thì menu tray đổi ngay, cửa sổ đổi khi mở lại, còn các mục của fcitx5 theo ngôn ngữ desktop (#277).',
        pr: 281,
      },
      {
        claim: 'Cập nhật bằng install.sh tự nạp lại fcitx5, gõ được ngay, trừ KDE Wayland vẫn cần đăng xuất rồi đăng nhập lại.',
        source: 'Đã test nâng cấp từ 1.5.8-1 trên Ubuntu 26.04 và Linux Mint 22: fcitx5 tự nạp lại, cài đặt, gõ tắt và Ctrl+Space còn nguyên, Cứu chữ đã bật. Khi gỡ trên GNOME, install.sh giữ file `~/.config/environment.d/90-ngosen.conf` nếu bạn đã sửa sau khi cài (#317).',
        pr: 230,
      },
      {
        claim: 'App GTK3 đi qua GNOME Shell không còn mất dấu khi gõ.',
        source: 'Trước đây có thể ra `trơi`, `ban`, `viêt` thay vì `trời`, `bạn`, `việt`. Gói 1.6.0 được test trên Ubuntu 26.04 GNOME Wayland: câu `dduwowngf tieengs Vieetj Nam cos dduwowjc khoong Haf Nooij` ra đúng chữ có dấu trong ô chữ GTK3, Chrome và GNOME Console.',
        pr: 231,
      },
      {
        claim: 'Chạy `ngosen-save-log` trong terminal để lưu nhật ký gõ khi icon hoặc menu tray mất hay treo.',
        source: 'Lệnh in đường dẫn file đã lưu, như `~/.local/state/ngosen/typing-<ngày giờ>.log`. Chỉ tài khoản của bạn đọc được file này.',
        pr: 197,
      },
      {
        claim: 'Mọi gói Ngó Sen, kể cả Debian 12, đều dùng lõi Rust; lõi Go đã bỏ.',
        source: 'Gói Debian 12 trước đây dùng lõi Go; cách gõ không đổi khi chuyển sang Rust. Build từ source cần Rust 1.88+ và cargo, không cần Go; Debian chưa được test với gói 1.6.0.',
        pr: 223,
      },
    ],
  },
  {
    version: '1.5.8-1',
    date: '26/10/2026',
    summary:
      'Version sửa lỗi nhanh cho cửa sổ cài đặt; người dùng version 1.5.7 nên cập nhật.',
    changes: [
      {
        claim: 'Cửa sổ cài đặt lưu được thay đổi khi fcitx5 đang chạy.',
        source: 'Trước đây cửa sổ cài đặt của 1.5.7 không lưu được gì và báo “Không lưu được”, dù fcitx5 vẫn chạy (#305). Đã test trên máy ảo Ubuntu 26.04 và CachyOS: gọi thẳng phần lưu với fcitx5 đang chạy, mỗi máy một lượt, đổi một ô cài đặt chính và lưu một gõ tắt rồi đọc lại; cả hai đều lưu được. Với gói 1.5.7-1 trên cùng hai máy, cả hai lần lưu đều bị fcitx5 từ chối và cài đặt không đổi. Chưa click lưu bằng chuột trong cửa sổ.',
        pr: 303,
      },
    ],
  },
  {
    version: '1.5.7-1',
    date: '24/10/2026',
    summary:
      'Sửa lỗi mở và lưu cài đặt, thêm dấu và thứ tự phím với Gõ Sen trên Firefox, cùng lỗi phải bấm Enter hai lần để gửi trên gemini.google.com với Preedit.',
    changes: [
      {
        claim: 'Cửa sổ cài đặt mở được từ menu khay trên KDE Plasma Wayland khi máy có cả PyQt5 và PyQt6.',
        source: 'Trước đây cửa sổ đóng ngay khi mở nếu gói khác đã cài PyQt5. Đã test trên CachyOS có cả PyQt5 và PyQt6: cửa sổ mở được và vẫn chạy sau 10 giây.',
        pr: 278,
      },
      {
        claim: 'Thay đổi cài đặt được lưu khi fcitx5 khởi động lại lúc cửa sổ cài đặt đang mở.',
        source: 'Trước đây cửa sổ báo “Đã lưu” nhưng không lưu gì. Không được test lại trên gói 1.5.7.',
        pr: 279,
      },
      {
        claim: 'Gói .deb không còn cài các phụ thuộc PyQt6 mà cửa sổ cài đặt không dùng.',
        source: 'Trên Ubuntu 26.04 sạch, dung lượng cài thêm ngoài fcitx5 giảm từ khoảng 456 MB xuống 22 MB. Dung lượng không được test lại trên gói 1.5.7; phụ thuộc của gói .deb đã được đọc lại, chỉ còn `python3-pyqt6`; dùng `sudo apt autoremove` để gỡ các gói đã cài nếu không còn gói nào khác cần chúng.',
        pr: 280,
      },
      {
        claim: 'Gõ Sen thêm dấu đúng sau khi xoá dấu cách trong ô soạn thảo có định dạng trên Firefox.',
        source: 'Trước đây gõ `toan`, dấu cách, Backspace rồi `s` ra `toans` thay vì `toán`. Đã test trên Firefox X11 (Linux Mint) và ô chữ thường trên CachyOS; Firefox cài từ snap trên Ubuntu 26.04 vẫn ra `toans`, như 1.5.6.',
        pr: 285,
      },
      {
        claim: 'Chế độ Preedit trên gemini.google.com gửi được khi bấm Enter một lần.',
        source: 'Trước đây Enter lần đầu xuống dòng, phải bấm lần hai để gửi. Đã test trên Firefox ở Ubuntu 26.04; trên Linux Mint với Gemini không đăng nhập, gõ `xin chaof` rồi Enter một lần là gửi, đúng 3/3 lượt.',
        pr: 286,
      },
      {
        claim: 'Gõ nhanh với Gõ Sen trên Firefox X11 giữ đúng thứ tự phím.',
        source: 'Trước đây dấu cách hoặc chữ sau từ vừa thêm dấu có thể chen vào giữa từ, như `tiếng việt` thành `ti ếngvi ệt`, trong ô chữ thường, TinyMCE và Lexical. Đã test trên Linux Mint 22.1 với 120 ms và 30 ms giữa các phím.',
        pr: 289,
      },
      {
        claim: 'Gõ Sen thêm dấu đúng sau Backspace xoá dấu cách trong terminal dùng xterm.js trên Firefox X11.',
        source: 'Trước đây gõ `toan`, dấu cách, Backspace rồi `s` ra `toans` thay vì `toán`. Đã test trong xterm.js trên Firefox X11 (Linux Mint), đúng 4/4 lượt; Chromium X11 đã gõ đúng từ trước.',
        pr: 292,
      },
    ],
  },
  {
    version: '1.5.6-1',
    date: '23/10/2026',
    summary:
      'Sửa lỗi Gõ Sen trong Google Sheets trên X11 với trình duyệt dựa trên Chromium, trong app GLFW qua Xwayland như Minecraft Java và lỗi lệnh cài trên KDE Plasma Wayland.',
    changes: [
      {
        claim: 'Gõ Sen trong Google Sheets trên X11 với trình duyệt dựa trên Chromium không còn nhảy, mất chữ.',
        source: 'Đã test trên Linux Mint 22.1 (Cinnamon X11), Chromium: gõ thẳng vào ô rồi Enter, gõ nhanh (30 ms giữa các phím), sửa chữ bằng Backspace và gõ nhanh sau khi bấm F2 mở ô. Mỗi trường hợp đúng 3/3 lượt (#258, #261).',
        pr: 258,
      },
      {
        claim: 'Sửa lỗi thêm dấu sau Backspace khi dùng Gõ Sen trong app GLFW qua Xwayland như Minecraft Java.',
        source: 'Trước đây sau khi bấm Backspace một lần, thêm dấu có thể ra chữ sai như `tieengs` ra `tieêngếng`.',
        pr: 247,
      },
      {
        claim: 'Lệnh cài trên KDE Plasma Wayland đặt `XMODIFIERS` để app X11 qua Xwayland gõ được tiếng Việt.',
        source: 'Trước đây app như Minecraft 26.2 trở về trước hay xterm chỉ ra chữ Telex thô. Đăng xuất rồi đăng nhập lại để áp dụng.',
        pr: 251,
      },
      {
        claim: 'Trang “Giới thiệu” cảnh báo khi fcitx5 còn dùng version cũ sau khi cập nhật gói Ngó Sen.',
        source: 'Dòng đỏ dưới số version nhắc đăng xuất rồi đăng nhập lại; “Kiểm tra máy tôi…” cũng liệt kê tình trạng này là cảnh báo. Trước đây trang đã hiện số version mới dù fcitx5 vẫn dùng version cũ để gõ.',
        pr: 212,
      },
      {
        claim: 'Log gõ lưu từ menu khay giữ được đoạn gõ dài hơn.',
        source: 'Không lưu nội dung ô giống hệt lần báo ngay trước. Với một log thực tế từ Edge, 401 dòng còn 118 dòng, nên log giữ được đoạn gõ dài gấp khoảng ba lần.',
        pr: 213,
      },
      {
        claim: 'Cửa sổ cài đặt không còn cắt chữ, hiện thanh cuộn ngang ở trang “Gõ chữ” khi dùng font hệ thống lớn; sửa mô tả và giao diện trên GNOME.',
        source: 'Mô tả trang “Giới thiệu” khớp README (#249). Trên GNOME khi chưa cài Qt theme, thanh cuộn mảnh, bo tròn, không có nút mũi tên và theo theme sáng/tối (#252). Với Qt 6.8 trở lên, cửa sổ đổi sáng/tối theo GNOME khi mở và khi chuyển chế độ; Qt cũ hơn vẫn dùng giao diện sáng (#253).',
        pr: 250,
      },
    ],
  },
  {
    version: '1.5.5-1',
    date: '21/10/2026',
    summary:
      'Sửa lỗi gõ dấu trên thanh địa chỉ Firefox Flatpak khi autofill và lỗi macro có chữ viết tắt viết hoa.',
    changes: [
      {
        claim: 'Gõ dấu trên thanh địa chỉ Firefox cài từ Flatpak khi đang autofill URL không còn làm rối từ.',
        source: '`ee` ra `ê` thay vì `eê`, `es` ra `é` thay vì `eé`, `dduowcj` ra `được` thay vì `dđược` (#200). Ngó Sen nhận ra app Flatpak theo tên thường dùng; nhật ký gõ ghi cả hai tên, như `firefox (org.mozilla.firefox)`.',
        pr: 204,
      },
      {
        claim: 'Macro có chữ viết tắt lưu bằng chữ hoa, như `VN` → `Việt Nam`, giờ mở rộng được.',
        source: 'Trước đây không bao giờ khớp. Nếu cùng chữ viết tắt được lưu với nhiều cách viết hoa, Ngó Sen dùng bản viết thường, nếu không có thì dùng bản lưu đầu tiên. Trình sửa macro coi `VN` và `vn` là cùng chữ viết tắt, đề nghị cập nhật thay vì thêm bản thứ hai.',
        pr: 194,
      },
      {
        claim: 'Trên thanh địa chỉ Firefox khi autofill, gõ chữ trùng với chữ tiếp theo của địa chỉ không còn làm mất từ đang gõ.',
        source: 'Trước đây Ngó Sen hiểu nhầm là click: `gox` vẫn là `gox`, `daaus` ra `daáu`. Giờ `gox` ra `gõ`, `daaus` ra `dấu`. Đã test với Firefox cài từ Flatpak trên Ubuntu GNOME.',
        pr: 209,
      },
      {
        claim: 'Thêm kiểm tra để phòng lỗi khi Gõ Sen mở lại macro kết thúc bằng dấu ngoặc kép hoặc dấu ba chấm, hoặc từ dùng VNI Windows.',
        source: 'Test tự động tìm thấy lỗi khi Backspace về từ vừa gõ: macro `q` → `“quá”`, rồi Backspace và `s` ra `“qua”s`, hoặc từ dùng VNI Windows ra `ñöä`. Chưa gặp lỗi này trong app: version trước không bị khi test trên Ubuntu GNOME và Linux Mint trong ô chữ GTK, LibreOffice Writer và xterm. Thay đổi chỉ để phòng lỗi; từ thường vẫn mở lại được trong VNI Windows / TCVN3.',
        pr: 199,
      },
    ],
  },
  {
    version: '1.5.4-3',
    date: '20/10/2026',
    summary:
      'Version đóng gói lại, code chương trình giống 1.5.4-1 nên ai đã cài 1.5.4-1 hoặc 1.5.4-2 không cần cập nhật. Danh sách thay đổi của 1.5.4 nằm ở mục 1.5.4-1.',
    changes: [
      {
        claim: 'Form yêu cầu tính năng trên GitHub ngắn hơn, có thêm form báo lỗi cài đặt hoặc cập nhật.',
        source: 'Issue mới phải đi qua một form, không còn mở issue trống; câu hỏi chuyển sang “Hỏi đáp” ở Discussions. Tăng lần đóng gói để đưa các form mới lên nhánh mặc định của GitHub.',
        pr: 190,
      },
    ],
  },
  {
    version: '1.5.4-2',
    date: '20/10/2026',
    summary:
      'Version đóng gói lại, code chương trình giống 1.5.4-1 nên ai đã cài 1.5.4-1 không cần cập nhật. Danh sách thay đổi của 1.5.4 nằm ở mục 1.5.4-1.',
    changes: [
      {
        claim: 'Mẫu báo lỗi mới ưu tiên “Kiểm tra máy tôi…” để tự điền báo cáo, yêu cầu nhật ký từ “Lưu nhật ký gõ”.',
        source: 'Mẫu hỏi chế độ gõ, app và Wayland hay X11; hướng dẫn lấy log fcitx5 hoặc backtrace khi fcitx5 bị treo. Tăng lần đóng gói để đưa mẫu mới lên nhánh mặc định của GitHub.',
        pr: 188,
      },
    ],
  },
  {
    version: '1.5.4-1',
    date: '20/10/2026',
    summary:
      'Version sửa lỗi: Gõ Sen trong Chrome/Chromium trên Wayland ghép dấu đúng hơn ở TikTok và Draft.js; sửa lỗi macro mất dấu cách.',
    changes: [
      {
        claim: 'Gõ Sen trong Chrome/Chromium trên Wayland ghép dấu đúng trong bình luận TikTok và ở từ đầu ô Draft.js khi chữ gợi ý biến mất.',
        source: 'Không còn để nguyên `ddungs rooif` thay vì `đúng rồi`. Chrome trên GNOME cũng sửa lỗi mất chữ như `xin chào` thành `xin ch`, `đẹp` thành `ẹp` trong bình luận TikTok và ô Draft.js thường (#180): giữ từ khi ô mất focus rồi có lại ngay, chờ trang vẽ lại ô mới commit. Tuy vậy, từ đầu có dấu thanh gõ ngay sau khi click vào ô Draft.js trong Chrome trên GNOME đôi lúc vẫn mất chữ; các từ sau bình thường.',
        pr: 176,
      },
      {
        claim: 'Macro có nội dung bắt đầu bằng chữ viết tắt, như `e` → `em`, không còn mất dấu cách khi bấm Space.',
        source: 'Gõ `e ko` ra `em không` thay vì `emkhông`.',
        pr: 179,
      },
    ],
  },
  {
    version: '1.5.3-2',
    date: '20/10/2026',
    summary:
      'Version đóng gói lại, code chương trình giống 1.5.3-1 nên ai đã cài 1.5.3-1 không cần cập nhật. Danh sách thay đổi của 1.5.3 nằm ở mục 1.5.3-1.',
    changes: [
      {
        claim: 'Sửa lỗi build Fedora COPR khiến `dnf upgrade` từ kho `nguyenphi/ngosen` không nhận được version 1.5.3.',
        source: 'Phần còn lại giống 1.5.3-1.',
        pr: 169,
      },
    ],
  },
  {
    version: '1.5.3-1',
    date: '19/10/2026',
    summary:
      'Sửa lỗi Gõ Sen khi xoá lùi, trong gnome-text-editor, thanh địa chỉ Firefox ESR và các trình duyệt dựa trên Firefox, XIM trên X11 và Wine trên Wayland. Có thêm kho cài đặt và gói Ubuntu 26.10.',
    changes: [
      {
        claim: 'Mỗi version phát hành được tự build trên kho COPR `nguyenphi/ngosen` cho Fedora.',
        source: '',
        pr: 133,
      },
      {
        claim: 'Có kho APT có chữ ký cho Debian, Ubuntu và các distro dựa trên chúng.',
        source: '',
        pr: 135,
      },
      {
        claim: 'Có kho pacman có chữ ký cho Arch, CachyOS và EndeavourOS.',
        source: '',
        pr: 137,
      },
      {
        claim: 'Có kho openSUSE Tumbleweed có chữ ký.',
        source: '',
        pr: 140,
      },
      {
        claim: 'Có gói cho Ubuntu 26.10 trên máy x86_64 và ARM 64-bit.',
        source: 'Lệnh cài một dòng và kho APT nhận Ubuntu 26.10.',
        pr: 150,
      },
      {
        claim: 'Gõ Sen trong WordCraft và các app dùng XIM trên X11 không còn rối chữ.',
        source: 'Trước đó có thể ra `dââấ` thay vì `dấu`. Ngó Sen xoá chữ bằng phím thật qua XTEST.',
        pr: 156,
      },
      {
        claim: 'Gõ Sen trong Wine 11 trên Wayland không còn rối chữ như `tiêến` thay vì `tiếng`.',
        source: 'Ngó Sen gửi phím xoá thẳng vào cửa sổ app, không hiện hộp hỏi quyền điều khiển.',
        pr: 158,
      },
      {
        claim: 'Thanh địa chỉ Firefox ESR, bản Firefox mặc định của Debian, không còn ra chữ thừa khi tự điền địa chỉ.',
        source: 'Trước đó có thể ra `coờ` thay vì `cờ`.',
        pr: 162,
      },
      {
        claim: 'Thanh địa chỉ các trình duyệt dựa trên Firefox cũng không còn ra chữ thừa khi tự điền địa chỉ.',
        source: 'Áp dụng cho Zen, LibreWolf, Waterfox, Floorp, Mullvad Browser và GNU IceCat. Trước đó có thể ra `moờ` thay vì `mờ`.',
        pr: 164,
      },
      {
        claim: 'Gõ Sen sửa tiếp đúng từ khi xoá lùi qua dấu cách vào từ vừa gõ rồi gõ tiếp, kể cả trong kitty.',
        source: 'Gõ `duyeet`, dấu cách, xoá còn `du` rồi gõ `yeejt` ra `duyệt`, trước đó ra `duyeejt`.',
        pr: 142,
      },
      {
        claim: 'Gõ Sen trong gnome-text-editor không còn mất chữ khi xoá lùi giữa từ rồi gõ tiếp.',
        source: 'Gõ `toan`, xoá một chữ rồi gõ `nf` ra `toàn`, trước đó ra `toòn`.',
        pr: 149,
      },
      {
        claim: 'Nhật ký gõ ghi đúng app khi chuyển qua lại giữa các cửa sổ.',
        source: 'Trước đó quay lại ô đã gõ thì phím ở đó bị ghi dưới tên app vừa rời.',
        pr: 143,
      },
      {
        claim: 'Nút “Mặc định” sáng ngay khi có gõ tắt, keymap riêng hay từ thêm vào từ điển.',
        source: 'Không cần mở trang đó trước.',
        pr: 132,
      },
    ],
  },
  {
    version: '1.5.2-1',
    date: '18/10/2026',
    summary:
      'Version sửa lỗi cửa sổ cài đặt: nút phím ở trang “Phím › Phím tắt” không còn bị cắt mép hay mất khi phóng to cửa sổ.',
    changes: [
      {
        claim: 'Ở trang “Phím › Phím tắt”, nút phím ở cuối mỗi hàng chế độ không còn bị cắt mép, và không biến mất khi phóng to cửa sổ.',
        source: 'Phần còn lại giống 1.5.1.',
        pr: 128,
      },
    ],
  },
  {
    version: '1.5.1-1',
    date: '18/10/2026',
    summary:
      'Nút “Kiểm tra máy tôi…” trong cửa sổ cài đặt, và lõi gõ Rust cho cả Debian 13 và Ubuntu 22.04. Version 1.5.0 không được phát hành; 1.5.1 là 1.5.0 thêm bản sửa viết hoa sau Enter.',
    changes: [
      {
        claim:
          'Nút “Kiểm tra máy tôi…” ở tab “Giới thiệu” xem fcitx5 có chạy không, Ngó Sen có trong danh sách bộ gõ không, các biến GTK_IM_MODULE, QT_IM_MODULE, XMODIFIERS có đúng không và IBus có chạy song song không.',
        source: 'Mỗi lỗi kèm cách sửa. Trên KDE Wayland còn xem fcitx5 có được chọn làm bàn phím ảo không.',
        pr: 88,
      },
      {
        claim: '“Kiểm tra máy tôi” test được một app: gõ câu mẫu trong app, lưu nhật ký gõ rồi đọc lại trong cửa sổ đó.',
        source:
          'Nếu app có báo chữ cho bộ gõ, “Kiểm tra máy tôi” tự biết gõ đúng hay sai. Nút “Báo cáo lỗi…” mở trang báo lỗi trên GitHub đã điền sẵn kết quả, không tự gửi gì.',
        pr: 90,
      },
      {
        claim: 'Gói Debian 13 và Ubuntu 22.04 chuyển sang lõi gõ Rust như các gói khác.',
        source: 'Chỉ gói Debian 12 còn dùng lõi Go.',
        pr: 91,
      },
      {
        claim: '“Tự viết hoa đầu câu” viết hoa cả chữ đầu dòng sau Enter trong app GTK như xed.',
        source: 'Trước đó app báo reset lúc xuống dòng, và bộ gõ quên mất chữ sau đó là đầu câu.',
        pr: 117,
      },
      {
        claim: 'Chọn kiểu gõ Custom khi chưa có phím nào thì cửa sổ cài đặt hiện dòng nhắc bật Keymap tuỳ chỉnh.',
        source: 'Trước đó gõ không ra dấu mà cửa sổ không nói gì.',
        pr: 123,
      },
      {
        claim: 'Ở “Phím › Phím tắt”, cảnh báo trùng phím không còn đè lên tên chế độ.',
        source: 'Hàng giãn ra cho đủ chỗ, nút phím không còn bị co lại.',
        pr: 124,
      },
    ],
  },
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
      'Version 1.4: lệnh cài một dòng tự đặt fcitx5 làm bộ gõ trên GNOME, Xfce, Cinnamon và MATE, có thêm lệnh gỡ, cửa sổ cấu hình bớt mục thừa.',
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
      'Version 1.3: tuỳ chọn Backspace chỉ xoá dấu thanh, icon mới hai cọng ngó sen và icon khay rõ trên panel tối.',
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
          'Mỗi lần lưu hiện dòng “Đã lưu” kèm nút Hoàn tác để khôi phục đúng cài đặt trước đó, kể cả luật app, gõ tắt và từ điển riêng.',
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
      'Version 1.0: Ngó Sen chỉ làm cho fcitx5. Click sang ô khác rồi gõ giờ đã ra đúng chữ trong LibreOffice Calc, WPS Office và Google Sheets.',
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
        source: 'Trước đó chữ ra lẫn chữ của ô trước hoặc hộp thoại “Delete Contents” mở ra.',
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
  'Mức đã test lấy từ lần test version 0.5. Các bản sửa bảng tính trong 1.0 được test trên máy ảo CachyOS (KDE Wayland), với LibreOffice Calc, WPS Office và Google Sheets trong Firefox. Version 1.1 đổi tên các file cài vào máy. Lần cập nhật từ 1.0.0-1 được test trên máy ảo Linux Mint 22 (Cinnamon X11): cấu hình cũ được chép sang, bộ gõ vẫn nằm trong danh sách và gõ ra đúng chữ. Version 1.2 thay cửa sổ cài đặt. Lưu và Hoàn tác qua fcitx5 thật được test trên máy ảo Linux Mint 22 (Cinnamon X11), CachyOS (KDE Wayland) và Ubuntu 26.04 (GNOME Wayland). Trên máy ảo CachyOS (KDE Wayland), version 1.2 gõ ra đúng chữ trong GNOME Text Editor. Bản sửa lỗi đảo chữ trong gnome-terminal được test bằng client D-Bus giả lập và gõ tay trong gnome-terminal: không còn đảo chữ. Version 1.2.1 chỉ bỏ trang Ứng dụng khỏi cửa sổ cài đặt, bộ gõ không đổi. Cửa sổ 4 trang được mở trên máy ảo CachyOS (KDE Wayland), cả giao diện sáng và tối. Version 1.2.2 sửa nhãn cạnh con trỏ và lỗi mất dấu trên thanh địa chỉ Edge. Lỗi Edge được tái hiện bằng một test viết lại từ log gõ phím trên Fedora 44 (KDE Wayland), rồi gõ tay lại trên Edge sau khi sửa: ra đúng “ngó”, cạnh con trỏ hiện “vi”. Version 1.3.0 thêm tuỳ chọn Backspace xoá dấu thanh, được gõ tay trên Fedora 44 (KDE Wayland) với bản build từ nhánh next. Icon khay mới được xem trên máy ảo Linux Mint 22.3 (Cinnamon) và MX Linux 25.3 (Xfce). Gói Debian 13 được cài trên máy ảo MX Linux 25.3: Telex “vieejt” ra “việt” trong terminal GTK. Lần cập nhật từ 1.0.0-1 rồi chạy fcitx5 -rd cũng được test trên máy ảo MX Linux 25.3: Ngó Sen vẫn nằm trong danh sách bộ gõ. Version 1.4.0 chủ yếu đổi lệnh cài một dòng. Lệnh cài được chạy trên máy ảo Ubuntu 26.04 (GNOME Wayland), CachyOS (GNOME 51), Linux Mint (Cinnamon X11) và MX Linux 25 (Xfce X11) với bản build từ nhánh next: sau khi đăng nhập lại, Ctrl+Shift rồi Telex “tieengs vieetj” ra “tiếng việt” trong ô chữ GTK3, 3/3 lần trên mỗi máy. Lệnh gỡ được test trên Ubuntu 26.04 (IBus chạy lại) và MX Linux 25. Version 1.4.1 chỉ đổi lệnh cài, bộ gõ giữ nguyên như 1.4.0. Lệnh cài trên KDE được chạy trên máy ảo CachyOS (Plasma 6.7 Wayland) với tài khoản chưa cấu hình bộ gõ: sau khi đăng nhập lại, Ctrl+Shift rồi Telex “tieengs vieetj” ra “tiếng việt” 3/3 lần trong ô chữ Qt6 và 3/3 lần trong ô chữ GTK3; trước khi sửa, ô chữ Qt6 ra chữ thô. Với gói 1.4.0, Chrome 155, VS Code, Discord, Firefox và GNOME Text Editor (Flatpak) gõ đúng trên máy ảo Ubuntu 26.04 (GNOME Wayland); Chrome ép chạy qua Xwayland sai 5/30 lần. Version 1.4.2 là version sửa lỗi, test với bản build từ nhánh release/1.4.2. Ô hỏi của Gemini trong Chromium trên máy ảo CachyOS (Plasma Wayland): “ddown” ở đầu ô trống ra “đơn” 3/3 câu (trước khi sửa ra “n”). Trên Sway (CachyOS), dòng “dduwowngf tieengs vieetj…” ra đúng “đường tiếng việt…” trong ô chữ GTK3 và Firefox. Trên máy ảo Ubuntu 26.04 (GNOME Wayland), “ddwowngf tieengs vieetj” ra “đường tiếng việt” 2/2 lần trong Ptyxis và 2/2 lần trong GNOME Console. Gói ARM 64-bit được bạn ansidev cài và chạy trên Ubuntu 26.04 (máy ảo VMware) từ version thử. Version 1.4.3 là version sửa lỗi, test bằng gói Ubuntu 24.04 build từ PR #111 trên máy ảo Linux Mint 22.1 (Cinnamon X11, fcitx5 5.1.7): sau khi thêm “kạ” vào từ điển tuỳ chỉnh, bật “Từ điển tuỳ chỉnh” thì “kaj” ra “kạ” 2/2 lần, bỏ chọn thì ra “kaj” 2/2 lần. Cùng các bước đó với 1.4.2 thì cả hai lần đều ra “kạ”. Version 1.5.0 không được phát hành. Gói 1.5.0 được gõ thử trên máy ảo Linux Mint 22.1 (Cinnamon X11, gói noble), Ubuntu 26.04 (GNOME Wayland, gói resolute) và MX Linux 25 (Xfce X11, gói trixie, lần đầu dùng lõi Rust): trên cả ba, “tieengs vieetj” ra “tiếng việt” trong ô chữ GTK3; trên MX, “nguwowif vieetj nam” ra “người việt nam”. Trên Ubuntu 26.04, chọn kiểu gõ Custom thì cửa sổ cài đặt hiện dòng nhắc, và “Kiểm tra máy tôi…” báo không có lỗi cài đặt. Gói 1.5.1 được gõ thử lại trên Mint và Ubuntu 26.04: bật “Tự viết hoa đầu câu”, gõ “ban. tooi”, Enter, “xin” ra “Xin” ở dòng mới (gói 1.5.0 ra “xin”); gõ thường vẫn ra “tiếng việt”. Version 1.5.2 là version sửa lỗi cửa sổ cài đặt, test trên máy ảo Ubuntu 26.04 (GNOME Wayland, gói resolute): ở trang Phím › Phím tắt, nút phím của cả năm chế độ hiện đủ khi cửa sổ nhỏ, khi phóng to, và khi thu nhỏ lại sau đó (1.5.1 mất nút khi phóng to); gõ “tieengs vieetj” vẫn ra “tiếng việt”.' +
  ' Version 1.5.3 (PR #151, sau các sửa cuối) được test bằng cách gửi phím vào máy ảo, dùng Gõ Sen, Telex. Mỗi lượt gõ hai lần cùng một dòng: “duyeet”, dấu cách, 5 Backspace, “yeejt” ra “duyệt”; “toan”, dấu cách, 2 Backspace, “nf” ra “toàn”; “ban”, dấu cách, 1 Backspace, “f” ra “bàn”; rồi “tieengs vieetj xin chaof cacs banj, hoom nay trowif ddepj quas” ra “tiếng việt xin chào các bạn, hôm nay trời đẹp quá”. Trên Linux Mint 22.1 (Cinnamon X11, gói noble), ô chữ GTK3, ô chữ GTK3 ép dùng XIM và xed đều đúng; xterm (XIM) đúng 5/10 lượt, các lượt còn lại lỗi vài từ khi phím dồn tới. Gói 1.5.2 trên cùng máy lỗi 2/5 lượt, nên lỗi này đã có trước 1.5.3. Trên Ubuntu 26.04 (GNOME Wayland, gói resolute), ô chữ GTK3, gnome-text-editor và xterm đều đúng; Wine 11.20 Notepad đúng cả ba trường hợp Backspace, nhưng 2/4 dòng có một hoặc hai từ lỗi (“chaà”, “tiêễn”), so với 4/4 dòng lỗi ở 1.5.2 trên cùng máy. Các lỗi còn lại đến từ Wine.' +
  ' Gói build từ nhánh patch sau #143 và từ PR #149 (cùng code với 1.5.3, chỉ khác số version) được gõ thử trên máy ảo Ubuntu 26.04 (GNOME Wayland, gói resolute), Linux Mint 22.1 (Cinnamon X11, gói noble) và CachyOS (KDE Plasma Wayland, gói Arch), dùng Gõ Sen, Telex. Gõ “duyeet”, dấu cách, xoá còn “du” rồi “yeejt” ra “duyệt”; “toan”, xoá một chữ rồi “nf” ra “toàn”; “ban”, dấu cách, xoá một chữ rồi “f” ra “bàn”. Đã test trong gnome-text-editor, xed, ô chữ GTK3 và GTK4, Ptyxis, gnome-terminal, Konsole, kitty, VS Code, Chrome và Firefox; giữ phím xoá rồi gõ tiếp vẫn đúng. VNI cũng được gõ thử với lỗi xoá qua dấu cách. LibreOffice và Firefox bản snap chưa được sửa lỗi xoá qua dấu cách, nhưng gõ không bị lỗi thêm.' +
  ' Ngày 20/10/2026, bản build từ nhánh patch (cùng code chương trình với 1.5.4-1), chép đè lên gói đã cài trên máy ảo, được test bằng Gõ Sen, Telex. Gõ “tieengs vieetj xin chaof cacs banj hoom nay trowif ddepj quas ddungs rooif” ra “tiếng việt xin chào các bạn hôm nay trời đẹp quá đúng rồi” trên hai trang test: ô Draft.js thường và ô vẽ lại sau mỗi phím.' +
  ' Ubuntu 26.04 (GNOME Wayland, gói resolute): Chrome đúng 6/6 lượt, không mất commit; Firefox đúng 4/4 lượt; ô chữ GTK3 đúng 2/2 lượt. Với macro “e” → “em”, “ko” → “không”, gõ “e ko a” ra “em không a” trong ô chữ GTK3 và Chrome. Ô bình luận TikTok thật trong Chrome trên Ubuntu đã được test ở #176, đúng 23/23 từ; không được test lại trên gói cuối.' +
  ' Linux Mint 22.1 (Cinnamon X11, gói noble): Chromium đúng 4/4 lượt. CachyOS (KDE Plasma Wayland, gói Arch): Chromium đúng 6/6 lượt trên hai trang Draft.js và một ô textarea thường.' +
  ' Gói 1.5.5 từ PR phát hành #208 được gõ thử trên máy ảo ngày 20–21/10/2026, dùng Gõ Sen, Telex, trừ lượt VNI Windows ghi riêng bên dưới.' +
  ' Ubuntu 26.04 (GNOME Wayland, gói “resolute”), Firefox cài từ Flatpak, thanh địa chỉ khi Firefox autofill: “gox” → “gõ”, “daaus” → “dấu”, “ee” → “ê”, “es” → “é”, “dduowcj” → “được”, mỗi trường hợp đúng 3/3 lượt. Với 1.5.4-3 trên cùng máy ảo: “ee” → “eê” 3/3 lượt, “gox” vẫn là “gox” 3/3 lượt, “daaus” → “daáu” 3/3 lượt.' +
  ' Ubuntu 26.04 và Linux Mint 22.1 (Cinnamon X11, gói “noble”), ô chữ GTK3, macro “VN” → “Việt Nam” và “q” → `“quá”`: gõ “Vn VN q”, Space, Backspace, “s” ra `Việt Nam VIỆT NAM “quá”s` (1.5.4-3 ra `Vn VN “quá”s`). Câu 13 từ “tieengs vieetj xin chaof cacs banj hoom nay trowif ddepj quas ddungs rooif” ra “tiếng việt xin chào các bạn hôm nay trời đẹp quá đúng rồi” trên cả hai máy ảo.' +
  ' Ubuntu 26.04, ô chữ GTK3: click vào trong văn bản ngay sau khi gõ vẫn được nhận là click, đúng 2/2 lượt và thêm một lượt trên gói cuối.' +
  ' Linux Mint 22.1, xterm: mở lại từ cuối vẫn được, “vieetj”, Space, Backspace, “s” → “viết”; với VNI Windows, “ban”, Space, Backspace, “f” → “baøn”.' +
  ' CachyOS, Fedora, Debian, openSUSE và Kali chưa được gõ thử với 1.5.5.' +
  ' Gói 1.5.6 từ PR phát hành #268 được gõ thử trên máy ảo ngày 23/10/2026, dùng Gõ Sen, Telex.' +
  ' Linux Mint 22.1 (Cinnamon X11, gói “noble”), Chromium, Google Sheets: gõ thẳng vào ô rồi Enter, mỗi trường hợp đúng 3/3 lượt: “dduowcj” → “được”; câu “tieengs vieetj laf ngoon nguwx cuar nguwowif vieetj nam” gõ nhanh (30 ms giữa các phím) → “tiếng việt là ngôn ngữ của người việt nam”; “Haf Nooij ddeens 2026 thangs 10” → “Hà Nội đến 2026 tháng 10”; “toan”, Backspace, “s” → “toán”; “duyeet”, 5 Backspace, “yeejt” → “duyệt”. Câu dài trên cũng đúng 3/3 lượt khi gõ nhanh sau khi bấm F2 mở ô.' +
  ' Ubuntu 26.04 (GNOME Wayland, gói “resolute”), app GLFW chạy qua Xwayland (hộp chữ dựng bằng LWJGL 3.4.1, GLFW 3.5.0, giống Minecraft Java): “tieengs”, Backspace, “ vieetj” → “tiến việt”; câu “tieengs vieetj laf ngoon nguwx cuar nguwowif vieetj nam” → “tiếng việt là ngôn ngữ của người việt nam”, đúng 3/3 lượt.' +
  ' Ubuntu 26.04, Chrome: gõ “tieen” rồi Enter trong ô chat đúng 3/3 lượt; gõ rồi Tab sang ô khác đúng 3/3 lượt. GNOME Text Editor: câu 13 từ “tieengs vieetj xin chaof cacs banj hoom nay trowif ddepj quas ddungs rooif” → “tiếng việt xin chào các bạn hôm nay trời đẹp quá đúng rồi”, đúng 3/3 lượt.' +
  ' Cửa sổ cài đặt (#212, #249, #250, #252, #253) và lệnh cài trên KDE (#251) không được test lại trên gói 1.5.6; CachyOS, Fedora, Debian, openSUSE và Kali chưa được gõ thử với 1.5.6.' +
  ' Gói 1.5.7 từ PR phát hành #293 được gõ thử trên máy ảo ngày 24/10/2026, dùng Gõ Sen, Telex, trừ lượt Preedit ghi riêng bên dưới.' +
  ' Linux Mint 22.1 (Cinnamon X11, gói “noble”), Firefox, ô chữ thường, ô contenteditable, TinyMCE và Lexical: câu “tieengs vieetj laf ngoon nguwx cuar nguwowif vieetj nam” gõ 120 ms và 30 ms giữa các phím → “tiếng việt là ngôn ngữ của người việt nam”; “toan”, dấu cách, Backspace, “s” → “toán”. Đúng 11/12 lượt; lượt còn lại trang Lexical báo ô trống chứ không ra chữ sai, gõ lại 3/3 lượt đúng. Terminal xterm.js: “toan”, dấu cách, Backspace, “s” → “toán”, đúng 4/4 lượt. gemini.google.com không đăng nhập, chế độ Preedit: gõ “xin chaof” rồi Enter một lần là gửi, đúng 3/3 lượt.' +
  ' CachyOS (KDE Plasma Wayland, gói Arch): ô chữ thường trong Firefox và Chromium, câu trên gõ 120 ms và 30 ms, “toan”, dấu cách, Backspace, “s” → “toán”, đúng 12/12 lượt; trước đó lượt đầu ngay sau khi Firefox mới mở sai 2 ca do máy ảo khựng. Máy có cả PyQt5 và PyQt6; cửa sổ cài đặt mở được và vẫn chạy sau 10 giây.' +
  ' Ubuntu 26.04 (GNOME Wayland, gói “resolute”): cửa sổ cài đặt mở được; Firefox snap, ô chữ thường: câu trên đúng ở cả hai tốc độ. “toan”, dấu cách, Backspace, “s” ra “toans” (3/3 lượt, 1.5.6 trên cùng máy cũng vậy): Firefox bản snap vẫn chưa được sửa lỗi xoá qua dấu cách.' +
  ' Lưu cài đặt khi fcitx5 khởi động lại lúc cửa sổ đang mở (#279) và dung lượng cài trên Ubuntu sạch (#280) không được test lại trên gói 1.5.7; phụ thuộc của gói .deb đã được đọc lại, chỉ còn “python3-pyqt6”. Fedora, Debian, openSUSE và Kali chưa được gõ thử với 1.5.7.' +
  ' Gói 1.5.8 từ PR phát hành #306 được test trên máy ảo ngày 26/10/2026 trên Ubuntu 26.04 (GNOME Wayland, gói “resolute”) và CachyOS (KDE Plasma Wayland, gói Arch). Trên mỗi máy, cửa sổ cài đặt mở được và vẫn chạy sau 10 giây. Phần lưu của cửa sổ cài đặt được gọi thẳng với fcitx5 đang chạy, mỗi máy một lượt: đổi một ô cài đặt chính và lưu một gõ tắt, rồi đọc lại; cả hai đều lưu được. Với gói 1.5.7-1 đã phát hành trên cùng hai máy, cả hai lần lưu đều bị fcitx5 từ chối và cài đặt không đổi. Chưa click lưu bằng chuột trong cửa sổ; Fedora, Debian, Mint, openSUSE và Kali chưa được test với 1.5.8.' +
  ' Gói 1.6.0 từ PR phát hành #314 được test trên máy ảo ngày 26/10/2026 trên Ubuntu 26.04 (GNOME Wayland, gói “resolute”) và Linux Mint 22 (Cinnamon X11, gói “noble”), dùng Gõ Sen, Telex. Nâng cấp: mỗi máy cài 1.5.8-1, lưu một cài đặt và một gõ tắt, rồi chạy install.sh với gói mới; fcitx5 tự nạp lại, cài đặt, gõ tắt và phím Ctrl+Space còn nguyên, Cứu chữ đã bật. Sau đó, trong một ô chữ GTK3 trên cả hai máy: gõ câu “dduwowngf tieengs Vieetj Nam cos dduwowjc khoong Haf Nooij” ra đúng chữ có dấu; gõ “tieengs vieetj” ở tiếng Anh rồi bật tiếng Việt, Cứu chữ đổi thành “tiếng việt”, bấm Esc trả lại chữ cũ; gõ “tieengs Nam” rồi bật tiếng Việt thì chỉ hiện gợi ý, bấm Tab giữ nguyên chữ đã gõ. Trên Ubuntu, bốn ca đó cũng đúng trong Chrome, và gõ câu trong terminal GNOME Console đúng; trên Mint, gõ câu trong Chrome đúng. Cài mới (gói build ngay trước bản sửa nâng cấp #315, bản sửa không đụng đường cài mới): mở ở tiếng Anh, Ctrl+Shift chuyển sang tiếng Việt, Cứu chữ bật sẵn. Fedora, Arch, Debian, openSUSE, Kali và KDE chưa được test với 1.6.0.' +
  ' Gói 1.6.1 từ PR phát hành #323 được test trên máy ảo ngày 26/10/2026, dùng Gõ Sen, Telex. Ubuntu 26.04 (GNOME Wayland, desktop tiếng Anh, gói “resolute”): cập nhật từ 1.6.0-1 bằng install.sh, fcitx5 tự nạp lại; trong một ô chữ GTK3, câu “dduwowngf tieengs Vieetj Nam cos dduwowjc khoong Haf Nooij” ra đúng chữ có dấu, Cứu chữ đổi “tieengs vieetj” thành “tiếng việt”, Esc trả lại chữ cũ, Tab giữ nguyên “tieengs Nam”; dòng gợi ý của Cứu chữ hiện tiếng Việt. Linux Mint 22 (Cinnamon X11, gói “noble”): cài gói bằng apt, không qua install.sh, rồi chạy fcitx5 lần đầu với “LANG=vi_VN.UTF-8”: Ngó Sen có sẵn trong danh sách bộ gõ. Mint chọn tiếng Việt bằng “LANGUAGE” mà giữ “LANG=en_US.UTF-8” thì danh sách vẫn chỉ có bàn phím. Sau đó cài bằng install.sh rồi khởi động lại: bốn ca trên đúng trong ô chữ GTK3, câu thử đúng trong Chrome. Fedora, Arch, Debian, openSUSE, Kali và KDE chưa được test với 1.6.1.' +
  ' Gói 1.6.2 từ PR phát hành #335 được test trên máy ảo ngày 27/10/2026, dùng Gõ Sen, Telex. Ubuntu 26.04 (GNOME Wayland, gói “resolute”): cập nhật bằng install.sh từ bản 1.5.5 dựng từ nhánh next, fcitx5 tự nạp version mới; trong một ô chữ GTK3, câu “dduwowngf tieengs Vieetj Nam cos dduwowjc khoong Haf Nooij” ra đúng “đường tiếng Việt Nam có được không Hà Nội”. Linux Mint 22 (Cinnamon X11, gói “noble”): cập nhật bằng install.sh từ 1.5.7-1, câu thử đúng trong ô chữ GTK3 và Chromium. Cứu dấu sau khi bấm chuột (#327) không được test lại trên gói này. Fedora, Arch, Debian, openSUSE, Kali và KDE chưa được test với 1.6.2.' +
  ' Các gói “resolute” build từ PR #365 và PR #370 được test ngày 27/10/2026 trên máy ảo Ubuntu 26.04 (GNOME Wayland), dùng Gõ Sen, Telex. Với gói từ PR #365, gõ 18 từ trong editor và ô chat của Antigravity 2.6.0 đều ra đúng “lẫn có cá lỗi tiếng việt được không nhiều chữ đường phố tôi biết là một ngày mái”; version 1.6.2 còn để nguyên một số chữ trong editor như “vieetj”, “nhieeuf”, “dduowngf”. Lỗi mất chữ trong ô chat không xuất hiện trên máy ảo kể cả với version 1.6.2, nên phần sửa này chỉ được đối chiếu với log gõ của người báo lỗi. Với gói từ PR #370, trên cả GNOME Text Editor, Firefox và editor của Antigravity 2.6.0, trường hợp Backspace cho “muốn sứa”, trường hợp bấm chuột cho “abc nhánh xyz”, và Esc trả lại “abc nhsanh xyz”. Chưa test với version 1.6.3 trên Fedora, Arch, Debian, openSUSE, Kali, KDE, X11, Linux Mint và Chromium.' +
  ' Gói 1.6.4-1 do CI dựng từ PR phát hành #406 được test trên máy ảo ngày 28/10/2026, dùng Gõ Sen, Telex; cài bằng dpkg -i rồi khởi động lại fcitx5 qua DBus. Ubuntu 26.04 (GNOME Wayland, gói “resolute”): GNOME Text Editor nhận “dduwowngf tieengs vieetj nam cos dduwowjc khoong haf nooij” ra “đường tiếng việt nam có được không hà nội”. Antigravity 2.6.0: gõ 18 từ không nghỉ giữa các phím trong chat và editor đều ra “lẫn có cá lỗi tiếng việt được không nhiều chữ đường phố tôi biết là một ngày mái”, đọc từ log gõ, không phải màn hình. MX Linux 25 (Xfce X11, gói “trixie”), Chromium: gõ cùng câu chữ thường, thêm “nhanh”, chọn bằng Ctrl+Shift+Left rồi nhấn “s” (Cứu dấu), được câu trên kèm “nhánh” ở 2/3 lượt. Lượt đầu ngay sau khi mở Chromium ra “dường”: phím “d” đầu được nhấn trước khi ô chữ nối với fcitx5 nên Ngó Sen không nhận được; chưa so với 1.6.3. deepin 25.2 (DDE X11, máy mới cài): install.sh của PR #408 với gói “bookworm” 1.6.4-1 chạy xong không lỗi, kéo “whiptail” cùng im-config 1.1 và thêm Ngó Sen vào danh sách bộ gõ; trước bản sửa, install.sh dừng ở bước im-config 2/2 lần. Với 1.6.4, chưa test cập nhật qua install.sh, Fedora, Arch, Debian 12, openSUSE, Kali, KDE, Linux Mint, Firefox, phím tắt Super trong Preedit (#392) và cửa sổ cài đặt (#376, #383).' +
  ' Gói 1.7.0-1 do CI dựng từ PR phát hành #432 được test trên máy ảo ngày 29/10/2026, dùng Gõ Sen, Telex, cài bằng install.sh với thư mục gói trên máy. Linux Mint 22 (Cinnamon X11, gói “noble”): cập nhật từ 1.6.3-1, fcitx5 tự nạp version mới; thông báo “Ngó Sen có gì mới?” hiện câu của version 1.7, bấm “Xem” mở cửa sổ cài đặt bản GTK ở trang “Có gì mới & mẹo”. Trong một ô chữ GTK 3, 5/5 câu thử ra đúng, trong đó “vieejt nguwowif ddaay hoaf quas giuwax tieengs khoong” gõ không nghỉ giữa các phím ra “việt người đây hoà quá giữa tiếng không”, kèm chữ hoa, sửa bằng Backspace và chuyển Anh/Việt giữa câu. Ubuntu 26.04 (GNOME Wayland, gói “resolute”): máy có gói fcitx5 1.6.3-1, install.sh cài 1.7.0-1; đăng nhập lại thì fcitx5 chạy, thông báo của version 1.7 nằm trong danh sách thông báo, cửa sổ cài đặt mở bản GTK, và cùng 5 câu thử đúng 5/5 trong ô chữ GTK 3. Với 1.7.0, chưa test Fedora, Arch, Debian, openSUSE, Kali, KDE, deepin (WPS, #430), trình duyệt và cài mới.' +
  ' Gói 1.7.1-1 do CI dựng từ PR phát hành #448 được test trên máy ảo ngày 30/10/2026, dùng Gõ Sen, Telex, cài bằng install.sh với thư mục gói trên máy, cập nhật từ 1.7.0-1. Câu thử: gõ “vieetj nam tieesng”, hai Backspace, “ng”, dấu cách, 0,15 giây giữa các phím, phải ra “việt nam tiếng”; mỗi app 4 lượt, chữ đọc từ app, đường xoá đọc từ log gõ. Ubuntu 26.04 (GNOME Wayland, gói “resolute”): Firefox snap, GNOME Text Editor và Chromium snap đều đúng 4/4; log cho thấy Gõ Sen xoá qua surrounding text ở cả ba app, riêng Firefox quay về Backspace mỗi khi Firefox báo lại chữ cũ (trường hợp #446 sửa) và không lần nào bị đánh dấu là không tin được. Máy này đang dùng IBus nên trước khi cài không có fcitx5 chạy; fcitx5 được bật bằng tay sau khi cài. Linux Mint 22 (Cinnamon X11, gói “noble”): install.sh tự nạp lại fcitx5; xed và Chromium đều đúng 4/4, hai app này nói chuyện với fcitx5 qua D-Bus và vẫn xoá bằng Backspace như trước. Với 1.7.1, chưa test Fedora, Arch, Debian, openSUSE, Kali, KDE, LibreOffice (#438, #441), cảnh báo forward-keys của GNOME 50 (#440), cảnh báo IBus (#442), chế độ chọn ở menu “,” trên fcitx5 cũ (#444) và cài mới.' +
  ' Gói 1.7.2-1 do CI dựng từ PR phát hành #454 được test trên máy ảo ngày 30/10/2026, dùng Gõ Sen, Telex, cài bằng install.sh với thư mục gói trên máy. Câu thử: gõ “vieetj nam tieesng”, hai Backspace, “ng”, dấu cách, 0,15 giây giữa các phím, phải ra “việt nam tiếng”; mỗi app 4 lượt, chữ đọc từ app, đường xoá đọc từ log gõ. Mỗi app có thêm một lượt đối chứng khi tắt tiếng Việt, đều ra chữ thô như dự kiến. Ubuntu 26.04 (GNOME Wayland, gói “resolute”), cập nhật từ 1.7.1-1: Firefox snap và GNOME Text Editor đều đúng 4/4; log cho thấy Gõ Sen xoá qua surrounding text ở cả hai app. Máy này đang dùng IBus nên fcitx5 được bật bằng tay sau khi cài. Linux Mint 22 (Cinnamon X11, gói “noble”), cập nhật từ 1.7.0-1: install.sh tự nạp lại fcitx5; xed và Chromium đều đúng 4/4. VS Code snap trên Ubuntu 26.04 chưa test được vì công cụ test không đưa được phím từ VS Code tới fcitx5, nên #453 chỉ được kiểm tra bằng test tự động. Với version 1.7.2, chưa test Fedora, Arch, Debian, openSUSE, Kali, KDE và cài mới.' +
  ' Gói “noble” do CI dựng từ PR #458 được test trên máy ảo ngày 30/10/2026; gói phát hành 1.7.3-1 có cùng mã nguồn, chỉ khác số version. Máy test dùng Linux Mint 22 (Cinnamon X11, fcitx5 5.1.7), Gõ Sen, Telex, cài bằng install.sh từ thư mục gói trên máy, cập nhật từ 1.7.0-1. xed, Chromium, Firefox và LibreOffice Writer được mở với “GTK_IM_MODULE=ibus” để đi tới fcitx5 qua cổng IBus của fcitx5. Câu thử như 1.7.2: gõ “vieetj nam tieesng”, hai Backspace, “ng”, dấu cách, 0,15 giây giữa các phím, phải ra “việt nam tiếng”; mỗi app 4 lượt, đều đúng 4/4. Mỗi app có thêm một lượt đối chứng khi tắt tiếng Việt, đều ra chữ thô như dự kiến. fcitx5 5.1.7 nhận tên app rỗng qua cổng IBus của fcitx5 ở cả bốn app, nên trên máy này version mới không thay đổi hành vi của fcitx5; xed và Writer vẫn xoá qua surrounding text, Chromium và Firefox vẫn dùng Backspace như trước. Với version 1.7.3, chưa test Ubuntu, Fedora, Arch, Debian, openSUSE, Kali, KDE và cài mới.' +
  ' Các gói CI của PR #465 và #467 được test trên máy ảo Ubuntu 26.04 (GNOME 50.1, fcitx5 5.1.19). Với #465, có extension, Chrome, trang chat: trước khi sửa, giữ Enter 10/30 ms gửi 30/30 lượt ở mỗi mức, giữ 80/120/200 ms gửi 0/30; sau khi sửa, giữ 10/120/300 ms đều gửi 30/30. Trên KDE Plasma Wayland (CachyOS, Chromium) và Linux Mint X11 Cinnamon (Chromium), bản 1.7.3 và bản sửa đều gửi 30/30, không dính lỗi. Với #467, tắt extension, gõ câu 14 chữ trong kitty bằng Gõ Sen: bản 1.7.3 sai 12/14 chữ, bản sửa sai 0/14. Gói 1.7.4-1 gồm cả ba bản sửa; gói CI đem test của #465 chưa có #466 và #467, gói CI của #467 chưa có #466. Với 1.7.4, chưa test Fedora, Arch, Debian, openSUSE, Kali, cài mới, app Electron và GNOME 50.0/50.2/50.3.' +
  ' Các gói phát hành 1.7.5-1 được test ngày 01/11/2026, dùng Gõ Sen, Telex, cài bằng install.sh tải gói từ release đã phát hành. Câu thử: gõ “vieetj nam tieesng”, hai Backspace, “ng”, dấu cách, 0,15 giây giữa các phím, phải ra “việt nam tiếng”; mỗi app 4 lượt. Ubuntu 26.04 (GNOME Wayland, gói “resolute”), cập nhật từ 1.7.0-1: GNOME Text Editor, Firefox snap và Chromium snap đều đúng 4/4; trong Chromium snap, gõ “nhes”, Enter, “a” với 30 ms giữa các phím ra “nhé”, xuống dòng, “a”, đúng 4/4 lượt. Linux Mint 22 (Cinnamon X11, gói “noble”), cập nhật từ 1.7.0-1: xed và Chromium đều đúng 4/4. CachyOS (KDE Plasma Wayland, gói Arch), cập nhật từ 1.6.2-1: GNOME Text Editor, Kate, Chromium và Firefox đều đúng 4/4. Với 1.7.5-1, chưa test Fedora, Debian, openSUSE, Kali, cài mới, GNOME 46, Sway và Google Docs.' +
  ' Gói 1.7.6-1 do CI dựng từ PR phát hành #533 được test trên máy ảo ngày 02/11/2026, dùng Gõ Sen, Telex, cài trực tiếp gói .deb hoặc gói Arch. Mỗi app 4 lượt, gõ “hoom nay trowif ddepj, tooi muoons ddi chowi vowis banj bef vieetj nam tieesng”, hai Backspace, “ng”, dấu cách, khoảng 0,15 giây giữa các phím; chữ đọc lại từ app đều ra “hôm nay trời đẹp, tôi muốn đi chơi với bạn bè việt nam tiếng”. Ubuntu 26.04 (GNOME Wayland, gói “resolute”): Firefox, Chrome, GNOME Text Editor đều đúng 4/4. CachyOS (KDE Wayland, gói Arch): Kate, Chromium đều đúng 4/4. Linux Mint 22 (Cinnamon X11, gói “noble”): xed và Firefox đều đúng 4/4. Không test lại Google Docs, Google Slides, WPS Office, cửa sổ cài đặt và lệnh cài trên gói này; các sửa đó được đo trên build của từng PR. #535 vào nhánh patch sau khi các gói này được dựng, nên chỉ qua test của PR đó.' +
  ' Gói 1.8.0-1 do CI dựng từ PR phát hành #588 được test trên máy ảo ngày 06–07/11/2026, dùng Gõ Sen, Telex, cài trực tiếp gói .deb. Mỗi app 4 lượt, fcitx5 khởi động lại trước mỗi lượt, cùng câu thử như 1.7.6. Ubuntu 26.04 (GNOME 50 Wayland, gói “resolute”), cập nhật từ một bản dựng thử của 1.7.6: GNOME Text Editor, Firefox, Chromium đều đúng 4/4 khi bật extension và 4/4 khi tắt extension. Linux Mint 22.1 (Cinnamon X11, gói “noble”), cập nhật từ 1.7.6-1: xed, Firefox, Chromium đều đúng 4/4. Trên cả hai máy, khởi động lại fcitx5 với AnnouncedVersion đặt về 1.7 thì thông báo “Ngó Sen có gì mới?” của version 1.8 hiện một lần. Không test lại trên gói này: KDE, Sway, Hyprland, Fedora, Arch, Debian, openSUSE, Kali, cài mới, lệnh cài và trang Kiểm tra máy; các sửa đó được đo trên build của từng PR.' +
  ' Gói 1.8.1-1 (“bookworm”) do CI dựng từ PR phát hành #593 được test trên máy ảo Debian 12 ngày 07/11/2026, cập nhật từ 1.7.6-1 bằng apt, dùng Gõ Sen, Telex. Chromium 156 và Firefox ESR 153, mỗi app ở GNOME 43 Wayland và ở X11: câu “hoom nay trowif ddepj, tooi muoons ddi chowi vowis banj bef vieetj nam tieesng”, hai Backspace, “ng”, dấu cách, 0,15 giây giữa các phím, ra “hôm nay trời đẹp, tôi muốn đi chơi với bạn bè việt nam tiếng” 4/4 lượt; gõ “loox” rồi Left hoặc Home 5 ms sau phím dấu, rồi “b”, ra “lbỗ” và “blỗ” 2/2 lượt mỗi phím. Tổng 32/32. Trước đó, trên cùng máy với bản dựng từ mã nguồn, mũi tên và Home bấm 5 ms sau phím dấu trong Chromium ở Wayland đúng 8/8 (1.8.0: 0/8); Ctrl+A trong Chromium ở Wayland vẫn ra chữ “a” ở cả hai bản (0/4). Không test lại trên gói này: Ubuntu, Mint, KDE, Sway, Hyprland, Fedora, Arch, openSUSE, Kali, cài mới, lệnh cài và trang Kiểm tra máy.' +
  ' Hai bản sửa của 1.8.2-1 được kiểm bằng test của lõi, chưa được gõ thử trong app thật.' +
  ' Gói 1.8.3-1 do CI dựng từ PR phát hành #635 được gõ thử trên máy ảo ngày 08/11/2026: Linux Mint 22.1 (Cinnamon X11, gói “noble”, cập nhật từ 1.8.0-1 bằng cách cài file .deb) và CachyOS (KDE Plasma Wayland, gói Arch), dùng Gõ Sen, Telex, thiết lập mặc định. Firefox và Chromium, mỗi app thử trên trang textarea và contenteditable div, mỗi trường hợp 4 lượt, fcitx5 khởi động lại trước mỗi dòng test, 0,12 giây giữa các phím. Trên mỗi máy ảo, “tieengs vieetj laf ngoon nguwx cuar nguwowif vieetj nam ” ra “tiếng việt là ngôn ngữ của người việt nam” 16/16 lượt; “sose2026 tooi2 ” ra “sose2026 tôi2” 16/16 lượt (#614); “dduoxwcj parts ” ra “được parts” 16/16 lượt (#622). Tổng 96/96. Không test lại trên gói này: Ubuntu, GNOME, Sway, Hyprland, Fedora, Debian, openSUSE, Kali, VNI, cài mới, lệnh cài và trang Kiểm tra máy.' +
  ' Gói 1.9.0-1 do CI dựng từ PR phát hành #639 được gõ thử trên máy ảo ngày 09/11/2026, dùng Gõ Sen, Telex. Firefox và Chromium, mỗi app thử trên trang textarea và contenteditable div, fcitx5 khởi động lại trước mỗi dòng test, 0,12 giây giữa các phím. Linux Mint 22.1 (Cinnamon X11, gói “noble”, cập nhật từ 1.8.0-1) và CachyOS (KDE Plasma Wayland, gói Arch, cập nhật từ 1.7.6-1), mỗi máy 4 lượt: “tieengs vieetj laf ngoon nguwx cuar nguwowif vieetj nam ” ra “tiếng việt là ngôn ngữ của người việt nam”, “sose2026 tooi2 ” ra “sose2026 tôi2”, “dduoxwcj parts ” ra “được parts”, đúng 48/48 trên mỗi máy. Ubuntu 26.04 (GNOME 50.1 Wayland, fcitx5 5.1.19, gói “resolute” cài bằng apt, không có biến môi trường của install.sh, cập nhật từ 1.7.6-1), câu trên, 2 lượt tắt extension rồi 2 lượt bật: Ngó Sen nhận đúng tên app 16/16 (tắt extension thì lấy từ portal, bật thì lấy từ extension); chữ đúng 15/16. Lượt sai là Firefox tắt extension ngay sau khi cài, ra “ngư” thay vì “người”; đo lại cùng chỗ thì 1.8.3-1 đúng 8/8, 1.9.0-1 đúng 8/8. Trên cả ba máy, Ngó Sen ghi đã gửi thông báo version 1.9 một lần (đọc từ log và cài đặt, không xem trên màn hình). Không test lại trên gói này: Fedora, Debian, openSUSE, Kali, Sway, Hyprland, terminal, VNI, cài mới, lệnh cài và trang Kiểm tra máy.';

// Mirrors the "Máy ARM 64-bit" row of packaging/release-notes.md, which spans several distros and cores.
export const ARM_NOTE = {
  packages:
    'Máy ARM 64-bit (aarch64) có gói .deb arm64 cho Debian, Ubuntu, Kali và gói .aarch64.rpm cho Fedora 43, 44, 45; lệnh cài một dòng tự chọn gói theo máy.',
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
    core: 'Rust',
  },
  {
    name: 'Kali Rolling',
    level: 'vm',
    basis: 'đã gõ thử trên máy ảo Kali 2026.2 (Xfce X11)',
    file: 'fcitx5-ngosen_*_forky_amd64.deb',
    core: 'Rust',
  },
  {
    name: 'Fedora 45',
    level: 'built',
    basis: 'chỉ build và chạy test lúc build',
    file: 'fcitx5-ngosen-*.fc45.x86_64.rpm',
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
    name: 'Ubuntu 26.10',
    level: 'built',
    basis: 'chỉ build và chạy test lúc build',
    file: 'fcitx5-ngosen_*_stonking_amd64.deb',
    core: 'Rust',
  },
  {
    name: 'Debian 12',
    level: 'built',
    basis: 'chỉ build và chạy test lúc build',
    file: 'fcitx5-ngosen_*_bookworm_amd64.deb',
    core: 'Rust',
  },
];

// Mirrors the introduction and features in README.md in ngosen/ngosen.
export const TAGLINE = 'Bộ gõ tiếng Việt cho fcitx5 trên Linux, cho trải nghiệm gõ như UniKey trên Windows.';

export const HIGHLIGHTS: { title: string; text: string }[] = [
  {
    title: 'Cứu chữ',
    text: 'Quên bật tiếng Việt, gõ tieengs vieetj rồi bấm phím chuyển sang tiếng Việt thì chữ đổi thành tiếng việt. Tab hoặc Esc trả lại chữ đã gõ.',
  },
  {
    title: 'Cứu dấu',
    text: 'Bôi đen chữ rồi gõ phím dấu để thêm, đổi hoặc bỏ dấu thanh, như nhanh + s → nhánh. Dùng được ở app cho bộ gõ đọc surrounding text. Chromium, Vivaldi, Cốc Cốc và WPS trên X11 cũng dùng được qua chữ đang bôi đen.',
  },
  {
    title: 'Phím chuyển Anh/Việt riêng',
    text: 'Cài mới dùng Ctrl+Shift như UniKey; đã cài từ trước giữ Ctrl+Space. Khi ở tiếng Anh, gõ như không có bộ gõ. Mỗi app nhớ riêng Anh hay Việt qua lần đăng xuất; app chưa bấm lần nào theo lần bấm gần nhất.',
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
    title: 'Cài bằng một dòng lệnh',
    text: 'Có cho Fedora, Ubuntu (từ 24.04), Debian (từ 12), Kali, deepin, LMDE, Devuan, Parrot, Arch, Artix, CachyOS và openSUSE Tumbleweed trên x86_64. Fedora, Ubuntu, Debian và Kali còn có gói ARM 64-bit. Script so hash SHA-256 và hỏi lại trước khi cài.',
  },
  {
    title: 'Cửa sổ cài đặt Qt hoặc GTK',
    text: 'Cửa sổ cài đặt có hai bản: Qt và GTK (giống app GNOME). GNOME và Linux Mint (Cinnamon) mở bản GTK, các desktop khác mở bản Qt. Cửa sổ dùng giao diện sáng, tối của máy trên KDE và GNOME; đổi gì lưu ngay, có nút Hoàn tác.',
  },
];

// Mirrors the top of the README on main.
export const SCOPE = {
  title: 'Chỉ làm cho fcitx5',
  text: 'Ngó Sen làm cho fcitx5. fcitx5 chạy được trên GNOME, KDE, Xfce, Sway và Hyprland, có nhiều tính năng và nhẹ RAM.',
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
        summary: 'Phím chuyển Anh/Việt, dấu hiệu đang bật, đổi phím khác.',
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
        href: '/huong-dan/cuu-chu-cuu-dau/',
        label: 'Sửa chữ quên bật tiếng Việt',
        summary: 'Cứu chữ gõ khi quên bật tiếng Việt, Cứu dấu cho chữ đang bôi đen.',
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
        summary: 'Từ viết tắt thành cụm từ đầy đủ, chữ hoa, ngày giờ và phím chốt chữ.',
      },
      {
        href: '/huong-dan/tu-sua-dau-cau/',
        label: 'Tự sửa dấu câu',
        summary: 'Hai gạch nối thành gạch dài, hai dấu cách thành dấu chấm, viết hoa đầu câu và đầu dòng.',
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
        summary: 'Icon trạng thái hay một màu, ẩn mục trong menu khay, ngôn ngữ giao diện.',
      },
      {
        href: '/huong-dan/cua-so-cai-dat/',
        label: 'Chọn cửa sổ cài đặt Qt hay GTK',
        summary: 'Hai bản của cửa sổ cài đặt, bản GTK trông thế nào, nút đổi sang bản kia.',
      },
      {
        href: '/huong-dan/tim-sao-luu/',
        label: 'Tìm cài đặt, hoàn tác và sao lưu',
        summary: 'Ô tìm cài đặt, nút Hoàn tác, Mặc định, Sao lưu và Khôi phục.',
      },
    ],
  },
  {
    title: 'Khi gặp lỗi',
    pages: [
      {
        href: '/huong-dan/bao-loi/',
        label: 'Báo lỗi',
        summary: 'Lưu nhật ký từ menu khay hoặc bằng lệnh ngosen-save-log, kiểm tra máy, báo lỗi trên GitHub.',
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
  items: { text: string; refs?: number[]; links?: { label: string; href: string }[] }[];
}[] = [
  {
    items: [
      { text: 'Bớt đổi nhầm chữ tiếng Anh thành tiếng Việt, như `nest` thành `nét`, `too` thành `tô`.' },
      { text: 'Đoán dấu: gõ cả câu không dấu rồi bấm một phím để thêm dấu.' },
      { text: 'Bôi đen một đoạn rồi thêm dấu, bỏ dấu hoặc chuyển chữ mã cũ (TCVN3, VNI) sang Unicode.' },
      { text: 'Sửa lỗi gõ vội, như `tiếgn` thành `tiếng`.' },
      { text: 'Tự chạy “Kiểm tra máy tôi” lần đầu mở cửa sổ cài đặt. Có thêm bảng các app gõ được, lấy từ kết quả test người dùng gửi về.' },
      {
        text: 'Đưa Ngó Sen vào repo của các distro: từ 1.5.3 đã có repo riêng có chữ ký cho Fedora (COPR), Debian và Ubuntu (APT), Arch (pacman) và openSUSE Tumbleweed. nixpkgs đang chờ review. Còn AUR, rồi Debian.',
        links: [{ label: 'NixOS/nixpkgs#575620', href: 'https://github.com/NixOS/nixpkgs/pull/575620' }],
      },
      { text: 'Làm lại cách chèn emoji.', refs: [110] },
      {
        text: 'Gộp “Kiểm tra chính tả” vào “Tự khôi phục từ gõ sai”, vì nó chỉ có tác dụng khi Tự khôi phục đang bật.',
        refs: [112],
      },
    ],
  },
];

export const NAV = [
  { href: '/cai-dat/', label: 'Cài đặt' },
  { href: '/huong-dan/', label: 'Hướng dẫn' },
  { href: '/blog/', label: 'Blog' },
  { href: '/en/', label: 'English' },
];
