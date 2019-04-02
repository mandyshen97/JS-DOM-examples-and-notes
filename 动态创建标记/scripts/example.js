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


    // var info = "nodeName: ";
    // info += para.nodeName;
    // info += "   "
    // info += "nodeType: ";
    // info += para.nodeType;
    // alert(info);
}