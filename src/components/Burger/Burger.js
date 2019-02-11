import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import styles from './Burger.css';


const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            const ingCount = props.ingredients[ingKey];

            return [...Array(ingCount)].map((_, i) => {
                return <BurgerIngredient 
                    key={ingKey + i}
                    type={ingKey} />
            });
        })
        .reduce((acc, curr) => {
            // curr.forEach(el => acc.push(el));
            // return acc;
            
            // acc.push(...curr);
            // return acc;

            return acc.concat(curr);
        }, []);
    
    if (!transformedIngredients.length) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type={'bread-top'}/>
            {transformedIngredients}
            <BurgerIngredient type={'bread-bottom'}/>
        </div>
    );
}

export default burger;
