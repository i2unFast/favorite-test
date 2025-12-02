.PHONY: help install setup start start-all stop restart clean dev-backend dev-frontend db-up db-down db-migrate db-migrate-dev db-seed db-reset check-env

# Colors for output
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

# Default target
.DEFAULT_GOAL := help

help: ## แสดงคำสั่งที่ใช้ได้ทั้งหมด
	@echo "$(GREEN)คำสั่งที่ใช้ได้:$(RESET)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(RESET) %s\n", $$1, $$2}'

# ============================================
# Installation & Setup
# ============================================

install: ## ติดตั้ง dependencies ทั้ง backend และ frontend
	@echo "$(GREEN)📦 กำลังติดตั้ง dependencies...$(RESET)"
	@cd backend && npm install
	@cd frontend && npm install
	@echo "$(GREEN)✅ ติดตั้ง dependencies เสร็จสิ้น$(RESET)"

check-env: ## ตรวจสอบไฟล์ .env
	@if [ ! -f backend/.env ]; then \
		echo "$(YELLOW)⚠️  ไม่พบไฟล์ backend/.env$(RESET)"; \
		echo "$(YELLOW)   กรุณาสร้างไฟล์ backend/.env ด้วยข้อมูลต่อไปนี้:$(RESET)"; \
		echo "$(YELLOW)   DATABASE_URL=\"mysql://app_user:password@localhost:3306/favorite_db\"$(RESET)"; \
		echo "$(YELLOW)   PORT=4400$(RESET)"; \
		exit 1; \
	fi
	@echo "$(GREEN)✅ ไฟล์ .env พบแล้ว$(RESET)"

setup: install check-env db-up db-generate db-migrate db-seed ## ตั้งค่าโปรเจกต์ทั้งหมด (install + database setup)
	@echo "$(GREEN)✅ ตั้งค่าโปรเจกต์เสร็จสิ้น$(RESET)"

# ============================================
# Database Operations
# ============================================

db-up: ## เริ่มต้น Docker database container
	@echo "$(GREEN)🐳 กำลังเริ่มต้น database...$(RESET)"
	@docker-compose up -d
	@echo "$(GREEN)✅ Database เริ่มต้นแล้ว$(RESET)"
	@echo "$(YELLOW)⏳ รอ database พร้อมใช้งาน (10 วินาที)...$(RESET)"
	@sleep 10

db-down: ## หยุด Docker database container
	@echo "$(GREEN)🛑 กำลังหยุด database...$(RESET)"
	@docker-compose down
	@echo "$(GREEN)✅ Database หยุดแล้ว$(RESET)"

db-migrate: check-env ## รัน Prisma migrations (deploy mode - สำหรับ production)
	@echo "$(GREEN)🔄 กำลังรัน database migrations...$(RESET)"
	@cd backend && npx prisma migrate deploy
	@echo "$(GREEN)✅ Migrations เสร็จสิ้น$(RESET)"

db-migrate-dev: check-env ## สร้าง migration ใหม่ (development mode)
	@echo "$(GREEN)🔄 กำลังสร้าง migration ใหม่...$(RESET)"
	@cd backend && npx prisma migrate dev
	@echo "$(GREEN)✅ Migration สร้างเสร็จสิ้น$(RESET)"

db-generate: check-env ## Generate Prisma client
	@echo "$(GREEN)🔧 กำลัง generate Prisma client...$(RESET)"
	@cd backend && npx prisma generate
	@echo "$(GREEN)✅ Prisma client generated$(RESET)"

db-seed: check-env ## Seed database ด้วยข้อมูลเริ่มต้น
	@echo "$(GREEN)🌱 กำลัง seed database...$(RESET)"
	@cd backend && npm run seed
	@echo "$(GREEN)✅ Seed เสร็จสิ้น$(RESET)"

db-reset: ## Reset database (ลบข้อมูลทั้งหมดและ migrate ใหม่)
	@echo "$(YELLOW)⚠️  กำลัง reset database...$(RESET)"
	@cd backend && npx prisma migrate reset --force
	@echo "$(GREEN)✅ Database reset เสร็จสิ้น$(RESET)"

db-studio: ## เปิด Prisma Studio (database GUI)
	@echo "$(GREEN)🎨 กำลังเปิด Prisma Studio...$(RESET)"
	@cd backend && npx prisma studio

# ============================================
# Development
# ============================================

dev-backend: check-env ## รัน backend ในโหมด development
	@echo "$(GREEN)🚀 กำลังเริ่มต้น backend server...$(RESET)"
	@cd backend && npm run dev

