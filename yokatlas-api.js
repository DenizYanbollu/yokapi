const axios = require('axios');

const columnData = require("./columnData.json")

class YOKATLAS {
    constructor(_) {
        const columnVars = {
            "yop_kodu": 1,
            "uni_adi": 2,
            "program_adi": 4,
            "sehir_adi": 6,
            "universite_turu": 7,
            "ucret_burs": 8,
            "ogretim_turu": 9,
            "doluluk": 14,
        }

        const defaults = {
            "draw": 1,
            "start": 0,
            "length": 10,
            "search": 1,
            "puan_turu": "dil",
            "ust_bs": 0,
            "alt_bs": 3000000,
            "yeniler": 1
        }

        this.columns = []
        this.columns = new URLSearchParams(columnData[0])

        Object.keys(columnVars)
            .forEach(key => {
                if (_[key]) {
                    this.columns.set(`columns[${columnVars[key]}][search][value]`, _[key])
                }
            })

        Object.keys(defaults).forEach(
            key => {
                if (!_[key]) return this.columns.append(key, defaults[key])
                if (key === "puan_turu") {
                    if (_[key] === "dil" || _[key] === "ea" ||
                        _[key] === "söz" || _[key] === "say") {
                            this.columns.append(key, _[key])
                        } else {
                            this.columns.append(key, defaults[key])
                        }
                    return
                }
                if (key === "search") {
                    this.columns.append("search[value]", _[key] ? _[key] : "")
                    this.columns.append("search[regex]", false)
                    return
                }
                this.columns.append(key, _[key])
            }
        )
    }

    // Api returns three of the columns with numbers as html so need to parse them.
    // ex: <br><font color='red'>---</font><br><font color='purple'>12</font><br><font color='blue'>7</font><br><font color='green'>7</font>
    getYerlesenNumber(html) {
        return html.match(/\>[0-9]{1,3}|(---)?<\/font></)[1]
    }

    getKontenjanNumber(html) {
        return html.match(/\d{0,1000}[+]\d{0,10}/)[0]
    }

    getYOPkODU(html) {
        return
    }

    parseResults({data}) {
        return data.map(
            _ => {
                return {
                    "uni_adi": _[41],
                    "fakulte": _[3],
                    "program_adi": _[42],
                    "sehir_adi": _[6],
                    "universite_turu": _[7],
                    "ucret_burs": _[8],
                    "ogretim_turu": _[9],
                    "doluluk": _[14],
                    "yerlesen": [
                        this.getYerlesenNumber(_[15]),
                        _[16],
                        _[17],
                        _[18]
                    ],
                    "kontenjan": [
                        this.getKontenjanNumber(_[10]),
                        _[11],
                        _[12],
                        _[13]
                    ],
                    "tbs": [
                        this.getYerlesenNumber(_[19]),
                        _[20],
                        _[21],
                        _[22]
                    ],
                    "taban": [
                        this.getYerlesenNumber(_[27]),
                        _[28],
                        _[29],
                        _[30]
                    ]
                }
            }
        )
    }

    search(callback) {
        if (typeof(callback) !== "function") return
        axios.post(
            "https://yokatlas.yok.gov.tr/server_side/server_processing-atlas2016-TS-t4.php",
        this.columns.toString(),
            {   
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            }
        ).then(
            ({data}) => callback(this.parseResults(data))
        )
    }
}

module.exports = YOKATLAS