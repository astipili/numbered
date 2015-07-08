(function() {

    var id;

    return numberify = function(selector) {

        var wrapperId = 'numberify_wrapper',
            lineNumbersId = 'n_numbers',
            allowedInnerTags = ["p", "div"],
            style = {
                width: 30,
                marginRight: 5,
                paddingRight: 5,
                lineHeight: 1
            },
            content = '';

        content = $(selector).html();

        $(selector).text('').html("<div id=" + wrapperId + ">" + content + "</div>")

        style.lineHeight = getRealLineHeight('#' + wrapperId);

        $('#' + wrapperId).parent().prepend('<div id=' + lineNumbersId + '></div>');

        $('#' + lineNumbersId).css({
            width: style.width + 'px',
            marginRight: style.marginRight + 'px',
            paddingRight: style.paddingRight + 'px',
            lineHeight: style.lineHeight + 'px'
        });

        $('#' + wrapperId).css({
            marginLeft: style.width + style.paddingRight + style.marginRight + 'px'
        })


        //function to get actual line numbers not the css property value
        function getRealLineHeight(selector) {
            selector = selector.substr(1, selector.length);
            var element = document.getElementById(selector);
            var temp = document.createElement(element.nodeName);
            temp.setAttribute("style", "margin:0px;padding:0px;font-family:" + element.style.fontFamily + ";font-size:" + element.style.fontSize);
            temp.innerHTML = "test";
            temp = element.parentNode.appendChild(temp);
            var ret = temp.clientHeight;
            temp.parentNode.removeChild(temp);
            return ret;
        }

        function marginStabilizer(selector, tag) {
            if ($(selector).has(tag).length > 0) {

                $(selector + ' ' + tag).not('#' + lineNumbersId).css({
                    paddingTop: 0,
                    paddingBottom: 0,
                    marginTop: line_height,
                    marginBottom: line_height
                });
            } else {
                return;
            }
        }

        function getRows(selector) {
            line_height = parseFloat(getRealLineHeight(selector));
            style.lineHeight = line_height;

            $.each(allowedInnerTags, function(index) {
                marginStabilizer(selector, allowedInnerTags[index]);
            });

            var height = $(selector).height();
            var rows = Math.floor(height / line_height);

            return rows;
        }

        function addNumbers(selector) {
            var count = getRows('#' + wrapperId);

            $('#' + lineNumbersId).html('');

            for (var i = 1; i <= count; i++) {
                $('#' + lineNumbersId).append('<div>' + i + '</div>');
            };

        }

        $(window).resize(function() {
            clearTimeout(id);

            id = setTimeout(addNumbers(selector), 500);

        });

        addNumbers(selector);
    }
})();