const sendMessage = async (messages, token) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const answer = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'rejectUnauthorized': false,
        },
        body: JSON.stringify({
            model: 'GigaChat:latest',
            messages,
            temperature: 0.7,
        }),
    });

    const jsonAnswer = await answer.json();
    return jsonAnswer.choices[0].message.content;
};

module.exports = {
    sendMessage,
};
