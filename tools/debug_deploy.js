


/*
STEPS:
1- copy debug.html as index.html to the www folder
2- copy the development and resources folders: assets, enyou\source, lib, source, spec, spec.html, config.xml
3- Check into gitHub
4- Call phoneGap compile APIs
*/

var targetFolder = '../../MiTrendz_FE_iOS/www/';
var sourceFolder = '../';

fs = require('fs');
var wrench = require('wrench');


fs.createReadStream(sourceFolder + 'debug.html').pipe(fs.createWriteStream(targetFolder + 'index.html'));
if (fs.existsSync(sourceFolder + 'spec.html')){
	fs.createReadStream(sourceFolder + 'spec.html').pipe(fs.createWriteStream(targetFolder + 'spec.html'));
}
fs.createReadStream(sourceFolder + 'config.xml').pipe(fs.createWriteStream(targetFolder + 'config.xml'));

// Deep-copy an existing directory
if (!fs.existsSync(targetFolder + 'assets')){
	wrench.mkdirSyncRecursive(targetFolder + 'assets', 0777);
}

wrench.copyDirSyncRecursive(sourceFolder + 'assets', targetFolder + 'assets');
if (!fs.existsSync(targetFolder + 'enyo/source')){
	wrench.mkdirSyncRecursive(targetFolder + 'enyo/source', 0777);
}
wrench.copyDirSyncRecursive(sourceFolder + 'enyo/source', targetFolder + 'enyo/source');
fs.createReadStream(sourceFolder + 'enyo/enyo.js').pipe(fs.createWriteStream(targetFolder + 'enyo/enyo.js'));
fs.createReadStream(sourceFolder + 'enyo/loader.js').pipe(fs.createWriteStream(targetFolder + 'enyo/loader.js'));
fs.createReadStream(sourceFolder + 'enyo/package.json').pipe(fs.createWriteStream(targetFolder + 'enyo/package.json'));

if (!fs.existsSync(targetFolder + 'lib')){
	wrench.mkdirSyncRecursive(targetFolder + 'lib', 0777);
}
wrench.copyDirSyncRecursive(sourceFolder + 'lib', targetFolder + 'lib');
if (!fs.existsSync(targetFolder + 'source')){
	wrench.mkdirSyncRecursive(targetFolder + 'source', 0777);
}
wrench.copyDirSyncRecursive(sourceFolder + 'source', targetFolder + 'source');
if (!fs.existsSync(targetFolder + 'spec')){
wrench.mkdirSyncRecursive(targetFolder + 'spec', 0777);
}
if (fs.existsSync(sourceFolder + 'spec')){
	wrench.copyDirSyncRecursive(sourceFolder + 'spec', targetFolder + 'spec');
}

function checkIntoGitHub(){
	
}






