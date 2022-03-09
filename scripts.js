const NUM_OF_DATA_TO_SORT = 65;
const dataToSortDiv = document.getElementById("data");
let dataToSortList = [];
let isVisualizationOn = false;
const sortBtn = document.getElementById("sort");
const generateNewDataBtn = document.getElementById("generateData");
let chosenSort = 'bubble sort';

sortBtn.addEventListener("click", sort);
generateNewDataBtn.addEventListener("click", generateData);

generateData();

function generateData() {
    if(isVisualizationOn) {
        return;
    }
    dataToSortList = [];
    Array.from(dataToSortDiv.children).forEach(md => md.parentNode.removeChild(md));
    for(let i = 0; i < NUM_OF_DATA_TO_SORT; i++) {
        const dataToSort = document.createElement("div");
        dataToSort.classList.add("dataToSort");
        const rand = random(20, 150);
        dataToSort.innerText = rand;
        dataToSort.style.height = `${rand}px`;
        dataToSortDiv.appendChild(dataToSort);
        dataToSortList.push(dataToSort);
    }
}

function random(from, to) {
    return Math.floor(Math.random() * to) + from;
}

function sort() {
    if(chosenSort == 'bubble sort') {
        visualBubbleSort();
    }
    /*else if(chosenSort == 'quick sort') {
        visualQuickSort();
    }*/
}

function visualBubbleSort() {
    isVisualizationOn = true;
    let time = 0;
    for (let i = 0; i < dataToSortList.length; i++) {
        for(let j = 0; j < dataToSortList.length - i - 1; j++) {
            time += 10;
            setTimeout( () => {
                const e1Val = parseInt(dataToSortList[j].innerText);
                const e2Val = parseInt(dataToSortList[j + 1].innerText);
                if (e1Val > e2Val) {
                    visualSwap(dataToSortList[j], dataToSortList[j + 1]);
                    const temp = dataToSortList[j];
                    dataToSortList[j] = dataToSortList[j + 1];
                    dataToSortList[j + 1] = temp;
                }
            }, time);
        }
        setTimeout(() => {dataToSortList[dataToSortList.length - i - 1].style.backgroundColor = "green"}, time);
    }
    setTimeout(() => {isVisualizationOn = false}, time);
}

function visualSwap(element1, element2) {
    if(element1.parentNode != element2.parentNode || element1 == null) {
        console.log("children does not belong to the same parent");
        return;
    }
    const PARENT = element1.parentNode;
    const elem1SiblingBeforeReplacing = element1.nextSibling;
    PARENT.replaceChild(element1, element2);
    if(element2 == elem1SiblingBeforeReplacing) {
        PARENT.insertBefore(element2, element1);
    }
    else {
        PARENT.insertBefore(element2, elem1SiblingBeforeReplacing);
    }
}

function swap(items, leftIndex, rightIndex) {
    //console.log("items: " + items);
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;

}

function partition(items, left, right) {
    const pivotIndex = Math.floor((right + left) / 2);
    const pivot = items[pivotIndex];
    pivot.style.backgroundColor = 'blue';
    let i = left, j = right;
    while (i <= j) {
        while (parseInt(items[i].textContent) < parseInt(pivot.textContent)) {
            i++;
            //items[i].style.backgroundColor = 'violet';
        }
        while (parseInt(items[j].textContent) > parseInt(pivot.textContent)) {
            j--;
            //items[j].style.backgroundColor = 'violet';
        }
        if (i <= j) {
            //timeQS += 1;
            visualSwap(items[i], items[j]);
            swap(items, i, j);
            i++;
            j--;
        }
    }
    pivot.style.backgroundColor = 'red';
    //items[items.findIndex((i) => parseInt(i.textContent) == parseInt(pivot.textContent))].style.backgroundColor = 'green';
    return i;
}

let timeQS = 0;
function quickSort(items, left, right) {
   setTimeout(() => {
       let index;
       //console.log(items);
       if (items.length > 1) {
           index = partition(items, left, right); //index returned from partition
           if (left < index - 1) { //more elements on the left side of the pivot
               quickSort(items, left, index - 1);
           }

           if (index < right) { //more elements on the right side of the pivot
               quickSort(items, index, right);
           }
       }
       timeQS += 10;
   }, timeQS)
}
// first call to quick sort
//quickSort(dataToSortList, 0, dataToSortList.length - 1);
function visualQuickSort() {
    quickSort(dataToSortList, 0, dataToSortList.length - 1);
}


const themeSelection = document.getElementById("themeSelection");
themeSelection.addEventListener('click', () => {
    const ball = document.querySelector(".ball");
    ball.classList.toggle('dark');
    document.body.classList.toggle("dark");
    availableSorts.forEach(sort => {
        sort.classList.toggle('dark');
    });
    document.getElementById('visualization').classList.toggle('dark');

});

const availableSorts = document.querySelectorAll('nav div');
const chosenSortH1 = document.querySelector('h1');
availableSorts.forEach(sort => {
    sort.addEventListener('click', (e) => {
        function unmarkPreviousChosenOption() {
            availableSorts.forEach(s => {
                if(s.classList.contains('dark')) {
                    s.style.backgroundColor = 'rgb(42, 40, 40)';
                }
                else {
                    s.style.backgroundColor = 'rgb(235, 235, 235)';
                }
               s.style.textDecoration = 'none';
            });
        }
        unmarkPreviousChosenOption();
        chosenSort = e.target.textContent;
        chosenSortH1.textContent = sort.textContent;
        e.target.style.backgroundColor = 'rgb(170, 170, 170)';
        e.target.style.textDecoration = 'underline';
    });
});