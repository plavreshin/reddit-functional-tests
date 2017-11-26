"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommentsPage {
    open(path) {
        browser.url(path);
        browser.element('.linkinfo').waitForExist();
    }
    addComment(text) {
        this.textAreaField.waitForVisible(5000);
        this.textAreaField.keys(text);
        this.textAreaField.setValue(text);
        this.submitBtn.waitForExist();
        browser.submitForm('.usertext.cloneable.warn-on-unload');
        browser.waitForExist('.userattrs');
        this.scoreLikes.waitForExist();
    }
    replyComment(text) {
        this.comment.waitForVisible(5000);
        let comment = browser.element("[data-type='comment']").element('.reply-button a');
        comment.click();
        let replyForm = browser.element('.child form');
        replyForm.waitForVisible(5000);
        let textarea = replyForm.element("[data-event-action='comment']");
        textarea.keys(text);
        textarea.setValue(text);
        replyForm.element('[type="submit"]').click();
        browser.waitForExist(".child [data-type='comment']");
    }
    deleteContent() {
        let deleteFrom = browser.element('.toggle.del-button');
        let delBtn = deleteFrom.element('a.togglebutton');
        delBtn.click();
        let yesBtn = deleteFrom.element('.yes');
        yesBtn.waitForExist(1000);
        yesBtn.click();
    }
    get comment() { return browser.element("[data-type='comment']"); }
    get textAreaField() { return browser.element("[data-event-action='comment']"); }
    get submitBtn() { return browser.element('[type="submit"]'); }
    get scoreLikes() { return browser.element('.score.likes'); }
}
const commentsPage = new CommentsPage();
exports.default = commentsPage;
