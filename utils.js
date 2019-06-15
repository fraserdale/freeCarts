module.exports.getBotByFooter = footer => {
	switch (footer.text.toLowerCase()) {
		case 'splashforce':
			return 'splashforce';
			break;
		case 'ycopp ultimate adidas bot':
			return 'ycopp';
			break;
		case 'latchkeyio adidas bot':
			return 'latchkey';
			break;
		case 'sole aio adidas mode':
			return 'soleaio';
			break;
		case 'adisplash by backdoor, all rights reserved.':
			return 'adisplash';
			break;
		case 'phantom':
			return 'phantom';
			break;
		case 'balkobot':
			return 'balko';
			break;
		case 'gen5 adidas':
			return 'gen5';
			break;
		default:
		    if (footerText.startsWith('nomercy')) {
				return 'nomercy';
				break
			}else if(footerText.toLowerCase().startsWith('kodaiaio')){
				return 'kodai'
			}
		    else if(footerText.toLowerCase().startsWith('adisplash')){
				return 'adisplash'
				break
			}
	}
	return undefined;
}

const THUMBNAIL_URL = 'https://i.imgur.com/Gy1AX6A.jpg'

module.exports.createFooter = cartNum => {
	return `Cart: # ${cartNum} • Made by Jalfrazi`;
}

module.exports.getThumbnail = () => {
	return THUMBNAIL_URL;
}
