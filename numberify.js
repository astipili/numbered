var id;

function numberify (selector) {

	var style = {
		width: '30px',
		marginRight: '5px',
		paddingRight: '5px',
		lineHeight: 1
	};

	var allowedInnerTags = ["p", "div"];

	var content = $(selector).html();

	$(selector).text('').html("<div id='numberify_wrapper'>" + content + "</div>")

	$('#numberify_wrapper').parent().prepend('<div id="n_numbers"></div>');

	//function to get actual line numbers not the css property value
	function getRealLineHeight (selector) {
		selector = selector.substr(1, selector.length);
		var element = document.getElementById(selector);
		var temp = document.createElement(element.nodeName);
		temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
		temp.innerHTML = "test";
		temp = element.parentNode.appendChild(temp);
		var ret = temp.clientHeight;
		temp.parentNode.removeChild(temp);
		return ret;
	}

	function marginStabilizer (tag) {

		if($(selector).has(tag).length > 0){

			$(selector + ' ' + tag).not("#n_numbers").css({
				paddingTop: 0,
				paddingBottom: 0,
				marginTop:  line_height,
				marginBottom: line_height
			});
		}
		else {
			return;
		}
	}
    
    function getRows (selector) {

        line_height =  parseFloat(getRealLineHeight(selector));
        
        style.lineHeight = line_height;

        $.each(allowedInnerTags, function(index) {
        	marginStabilizer ( allowedInnerTags[index] );
        });

        var height = $(selector).height();

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