document.addEventListener('DOMContentLoaded', (event) => {
    try {
        const savedLoginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
        if (Object.keys(savedLoginData).length > 0)
            {
            console.log('Login data found in session storage', savedLoginData);
            document.getElementById('companyOutput').textContent = savedLoginData.company || 'N/A';
            document.getElementById('mailOutput').textContent = savedLoginData.email || 'N/A';
            document.getElementById('phoneOutput').textContent = savedLoginData.phone || 'N/A';
            document.getElementById('countryOutput').textContent = savedLoginData.country || 'N/A';
        } else {
            console.warn('No login data found in session storage');
        }
    } catch (error) {
        console.error('Error parsing form data from session storage', error);
    }
});
