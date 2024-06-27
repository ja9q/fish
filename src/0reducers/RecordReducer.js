export const initialRecord = {
    "caughtFish": 0,
    "caughtSpecies": Array(16).fill(0),
    "totalBites": 0,
    "failedCatches": 0
};

export function recordReducer(record, action) {
switch (action.type) {
    case 'caughtFish': {
        return recordCaughtFish(record, action);
    }
    case 'bite': {
        return recordBite(record);
    }
    case 'failedCatch': {
        return recordFailedCatch(record);
    }
    case 'set': {
        return action.records;
    }
    default: {
        throw Error('Unknown action: ' + action.type);
    }
}
}


function recordCaughtFish(record, action) {
    const temp = record.caughtSpecies;
    temp[action.fish] += 1;

    return {
        "caughtFish": record.caughtFish + 1,
        "caughtSpecies": temp,
        "totalBites": record.totalBites,
        "failedCatches": record.failedCatches
    }
}

function recordBite(record) {
    return {
        "caughtFish": record.caughtFish,
        "caughtSpecies": record.caughtSpecies,
        "totalBites": record.totalBites + 1,
        "failedCatches": record.failedCatches
    }
}

function recordFailedCatch(record) {
    return {
        "caughtFish": record.caughtFish,
        "caughtSpecies": record.caughtSpecies,
        "totalBites": record.totalBites,
        "failedCatches": record.failedCatches + 1
    }
}
