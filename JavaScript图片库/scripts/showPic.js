/**
 * addLoadEvent 函数用来调用 preparePlaceholder函数 和 prepareGallery 函数
 * 只有一个参数 func ：打算在页面加载完毕时执行的函数的名字
 */
function addLoadEvent (func) {
    // 先将现有的 window.onload 事件处理函数的值存入 oldonload
    var oldonload = window.onload;
    // 如果这个事件处理函数还未绑定任何函数，就将新函数添加给它
    // 如果这个事件处理函数已经绑定了一些函数，就将新函数追加到现有函数的末尾
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
} 

/**
 * insertAfter 函数： 把一个节点插入到另一个节点之后
 */
function insertAfter (newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/**
 * preparePlaceholder : 创建一个 img 元素 和一个 p 元素，这个函数把这些新创建的元素插入到节点树图片库清单的后面
 */
function preparePlaceholder () {
    // 确保浏览器不支持这些 DOM 方法情况下有足够的退路
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    // 创建 img 元素， 设置其属性
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery!");
    // 创建 p 元素， 设置其属性
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    // 创建文本节点
    var desctext = document.createTextNode("Choose an image");
    // 将文本节点追加到 p 元素中
    description.appendChild(desctext);
    // 获取 imagegallery 图片库
    var gallery = document.getElementById("imagegallery");
    // 将创建的内容插入到图片库后面
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

/**
 * prepareGallery: 负责处理事件，遍历处理图片清单库里面的所有链接。当用户点击这些链接中的某一个时，就会调用 showPic 函数
 */
function prepareGallery () {
    // 确保浏览器不支持这些 DOM 方法情况下有足够的退路
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for ( var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return showPic(this);
        }
        links[i].onkeypress = links[i].onclick;
    }
}

/**
 * showPic: 负责把“占位符”图片 切换为 目标图片
 */
function showPic (whichpic) {
    if (!document.getElementById("placeholder")) return true;
    // 获取点击图片的 href 属性
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    // 将占位符的源 替换为 点击的图片的 源
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) return false;
    // 获取源图片的 title
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    // 获取 描述 元素
    var description = document.getElementById("description");
    // 检查。 文本节点的 nodeType 属性值等于 3
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false; // 避免跳转到链接
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);