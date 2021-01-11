/**
 * kreFullImage v0.3
 * https://github.com/kurien92/kreFullImage
 */
var kreFullImage = (function(options) {
	"use strict";

	var opts = {
		targets: "#images",
		imageWrapClass: "fullImageWrap",
		fullSizeActiveClass: "fullImageWrapActive",
		backgroundColor: "#ffffff",
		event: {
			initFullImage: function() {},
			destroyFullImage: function() {},
			startFullImage: function() {},
			stopFullImage: function() {},
			beforeFullSize: function(_this, originWidth, originHeight) {},
			afterFullSize: function(_this, originWidth, originHeight) {},
			beforeOriginSize: function(_this, originWidth, originHeight) {},
			afterOriginSize: function(_this, originWidth, originHeight) {},
			resizedFullSize: function(activeClass) {}
		}
	}

	var conf = {
		clientWidth: document.documentElement.clientWidth,
		clientHeight: document.documentElement.clientHeight
	}

	function init() {
		for(var i in options) {
			opts[i] = options[i];
		}

		var targetImages = $(opts.targets).find("img");

		targetImages.wrap($("<div>", {
			class: opts.imageWrapClass
		}));
		
		opts.event.initFullImage();
	}

	function destroy() {
		opts.event.destroyFullImage();
		stop();

		var targetImages = $(opts.targets).find("img");
		
		if(targetImages.parent("." + opts.imageWrapClass).length === 0) {
			return;
		}

		targetImages.unwrap();
	}

	function start() {
		eventOn();
		opts.event.startFullImage();
	}

	function stop() {
		opts.event.stopFullImage();

		if($("." + opts.fullSizeActiveClass).length !== 0) {
			_originSize("." + opts.fullSizeActiveClass);
		}

		eventOff();
	}

	function eventOn() {
		$(opts.targets).on("click", "." + opts.imageWrapClass, _toggleSize);
		$(window).on("resize orientationChage", resizeEventListener)
	}

	function eventOff() {
		$(opts.targets).off("click", "." + opts.imageWrapClass, _toggleSize);
		$(window).off("resize orientationChage", resizeEventListener)
	}

	function resizeEventListener() {
		conf["clientWidth"] = document.documentElement.clientWidth;
		conf["clientHeight"] = document.documentElement.clientHeight;

		_resizeFullSize();
	}

	function _toggleSize() {
		if($(this).hasClass(opts.fullSizeActiveClass)) {
			_originSize("." + opts.fullSizeActiveClass);
			return;
		}

		if($("." + opts.fullSizeActiveClass).length !== 0) {
			_originSize("." + opts.fullSizeActiveClass);
		}

		_fullSize(this);
	}

	function _fullSize(_this) {
		var originWidth = $(_this).children('img')[0].style.width || 'auto';
		var originHeight = $(_this).children('img')[0].style.height || 'auto';

		opts.event.beforeFullSize(_this, originWidth, originHeight);
		
		$(_this).attr('data-width', originWidth);
		$(_this).attr('data-height', originHeight);

		$("body").addClass("hide");
		$(_this).addClass(opts.fullSizeActiveClass);
		$(_this).css("backgroundColor", opts.backgroundColor);

		_fullSizing(_this);

		opts.event.afterFullSize(_this, originWidth, originHeight);
	}

	function _fullSizing(_this) {
		var img = $(_this).children('img');

		var widthRatio = img.width() / conf.clientWidth;
		var heightRatio = img.height() / conf.clientHeight;

		if(widthRatio > heightRatio) {
			$(_this).css({width: conf.clientWidth, height: conf.clientHeight, overflowX: "auto", overflowY: "hidden"});
			img.css({width: "auto", height: "100%", maxWidth: "none", maxHeight: "none"});
		} else {
			$(_this).css({width: conf.clientWidth, height: conf.clientHeight, overflowX: "hidden", overflowY: "auto"});
			img.css({width: "100%", height: "auto", maxWidth: "none", maxHeight: "none"});
		}
	}

	function _originSize(_this) {
		var originWidth = $(_this).attr('data-width');
		var originHeight = $(_this).attr('data-height');

		opts.event.beforeOriginSize(_this, originWidth, originHeight);

		$("body").removeClass("hide");
		$(_this).removeAttr("style");
		$(_this).removeAttr('data-width');
		$(_this).removeAttr('data-height');
		
		$(_this).children("img").removeAttr("style");
		$(_this).children("img").css({width: originWidth, height: originHeight});
		$(_this).removeClass(opts.fullSizeActiveClass);
		
		opts.event.afterOriginSize(_this, originWidth, originHeight);
	}

	function _resizeFullSize() {
		var activeClass = $("." + opts.fullSizeActiveClass);

		if(activeClass.length === 0) {
			return;
		}
		
		_fullSizing(activeClass);
		opts.event.resizedFullSize(activeClass);
	}

	var method = {
		destroy: function() {
			destroy();
			return this;
		},
		start: function() {
			start();
			return this;
		},
		stop: function() {
			stop();
			return this;
		},
		fullSize: function(imgSelector) {
			imgSelector = $(imgSelector);

			if(imgSelector.length > 1) {
				imgSelector = $(imgSelector[0]);
			}

			imgSelector = imgSelector.parent("." + opts.imageWrapClass);

			_fullSize(imgSelector);
		},
		originSize: function(imgSelector) {
			imgSelector = $(imgSelector);

			if(imgSelector.length > 1) {
				imgSelector = $(imgSelector[0]);
			}

			imgSelector = imgSelector.parent("." + opts.imageWrapClass);

			_originSize(imgSelector);
		}
	}

	init();

	return method;
});