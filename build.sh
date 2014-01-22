grunt
rm dist.nw
cp resources/package.json dist/package.json
cd dist
zip -r ../${PWD##*/}.nw *