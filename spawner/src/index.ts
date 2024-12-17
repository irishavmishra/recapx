import { Builder, Browser, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

async function main() {
    // Set up Chrome options
    const options = new Options({})

    // Bypass Selenium detection by disabling "AutomationControlled" feature
    // This prevents websites from detecting that the browser is automated
    options.addArguments("--disable-blink-features=AutomationControlled")

    // Allow the use of fake UI for camera and microphone permissions
    // This is useful for applications requiring media access, like Google Meet
    options.addArguments("--use-fake-ui-for-media-stream")

    // Initialize Chrome WebDriver with the specified options
    const driver = await new Builder().forBrowser(Browser.CHROME).setChromeOptions(options).build();


    try {
        // Open the Google Meet link
        await driver.get("https://meet.google.com/shr-fbmv-ysg");


        // Locate the name input box by its element ID
        // 'until.elementLocated' ensures the element is loaded before proceeding
        // const inputBox = await driver.wait(until.elementLocated(By.css('input.qdOxv-fmcmS-wGMbrd')), 5000);
        const inputBox = await driver.wait(until.elementLocated(By.xpath("//input[@placeholder='Your name']")), 5000);

        // Enter the name into the input box
        await inputBox.sendKeys("Rishav Mishra");

        // Locate the "Ask to join" button using its XPath
        // Searches for a button containing a span with the specified text
        const joinBtn = await driver.wait(until.elementLocated(By.xpath("//button[.//span[text()='Ask to join']]")), 5000);

        // Click the "Ask to join" button to join the meeting
        await joinBtn.click()


    } finally {
        // await driver.quit();
    }
};



// Execute the main function
main()

