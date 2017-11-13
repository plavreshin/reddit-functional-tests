var expect = require('chai').expect
import MainPage from '../pages/main.page'
import SubmissionPage from '../pages/submission.page'
import CommentsPage from '../pages/comments.page'


describe('Reddit', () => {
    const generateRandom = () => Math.random().toString(36).substring(10);
    const subreddit = "pics";

    before('Sign up in Reddit', () => {
        MainPage.signUp();
      });

    it('Should observe user karma score', () => {
        MainPage.userKarma.waitForExist();
        expect(MainPage.userKarma.getText()).to.contain("1");
    });

    it('Should be able to submit link content', () => {
        SubmissionPage.open();
        let url = `https://${generateRandom()}.ee`;
        SubmissionPage.submitLinkContent("IDX1511", url, subreddit);
    });

    it('Should be able to submit text content', () => {
        SubmissionPage.open("submit?selftext=true");
        SubmissionPage.submitTextContent(generateRandom(), subreddit, generateRandom());
    });

    it('Should be able to comment to just created text comment', () => {
        SubmissionPage.open("submit?selftext=true");
        let postedContent = SubmissionPage.submitTextContent(generateRandom(), subreddit, "myTopic");
        CommentsPage.open(postedContent);
        CommentsPage.addComment("myFirstComment");
    });

    it('Should observe unread messages count equal to zero', () => {
        MainPage.noUnreadMessages.waitForExist();
    });
});