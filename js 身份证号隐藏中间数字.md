# js 身份证号隐藏中间数字

```js
var card='123845785238542307';
var strcard=card.replace(/^(.{4})(?:\d+)(.{4})$/,"$1******$2");
```

