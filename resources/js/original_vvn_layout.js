function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
var headerClone;
var header = document.querySelector('header.header');
headerClone = header.cloneNode(true);
let width = document.documentElement.clientWidth;
headerClone.setAttribute('class', 'header header-clone fixed hidden');
headerClone.style.cssText =
	`
        top: 0px;
        width: ${width}px;
    `;

let breadcrumb = headerClone.querySelector('.breadcrumb');
if (breadcrumb) {
	headerClone.removeChild(breadcrumb);
}


document.body.append(headerClone);

function turnHeaderCloneON() {
	if (headerClone.classList.contains('hidden')) {
		headerClone.classList.toggle('hidden');
	}
}

function turnHeaderCloneOff() {
	if (!headerClone.classList.contains('hidden')) {
		headerClone.classList.toggle('hidden');
	}
}

let previousY = scrollY;
window.addEventListener('scroll', toggleTheClone);
function toggleTheClone() {
	let currentScroll = scrollY;
	let src_value = scrollY;
	if (header !== null) {

		if (currentScroll > 1) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}

		if ((currentScroll < previousY) && (currentScroll > 1)) {
			turnHeaderCloneON();

		} else {
			turnHeaderCloneOff();

		}
		previousY = scrollY;
	}


}

window.addEventListener('resize', checkWidth);
function checkWidth() {
	if (document.documentElement.clientWidth == headerClone.clientWidth) {
		return;
	} else {
		let width = document.documentElement.clientWidth;
		headerClone.style.cssText =
			`
                top: 0px;
                width: ${width}px;
            `;
		checkToolbar();
	}
}

//нормальное отображение хэдера для залогиненнового пользователя друпала

function checkToolbar() {
	if (document.body.classList.contains('toolbar-horizontal')) {
		headerClone.style.top = '79px';
	}
}
checkToolbar();
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}


