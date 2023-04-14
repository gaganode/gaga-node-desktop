#!/bin/bash

# set -x
usage() {
  echo $""
  echo $"Usage: $0 [params]"
  echo $""
  echo $"params:"
  echo $"\t -OS \t darwin \t linux \t windows"
  echo $"\t -ARCH amd64 \t 386 \t arm \t arm64"
}

if [ $# -eq 0 ]; then
  usage
  exit 1
fi

# params parser
while [[ $# > 0 ]]; do
  case "$1" in
    -OS)
      shift;
      OS_NAME=$1
    ;;
    -ARCH)
      shift;
      ARCH_NAME=$1
    ;;
    -help)
      usage
      exit 1
    ;;
    # *)
    #   usage
    #   exit 2
    # ;;
  esac
  shift;
done

if [ "$ARCH_NAME" = "" ]
then
  echo "[ERR] please set correct ARCH"
  usage
  exit
fi

if [ "$OS_NAME" = "" ]
then
  echo "[ERR] please set correct OS"
  usage
  exit
fi

abort() {
  printf "%s\n" "$@" >&2
  exit 1
}

# Fail fast with a concise message when not using bash
# Single brackets are needed here for POSIX compatibility
# shellcheck disable=SC2292
if [ -z "${BASH_VERSION:-}" ]
then
  abort "Bash is required to interpret this script."
fi

BINARY_DIR=$(cd "$(dirname "$0")";pwd)

shell_join() {
  local arg
  printf "%s" "$1"
  shift
  for arg in "$@"
  do
    printf " "
    printf "%s" "${arg// /\ }"
  done
}

chomp() {
  printf "%s" "${1/"$'\n'"/}"
}

ohai() {
  printf "${tty_blue}==>${tty_bold} %s${tty_reset}\n" "$(shell_join "$@")"
}

warn() {
  printf "${tty_red}Warning${tty_reset}: %s\n" "$(chomp "$1")" >&2
}

do_echo() {
  command printf %s\\n "$*" 2>/dev/null
}

do_has() {
  type "$1" > /dev/null 2>&1
}

# Search PATH for the specified program that satisfies Homebrew requirements
# function which is set above
# shellcheck disable=SC2230
find_tool() {
  if [[ $# -ne 1 ]]
  then
    return 1
  fi

  local executable
  while read -r executable
  do
    if [[ "${executable}" != /* ]]
    then
      warn "Ignoring ${executable} (relative paths don't work)"
    elif "test_$1" "${executable}"
    then
      echo "${executable}"
      break
    fi
  done < <(which -a "$1")
}

exists_in_list() {
  LIST=$1
  DELIMITER=$2
  VALUE=$3

  # [[ "$LIST" =~ (DELIMITER|^)$VALUE($DELIMITER|$) ]] && echo 1 || echo 0
  [[ "$LIST" =~ $VALUE ]]
}

# First check OS.
OS="$(uname)"
if [[ "${OS}" == "Linux" ]]
then
  ON_LINUX=1
elif [[ "${OS}" == "Darwin" ]]
then
  ON_MACOS=1
else
  # abort "only supported on macOS and Linux."
  echo
fi

# Required installation paths. To install elsewhere (which is unsupported)
# anywhere you like.
if [[ -n "${ON_MACOS-}" ]]
then
  # On MacOS
  UNAME_MACHINE="$(/usr/bin/uname -m)"

  if [[ "${UNAME_MACHINE}" == "arm64" ]]
  then
    # On ARM
    echo
  else
    # On Intel
    echo
  fi
else
  UNAME_MACHINE="$(uname -m)"
fi

do_download() {
  if do_has "curl"; then
    curl --fail --compressed -q "$@"
  elif do_has "wget"; then
    # Emulate curl with wget
    ARGS=$(do_echo "$@" | command sed -e 's/--progress-bar /--progress=bar /' \
                            -e 's/--compressed //' \
                            -e 's/--fail //' \
                            -e 's/-L //' \
                            -e 's/-I /--server-response /' \
                            -e 's/-s /-q /' \
                            -e 's/-sS /-nv /' \
                            -e 's/-o /-O /' \
                            -e 's/-C - /-c /')
    # shellcheck disable=SC2086
    eval wget $ARGS
  fi
}

do_execute() {
  if ! "$@"
  then
    abort "$(printf "Failed during: %s" "$(shell_join "$@")")"
  fi
}


if ! command -v curl >/dev/null
then
  abort "$(
    cat <<EOABORT
You must install cURL before installing
EOABORT
  )"
elif [[ -n "${ON_LINUX-}" ]]
then
  USABLE_CURL="$(find_tool curl)"
  if [[ -z "${USABLE_CURL}" ]]
  then
    abort "$(
      cat <<EOABORT
The version of cURL that was found does not satisfy requirements.
Please install cURL ${REQUIRED_CURL_VERSION} or newer and add it to your PATH.
EOABORT
    )"
  elif [[ "${USABLE_CURL}" != /usr/bin/curl ]]
  then
    CURL_PATH="${USABLE_CURL}"
    ohai "Found cURL: ${CURL_PATH}"
  fi
fi

APP_ADDRESS="https://raw.githubusercontent.com/gaganode/gaga-app-hub/main/bin_gaga_node_pro"
# APP_PACKAGE="apphub-darwin-amd64.tar.gz"
APP_PACKAGE="apphub-${OS_NAME}-${ARCH_NAME}.tar.gz"

TARGET_APP_LIST="
app-linux-arm32.tar.gz
apphub-darwin-amd64.tar.gz
apphub-windows-386.tar.gz
apphub-windows-amd64.tar.gz
apphub-linux-386.tar.gz
apphub-linux-amd64.tar.gz
apphub-linux-arm64.tar.gz
"

if exists_in_list "${TARGET_APP_LIST}" "" "${APP_PACKAGE}"
then
  SOURCE_NAME_LOCAL="${APP_PACKAGE}"
  SOURCE_PATH_LOCAL="${APP_ADDRESS}/${SOURCE_NAME_LOCAL}"
  ohai "Found target package ${SOURCE_NAME_LOCAL}"
else
  abort "Not found target package"
fi

BIN_DIR="bin"

step_clean() {
  do_execute mkdir -p "${BIN_DIR}"
  do_execute find "${BIN_DIR}" -mindepth 1 -delete
}

step_download() {
  do_download -s "${SOURCE_PATH_LOCAL}" -O
  do_execute mv "${SOURCE_NAME_LOCAL}" "${BIN_DIR}"
}

step_extract() {
  do_execute tar -zxf "${BIN_DIR}/${SOURCE_NAME_LOCAL}" -C "${BIN_DIR}" --strip-components 1
}

# following command will execute in BINARY_DIR
cd ${BINARY_DIR}

ohai "Clean Dependency Package..."
step_clean || exit 1

ohai "Downloading Dependency Package..."
step_download || exit 1

ohai "Installation Dependency Package..."
step_extract || exit 1

ohai "Installation successful!"

echo