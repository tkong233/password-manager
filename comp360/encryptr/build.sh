#!/bin/bash

if [ "$#" -lt 1 ]; then
    echo "Select platform to build: ios, android or desktop"
    exit
fi

function install_platform {
  PLATFORM=$1;
  if [ "$PLATFORM" == "ios" ]; then
    ./node_modules/cordova/bin/cordova platform remove ios
    ./node_modules/cordova/bin/cordova platform add ios
  elif [ "$PLATFORM" == "android" ]; then
    ./node_modules/cordova/bin/cordova platform remove android
    ./node_modules/cordova/bin/cordova platform add android
  fi
}

function cp_icon {
  PLATFORM=$1;
  if [ "$PLATFORM" == "ios" ]; then
    cp iOSIcon.png icon.png
  elif [ "$PLATFORM" == "android" ]; then
    cp AndroidIcon.png icon.png
  fi
}

for PLATFORM in "$@"; do
  if [ "$PLATFORM" == "ios" ] || [ "$PLATFORM" == "android" ]; then
    npm install
    install_platform $PLATFORM
    cp_icon $PLATFORM
    cordova-icon
    cordova-splash
    grunt --force
    ./node_modules/cordova/bin/cordova prepare $PLATFORM
    ./node_modules/cordova/bin/cordova build $PLATFORM
    ./node_modules/cordova/bin/cordova build $PLATFORM --release
  elif [ "$PLATFORM" == "desktop" ]; then
    npm install
    grunt --force
    grunt desktop --force
    grunt desktop:release --force
  else
    echo "Invalid platform to build. Plataforms: ios, android or desktop"
  fi
done
