# TODO: switch to parcel-reporter-static-files-copy
#
# Copying the json files into dist/ should really be a part of the Parcel pipeline,
# however the static-files-copy plugin currently has an unresolved issue blocking this.
# https://github.com/elwin013/parcel-reporter-static-files-copy/issues/16#issuecomment-994520284

cp -R src/json dist/json