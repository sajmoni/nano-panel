set -e

# Builds, installs to `example` folder and runs the library

runCommand() {
  echo "=== $1 ==="
  $1
  echo ""
}

runCommand "yarn clean"
runCommand "yarn build"
runCommand "yarn pack --filename nano-panel.tgz"
runCommand "cd example"
runCommand "yarn refresh"
runCommand "yarn start"
