// ?foo=bar&baz=bing => {foo: bar, baz: bing}

let str = "?foo=bar&baz=bing",q={};
// 获取URL的查询参数

str.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);q;

console.log(q);