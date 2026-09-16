#!/bin/bash
# Start development servers locally

echo "🚀 Starting TIKETIN Development Environment..."
echo ""

# Start backend
echo "Starting Backend (Go)..."
cd backend-go
go run main.go &
BACKEND_PID=$!
echo "✅ Backend running (PID: $BACKEND_PID)"

# Start frontend
cd ../web/frontend
echo "Starting Frontend (Next.js)..."
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend running (PID: $FRONTEND_PID)"

echo ""
echo "📍 Services:"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:3000 (dev)"
echo ""
echo "Press Ctrl+C to stop all services"

wait
