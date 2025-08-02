// Exchange rates data (static version)
const exchangeRates = {
    USD: { buy: 1530, sell: 1540, name_ku: 'دۆلار', name_ar: 'دولار' },
    IQD: { buy: 139250, sell: 140000, name_ku: 'دینار', name_ar: 'دينار' },
    EUR: { buy: 113.25, sell: 115, name_ku: 'یۆرۆ', name_ar: 'يورو' },
    GBP: { buy: 130, sell: 131.5, name_ku: 'پاوەند', name_ar: 'جنيه' },
    TRY: { buy: 4150, sell: 3900, name_ku: 'تورکی', name_ar: 'ليرة تركية' },
    IRR: { buy: 9500000, sell: 8000000, name_ku: 'توومەن', name_ar: 'تومان' },
    NOK: { buy: 81, sell: 85, name_ku: 'نەرویجی', name_ar: 'كرونة نرويجية' },
    SEK: { buy: 88, sell: 91, name_ku: 'سویدی', name_ar: 'كرونة سويدية' },
    JOD: { buy: 71, sell: 68, name_ku: 'ئوردنی', name_ar: 'دينار اردني' },
    SAR: { buy: 385, sell: 378, name_ku: 'سعودی', name_ar: 'ريال سعودي' },
    AED: { buy: 372, sell: 365, name_ku: 'ئیماراتی', name_ar: 'درهم اماراتي' },
    CAD: { buy: 70.25, sell: 71.5, name_ku: 'کەنەدی', name_ar: 'دولار كندي' },
    AUD: { buy: 62, sell: 63.5, name_ku: 'ئوستراڵی', name_ar: 'دولار استرالي' },
    CHF: { buy: 121.25, sell: 122.75, name_ku: 'سویسری', name_ar: 'فرنك سويسري' },
    DKK: { buy: 131, sell: 136, name_ku: 'دانیمارکی', name_ar: 'كرونة دنماركية' },
    QAR: { buy: 385, sell: 370, name_ku: 'قەتەری', name_ar: 'ريال قطري' },
    KWD: { buy: 290, sell: 330, name_ku: 'کوەیتی', name_ar: 'دينار كويتي' }
};

// Display current date
function displayCurrentDate() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    };
    
    const kurdishDate = now.toLocaleDateString('ku', options);
    const englishDate = now.toLocaleDateString('en-US', options);
    const time = now.toLocaleTimeString('en-US', {hour12: false});
    
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.innerHTML = `
            <div>${kurdishDate}</div>
            <div style="font-size: 0.9rem; opacity: 0.8;">${englishDate} - ${time}</div>
        `;
    }
}

// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Simulate rate updates (for demo purposes)
function simulateRateUpdate() {
    Object.keys(exchangeRates).forEach(currency => {
        const rate = exchangeRates[currency];
        
        // Add small random variation (±2%)
        const buyVariation = (Math.random() - 0.5) * 0.04;
        const sellVariation = (Math.random() - 0.5) * 0.04;
        
        const newBuyRate = rate.buy * (1 + buyVariation);
        const newSellRate = rate.sell * (1 + sellVariation);
        
        // Update the display
        const row = document.querySelector(`[data-currency="${currency}"]`);
        if (row) {
            const buyElement = row.querySelector('.buy-rate');
            const sellElement = row.querySelector('.sell-rate');
            
            if (buyElement) {
                buyElement.textContent = formatNumber(newBuyRate.toFixed(2));
                // Add animation effect
                buyElement.style.background = 'rgba(46, 204, 113, 0.3)';
                setTimeout(() => {
                    buyElement.style.background = 'rgba(46, 204, 113, 0.1)';
                }, 1000);
            }
            
            if (sellElement) {
                sellElement.textContent = formatNumber(newSellRate.toFixed(2));
                // Add animation effect
                sellElement.style.background = 'rgba(231, 76, 60, 0.3)';
                setTimeout(() => {
                    sellElement.style.background = 'rgba(231, 76, 60, 0.1)';
                }, 1000);
            }
        }
        
        // Update the stored rates
        exchangeRates[currency].buy = newBuyRate;
        exchangeRates[currency].sell = newSellRate;
    });
    
    console.log('نرخەکان نوێ کرانەوە لە:', new Date().toLocaleTimeString());
}

// Add animation to currency rows
function addRowAnimations() {
    const rows = document.querySelectorAll('.currency-row');
    
    rows.forEach((row, index) => {
        row.style.opacity = '0';
        row.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            row.style.transition = 'all 0.5s ease';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add click functionality to currency rows
function addRowClickHandlers() {
    const rows = document.querySelectorAll('.currency-row');
    
    rows.forEach(row => {
        row.addEventListener('click', function() {
            const currency = this.dataset.currency;
            const currencyName = this.querySelector('.currency-name').textContent;
            const buyRate = this.querySelector('.buy-rate').textContent;
            const sellRate = this.querySelector('.sell-rate').textContent;
            
            // Create a simple modal with currency details
            showCurrencyModal(currency, currencyName, buyRate, sellRate);
        });
        
        // Add hover effect
        row.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 5px 20px rgba(52, 152, 219, 0.3)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
}

// Show currency details modal
function showCurrencyModal(currency, name, buyRate, sellRate) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        direction: rtl;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
        ">
            <h3 style="margin-bottom: 20px; color: #2c3e50;">${name}</h3>
            <div style="margin-bottom: 15px;">
                <strong>نرخی کڕین:</strong> ${buyRate}
            </div>
            <div style="margin-bottom: 20px;">
                <strong>نرخی فرۆشتن:</strong> ${sellRate}
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
            ">داخستن</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add search functionality
function addSearchFunctionality() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'گەڕان بۆ دراو...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 400px;
        padding: 15px;
        margin: 20px auto;
        display: block;
        border: 2px solid #ddd;
        border-radius: 25px;
        font-size: 1rem;
        text-align: center;
        direction: rtl;
        font-family: 'Noto Sans Arabic', Arial, sans-serif;
    `;
    
    const header = document.querySelector('header');
    header.appendChild(searchInput);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.currency-row');
        
        rows.forEach(row => {
            const currencyName = row.querySelector('.currency-name').textContent.toLowerCase();
            const currency = row.dataset.currency.toLowerCase();
            
            if (currencyName.includes(searchTerm) || currency.includes(searchTerm)) {
                row.style.display = 'grid';
                row.style.opacity = '1';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Auto-refresh rates every 30 seconds (simulated)
function startAutoRefresh() {
    setInterval(() => {
        simulateRateUpdate();
    }, 30000); // 30 seconds
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    addRowAnimations();
    addRowClickHandlers();
    startAutoRefresh();
    
    // Add search functionality after a short delay
    setTimeout(addSearchFunctionality, 1000);
    
    // Update date every minute
    setInterval(displayCurrentDate, 60000);
    
    console.log('ماڵپەڕی نرخی ئاڵوگۆڕ ئامادەیە!');
});
