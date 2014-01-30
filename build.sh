grunt
cp resources/package.json dist/package.json
#cd dist
#zip -r ../${PWD##*/}.nw *
grunt build-app
touch build/releases/Orb/mac/orb.txt
touch build/releases/Orb/win/orb.txt
dropbox_uploader upload build/releases/Orb/mac/orb.txt /mac/
dropbox_uploader upload build/releases/Orb/win/orb.txt /win/