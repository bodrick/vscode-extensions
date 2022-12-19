# Visual Studio Code Extensions

## Overview

This repository contains the source code for the following Visual Studio Code extensions:


## Changesets

### Adding new changesets

To generate a new changeset, run pnpm changeset in the root of the repository. The generated markdown files in the .changeset directory should be committed to the repository.

### Releasing changes

Run pnpm changeset version. This will bump the versions of the packages previously specified with pnpm changeset (and any dependents of those) and update the changelog files.
Run pnpm install. This will update the lockfile and rebuild packages.
Commit the changes.
Run pnpm publish -r. This command will publish all packages that have bumped versions not yet present in the registry.
