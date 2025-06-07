//先抓取我要使用的元素
const createBtn = document.querySelector('.createBtn');     //添加待辦事件按鈕
const todoText = document.querySelector('.todoText');       //要被 動態添加 在最下方的 待完成項目 跟 清除已完成按鈕 最外層容器
const list = document.querySelector('.list');       //要被 動態添加 待辦事件的容器
const underText = document.querySelector('.underText');       //要被 動態添加 待辦事件的容器


const todoListBoxAll = document.querySelector('.todoListBoxAll');       //全部
const listAll = document.querySelector('.listAll');       //全部

const todoListBoxTreat = document.querySelector('.todoListBoxTreat');       //待完成
const listTreat = document.querySelector('.listTreat');       //待完成

const todoListBoxFinish = document.querySelector('.todoListBoxFinish');     //已完成
const listFinish = document.querySelector('.listFinish');     //已完成


//增加一個存放 新增 或 刪除 資料的 空陣列資料
let data = [];
//增加一個用來 紀錄 待完成事件的 計數器
let count = 0;

//設定一個渲染資料到網頁的方法
function renderData() { 
    //增加用來防止勾選完成待辦事件， 假如接著按下 delBtn 避免又多刪除 count
    const count = data.filter(item => !item.completed ).length;

    let str = '';

    data.forEach((item, index) => {
        str += 
        `
        <li class='list_li'>

            <label class="check_box">

                <span class="${item.completed ? 'delLine' : ''}">
                    ${item.todoThing}
                </span>

                <input
                type="checkbox"
                class="listCheckBox"
                data-num='${index}'
                ${item.completed ? 'checked' : ''}>

            </label>

            <button class="delBtn" data-num='${index}'></button>
        </li>
        `       
        
        list.innerHTML = str +
            `                
            <div class="underText">
                <p>${count}個待完成項目</p>
                <button class="clearFinishedBtn">清除已完成</button>
            </div>
            `;
    })
}

//為 createBtn 增加事件監聽
createBtn.addEventListener('click', () => {
    list.innerHTML = '';
    listTreat.innerHTML = '';
    listFinish.innerHTML = '';

    //判斷是否有正確輸入資料，如果沒有就在判斷區塊 終止行為
    if (todoText.value === '') {
        alert('請輸入有效資料')
        return;
    }
    
    let obj = {};
    obj.todoThing = todoText.value;
    obj.completed = false;
    data.push(obj);
    
    //當我按下當我按下 createBtn 同時增加 待完成項目的 數目
    count++;

    //重新渲染一次頁面資料
    renderData();

    todoText.value = '';
    
});

//整合 被動態添加各 元素 ；並讓這些 元素 增加事件監聽
list.addEventListener('click',(e) => {    
    const num = e.target.getAttribute('data-num');
    
    //為 delBtn 增加事件監聽
    if (e.target.getAttribute('class') === 'delBtn') {//<------ 綁定 delBtn 點擊事件
        if (!data[num].completed) {
            count--;
        }
        data.splice(num, 1);
        //當我按下當我按下 delBtn ， 同時減少 待完成項目的 顯示數目
    }
    
    //為 listCheckBox 增加監聽事件
    if (e.target.getAttribute('class') === 'listCheckBox') {
        data[num].completed = e.target.checked;
        
        if (e.target.checked) {
            count--;
        }else{
            count++;
        }
    }
    
    if (e.target.getAttribute('class') === 'clearFinishedBtn') {
        data = data.filter(item => !item.completed);
        list.innerHTML = '';
    }

    //重新渲染一次頁面資料
    renderData();
});

//全部 事件監聽
todoListBoxAll.addEventListener('click', (e)=>{
    //確保 上一個待辦事件 不殘留
    
    listTreat.innerHTML = '';
    listFinish.innerHTML = '';

    let str = '';
    // renderData();
    data.forEach((item, index) =>{
            str += 
            `
            <li class='list_li'>

                <label class="check_box">

                    <span class="${item.completed ? 'delLine' : ''}">
                        ${item.todoThing}
                    </span>

                    <input
                    type="checkbox"
                    class="listCheckBox"
                    data-num='${index}'
                    ${item.completed ? 'checked' : ''}>

                </label>

                <button class="delBtn" data-num='${index}'></button>
            </li>
            `         
        });

    list.innerHTML = str +
    `                
    <div class="underText">
        <p>${count}個待完成項目</p>
        <button class="clearFinishedBtn">清除已完成</button>
    </div>
    `;  
}
);  
//待完成 事件監聽
todoListBoxTreat.addEventListener('click', (e)=>{
    //先篩選出 符合條件的資料，再去做 迴圈處理
    const finished = data.filter(item => !item.completed);

    //確保 上一個待辦事件 不殘留
    list.innerHTML = '';
    listFinish.innerHTML = '';

    let str = '';
    finished.forEach((item, index) =>{
            str += 
            `
            <li class='list_li'>

                <label class="check_box">

                    <span class="${item.completed ? 'delLine' : ''}">
                        ${item.todoThing}
                    </span>

                    <input
                    type="checkbox"
                    class="listCheckBox"
                    data-num='${index}'
                    ${item.completed ? 'checked' : ''}>

                </label>

                <button class="delBtn" data-num='${index}'></button>
            </li>
            `         
        });

    listTreat.innerHTML = str +
    `                
    <div class="underText">
        <p>${count}個待完成項目</p>
        <button class="clearFinishedBtn">清除已完成</button>
    </div>
    `;  

    if (e.target.getAttribute('class') === 'listCheckBox') {
        data[num].completed = e.target.checked;
        
        if (e.target.checked) {
            count--;
        }else{
            count++;
        }
    }

    if (e.target.getAttribute('class') === 'clearFinishedBtn') {
        data = data.filter(item => !item.completed);
        renderData();
        list.innerHTML = '';
    }
}
);
//已完成 事件監聽
todoListBoxFinish.addEventListener('click', (e)=>{
    //先篩選出 符合條件的資料，再去做 迴圈處理
    const finished = data.filter(item => item.completed);

    //確保 上一個待辦事件 不殘留
    list.innerHTML = '';
    listTreat.innerHTML = '';

    let str = '';
    finished.forEach((item, index) =>{
            str += 
            `
            <li class='list_li'>
                <label class="check_box">

                    <span class="${item.completed ? 'delLine' : ''}">
                        ${item.todoThing}
                    </span>
                </label>

                <button class="delBtn" data-num='${index}'></button>
            </li>
            `         
        });

    listFinish.innerHTML = str +
    `                
    <div class="underText">
        <p>${count}個待完成項目</p>
        <button class="clearFinishedBtn">清除已完成</button>
    </div>
    `;  

    if (e.target.getAttribute('class') === 'clearFinishedBtn') {
        data = data.filter(item => !item.completed);
        listFinish.innerHTML = '';
        renderData();
    }
}
);  
