#!/bin/bash
# ═══════════════════════════════════════════════════════════
# PESTOUR Backend Setup Script
# ═══════════════════════════════════════════════════════════
# Run this script after installing PHP and Composer:
#   chmod +x setup.sh && ./setup.sh
# ═══════════════════════════════════════════════════════════

set -e

echo "🏟️  PESTOUR Backend Setup"
echo "════════════════════════════════════════"

# Check prerequisites
command -v php >/dev/null 2>&1 || { echo "❌ PHP is required. Install with: brew install php"; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "❌ Composer is required. Install with: brew install composer"; exit 1; }

echo "✅ PHP $(php -r 'echo PHP_VERSION;') detected"
echo "✅ Composer detected"

# Install dependencies
echo ""
echo "📦 Installing Composer dependencies..."
composer install

# Generate app key
echo ""
echo "🔑 Generating application key..."
php artisan key:generate

# Run migrations
echo ""
echo "🗄️  Running database migrations..."
echo "⚠️  Make sure PostgreSQL is running and the 'pestour' database exists!"
echo "   Create it with: createdb pestour"
echo ""
read -p "Press Enter to run migrations (or Ctrl+C to abort)..."
php artisan migrate

# Seed the database
echo ""
echo "🌱 Seeding the database..."
php artisan db:seed

echo ""
echo "════════════════════════════════════════"
echo "✅ PESTOUR Backend is ready!"
echo ""
echo "🔐 Admin credentials:"
echo "   Email:    admin@pestour.com"
echo "   Password: pestour2026"
echo ""
echo "🚀 Start the server with:"
echo "   php artisan serve"
echo ""
echo "📡 API will be available at:"
echo "   http://localhost:8000/api/v1"
echo "════════════════════════════════════════"
