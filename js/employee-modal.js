
/*******************************************************************************
  --- Fields ---
*******************************************************************************/

//elements
const overlay = document.querySelector('#overlay');


/*******************************************************************************
  --- Helper Functions ---
*******************************************************************************/

/*description - sets to display an overlay for a given employee
paramaters: - index           - (integer) the index for the employee to display
            - employees       - (object[]) an array of all employee objects
            - filteredIndexes - (integer[]) an array of all indexes of all
                              unhidden employees
*/ function setOverlay(index, employees, filteredIndexes)
{
    //employee to display and its data
    const employee = employees[index];
    const data = employee.data;
    //the length of filtered employees
    const filteredLength = filteredIndexes.length;
    //the index of "filteredIndexes" where "index" is
    const filteredIndex = filteredIndexes.indexOf(index);

    //html construction
    overlay.innerHTML = `
        <div id=overlay-background>
            <span id="overlay-close" class="unselectable">x</span>
            <span id="overlay-slide-left" class="unselectable"><</span>
            <span id="overlay-slide-right" class="unselectable">></span>
            <div id="overlay-top">
                <div id="overlay-avatar"></div>
                <h2 id="overlay-name">${data.name}</h2>
                <p id="overlay-email" class="overlay-p"><p>${data.email}</p>
                <p id="overlay-location" class="overlay-p"><p>${data.location}</p>
            </div>
            <div id="overlay-bottom">
                <p id="overlay-number" class="overlay-p">${data.number}</p>
                <p id="overlay-address" class="overlay-p">${data.address}</p>
                <p id="overlay-birthday" class="overlay-p">Birthday: ${data.birthday}</p>
            </div>
        </div>`

    //gets elements of new html construction
    const close = overlay.querySelector('#overlay-close');
    const left = overlay.querySelector('#overlay-slide-left');
    const right = overlay.querySelector('#overlay-slide-right');
    const avatar = overlay.querySelector('#overlay-avatar');

    //if there is only one filtered employee than left and right arrows
    //are set to basically not toggle
    if(filteredLength < 2)
    {
        left.value = employee.value;
        right.value = employee.value;
    }
    //else determines which employee the left and right arrows should toggle to
    else
    {
        const firstIndex = filteredIndexes[0];
        const lastIndex = filteredIndexes[filteredLength - 1];
        const nextIndex = filteredIndexes[filteredIndex + 1];
        const previousIndex = filteredIndexes[filteredIndex - 1];

        if(filteredIndex === 0)
        {
            left.value = employees[lastIndex].element.value;
            right.value = employees[nextIndex].element.value;
        }
        else if(filteredIndex === (filteredLength - 1))
        {
            left.value = employees[previousIndex].element.value;
            right.value = employees[firstIndex].element.value;
        }
        else
        {
            left.value = employees[previousIndex].element.value;
            right.value = employees[nextIndex].element.value;
        }
    }

    //adds listeners for close, left, and right buttons
    close.addEventListener('click', handler_onOverlayCloseClick);
    left.addEventListener('click', handler_onSlideClick);
    right.addEventListener('click', handler_onSlideClick);

    //sets picture for avatar
    avatar.style.background = `radial-gradient(at center, transparent, rgba(255,255,255,0.1) 60%, white 70%),
                               gray url('${data.avatar}') no-repeat center`
    avatar.style.backgroundSize = 'cover';
}

/*******************************************************************************
  --- Handler Functions ---
*******************************************************************************/

//handler for when the close button is clicked
function handler_onOverlayCloseClick()
{
    fadeOut(overlay);
    fadeOut(blur);
}


//handler for when left or right arrows are hit
function handler_onSlideClick(event)
{
    let target = event.target;
    let index = target.value;

    if(index !== '-1')
    {
        setOverlay(index, employees, filteredEmployeeIndexes);
    }
    flash(overlay);
}

//handler to open overlay for whatever employee a user clicks
function handler_onEmployeeClick(event)
{
    let target = event.target;

    while(target.tagName !== 'LI') target = target.parentNode;

    let index = target.value;

    setOverlay(index, employees, filteredEmployeeIndexes);
    scrollTo(0, 0);
    fadeIn(overlay);
    fadeIn(blur);
}

/*******************************************************************************
  --- Init ---
*******************************************************************************/

overlay.className = 'hide';

//called after employees are generated from "employee-generation.js"
function modalInit()
{
    //adds click listener for all generated employees
    employees.forEach(employee =>
    {
        employee.element.addEventListener('click', handler_onEmployeeClick);
    });
}
