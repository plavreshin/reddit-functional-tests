import { Certificate } from "crypto";
import { ECONNABORTED } from "constants";

class PreferencesPage {
    public open(path: string = "/prefs"): void {
        browser.url(path);
        browser.element('.choice').waitForExist();
    }


    public viewPreferences() {
        this.preferencesLink.click();
    }
    public changeLanguage(option: string = "et") {
        let drowpdown = this.languageoptions;
        drowpdown.selectByValue(option);
        this.submitBtn.click();
        browser.element('.choice').waitForExist();
    }

    public deactivateAccount(username: string, password: string) {
        this.open('/prefs/deactivate/')
        browser.waitForVisible('#pref-deactivate');
        let confirm = browser.element('#confirm-deactivate');
        let userInput = browser.element('#deactivate-user');
        userInput.setValue(username);
        let passwordInput = browser.element('#deactivate-password');
        passwordInput.setValue(password);
        if(!confirm.isSelected()) 
            confirm.click();
        
        this.submitBtn.click();    
    }

    public logout(){
        this.logout();
        browser.waitForExist('.login-page');
    }
    private get logoutForm() {return browser.element('.logout')}
    private get submitBtn() { return browser.element('[type="submit"]') }
    private get languageoptions() { return browser.element('#lang') }
    private get preferencesLink() { return browser.element('a.pref-lang.choice') }

}


const referencesPage = new PreferencesPage();
export default referencesPage;