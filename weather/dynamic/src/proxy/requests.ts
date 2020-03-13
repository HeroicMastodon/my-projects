export class LoginReq {
	username = '';
	password = '';

	constructor(username = '', password = '') {
		if (username != null) this.username = username;
		if (password != null) this.password = password;
	}
}

export class RegisterReq {
	username = '';
	password = '';
	realName = '';
	email = '';

	constructor(username = '', password = '', realName = '', email = '') {
		this.username = username;
		this.password = password;
		this.realName = realName;
		this.email = email;
	}

	static something() {
		
	}
}