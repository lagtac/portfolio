#!/usr/bin/env bash
# Re-encode an asset to WebP: orient, crop or resize, strip metadata, encode.
# Metadata (EXIF/GPS) is always stripped, as ADR 0002 requires.
#
# Usage:
#   scripts/webp.sh --crop 1580x820+0+80 SOURCE OUTPUT
#   scripts/webp.sh --resize 1600 SOURCE OUTPUT
#
# Options:
#   --crop WxH+X+Y   crop at offset, reset the canvas (+repage)
#   --resize WIDTH   scale to WIDTH, preserving aspect ratio
#   --quality N      WebP quality, default 82
#   --method N       libwebp method 0-6, default 6 (slowest, best)
#
set -euo pipefail

crop=""
resize=""
quality=82
method=6

usage() {
	echo "Usage: $(basename "$0") (--crop WxH+X+Y | --resize WIDTH) [--quality N] [--method N] SOURCE OUTPUT" >&2
	exit 2
}

while [[ $# -gt 0 ]]; do
	case "$1" in
	--crop)
		crop="${2:?--crop needs a value}"
		shift 2
		;;
	--resize)
		resize="${2:?--resize needs a value}"
		shift 2
		;;
	--quality)
		quality="${2:?--quality needs a value}"
		shift 2
		;;
	--method)
		method="${2:?--method needs a value}"
		shift 2
		;;
	-h | --help) usage ;;
	--)
		shift
		break
		;;
	-*)
		echo "Unknown option: $1" >&2
		usage
		;;
	*) break ;;
	esac
done

[[ $# -eq 2 ]] || usage
src="$1"
out="$2"

command -v convert >/dev/null || {
	echo "ImageMagick 6 'convert' not found" >&2
	exit 1
}
if [[ -n "$crop" && -n "$resize" ]]; then
	echo "Choose one of --crop or --resize, not both" >&2
	exit 2
fi
if [[ -z "$crop" && -z "$resize" ]]; then
	echo "One of --crop or --resize is required" >&2
	usage
fi
[[ -f "$src" ]] || {
	echo "Source not found: $src" >&2
	exit 1
}

args=(-auto-orient)
if [[ -n "$crop" ]]; then
	args+=(-crop "$crop" +repage)
else
	args+=(-resize "${resize}x")
fi

mkdir -p "$(dirname "$out")"
convert "$src" "${args[@]}" -strip -quality "$quality" -define "webp:method=$method" "$out"

if identify -verbose "$out" | grep -qi exif; then
	echo "Error: EXIF still present in $out" >&2
	exit 1
fi

identify -format 'wrote %f %wx%h (no EXIF)\n' "$out"
