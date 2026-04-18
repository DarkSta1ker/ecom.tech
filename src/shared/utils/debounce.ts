export const debounce = <T = unknown>(func: (args:T)=>void, ms: number) =>{
    let timer: NodeJS.Timeout;
    console.log('вызов дебаунса')
    return function(args: T){
        console.log('срабатывание возвращения функции')
        if(timer){
            clearTimeout(timer)
            console.log('очистка таймера')
        }
        timer = setTimeout(() => {
            console.log('выполнение сет таймаут')
            func(args);

        }, ms)
        console.log('новый таймер установлен(но по факту эта строчка выполнится до установки таймера)')
    }
}
