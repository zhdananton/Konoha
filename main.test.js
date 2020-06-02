const move = require('./main');

test('Move', () => {
    let unit = {
        x: 0,
        y: 0,
        alive: true
    }
    move(unit, "right");
    expect(unit.x).toBe(50);
});