dev-frontend: ## รัน frontend ในโหมด development
	@echo "$(GREEN)🚀 กำลังเริ่มต้น frontend server...$(RESET)"
	@cd frontend && npm run dev

dev: db-up ## รันทั้ง backend และ frontend (ต้องรันใน terminal แยก)
	@echo "$(GREEN)🚀 เริ่มต้น development servers...$(RESET)"
	@echo "$(YELLOW)📝 หมายเหตุ: ต้องรัน backend และ frontend ใน terminal แยกกัน$(RESET)"
	@echo "$(YELLOW)   Backend:  make dev-backend$(RESET)"
	@echo "$(YELLOW)   Frontend: make dev-frontend$(RESET)"

# ============================================
# Production
# ============================================

# ตรวจสอบว่า database container กำลังรันอยู่หรือไม่
db-check:
	@if ! docker-compose ps | grep -q "my-mysql.*Up"; then \
		echo "$(YELLOW)⚠️  Database ยังไม่ได้รัน กำลังเริ่มต้น...$(RESET)"; \
		$(MAKE) db-up; \
	else \
		echo "$(GREEN)✅ Database กำลังรันอยู่$(RESET)"; \
	fi

# ตรวจสอบว่า Prisma client generate แล้วหรือยัง
prisma-check: check-env
	@if [ ! -d "backend/node_modules/.prisma/client" ]; then \
		echo "$(YELLOW)⚠️  Prisma client ยังไม่ได้ generate กำลัง generate...$(RESET)"; \
		$(MAKE) db-generate; \
	else \
		echo "$(GREEN)✅ Prisma client พร้อมแล้ว$(RESET)"; \
	fi

start-all: check-env ## เริ่มต้นทุกอย่างให้พร้อมใช้งาน (database + backend + frontend)
	@echo "$(GREEN)🚀 กำลังเริ่มต้นโปรเจกต์ทั้งหมด...$(RESET)"
	@echo ""
	@$(MAKE) db-check
	@$(MAKE) prisma-check
	@echo ""
	@echo "$(GREEN)🔄 กำลังตรวจสอบ migrations...$(RESET)"
	@cd backend && npx prisma migrate deploy || echo "$(YELLOW)⚠️  Migrations อาจจะยังไม่ได้รัน$(RESET)"
	@echo ""
	@echo "$(GREEN)🏗️  กำลัง build frontend...$(RESET)"
	@cd frontend && npm run build || echo "$(YELLOW)⚠️  Frontend build อาจจะมีปัญหา$(RESET)"
	@echo ""
	@echo "$(GREEN)🚀 กำลังเริ่มต้น backend server...$(RESET)"
	@cd backend && npm start > ../backend.log 2>&1 &
	@sleep 2
	@echo "$(GREEN)🚀 กำลังเริ่มต้น frontend server...$(RESET)"
	@cd frontend && npm run preview > ../frontend.log 2>&1 &
	@sleep 3
	@echo ""
	@echo "$(GREEN)✅ โปรเจกต์เริ่มต้นเสร็จสิ้น!$(RESET)"
	@echo ""
	@echo "$(YELLOW)📊 สถานะ Services:$(RESET)"
	@echo "  🌐 Frontend:  http://localhost:3000"
	@echo "  🔌 Backend:   http://localhost:4400"
	@echo "  🗄️  Database:  localhost:3306"
	@echo ""
	@echo "$(YELLOW)💡 คำสั่งที่มีประโยชน์:$(RESET)"
	@echo "  make status    - ตรวจสอบสถานะ services"
	@echo "  make stop      - หยุด services ทั้งหมด"
	@echo "  make logs-db   - ดู database logs"
	@echo ""
	@echo "$(YELLOW)📝 Logs:$(RESET)"
	@echo "  Backend log:   tail -f backend.log"
	@echo "  Frontend log:  tail -f frontend.log"

start: check-env db-check prisma-check build-frontend ## เริ่มต้น services ทั้งหมด (production mode - ต้อง setup แล้ว)
	@echo "$(GREEN)🚀 กำลังเริ่มต้น services...$(RESET)"
	@cd backend && npm start > ../backend.log 2>&1 &
	@sleep 2
	@cd frontend && npm run preview > ../frontend.log 2>&1 &
	@sleep 3
	@echo "$(GREEN)✅ Services เริ่มต้นแล้ว$(RESET)"
	@echo ""
	@echo "$(YELLOW)📊 Services:$(RESET)"
	@echo "  🌐 Frontend: http://localhost:3000"
	@echo "  🔌 Backend:  http://localhost:4400"
	@echo ""
	@echo "$(YELLOW)💡 ใช้ 'make stop' เพื่อหยุด services$(RESET)"

