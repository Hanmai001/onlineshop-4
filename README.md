HƯỚNG DẪN CÀI ĐẶT VÀ KHỞI CHẠY WEBSITE

Bước 1: 
- Tải database từ link: 
- Clone repository Customer-website về máy
Bước 2: 
- Máy phải được cài đặt sẵn nodejs, MySQL Workbench và tạo sẵn database user là 'root' và password là 'root'.
- Mở MySQL Workbench, import database vừa tải và chạy.
Bước 3: 
- Mở source code lên, mở terminal và gõ npm install, terminal sẽ cài đặt các package cần thiết cho chương trình
Bước 4: Gõ npm run dev trong terminal, server sẽ được khởi chạy trên localhost:3000

*Lưu ý nếu có lỗi "Expression #13 of SELECT list is not in GROUP BY clause and contains nonaggregated column..." thì chạy dòng "SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));" trong MySQL, sau đó tắt và chạy lại chương trình.