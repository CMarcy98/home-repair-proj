class Auth {

	// Returns true if the user is logged in
	static get loginStatus() {
		let login = false;

		if (localStorage.getItem('userId') && localStorage.getItem('userId').length > 0) {
			login = true;
			console.log('User is currently logged in!');
			// console.log(localStorage.getItem('userId'));
			// console.log(localStorage.getItem('userId').length);
		} else {
			console.log('No user is logged in right this moment.. Go login please.')
		}

		return login;
	}


}

export default Auth;