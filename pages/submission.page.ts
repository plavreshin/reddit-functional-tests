class SubmissionPage {
    public open(path: string = "submit"): void {
        browser.url(`/${path}`);
        browser.element('#link-desc').waitForExist();
    }

    public submitLinkContent(title: string, url: string, subreddit: string): string {
        this.titleField.setValue(title);
        this.urlField.setValue(url);
        this.subredditField.setValue(subreddit);
        this.submit();
        return browser.getUrl();
    }

    public submitTextContent(title: string, subreddit: string, text?: string): string {
        this.titleField.setValue(title);
        if (text) this.textField.setValue(`${text}`);
        this.subredditField.setValue(subreddit);
        this.submit();
        return browser.getUrl();
    }

    submit = (): void => {
        browser.click('[name="submit"]');
        browser.element('.linkinfo').waitForExist();
    }


    private get titleField() { return browser.element('[name="title"]') }
    private get urlField() { return browser.element('[name="url"]') }
    private get textField() { return browser.element('[name="text"]') }
    private get subredditField() { return browser.element('[name="sr"]') }
}

const submissionPage = new SubmissionPage();
export default submissionPage;