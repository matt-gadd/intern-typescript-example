class Selectors {
	public main = '.container';
	public userInput = '#inputEmail';
	public passwordInput = '#inputPassword';
	public signInButton = 'button.btn';
	public signInFailedMessage = '.form-failed';
	public getMainPageText = 'h4';
}

export default class Page {
	private remote: any;
	private selectors: Selectors;

	constructor(remote: any) {
		this.remote  = remote;
		this.selectors = new Selectors();
	}

	init(): Promise<any> {
		return this.remote
			.get(require.toUrl('../../../src/resources/index.html'))
			.setFindTimeout(5000)
			.findByCssSelector(this.selectors.main)
			.setFindTimeout(100);
	}

	inputUser(user: string): Promise<any> {
		return this.remote
			.findByCssSelector(this.selectors.userInput)
			.type(user)
			.end();
	}

	inputPassword(password: string): Promise<any> {
		return this.remote
			.findByCssSelector(this.selectors.passwordInput)
			.type(password)
			.end();
	}

	clickSignIn(): Promise<any> {
		return this.remote
			.findByCssSelector(this.selectors.signInButton)
			.click()
			.end();
	}

	getSignInErrorText(): Promise<string> {
		return this.remote
			.findByCssSelector(this.selectors.signInFailedMessage)
			.getVisibleText();
	}

	getMainPageText(): Promise<string> {
		return this.remote
			.setFindTimeout(5000)
			.findByCssSelector(this.selectors.getMainPageText)
			.setFindTimeout(100)
			.getVisibleText();
	}

	loginWith(username: string, password: string): Promise<any> {
		return this.inputUser(username)
			.then(() => this.inputPassword(password))
			.then(() => this.clickSignIn());
	}
}
