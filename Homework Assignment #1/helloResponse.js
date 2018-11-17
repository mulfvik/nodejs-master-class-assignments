var helloResponse =
  {
    "hello":
      [{
        "about": {
          "name": "Mikael Ulfvik",
          "age": 42,
          "country": "Sweden",
          "city": "Stockholm",
          "sockerTeam": "Hammarby IF",
          "homeLocation": [{
            "coordinatesystem": "WGS84",
            "lat": 59.186834,
            "lon": 18.174005
          }],
          "occupation": "GIS-engineer",
          "why": "I have been learning programming for a couple of years now and it has whetted my appetite. I'm doing it mostly for relaxation when I am at home and my dotter is at her moms place. I find it comforting I guess. In addition to that I do some development at work, mostly frontend web-mapping but I like to extend my knowledge more for the backend and develop geo API's."
        },
        "links": {
          "github": "https://github.com/mulfvik",
          "linkedIn": "https://www.linkedin.com/in/mikael-ulfvik-9489133b",
          "cg": "https://www.cgarchitect.com/members/view/mikaelulfvik",
          "twitter": "https://twitter.com/MikaelUlfvik"
        },
      }]
  }

module.exports.helloResponse = helloResponse;