/*jshint browser:true, devel:true, jquery:true, eqeqeq:true, undef:true, unused:true, curly:true, laxcomma:true */
(function ($, undefined) {

    'use strict';

    var namespace = 'prettyselect';
    
    
    /**
     * CLASS DEFINITION
     */

    var PrettySelect = function (element, options) {
        this.options = options;
        this.$element = $(element).on({
            'change.ps': $.proxy(this.update, this),
            'mouseenter.ps mouseleave.ps': $.proxy(this._toggleHover, this),
            'focus.ps': $.proxy(this._setFocus, this),
            'blur.ps': $.proxy(this._removeFocus, this)
        });
        this._init();
        this.update();
    };

    PrettySelect.prototype = {

        constructor: PrettySelect,

        update: function () {
            this.$val.text(this.$element.find(':selected').text());
        },
        uglify: function () {
            this.$element.off('.ps').unwrap().removeData(namespace)[0].className = this.className;
            this.$val.remove();
            this.$caret.remove();
        },
        _init: function () {
            // store some original values
            this.className = this.$element[0].className;
            this.style = this.$element.attr('style');

            this.$element[0].className = namespace;
            // wrap with facade
            var facadeClasses = [namespace, this.options.facadeClass, this.className];
            if (this.options.stretch) {
                facadeClasses.push(this.options.stretchClass);
            }
            this.$facade = $('<div />')
                .addClass(facadeClasses.join(' '))
                .attr('style', this.style);
            this.$facade = this.$element.wrap(this.$facade).parent();
            // add elements
            this.$caret = $('<span class="caret" />').insertBefore(this.$element);
            this.$val = $('<span class="value" />').insertBefore(this.$element);
        },
        _toggleHover: function () {
            this.$facade.toggleClass(this.options.hoverClass);
        },
        _setFocus: function () {
            this.$facade.addClass(this.options.focusClass);
        },
        _removeFocus: function () {
            this.$facade.removeClass(this.options.focusClass);
        }
    };


    /**
     * PLUGIN DEFINITION
     */

    $.fn.prettyselect = function (option) {
        return this.each(function () {
            var $this = $(this)
                , args = Array.prototype.slice.apply(arguments, [1])
                , data = $this.data(namespace)
                , nodeName = $this[0].nodeName
                , options = $.extend({}, $.fn.prettyselect.defaults, $this.data(), typeof option === 'object' && option);
            if (!data && /select/i.test(nodeName) && !$this.prop('multiple')) {
                $this.data(namespace, (data = new PrettySelect(this, options)));
            }
            if (typeof option === 'string') {
                data[option].apply(data, args);
            }
        });
    };
    $.fn.prettyselect.defaults = {
        stretch: false,
        facadeClass: 'prettyselect-facade-active',
        stretchClass: 'prettyselect-stretch',
        hoverClass: 'hover',
        focusClass: 'focus'
    };
    $.fn.prettyselect.Constructor = PrettySelect;

    // initialize plugin on dom ready
    $(function () {
        $('.prettyselect').prettyselect();
    });
}(window.jQuery));