function SortSelection(){
let currArray = document.getElementById("string").value
currArray = currArray.split('')
let lenArray = currArray.length
    for (let i = 0; i < lenArray; i++) {
        console.log(`Порядковый номер текущего элемента - ${i}`)
        console.log(`Значение текущего элемента - ${currArray[i]}`)
        let min = i
        for (let j = i; j < lenArray; j++) {
            if(currArray[j] < currArray[min]){
                min = j
            }
        }
        console.log(`Порядковый номер минимального элемента${min}`)
        console.log(`Значение минимального элемента - ${currArray[min]}`)

        if (min != i) {
            [currArray[i], currArray[min]] = [currArray[min], currArray[i]]
        }
    }
    document.getElementById("result").innerHTML = currArray.join('');
    console.log(currArray.join(''))
}
