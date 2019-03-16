Javascript extension library
===

> Mars's Javascript Library Packages

[![Latest Stable Version](https://poser.pugx.org/marshung/js-lib/v/stable)](https://packagist.org/packages/marshung/js-lib) [![Total Downloads](https://poser.pugx.org/marshung/js-lib/downloads)](https://packagist.org/packages/marshung/js-lib) [![Latest Unstable Version](https://poser.pugx.org/marshung/js-lib/v/unstable)](https://packagist.org/packages/marshung/js-lib) [![License](https://poser.pugx.org/marshung/js-lib/license)](https://packagist.org/packages/marshung/js-lib)

# Outline
- [Installation](#Installation)
- [Dependency](#Dependency)
- [Usage](#Usage)

# [Installation](#Outline)
## Composer Install

### Download and Copy
Manually download the specified js library and copy it into the path

### General installation
```
$ composer require marshung/js-lib
```

### Custom path installation
1. Edit the local composer.json, and add following code:
```
{
    "require": {
        "oomphinc/composer-installers-extender": "^1.1",
    },
    "extra": {
    "installer-types": ["js-lib"],
    "installer-paths": {
      "path/{$vendor}/{$name}/": ["type:js-lib"]
    }
  }
}
```

2. Run composer install
```
$ composer require marshung/js-lib
```


> - See: [composer-installers-extender](https://github.com/oomphinc/composer-installers-extender)
> - Available variable：{$vendor}, {$name}, {$type}
> - Judgment method：
>   1. By name ["marshung/js-lib"]
>   2. By type ["type:js-lib"]

# [Dependency](#Outline)
## Popover Button
- jquery-1.12
- bootstrap 3.3

# [Usage](#Outline)
## Popover Button init
**HTML Code**
```html
<script src="src/popoverButton.js"></script>
```

**Javascript Code**
```Javascript
var options = {
    title : '是否刪除？',
    schema : [ {
      value : 'yes',
      text : '是',
      style : 'btn-primary'
    }, {
      value : 'no',
      text : '否',
      style : 'btn-danger'
    }, {
      value : 'note',
      text : '說明',
      style : 'btn-default'
    } ],
    callback : function(value, data, parameter) {
      console.log(value, data)
    }
  };

$app = app.Popover Button($('.selector'), options);
```

## Popover Button destroy
**Javascript Code**
```Javascript
$app.destroy();

```





