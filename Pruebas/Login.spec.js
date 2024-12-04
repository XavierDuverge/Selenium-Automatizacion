const { Builder, Browser, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

// Verifica si la carpeta screenshots existe
if (!fs.existsSync(path.join(__dirname, 'screenshots'))) {
    fs.mkdirSync(path.join(__dirname, 'screenshots'));
}

// Función para tomar una captura de pantalla
async function takeScreenshot(driver, testName) {
    const screenshot = await driver.takeScreenshot();
    const filePath = path.join(__dirname, 'screenshots', `${testName}.png`);
    fs.writeFileSync(filePath, screenshot, 'base64');
    console.log(`Captura de pantalla tomada: ${filePath}`);
}

describe('login', function () {
    this.timeout(10000); // Aumenta el timeout a 10 segundos

    it('login With Standard_user credentials', async function () {
        let driver;

        try {
            driver = await new Builder().forBrowser('chrome').build();

             // Paso 1: Abre la URL especificada (Facebook)
            await driver.get('http://127.0.0.1:5500/index.html');
            await takeScreenshot(driver, '01_open_page'); // Captura después de abrir la página

            // Paso 2: Interactúa con los campos de usuario
            await driver.findElement(By.id('name')).sendKeys('Xavier Duverge');
            await takeScreenshot(driver, '02_enter_username'); // Captura después de introducir el usuario

            // Paso 3: Interactúa con el campo de contraseña
            await driver.findElement(By.id('provincia')).sendKeys('Distrito Nacional');
            await takeScreenshot(driver, '03_enter_password'); 

            await driver.findElement(By.id('ciudad')).sendKeys('Santo Domingo');
            await takeScreenshot(driver, '03_enter_password'); 


            await driver.findElement(By.id('sector')).sendKeys('San Carlos');
            await takeScreenshot(driver, '03_enter_password'); 

            await driver.findElement(By.id('calle')).sendKeys('Calle Altagracia');
            await takeScreenshot(driver, '03_enter_password'); 

            await driver.findElement(By.id('CarreraSelect')).sendKeys('Software');
            await takeScreenshot(driver, '03_enter_password'); 

            // Paso 4: Hacer clic en el botón de login
            await driver.findElement(By.id('Enviar')).click();
            await takeScreenshot(driver, '04_click_login');  
            // Paso final: Enviar el formulario
            await driver.wait(until.elementLocated(By.id('Enviar')), 5000);
            await driver.findElement(By.id('Enviar')).click();
            await takeScreenshot(driver, '04_click_submit');

            console.log('Prueba exitosa');
        } catch (error) {
            console.error('Error en la prueba:', error);
            if (driver) await takeScreenshot(driver, 'error_scenario');
        } finally {
            if (driver) await driver.quit();
        }
    });
});
