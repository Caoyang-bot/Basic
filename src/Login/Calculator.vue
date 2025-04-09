<template>
  <div class="calculator">
    <div class="display">{{ current || '0' }}</div>
    <div class="buttons">
      <button @click="clear">C</button>
      <button @click="sign">+/-</button>
      <button @click="percent">%</button>
      <button @click="divide" class="operator">÷</button>
      <button @click="append('7')">7</button>
      <button @click="append('8')">8</button>
      <button @click="append('9')">9</button>
      <button @click="times" class="operator">×</button>
      <button @click="append('4')">4</button>
      <button @click="append('5')">5</button>
      <button @click="append('6')">6</button>
      <button @click="minus" class="operator">-</button>
      <button @click="append('1')">1</button>
      <button @click="append('2')">2</button>
      <button @click="append('3')">3</button>
      <button @click="add" class="operator">+</button>
      <button @click="append('0')" class="zero">0</button>
      <button @click="dot">.</button>
      <button @click="equal" class="operator">=</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const current = ref('')
const previous = ref('')
const operation = ref('')

function clear() {
  current.value = ''
}

function sign() {
  current.value = current.value.charAt(0) === '-' ? 
    current.value.slice(1) : `-${current.value}`
}

function percent() {
  current.value = `${parseFloat(current.value) / 100}`
}

function append(number: string) {
  if (current.value.includes('.') && number === '.') return
  current.value = `${current.value}${number}`
}

function setOperation(op: string) {
  if (current.value === '') return
  if (previous.value !== '') {
    calculate()
  }
  operation.value = op
  previous.value = current.value
  current.value = ''
}

function add() {
  setOperation('+')
}

function minus() {
  setOperation('-')
}

function times() {
  setOperation('*')
}

function divide() {
  setOperation('/')
}

function equal() {
  if (current.value === '' || previous.value === '') return
  calculate()
  operation.value = ''
}

function calculate() {
  let computation = 0
  const prev = parseFloat(previous.value)
  const curr = parseFloat(current.value)
  
  if (isNaN(prev) || isNaN(curr)) return
  
  switch (operation.value) {
    case '+':
      computation = prev + curr
      break
    case '-':
      computation = prev - curr
      break
    case '*':
      computation = prev * curr
      break
    case '/':
      computation = prev / curr
      break
    default:
      return
  }
  
  current.value = computation.toString()
  previous.value = ''
}

function dot() {
  if (current.value.includes('.')) return
  if (current.value === '') {
    current.value = '0.'
  } else {
    current.value = `${current.value}.`
  }
}
</script>

<style scoped>
.calculator {
  width: 300px;
  margin: 0 auto;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #f5f5f5;
}

.display {
  background-color: #fff;
  padding: 10px;
  text-align: right;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}

button {
  padding: 10px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #eee;
}

.operator {
  background-color: #f0ad4e;
  color: white;
}

.operator:hover {
  background-color: #ec971f;
}

.zero {
  grid-column: span 2;
}
</style>
