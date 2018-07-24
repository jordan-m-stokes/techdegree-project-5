
/*******************************************************************************
  --- Fields ---
*******************************************************************************/

//amount of employees to generate
const EMPLOYEE_COUNT = 11;

//a list of employee objects
let employees = [];
//indexes of employees refined by search
let filteredEmployeeIndexes = [];


//elements
const search = document.querySelector('#search');
const employeeList = document.querySelector('#employees').querySelector('ul');
const blur = document.querySelector('#blur');
const loadStatus = document.querySelector('#load-status');

let searchQuery = '';

/*******************************************************************************
  --- Functions ---
*******************************************************************************/

/*description - converts employee object to li element
paramaters: - object - (object) employee object containing necessary data
returns - (element) random employee li element
*/ function createEmployeeElement(object)
{
    let element = document.createElement('LI');

    element.innerHTML = `
        <div class="employee-avatar unselectable"></div>
        <div class="employee-details unselectable">
            <h2 class="employee-name">${object.name}</h2>
            <p class="employee-email">${object.email}</p>
            <p class="employee-city">${object.location}</p>
        </div>`
    element.className = "employee";

    let avatar = element.querySelector('.employee-avatar');

    avatar.style.background = `radial-gradient(at center, transparent, rgba(255,255,255,0.1) 60%, white 70%),
                               gray url('${object.avatar}') no-repeat center`
    avatar.style.backgroundSize = 'cover';
    return element;
}

/*description - filters employees based on query
paramaters: - object - (object) employee object containing necessary data
returns - (element) random employee li element
*/ function searchList(ul, searchQuery)
{
    const employees = ul.querySelectorAll(".employee");
    const filteredIndexes = [];
    const noResults = ul.parentNode.querySelector("#no-results")
    let length = ul.querySelectorAll('.hide:not(#no-results)').length;
    searchQuery = searchQuery.toLowerCase();

    employees.forEach(employee =>
    {
        let name = employee.querySelector('.employee-name').textContent.toLowerCase();
        let email = employee.querySelector('.employee-email').textContent;

        //checks if name or email contains the user's search
        //uses "hide" class to exclude student from list
        if(name.includes(searchQuery) || email.includes(searchQuery))
        {
            employee.classList.remove("hide");
            filteredIndexes.push(employee.value);
        }
        else
        {
            employee.classList.add("hide");
        }
    });

    //gets length of search results
    let newLength = filteredIndexes.length;

    //displays "no results" if appropriate
    if(newLength === 0)
    {
        noResults.classList.remove("hide");
    }
    //hides otherwise
    else
    {
        noResults.classList.add("hide");
    }
    //if search results changed this time the screen flashes
    if(length !== newLength)
    {
        flash(ul);
    }
    return filteredIndexes;
}

/*******************************************************************************
  --- Listeners ---
*******************************************************************************/

//performs an employee search whenever a key is hit while focused on search bar
search.addEventListener('keyup', () =>
{
    if(search.value !== searchQuery)
    {
        searchQuery = search.value;
        filteredEmployeeIndexes = searchList(employeeList, searchQuery);
    }
});

/*******************************************************************************
  --- Init ---
*******************************************************************************/

/*description - a recursive function that loads employees until "i" equals
                "length"
paramaters: - i      - (integer) the iterator
            - length - (integer) the total amount of iterations to perform
*/ function init(i, length)
{
    //updates load status to user
    loadStatus.textContent = `Loading Employee: ${i+1}/${length}`

    //performs an ajax request for a new random employee
    fetch('https://randomuser.me/api/?nat=us')
        .then(response => response.json())
        .then(data => data.results[0])
        .then(data =>
    {
        //uses data retrieved from ajax request to create an element and
        //simplified data
        data = simplifyData(data);
        let element = createEmployeeElement(data);

        //stores constructed element and data and adds it to the page
        element.value = i;
        employees.push({data: data, element: element});
        filteredEmployeeIndexes.push(i);
        employeeList.appendChild(element);

        //calls function over again if appropriate
        if(i + 1 < length)
        {
            init(i + 1, length);
        }
        //prepares page for use if loading is finished
        else
        {
            loadStatus.className = 'hide';
            fadeOut(blur);
            modalInit();
        }
    });
}

init(0, EMPLOYEE_COUNT)
