grunt
cp resources/package_prod.json dist/package.json
#cd dist
#zip -r ../${PWD##*/}.nw *
grunt build-app
#touch build/releases/Orb/mac/orb.txt
#touch build/releases/Orb/win/orb.txt
#/tmp/du/dropbox_uploader upload build/releases/Orb/mac/orb.txt /mac/
#/tmp/du/dropbox_uploader upload build/releases/Orb/win/orb.txt /win/