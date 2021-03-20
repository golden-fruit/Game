
function LoadData(index){
    return eval('('+localStorage.getItem('Data'+index)+')')
}
function SaveData(Data,index){
    localStorage.setItem('Data'+index,JSON.stringify(Data))
}

export {LoadData,SaveData}