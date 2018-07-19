
/*******************************************************************************
  --- Fields ---
*******************************************************************************/

const EMPLOYEE_COUNT = 12;

let employees =
{
    objects: [],
    elements: []
}

const employeeList = document.querySelector('#employees').querySelector('ul');

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
        <div class="employee-avatar"></div>
        <div class="employee-details">
            <h2 class="employee-name">${object.name}</h2>
            <p class="employee-email">${object.email}</p>
            <p class="employee-city">${object.location}</p>
        </div>`
    element.className = "employee";

    let avatar = element.querySelector('.employee-avatar');

    avatar.style.background = `radial-gradient(at center, transparent, rgba(255,255,255,0.2) 70%, white 70%),
                                         gray url('${object.avatar}') no-repeat center`
    avatar.style.backgroundSize = 'cover';
    return element;
}

/*******************************************************************************
  --- Listeners ---
*******************************************************************************/



/*******************************************************************************
  --- Init ---
*******************************************************************************/

function init(i, length)
{
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
            modalInit();
        }
    });
}

init(0, EMPLOYEE_COUNT)
