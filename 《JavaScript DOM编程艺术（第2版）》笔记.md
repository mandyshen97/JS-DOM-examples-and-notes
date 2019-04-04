《JavaScript DOM 编程艺术（第2版）》笔记

[TOC]

# 第1章：JavaScript 简史

- JavaScript 的起源

> JavaScript 是 Netscape 公司和  Sun 公司合作开发的。

- DOM

> DOM 是一套对文档的内容进行抽象和概念化的方法。

- 浏览器战争

> 今天，几乎所有的浏览器都内置了对 DOM 的支持，只要遵循 DOM 标准，就可以放心大胆的去做。

# 第2章：JavaScript 语法

- 语句

  > 建议在每条语句末尾都加上分号。

- 注释

  ```javascript
  // 单行注释
  /* 多行注释
     多行注释*/
  ```

- 变量

  ```javascript
  var mood = "happy";
  var age = 33;
  ```

- 数据类型
  - 字符串
  - 数值
  - 布尔值
  - 数组
    - 数组
    - 关联数组
  - 对象

- 操作符

  - 算术操作符

  `+` ,`-`,`*`,`/`,`++`,`--`,`+=`

  - 比较操作符

  `>`,`=`,`<`,`>=`,`<=`,`==`,`!=`,`===`.......

  `==`并不表示严格相等，认为 false 与 "" 表示的含义相同。

  ```javascript
  false == '';
  // true
  ```

  `===` 进行严格比较，不仅比较值，而且比较变量的类型。

  ```javascript
  false === '';
  // false
  ```
  - 逻辑操作符

- 条件语句和循环语句

  ```javascript
  if (condions) {
      statemen}
  ```
  - while循环

    ```javascript
    while (conditions) {
        statements;
    }
    ```

  - for 循环

- 函数与对象

  - 函数：

  ```javascript
  function name(arguments) {
      statements;
  }
  ```

  - 对象(object)：

  > 对象是一种非常重要的数据类型。
  对象的两种访问形式：

  - 属性  `Object.property`
  - 方法  `Object.method()`

  > **宿主对象**：在Web应用中就是由浏览器提供的预定义对象。

# 第3章：DOM

DOM：

- 文档：D (document)
- 对象：O(object)
  - 用户定义对象
  - 内建对象：如 Array,Math,Data等。
  - 宿主对象：由浏览器提供的对象。
- 模型:   M(model)

节点(node)：

- 元素节点
- 文本节点
- 属性节点

获取元素：

- `getElementById`
- `getElementsByTagName`
- `getElementsByClassName`

获取属性：

- `getAttribute`

设置属性：

- `setAttribute`

# 第4章：案例研究：JavaScript图片库

介绍了 DOM 提供的几个新属性：

- `childNodes`
- `nodeType`
- `nodeValue`
- `firstChild`
- `lastChild`

# 第5章：最佳实战

## 平稳退化

> **平稳退化**(graceful degradation)：正确使用 JavaScript 脚本，可以让访问者在他们的浏览器不支持 JavaScript 的情况下仍然能顺利地浏览你的网站。
>
> 不能平稳退化会影响你的网页在搜索引擎上的排名。

- `"javascript:"` 伪协议：***这种做法非常不好***

  - 真协议：用来在因特网上的计算机之间传输数据包，如HTTP协议(http://)、FTP协议(ftp://)等。

  - 伪协议：非标准化的协议。

    ```javascript
    // 用"javascript:" 伪协议调用 popUp()函数：
    <a href="javascript:popUp('http://www.example.com/');">Example</a>
    ```

- 内嵌的事件处理函数

  ```javascript
  <a href="#" onclick="popUp('http://www.example.com/'); return false;">Example</a>
  ```

  ***非常不好，因为`#`只是创建了一个空链接。***

- 平稳退化办法：将 `href` 属性设置为真实存在的 URL 地址，让它成为一个有效的链接。

  ```javascript
  <a href="http://www.example.com/" onclick="popUp(this.href); return false;">Example</a>
  ```

  这样，即使 javascript 被禁止，这个链接也是可用的。

## 渐进增强

> **渐进增强**就是用一些额外的信息层去包裹原始数据。
>
> 按照“渐进增强”原则创建出来的网页几乎都符合“平稳退化”原则。

结构、样式、行为要分离。

## 向后兼容

- 对象检测

  ```javascript
  // 例如
  if (!document.getElementById) {
      return false;
  }
  ```

- 浏览器嗅探技术

  > 通过提取浏览器供应商提供的信息来解决向后兼容问题。

## 性能考虑

- 尽量少访问DOM和尽量减少标记
- 合并和放置脚本
  - 推荐把 `functionA.js`,`functionB.js`,`functionC.js`合并到一个脚本文件中，这样可以减少加载页面时发送的请求数量。
  - 把 `<script>`标签都放到文档的末尾`</body>`标记之前。因为位于`<head>`中的脚本会导致浏览器无法并行加载其他文件。

- 压缩脚本
  - JSMin(<http://javascript.crockford.com/jsmin.html>)
  - YUI Compressor

# 第6章：案例研究：图片库改进版

## 共享onload事件：`addLoadEvent()`函数

需要多个函数都在页面加载时执行。addLoadEvent只有一个参数：打算在页面加载完毕时执行的函数的名字。

1. 把现有的 window.onload 事件处理函数的值存入变量 oldonload;
2. 如果这个处理函数上还没有绑定任何函数，就像平时那样把新函数添加给它；
3. 如果这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾。

```javascript
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function (){
            oldonload();
            func();
        }
    }
}
```

# 第7章 动态创建标记

## 动态添加

> 注意：用`document.createElement`创建一个空白的p元素，想在p元素内部添加内容，实际上内容也是一个文本节点，所以应该`document.createTextNode`创建一个文本节点，再用`.appendChild`添加到p节点中。

```javascript
window.onload = function () {
    var testdiv = document.getElementById("testdiv");
    var para = document.createElement("p"); // 创建 p 元素节点
    var txt1 = document.createTextNode("This is"); // 创建 文本节点
    var em = document.createElement("em"); // 创建 em 元素节点
    var txt2 = document.createTextNode("content."); // 创建 文本节点
    var txt3 = document.createTextNode("my "); // 创建 文本节点
    testdiv.appendChild(para); // 将 p 元素节点添加到 div 中
    para.appendChild(txt1); // 将文本节点添加到 p 元素中
    para.appendChild(em);
    para.appendChild(txt2);
    em.appendChild(txt3); // 将文本节点添加到 em 元素中
}
```

## 在现有元素后插入一个元素：insertAfter()函数

```javascript
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
```

# 第8章：充实文档的内容

- 把文档里的缩略语显示为一个“缩略语列表”
- 为文档里引用的每段文献节选生成一个“文献来源链接”
- 把文档所支持的快捷键线是位于分“快捷键清单”

# 第9章：CSS-DOM

给一个元素追加新的 class:

```javascript
function addClass(element,value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClassName+= " ";
        newClassName+= value;
        element.className = newClassName;
    }
}
```

# 第10章 ：用JavaScript实现动画效果

- 位置position
  - static
  - fixed
  - relative
  - absolute

- 时间
  - `var variable = setTimeout("function",interval)`
  - `clearTimeout(variable)`

- `parseInt`把字符串里的数值信息提取出来

# 第11章：HTML5

- canvas
- 音频和视频
- 表单

# 第12章：综合示例

