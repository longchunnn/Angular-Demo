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