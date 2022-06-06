set -e

export NEXT_PUBLIC_CHAIN_NAME=$1

npm run prestart && npm run dev