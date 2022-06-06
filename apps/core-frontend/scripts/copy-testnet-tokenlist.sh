# Remove the previous testnet.tokenlist.json and TS definitions files from frontend to make this a clean copy
rm -f src/tokenlists/testnet.tokenlist.json
rm -f src/tokenlists/types.d.ts

# Copy the testnet.tokenlist.json files and TS definitions files to the frontend
find ../elf-frontend-testnet/src/tokenlist/ -type f -name "testnet.tokenlist.json" -exec cp {} src/tokenlists/ \;