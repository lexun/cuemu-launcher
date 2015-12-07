import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import electronPath from 'electron-prebuilt';
import homeStyles from '../app/components/Home.module.css';
import counterStyles from '../app/components/Counter.module.css';

describe('main window', function spec() {
  before((done) => {
    this.timeout(5000);
    this.driver = new webdriver.Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        chromeOptions: {
          binary: electronPath,
          args: [ 'app=.' ]
        }
      })
      .forBrowser('electron')
      .build();
    done();
  });

  after(async () => {
    this.timeout(10000);
    await this.driver.quit();
  });

  it('should open window', async () => {
    expect(true).to.be.true
  });
});
