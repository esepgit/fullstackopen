const Notification = ({message, classname}) => {
    if(message === null) {
        return null;
    } else {
        return (
            <div className={classname}>
                <p>{message}</p>
            </div>
        )
    }
} 

export default Notification