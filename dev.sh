#!/usr/bin/env bash
# Sobe stack inteira (postgres + back + front). CTRL+C finaliza tudo.
set -uo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

BACK_PID=""
FRONT_PID=""
CLEANED=0

cleanup() {
  [[ "$CLEANED" == "1" ]] && return
  CLEANED=1
  echo
  echo "==> Parando stack..."
  [[ -n "$BACK_PID" ]] && kill -TERM -- "-$BACK_PID" 2>/dev/null
  [[ -n "$FRONT_PID" ]] && kill -TERM -- "-$FRONT_PID" 2>/dev/null
  wait 2>/dev/null
  docker compose stop postgres
  echo "==> Stack parada."
}
trap cleanup INT TERM EXIT

echo "==> Subindo postgres..."
docker compose up -d postgres

echo "==> Aguardando postgres ficar healthy..."
until [ "$(docker inspect -f '{{.State.Health.Status}}' zooracoes-postgres 2>/dev/null)" = "healthy" ]; do
  sleep 1
done

set -a
source .env
set +a
export DATABASE_URL="jdbc:postgresql://localhost:${POSTGRES_PORT}/${POSTGRES_DB}"
export DATABASE_USERNAME="$POSTGRES_USER"
export DATABASE_PASSWORD="$POSTGRES_PASSWORD"

echo "==> Subindo back (Spring Boot)..."
(cd back && exec setsid ./mvnw spring-boot:run) &
BACK_PID=$!

echo "==> Subindo front (Next.js)..."
(cd front && exec setsid npm run dev) &
FRONT_PID=$!

echo
echo "Back:  http://localhost:8080/api/health"
echo "Front: http://localhost:3000"
echo "CTRL+C para finalizar tudo."
echo

wait -n "$BACK_PID" "$FRONT_PID"
