import BN_value from './page';
import ME_oil from './page';
import ME_oil_price from './page';
import vesselName from './page';
import ME_power from './page';


export default function checkValues(...values: any[]) {
    values.forEach((value, index) => {
        if (value) {
            console.log(`Value ${index + 1} is assigned: ${value}`);
        } else {
            console.log(`Value ${index + 1} is not assigned`);
        }
    });
}

// Usage
import { useContext } from 'react'; // Import the useContext function from the react package
import { FormValuesContext } from './results/FormValuesContext'; // Import the context

function AnotherComponent() {
    const formValues = useContext(FormValuesContext);
}