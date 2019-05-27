const THUMBNAIL_URL = 'https://pbs.twimg.com/profile_images/1088110085912649729/usJQewZx_400x400.jpg'

module.exports.createFooter = cartNum => {
	return `Cart: # ${cartNum} • Made by Jalfrazi`;
}

module.exports.getThumbnail = () => {
	return THUMBNAIL_URL;
}

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
		    }
	}
	return undefined;
}