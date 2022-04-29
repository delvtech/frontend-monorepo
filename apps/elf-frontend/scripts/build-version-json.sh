#!/bin/bash

GIT_SHA=$(git rev-parse HEAD)
DATE=$(date)
# Output the git commit hash to a json file in the src/ directory
# so that it can be imported and used in the UI.
printf "{ \"version\": \"$GIT_SHA\", \"date\": \"$DATE\" }" > src/version.output.json