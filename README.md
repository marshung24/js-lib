Javascript extension library
===



# 安裝
## Composer安裝

### 一般安裝

```
$ composer require marshung/js-lib
```

### 自定安裝路徑

```
// 編輯本地composer.json，增加下列設定

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

> - 可用變數：{$vendor}, {$name}, {$type}
> - 判斷方式：
> 1.套件名稱 ["marshung/js-lib"]
> 2.type ["type:js-lib"]



