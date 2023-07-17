

const Universities = ({singleUni,index}) => {
    
    return (
        <div>
            <p className="text-3xl font-bold my-5 ms-10">{index}. {singleUni.name}</p>
        </div>
    );
};

export default Universities;