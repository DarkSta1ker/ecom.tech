export const debounce = <T = unknown>(func: (args:T)=>void, ms: number) =>{
    let timer: NodeJS.Timeout;
    return function(args: T){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func(args);
        }, ms)
    }
}
