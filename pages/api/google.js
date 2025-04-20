import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Only GET requests allowed' });
    }

    const url = 'https://www.google.com/shopping/product/11685493598677870695?gl=us';

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // Set a realistic user-agent
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
            '(KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36'
        );

        // Go to the product page
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

        // Wait for a key selector to ensure the page loaded
        await page.waitForSelector('body');

        // Get full page HTML
        const content = await page.content();

        await browser.close();

        // Return the content directly to the client
        return res.status(200).json({
            message: 'Page scraped successfully!',
            content, // send full HTML content
        });
    } catch (error) {
        console.error('❌ Scraping failed:', error);
        return res.status(500).json({ error: 'Failed to scrape page', details: error.message });
    }
}
