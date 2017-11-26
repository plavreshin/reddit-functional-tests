
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

    public signUp(userName: string, password: string): void {
        this.open('login');
        // let userName = this.generateRandom();
        browser.setValue("#user_reg", userName);
        // let password = this.generateRandom();
        browser.setValue("#passwd_reg", password);
        browser.setValue("#passwd2_reg", password);
        let email = `${userName}@test.me`;
        browser.setValue("#email_reg", email);
        browser.submitForm('#register-form');
        browser.element(".user").waitForExist(10000);
    }

    public logout(): void { browser.submitForm(".logout.hover"); }

    public findPostedLink(url: string): void {
        let lookup = browser.element(`a[href='${url}']`);
        lookup.waitForExist();
    }

    public searchContent(keyword: string): void {
        let searchInput = browser.element('[name="q"]');
        searchInput.waitForVisible(500);
        searchInput.setValue(keyword);
        browser.submitForm('#search');
        browser.waitForExist(1000);
    }

    public toggleTabs(url: string=""){
        let lookup = browser.element(`a[href="http://reddit.local/${url}/"]`);
        lookup.click();
        browser.waitForVisible('.tabmenu li.selected');
        // browser.waitForVisible(`${url}-page`);
    }

    public rateContentUpVote(index: number): void {
        let upvote = browser.element(`div.arrow.up.login-required.access-required`)[index];
    }
    public rateContentDownVote(index: number): void {
        let downvote = browser.element(`div.arrow.down.login-required.access-required`)[index];
    }

    generateRandom = () => Math.random().toString(36).substring(7);

    public get userKarma() { return browser.element(".userkarma") }
    public get userNameField() { return browser.element('name="user"') }
    public get passwordField() { return browser.elementIdName('name="passwd"') }
    public get bottomHeaderElement() { return browser.element("#header-bottom-right") }
    public get noUnreadMessages() { return browser.element(".nohavemail") }
    public get unsubscribeOption() { return browser.element('.option.remove.active') }
    public get subscribeOption() { return browser.element('.option.add.active') }
}

const mainPage = new MainPage();
export default mainPage;