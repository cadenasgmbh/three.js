/**
 * @author thespite / http://clicktorelease.com/
 */

THREE.ImageBitmapLoader = function (manager) {

	this.manager = manager !== undefined ? manager : THREE.DefaultLoadingManager;
	this.options = {};

};

THREE.ImageBitmapLoader.prototype = {

	constructor: THREE.ImageBitmapLoader,

	setOptions: function setOptions(options) {

		this.options = options;
		return this;

	},

	load: function load(url, onLoad, onProgress, onError) {

		if (url === undefined) url = '';

		if (this.path !== undefined) url = this.path + url;

		var scope = this;

		var cached = THREE.Cache.get(url);

		if (cached !== undefined) {

			scope.manager.itemStart(url);

			setTimeout(function () {

				if (onLoad) onLoad(cached);

				scope.manager.itemEnd(url);

			}, 0);

			return cached;
		}

		fetch(url).then(function (res) {

			return res.blob();

		}).then(function (res) {

			return createImageBitmap(res, scope.options);

		}).then(function (res) {

			THREE.Cache.add(url, res);

			if (onLoad) onLoad(res);

			scope.manager.itemEnd(url);

		}).catch(function (e) {

			if (onError) onError(e);

			scope.manager.itemEnd(url);
			scope.manager.itemError(url);

		});
	}

};
