const { createCanvas } = require('canvas');

module.exports = async (state = 0) => {
    return new Promise((res) => {
        const canvas = createCanvas(300, 350);
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = 5;

        
        createLine(ctx, 50, 330, 150, 330);

        createLine(ctx, 100, 330, 100, 50);

        createLine(ctx, 100, 50, 200, 50);

        createLine(ctx, 200, 50, 200, 80);

        // Голова
        if(state >= 1) {
            ctx.strokeStyle = "#a3a3a3";
            ctx.beginPath();
            ctx.arc(200, 100, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        

        // Тело
        if(state >= 2) {
            createLine(ctx, 200, 120, 200, 200, "#a3a3a3");
        }

        // Руки
        if(state >= 3) {
            createLine(ctx, 200, 150, 170, 130, "#a3a3a3");
        }
        if(state >= 4) {
            createLine(ctx, 200, 150, 230, 130, "#a3a3a3");
        }

        // Ноги
        if(state >= 5) {
            createLine(ctx, 200, 200, 180, 230, "#a3a3a3");
        }
        if(state >= 6) {
            createLine(ctx, 200, 200, 220, 230, "#a3a3a3");
        }

        res(canvas.toBuffer())
    })
}

function createLine(ctx, fromX, fromY, toX, toY, color = "000000") {
    ctx.beginPath();

    ctx.strokeStyle = color;
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    ctx.closePath();
}