function getDateAtLaterMinute(minutesLater) {
    const time = new Date();
    time.setMinutes(time.getMinutes() + minutesLater);
    return time;
}

module.exports.getDateAtLaterMinute = getDateAtLaterMinute;