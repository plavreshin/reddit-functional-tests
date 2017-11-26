const generateRandom = () => (Math.random()*1e32).toString(36);

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

    public signUp(): [string, string] {
        this.open('login');
        let userName = generateRandom();
        browser.setValue("#user_reg", userName);
        let password = generateRandom();
        browser.setValue("#passwd_reg", password);
        browser.setValue("#passwd2_reg", password);
        let email = `${userName}@test.me`;
        browser.setValue("#email_reg", email);
        browser.submitForm('#register-form');
        browser.element(".user").waitForExist(10000);
        return [userName, password];
    }

    public logout(): void {
        if (browser.isExisting(".logout.hover")) {
            browser.submitForm(".logout.hover");
        }
    }

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

    public toggleTabs(url: string= ""){
        let lookup = browser.element(`a[href="http://reddit.local/${url}/"]`);
        lookup.click();
        browser.waitForVisible('.tabmenu li.selected');
    }

    public rateContentUpVote(index: number): void {
        let upvote = browser.element(`div.arrow.up.login-required.access-required`)[index];
    }

    public rateContentDownVote(index: number): void {
        let downvote = browser.element(`div.arrow.down.login-required.access-required`)[index];
    }

    public faqElement(uri: string = "https://reddit.zendesk.com") {
        let faqElement = browser.element(`a[href='${uri}']`);
        return faqElement.getText();
    }

    public subscribeTo(): void {
        this.unsubscribeTo();
        this.subscribeOption.waitForExist();
        this.subscribeOption.click();
    }

    public unsubscribeTo(): void {
        this.unsubscribeOption.waitForExist();
        this.unsubscribeOption.click();
    }

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