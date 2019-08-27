const shelper = require('./SheetHelper');

class PaymentRun {
    constructor(params) {
        this.month = params.month;
        this.year = params.year;
        this.title = `${this.month}-${this.year} (Payments)`
        this.doc = params.doc
        this.title;
    }

    addNewSheet() {
        return new Promise((res, rej) => {

            // check that there isn't already a sheet and reject if there is
            shelper.getSheetIdByTitle(this.doc, this.title).then((id) => {
                if (id) {
                    rej(`A sheet for ${this.month} ${this.year} already exists.`)
                }
            })

            // create a new sheet with add header rows
            this.doc.addWorksheet({
                title: this.title,
                headers: ['NOMBRE', 'CUOTA', 'PROFESOR', 'PAGADO']
            }, () => {
                // copy in student data from the directory
                shelper.getStudentData(this.doc).then((data) => {
                    shelper.getSheetIdByTitle(this.doc, this.title).then((id) => {
                        data.map((i) => {
                            this.doc.addRow(id, {
                                NOMBRE: i.nombre,
                                CUOTA: i.cuota,
                                PROFESOR: i.profesor,
                                PAGADO: 'N'
                            }, () => {
                                res();
                            })
                        })
                    })
                })
            })
        }).catch((err) => console.log(err))
    }

    printInvoices() {

    }
}

module.exports = PaymentRun;