const dateConverter = (date) => {
    const newDate = new Date(date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: '2-digit'});
    return newDate;
}

const dateFormat = (date) => {
    const str = date.toISOString();
    return str.substring(0, str.indexOf('T'));
}

const addComaToNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function monthDiff(to, from) {
    var months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()));
    if(to.getDate() < from.getDate()){
        months--;
    }
    return months;
}

const countAmountOfCycles = (cycle, firstBill, currDate) => {
    // firstBill (yyyy-mm-dd)
    if(cycle && firstBill){
        const date = new Date();
        const today = currDate ? new Date(currDate) : new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const startDate = new Date(firstBill);
        // Count amount of cycles between today and first bill.
        // First date counts as a cycle.
        const months = monthDiff(today, startDate);
        const cycles = Math.floor(months / cycle);
        return cycles + 1;
    }
}

const calcNewBill = (firstBill, cycle, currDate) => {
    // firstBill (yyyy-mm-dd)
    if(cycle && firstBill){
        const date = new Date();
        const today = currDate ? new Date(currDate) : new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const startDate = new Date(firstBill);
        // Count amount of cycles between today and first bill.
        // First date counts as a cycle.
        const months = monthDiff(today, startDate);
        const cycles = Math.floor(months / cycle);

        // Get date n months from first bill date.
        const newBill = new Date(firstBill);
        newBill.setMonth(newBill.getMonth() + cycles * cycle + cycle);

        // Set the same day as the first bill.
        // Regardless of the hours, minutes, seconds, milliseconds.
        newBill.setDate(startDate.getDate());

        return dateFormat(newBill);
    }
}

const countTotalPaid = (cycle, firstBill, price) => {
    if(cycle && firstBill){
        const today = new Date();
        const startDate = new Date(firstBill);
        const months = monthDiff(today, startDate);
        const cycles = Math.floor(months / cycle);
        const totalPaid = (cycles + 1) * price; // +1 because we want to include the current cycle
        return totalPaid.toFixed(2) || 0;
    }
}

const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
}

export default {
    dateConverter,
    dateFormat,
    addComaToNumber,
    countAmountOfCycles,
    countTotalPaid,
    calcNewBill,
    generateId,
}