import React, {FC} from 'react';
import {FiltersBlock} from '../widgets/FiltersBlock'
import {GridBlock} from '../widgets/GridBlock'
import {Header} from '../widgets/Header'
import {Footer} from '../widgets/Footer'
export const MainPage: FC = ()=>{
    return (
        <div>
            <Header />
            <div>MainPage</div>
            <FiltersBlock/>
            <GridBlock/>
            <Footer/>
        </div>
    )
}
