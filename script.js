document.getElementById('preview-btn').addEventListener('click', function() {
    const type = document.getElementById('type').value;
    const color = document.getElementById('color').value;
    const accessory = document.getElementById('accessory').value;

    let emoji;
    switch(type) {
        case 'bear': emoji = '🐻'; break;
        case 'rabbit': emoji = '🐰'; break;
        case 'cat': emoji = '🐱'; break;
        case 'dog': emoji = '🐶'; break;
        default: emoji = '❓';
    }

    let accessoryEmoji = '';
    switch(accessory) {
        case 'hat': accessoryEmoji = '🎩'; break;
        case 'scarf': accessoryEmoji = '🧣'; break;
        case 'bow': accessoryEmoji = '🎀'; break;
        default: accessoryEmoji = '';
    }

    const description = `A ${color} ${type} plushie ${accessory !== 'none' ? 'with a ' + accessory : ''}!`;

    document.getElementById('description').innerHTML = `${emoji} ${accessoryEmoji}<br>${description}`;
});