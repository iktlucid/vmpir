const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL; // Use environment variable for security
    const data = JSON.parse(event.body);

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Webhook sent successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to send webhook', error: error.message }),
        };
    }
};
