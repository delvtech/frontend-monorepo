#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  # Proceed with the build
  echo ":white_check_mark: - Build can proceed"
  exit 1;

else
  # Don't build
  echo ":octagonal_sign: - Build cancelled"
  exit 0;
fi