"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainPage {
    constructor() {
        this.generateRandom = () => Math.random().toString(36).substring(7);
    }
    open(path = "") {
        browser.url(`/${path}`);
    }
    login(userName = "test", password = "1q2w3e4r") {
        this.open();
        this.bottomHeaderElement.waitForExist();
        browser.setValue('[name="user"]', userName);
        browser.setValue('[name="passwd"]', password);
        browser.submitForm('#login_login-main');
    }
    signUp(userName, password) {
        this.open('login');
        browser.setValue("#user_reg", userName);
        browser.setValue("#passwd_reg", password);
        browser.setValue("#passwd2_reg", password);
        let email = `${userName}@test.me`;
        browser.setValue("#email_reg", email);
        browser.submitForm('#register-form');
        browser.element(".user").waitForExist(10000);
    }
    logout() { browser.submitForm(".logout.hover"); }
    findPostedLink(url) {
        let lookup = browser.element(`a[href='${url}']`);
        lookup.waitForExist();
    }
    searchContent(keyword) {
        let searchInput = browser.element('[name="q"]');
        searchInput.waitForVisible(500);
        searchInput.setValue(keyword);
        browser.submitForm('#search');
        browser.waitForExist(1000);
    }
    toggleTabs(url = "") {
        let lookup = browser.element(`a[href="http://reddit.local/${url}/"]`);
        lookup.click();
        browser.waitForVisible('.tabmenu li.selected');
    }
    rateContentUpVote(index) {
        let upvote = browser.element(`div.arrow.up.login-required.access-required`)[index];
    }
    rateContentDownVote(index) {
        let downvote = browser.element(`div.arrow.down.login-required.access-required`)[index];
    }
    faqElement(uri = "https://reddit.zendesk.com") {
        let faqElement = browser.element(`a[href='${uri}']`);
        return faqElement.getText();
    }
    subscribeTo() {
        this.unsubscribeTo();
        this.subscribeOption.waitForExist();
        this.subscribeOption.click();
    }
    unsubscribeTo() {
        this.unsubscribeOption.waitForExist();
        this.unsubscribeOption.click();
    }
    get userKarma() { return browser.element(".userkarma"); }
    get userNameField() { return browser.element('name="user"'); }
    get passwordField() { return browser.elementIdName('name="passwd"'); }
    get bottomHeaderElement() { return browser.element("#header-bottom-right"); }
    get noUnreadMessages() { return browser.element(".nohavemail"); }
    get unsubscribeOption() { return browser.element('.option.remove.active'); }
    get subscribeOption() { return browser.element('.option.add.active'); }
}
const mainPage = new MainPage();
exports.default = mainPage;
