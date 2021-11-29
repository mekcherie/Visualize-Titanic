import data from './titanic-data.js'

const portColor = {
  total: 'black',
  S: 'tomato', 
  C: 'cornflowerblue', 
  Q: 'orange', 
  undefined: 'grey',
}

const titanicEmbarked = document.querySelector('#titanic-embarked')
const embarkedCounts = data.reduce((acc, p) => {
  if (acc[p.fields.embarked] === undefined) {
    acc[p.fields.embarked] = 1
  } else {
    acc[p.fields.embarked] += 1
  }
  return acc
}, {})

embarkedCounts.total = data.length

const embarkedKeys = Object.keys(embarkedCounts) 

embarkedKeys.forEach((e) => {
  const el = document.createElement('div')
  titanicEmbarked.appendChild(el)
  el.style.width = '30px'
  const count = embarkedCounts[e]
  const percent = count / data.length * 100
  el.style.height = `${percent}%`
  el.style.backgroundColor = portColor[e]
  el.style.margin = '1px'
})

titanicEmbarked.style.display = 'flex'
titanicEmbarked.style.alignItems = 'flex-end'
titanicEmbarked.style.border = '1px solid'
titanicEmbarked.style.width = '200px'
titanicEmbarked.style.height = '300px'

// Get a reference to the #titanic
const titanic = document.querySelector('#titanic')

// Set some styles on the titanic
// display flex, justifyContent center, alignItems flex-end
titanic.style.display = 'grid'
titanic.style.gridTemplateColumns = 'repeat(34, 15px)'
titanic.style.gridGap = '2px'

// Map over the data and make a new element for each passenger
const passengers = data.map(p => {
  return document.createElement('div')
})

data.sort((a, b) => {
  if (a.fields.sex === "female") {
    return 1
  }
  return -1
})

data.sort((a, b) => {
  if (a.fields.survived === "Yes") {
    return -1
  }
  return 1
})

data.sort((a, b) => {
  if (a.fields.embarked < b.fields.embarked) {
    return -1
  } else if (a.fields.embarked > b.fields.embarked) {
    return 1
  }
  return 0
})

// Loop over each passenger and append them to the titanic
passengers.forEach(p => {
  titanic.appendChild(p)
})

// Let's loop over each passenger and set some styles 
passengers.forEach((p, i) => {
  p.style.width = '15px'
  p.style.height = '15px'
  p.style.borderRadius = data[i].fields.sex === "female" ? "50%" : "0%"
  p.style.opacity = data[i].fields.survived === "Yes" ? "100%" : "50%"
  p.style.backgroundColor = portColor[data[i].fields.embarked]
})

