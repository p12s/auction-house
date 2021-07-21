#!/bin/sh
# wait-for-api.sh

set -e

host="$1"
port="$2"
shift
cmd="$@"

status_code=$(curl --write-out %{http_code} --silent --output /dev/null $host:$port/health)

until "$status_code" -ne 200 ; do
  >&2 echo "🌥🌥🌥 API is unavailable - sleeping"
  sleep 1
  status_code=$(curl --write-out %{http_code} --silent --output /dev/null $host:$port/health)
done

>&2 echo "☀️☀️☀️ API is up - executing command"
exec $cmd
