#!/usr/bin/env bash
set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 $host 3306
do
  echo "Waiting for MySQL database connection..."
  sleep 1
done

echo "MySQL is up - executing command"
exec $cmd

