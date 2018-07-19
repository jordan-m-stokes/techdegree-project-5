
function getStateAbbreviation(state)
{
    let stateAbbreviations =
    {
        alaska: "AK",
        alabama: "AL",
        arkansas: "AR",
        arizona: "AZ",
        california: "CA",
        colorado: "CO",
        connecticut: "CT",
        dc: "DC",
        delaware: "DE",
        florida: "FL",
        georgia: "GA",
        hawaii: "HI",
        iowa: "IA",
        idaho: "ID",
        illinois: "IL",
        indiana: "IN",
        kansas: "KS",
        kentucky: "KY",
        louisiana: "LA",
        massachusetts: "MA",
        maryland: "MD",
        maine: "ME",
        michigan: "MI",
        minnesota: "MN",
        missouri: "MO",
        mississippi: "MS",
        montana: "MT",
        north_carolina: "NC",
        north_dakota: "ND",
        nebraska: "NE",
        new_hampshire: "NH",
        new_jersey: "NJ",
        new_mexico: "NM",
        nevada: "NV",
        new_york: "NY",
        ohio: "OH",
        oklahoma: "OK",
        oregon: "OR",
        pennsylvania: "PA",
        rhode_island: "RI",
        south_carolina: "SC",
        south_dakota: "SD",
        tennessee: "TN",
        texas: "TX",
        utah: "UT",
        virginia: "VA",
        vermont: "VT",
        washington: "WA",
        wisconsin: "WI",
        west_virginia: "WV",
        wyoming: "WY"
    }

    state = state.replace(' ', '_');

    let abbreviation = stateAbbreviations[state];

    if(typeof abbreviation === 'string')
    {
        return abbreviation;
    }
    return state;
}

function capitalizeFirstLetter(string)
{
    words = string.split(' ');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
}

function simplifyDate(string)
{
    const months =
    {
        _01: 'January',
        _02: 'Febuary',
        _03: 'March',
        _04: 'April',
        _05: 'May',
        _06: 'June',
        _07: 'July',
        _08: 'August',
        _09: 'September',
        _10: 'October',
        _11: 'November',
        _12: 'December'
    }

    const split = string.split('T')[0].split('-');

    let year = split[0];
    let month = split[1];
    let day = split[2];

    month = months[`_${month}`];

    if(day[0] === 0)
    {
        day = `${day[1]}`;
    }

    return `${month} ${day}, ${year}`;
}

function simplifyData(data)
{
    let simplifiedData =
    {
        avatar: data.picture.large,
        name: capitalizeFirstLetter(`${data.name.first} ${data.name.last}`),
        email: data.email,
        location: `${capitalizeFirstLetter(data.location.city)}, ${getStateAbbreviation(data.location.state)}`,
        number: data.phone,
        birthday: simplifyDate(data.dob.date)
    }
    simplifiedData.address = `${capitalizeFirstLetter(data.location.street)}, ${simplifiedData.location} ${data.location.postcode}`

    return simplifiedData;
}
