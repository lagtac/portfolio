#!/usr/bin/env bash
# Copy the canonical English CV into the portfolio.
#
# The canonical CV lives in its own repository at ~/src/cv. This copies it
# one-way and applies only the adaptations the site needs: a cache-buster on
# the stylesheet link, and a footer link back to the portfolio home. Edit the
# CV in ~/src/cv, never in src/design3/cv/.
#
# Usage:
#   scripts/sync-cv.sh
#   CV_SOURCE=/path/to/cv scripts/sync-cv.sh
#
set -euo pipefail

repo=$(cd "$(dirname "$0")/.." && pwd)
src="${CV_SOURCE:-$HOME/src/cv}"
dst="$repo/src/design3/cv"

for file in cv-en.html cv.css ddc2.jpeg; do
	[[ -f "$src/$file" ]] || {
		echo "CV source not found: $src/$file" >&2
		exit 1
	}
done

cp "$src/cv-en.html" "$dst/cv.html"
cp "$src/cv.css" "$dst/cv.css"
cp "$src/ddc2.jpeg" "$dst/ddc2.jpeg"

# Content hash: the cache-buster changes exactly when the CV content changes.
version=$(sha256sum "$src/cv-en.html" | cut -c1-8)
sed -i "s#href=\"cv\.css\"#href=\"cv.css?v=$version\"#" "$dst/cv.html"

# The footer cannot carry this link in the source, where ../index.html is the
# CV project's own home page.
sed -i 's#<footer class="page-footer">Dimitris Chrysomallis CV</footer>#<footer class="page-footer">\n        <a href="../index.html">Dimitris Chrysomallis — portfolio</a> · CV\n      </footer>#' \
	"$dst/cv.html"

# The source CSS is unformatted; the repository formats with biome.
(cd "$repo" && pnpm exec biome format --write "$dst/cv.css" >/dev/null 2>&1)

echo "Synced src/design3/cv from $src (cv.css?v=$version)"
