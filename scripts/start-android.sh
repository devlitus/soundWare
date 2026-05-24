#!/usr/bin/env bash
set -e

AVD_NAME="${1:-Pixel_10}"
ANDROID_SDK="${ANDROID_HOME:-$HOME/Android/Sdk}"
EMULATOR="$ANDROID_SDK/emulator/emulator"
ADB="$ANDROID_SDK/platform-tools/adb"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1"; }

cleanup_stale() {
  log "Limpiando procesos previos..."
  "$ADB" kill-server 2>/dev/null || true
  sleep 1
  "$ADB" start-server 2>/dev/null || true

  local pids=$(pgrep -f "qemu-system.*${AVD_NAME}" 2>/dev/null || true)
  if [ -n "$pids" ]; then
    warn "Matando emulador zombie de ${AVD_NAME}..."
    kill -9 $pids 2>/dev/null || true
    sleep 2
  fi
}

wait_for_boot() {
  log "Esperando que ${AVD_NAME} termine de arrancar..."
  local timeout=120
  local elapsed=0
  while [ $elapsed -lt $timeout ]; do
    local boot=$("$ADB" -s emulator-5554 shell getprop sys.boot_completed 2>/dev/null | tr -d '\r' || true)
    if [ "$boot" = "1" ]; then
      log "Emulador listo (${elapsed}s)"
      return 0
    fi
    sleep 2
    elapsed=$((elapsed + 2))
    echo -n "."
  done
  echo ""
  err "Timeout: el emulador no arrancó en ${timeout}s"
  return 1
}

verify_emulator() {
  local devices=$("$ADB" devices 2>/dev/null | grep -v "List of devices")
  if echo "$devices" | grep -q "emulator-5554.*device"; then
    return 0
  fi
  if echo "$devices" | grep -q "offline"; then
    err "Emulador detectado pero offline. Reinicia manualmente."
    return 1
  fi
  return 1
}

# ── Main ──────────────────────────────────────────────────

cleanup_stale

if verify_emulator; then
  log "Emulador ${AVD_NAME} ya está corriendo y online."
else
  log "Lanzando emulador ${AVD_NAME}..."
  nohup "$EMULATOR" -avd "$AVD_NAME" -no-snapshot -no-boot-anim > /tmp/emulator-${AVD_NAME}.log 2>&1 &
  EMU_PID=$!
  log "PID del emulador: ${EMU_PID}"
fi

wait_for_boot

log "Lanzando Expo..."
npx expo start --android
