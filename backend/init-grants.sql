-- Grant privileges to app_user
-- This script should be run with root user privileges
GRANT REFERENCES ON *.* TO 'app_user'@'%';

FLUSH PRIVILEGES;

GRANT CREATE, DROP, REFERENCES, INDEX, ALTER, SELECT, INSERT, UPDATE, DELETE ON *.* TO 'app_user'@'%';

FLUSH PRIVILEGES;

