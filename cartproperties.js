class CartProperties {
	constructor(cartNum, email, pass, loginURL, img, size, sku = '') {
		this.id = cartNum;
		this.email = email;
		this.pass = pass;
		this.login = loginURL;
		this.img = img;
		this.size = size;
		this.sku = sku;
		this.time = Date.now();

		Object.seal(this);
	}
}

module.exports = CartProperties;