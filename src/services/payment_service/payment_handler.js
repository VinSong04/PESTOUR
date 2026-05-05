// ABA PayWay API Integration Service
// IMPORTANT: For a production app, the ABA API Key should be securely stored on a backend server.
// Since this is a frontend-only React app, we are using Vite environment variables (which are bundled with the app).
// Ensure VITE_PAYWAY_API_KEY and VITE_PAYWAY_MERCHANT_ID are added to your .env file.

const API_KEY = import.meta.env.VITE_PAYWAY_API_KEY || "";
const MERCHANT_ID = import.meta.env.VITE_PAYWAY_MERCHANT_ID || "";
const API_URL = "https://checkout.payway.com.kh/api/payment-gateway/v1/payments/purchase";

/**
 * Initiates an ABA PayWay checkout flow.
 * Note: ABA PayWay requires the request to be submitted as a hidden POST form.
 * 
 * @param {Object} playerDetails - Player registration details
 * @param {string} tran_id - Unique transaction ID for this registration
 */
export async function processPaywayPayment(playerDetails, tran_id) {
    if (!API_KEY || !MERCHANT_ID) {
        console.warn("Payway credentials explicitly missing in .env file. Redirection will fallback or fail authentication.");
        // We still proceed to create the form, but PayWay will likely reject it for invalid merchant/hash.
    }

    const { name } = playerDetails;

    const req_time = new Date().toISOString().replace(/[-:TZ.]/g, '').substring(0, 14); // Format: YYYYMMDDHHmmss
    const amount = "2.00";

    // Construct return URL. This is where ABA PayWay redirects the user after payment is successful or failed.
    // We append the URL parameters so our React app can catch them on reload.
    const baseUrl = window.location.origin + window.location.pathname;
    const return_url = `${baseUrl}?tran_id=${tran_id}&payment_status=success#register`;

    // Data String required by PayWay to generate the Hash (HMAC-SHA512)
    // Typical ABA PayWay Hash String order: req_time + merchant_id + tran_id + amount + ...
    // Note: If you have additional fields (like return_url or items), they must be added to this string in the exact order specified by your ABA PayWay Integration Guide.
    const stringToHash = `${req_time}${MERCHANT_ID}${tran_id}${amount}`;

    const hash = await generatePaywayHash(stringToHash, API_KEY);

    // Create a hidden form to POST to the ABA PayWay API
    const form = document.createElement("form");
    form.method = "POST";
    form.action = API_URL;

    // Minimum required form data for ABA PayWay Pay API
    const formData = {
        req_time,
        merchant_id: MERCHANT_ID,
        tran_id,
        amount,
        hash,
        firstname: name,
        payment_option: "abapay", // Optional: direct to ABA Pay if preferred
        return_url,            // The URL to redirect to after successful transaction
        continue_success_url: return_url, // Some versions use this parameter instead
    };

    // Append hidden inputs to the form
    Object.keys(formData).forEach(key => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = formData[key] || '';
        form.appendChild(input);
    });

    document.body.appendChild(form);

    // Submit the form which will redirect the user to the ABA PayWay Gateway
    form.submit();
}

/**
 * Generates an HMAC-SHA512 Hash natively using the Web Crypto API.
 * This avoids the need for external dependencies like crypto-js.
 */
async function generatePaywayHash(dataStr, keyStr) {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(keyStr);
    const data = encoder.encode(dataStr);

    // Import the secret key for HMAC SHA-512
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-512' },
        false,
        ['sign']
    );

    // Generate the signature
    const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, data);

    // Convert ArrayBuffer signature to Base64 String
    const hashArray = Array.from(new Uint8Array(signature));
    const hashBase64 = btoa(String.fromCharCode(...hashArray));

    return hashBase64;
}

/**
 * Helper utility to parse URL search parameters
 */
export function getPaymentParams() {
    // Check standard query string
    const searchParams = new URLSearchParams(window.location.search);

    // Also check hash string if params appended after hash (e.g. #register?tran_id=...)
    let hashParams = new URLSearchParams();
    if (window.location.hash.includes('?')) {
        hashParams = new URLSearchParams(window.location.hash.split('?')[1]);
    }

    return {
        tran_id: searchParams.get('tran_id') || hashParams.get('tran_id'),
        status: searchParams.get('payment_status') || hashParams.get('payment_status'),
    };
}
