class CommentsPage {
    public open(path: string): void {
        browser.url(path);
        browser.element('.linkinfo').waitForExist();
    }

    public addComment(text: string): void {
        this.textAreaField.waitForVisible(5000);
        this.textAreaField.keys(text);
        this.textAreaField.setValue(text);
        this.submitBtn.waitForExist();
        browser.submitForm('.usertext.cloneable.warn-on-unload');
        browser.waitForExist('.userattrs');
        let commentUrl = browser.getUrl();
        console.log("Commented on url: " + commentUrl);
    }

    private get textAreaField() { return browser.element("[data-event-action='comment']") }
    private get submitBtn() { return browser.element('[type="submit"]') }
}

const commentsPage = new CommentsPage();
export default commentsPage;