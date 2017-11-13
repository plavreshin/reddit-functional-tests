class MainPage {
    public open(path: string = ""): void {
        browser.url(`/${path}`);
    }

    public login(userName: string = "test", password: string = "1q2w3e4r"): void {
        this.open();
        this.bottomHeaderElement.waitForExist();
        browser.setValue('[name="user"]', userName);
        browser.setValue('[name="passwd"]', password);
        browser.submitForm('#login_login-main');
    }

    public signUp(): void {
        this.open('login');
        let userName = this.generateRandom();
        browser.setValue("#user_reg", userName);
        let password = this.generateRandom();
        browser.setValue("#passwd_reg", password);
        browser.setValue("#passwd2_reg", password);
        let email = `${userName}@test.me`;
        browser.setValue("#email_reg", email);
        browser.submitForm('#register-form');
        browser.element(".user").waitForExist(20000);
    }

    public findPostedLink(url: string): void {
        let lookup = browser.element(`a[href='${url}']`);
        lookup.waitForExist();
    }

    generateRandom = () =>  Math.random().toString(36).substring(7);

    public get userKarma() { return browser.element(".userkarma") }
    public get userNameField() { return browser.element('name="user"') }
    public get passwordField() { return browser.elementIdName('name="passwd"') }
    public get bottomHeaderElement() { return browser.element("#header-bottom-right") }
    public get noUnreadMessages() { return browser.element(".nohavemail") }
}
const mainPage = new MainPage();
export default mainPage;