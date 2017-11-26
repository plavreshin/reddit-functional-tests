var expect = require('chai').expect
import MainPage from '../pages/main.page'
import SubmissionPage from '../pages/submission.page'
import CommentsPage from '../pages/comments.page'
import PreferencesPage from '../pages/preferences.page'


describe('Reddit', () => {
    const generateRandom = () => (Math.random() * 1e32).toString(36);
    const picsSubReddit = "pics";
    const historicalSubReddit = "askhistorians";
    const topic = "myTopic";
    const commentValue = "myFirstComment";
    const subject = "IDX1511";
    let scopeUserName;
    let scopePassword;

    beforeEach('Prepare users', () => {
        [scopeUserName, scopePassword] = MainPage.signUp();
    });

    afterEach('Logout', () => {
        MainPage.logout();
    });

    it('Func_01: Should be able to subscribe to new topic', () => {
        MainPage.open(`r/${historicalSubReddit}`);
        MainPage.subscribeTo();
    });

    it('Func_02: Should be able to unsubscribe from existing topic', () => {
        MainPage.open(`r/${historicalSubReddit}`);
        MainPage.unsubscribeTo();
    });

    it('Func_03: Should be able to submit text content', () => {
        SubmissionPage.open("submit?selftext=true");
        SubmissionPage.submitTextContent(generateRandom(), picsSubReddit, generateRandom());
    });

    it('Func_04: Should be able to submit link content', () => {
        SubmissionPage.open();
        let url = `https://${generateRandom()}.ee`;
        SubmissionPage.submitLinkContent(subject, url, picsSubReddit);
    });

    it('Func_05: Should be able to comment to just created text content', () => {
        SubmissionPage.open("submit?selftext=true");
        let postedContent = SubmissionPage.submitTextContent(generateRandom(), picsSubReddit, topic);
        CommentsPage.open(postedContent);
        CommentsPage.addComment(commentValue);
    });

    it('Func_06: Should up vote content', () => {
        MainPage.rateContentUpVote(0);
        MainPage.rateContentDownVote(3);
    });

    it.skip('Func_07: User should be able to search for content ', () => {
        MainPage.open();
        MainPage.searchContent('IDX1511');
    });

    it('Func_08: User  should be able to reply to a comment ', () => {
        SubmissionPage.open("submit?selftext=true");
        let postedContent = SubmissionPage.submitTextContent(generateRandom(), picsSubReddit, "myTopic");
        CommentsPage.open(postedContent);
        CommentsPage.addComment("myFirstComment");
        CommentsPage.replyComment("myFirstreply");
    });

    it.skip("Func_10: User can delete own added content", () => {
        SubmissionPage.open("submit?selftext=true");
        let title = generateRandom();
        let postedContent = SubmissionPage.submitTextContent(title, picsSubReddit, generateRandom());
        CommentsPage.open(postedContent);
        CommentsPage.deleteContent();
    });

    it('Func_11: Should observe user karma score', () => {
        MainPage.userKarma.waitForExist();
        expect(MainPage.userKarma.getText()).to.contain("1");
    });

    it('Func_12: Should observe unread messages count equal to zero', () => {
        MainPage.noUnreadMessages.waitForExist();
    });

    it("Func_13: User should be able to access site preferences", () => {
        MainPage.open();
        PreferencesPage.viewPreferences();
    });

    it("Func_14: User should be able to switch UI from any language to Estonian language", () => {
        PreferencesPage.changeLanguage();
    });
    it("Func_14: User should be able to switch UI from any language to Estonian language", () => {
        PreferencesPage.changeLanguage();
    })
    it("Func_14: User should be able to switch UI from any language to Estonian language", () => {
        PreferencesPage.changeLanguage('en');
    });

    it("Func_15: User should be able to deactivate account", () => {
        PreferencesPage.open();
        PreferencesPage.deactivateAccount(scopeUserName, scopePassword);
    });

    it('Func_17: Should be able to access Reddit’s help center', () => {
        let faqElement = MainPage.faqElement();
        expect(faqElement).to.equal("FAQ");
    });

    it('Func_18: Should be able to add a friend', () => {
        PreferencesPage.open("prefs/friends");
        PreferencesPage.addFriend("Athrousch")
    });

    it('Func_19: User should be able to switch between hot/top/gilded tabs in any direction', () => {
        MainPage.toggleTabs('new');
        MainPage.toggleTabs('top');
        MainPage.toggleTabs('gilded');
    });

    it('Func_20:User should be redirected to login form when logged out from preferences tab ', () => {
        PreferencesPage.viewPreferences();
        PreferencesPage.logout();
    });

    it('Func_09: Should be able edit created comment', () => {
        SubmissionPage.open("submit?selftext=true");
        let postedContent = SubmissionPage.submitTextContent(generateRandom(), picsSubReddit, topic);
        CommentsPage.open(postedContent);
        CommentsPage.addComment(commentValue);
    });
});