function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll(".ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();






function addToCart_old(productButton, productId) {
	const product = document.querySelector(`[data-nid="${productId}"]`);
	const cart = document.querySelector('.red_heart_notification span');
	const cloneCart = document.querySelector('.header-clone .red_heart_notification span');

	if (!productButton.classList.contains('hold')) {
		productButton.classList.add('hold');
		productButton.classList.add('fly');


		const productImage = product.querySelector('.swiper-slide-active .the-node-image');

		const productImageFly = productImage.cloneNode(true);

		const pif_width = productImage.offsetWidth;
		const pif_height = productImage.offsetHeight;
		const pif_top = productImage.getBoundingClientRect().top;
		const pif_left = productImage.getBoundingClientRect().left;

		productImageFly.setAttribute('class', 'flyImage ibg');
		productImageFly.style.cssText =
			`
			left: ${pif_left}px;
			top: ${pif_top}px;
			width: ${pif_width}px;
			height: ${pif_height}px;
		`;

		document.body.append(productImageFly);


		var header = document.querySelector('header.header');

		let cart_top;
		let cart_left;

		if (header.classList.contains('scrolled')) {
			turnHeaderCloneON();
			cart_top = cloneCart.getBoundingClientRect().top;
			cart_left = cloneCart.getBoundingClientRect().left;
		} else {
			cart_top = cart.getBoundingClientRect().top;
			cart_left = cart.getBoundingClientRect().left;
		}


		productImageFly.style.cssText =
			`
			left: ${cart_left}px;
			top: ${cart_top}px;
			width: 0px;
			height: 0px;
			opacity: 0;
		`;

		if (product.querySelector('._icon-heart')) {
			let heart = product.querySelector('._icon-heart');
			heart.classList.remove('_icon-heart');
			heart.classList.add('_icon-red_heart');

		} else {
			if (product.querySelector('img.add-to-cart')) {
				let heart = product.querySelector('img.add-to-cart');
				heart.src = '/themes/mytheme/img/icons/red_heart.svg';
			}

		}

		var added = cart.innerText;
		added = Number(added);
		added = added + 1;
		cart.innerText = added;
		cloneCart.innerText = added;
	} else {
		productButton.classList.remove('hold');

		if (product.querySelector('._icon-red_heart')) {
			let heart = product.querySelector('._icon-red_heart');
			heart.classList.add('_icon-heart');
			heart.classList.remove('_icon-red_heart');

		} else {
			if (product.querySelector('img.add-to-cart')) {
				let heart = product.querySelector('img.add-to-cart');
				heart.src = '/themes/mytheme/img/icons/Like.svg';
			}

		}

		var added = cart.innerText;
		added = Number(added);
		added = added - 1;
		cart.innerText = added;
		cloneCart.innerText = added;
	}
}

var projectContext = 'production';

function checkTheCart() {
	var value = getCookie('favorites_cookie');
	if (!value) { return; } //проверяем не пуста ли куки
	if (!document.querySelector('.red_heart_notification span')) { return; } //проверяем есть ли на странице корзина
	if (getProduct()) { //проверяем наличие продуктов на странице
		value.split(',').forEach(element => {
			if (getProduct(element)) {
				addToCart(element, 0);
			} else {
				incrementCartCount();
			}

		});
	} else {
		let quantity = value.split(',').length;
		setCartCountValue(quantity);
	}
}

function addToCart(productId, toFly = 1) {
	const product = getProduct(productId);
	const button = getButton(product); //button объект со свойством button.button

	changeButtonState(button);



	if (!button.button.classList.contains('hold')) {

		button.button.classList.add('hold');
		button.button.classList.add('fly');
		if (toFly) {
			flyImage(product);
		}

		incrementCartCount();
		addNodeToCart(productId);

	} else {
		button.button.classList.remove('hold');
		decrementCartCount();
		deleteNodeFromCart(productId);
	}
}

function addToCart_project(productButton, productId) {

	const product = getProduct(productId);
	const button = getButton(product);

	changeButtonState(button);

}

function addNodeToCart(productId) {

	if (!wasItAdded(productId)) {
		var value = getCookie('favorites_cookie');
		if (value) {
			value = value + ',' + productId;
		} else {
			value = productId;
		}

		setCookie('favorites_cookie', value);
	}
}

function deleteNodeFromCart(productId) {
	if (wasItAdded(productId)) {
		let value = getCookie('favorites_cookie');
		let dl;
		let arr = value.split(',');

		for (let i = 0; i < arr.length; i++) {
			const element = arr[i];
			if (element == productId) {
				dl = i;
			}

		}
		arr.splice(dl, 1);
		value = arr.join(',');
		setCookie('favorites_cookie', value);


	}
}

function wasItAdded(productId) {
	var currentValue = getCookie('favorites_cookie');
	let response = false;
	if (!currentValue) { return response };
	currentValue.split(',').forEach(element => {

		let isEqual = (element == productId);
		if (isEqual) {
			response = isEqual;
		}
	});

	return response;

}

function flyImage(product) {
	const cart = document.querySelector('.red_heart_notification span');
	const cloneCart = document.querySelector('.header-clone .red_heart_notification span');
	const productImage = product.querySelector('.swiper-slide .the-node-image');
	const productImageFly = productImage.cloneNode(true);
	const pif_width = productImage.offsetWidth;
	const pif_height = productImage.offsetHeight;
	const pif_top = productImage.getBoundingClientRect().top;
	const pif_left = productImage.getBoundingClientRect().left;

	productImageFly.setAttribute('class', 'flyImage ibg');
	productImageFly.style.cssText =
		`
		left: ${pif_left}px;
		top: ${pif_top}px;
		width: ${pif_width}px;
		height: ${pif_height}px;
	`;

	document.body.append(productImageFly);

	var header = document.querySelector('header.header');

	let cart_top;
	let cart_left;

	if (header.classList.contains('scrolled')) {
		turnHeaderCloneON();
		cart_top = cloneCart.getBoundingClientRect().top;
		cart_left = cloneCart.getBoundingClientRect().left;
	} else {
		cart_top = cart.getBoundingClientRect().top;
		cart_left = cart.getBoundingClientRect().left;
	}


	productImageFly.style.cssText =
		`
		left: ${cart_left}px;
		top: ${cart_top}px;
		width: 0px;
		height: 0px;
		opacity: 0;
	`;
}

function setCartCountValue(quantity) {
	const cart = document.querySelector('.red_heart_notification span');
	const cloneCart = document.querySelector('.header-clone .red_heart_notification span');

	var added = quantity;
	added = Number(added);
	cart.innerText = added;
	cloneCart.innerText = added;
}

function incrementCartCount() {
	const cart = document.querySelector('.red_heart_notification span');
	const cloneCart = document.querySelector('.header-clone .red_heart_notification span');

	var added = cart.innerText;
	added = Number(added);
	added = added + 1;
	cart.innerText = added;
	cloneCart.innerText = added;
}

function decrementCartCount() {
	const cart = document.querySelector('.red_heart_notification span');
	const cloneCart = document.querySelector('.header-clone .red_heart_notification span');

	var added = cart.innerText;
	added = Number(added);
	added = added - 1;
	cart.innerText = added;
	cloneCart.innerText = added;

}

function changeButtonState(button, targetState) {
	switch (targetState) {
		case "active":
			pushButton(button);
			break;
		case "blank":
			unPushButton(button);
			break;
		default:
			if (isButtonActive(button)) {
				unPushButton(button);
			} else {
				pushButton(button);
			}
			break;
	}
}

function pushButton(button) {
	switch (button.type) {
		case "full":
			button.button.classList.remove('_icon-heart');
			button.button.classList.add('_icon-red_heart');
			break;
		case "teaser":
			button.button.src = getRedHeartSrc(projectContext);
			break;
	}
}

function unPushButton(button) {
	switch (button.type) {
		case "full":
			button.button.classList.remove('_icon-red_heart');
			button.button.classList.add('_icon-heart');
			break;
		case "teaser":
			button.button.src = getBlankHeartSrc(projectContext);
			break;
	}
}

function isButtonActive(button) {
	var response = false;

	switch (button.type) {
		case "full":
			if (button.button.classList.contains('_icon-red_heart')) {
				response = true;
			}
			break;
		case "teaser":
			if (button.button.src.includes(getRedHeartSrc(projectContext))) {

				response = true;
			}
			break;
	}
	return response;

}

function getProduct(productId) {
	if (!productId) {
		let product = document.querySelector(`[data-nid]`);
		if (product) {
			return true;
		}
	}
	var product = document.querySelector(`[data-nid="${productId}"]`);
	return product;

}

function getButton(product) {
	var response = {
		button: "element",
		type: "is it full node or teaser"
	};
	if (product.querySelector('._icon-heart') || product.querySelector('._icon-red_heart')) {

		if (product.querySelector('._icon-heart')) {
			response.button = product.querySelector('._icon-heart');
		}
		if (product.querySelector('._icon-red_heart')) {
			response.button = product.querySelector('._icon-red_heart');
		}
		response.type = "full";

	} else {
		if (product.querySelector('img.add-to-cart')) {
			response.button = product.querySelector('img.add-to-cart');
			response.type = "teaser";
		}
	}
	return response;
}

function getRedHeartSrc(projectContext) {
	var response = ' ';
	switch (projectContext) {
		case "production":
			response = '/themes/mytheme/img/icons/red_heart.svg';
			break;
		case "local":
			response = 'img/icons/red_heart.svg';
			break
		default:
			response = '/themes/mytheme/img/icons/red_heart.svg';
	}

	return response;
}

function getBlankHeartSrc(projectContext) {
	var response = ' ';
	switch (projectContext) {
		case "production":
			response = '/themes/mytheme/img/icons/Like.svg';
			break;
		case "local":
			response = 'img/icons/Like.svg';
			break
		default:
			response = '/themes/mytheme/img/icons/Like.svg';
	}

	return response;

}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

	options = {
		path: '/',
		'max-age': 36000000,
		// при необходимости добавьте другие значения по умолчанию
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}
window.onload = function () {
	document.addEventListener("click", documentActions);
	checkTheCart();
	// Actions (делегирование события click)
	function documentActions(e) {
		const targetElement = e.target;
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
			setTimeout(function () {
				document.getElementById('search_input').focus();
				document.getElementById('search_input').select();
			}, 100);


		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}

		if (targetElement.classList.contains('add-to-cart')) {
			const productId = targetElement.closest('.the-product').dataset.nid;
			addToCart(productId);
		}
	}
}


