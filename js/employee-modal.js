
/*******************************************************************************
  --- Fields ---
*******************************************************************************/

const overlay = document.querySelector('#overlay');




/*******************************************************************************
  --- Helper Functions ---
*******************************************************************************/

/*******************************************************************************
  --- Handler Functions ---
*******************************************************************************/

function handler_onEmployeeClick(event)
{

    let target = event.target;

    while(target.className !== 'employee')
    {
        if(target.tagName === 'ul')
        {
            target = target.querySelector('employee');
        }
        else
        {
            target = target.parentNode;
        }
    }

    const index = target.value;
    const data = employees.objects[index];

    overlay.innerHTML = `
        <div id="overlay-top">
            <span id="overlay-close">x</span>
            <h2 id="overlay-name">${data.name}</h2>
            <p id="overlay-email" class="overlay-p"><p>${data.email}</p>
            <p id="overlay-location" class="overlay-p"><p>${data.location}</p>
        </div>
        <div id="overlay-bottom">
            <p id="overlay-number" class="overlay-p">${data.number}</p>
            <p id="overlay-address" class="overlay-p">${data.address}</p>
            <p id="overlay-birthday" class="overlay-p">${data.birthday}</p>
        </div>`

    overlay.style.display = '';

    console.log('yay');
}

/*******************************************************************************
  --- Listeners ---
*******************************************************************************/

/*******************************************************************************
  --- Init ---
*******************************************************************************/

overlay.style.display = 'none';

function modalInit()
{
    employeeList.addEventListener('click', handler_onEmployeeClick);
}
