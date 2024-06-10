document.addEventListener('DOMContentLoaded', (event) => {
    try {
        const savedSavingsData = JSON.parse(sessionStorage.getItem('savingsData') || '{}');
        if (Object.keys(savedSavingsData).length > 0) {
            console.log('Savings data found in session storage', savedSavingsData);
            
            const usdOutput = savedSavingsData.USD || 'N/A';
            document.getElementById('usdOutput').textContent = usdOutput;
            console.log('USD Output:', usdOutput);

            const litersOutput = savedSavingsData.Liters || 'N/A';
            document.getElementById('litersOutput').textContent = litersOutput;
            console.log('Liters Output:', litersOutput);

            const co2Output = savedSavingsData.CO2_Tons || 'N/A';
            document.getElementById('co2Output').textContent = co2Output;
            console.log('CO2 Tons Output:', co2Output);
        } else {
            console.warn('No savings data found in session storage');
        }
    } catch (error) {
        console.error('Error parsing savings data from session storage', error);
    }
});
