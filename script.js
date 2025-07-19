const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filterIcon = document.getElementById('filter')

function addItem (e) {
  e.preventDefault()
  
  //Validation
  if (itemInput.value === '') {
    alert('Please add an item')
    return
  }
  //Create text
  const text = document.createTextNode(itemInput.value)
  
  //Create icon
  const icon = document.createElement('i')
  icon.className = "fa-solid fa-xmark"

  //Creat button
  const button = document.createElement('button')
  button.className = "remove-item btn-link text-red"
  
  //Create li
  const listEle = document.createElement('li')

  //Append all together
  button.appendChild(icon)
  listEle.appendChild(text)
  listEle.appendChild(button)
  itemList.appendChild(listEle)

  itemInput.value = ''

  checkUI()
}


function removeItem (e) {
  if (e.target.tagName === 'I') {
    e.target.parentElement.parentElement.remove()
  }
  checkUI()
}


function clearAll () {
  while (itemList.firstChild) {
    itemList.firstChild.remove()
  }

  checkUI()
}

function checkUI () {
  const items = document.querySelectorAll('li')
  if (items.length === 0) {
    clearBtn.style.display = 'none'
    filterIcon.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    filterIcon.style.display = 'block'
  }
}

function filterItems (e) {
  const filter = e.target.value.toLowerCase()
  const items = document.querySelectorAll('li')
  items.forEach(item => 
    {if (!item.firstChild.textContent.toLowerCase().includes(filter)) {
      item.style.display = 'none'
    } else {
      item.style.display = 'flex'
    }}
    )
}


clearBtn.addEventListener('click', clearAll)
itemList.addEventListener('click', removeItem)
itemForm.addEventListener('submit', addItem)
filterIcon.addEventListener('input', filterItems)


checkUI()