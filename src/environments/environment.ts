const production = false;

const environment = {
    production: production,
    apiUrl: production ? 'https://mt-backend-pn1v.onrender.com/' : 'http://localhost:5080/'
};

export { environment };