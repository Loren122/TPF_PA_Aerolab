const API_URL = 'https://coding-challenge-api.aerolab.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM2MDQ0NGMxMGUzZDAwMjBkMzBmMzUiLCJpYXQiOjE3MzE1OTMyODR9.xPshnU5a2-vBjoUEBnIfXDNJie5RbMxzxsoOkdwkGZI';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
};

export const fetchUserData = async () => {
    const response = await fetch(`${API_URL}/user/me`, { headers });
    return response.json();
};

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error("Error fetching products:", response.status);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};

export const fetchUserHistory = async () => {
    try {
        const response = await fetch(`${API_URL}/user/history`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error("Error fetching history:", response.status);
            return [];
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
};

export const redeemProduct = async (productId) => {
    try {
        const response = await fetch(`${API_URL}/redeem`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update user history: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
         console.error("Error al redimir el producto:", error);
        throw new Error("Hubo un problema al procesar tu redención. Inténtalo de nuevo más tarde.");
    }
};