rm -rf dist
mkdir dist

# make parcel-temp dirs for parcel builds
mkdir parcel-temp

mkdir parcel-temp/v1
mkdir parcel-temp/v1.1
mkdir parcel-temp/libraries

# build separate packages
parcel build src/typechain-types/v1/index.ts
mv dist/* parcel-temp/v1
parcel build src/typechain-types/v1.1/index.ts
mv dist/* parcel-temp/v1.1
parcel build src/typechain-types/libraries/index.ts
mv dist/* parcel-temp/libraries

# move files to dist
mv parcel-temp/v1 dist
mv parcel-temp/v1.1 dist
mv parcel-temp/libraries dist

# remove parcel-temp dir
rm -rf parcel-temp

# TODO: switch to parcel-reporter-static-files-copy
#
# Copying the json files into dist/ should really be a part of the Parcel pipeline,
# however the static-files-copy plugin currently has an unresolved issue blocking this.
# https://github.com/elwin013/parcel-reporter-static-files-copy/issues/16#issuecomment-994520284

# Copy over the precompiled factories
mkdir dist/precompiled
cp -R -v precompiled/factories/* dist/precompiled/

# Copy over the precompiled types
cp -R precompiled/*.d.ts dist/precompiled/
