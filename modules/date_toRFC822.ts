function valueToString(value: string | number, length: number) {
    value = value.toString(10);

    while (value.length < length) {
        value = "0" + value;
    }

    return value;
}

function toRFC822(date: Date) {
    const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let returnValue = dayOfWeek[date.getDay()];
    returnValue += ", ";
    returnValue += valueToString(date.getDate(), 2);
    returnValue += " ";
    returnValue += months[date.getMonth()];
    returnValue += " ";
    let year = date.getFullYear();

    if (year < 1900) {
        year += 1900;
    }

    returnValue += valueToString(year, 4);
    returnValue += " ";
    returnValue += valueToString(date.getHours(), 2);
    returnValue += ":";
    returnValue += valueToString(date.getMinutes(), 2);
    returnValue += ":";
    returnValue += valueToString(date.getSeconds(), 2);
    returnValue += " ";

    let offset = date.getTimezoneOffset();

    if (offset) {
        if (offset < 0) {
            returnValue += "+";
            offset *= -1;
        } else {
            returnValue += "-";
        }

        returnValue += valueToString(offset / 60, 2);
        returnValue += valueToString(offset % 60, 2);
    } else {
        returnValue += "GMT";
    }

    return returnValue;
}

export default toRFC822;