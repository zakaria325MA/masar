// Configuration pour GitHub Pages (Easy Mode)
// Si on est sur GitHub Pages, on utilise le LocalStorage par défaut
// Sinon, on cherche l'API URL

const isGitHubPages = window.location.hostname.includes('github.io');

const API_URL = isGitHubPages ? null : (import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

export default API_URL;
export { isGitHubPages };
