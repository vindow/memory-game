export function faceUp(value) {
    return {
        type : "FACE_UP",
        value
    };
}

export function matched(value) {
    return {
        type : "MATCHED",
        value
    };
}

export function faceDown(value) {
    return {
        type : "FACE_DOWN",
        value
    };
}

export function reset() {
    return {
        type : "RESET"
    };
}