const CartProperties = require('./cartproperties');

module.exports.splashforceCartProperties = (e, cartNum) => {
    const email = e.fields[0]['value'];
    const pass = e.fields[1]['value'];
    const loginURL = e.url;
    const img = e.thumbnail.url;
    const size = e.fields[3]['value'];
    const sku = e.fields[2]['value'];

	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}

module.exports.ycoppCartProperties = (e, cartNum) => {
    const email = e.fields[0]['value'];
    const pass = e.fields[1]['value'];
   	const loginURL = e.url;
    const img = `http://demandware.edgesuite.net/sits_pod20-adidas/dw/image/v2/aaqx_prd/on/demandware.static/-/;Sites-adidas-products/en_US/dw8b928257/zoom/${sku}_01_standard.jpg`;
    const size = e.title.split(',')[1];
    const sku = e.title.split(',')[0];

	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}

module.exports.latchkeyCartProperties = (e, cartNum) => {
    const email = e.fields[4]['value'];
    const pass = e.fields[5]['value'];
    const loginURL = e.url;
    const img = e.thumbnail.url;
    const size = e.fields[2]['value'];
    const sku = e.fields[1]['value'];

	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}

module.exports.balkoCartProperties = (e, cartNum) => {
    const email = e.fields[0]['value'];
    const pass = e.fields[1]['value'];
    const loginURL = e.url;
    const img = e.thumbnail.url;
    const size = e.fields[2]['value'];
    const sku = e.fields[4]['value'];

	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}

module.exports.soleaioCartProperties = (e, cartNum) => {
    const email = e.fields[6]['value'];
    const pass = e.fields[7]['value'];
    const loginURL = e.description;
    const img = e.thumbnail.url;
    const size = e.fields[1]['value'];
    const sku = e.fields[0];

	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}

module.exports.adisplashCartProperties = (e, cartNum) => {
    const userPass = e.fields[2]['value']; //the user and password value colon separated

    const email = userPass.split(': ')[1].split('\n')[0];
    const pass = userPass.split(': ')[2];
    const loginURL = e.url;
    const sku = e.fields[0]['value'];
    const img = 'https://transform.dis.commercecloud.salesforce.com/transform/aagl_prd/on/demandware.static/-/Sites-adidas-products/default/zoom/'+sku+'_00_plp_standard.jpg?sw=276&sh=276&sm=fit&strip=false';
    const size = e.fields[1]['value'];

    
	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}

module.exports.phantomCartProperties = (e, cartNum) => {
    const userPass = e.fields[4]['value'];
    const email = userPass.split(':')[0];
    const pass = userPass.split(':')[1];
    const loginURL = 'https://www.adidas.com/';
    const img = '';
    const size = e.fields[1]['value'];
    const sku = e.fields[0]['value'];
    
	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}

module.exports.gen5CartProperties = (e, cartNum) => {
    const email = e.fields[3]['value'];
    const pass = e.fields[4]['value'];
    const loginURL = e.url;
    const img = e.thumbnail.url;
    const size = e.fields[1]['value'];
    const sku = e.fields[0]['value'];
    
	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}


module.exports.nomercyCartProperties = (e, cartNum) => {
    const email = e.fields[3]['value'];
    const pass = e.fields[4]['value'];
    const loginURL = e.url;
    const img = e.thumbnail.url;
    const size = e.fields[1]['value'];
    const sku = e.fields[0]['value'];
    
	return new CartProperties(cartNum, email, pass, loginURL, img, size, sku);
}
