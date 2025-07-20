const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filterIcon = document.getElementById('filter')

function onAddItemSubmit (e) {
  e.preventDefault()
  
  //Validation
  if (itemInput.value === '') {
    alert('Please add an item')
    return
  }

  // Create DOM element
  addItemToDOM(itemInput.value)

  //Add item to localStorage
  addItemToStorage(itemInput.value)

  itemInput.value = ''

  checkUI()
}

function addItemToDOM (item) {
  //Create text
  const text = document.createTextNode(item)
  
  //Create icon
  const icon = document.createElement('i')
  icon.className = "fa-solid fa-xmark"

  //Create button
  const button = document.createElement('button')
  button.className = "remove-item btn-link text-red"
  
  //Create li
  const listEle = document.createElement('li')

  //Append all together
  button.appendChild(icon)
  listEle.appendChild(text)
  listEle.appendChild(button)
  itemList.appendChild(listEle)
}

function addItemToStorage (item) {
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.push(item) // Add to localStorage

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage () {
  let itemsFromStorage
  //Check if localStorage is empty
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }
  
  return itemsFromStorage
}

function displayItems () {
  const itemsFromStorage = getItemsFromStorage()
  if (itemsFromStorage.length > 0) {
    itemsFromStorage.forEach(item => addItemToDOM(item))
  }
  checkUI()
}

function onClickItem (e) {
  if (e.target.tagName === 'I') {
    removeItem(e.target.parentElement.parentElement)
  }
}

function removeItem (item) {
  //Remove from DOM
  item.remove()
  //Remove from localStorage
  removeItemFromStorage(item.textContent)
  
  checkUI()
}

function removeItemFromStorage (item) {
  const itemsFromStorage = getItemsFromStorage()
  const index = itemsFromStorage.findIndex(ele => ele === item)
    if (index !== -1) {
      itemsFromStorage.splice(index, 1)
    }
  
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))  
}


function clearAll () {
  while (itemList.firstChild) {
    itemList.firstChild.remove()
  }

  localStorage.removeItem('items')

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
itemList.addEventListener('click', onClickItem)
itemForm.addEventListener('submit', onAddItemSubmit)
filterIcon.addEventListener('input', filterItems)
document.addEventListener('DOMContentLoaded', displayItems)