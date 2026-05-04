// Unit testing API article route

const request = require('supertest');
const { describe } = require("jest-circus");
const app = require('../app');

// mock fetching
global.fetch = jest.fn();

const demoArticles = {
        "title": "Arcus Biosciences, Inc. (NYSE:RCUS) Faces Setback but Remains Focused on Future Developments",
        "date": "2025-12-12 19:07:04",
        "content": "<ul>\n<li>Truist Financial sets a price target of <strong>$30</strong> for <a href=\"https://site.financialmodelingprep.com/financial-summary/RCUS\">NYSE:RCUS</a>, indicating a potential upside of <strong>34.74%</strong>.</li>\n<li>The discontinuation of the Phase 3 STAR-221 study with Gilead Sciences, Inc. (NASDAQ:GILD) impacts investor sentiment and stock performance.</li>\n<li>Arcus Biosciences shifts focus to Casdatifan and its emerging inflammation and immunology portfolio following the study's halt.</li>\n</ul>\n\n<p>Arcus Biosciences, Inc. (<a href=\"https://site.financialmodelingprep.com/financial-summary/RCUS\">NYSE:RCUS</a>) is a biopharmaceutical company dedicated to developing innovative cancer therapies. Recently, Truist Financial set a price target of <strong>$30</strong> for RCUS, suggesting a potential upside of <strong>34.74%</strong> from its current trading price of <strong>$22.27</strong>. However, recent developments have impacted the stock's performance.</p>\n\n<p>Arcus announced the discontinuation of its Phase 3 STAR-221 study, conducted with Gilead Sciences, Inc. (<a href=\"https://site.financialmodelingprep.com/financial-summary/GILD\">NASDAQ:GILD</a>). The Independent Data Monitoring Committee recommended halting the study after an interim analysis showed no improvement in overall survival with the domvanalimab-based combination compared to nivolumab plus chemotherapy. Despite similar safety profiles, this decision has affected investor sentiment.</p>\n\n<p>Following the announcement, RCUS stock experienced a significant decline, reversing an eight-month winning streak with gains of nearly <strong>300%</strong>. The stock dropped to <strong>$21.77</strong>, a decrease of <strong>13.42%</strong>, or <strong>$3.38</strong>, from its previous value. During the trading day, it fluctuated between <strong>$20.35</strong> and <strong>$24</strong>, reflecting market volatility.</p>\n\n<p>Arcus is now shifting its focus to its research and development investment in Casdatifan and its emerging inflammation and immunology portfolio. The company's market capitalization stands at approximately <strong>$2.35 billion</strong>, with a trading volume of <strong>5,619,062</strong> shares today. Despite recent setbacks, Arcus remains committed to advancing its pipeline and exploring new opportunities.</p>",
        "tickers": "NYSE:RCUS",
        "image": "https://portal.financialmodelingprep.com/positions/693c73c381122a84751105b0.png",
        "link": "https://financialmodelingprep.com/market-news/arcus-biosciences-setback-future-focus-casdatifan",
        "author": "Alex Lavoie",
        "site": "Financial Modeling Prep"
    }

describe('GET /api/articles', () => {
    it('return correctly articles', async () => {
        const mockArticles = [ demoArticles ]; // array with objects, like the api response

        fetch.mockResolvedValueOnce({
            // mock the response the fetch returns
            json: async () => mockArticles
        })
        
        const response = await request(app).get('/api/articles');
   
        expect(response.status).toBe(200); // 200 -> OK HTTP status code
    })
})
