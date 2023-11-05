async function getAccessToken() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const result = await fetch('https://ngw.devices.sberbank.ru:9443/api/v2/oauth', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.GIGACHAT_API}`,
            'RqUID': '6f0b1291-c7f3-43c6-bb2e-9f3efb2dc98e',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            scope: 'GIGACHAT_API_PERS',
        }),
    });

    const jsonAnswer = await result.json();
    return jsonAnswer.access_token;
}

module.exports = {
    getAccessToken,
};
