const widdershins = require('widdershins');
const fs = require('fs');
const yaml = require('js-yaml');

let options = {};

options.user_templates = './widdershins-script/templates'
options.codeSamples = true;
options.language_tabs = [{ go: 'Go' }, { javascript: 'JavaScript' }, { python: 'Python' }];

const specsInfo = [
    {
        'loc': './widdershins-script/specs/dispatcher.public.openapi.yaml',
        'type': 'yaml',
        'page': 'dispatcher.md'
    },
    {
        'loc': './widdershins-script/specs/ocm.service.log.openapi.json',
        'type': 'json',
        'page': 'servicelog.md'
    },
    {
        'loc': './widdershins-script/specs/payloadtracker.openapi.yaml',
        'type': 'yaml',
        'page': 'payloadtracker.md'
    }
]

specsInfo.forEach((specInfo) => {
    try {
        const fileData = fs.readFileSync(specInfo.loc, 'utf-8');
        const swaggerFile = specInfo.type === 'yaml' ? yaml.load(fileData) : JSON.parse(fileData)

        widdershins.convert(swaggerFile, options)
        .then(markdownOutput => {
            fs.writeFileSync(`./pages/${specInfo.page}`, markdownOutput, 'utf-8');
        })
        .catch(err => {
            console.log(err)
        });
    } catch(e) {
        console.log(e)
        return
    }
})