stop: ## หยุด services ทั้งหมด
	@echo "$(GREEN)🛑 กำลังหยุด services...$(RESET)"
	@pkill -f "node src/index.js" || true
	@pkill -f "vite preview" || true
	@rm -f backend.log frontend.log 2>/dev/null || true
	@echo "$(GREEN)✅ Services หยุดแล้ว$(RESET)"
	@echo "$(YELLOW)💡 ใช้ 'make db-down' เพื่อหยุด database$(RESET)"

restart: stop start ## Restart services ทั้งหมด

# ============================================
# Build
# ============================================

build-frontend: ## Build frontend สำหรับ production
	@echo "$(GREEN)🏗️  กำลัง build frontend...$(RESET)"
	@cd frontend && npm run build
	@echo "$(GREEN)✅ Build เสร็จสิ้น$(RESET)"

# ============================================
# Cleanup
# ============================================

clean: ## ลบ node_modules และ build files
	@echo "$(GREEN)🧹 กำลังทำความสะอาด...$(RESET)"
	@rm -rf backend/node_modules
	@rm -rf frontend/node_modules
	@rm -rf frontend/dist
	@echo "$(GREEN)✅ ทำความสะอาดเสร็จสิ้น$(RESET)"

clean-db: ## ลบ Docker volumes (ลบข้อมูล database ทั้งหมด)
	@echo "$(YELLOW)⚠️  กำลังลบ database volumes...$(RESET)"
	@docker-compose down -v
	@echo "$(GREEN)✅ Database volumes ถูกลบแล้ว$(RESET)"

clean-all: clean clean-db ## ลบทุกอย่าง (node_modules, build files, database)
	@echo "$(GREEN)✅ ทำความสะอาดทั้งหมดเสร็จสิ้น$(RESET)"

# ============================================
# Utility
# ============================================

logs-db: ## แสดง logs ของ database container
	@docker-compose logs -f db

logs-backend: ## แสดง logs ของ backend
	@if [ -f backend.log ]; then \
		tail -f backend.log; \
	else \
		echo "$(YELLOW)⚠️  ไม่พบไฟล์ backend.log$(RESET)"; \
		echo "$(YELLOW)   Backend อาจจะยังไม่ได้รัน$(RESET)"; \
	fi

logs-frontend: ## แสดง logs ของ frontend
	@if [ -f frontend.log ]; then \
		tail -f frontend.log; \
	else \
		echo "$(YELLOW)⚠️  ไม่พบไฟล์ frontend.log$(RESET)"; \
		echo "$(YELLOW)   Frontend อาจจะยังไม่ได้รัน$(RESET)"; \
	fi

logs: ## แสดง logs ทั้งหมด (backend + frontend)
	@echo "$(GREEN)📋 Logs ทั้งหมด:$(RESET)"
	@echo ""
	@if [ -f backend.log ]; then \
		echo "$(YELLOW)=== Backend Log ===$(RESET)"; \
		tail -20 backend.log; \
		echo ""; \
	fi
	@if [ -f frontend.log ]; then \
		echo "$(YELLOW)=== Frontend Log ===$(RESET)"; \
		tail -20 frontend.log; \
	fi

status: ## แสดงสถานะของ services
	@echo "$(GREEN)📊 สถานะ Services:$(RESET)"
	@echo ""
	@echo "$(YELLOW)Database:$(RESET)"
	@if docker-compose ps | grep -q "my-mysql.*Up"; then \
		echo "  ✅ Database กำลังรัน (localhost:3306)"; \
	else \
		echo "  ❌ Database ไม่ได้รัน"; \
	fi
	@echo ""
	@echo "$(YELLOW)Backend:$(RESET)"
	@if pgrep -f "node src/index.js" > /dev/null; then \
		echo "  ✅ Backend กำลังรัน (http://localhost:4400)"; \
	else \
		echo "  ❌ Backend ไม่ได้รัน"; \
	fi
	@echo ""
	@echo "$(YELLOW)Frontend:$(RESET)"
	@if pgrep -f "vite preview" > /dev/null; then \
		echo "  ✅ Frontend กำลังรัน (http://localhost:3000)"; \
	elif pgrep -f "vite" > /dev/null; then \
		echo "  ✅ Frontend (dev) กำลังรัน (http://localhost:3000)"; \
	else \
		echo "  ❌ Frontend ไม่ได้รัน"; \
	fi
	@echo ""
	@if [ -f backend.log ] || [ -f frontend.log ]; then \
		echo "$(YELLOW)Log Files:$(RESET)"; \
		[ -f backend.log ] && echo "  📄 backend.log"; \
		[ -f frontend.log ] && echo "  📄 frontend.log"; \
	fi

