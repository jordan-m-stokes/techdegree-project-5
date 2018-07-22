
/*******************************************************************************
  --- Fields ---
*******************************************************************************/

const overlay = document.querySelector('#overlay');


/*******************************************************************************
  --- Helper Functions ---
*******************************************************************************/

function setOverlay(index, employees)
{
    const data = employees.objects[index];

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

    const close = overlay.querySelector('#overlay-close');
    const left = overlay.querySelector('#overlay-slide-left');
    const right = overlay.querySelector('#overlay-slide-right');
    const avatar = overlay.querySelector('#overlay-avatar');

    left.value = (index === 0) ? (EMPLOYEE_COUNT - 1) : (index - 1);
    right.value = (index + 1 === EMPLOYEE_COUNT) ? (0) : (index + 1);

    close.addEventListener('click', handler_onOverlayCloseClick);
    left.addEventListener('click', handler_onSlideClick);
    right.addEventListener('click', handler_onSlideClick);

    avatar.style.background = `radial-gradient(at center, transparent, rgba(255,255,255,0.1) 60%, white 70%),
                               gray url('${data.avatar}') no-repeat center`
    avatar.style.backgroundSize = 'cover';
}

/*******************************************************************************
  --- Handler Functions ---
*******************************************************************************/

function handler_onOverlayCloseClick()
{
    enableScroll();
    fadeOut(overlay);
    fadeOut(blur);
}

function handler_onSlideClick(event)
{
    let target = event.target;
    let index = target.value;

    if(index !== '-1')
    {
        setOverlay(index, employees);
    }
    flash(overlay);
}

function handler_onEmployeeClick(event)
{
    let target = event.target;
    console.log(typeof target);

    if(typeof target === 'null')
    {
        return;
    }
    if(target.tagName === 'ul')
    {
        target = target.querySelector('employee');
    }
    else
    {
        while(target.className !== 'employee')
        {
            target = target.parentNode;
        }
    }
    let index = target.value;

    setOverlay(index, employees);

    scrollTo(0, 0);
    disableScroll();
    fadeIn(overlay);
    fadeIn(blur);
}

/*******************************************************************************
  --- Init ---
*******************************************************************************/

overlay.className = 'hide';

function modalInit()
{
    employeeList.addEventListener('click', handler_onEmployeeClick);
}
