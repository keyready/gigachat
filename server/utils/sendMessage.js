const sendMessage = async (messages, secret_token) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const answer = await fetch('https://gigachat.devices.sberbank.ru/api/v1/chat/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${secret_token}`,
            'rejectUnauthorized': false,
        },
        body: JSON.stringify({
            model: 'GigaChat:latest',
            messages,
            temperature: 0.1,
            repetition_penalty: 1.2,
        }),
    });

    const jsonAnswer = await answer.json();

    if (!jsonAnswer?.choices?.length) {
        return false;
    }

    return jsonAnswer.choices[0].message.content;
};

module.exports = {
    sendMessage,
};
