import { Builder, By, Key, until } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/firefox';
import path from 'path';

// Set the path to the GeckoDriver executable
const geckoDriverPath = path.join(__dirname, '..', 'node_modules', 'geckodriver', 'geckodriver.exe');

let options = new Options().setBinary(geckoDriverPath);

async function runSeleniumTest() {
  // Create a new WebDriver instance
  const driver = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

  try {
    // Navigate to the React app
    await driver.get('http://localhost:3000/formulario_medicos');

    // Fill in the form fields
    await driver.findElement(By.id('first_name')).sendKeys('John');
    await driver.findElement(By.id('last_name')).sendKeys('Doe');
    await driver.findElement(By.id('specialization')).sendKeys('Cardiology');
    await driver.findElement(By.id('geographic_location')).sendKeys('New York');
    await driver.findElement(By.id('credentials')).sendKeys('MD', Key.RETURN);

    // Wait for success alert to appear
    await driver.wait(until.elementLocated(By.className('swal2-icon-success')), 5000);

    // Print success message
    console.log('Form submitted successfully.');

  } catch (error) {
    console.error('An error occurred:', error);

  } finally {
    // Quit the browser
    await driver.quit();
  }
}

runSeleniumTest();

