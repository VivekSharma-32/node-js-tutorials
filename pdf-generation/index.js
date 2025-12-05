const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const htmlContent = `
            <!DOCTYPE html>
                <html>
                        <head>
                            <title>PDF Document</title>
                            <meta charset="UTF-8">
                        </head>
                        <body>

                            <h1>Report Title</h1>

                            <p>
                                This is a basic paragraph used for PDF generation. 
                                You can add more text here as needed. 
                                This HTML contains only simple tags without any CSS.
                            </p>

                            <h2>Subheading</h2>

                            <p>
                                Another paragraph for testing PDF output.
                            </p>

                </body>
            </html>
  `;
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });
    await browser.close();
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.log("Error generating  pdf:" + error);
  }
});

app.get("/invoice", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const invoiceData = {
      invoiceNo: "1234",
      customer: "Vivek",
      product: "Express.js Course",
      price: "3000",
    };
    const htmlContent = await ejs.renderFile(
      path.join(__dirname, "views", "invoice.ejs"),
      invoiceData
    );

    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "60px", right: "20px", bottom: "40px", left: "20px" },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: `<div style="text-align: center; 
                            font-size: 30px;width:100%;
                            border-bottom: 1px solid #000;paddin-bottom:10px;">
                            My Company
                            </div>`,
      footerTemplate: `<div style="text-align: center; font-size: 10px;width:100%;">
                            Page <span class="pageNumber"></span> of <span class="totalPages"></span>
                          </div>`,
    });

    await browser.close();
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.log("Error generating  pdf:" + error);
  }
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
