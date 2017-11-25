var expect = require('chai').expect
import MainPage from '../pages/main.page'
import SubmissionPage from '../pages/submission.page'
import CommentsPage from '../pages/comments.page'
import PreferencesPage from '../pages/preferences.page'


describe('Reddit', () => {
    const generateRandom = () => Math.random().toString(36).substring(10);
    const subreddit = "pics";
    const userName = MainPage.generateRandom();
    const password = MainPage.generateRandom();

    before('Sign up in Reddit', () => {
      
        MainPage.signUp(userName, password);
    });

    it('Func_11: Should observe user karma score', () => {
        MainPage.userKarma.waitForExist();
        expect(MainPage.userKarma.getText()).to.contain("1");
    });

    it('Func_06: Should up vote content', () => {
        MainPage.rateContentUpVote(0);
        MainPage.rateContentDownVote(3);
    });

    it('Func_04: Should be able to submit link content', () => {
        SubmissionPage.open();
        let url = `https://${generateRandom()}.ee`;
        SubmissionPage.submitLinkContent("IDX1511", url, subreddit);
    });

    it('Func_07: User should be able to search for content ', () => {
        MainPage.open();
        MainPage.searchContent('IDX1511');
    });

    it('Func_03: Should be able to submit text content', () => {
        SubmissionPage.open("submit?selftext=true");
        SubmissionPage.submitTextContent(generateRandom(), subreddit, generateRandom());
    });

    it('Func_05: Should be able to comment to just created text content', () => {
        SubmissionPage.open("submit?selftext=true");
        let postedContent = SubmissionPage.submitTextContent(generateRandom(), subreddit, "myTopic");
        CommentsPage.open(postedContent);
        CommentsPage.addComment("myFirstComment");
    });

    it.skip('Func_05: Should be able edit created comment', () => {
        SubmissionPage.open("submit?selftext=true");
        let postedContent = SubmissionPage.submitTextContent(generateRandom(), subreddit, "myTopic");
        CommentsPage.open(postedContent);
        CommentsPage.addComment("myFirstComment");
    });

    it('Func_08: User  should be able to reply to a comment ', () => {
        SubmissionPage.open("submit?selftext=true");
        let postedContent = SubmissionPage.submitTextContent(generateRandom(), subreddit, "myTopic");
        CommentsPage.open(postedContent);
        CommentsPage.addComment("myFirstComment");
        CommentsPage.replyComment("myFirstreply");
    });

    it("Func_10: User can delete own added content", () => {
        SubmissionPage.open("submit?selftext=true");
        let title = generateRandom();
        let postedContent =  SubmissionPage.submitTextContent(title, subreddit, generateRandom());
        CommentsPage.open(postedContent);
        CommentsPage.deleteContent();
        // MainPage.open();
        // MainPage.findPostedLink(postedContent);
    });
    it("Func_13: User should be able to access site preferences", ()=>{
        MainPage.open();
        PreferencesPage.viewPreferences();
    });

    it("Func_14: User should be able to switch UI from any language to Estonian language", ()=>{
        PreferencesPage.changeLanguage();
    });
    it("Func_14: User should be able to switch UI from any language to Estonian language", ()=>{
        PreferencesPage.changeLanguage();
    })
    it("Func_14: User should be able to switch UI from any language to Estonian language", ()=>{
        PreferencesPage.changeLanguage('en');
    });

    it("Func_15: User should be able to deactivate account", ()=>{
        PreferencesPage.open();
        PreferencesPage.deactivateAccount(userName,password);
    });


    it('Func_19: User should be able to switch between hot/top/gilded tabs in any direction', ()=>{
        MainPage.toggleTabs('new');
        MainPage.toggleTabs('top');
        MainPage.toggleTabs('gilded');
    });

    it('Func_12: Should observe unread messages count equal to zero', () => {
        MainPage.noUnreadMessages.waitForExist();
    });

    it('Func_20:User should be redirected to login form when logged out from preferences tab ', ()=>{
        PreferencesPage.viewPreferences();
        PreferencesPage.logout();
    });
});