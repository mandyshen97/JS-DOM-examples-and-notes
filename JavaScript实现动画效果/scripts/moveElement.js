function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y) {
        return true;
    }
    if(xpos < final_x) {
        xpos++;
    }
    if(xpos > final_x) {
        xpos--;
    }
    if(ypos < final_y) {
        ypos++;
    }
    if(ypos > final_y) {
        ypos--;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")";
    movement = setTimeout(repeat, interval);
    // 注意：下面这种写法是错误的。
    // 上面的写法是要存储`repeat = `后面拼接出来的字符串，然后在setTimeout方法中传参。
    // 如果写成下面的，就是直接调用 moveElement 这个方法了，相当于函数调用并赋值给变量 repeat 了。 实际上希望在 setTimeout 中调用。
    // var repeat = "moveElement(elementID, final_x, final_y, interval)";
    // movement = setTimeout(repeat, interval);
}