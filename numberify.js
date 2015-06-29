var id;

function numberify (selector) {

	//function to get actual line numbers not the css property value
	function getLineHeight(element){
	   var temp = document.createElement(element.nodeName);
	   temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
	   temp.innerHTML = "test";
	   temp = element.parentNode.appendChild(temp);
	   var ret = temp.clientHeight;
	   temp.parentNode.removeChild(temp);
	   return ret;
	}
    
    function getRows(selector) {
        var height = $(selector).height();
        console.debug("height", height);
        var el = document.getElementById("numbered");
        line_height =  parseFloat(getLineHeight(el));
        console.debug("line_height",line_height);
        var rows = Math.floor(height/line_height);
        console.debug("rows",rows);
        return rows;
    }

    $(window).resize(function() {
        clearTimeout(id);
        
        id = setTimeout(getRows(selector), 500);
        
    });

    getRows(selector);
}