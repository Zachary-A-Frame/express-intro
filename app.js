const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/dogs', function (req, res) {
    return res.send("Bark bark bark")
})

app.get('/mean/:arr', function (req, res) {
    let stringArray = req.params.arr.split(',')
    let array = stringArray.map(Number)

    // console.log(meanArray)
    const average = (array) => array.reduce((a, b) => a + b) / array.length;
    let result = {
        "Operation": "Mean",
        "Result": average(array)
    }
    return res.send(result)
})

app.get('/median/:arr', function (req, res) {
    let stringArray = req.params.arr.split(',')
    let array = stringArray.map(Number)

    function median(numbers) {
        const sorted = numbers.slice().sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);

        if (sorted.length % 2 === 0) {
            return (sorted[middle - 1] + sorted[middle]) / 2;
        }

        return sorted[middle];
    }

    let result = {
        "Operation": "Median",
        "Result": median(array)
    }

    return res.send(result)
})

app.get('/mode/:arr', function (req, res) {
    let stringArray = req.params.arr.split(',')
    let array = stringArray.map(Number)

    function mode(numbers) {
        // as result can be bimodal or multi-modal,
        // the returned result is provided as an array
        // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
        var modes = [], count = [], i, number, maxIndex = 0;

        for (i = 0; i < numbers.length; i += 1) {
            number = numbers[i];
            count[number] = (count[number] || 0) + 1;
            if (count[number] > maxIndex) {
                maxIndex = count[number];
            }
        }

        for (i in count)
            if (count.hasOwnProperty(i)) {
                if (count[i] === maxIndex) {
                    modes.push(Number(i));
                }
            }

        return modes;
    }
    let result = {
        "Operation": "Mode",
        "Result": mode(array)
    }

    return res.send(result)
})

app.listen(3000, function () {
    console.log('App running on port 3000');
})