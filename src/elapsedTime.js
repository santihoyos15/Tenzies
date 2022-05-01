export default function elapsedTime(startTime) {
    const endTime = performance.now();
    var timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000; // strip the ms

    // get seconds 
    return Math.round(timeDiff);
}