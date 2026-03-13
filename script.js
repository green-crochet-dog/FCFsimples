document.getElementById('preview-btn').addEventListener('click', async function() {
    const type = document.getElementById('type').value;
    const color = document.getElementById('color').value;
    const accessory = document.getElementById('accessory').value;
    const apiKey = document.getElementById('api-key').value;

    // if no API key is provided we'll still create a local placeholder image
    // the OpenAI request will only be made when an API key is entered

    const description = `A ${color} ${type} plushie ${accessory !== 'none' ? 'with a ' + accessory : ''}!`;
    document.getElementById('description').innerHTML = 'Generating preview...';

    // if the user didn't supply an API key, just draw a simple placeholder image on a canvas
    if (!apiKey) {
        const canvas = document.createElement('canvas');
        canvas.width = 300;
        canvas.height = 300;
        const ctx = canvas.getContext('2d');

        // Load base plushie image
        const baseImg = new Image();
        baseImg.src = `images/${type}.svg`;
        baseImg.onload = () => {
            console.log('Base image loaded:', type);
            ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

            // Apply color tint
            // ctx.globalCompositeOperation = 'multiply';
            // ctx.fillStyle = color || '#ccc';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            // ctx.globalCompositeOperation = 'source-over';

            // If accessory is selected, load and draw it on top
            if (accessory !== 'none') {
                const accImg = new Image();
                accImg.src = `images/${accessory}.svg`;
                accImg.onload = () => {
                    console.log('Accessory image loaded:', accessory);
                    ctx.drawImage(accImg, 0, 0, canvas.width, canvas.height);
                    const img = document.getElementById('plushie-image');
                    img.src = canvas.toDataURL();
                    img.style.display = 'block';
                    document.getElementById('description').innerHTML = description + ' (local preview)';
                };
                accImg.onerror = () => console.error('Failed to load accessory:', accessory);
            } else {
                const img = document.getElementById('plushie-image');
                img.src = canvas.toDataURL();
                img.style.display = 'block';
                document.getElementById('description').innerHTML = description + ' (local preview)';
            }
        };
        baseImg.onerror = () => console.error('Failed to load base:', type);
        return;
    }

    // Generate prompt for DALL-E
    const prompt = `A cute, adorable ${color} ${type} plush toy ${accessory !== 'none' ? 'wearing a ' + accessory : ''}, high quality, detailed, realistic plushie, soft toy, photorealistic, 3D render, cute face, fluffy texture`;

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                n: 1,
                size: '256x256'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate image');
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;

        const img = document.getElementById('plushie-image');
        img.src = imageUrl;
        img.style.display = 'block';

        document.getElementById('description').innerHTML = description;
    } catch (error) {
        console.error('Error generating image:', error);
        document.getElementById('description').innerHTML = 'Error generating image. Please check your API key and try again.';
    }
});