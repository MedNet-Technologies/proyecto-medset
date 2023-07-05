var webdriver = require('selenium-webdriver');
const { Builder } = require('selenium-webdriver');
var { By } = require("selenium-webdriver");
const edge = require('selenium-webdriver/edge');

const options = new edge.Options();
options.addArguments('headless');

async function run() {
    var browser = new webdriver.Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
    try {
        await browser.get('http://localhost:3000');
        await browser.findElement(By.id("btn_medicos")).click();
        await browser.findElement(By.id("btn_crearmedicos")).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Crear médico
        await browser.findElement(By.id('first_name')).sendKeys('John');
        await browser.executeScript('window.scrollBy(0, 500)');
        await browser.findElement(By.id('last_name')).sendKeys('Doe');
        await browser.findElement(By.id('specialization')).sendKeys('Cardiology');
        await browser.findElement(By.id('geographic_location')).sendKeys('New York');
        await browser.findElement(By.id('credentials')).sendKeys('Credentials');
        await browser.findElement(By.id("btn_enviar")).click();
        await new Promise(resolve => setTimeout(resolve, 5000));

        //Editar médico
        await browser.findElement(By.xpath('//button[@class="swal2-confirm swal2-styled"]')).click();      
        await new Promise(resolve => setTimeout(resolve, 5000));
        let elements = await browser.findElements(By.id("btn_editar"));
        await elements[elements.length - 1].click();
        await browser.findElement(By.id('geographic_location')).sendKeys('Pitsburgh');
        await browser.findElement(By.id("btn_enviar_2")).click();
        await new Promise(resolve => setTimeout(resolve, 5000));

        //Eliminar médico
        await browser.findElement(By.xpath('//button[@class="swal2-confirm swal2-styled"]')).click();      
        let tds = await browser.findElements(By.css("td"));
        await tds[tds.length - 1].findElement(By.css("button[type='button']")).click();
        
        // Buscar lista citas
        await browser.findElement(By.css("button[href='/lista_medicos_citas']")).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        elements = await browser.findElements(By.css("button[href*='/nueva_cita/']"));
        await elements[elements.length - 1].click();

        //Crear cita
        await browser.findElement(By.id('start')).sendKeys('12022023');
        await browser.findElement(By.id('appt')).sendKeys('0432PM');
        await browser.findElement(By.id('rut')).sendKeys('18934212-0');
        await browser.findElement(By.css("button[type='submit']")).click();
        await new Promise(resolve => setTimeout(resolve, 5000));
        await browser.findElement(By.xpath('//button[@class="swal2-confirm swal2-styled"]')).click(); 
        await new Promise(resolve => setTimeout(resolve, 3000));

    } catch (error) {
        console.log(error);
        process.exit(1);
        
} finally {
        await browser.quit();
    }
}

run();

