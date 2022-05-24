rm -rf dist

mkdir -p dist
mkdir -p dist/libraries

# Copy over contracts.
cp -R -v compiled/* dist/

# Copy over the precompiled factories
cp -R -v precompiled/factories/* dist/libraries/factories

# Copy over the precompiled types 
cp -R precompiled/*.d.ts dist/libraries/
