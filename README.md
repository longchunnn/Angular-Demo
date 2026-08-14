src/app/
├── core/                       # Chứa các tài nguyên Toàn cục (Global) duy nhất
│   ├── guards/                 # Auth Guard, Role Guard...
│   ├── interceptors/           # Auth Token Interceptor, Error Interceptor...
│   ├── services/               # AuthService, LoggerService, ApiService...
│   ├── models/                 # User model, Common API Response model...
│   └── core.module.ts          # Module gom nhóm Core (chỉ import ở AppModule)
│
├── shared/                     # Chứa các tài nguyên Dùng chung cho nhiều Feature
│   ├── components/             # Navbar, Footer, Loading Spinner, Custom Button...
│   ├── directives/             # Custom Directives (ngLazyLoad, Highlight...)
│   ├── pipes/                  # Custom Pipes (DateFormatPipe, CurrencyPipe...)
│   └── shared.module.ts        # Export các Component/Pipe/Directive + CommonModule
│
├── features/                   # Chứa các Tính năng chính của ứng dụng
│   ├── auth/                   # Feature Xác thực (Login, Register, Forgot Password)
│   │   ├── pages/              # Các trang chính của feature này
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── components/         # Component nhỏ chỉ dùng riêng trong Auth
│   │   ├── services/           # Service riêng của Auth
│   │   └── auth-routing.module.ts
│   │
│   ├── products/               # Feature Quản lý sản phẩm (Lazy Loaded)
│   │   ├── pages/
│   │   │   ├── product-list/
│   │   │   └── product-detail/
│   │   ├── components/
│   │   ├── services/
│   │   ├── models/
│   │   ├── products.module.ts
│   │   └── products-routing.module.ts
│   │
│   └── dashboard/              # Feature Trang quản trị
│
├── layout/                     # Chứa các khung Giao diện chính (Master Layouts)
│   ├── main-layout/            # Layout chính (Header + Sidebar + Outlet + Footer)
│   └── auth-layout/            # Layout cho trang Login/Register (Khung trống đơn giản)
│
├── app-routing.module.ts       # Cấu hình Route tổng (Lazy loading các Features)
├── app.component.ts            # Component gốc
└── app.module.ts               # Module gốc



Cấu truc thư mục của feature 
src/app/features/
├── dashboard/                     # Feature 1: Dashboard / Trang tổng quan
│   ├── pages/
│   │   └── dashboard-overview/    # Hiển thị tiến độ, thống kê học tập
│   ├── dashboard-routing.module.ts
│   └── dashboard.module.ts
│
├── vocabulary/                    # Feature 2: Từ vựng (Vocab)
│   ├── pages/
│   │   ├── vocab-list/            # Trang danh sách các bộ từ vựng / chủ đề
│   │   └── vocab-detail/          # Trang xem bộ thẻ / học Flashcard cụ thể (Sub-route)
│   ├── components/                # Component nhỏ (Flashcard, WordCard, ProgressWidget...)
│   ├── services/                  # VocabService (Gọi API lấy bộ từ)
│   ├── models/                    # Interfaces: VocabTopic, Flashcard...
│   ├── vocabulary-routing.module.ts
│   └── vocabulary.module.ts
│
├── grammar/                       # Feature 3: Ngữ pháp
│   ├── pages/
│   │   ├── grammar-list/          # Trang danh sách chủ điểm ngữ pháp
│   │   └── grammar-detail/        # Trang bài học ngữ pháp chi tiết
│   ├── components/                # Component hiển thị ví dụ, bài tập nhỏ
│   ├── services/                  # GrammarService
│   ├── grammar-routing.module.ts
│   └── grammar.module.ts
│
├── dictation/                     # Feature 4: Luyện nghe chép chính tả
│   ├── pages/
│   │   ├── dictation-list/        # Trang danh sách bài nghe
│   │   └── dictation-practice/    # Trang gõ/chép chính tả (Audio player, Input validation)
│   ├── components/                # AudioPlayer, SubtitleDisplay...
│   ├── services/                  # DictationService
│   ├── dictation-routing.module.ts
│   └── dictation.module.ts
│
└── arena/                         # Feature 5: Đấu trường / Thách đấu (Arena)
    ├── pages/
    │   ├── arena-lobby/           # Sảnh chờ / Bảng xếp hạng
    │   └── arena-match/           # Trang thi đấu / làm bài thời gian thực
    ├── services/                  # ArenaService (Kết nối Socket.io / Supabase Realtime)
    ├── arena-routing.module.ts
    └── arena.module.ts