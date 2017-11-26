"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PreferencesPage {
    open(path = "/prefs") {
        browser.url(path);
        browser.element('.choice').waitForExist();
    }
    addFriend(friendName) {
        this.nameField.setValue(friendName);
        browser.submitForm("#friend");
        browser.waitForVisible(".status");
        browser.waitForVisible(".friend-table");
    }
    viewPreferences() {
        this.preferencesLink.click();
    }
    changeLanguage(option = "et") {
        let drowpdown = this.languageoptions;
        drowpdown.selectByValue(option);
        this.submitBtn.click();
        browser.element('.choice').waitForExist();
    }
    deactivateAccount(username, password) {
        this.open('/prefs/deactivate/');
        browser.waitForVisible('#pref-deactivate');
        let confirm = browser.element('#confirm-deactivate');
        let userInput = browser.element('#deactivate-user');
        userInput.setValue(username);
        let passwordInput = browser.element('#deactivate-password');
        passwordInput.setValue(password);
        if (!confirm.isSelected()) {
            confirm.click();
        }
        this.submitBtn.click();
    }
    logout() {
        this.logout();
        browser.waitForExist('.login-page');
    }
    get logoutForm() { return browser.element('.logout'); }
    get submitBtn() { return browser.element('[type="submit"]'); }
    get languageoptions() { return browser.element('#lang'); }
    get preferencesLink() { return browser.element('a.pref-lang.choice'); }
    get nameField() { return browser.element("#name"); }
}
const preferencesPage = new PreferencesPage();
exports.default = preferencesPage;
