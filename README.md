<a name="readme-top"></a>

<!-- VỀ DỰ ÁN -->

# Về Dự Án

Đây là dự án thiết kế và xây dựng giao diện cơ bản cũng như các tính năng cơ bản cho website của công ty Vinamilk.

Thiết kế và tài nguyên của dự án này dựa trên website chính thức của Vinamilk: [https://new.vinamilk.com.vn/](https://new.vinamilk.com.vn/).

Dự án này được thực hiện như một bài tập cho khóa học Lập Trình Web và không có mục đích thương mại.

# Mô tả chi tiết về dự án

Để bắt đầu trải nghiệm các tính năng của trang web hãy đăng nhập vào 1 trong 2 tài khoản sau:

#### Đăng nhập với tài khoản admin:

- **Email**: `admin123@gmail.com`
- **Mật khẩu**: `Admin123#`

#### Đăng nhập với tài khoản customer:

- **Email**: `nguyenangthuc1@gmail.com`
- **Mật khẩu**: `01062002tT!`

### Dự án đã được triển khai lên AWS, bao gồm các chức năng sau:

#### Chức năng ở tài khoản Khách Hàng (Customer)

| Chức Năng                       | Mô Tả                                                                                                              | Trạng Thái      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------- |
| Đăng nhập                       | Cho phép người dùng đăng nhập vào hệ thống                                                                         | Hoàn thành      |
| Đăng ký                         | Cho phép người dùng tạo tài khoản mới với bảo mật bằng cách gửi mã OTP về email                                    | Hoàn thành      |
| Lấy lại mật khẩu                | Cho phép người dùng lấy lại mật khẩu qua email đã đăng ký                                                          | Hoàn thành      |
| Thanh toán                      | Xử lý giao dịch thanh toán qua cổng MoMo bằng nhiều phương thức như thẻ tín dụng, QR pay hoặc các phương thức khác | Hoàn thành      |
| Quản lý đơn hàng                | Hiển thị danh sách các đơn hàng và cho phép quản lý chi tiết                                                       | Đang phát triển |
| Tìm kiếm sản phẩm               | Cho phép người dùng tìm kiếm sản phẩm qua từ khóa                                                                  | Hoàn thành      |
| Xem chi tiết sản phẩm           | Hiển thị thông tin chi tiết về sản phẩm                                                                            | Hoàn thành      |
| Gửi phản hồi sản phẩm cho admin | Gửi ý kiến cá nhân về sản phẩm để admin phản hồi                                                                   | Hoàn thành      |

#### Báo Cáo Chức Năng Quản Trị

##### 1. Quản Lý Người Dùng (User Management)

| Chức Năng          | Mô Tả                                                               | Trạng Thái |
| ------------------ | ------------------------------------------------------------------- | ---------- |
| Thêm người dùng    | Admin có thể thêm tài khoản người dùng mới                          | Hoàn thành |
| Cập nhật thông tin | Cập nhật thông tin cá nhân của người dùng                           | Hoàn thành |
| Xóa người dùng     | Xóa tài khoản người dùng khỏi hệ thống                              | Hoàn thành |
| Phân quyền         | Phân quyền cho người dùng (quản trị, người dùng thông thường, v.v.) | Hoàn thành |

##### 2. Quản Lý Sản Phẩm (Product Management)

| Chức Năng         | Mô Tả                                            | Trạng Thái |
| ----------------- | ------------------------------------------------ | ---------- |
| Thêm sản phẩm     | Admin có thể thêm sản phẩm mới vào danh mục      | Hoàn thành |
| Cập nhật sản phẩm | Cập nhật thông tin chi tiết của sản phẩm         | Hoàn thành |
| Xóa sản phẩm      | Xóa sản phẩm khỏi hệ thống                       | Hoàn thành |
| Quản lý tồn kho   | Theo dõi và cập nhật số lượng sản phẩm trong kho | Hoàn thành |

##### 3. Xuất File CSV (Export CSV)

| Chức Năng                 | Mô Tả                                                 | Trạng Thái      |
| ------------------------- | ----------------------------------------------------- | --------------- |
| Xuất danh sách người dùng | Admin có thể xuất danh sách người dùng thành file CSV | Hoàn thành      |
| Xuất danh sách sản phẩm   | Xuất danh sách sản phẩm thành file CSV                | Hoàn thành      |
| Xuất danh sách đơn hàng   | Xuất danh sách đơn hàng thành file CSV                | Đang phát triển |

##### 4. Quản Lý Đơn Hàng (Order Management)

| Chức Năng                    | Mô Tả                                                                | Trạng Thái      |
| ---------------------------- | -------------------------------------------------------------------- | --------------- |
| Xem danh sách đơn hàng       | Hiển thị danh sách các đơn hàng đã đặt                               | Hoàn thành      |
| Xem chi tiết đơn hàng        | Hiển thị chi tiết từng đơn hàng (sản phẩm, số lượng, giá tiền, v.v.) | Hoàn thành      |
| Cập nhật trạng thái đơn hàng | Thay đổi trạng thái của đơn hàng (đang xử lý, đã hoàn thành)         | Đang phát triển |

##### 5. Quản Lý Nội Dung (Content Management)

| Chức Năng          | Mô Tả                                             | Trạng Thái      |
| ------------------ | ------------------------------------------------- | --------------- |
| Tạo bài viết       | Admin có thể tạo bài viết mới cho website         | Hoàn thành      |
| Chỉnh sửa bài viết | Cập nhật nội dung các bài viết hiện có            | Hoàn thành      |
| Xóa bài viết       | Xóa bài viết khỏi hệ thống                        | Đang phát triển |
| Quản lý bình luận  | Kiểm duyệt và quản lý các bình luận từ người dùng | Đang phát triển |

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

### Xây Dựng Bằng

- [![PHP][PHP]][PHP-url]
- [![MYSQL][mysql]][mysql-url]
- [![React][React.js]][React-url]
- [![Tailwind CSS][Tailwind.css]][Tailwind-url]

<p align="right">(<a href="#readme-top">quay lại đầu trang</a>)</p>

<!-- BẮT ĐẦU -->

## Nếu muốn cài đặt vào máy tính để triển khai dự án ở local

Để bắt đầu dự án, bạn cần cài đặt các phần mềm cần thiết và làm theo các bước dưới đây.

### Yêu Cầu

- Apache webserver và MYSQL (khuyến nghị sử dụng XAMPP).
  > Phiên bản PHP >= 8.0
- Composer
- NodeJS (phiên bản >= 18)

### Cài Đặt

1. Clone repo

   Bạn nên clone repo vào thư mục có thể truy cập từ Apache webserver.

   Nếu bạn sử dụng XAMPP, hãy clone vào thư mục `htdocs` hoặc thư mục tương ứng với DocumentRoot.

```sh
   git clone https://github.com/DangThuc/Vinamilk-Lite.git
```

### Cài đặt các gói Composer

```sh
cd api
composer install
```

### Nhập file SQL

Nhập file `vinamilk_lite` từ thư mục `api/sql`.

### Cấu hình biến môi trường API

Tạo file `.env` trong thư mục `api` để cấu hình kết nối tới MySQL và thiết lập mailer dựa trên file `.env.example`.

### Khởi động server API

Di chuyển thư mục `api` đến một đường dẫn có thể truy cập từ Apache server. Khởi động Apache và MySQL server và truy cập URL tương ứng để đảm bảo server API hoạt động.

### Cài đặt các gói NPM

```sh
cd ../client
npm install
```

### Cấu hình biến môi trường client

Tạo file `.env.local` trong thư mục `client` để cấu hình API base URL.

```sh
VNM_API_BASE=[URL_BASE_API_CỦA_BẠN]
```

### Khởi động React App

```sh
npm run dev
```
