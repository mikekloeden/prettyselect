/*jshint browser:true, devel:true, jquery:true, eqeqeq:true, undef:true, unused:true, curly:true, laxcomma:true */
/*global buster:true, assert:true, refute:true */

buster.testCase('prettyselect', {
    'setUp': function () {
        var fixture = $('<div id="fixture" />').appendTo('body');

        this.$select = $('<select />')
            .append('<option value="1">One</option>')
            .append('<option value="2" selected>Two is an option with with a long text</option>')
            .append('<option value="3">Three</option>');

        fixture.append(this.$select);
    },
    'tearDown': function () {
        $('#fixture').remove();
    },

    'should be defined on jquery object': function () {
        assert.defined($.fn.prettyselect, 'plugin method is defined');
    },

    'should be chainable': function () {
        assert.equals(this.$select.prettyselect(), this.$select, 'is chainable');
    },

    'should store object instance on element': function () {
        var $el = this.$select.prettyselect();

        assert.isObject($el.data('prettyselect'), 'stores object instance on element');
        assert($el.data('prettyselect') instanceof $.fn.prettyselect.Constructor, 'uses plugin constructor to create object instance');
    },

    'should only initialize on select elements': function () {
        refute.defined($('<div />').prettyselect().data('prettyselect'), 'initialize only on appropriate element');
        refute.defined($('<input type="text" />').prettyselect().data('prettyselect'), 'initialize only on appropriate element');
    },

    'should not initialize on select elements with type multiple': function () {
        refute.defined($('<select multiple />').prettyselect().data('prettyselect'), 'initialize only on appropriate selects');
    },

    'element should get "prettyselect" css class': function () {
        assert.className(this.$select.prettyselect()[0], 'prettyselect');
    },

    'facade should copy css classes from element': function () {
        var className = 'test css-class-test';
        this.$select[0].className = className;
        this.$select.prettyselect();

        assert.className(this.$select.parent()[0], className, 'copies classes from element to facade');
        refute.className(this.$select[0], className, 'removes classes from element');
        assert.match(this.$select.parent()[0], {
            tagName: 'div',
            className: $.fn.prettyselect.defaults.facadeClass
        }, 'wraps element with an appropriate facade');
    },

    'facade should copy style attribute from element': function () {
        var style = this.$select.css({
            width: '50%',
            marginBottom: 5
        }).attr('style');
        this.$select.prettyselect();

        assert.equals(this.$select.parent().attr('style'), style, 'copies style from element to facade');
    },

    'should change display value on initialize': function () {
        var selectedValue = this.$select.find(':selected').text();
        this.$select.prettyselect();

        assert.equals(this.$select.parent().find('.value').text(), selectedValue, 'changes display value on initialize');
    },

    'should change display value on change': function () {
        var selectedValue = 'One';
        this.$select.prettyselect();
        this.$select.val(selectedValue).trigger('change');

        assert.equals(this.$select.parent().find('.value').text(), selectedValue, 'changes display value on change');
    },

    'should toggle focusClass on focus and blur': function () {
        this.$select.prettyselect();

        this.$select.focus();
        assert.className(this.$select.parent()[0], $.fn.prettyselect.defaults.focusClass, 'sets focus class');

        this.$select.blur();
        refute.className(this.$select.parent()[0], $.fn.prettyselect.defaults.focusClass, 'sets focus class');
    },

    'should toggle hoverClass on hover': function () {
        this.$select.prettyselect();

        this.$select.trigger('mouseenter');
        assert.className(this.$select.parent()[0], $.fn.prettyselect.defaults.hoverClass, 'sets hover class');

        this.$select.trigger('mouseleave');
        refute.className(this.$select.parent()[0], $.fn.prettyselect.defaults.hoverClass, 'sets hover class');
    },

    'should set hoverClass and focusClass when hovered on focus': function () {
        this.$select.prettyselect();

        this.$select.focus().trigger('mouseenter');
        assert.className(this.$select.parent()[0], $.fn.prettyselect.defaults.hoverClass, 'sets hover class');
        assert.className(this.$select.parent()[0], $.fn.prettyselect.defaults.focusClass, 'sets focus class');
    },

    'calling "uglify" should remove the plugin clutter and restore element': function () {
        var $el = this.$select;

        refute.exception(function () {
            $el = $el.prettyselect('uglify');
        }, 'method not defined');
        refute.match($el.parent()[0], {
            tagName: 'div',
            className: $.fn.prettyselect.defaults.facadeClass
        }, 'removes facade');
        refute(this.$select.parent().find('.value').text(), 'removes display value');
        refute($el.parent().find('.caret').length, 'removes caret');
        refute($el.data('prettyselect'), 'removes object instance');
        refute.className($el[0], 'prettyselect', 'removes "prettyselect" css class');
    },

    'should keep element width': function () {
        var widthBefore = this.$select.outerWidth();
        this.$select.prettyselect();

        assert.equals(this.$select.outerWidth(), widthBefore, 'keeps width');
    },

    'should keep fixed element width, when set via inline style': function () {
        var $el = $('<select style="width: 100px; "/>');
        var widthBefore = $el.outerWidth();
        $el.prettyselect();

        assert.equals($el.outerWidth(), widthBefore, 'keeps fixed width');
    },

    'should keep fluid element width, when set via inline style': function () {
        var $el = $('<select style="width: 50%; "/>');
        var widthBefore = $el.outerWidth();
        $el.prettyselect();

        assert.equals($el.outerWidth(), widthBefore, 'keeps fluid width');
    }
});