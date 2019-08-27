module.exports = {
    convertToLowerCase(string) {
        if (string) {
            var arr = string.split('');
            string = arr.reduce((acc, curr, index) => {
                if (acc[acc.length - 1] !== ' ') {
                    return acc += curr.toLowerCase()
                }
                if (arr[index + 1] === ' ') {
                    return acc += curr.toLowerCase()
                }
                return acc += curr;
            })
        }


        return string
    }
}