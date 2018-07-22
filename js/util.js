
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

function fadeIn(element)
{
    element.classList.add('fade-in');
    element.classList.remove('hide');
    setTimeout(() => element.classList.remove('fade-in'), 1000);
}

function fadeOut(element)
{
    element.classList.add('fade-out');
    setTimeout(() =>
    {
         element.classList.add('hide');
         element.classList.remove('fade-out');
    }, 950);
}

let flashId = -1;
let flashValue = 0;

function flash(element)
{
    flashValue = 6.0;

    element.style.filter = "brightness(6.0)";

    clearInterval(flashId);

    flashId = setInterval(() =>
    {
        if(flashValue - 0.3 <= 1.0)
        {
            clearInterval(flashId);
            flashId = -1;
            element.style.filter = `brightness(1)`
            return;
        }
        element.style.filter = `brightness(${flashValue -= 0.5})`
    }, 10);
}




//scroll disabling
//credit to "galambalazs" on stackoverflow

var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(event)
{
  event = event || window.event;

  if(event.preventDefault)
  {
      event.preventDefault();
  }
  event.returnValue = false;
}

function preventDefaultForScrollKeys(event)
{
    if(keys[event.keyCode])
    {
        preventDefault(event);
        return false;
    }
}

function disableScroll()
{
    if (window.addEventListener) // older FF
    {
        window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }
}

function enableScroll()
{
    if (window.removeEventListener)
    {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    }
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
