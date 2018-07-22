
/*******************************************************************************
  --- Fields ---
*******************************************************************************/

const EMPLOYEE_COUNT = 12;

let employees =
{
    objects: [],
    elements: []
}

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

function searchList(ul, search)
{
    const employees = ul.querySelectorAll(".employee");
    const noResults = ul.querySelector("#no-results")
    let length = ul.querySelectorAll('.hide:not(#no-results)').length;
    search = search.toLowerCase();

    employees.forEach(employee =>
    {
        let name = employee.querySelector('.employee-name').textContent.toLowerCase();
        let email = employee.querySelector('.employee-email').textContent;

        //checks if name or email contains the user's search
        //uses "exclude" class to exclude student from list
        if(name.includes(search) || email.includes(search))
        {
            employee.classList.remove("hide");
        }
        else
        {
            employee.classList.add("hide");
        }
    });

    let newLength = ul.querySelectorAll(".hide:not(#no-results)").length;

    if(newLength === employees.length)
    {
        noResults.classList.remove("hide");
    }
    else
    {
        noResults.classList.add("hide");
    }
    if(length !== newLength)
    {
        flash(ul);
    }
}

/*******************************************************************************
  --- Listeners ---
*******************************************************************************/

search.addEventListener('keyup', () =>
{
    if(search.value !== searchQuery)
    {
        searchQuery = search.value;
        searchList(employeeList, searchQuery);
    }
});

/*******************************************************************************
  --- Init ---
*******************************************************************************/

function init(i, length)
{
    loadStatus.textContent = `Loading Employee: ${i+1}/${length}`

    fetch('https://randomuser.me/api/?nat=us')
        .then(response => response.json())
        .then(data => data.results[0])
        .then(data =>
    {
        data = simplifyData(data);
        let element = createEmployeeElement(data);

        element.value = i;
        employees.objects.push(data);
        employees.elements.push(element);
        employeeList.appendChild(element);

        if(i + 1 < length)
        {
            init(i + 1, length);
        }
        else
        {
            loadStatus.className = 'hide';
            fadeOut(blur);
            modalInit();
        }
    });
}

init(0, EMPLOYEE_COUNT)
