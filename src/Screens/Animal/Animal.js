//import react from "react";
import { useParams } from 'react-router-dom';
//import { useNavigation } from '../../ContextProvider/NavigationContext';


function Animal() {
    //const navigate = useNavigation();
    const { cat,id } = useParams();

    return(
        <div>
            <h2>{cat+"/"+id}</h2>
        </div>
    )
}

export default Animal;