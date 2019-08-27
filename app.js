const PaymentRun = require('./modules/PaymentRun')
const { prompt } = require('inquirer')

module.exports = (doc)=>{
    console.info('Welcome to the El Rincón de Idiomas control panel'.magenta)
    prompt([
        {
            name: 'choice',
            message: 'Please select an option',
            type: 'list',
            choices: ['Create a new payment run', 'Sanitise data']
        },
    ]).then((answers)=>{
        switch(answers.choice){
            case 'Create a new payment run':
                prompt([
                    {
                        name: 'month',
                        message: 'Please select the month for the invoice period',
                        type: 'list',
                        choices: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                        ]
                    },
                    {
                        name: 'year',
                        message: 'Please enter the year for the invoice period',
                        validate(input){
                            const regex = /^\d{4}$/g
                            if(!input.match(regex)){
                                return 'Sorry, the year format is not valid.\nPlease try again using the format YYYY.'
                            }
                            return true
                        }
                    }
                ]).then((answers)=>{
                    const paymentRun = new PaymentRun({
                        month: answers.month,
                        year: answers.year,
                        doc: doc
                    })

                    paymentRun.addNewSheet().then(()=>{ }).catch((err)=>{console.log(err)})

                    // run.printInvoices()
                })
                break;
            case 'Sanitise data':
                require('./modules/SheetHelper').sanitiseData(doc)
        }
    })
}