#!/usr/bin/env bash

# ==========================================
# CROWN REVIVAL WEBSITE - BASH SETUP
# ==========================================

set -euo pipefail

echo "=========================================="
echo "        CROWN REVIVAL WIG STUDIO"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node >/dev/null 2>&1; then
    echo "ERROR: Node.js is not installed."
    echo "Install Node.js 18+ and run this script again."
    exit 1
fi

# Check npm
if ! command -v npm >/dev/null 2>&1; then
    echo "ERROR: npm is not installed."
    exit 1
fi

echo "Node version:"
node --version

echo ""
echo "npm version:"
npm --version

echo ""
echo "Installing project dependencies..."
npm install

echo ""
echo "=========================================="
echo "Checking project files..."
echo "=========================================="

required_files=(
    "index.html"
    "about.html"
    "style.css"
    "script.js"
    "server.js"
    "database.sql"
    "package.json"
)

for file in "${required_files[@]}"; do

    if [[ -f "$file" ]]; then
        echo "[OK] $file"
    else
        echo "[MISSING] $file"
    fi

done

echo ""
echo "=========================================="
echo "CROWN REVIVAL IS READY"
echo "=========================================="
echo ""
echo "Starting the website..."
echo ""

npm start
