const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')


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
}

itemForm.addEventListener('submit', addItem)