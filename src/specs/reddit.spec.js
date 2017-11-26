"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require('chai').expect;
const main_page_1 = require("../pages/main.page");
const submission_page_1 = require("../pages/submission.page");
const comments_page_1 = require("../pages/comments.page");
const preferences_page_1 = require("../pages/preferences.page");
describe('Reddit', () => {
    const generateRandom = () => (Math.random() * 1e32).toString(36);
    const picsSubReddit = "pics";
    const historicalSubReddit = "askhistorians";
    const topic = "myTopic";
    const commentValue = "myFirstComment";
    const subject = "IDX1511";
    let userName = main_page_1.default.generateRandom();
    let password = main_page_1.default.generateRandom();
    beforeEach('Prepare users', () => {
        main_page_1.default.signUp(userName, password);
    });
    afterEach('Logout', () => {
        main_page_1.default.logout();
    });
    it('Func_06: Should up vote content', () => {
        main_page_1.default.rateContentUpVote(0);
        main_page_1.default.rateContentDownVote(3);
    });
    it('Func_04: Should be able to submit link content', () => {
        submission_page_1.default.open();
        let url = `https://${generateRandom()}.ee`;
        submission_page_1.default.submitLinkContent("IDX1511", url, picsSubReddit);
    });
    it('Func_01: Should be able to subscribe to new topic', () => {
        main_page_1.default.open(`r/${historicalSubReddit}`);
        main_page_1.default.subscribeTo();
    });
    it('Func_02: Should be able to unsubscribe from existing topic', () => {
        main_page_1.default.open(`r/${historicalSubReddit}`);
        main_page_1.default.unsubscribeTo();
    });
    it('Func_07: User should be able to search for content ', () => {
        main_page_1.default.open();
        main_page_1.default.searchContent('IDX1511');
    });
    it('Func_03: Should be able to submit text content', () => {
        submission_page_1.default.open("submit?selftext=true");
        submission_page_1.default.submitTextContent(generateRandom(), picsSubReddit, generateRandom());
    });
    it('Func_04: Should be able to submit link content', () => {
        submission_page_1.default.open();
        let url = `https://${generateRandom()}.ee`;
        submission_page_1.default.submitLinkContent(subject, url, picsSubReddit);
    });
    it.skip('Func_05: Should be able to comment to just created text content', () => {
        submission_page_1.default.open("submit?selftext=true");
        let postedContent = submission_page_1.default.submitTextContent(generateRandom(), picsSubReddit, topic);
        comments_page_1.default.open(postedContent);
        comments_page_1.default.addComment(commentValue);
    });
    it('Func_11: Should observe user karma score', () => {
        main_page_1.default.userKarma.waitForExist();
        expect(main_page_1.default.userKarma.getText()).to.contain("1");
    });
    it('Func_08: User  should be able to reply to a comment ', () => {
        submission_page_1.default.open("submit?selftext=true");
        let postedContent = submission_page_1.default.submitTextContent(generateRandom(), picsSubReddit, "myTopic");
        comments_page_1.default.open(postedContent);
        comments_page_1.default.addComment("myFirstComment");
        comments_page_1.default.replyComment("myFirstreply");
    });
    it("Func_10: User can delete own added content", () => {
        submission_page_1.default.open("submit?selftext=true");
        let title = generateRandom();
        let postedContent = submission_page_1.default.submitTextContent(title, picsSubReddit, generateRandom());
        comments_page_1.default.open(postedContent);
        comments_page_1.default.deleteContent();
    });
    it("Func_13: User should be able to access site preferences", () => {
        main_page_1.default.open();
        preferences_page_1.default.viewPreferences();
    });
    it("Func_14: User should be able to switch UI from any language to Estonian language", () => {
        preferences_page_1.default.changeLanguage();
    });
    it("Func_14: User should be able to switch UI from any language to Estonian language", () => {
        preferences_page_1.default.changeLanguage();
    });
    it("Func_14: User should be able to switch UI from any language to Estonian language", () => {
        preferences_page_1.default.changeLanguage('en');
    });
    it("Func_15: User should be able to deactivate account", () => {
        preferences_page_1.default.open();
        preferences_page_1.default.deactivateAccount(userName, password);
    });
    it('Func_19: User should be able to switch between hot/top/gilded tabs in any direction', () => {
        main_page_1.default.toggleTabs('new');
        main_page_1.default.toggleTabs('top');
        main_page_1.default.toggleTabs('gilded');
    });
    it('Func_12: Should observe unread messages count equal to zero', () => {
        main_page_1.default.noUnreadMessages.waitForExist();
    });
    it('Func_20:User should be redirected to login form when logged out from preferences tab ', () => {
        preferences_page_1.default.viewPreferences();
        preferences_page_1.default.logout();
    });
    it('Func_17: Should be able to access Reddit’s help center', () => {
        let faqElement = main_page_1.default.faqElement();
        expect(faqElement).to.equal("FAQ");
    });
    it('Func_18: Should be able to add a friend', () => {
        preferences_page_1.default.open("prefs/friends");
        preferences_page_1.default.addFriend("Athrousch");
    });
    it('Func_09: Should be able edit created comment', () => {
        submission_page_1.default.open("submit?selftext=true");
        let postedContent = submission_page_1.default.submitTextContent(generateRandom(), picsSubReddit, topic);
        comments_page_1.default.open(postedContent);
        comments_page_1.default.addComment(commentValue);
    });
});
