# yokatlas-api
### Unofficial API Wrapper for YÖK's University Information system.

## Installation
This package lets you search among all of the undergraduate programs in Turkey by wrapping state's official search API.
```sh
npm install --save yokatlas-api
```
# [Live Demo]()
## Usage

### Import
```js
const yokatlasapi = require("yokatlas-api")
```

### Example Search 
Searching by university name:
```js
  // The search must have a function inside that will work as callback.
  new yokatlasapi({
      "uni_adi": "İstanbul"
  }).search(results => console.log(results)) 
```

Searching by university city and program: 
```js
  new yokatlasapi({
      "sehir_adi": "Ankara",
      "program_adi": "İngiliz Dili ve Edebiyatı"
  }).search(results => console.log(results)) 
```
## Search Parameters

| Parameter | English | Default |
| ------ | ------ | ------ |
| yop_kodu | program number | undefined |
| uni_adi | university name | undefined |
| program_adi | program name | undefined |
| sehir_adi | city name | undefined |
| universite_turu | state/private | undefined |
| ucret_burs | scholarship/fee | undefined |
| ogretim_turu | online/face to face| undefined |

## Formatting Parameters 

| Parameter | English | Default |
| ------ | ------ | ------ |
| start | Starting number for results can be usd for pagination. | 0 |
| length | How much result will be sent back. | 10 |
| search | Searches parameter in every field. | "" |
| puan_turu | Exam point type of the program. | "dil" |
| ust_bs | Highest student placement score to be showed. | 0 |
| alt_bs | Lowest student placement score to be showed. | 3000000 |

## Example Query

### Search Parameters
```js
  new yokatlasapi({
      "sehir_adi": "Adana",
      "program_adi": "İngiliz",
      "length": 1
  }).search(results => console.log(results)) 
``` 
### Return Format
```json
[
   {
      "uni_adi":"ADANA ALPARSLAN TÜRKEŞ BİLİM VE TEKNOLOJİ ÜNİVERSİTESİ ",
      "fakulte":"İnsan ve Toplum Bilimleri Fakültesi",
      "program_adi":"İngilizce Mütercim ve Tercümanlık (Fakülte)",
      "sehir_adi":"ADANA",
      "universite_turu":"Devlet",
      "ucret_burs":"Ücretsiz",
      "ogretim_turu":"Örgün",
      "doluluk":"Doldu",
      "yerlesen":[
         "---",
         "62",
         "52",
         "41"
      ],
      "kontenjan":[
         "60+2",
         "60+2",
         "50+2",
         "40+1"
      ],
      "tbs":[
         "---",
         "25.300",
         "24.639",
         "20.800"
      ],
      "taban":[
         "---",
         "365,87488",
         "363,00912",
         "359,78222"
      ]
   }
]
```


