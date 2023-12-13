type dishFormProps = {
    initialData:{
        name: string;
        price: number;
        description: string;
        image: string;
    }
};
 const DishForm:React.FC<dishFormProps> = ({initialData}) => {
    return(
        <div>
            form
        </div>
    )
 };
    export default DishForm;