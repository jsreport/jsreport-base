# jsreport-base

[![NPM Version](http://img.shields.io/npm/v/jsreport-base.svg?style=flat-square)](https://npmjs.com/package/jsreport-base)
[![Build Status](https://travis-ci.org/jsreport/jsreport-base.png?branch=master)](https://travis-ci.org/jsreport/jsreport-base)

> jsreport extension automatically injecting [html base tag](https://www.tutorialspoint.com/html/html_base_tag.htm) to allow relative referencing of local files

See https://jsreport.net/learn/base

## Installation
> npm install jsreport-base

## Usage

### Set base address in config

```
"base": {
  "url": "${cwd}/myAssets"
},
"phantom-pdf": {
  "allowLocalFilesAccess": true
}
```

The extension then injects [html base tag](https://www.tutorialspoint.com/html/html_base_tag.htm) into every valid html:

```
<html>
	<head>
	  <base href="file:///jsreport/Folder/myAssets" />
	  <script src="js/jquery.min.js"></script>
	</head>
	<body>
	</body>
</html>
```

The base tag assures that relatively linked scripts, images or styles gets loaded from the specified folder without additional extra work.

### Send base address when running through cli

```
jsreport render
  --template.engine=none
  --template.recipe=phantom-pdf
  --template.content=test.html
  --options.base=%cd%
  --out=out.pdf 
```


### Send base address as part of the api request

> `POST`: http://localhost:5488/api/report<br/>
> `Headers`: Content-Type: application/json<br/>
> BODY:
>```
{
	"template": {
        "content": "<html><head></head><body></body></html>",
        "recipe": "html",
        "engine": "handlebars"
    },
    "options": {
        "base": "http://foo.com"
    }
}
>```

## jsreport-core
You can apply this extension also manually to [jsreport-core](https://github.com/jsreport/jsreport-core)

```js
var jsreport = require('jsreport-core')()
jsreport.use(require('jsreport-base')({ url: __dirname }))
```
