class PreferencesPage {
    public open(path: string = "prefs"): void {
        browser.url(`/${path}`);
    }

    public addFriend(friendName: string): void {
        this.nameField.setValue(friendName);
        browser.submitForm("#friend");
        browser.waitForVisible(".status");
        browser.waitForVisible(".friend-table");
    }

    private get nameField() { return browser.element("#name") }
}

const preferencesPage = new PreferencesPage();
export default preferencesPage;