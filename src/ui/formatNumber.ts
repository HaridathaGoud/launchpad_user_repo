const formatNumber=(value:number|string)=>{
    value=Number(value)
    if(value<1000){
        return value
    }
    if(value>=1000 && value<1000000){
        return `${Math.floor(value/1000)}K+`
    }
    if(value>=1000000 && value<1000000000){
         return `${Math.floor(value/1000000)}M+`
    }
    return `${Math.floor(value/1000000000)}B+`
}
export default formatNumber