#!/bin/bash
# Script to grant privileges to app_user
# This must be run with root user privileges

echo "🔐 กำลังให้สิทธิ์แก่ app_user..."

docker exec -i my-mysql mysql -uroot -prootpassword <<EOF
GRANT REFERENCES ON *.* TO 'app_user'@'%';
FLUSH PRIVILEGES;

GRANT CREATE, DROP, REFERENCES, INDEX, ALTER, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'app_user'@'%';
FLUSH PRIVILEGES;

SELECT '✅ สิทธิ์ถูกให้แก่ app_user แล้ว' AS status;
EOF

echo "✅ เสร็จสิ้น"

