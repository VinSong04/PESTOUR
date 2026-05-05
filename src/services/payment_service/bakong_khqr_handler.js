// Bakong KHQR EMVCo String Generator (Client-Side)
// Generates a compliant EMVCo QR code string for Bakong payments.
//
// IMPORTANT NOTES:
// - In production, KHQR strings should be generated on the Backend using the official `bakong-khqr` package.
// - This client-side generator is for demonstration/prototype purposes.
// - For real payment verification, integrate with the NBC Bakong Open API on your backend.

/**
 * KHQR Configuration
 * Replace these with your actual Bakong account details.
 */
const BAKONG_ACCOUNT_ID = import.meta.env.VITE_BAKONG_ACCOUNT_ID || "your_account@wing";
const MERCHANT_NAME = import.meta.env.VITE_BAKONG_MERCHANT_NAME || "PES TOUR";
const MERCHANT_CITY = import.meta.env.VITE_BAKONG_MERCHANT_CITY || "Phnom Penh";

// Currency codes
export const KHQR_CURRENCY = {
    USD: '840',
    KHR: '116',
};

/**
 * Computes CRC16-CCITT checksum for EMVCo QR validation.
 * @param {string} str - The QR data string (without CRC value)
 * @returns {string} 4-character hex CRC
 */
function computeCRC16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc <<= 1;
            }
            crc &= 0xFFFF;
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Creates a TLV (Tag-Length-Value) field for EMVCo format.
 * @param {string} tag - 2-digit tag ID
 * @param {string} value - Field value
 * @returns {string} Formatted TLV string
 */
function tlv(tag, value) {
    const length = value.length.toString().padStart(2, '0');
    return `${tag}${length}${value}`;
}

/**
 * Generates a KHQR-compliant EMVCo QR string for Bakong payments.
 *
 * @param {Object} options
 * @param {number} options.amount - Payment amount
 * @param {string} [options.currency='USD'] - Currency code ('USD' or 'KHR')
 * @param {string} [options.accountId] - Bakong account ID (overrides env default)
 * @param {string} [options.merchantName] - Merchant display name
 * @param {string} [options.merchantCity] - Merchant city
 * @param {string} [options.transactionRef] - Optional transaction reference / bill number
 * @param {string} [options.storeLabel] - Optional store label
 * @param {string} [options.terminalLabel] - Optional terminal label
 * @param {string} [options.purposeOfTransaction] - Optional purpose description
 * @returns {string} EMVCo-compliant KHQR string
 */
export function generateKHQRString({
    amount,
    currency = 'USD',
    accountId = BAKONG_ACCOUNT_ID,
    merchantName = MERCHANT_NAME,
    merchantCity = MERCHANT_CITY,
    transactionRef = '',
    storeLabel = '',
    terminalLabel = '',
    purposeOfTransaction = '',
}) {
    const currencyCode = KHQR_CURRENCY[currency] || KHQR_CURRENCY.USD;

    // Format amount to 2 decimal places
    const formattedAmount = parseFloat(amount).toFixed(2);

    // --- Build EMVCo QR Data ---

    // [00] Payload Format Indicator
    let qrData = tlv('00', '01');

    // [01] Point of Initiation Method (12 = Dynamic QR, unique per transaction)
    qrData += tlv('01', '12');

    // [29] Merchant Account Information (KHQR uses tag 29)
    // Sub-tags within 29:
    //   [00] Globally Unique Identifier for Bakong
    //   [01] Bakong Account ID / Mobile Number
    //   [02] Merchant ID (optional, can be same as account)
    const merchantAccountSub =
        tlv('00', 'bakongkh') +
        tlv('01', accountId);

    qrData += tlv('29', merchantAccountSub);

    // [52] Merchant Category Code (0000 = Not specified)
    qrData += tlv('52', '5999');

    // [53] Transaction Currency (840 = USD, 116 = KHR)
    qrData += tlv('53', currencyCode);

    // [54] Transaction Amount
    qrData += tlv('54', formattedAmount);

    // [58] Country Code
    qrData += tlv('58', 'KH');

    // [59] Merchant Name
    qrData += tlv('59', merchantName.substring(0, 25));

    // [60] Merchant City
    qrData += tlv('60', merchantCity.substring(0, 15));

    // [62] Additional Data Field Template (optional)
    let additionalData = '';
    if (transactionRef) {
        additionalData += tlv('01', transactionRef.substring(0, 25)); // Bill Number
    }
    if (storeLabel) {
        additionalData += tlv('03', storeLabel.substring(0, 25));
    }
    if (terminalLabel) {
        additionalData += tlv('07', terminalLabel.substring(0, 25));
    }
    if (purposeOfTransaction) {
        additionalData += tlv('08', purposeOfTransaction.substring(0, 25));
    }
    if (additionalData) {
        qrData += tlv('62', additionalData);
    }

    // [63] CRC (checksum) — Append tag + length placeholder, then compute
    const crcPlaceholder = qrData + '6304';
    const crc = computeCRC16(crcPlaceholder);
    qrData += `6304${crc}`;

    return qrData;
}

/**
 * Generates a KHQR payment data object for the tournament registration.
 *
 * @param {Object} playerDetails - Player registration details
 * @param {string} playerDetails.name - Player name
 * @param {string} tran_id - Transaction ID
 * @param {number} [amount=2.00] - Payment amount
 * @returns {{ khqrString: string, amount: string, currency: string, transactionRef: string }}
 */
export function generateTournamentPayment(playerDetails, tran_id, amount = 2.00) {
    const khqrString = generateKHQRString({
        amount,
        currency: 'USD',
        transactionRef: tran_id,
        storeLabel: 'PES TOUR',
        terminalLabel: 'WEB-01',
        purposeOfTransaction: `Reg: ${playerDetails.name}`.substring(0, 25),
    });

    return {
        khqrString,
        amount: parseFloat(amount).toFixed(2),
        currency: 'USD',
        transactionRef: tran_id,
    };
}
