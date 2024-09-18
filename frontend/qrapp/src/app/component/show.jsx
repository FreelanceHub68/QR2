
import AddProduct from "./client/addproduct";
import Profile from "./profile";
import Tablecart from "./tablecart";

const Show = ({ action }) => {
    console.log(action)
    const renderContent = (action) => {
        switch (action) {
            case "Product":
                return <AddProduct />;
           
            case "Table_No_1":
                return <Tablecart id={{action}} />;
            default:
                return <Profile />;
        }
    };

    return (
        <div className="flex-1 p-4">
            {renderContent(action)}
        </div>
    );
};

export default Show;