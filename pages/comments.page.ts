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
    public replyComment(text: string): void{
        this.comment.waitForVisible(5000);
        let comment = browser.element("[data-type='comment']").element('.reply-button a');
        comment.click();
        let replyForm = browser.element('.child form');
        replyForm.waitForVisible(5000)
        let textarea = replyForm.element("[data-event-action='comment']");
        textarea.keys(text);
        textarea.setValue(text);
        replyForm.element('[type="submit"]').click();
        browser.waitForExist(".child [data-type='comment']");
    }
    public deleteContent() {
        let deleteFrom = browser.element('.toggle.del-button');
        let delBtn = deleteFrom.element('a.togglebutton');
        delBtn.click()
        let yesBtn = deleteFrom.element('.yes');
        yesBtn.waitForExist(1000)
        yesBtn.click();
    }

    private get comment(){return browser.element("[data-type='comment']");}
    private get textAreaField() { return browser.element("[data-event-action='comment']") }
    private get submitBtn() { return browser.element('[type="submit"]') }
}

const commentsPage = new CommentsPage();
export default commentsPage;