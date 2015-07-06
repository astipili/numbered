var id;

function numberify (selector) {

	var style = {
		width: '30px',
		marginRight: '5px',
		paddingRight: '5px',
		lineHeight: 1
	}

	var content = $(selector).html();

	$(selector).text('').html("<div id='numberify_wrapper'>" + content + "</div>")

	$('#numberify_wrapper').parent().prepend('<div id="n_numbers"></div>');

	//function to get actual line numbers not the css property value
	function getRealLineHeight(element){
	   var temp = document.createElement(element.nodeName);
	   temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
	   temp.innerHTML = "test";
	   temp = element.parentNode.appendChild(temp);
	   var ret = temp.clientHeight;
	   temp.parentNode.removeChild(temp);
	   return ret;
	}
    
    function getRows(selector) {
    	console.log("getRows");

        if($(selector).has('p').length > 0){
        	var count = $(selector + ' p').length;

        	/*var marginTop =  $(selector + ' p').css("margin-top");
        	var marginBottom = $(selector + ' p').css("margin-bottom");
        	var paddingTop = $(selector + ' p').css("padding-top");
        	var paddingBottom = $(selector + ' p').css("padding-bottom");*/

        	var elemetsHeight =  $(selector + ' p').css("margin-top");
        	elemetsHeight += $(selector + ' p').css("margin-bottom");
        	elemetsHeight += $(selector + ' p').css("padding-top");
         	elemetsHeight += $(selector + ' p').css("padding-bottom");

         	elemetsHeight = elemetsHeight * count;

        }

        var height = $(selector).height() + elemetsHeight;

        console.debug("height", height);
        var el = document.getElementById("numbered");
        line_height =  parseFloat(getRealLineHeight(el));
        style.lineHeight = line_height;
        console.debug("line_height",line_height);
        var rows = Math.floor(height/line_height);
        console.debug("rows",rows);
        return rows;
    }

    function addNumbers(selector){
    	var count = getRows('#numberify_wrapper');

    	$('#n_numbers').html('').css({
    		"width": style.width,
    		"margin-right": style.marginRight,
    		"padding-right": style.paddingRight,
    		"line-height": style.lineHeight + 'px'
    	});

    	for (var i = 1; i <= count ; i++) {
    		$('#n_numbers').append('<div>' + i + '</div>');
    	};
    	
    }

    $(window).resize(function() {
        clearTimeout(id);
        
        id = setTimeout(addNumbers(selector), 500);
        
    });

    addNumbers(selector);
}