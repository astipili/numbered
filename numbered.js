function numberify (selector) {
    
    function getRows(selector) {
        var height = $(selector).height();
        var el = document.getElementById("test");
        //var line_height = $(selector).css('line-height');
        //line_height = line_height;
        line_height =  parseFloat(getLineHeight(el));
        
        var rows = Math.floor(height/line_height);
        console.debug("rows",rows);
        return rows;
    }
    getRows('#test');

    function getLineHeight(element){
       var temp = document.createElement(element.nodeName);
       temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
       temp.innerHTML = "test";
       temp = element.parentNode.appendChild(temp);
       var ret = temp.clientHeight;
       temp.parentNode.removeChild(temp);
       return ret;
    }
}