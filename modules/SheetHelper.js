const sanitise = require('./sanitise');

module.exports = {
    getSheetIdByTitle(doc, title) {
        return new Promise((res, rej) => {
            doc.getInfo((err, info) => {
                if (err) rej(err);
                const sheets = info.worksheets;
                sheets.map((sheet) => {
                    if (sheet.title === title) {
                        res(sheet.id)
                    }
                })
                res(null)
            })
        })
    },

    getStudentData(doc) {
        return new Promise((res, rej) => {
            this.getSheetIdByTitle(doc, 'Student Directory').then((id) => {
                doc.getRows(id, (err, rows) => {
                    if (err) rej(err)
                    res(rows);
                })
            })
        })
    },

    sanitiseData(doc) {
        return new Promise((res, rej) => {
            this.getStudentData(doc).then((data) => {
                doc.addWorksheet({
                    title: 'replace',
                    headers: ['NOMBRE', 'APELLIDO', 'EDAD', 'FECHA', 'CONTACTO', 'PADRES', 'EMAIL', 'ENFERMEDADES', 'PROFESOR', 'CUOTA']
                }, () => {
                    this.getSheetIdByTitle(doc, 'replace').then((id) => {
                        data.map((row) => {
                            row.nombre = sanitise.convertToLowerCase(row.nombre);
                            row.apellido = sanitise.convertToLowerCase(row.apellido);
                            row.padres = sanitise.convertToLowerCase(row.padres);
                            row.enfermedades = sanitise.convertToLowerCase(row.enfermedades);

                            doc.addRow(id, {
                                NOMBRE: row.nombre,
                                APELLIDO: row.apellido,
                                FECHA: row.fechadenacimiento,
                                CONTACTO: row.ncontacto,
                                PADRES: row.padres,
                                EMAIL: row.email,
                                ENFERMEDADES: row.enfermedades,
                                PROFESOR: row.profesor,
                                CUOTA: row.cuota
                            },()=>{})
                        })
                    })
                })
            })
        })
    }
}