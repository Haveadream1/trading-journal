// Fetch the data from the *Financial Modeling Prep API*
// Only need one call and we can they use the data
// The current goal is to fetch a list of recent news for our dataList

import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [articles, setArticles] = useState([]); // Avoid NULL as default when fetching data

    // Example data retrieved from the API docs
    const result = [
        {
            "title": "Arcus Biosciences, Inc. (NYSE:RCUS) Faces Setback but Remains Focused on Future Developments",
            "date": "2025-12-12 19:07:04",
            "content": "<ul>\n<li>Truist Financial sets a price target of <strong>$30</strong> for <a href=\"https://site.financialmodelingprep.com/financial-summary/RCUS\">NYSE:RCUS</a>, indicating a potential upside of <strong>34.74%</strong>.</li>\n<li>The discontinuation of the Phase 3 STAR-221 study with Gilead Sciences, Inc. (NASDAQ:GILD) impacts investor sentiment and stock performance.</li>\n<li>Arcus Biosciences shifts focus to Casdatifan and its emerging inflammation and immunology portfolio following the study's halt.</li>\n</ul>\n\n<p>Arcus Biosciences, Inc. (<a href=\"https://site.financialmodelingprep.com/financial-summary/RCUS\">NYSE:RCUS</a>) is a biopharmaceutical company dedicated to developing innovative cancer therapies. Recently, Truist Financial set a price target of <strong>$30</strong> for RCUS, suggesting a potential upside of <strong>34.74%</strong> from its current trading price of <strong>$22.27</strong>. However, recent developments have impacted the stock's performance.</p>\n\n<p>Arcus announced the discontinuation of its Phase 3 STAR-221 study, conducted with Gilead Sciences, Inc. (<a href=\"https://site.financialmodelingprep.com/financial-summary/GILD\">NASDAQ:GILD</a>). The Independent Data Monitoring Committee recommended halting the study after an interim analysis showed no improvement in overall survival with the domvanalimab-based combination compared to nivolumab plus chemotherapy. Despite similar safety profiles, this decision has affected investor sentiment.</p>\n\n<p>Following the announcement, RCUS stock experienced a significant decline, reversing an eight-month winning streak with gains of nearly <strong>300%</strong>. The stock dropped to <strong>$21.77</strong>, a decrease of <strong>13.42%</strong>, or <strong>$3.38</strong>, from its previous value. During the trading day, it fluctuated between <strong>$20.35</strong> and <strong>$24</strong>, reflecting market volatility.</p>\n\n<p>Arcus is now shifting its focus to its research and development investment in Casdatifan and its emerging inflammation and immunology portfolio. The company's market capitalization stands at approximately <strong>$2.35 billion</strong>, with a trading volume of <strong>5,619,062</strong> shares today. Despite recent setbacks, Arcus remains committed to advancing its pipeline and exploring new opportunities.</p>",
            "tickers": "NYSE:RCUS",
            "image": "https://portal.financialmodelingprep.com/positions/693c73c381122a84751105b0.png",
            "link": "https://financialmodelingprep.com/market-news/arcus-biosciences-setback-future-focus-casdatifan",
            "author": "Alex Lavoie",
            "site": "Financial Modeling Prep"
        },
        {
            "title": "Suncor Energy Inc. (NYSE:SU) Maintains \"Buy\" Rating and Price Target Increase by TD Securities",
            "date": "2025-12-12 19:02:32",
            "content": "<ul>\n<li>TD Securities reaffirms its \"Buy\" rating for <a href=\"https://site.financialmodelingprep.com/financial-summary/SU\">Suncor Energy Inc. (NYSE:SU)</a> and raises the price target to C$73 from C$71.</li>\n<li>Suncor announces 2026 corporate guidance with a focus on growth, superior returns, and a capital expenditure of 5.7 billion Canadian dollars.</li>\n<li>The company plans to increase its monthly share buybacks by 10%, aiming to return 3.3 billion Canadian dollars to shareholders in 2026.</li>\n</ul>\n\n<p>On December 12, 2025, TD Securities maintained its \"Buy\" rating for <a href=\"https://site.financialmodelingprep.com/financial-summary/SU\">Suncor Energy Inc. (NYSE:SU)</a>, a leading Canadian integrated energy company. At the time, the stock was trading at <strong>$44.30</strong>. TD Securities also raised Suncor's price target to <strong>C$73</strong> from <strong>C$71</strong>, reflecting confidence in the company's future performance.</p>\n\n<p>Suncor has unveiled its 2026 corporate guidance, focusing on growth and superior returns. The company plans to increase upstream production and maintain strong refining utilization. This aligns with TD Securities' positive outlook, as Suncor's strategic initiatives aim to enhance shareholder returns through disciplined investments.</p>\n\n<p>Suncor is committed to a capital expenditure of <strong>5.7 billion Canadian dollars</strong> in 2026, focusing on sustaining capital and select high-value projects. This investment strategy supports the raised price target by TD Securities, as it indicates a focus on long-term growth and value creation. The company also plans to increase its monthly share buybacks by <strong>10%</strong>, aiming to return <strong>3.3 billion Canadian dollars</strong> to shareholders in 2026.</p>\n\n<p>The stock for SU is currently priced at <strong>$44.22</strong>, reflecting a slight decrease of <strong>0.21%</strong> or <strong>$0.095</strong>. Despite this minor fluctuation, Suncor's market capitalization stands at approximately <strong>$53.1 billion</strong>, indicating strong investor confidence. The company's focus on increasing oil and gas production while reducing spending further supports the \"Buy\" rating from TD Securities.</p>\n\n<p>Suncor's 2026 guidance builds on two years of record-breaking performance, positioning the company for another robust year. The company's strategic focus on best-in-class execution and operational excellence, as highlighted by CEO Rich Kruger, aligns with TD Securities' positive outlook and the increased price target.</p>",
            "tickers": "NYSE:SU",
            "image": "https://portal.financialmodelingprep.com/positions/693c720581122a847510f725.jpeg",
            "link": "https://financialmodelingprep.com/market-news/suncor-energy-inc-nyse-su-buy-rating-price-target-increase-td-securities",
            "author": "Rayan Ahmad",
            "site": "Financial Modeling Prep"
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                // ! Do not push API key to github
                // const response = await fetch("");
                // if (!response.ok) {
                //     throw new Error("Failed to fetch data", error);
                // }

                // const result = await response.json();
                // setArticles(result); // Pass the fetched data in the state

                // ? To avoid wasting api calls
                setArticles(result);
            } catch (error) {
                throw new Error("An error was catched while fetching data", error);
            }
        }
        fetchData();
    }, [])
    
    return (
        <DataContext.Provider value={articles}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used inside a DataProvider");
    }
    return context;
}
