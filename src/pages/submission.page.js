"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmissionPage {
    constructor() {
        this.submit = () => {
            browser.click('[name="submit"]');
            browser.element('.linkinfo').waitForExist();
        };
    }
    open(path = "submit") {
        browser.url(`/${path}`);
        browser.element('#link-desc').waitForExist();
    }
    submitLinkContent(title, url, subreddit) {
        this.titleField.setValue(title);
        this.urlField.setValue(url);
        this.subredditField.setValue(subreddit);
        this.submit();
        return browser.getUrl();
    }
    submitTextContent(title, subreddit, text) {
        this.titleField.setValue(title);
        if (text)
            this.textField.setValue(`${text}`);
        this.subredditField.setValue(subreddit);
        this.submit();
        return browser.getUrl();
    }
    get titleField() { return browser.element('[name="title"]'); }
    get urlField() { return browser.element('[name="url"]'); }
    get textField() { return browser.element('[name="text"]'); }
    get subredditField() { return browser.element('[name="sr"]'); }
}
const submissionPage = new SubmissionPage();
exports.default = submissionPage;
