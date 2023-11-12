


export function calcINSS(salario: any){
    let inss = 0

    if (salario < 1800){
        inss = salario * 6/100
    } else if(salario >= 1800 && salario < 3000){
        inss = salario * 7/100
    } else if (salario >= 3000 && salario < 7000) {
        inss = salario * 11/100
    }
    return inss
}


export function calcIrf(salario: any){
    let irf = 0

    if (salario < 2000){
        irf = 0
    } else if(salario >= 2000 && salario < 4000) {
        irf = salario * 0.08
    } else {
        irf = salario * 0.1
    }
    return irf
}

export function calcVT(salario: any){
    return salario * 0.06
}

export function calcFGTS(salario: any){
    return salario * 0.08
}

export function calcSAL(salario: any){
    return salario - calcINSS(salario) - calcIrf(salario) - calcVT(salario)
}