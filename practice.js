let a=[12,34,[5,67,7],[6,7,84],67,89]
for(let i=0;i<a[0].length;i++){
    const b=null
    for(let j=0;j<a.length;j++){
         b=a[i][j]
         console.log(b)
    }
    a.push(b)
}
console.log(a)