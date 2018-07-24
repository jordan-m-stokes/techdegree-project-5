/*description - gets abbreviation for given state
paramaters: - state - (string) the state to abbreviate
returns - (string) the abbreviated state
*/ function getStateAbbreviation(state)
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

    //reforats state to use underscores
    state = state.replace(' ', '_');

    //gets abbreviation
    let abbreviation = stateAbbreviations[state];

    //returns abbreviation if exists, returns the state unabbreviated otherwise
    if(typeof abbreviation === 'string')
    {
        return abbreviation;
    }
    return state;
}


/*description - capitalizes every first letter in the given string
paramaters: - string - (string) the string to capitalize
returns - (string) the capitalized string
*/ function capitalizeFirstLetter(string)
{
    words = string.split(' ');
    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return words.join(' ');
}

/*descripion - simplifies "randomuser.me" date format to a presentable format
paramaters: - string - (string) the date to reformat
returns - (string) the reformated date ("{MONTH} {DAY}, {YEAR}")
*/function simplifyDate(string)
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

/*description - takes "randomuser.me" data and simplifes it into a more
                accessable object
paramaters: - data - (object) the data given by "randomuser.me" api
returns - (object) the simplified data
*/ function simplifyData(data)
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


/*description - fades in given element
paramaters: - element - (element) element to fade in
*/ function fadeIn(element)
{
    //adds class to handle fade in css
    element.classList.add('fade-in');
    //unhides element
    element.classList.remove('hide');
    //removes fade class once the duration of the fade ends
    setTimeout(() => element.classList.remove('fade-in'), 600);
}

/*description - fades out given element
paramaters: - element - (element) element to fade out
*/ function fadeOut(element)
{
    //adds class to handle fade in css
    element.classList.add('fade-out');
   //removes fade class once the duration of the fade ends and hides element
    setTimeout(() =>
    {
         element.classList.add('hide');
         element.classList.remove('fade-out');
    }, 570);
}

//interval id for "flash" function
let flashId = -1;
//brightness value for "flash" function
let flashValue = 0;

/*description - flashes the given element
paramaters: - element - (element) element to flash
*/ function flash(element)
{
    flashValue = 6.0;

    //sets the starting brightness
    element.style.filter = "brightness(6.0)";
    //clears any preexisting intervals
    clearInterval(flashId);

    //sets interval for adjusting brightness
    flashId = setInterval(() =>
    {
        //checks if flash is done and clears interval if so
        if(flashValue - 0.3 <= 1.0)
        {
            clearInterval(flashId);
            flashId = -1;
            element.style.filter = `brightness(1)`
            return;
        }
        //adjusts brightness
        element.style.filter = `brightness(${flashValue -= 0.5})`
    }, 10);
}
