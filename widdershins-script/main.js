const widdershins = require('widdershins');
const fs = require('fs');
const yaml = require('js-yaml');

let options = {};

options.user_templates = './widdershins-script/templates'
options.codeSamples = true;
options.language_tabs = [{ go: 'Go' }, { javascript: 'JavaScript' }, { python: 'Python' }];

try {
    let fileData = fs.readFileSync('./widdershins-script/specs/dispatcher.public.openapi.yaml', 'utf8');
    let swaggerFile = yaml.load(fileData);

    widdershins.convert(swaggerFile, options)
    .then(markdownOutput => {
    // markdownOutput contains the converted markdown
    fs.writeFileSync('./pages/dispatcher.md', markdownOutput, 'utf8');
    })
    .catch(err => {
    // handle errors
    console.log(err)
    });

    fileData = fs.readFileSync('./widdershins-script/specs/ocm.service.log.openapi.json', 'utf8');
    swaggerFile = JSON.parse(fileData);

    widdershins.convert(swaggerFile, options)
    .then(markdownOutput => {
    // markdownOutput contains the converted markdown
    fs.writeFileSync('./pages/servicelog.md', markdownOutput, 'utf8');
    })
    .catch(err => {
    // handle errors
    console.log(err)
    });

} catch (e) {
    console.log(e)
    return
}
